import { DependencyType, handleJSON } from "../handle";

describe("it should handle json", () => {
  it("happy path", () => {
    const result = [
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
    expect(handleJSON(result as never)).toEqual([
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
  it("nested json", () => {
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
      {
        cid: [],
        id: "b23ec3a0-5817-414a-ab79-352cb3465281",
        name: "@eslint-community/regexpp",
        path: "/Users/syj/Desktop/project/node-cli/node_modules/eslint/package.json",
        type: "dependencies",
        version: "^4.4.0",
      },
    ];
    expect(handleJSON(result as never)).toEqual([
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
      {
        cid: ["1ba3f730-efe8-47d5-be67-4d1f90fed52a"],
        id: "b23ec3a0-5817-414a-ab79-352cb3465281",
        name: "@eslint-community/regexpp",
        path: "/Users/syj/Desktop/project/node-cli/node_modules/eslint/package.json",
        type: "dependencies",
        version: "^4.4.0",
      },
    ]);
  });
});
