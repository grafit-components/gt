import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { parseName } from '@schematics/angular/utility/parse-name';
import { Schema } from './schema';

export function setupOptions(host: Tree, options: Schema): Tree {
  const workspace = getWorkspace(host);

  if (!options.project) {
    options.project = Object.keys(workspace.projects)[0];
  }

  if (!options.project) {
    throw new SchematicsException('Option "project" is required.');
  }

  console.log('options ' + JSON.stringify(options));

  const parsedPath = parseName(options.path, options.name);
  options.name = parsedPath.name;
  options.path = parsedPath.path;
  return host;
}
