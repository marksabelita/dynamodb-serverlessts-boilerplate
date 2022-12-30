import type { AWS } from '@serverless/typescript'
// import { authorizer } from "../resources/authorizer";
import { cors } from '../resources/cors'

export const userRoutes: AWS['functions'] = {
  createUser: {
    handler: 'src/handlers/User/create/index.handler',
    events: [
      {
        http: {
          cors: cors,
          method: 'post',
          path: '/user',
        },
      },
    ],
  },
}
