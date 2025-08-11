// .lintstagedrc.mjs
import path from "path";

const buildEslintCommand = (files) =>
	`pnpm exec next lint --fix --file ${files
		.map((f) => path.relative(process.cwd(), f))
		.join(" --file ")}`;

export default {
	"*.{ts,tsx}": [
		"pnpm exec prettier --write --ignore-unknown",
		() => "pnpm exec tsc -p tsconfig.json --noEmit --pretty false",
		buildEslintCommand,
	],
	"*.{js,jsx}": ["pnpm exec prettier --write --ignore-unknown", buildEslintCommand],
	"*.{css,md,mdx,json,yml,yaml}": "pnpm exec prettier --write --ignore-unknown",
};
