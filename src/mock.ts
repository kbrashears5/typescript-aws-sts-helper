import { BaseMock } from 'typescript-helper-functions';
import * as STS from '@aws-sdk/client-sts';

/**
 * STS Mock class
 */
export class STSMock extends BaseMock {

    /**
     * Mocks an STS.AssumeRoleResponse response
     */
    public AssumeRoleResponse: STS.AssumeRoleResponse = {};

    /**
     * Create the STS mock
     */
    protected CreateMock(returnError: boolean) {
        const rejectResponse = new Error(`AWS Error`);

        // implement the AWS responses
        const awsResponses = {
            // assume role response
            assumeRole: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<STS.AssumeRoleResponse>(this.AssumeRoleResponse);
                }),
            },
        };

        const options = {} as STS.STSClientConfig;

        // create the functions
        let functions = new STS.STS(options);
        functions = {
            assumeRole: () => awsResponses.assumeRole,
        };

        return functions;
    }
}
