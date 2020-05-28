import * as AWS from 'aws-sdk';

/**
 * STS Helper
 */
export interface ISTSHelper {

    /**
     * AWS Repository for STS
     */
    Repository: AWS.STS;

    /**
     * Assume role in your account or another
     * @param roleArn {string} Role ARN to assume
     */
    AssumeRoleAsync(roleArn: string): Promise<AWS.STS.AssumeRoleResponse>;
}
