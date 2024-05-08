import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Schema as ApplicationOptions } from '@schematics/angular/application/schema';
import { LatestVersion } from '../utils/latestVersion';
import { addPackageJsonDependency, NodeDependencyType } from '../utils/utility';

function addDependenciesToPackageJson(options: ApplicationOptions, context: SchematicContext) {
  context.logger.info(JSON.stringify(options));
  return (host: Tree) => {
    [
      {
        type: NodeDependencyType.Default,
        name: '@grafit/styles',
        version: LatestVersion.styleVersion,
      },
      {
        type: NodeDependencyType.Default,
        name: '@angular/cdk',
        version: LatestVersion.cdkVersion,
      },
      {
        type: NodeDependencyType.Default,
        name: '@types/faker',
        version: LatestVersion.fakerTypesVersion,
      },
      {
        type: NodeDependencyType.Default,
        name: 'faker',
        version: LatestVersion.fakerVersion,
      },
      {
        type: NodeDependencyType.Default,
        name: 'moment-mini',
        version: LatestVersion.momentVersion,
      },
      {
        type: NodeDependencyType.Default,
        name: 'object-hash',
        version: LatestVersion.objectHashVersion,
      },
      {
        type: NodeDependencyType.Default,
        name: 'highcharts',
        version: LatestVersion.hcVersion,
      },
      {
        type: NodeDependencyType.Default,
        name: 'highcharts-angular',
        version: LatestVersion.hcAngularVersion,
      },
    ].forEach((dependency) => addPackageJsonDependency(host, dependency, options.name));
    return host;
  };
}

export function itskPackages(options: ApplicationOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const res = chain([addDependenciesToPackageJson(options, context)]);
    return res(host, context);
  };
}
