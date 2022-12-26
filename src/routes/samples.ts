import type { AWS } from '@serverless/typescript'
// import { authorizer } from "../resources/authorizer";
import { cors } from '../resources/cors'

export const sampleRoutes: AWS['functions'] = {
  getSample: {
    handler: 'src/handlers/Sample/getSample.handler',
    events: [
      {
        http: {
          cors: cors,
          method: 'get',
          path: '/sample',
        },
      },
    ],
  },
  postSample: {
    handler: 'src/handlers/Sample/postSample.handler',
    events: [
      {
        http: {
          cors,
          method: 'post',
          path: '/sample',
        },
      },
    ],
  },
}
