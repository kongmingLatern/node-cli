import { getModuleJSON, readPackageDependency } from "@scripts/cli";
import { cli } from "../node/cli";

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

describe("should return all modules's size", () => {
  it("should return all modules", () => {
    const arrPackages = getModuleJSON(readPackageDependency(process.cwd()));
    expect(arrPackages.size).toBe(402);
  });
});
