import { STSHelper } from './helper';
import { Logger, LogLevel } from 'typescript-ilogger';
import { TestingValues } from './test-values';

const assumeRole = jest.fn().mockImplementation(() => {
    return Promise.reject(new Error(`AWS Error`));
});

// create the functions
jest.mock('@aws-sdk/client-sts', () => {
    return {
        STS: jest.fn().mockImplementation(() => {
            return {
                assumeRole,
            };
        }),
    };
});

const logger = new Logger(LogLevel.Off);
const stsHelperMock = new STSHelper(logger);
const TestValues = new TestingValues();

/**
 * Test the AssumeRoleAsync method
 */
describe(`${STSHelper.name}.${stsHelperMock.AssumeRoleAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = stsHelperMock.AssumeRoleAsync(TestValues.Arn);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});
