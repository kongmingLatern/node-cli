import {
  getModuleJSON,
  getPackageDependency,
  readPackageJson,
  readPackageJsonFiles,
} from "@scripts/cli";
import { cli } from "../node/cli";
import { handleJSON } from "@scripts/utils";

vi.mock("../node/cli");

describe("cli command", () => {
  it("shoule return null", () => {
    const result = cli.parse([
      "node-cli",
      "analyze",
      "--depth=3",
      "--json",
      "2",
    ]);
    expect(result).toMatchInlineSnapshot("undefined");
  });
});

describe.skip("should return all modules's size", () => {
  it("should return all modules", () => {
    const arrPackages = getModuleJSON(
      getPackageDependency(readPackageJson(process.cwd()))
    );
    // expect(arrPackages).toMatchSnapshot();
    expect(arrPackages.size).toBe(461);
    // expect(arrPackages.size).toBe(903);
  });
});

describe("should return all Dependency", () => {
  it.skip("should return", () => {
    const result = readPackageJsonFiles(process.cwd());
    expect(result).toMatchSnapshot();
  });

  it.skip("should return", () => {
    const result = handleJSON(readPackageJsonFiles(process.cwd())!);
    expect(result).toMatchSnapshot();
  });
});
