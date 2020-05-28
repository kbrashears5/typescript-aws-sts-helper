import * as AWS from 'aws-sdk';
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
    public Repository: AWS.STS;

    /**
     * Initializes new instance of STSHelper
     * @param logger {ILogger} Injected logger
     * @param repository {AWS.STS} Injected Repository. A new repository will be created if not supplied
     * @param options {AWS.STS.ClientConfiguration} Injected configuration if a Repository is supplied
     */
    constructor(logger: ILogger,
        repository?: AWS.STS,
        options?: AWS.STS.ClientConfiguration) {

        super(logger);
        this.Repository = repository || new AWS.STS(options);
    }

    /**
     * Assume role in your account or another
     * @param roleArn {string} Role ARN to assume
     */
    public async AssumeRoleAsync(roleArn: string): Promise<AWS.STS.AssumeRoleResponse> {

        const action = `${STSHelper.name}.${this.AssumeRoleAsync.name}`;
        this.LogHelper.LogInputs(action, { roleArn });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(roleArn)) { throw new Error(`[${action}]-Must supply roleArn`); }

        // create params object
        const params: AWS.STS.AssumeRoleRequest = {
            RoleArn: roleArn,
            RoleSessionName: v4(),
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.assumeRole(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }
}
