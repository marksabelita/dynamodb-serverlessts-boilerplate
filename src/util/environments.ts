export enum ENVIRONMENT_VARIABLES {
  ENV = 'ENV',
  DYNAMODB_LOCAL = 'DYNAMODB_LOCAL',
}

export enum ENVIRONMENTS {
  DEV = 'dev',
  STG = 'stg',
  PROD = 'prod',
}

export const getEnvironmentVariableValue = (
  envVar: ENVIRONMENT_VARIABLES,
  defaultValue?: string
): string | undefined => {
  return process.env[envVar] ?? defaultValue
}
