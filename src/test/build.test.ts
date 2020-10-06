import * as tstl from "typescript-to-lua";
import { readFileSync } from "fs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globals: any = globalThis;
globals.TEXT_JUSTIFY_TOP = 0;
globals.TEXT_JUSTIFY_LEFT = 0;

it("works", async () => {
	const result = tstl.transpileProject("src/test/test.tsconfig.json");

	expect(result.diagnostics).toHaveLength(0);

	const lua = readFileSync("src/test/__lua__/bundle.lua", "utf-8");

	expect(lua).toMatchSnapshot();
});
