import { CloudWatchLogsClient, CloudWatchLogsClientConfig } from '@aws-sdk/client-cloudwatch-logs';
import type { MetadataBearer, CheckOptionalClientConfig } from '@smithy/types';
import { SmithyResolvedConfiguration } from '@smithy/smithy-client/dist-types/client';
import { Command } from '@smithy/smithy-client';
import { ContinuationOptions } from '../continuation.types';
import { sendContinuously } from '../continuation';

export class CloudWatchLogsContinuationClient extends CloudWatchLogsClient {

    readonly continuationOptions: ContinuationOptions = {
        nextTokenPropertyName: 'nextToken',
        tokenPropertyName: 'nextToken',
    };

    constructor(...[configuration]: CheckOptionalClientConfig<CloudWatchLogsClientConfig>) {
        super(...(configuration ? [configuration] : []));
    }

    async* sendContinuously<
        ClientInput extends object,
        ClientOutput extends MetadataBearer,
        ResolvedClientConfiguration extends SmithyResolvedConfiguration<any>
    >(
        command: Command<ClientInput, ClientOutput, ResolvedClientConfiguration>
    ): AsyncGenerator<ClientOutput> {
        for await (const response of sendContinuously(this, command, this.continuationOptions)) {
            yield response;
        }
    }
}
