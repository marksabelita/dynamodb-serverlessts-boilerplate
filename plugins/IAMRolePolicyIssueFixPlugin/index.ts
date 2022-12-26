const updatedLogGroupPolicy = {
  Effect: 'Allow',
  Action: ['logs:CreateLogStream', 'logs:CreateLogGroup', 'logs:PutLogEvents'],
  Resource: [
    {
      'Fn::Sub':
        'arn:${AWS::Partition}:logs:${AWS::Region}:${AWS::AccountId}:log-group:/aws/lambda/*',
    },
  ],
}

class IAMRolePolicyIssueFixPlugin {
  private serverless
  private hooks
  private log
  constructor(serverless, _cliOptions, { log }) {
    this.log = log
    this.serverless = serverless
    this.hooks = {
      'before:package:finalize': () => this.packageFinalize(),
    }
  }

  packageFinalize() {
    this.hooks
    const resourceSection =
      this.serverless.service.provider.compiledCloudFormationTemplate.Resources

    let updateStatement =
      resourceSection['IamRoleLambdaExecution'].Properties.Policies[0].PolicyDocument.Statement

    //group all logs related permission

    updateStatement = updateStatement.filter(
      (s) =>
        !(
          s.Action.includes('logs:CreateLogStream') ||
          s.Action.includes('logs:CreateLogGroup') ||
          s.Action.includes('logs:PutLogEvents')
        )
    )

    updateStatement.push(updatedLogGroupPolicy)

    this.serverless.service.provider.compiledCloudFormationTemplate.Resources[
      'IamRoleLambdaExecution'
    ].Properties.Policies[0].PolicyDocument.Statement = updateStatement

    this.log.notice('Success Combining Logs Policy')
  }
}

module.exports = IAMRolePolicyIssueFixPlugin
