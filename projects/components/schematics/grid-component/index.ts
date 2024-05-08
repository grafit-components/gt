import {
  apply,
  branchAndMerge,
  chain,
  filter,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';

import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';
import { getWorkspace } from '@schematics/angular/utility/config';
import { parseName } from '@schematics/angular/utility/parse-name';
import { validateName } from '@schematics/angular/utility/validation';
import { buildDefaultPath } from '@schematics/angular/utility/workspace';
import { GridComponentOptions } from './schema';

const stringUtils = { dasherize, classify };

function filterTemplates(): Rule {
  return filter((path) => !path.match(/\.bak$/));
}

export default function (options: GridComponentOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(host);
    if (!options.project) {
      throw new SchematicsException('Option (project) is required.');
    }
    const project = workspace.projects[options.project];

    if (options.path === undefined) {
      options.path = buildDefaultPath(project as any);
    }
    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;
    validateName(options.name);
    const templateSource = apply(url('./files'), [
      filterTemplates(),
      template({
        ...stringUtils,
        ...options,
      }),
      move(parsedPath.path),
    ]);

    const rule = chain([
      branchAndMerge(
        chain([
          mergeWith(templateSource),
          // schematic('itsk-packages', options)
        ]),
      ),
    ]);
    return rule(host, context);
  };
}
