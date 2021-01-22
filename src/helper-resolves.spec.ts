import { STSHelper } from './helper';
import { Logger, LogLevel } from 'typescript-ilogger';
import { TestingValues } from './test-values';
import * as STS from '@aws-sdk/client-sts';

const assumeRoleResponse: STS.AssumeRoleResponse = {};

const assumeRole = jest.fn().mockImplementation(() => {
    return Promise.resolve<STS.AssumeRoleResponse>(assumeRoleResponse);
});

// mock the functions
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
    // set action for this method
    const action = `${STSHelper.name}.${stsHelperMock.AssumeRoleAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} roleArn`, () => {
        const actual = stsHelperMock.AssumeRoleAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} roleArn`);
    });
    test(TestValues.ValidTest, () => {
        const actual = stsHelperMock.AssumeRoleAsync(TestValues.Arn);
        return expect(actual).resolves.toEqual(assumeRoleResponse);
    });
});
