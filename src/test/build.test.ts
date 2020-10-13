import * as tstl from "typescript-to-lua";
import { readFileSync } from "fs";

it("works", async () => {
	const result = tstl.transpileProject("src/test/tsconfig.test.json");

	expect(result.diagnostics).toHaveLength(0);

	const lua = readFileSync("src/test/__lua__/bundle.lua", "utf-8");

	expect(lua).toMatchSnapshot();
	expect(lua.indexOf("createTextElement") >= 0).toBeTruthy();
});
