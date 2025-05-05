import type { MetadataBearer } from '@smithy/types';
import { SmithyResolvedConfiguration } from '@smithy/smithy-client/dist-types/client';
import { Client, Command } from '@smithy/smithy-client';
import { ContinuationOptions } from './continuation.types';

export async function* sendContinuously<
    ClientInput extends object,
    ClientOutput extends MetadataBearer,
    ResolvedClientConfiguration extends SmithyResolvedConfiguration<any>
>(
    client: Client<any, any, any, any>,
    command: Command<ClientInput, ClientOutput, ResolvedClientConfiguration>,
    continuationOptions: ContinuationOptions
): AsyncGenerator<ClientOutput> {
    const commandInput: any = {
        ...command.input
    };
    const commandConstructor = command.constructor;
    do {
        // @ts-ignore
        const response = await client.send(new commandConstructor(commandInput));

        const continuationToken = commandInput[continuationOptions.tokenPropertyName];
        const nextContinuationToken = response[continuationOptions.nextTokenPropertyName];

        yield response;

        commandInput[continuationOptions.tokenPropertyName] = nextContinuationToken !== continuationToken
            ? nextContinuationToken
            : undefined;

    } while (commandInput[continuationOptions.tokenPropertyName]);
}
