import type { AWS } from '@serverless/typescript'
import { sampleRoutes } from './src/routes/samples'
import { dynamoDbResource } from './src/resources/stacks/dynamo'
// import { authResource } from './src/resources/stacks/authorizers'

const environment = {
  ENV: '${env:ENV}',
  TABLE_NAME: { Ref: 'LokalsTable' },
}

// const domainName = `${environment.ENV == 'production' ? '' : `${environment.ENV}-`}boilerplate-api.${environment.API_DOMAIN_NAME}`
// const authorizer = { type: 'CUSTOM', authorizerId: { Ref: 'GPAuthorizer' } }

const serverless: AWS = {
  service: 'lokal-boilerplate',
  frameworkVersion: '3',
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-2',
    versionFunctions: false,
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['lambda:InvokeFunction'],
        Resource: '*',
      },
    ],
    layers: [{ Ref: 'CommonLibsLambdaLayer' }],
    environment: environment,
  },
  package: {
    individually: true,
    excludeDevDependencies: true,
  },
  plugins: [
    'serverless-webpack',
    'serverless-webpack-layers',
    'serverless-offline',
    'serverless-plugin-warmup',
    // 'serverless-domain-manager',
  ],
  layers: {
    commonLibs: {
      path: 'layers/commonLib',
      name: 'layer-common-lib-node-modules-boilerplate',
      description: 'Project boilerplate',
      retain: true,
    },
  },
  custom: {
    webpack: {
      includeModules: false,
      webpackConfig: 'webpack.config.js',
      packager: 'npm',
    },
    layerConfig: {
      webpack: {
        clean: true,
        configPath: 'webpack-layer.config.js',
      },
      exportLayers: true,
      installLayers: true,
      upgradeLayerReferences: true,
    },
    warmup: {
      default: {
        enabled: true,
        role: 'IamRoleLambdaExecution',
        logRetentionInDays: 14,
      },
    },
    // customDomain: {
    //   domainName,
    //   basePath: '',
    //   stage: '${sls:stage}',
    //   createRoute53Record: true,
    //   certificateName: 'precogs.co',
    // },
  },
  useDotenv: true,
  functions: {
    ...sampleRoutes,
  },
  resources: {
    Resources: {
      // ...authResource
      ...dynamoDbResource,
    },
  },
}

module.exports = serverless
