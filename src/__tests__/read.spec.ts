import { getPackagePaths } from "../../scripts/cli";

describe.skip("cli command", () => {
  it("shoule return null", () => {
    const paths = getPackagePaths(process.cwd());
    expect(paths).toMatchSnapshot();
  });
});
