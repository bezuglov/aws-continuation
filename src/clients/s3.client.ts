import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import type { MetadataBearer, CheckOptionalClientConfig } from '@smithy/types';
import { SmithyResolvedConfiguration } from '@smithy/smithy-client/dist-types/client';
import { Command } from '@smithy/smithy-client';
import { ContinuationOptions } from '../continuation.types';
import { sendContinuously } from '../continuation';

export class S3ContinuationClient extends S3Client {

    readonly continuationOptions: ContinuationOptions = {
        nextTokenPropertyName: 'NextContinuationToken',
        tokenPropertyName: 'ContinuationToken',
    };

    constructor(...[configuration]: CheckOptionalClientConfig<S3ClientConfig>) {
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
