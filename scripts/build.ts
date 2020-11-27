import { emptyDir, copy } from "fs-extra";

const testRegex = /test/;

(async () => {
	// Empty dist
	await emptyDir("dist");

	// Copy w3ts-jsx
	await copy("src", "dist/src", { filter: (path) => !testRegex.test(path) });

	// Copy modules
	await copy(
		"node_modules/basic-pragma/src",
		"dist/node_modules/basic-pragma/src",
		{ filter: (path) => !testRegex.test(path) },
	);
})();
