<h1 align="center">typescript-aws-sts-helper</h1>

<div align="center">
    
<b>Typescript helper functions for AWS STS service</b>
    
[![Build Status](https://dev.azure.com/kbrashears5/github/_apis/build/status/kbrashears5.typescript-aws-sts-helper?branchName=master)](https://dev.azure.com/kbrashears5/github/_build/latest?definitionId=19&branchName=master)
[![Tests](https://img.shields.io/azure-devops/tests/kbrashears5/github/19)](https://img.shields.io/azure-devops/tests/kbrashears5/github/19)
[![Code Coverage](https://img.shields.io/azure-devops/coverage/kbrashears5/github/19)](https://img.shields.io/azure-devops/coverage/kbrashears5/github/19)

[![NPM Version](https://img.shields.io/npm/v/typescript-aws-sts-helper)](https://img.shields.io/npm/v/typescript-aws-sts-helper)
[![Downloads](https://img.shields.io/npm/dt/typescript-aws-sts-helper)](https://img.shields.io/npm/dt/typescript-aws-sts-helper)
</div>

## Install
```
npm install typescript-aws-sts-helper@latest
```

## Usage
### Default - running in Lambda in your own account
```typescript
const logger = new Logger(LogLevel.Trace);

const helper = new STSHelper(logger);

const response = await helper.AssumeRoleAsync('roleArn');
```

### Running in separate account or not in Lambda
```typescript
const logger = new Logger(LogLevel.Trace);

const options: AWS.STS.ClientConfiguration = {
    accessKeyId: '{access_key}',
    secretAccessKey: '{secret_key}',
    region: 'us-east-1',
};

const repository = new AWS.STS(options);

const helper = new STSHelper(logger,
    repository);

const response = await helper.AssumeRoleAsync('roleArn');
```

## Notes
If no options are supplied, will default to `us-east-1` as the region