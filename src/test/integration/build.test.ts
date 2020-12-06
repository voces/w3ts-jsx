import * as tstl from "typescript-to-lua";
import { readFileSync } from "fs";

it("works", async () => {
	const result = tstl.transpileProject(
		"src/test/integration/tsconfig.test.json",
	);

	expect(result.diagnostics).toHaveLength(0);

	const lua = readFileSync(
		"src/test/integration/__lua__/bundle.lua",
		"utf-8",
	);

	expect(lua).toMatchSnapshot();
	expect(lua.indexOf("createTextElement") >= 0).toBeTruthy();
});
