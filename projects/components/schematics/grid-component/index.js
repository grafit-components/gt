"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const config_1 = require("@schematics/angular/utility/config");
const project_1 = require("@schematics/angular/utility/project");
const parse_name_1 = require("@schematics/angular/utility/parse-name");
const validation_1 = require("@schematics/angular/utility/validation");
const stringUtils = { dasherize: strings_1.dasherize, classify: strings_1.classify };
function filterTemplates() {
    return schematics_1.filter(path => !path.match(/\.bak$/));
}
function default_1(options) {
    return (host, context) => {
        const workspace = config_1.getWorkspace(host);
        if (!options.project) {
            throw new schematics_1.SchematicsException('Option (project) is required.');
        }
        const project = workspace.projects[options.project];
        if (options.path === undefined) {
            options.path = project_1.buildDefaultPath(project);
        }
        const parsedPath = parse_name_1.parseName(options.path, options.name);
        options.name = parsedPath.name;
        options.path = parsedPath.path;
        validation_1.validateName(options.name);
        const templateSource = schematics_1.apply(schematics_1.url('./files'), [
            filterTemplates(),
            schematics_1.template(Object.assign({}, stringUtils, options)),
            schematics_1.move(parsedPath.path)
        ]);
        const rule = schematics_1.chain([
            schematics_1.branchAndMerge(schematics_1.chain([
                schematics_1.mergeWith(templateSource)
                // schematic('itsk-packages', options)
            ])),
        ]);
        return rule(host, context);
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map