"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const utility_1 = require("../util/utility");
const latestVersion_1 = require("../util/latestVersion");
function addDependenciesToPackageJson(options) {
    return (host) => {
        [
            {
                type: utility_1.NodeDependencyType.Default,
                name: '@itsk/itsk-style',
                version: latestVersion_1.LatestVersion.styleVersion,
            }, {
                type: utility_1.NodeDependencyType.Default,
                name: '@itsk/ng2-pack',
                version: latestVersion_1.LatestVersion.componentsVersion,
            }
        ].forEach(dependency => utility_1.addPackageJsonDependency(host, dependency, options.name));
        return host;
    };
}
function default_1(options) {
    return (host, context) => {
        if (!options.name) {
            throw new schematics_1.SchematicsException(`Invalid options, "name" is required.`);
        }
        const res = schematics_1.chain([
            addDependenciesToPackageJson(options)
        ]);
        return res(host, context);
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map