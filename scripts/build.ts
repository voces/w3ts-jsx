import { emptyDir, copy } from "fs-extra";

(async () => {
	// Empty dist
	await emptyDir("dist");

	// Copy w3ts-jsx
	await copy("src", "dist/src", { filter: (src) => !/test/.test(src) });

	// Copy modules
	await copy(
		"node_modules/basic-pragma/src",
		"dist/node_modules/basic-pragma/src",
		{ filter: (src) => !/test/.test(src) },
	);
})();
