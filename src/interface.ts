import * as STS from '@aws-sdk/client-sts';

/**
 * STS Helper
 */
export interface ISTSHelper {
  /**
   * Assume role in your account or another
   * @param roleArn {string} Role ARN to assume
   */
  AssumeRoleAsync(roleArn: string): Promise<STS.AssumeRoleResponse>;
}
