<h1 align="center">typescript-aws-sts-helper</h1>

<div align="center">
    
<b>Typescript helper functions for AWS STS service</b>
    
[![CI/CD](https://github.com/kbrashears5/typescript-aws-sts-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-sts-helper/actions/workflows/ci-cd.yml)
[![codecov](https://codecov.io/gh/kbrashears5/typescript-aws-sts-helper/branch/master/graph/badge.svg?token=PTMIUSG9N9)](https://codecov.io/gh/kbrashears5/typescript-aws-sts-helper)
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
import * as STS from '@aws-sdk/client-sts';

const logger = new Logger(LogLevel.Trace);

const options: STS.STSClientConfig = {
  accessKeyId: '{access_key}',
  secretAccessKey: '{secret_key}',
  region: 'us-east-1',
};

const repository = new STS.STS(options);

const helper = new STSHelper(logger, repository);

const response = await helper.AssumeRoleAsync('roleArn');
```

## Notes

If no options are supplied, will default to `us-east-1` as the region

## Development

Clone the latest and run

```npm
npm run prep
```

to install packages and prep the git hooks
