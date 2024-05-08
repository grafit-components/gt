import { join, Path } from '@angular-devkit/core';
import {
  apply,
  chain,
  forEach,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  schematic,
  SchematicContext,
  SchematicsException,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { Schema as ProjectTemplateOptions } from '../utils/schema';

function deleteFile(host: Tree, path: string) {
  if (host.exists(path)) {
    host.delete(path);
  }
}

function overwriteFiles(path: Path) {
  return (host: Tree) => {
    ['app.module.ts'].forEach((filename) => {
      deleteFile(host, join(path, filename));
    });
    return host;
  };
}

function modifyAngularJson(options: ProjectTemplateOptions, context: SchematicContext) {
  return (host: Tree) => {
    context.logger.info('HERE');
    if (host.exists('angular.json')) {
      context.logger.info('Got angular json');
      const angularStr = host.read('angular.json')?.toString('utf-8');
      if (angularStr === null || angularStr === undefined) {
        throw new SchematicsException('no angular.json found');
      }
      const angular = JSON.parse(angularStr);
      angular.projects[options.project].architect.build.options.extractCss = true;
      angular.projects[options.project].architect.build.options.styles.push(
        {
          input: 'src/theme-default/styles.styl',
          bundleName: 'theme-default',
          lazy: true,
          inject: true,
        },
        {
          input: 'src/theme-green/styles.styl',
          bundleName: 'theme-green',
          lazy: true,
          inject: true,
        },
      );
      context.logger.info('overwrite angular json');
      host.overwrite('angular.json', JSON.stringify(angular, null, '\t'));
    }
    return host;
  };
}

export function template(options: ProjectTemplateOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(tree);
    const project = workspace.projects[options.project];
    const sourcePath = join(project.root as Path, 'src');
    // const appPath = join(sourcePath as Path, 'app');

    const rule = chain([
      overwriteFiles(sourcePath),
      modifyAngularJson(options, context),
      mergeWith(
        apply(url('./files'), [
          move(sourcePath),
          forEach((fileEntry) => {
            const destPath = join(options.path, fileEntry.path);
            if (tree.exists(destPath)) {
              tree.overwrite(destPath, fileEntry.content);
            } else {
              tree.create(destPath, fileEntry.content);
            }
            return null;
          }),
        ]),
        MergeStrategy.Overwrite,
      ),
      schematic('itskPackages', options),
    ]);

    return rule(tree, context);
  };
}
