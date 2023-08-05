import { getModules, analysisPackage } from "@scripts/cli";
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

describe.skip("should return all modules", () => {
  it("should return all modules", () => {
    const arrPackage = analysisPackage(process.cwd());
    const arrPackages = getModules(arrPackage);
    expect(arrPackages).toMatchInlineSnapshot(`
      [
        {
          "id": "b73114e7-efa8-40b9-b406-3058ad524232",
          "name": "acorn",
          "pid": [],
          "version": "^8.9.0",
        },
        {
          "id": "1b10ded0-3e3a-4eb6-afc1-6790c16e117a",
          "name": "local-pkg",
          "pid": [],
          "version": "^0.4.3",
        },
        {
          "id": "557a2b9c-e1e7-41d0-84bf-eaa4e5b735b5",
          "name": "pathe",
          "pid": [],
          "version": "^1.1.1",
        },
        {
          "id": "9c27ad8b-4f37-4eed-8f70-4d44bdbee962",
          "name": "std-env",
          "pid": [],
          "version": "^3.3.3",
        },
        {
          "id": "69c12738-593b-4951-bce9-6328db867ca4",
          "name": "tinybench",
          "pid": [],
          "version": "^2.5.0",
        },
        {
          "id": "b9101e21-f771-4950-ae70-32d4e1edbaf7",
          "name": "tinypool",
          "pid": [],
          "version": "^0.7.0",
        },
        {
          "id": "25e37134-2a66-4074-8237-2776b144a455",
          "name": "vite",
          "pid": [],
          "version": "^3.0.0 || ^4.0.0",
        },
        {
          "id": "37178c3e-8b1d-4697-9257-404253abb1cc",
          "name": "why-is-node-running",
          "pid": [],
          "version": "^2.2.2",
        },
        {
          "id": "c5933d4c-d17a-4b51-93a3-ca628a5d823f",
          "name": "vite-node",
          "pid": [],
          "version": "0.34.1",
        },
        {
          "id": "09d3cc50-8a32-4759-beec-fbc3195fda64",
          "name": "birpc",
          "pid": [],
          "version": "0.2.12",
        },
        {
          "id": "3e5eec4c-f95f-41d3-8434-3be03bae595e",
          "name": "chai-subset",
          "pid": [],
          "version": "^1.6.0",
        },
        {
          "id": "4082d85f-8760-4a67-889e-5f035c19943e",
          "name": "cli-truncate",
          "pid": [],
          "version": "^3.1.0",
        },
        {
          "id": "c46f73b9-59d5-4b18-bd76-086351dd1bf5",
          "name": "event-target-polyfill",
          "pid": [],
          "version": "^0.0.3",
        },
        {
          "id": "bcd61ef9-38a9-46f0-b30f-cea0dbe4d5e8",
          "name": "execa",
          "pid": [],
          "version": "^7.1.1",
        },
        {
          "id": "df9bafcf-3724-4dab-8ee5-bc241d2a6473",
          "name": "expect-type",
          "pid": [],
          "version": "^0.16.0",
        },
        {
          "id": "e2971b4f-0cd1-4c2b-8707-57ffa638ab2d",
          "name": "find-up",
          "pid": [],
          "version": "^6.3.0",
        },
        {
          "id": "5c7cc468-0329-411e-9d71-8f372ba7145a",
          "name": "flatted",
          "pid": [],
          "version": "^3.2.7",
        },
        {
          "id": "f4140e56-233c-4faa-b5f7-86e328e6b545",
          "name": "get-tsconfig",
          "pid": [],
          "version": "^4.6.2",
        },
        {
          "id": "69115657-ece8-4e4a-be59-14c8882d8964",
          "name": "happy-dom",
          "pid": [],
          "version": "^9.20.3",
        },
        {
          "id": "ca79fdf0-e389-4ffc-8fe3-4c5527b039a2",
          "name": "jsdom",
          "pid": [],
          "version": "^22.1.0",
        },
        {
          "id": "e725341e-5b9c-40af-b65d-6704d188ed76",
          "name": "log-update",
          "pid": [],
          "version": "^5.0.1",
        },
        {
          "id": "d1e46fa0-5890-4382-bc45-97f9181ac32b",
          "name": "p-limit",
          "pid": [],
          "version": "^4.0.0",
        },
        {
          "id": "aef0d8f6-d5cd-4239-9a3e-335661804e5f",
          "name": "pkg-types",
          "pid": [],
          "version": "^1.0.3",
        },
        {
          "id": "b2ed5db4-9282-41f4-9068-daaa6bd1ff5c",
          "name": "playwright",
          "pid": [],
          "version": "^1.35.1",
        },
        {
          "id": "26abde29-d0d1-4e01-8dac-a715a554ecad",
          "name": "pretty-format",
          "pid": [],
          "version": "^29.5.0",
        },
        {
          "id": "a312265b-20b9-4596-b3b3-341303754601",
          "name": "prompts",
          "pid": [],
          "version": "^2.4.2",
        },
        {
          "id": "44a433e8-3c24-4902-8fdb-74c4c74595a9",
          "name": "safaridriver",
          "pid": [],
          "version": "^0.0.5",
        },
        {
          "id": "31848cfb-9f44-4e75-bd35-349a033fd427",
          "name": "webdriverio",
          "pid": [],
          "version": "^8.11.2",
        },
      ]
    `);
  });
});
