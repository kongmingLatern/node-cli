import { Dependency } from ".";

/**
 *
 * @param dependencies 依赖关系
 * @returns Dependency[]
 * NOTE: INPUT
 * {
        cid: [],
        id: "f7b6835d-f82e-43d3-ae57-681025eada14",
        name: "eslint",
        path: "/Users/syj/Desktop/project/node-cli/node_modules/axios/package.json",
        type: "devDependencies",
        version: "^8.17.0",
      },
      {
        cid: [],
        id: "4046c0c3-634b-495c-9d89-b64e12e92153",
        name: "@eslint-community/eslint-utils",
        path: "/Users/syj/Desktop/project/node-cli/node_modules/eslint/package.json",
        type: "dependencies",
        version: "^4.2.0",
      },
 */

export function handleJSON(dependencies: Dependency[]) {
  const dependencyMap: Record<string, Dependency> = {};

  // Create a map of dependencies using their IDs
  for (const dep of dependencies) {
    dependencyMap[dep.id] = {
      ...dep,
      cid: [],
    };
  }

  // Populate the 'cid' property for each dependency based on path hierarchy
  for (const dep of dependencies) {
    const basePath = dep.path;

    // Check for other dependencies that have this path as a base or are subpaths
    for (const otherDep of dependencies) {
      console.log("otherDep", otherDep, basePath);

      if (dep.id !== otherDep.id && otherDep.path?.includes(dep.name!)) {
        dependencyMap[otherDep.id].cid.push(dep.id);
      }
    }
  }

  return Object.values(dependencyMap);
  // console.log(dependencies);
  // return [
  //   {
  //     cid: [],
  //     id: "1ba3f730-efe8-47d5-be67-4d1f90fed52a",
  //     name: "eslint",
  //     path: "/Users/syj/Desktop/project/node-cli/package.json",
  //     type: "devDependencies",
  //     version: "^8.45.0",
  //   },
  //   {
  //     cid: ["1ba3f730-efe8-47d5-be67-4d1f90fed52a"],
  //     id: "4046c0c3-634b-495c-9d89-b64e12e92153",
  //     name: "@eslint-community/eslint-utils",
  //     path: "/Users/syj/Desktop/project/node-cli/node_modules/eslint/package.json",
  //     type: "dependencies",
  //     version: "^4.2.0",
  //   },
  // ];
}
