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
        id: "1ba3f730-efe8-47d5-be67-4d1f90fed52a",
        name: "eslint",
        path: "/Users/syj/Desktop/project/node-cli/package.json",
        type: "devDependencies",
        version: "^8.45.0",
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
        id: "1ba3f730-efe8-47d5-be67-4d1f90fed52a",
        name: "eslint",
        path: "/Users/syj/Desktop/project/node-cli/package.json",
        type: "devDependencies",
        version: "^8.45.0",
      },
      {
        cid: ["1ba3f730-efe8-47d5-be67-4d1f90fed52a"],
        id: "4046c0c3-634b-495c-9d89-b64e12e92153",
        name: "@eslint-community/eslint-utils",
        path: "/Users/syj/Desktop/project/node-cli/node_modules/eslint/package.json",
        type: "dependencies",
        version: "^4.2.0",
      },
    ]);
  });
});
