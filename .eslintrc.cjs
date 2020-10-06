module.exports = {
	extends: ["verit"],
	rules: {
		eqeqeq: ["error", "always", { null: "never" }],
		"react/self-closing-comp": ["error"],
	},
	settings: {
		react: {
			pragma: "React",
			version: "16.2",
		},
	},
};
