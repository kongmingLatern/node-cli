import { Dependency } from ".";

export interface DependencyType {
  cid: string[];
  id: string;
  name: string;
  path?: string;
  type: string;
  version: string;
}

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

export function handleJSON(dependencies: Set<Dependency>) {
  const dependencyMap: Record<string, Dependency> = {};

  for (const dep of dependencies) {
    dependencyMap[dep.id] = {
      ...dep,
      cid: [],
    } as never;
  }
  console.log("dependencyMap", dependencies);

  for (const dep of dependencies) {
    const { id, name } = dep;

    for (const otherDep of dependencies) {
      if (
        id !== otherDep.id &&
        otherDep.path?.includes(name + "/package.json")
      ) {
        dependencyMap[otherDep.id].cid.push(id);
      }
    }
  }

  return Object.values(dependencyMap);
}
