import * as STS from '@aws-sdk/client-sts';
import {v4} from 'uuid';
import { ILogger } from 'typescript-ilogger';
import { ISTSHelper } from './interface';
import { BaseClass } from 'typescript-helper-functions';

/**
 * STS Helper
 */
export class STSHelper extends BaseClass implements ISTSHelper {

    /**
     * AWS Repository for STS
     */
    private Repository: STS.STS;

    /**
     * Initializes new instance of STSHelper
     * @param logger {ILogger} Injected logger
     * @param repository {STS.STS} Injected Repository. A new repository will be created if not supplied
     * @param options {STS.STSClientConfig} Injected configuration if a Repository is supplied
     */
    constructor(logger: ILogger,
        repository?: STS.STS,
        options?: STS.STSClientConfig) {

        super(logger);
        options = this.ObjectOperations.IsNullOrEmpty(options) ? { region: 'us-east-1' } as STS.STSClientConfig : options!;
        this.Repository = repository || new STS.STS(options);
    }

    /**
     * Assume role in your account or another
     * @param roleArn {string} Role ARN to assume
     */
    public async AssumeRoleAsync(roleArn: string): Promise<STS.AssumeRoleResponse> {

        const action = `${STSHelper.name}.${this.AssumeRoleAsync.name}`;
        this.LogHelper.LogInputs(action, { roleArn });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(roleArn)) { throw new Error(`[${action}]-Must supply roleArn`); }

        // create params object
        const params: STS.AssumeRoleRequest = {
            RoleArn: roleArn,
            RoleSessionName: v4(),
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.assumeRole(params);
        this.LogHelper.LogResponse(action, response);

        return response;
    }
}
