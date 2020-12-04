import peerDepsExternal from "rollup-plugin-peer-deps-external"
import babel from "@rollup/plugin-babel"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import postcss from "rollup-plugin-postcss"
import svgr from "@svgr/rollup"
import url from "@rollup/plugin-url"
import { terser } from "rollup-plugin-terser"

export default {
    input: "src/index.js",
    output: [
        {
            file: "build/index.js",
            format: "cjs",
            plugins: [terser()],
            exports: "named"
        }
    ],
    external: ["react", "react-dom", "react-date-object"],
    plugins: [
        resolve(),
        peerDepsExternal(),
        babel({
            exclude: /node_modules/,
            presets: ["@babel/preset-react", "@babel/preset-env"]
        }),
        commonjs(),
        postcss(),
        svgr(),
        url()
    ]
}
