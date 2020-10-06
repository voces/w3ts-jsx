module.exports = {
	globals: { "ts-jest": { tsConfig: "tsconfig.json" } },
	moduleFileExtensions: ["ts", "tsx", "js"],
	moduleNameMapper: {
		"^test/(.*)$": "<rootDir>/test/$1",
	},
	transformIgnorePatterns: [],
	transform: {
		"^.+\\.tsx?$": "ts-jest",
		"^.+\\.jsx?$": "babel-jest",
	},
	testRegex: "(/src/.*\\.test)\\.[tj]sx?$",
	testEnvironment: "node",
	modulePaths: ["src"],
	// setupFilesAfterEnv: ["./src/test/setup.ts"],
};
