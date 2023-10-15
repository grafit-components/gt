import {SchematicsException, Tree, UpdateRecorder} from '@angular-devkit/schematics';
import {
  JsonAstKeyValue, JsonAstNode, JsonAstObject, JsonParseMode, JsonValue,
  parseJsonAst
} from '@angular-devkit/core';

const pkgJsonPath = 'package.json';

export enum NodeDependencyType {
  Default = 'dependencies',
  Dev = 'devDependencies',
  Peer = 'peerDependencies',
  Optional = 'optionalDependencies',
}

export interface NodeDependency {
  type: NodeDependencyType;
  name: string;
  version: string;
  overwrite?: boolean;
}

function _readPackageJson(tree: Tree, path: string): JsonAstObject {
  const sourceRoot = `${path}/${pkgJsonPath}`;
  const buffer = tree.read(sourceRoot);
  if (buffer === null) {
    throw new SchematicsException('Could not read package.json.');
  }
  const content = buffer.toString();

  const packageJson = parseJsonAst(content, JsonParseMode.Strict);
  if (packageJson.kind !== 'object') {
    throw new SchematicsException('Invalid package.json. Was expecting an object');
  }

  return packageJson;
}

export function findPropertyInAstObject(node: JsonAstObject, propertyName: string): JsonAstNode | null {
  let maybeNode: JsonAstNode | null = null;
  for (const property of node.properties) {
    if (property.key.value === propertyName) {
      maybeNode = property.value;
    }
  }

  return maybeNode;
}

export function appendPropertyInAstObject(recorder: UpdateRecorder,
                                          node: JsonAstObject,
                                          propertyName: string,
                                          value: JsonValue,
                                          indent: number) {
  const indentStr = _buildIndent(indent);

  if (node.properties.length > 0) {
    const last = node.properties[node.properties.length - 1];
    recorder.insertRight(last.start.offset + last.text.replace(/\s+$/, '').length, ',');
  }

  recorder.insertLeft(
    node.end.offset - 1,
    '  '
    + `"${propertyName}": ${JSON.stringify(value, null, 2).replace(/\n/g, indentStr)}`
    + indentStr.slice(0, -2),
  );
}

function _buildIndent(count: number): string {
  return '\n' + new Array(count + 1).join(' ');
}

export function insertPropertyInAstObjectInOrder(recorder: UpdateRecorder,
                                                 node: JsonAstObject,
                                                 propertyName: string,
                                                 value: JsonValue,
                                                 indent: number) {

  if (node.properties.length === 0) {
    appendPropertyInAstObject(recorder, node, propertyName, value, indent);

    return;
  }

  // Find insertion info.
  let insertAfterProp: JsonAstKeyValue | null = null;
  let prev: JsonAstKeyValue | null = null;
  let isLastProp = false;
  const last = node.properties[node.properties.length - 1];
  for (const prop of node.properties) {
    if (prop.key.value > propertyName) {
      if (prev) {
        insertAfterProp = prev;
      }
      break;
    }
    if (prop === last) {
      isLastProp = true;
      insertAfterProp = last;
    }
    prev = prop;
  }

  if (isLastProp) {
    appendPropertyInAstObject(recorder, node, propertyName, value, indent);

    return;
  }

  const indentStr = _buildIndent(indent);

  const insertIndex = insertAfterProp === null
    ? node.start.offset + 1
    : insertAfterProp.end.offset + 1;

  recorder.insertRight(
    insertIndex,
    indentStr
    + `"${propertyName}": ${JSON.stringify(value, null, 2).replace(/\n/g, indentStr)}`
    + ',',
  );
}

export function addPackageJsonDependency(tree: Tree, dependency: NodeDependency, path: string): void {
  const packageJsonAst = _readPackageJson(tree, path);
  const depsNode = findPropertyInAstObject(packageJsonAst, dependency.type);
  const sourceRoot = `${path}/${pkgJsonPath}`;
  const recorder = tree.beginUpdate(sourceRoot);
  if (!depsNode) {
    // Haven't found the dependencies key, add it to the root of the package.json.
    appendPropertyInAstObject(recorder, packageJsonAst, dependency.type, {
      [dependency.name]: dependency.version,
    }, 2);
  } else if (depsNode.kind === 'object') {
    // check if package already added
    const depNode = findPropertyInAstObject(depsNode, dependency.name);

    if (!depNode) {
      // Package not found, add it.
      insertPropertyInAstObjectInOrder(
        recorder,
        depsNode,
        dependency.name,
        dependency.version,
        4,
      );
    } else if (dependency.overwrite) {
      // Package found, update version if overwrite.
      const {end, start} = depNode;
      recorder.remove(start.offset, end.offset - start.offset);
      recorder.insertRight(start.offset, JSON.stringify(dependency.version));
    }
  }

  tree.commitUpdate(recorder);
}
