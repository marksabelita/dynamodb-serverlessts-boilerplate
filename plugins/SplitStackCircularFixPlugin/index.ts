class SplitStackCircularFixPlugin {
  serverless
  hooks
  // noinspection JSUnusedLocalSymbols
  constructor(serverless, _options) {
    this.serverless = serverless
    // noinspection JSUnusedGlobalSymbols
    this.hooks = {
      'before:aws:package:finalize:saveServiceState': this.fix.bind(this),
    }
  }

  fix() {
    const resources = this.serverless.service.provider.compiledCloudFormationTemplate.Resources
    let changed = false
    if (resources) {
      Object.keys(resources).forEach((key) => {
        const resource = resources[key]
        if (
          resource &&
          resource.DependsOn &&
          resource.DependsOn.length > 0 &&
          resource.DependsOn.includes('APINestedStack') &&
          resource.DependsOn.filter((d) => d.endsWith('NestedStack')).length > 1
        ) {
          this.serverless.cli.log(`${key} - circular dependencies fixed`)
          changed = true
          resource.DependsOn = resource.DependsOn.filter(
            (d) => !(d.endsWith('NestedStack') && d !== 'APINestedStack')
          )
        }
      })
      if (changed) {
        this.serverless.service.provider.compiledCloudFormationTemplate.Resources = resources
      }
    }
  }
}

module.exports = SplitStackCircularFixPlugin
