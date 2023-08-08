import { Dependency } from "..";
import { handleJSON } from "../handle";

interface DependencyType {
  cid: string[];
  id: string;
  name: string;
  path: string;
  type: string;
  version: string;
}

describe("it should handle json", () => {
  it("should return cid", () => {
    const result: DependencyType[] = [
      {
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
    ];
    expect(handleJSON(result as Dependency[])).toEqual([
      {
        cid: [],
        id: "f7b6835d-f82e-43d3-ae57-681025eada14",
        name: "eslint",
        path: "/Users/syj/Desktop/project/node-cli/node_modules/axios/package.json",
        type: "devDependencies",
        version: "^8.17.0",
      },
      {
        cid: ["f7b6835d-f82e-43d3-ae57-681025eada14"],
        id: "4046c0c3-634b-495c-9d89-b64e12e92153",
        name: "@eslint-community/eslint-utils",
        path: "/Users/syj/Desktop/project/node-cli/node_modules/eslint/package.json",
        type: "dependencies",
        version: "^4.2.0",
      },
    ]);
  });
});
