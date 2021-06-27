import peerDepsExternal from "rollup-plugin-peer-deps-external";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import cssvariables from "postcss-css-variables";
import svgr from "@svgr/rollup";
import url from "@rollup/plugin-url";
import { terser } from "rollup-plugin-terser";

const external = [
  "react",
  "react-dom",
  "react-date-object",
  "react-element-popper",
];

const presets = ["@babel/preset-react", "@babel/preset-env"];

const globals = {
  react: "React",
  "react-date-object": "DateObject",
  "react-element-popper": "ElementPopper",
};

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: "build/index.js",
        format: "cjs",
        plugins: [terser()],
        exports: "named",
      },
    ],
    external,
    plugins: [
      resolve(),
      peerDepsExternal(),
      babel({
        exclude: /node_modules/,
        presets,
      }),
      commonjs(),
      postcss({ plugins: [cssvariables()] }),
      svgr(),
      url(),
    ],
  },
  {
    input: "src/index_browser.js",
    output: [
      {
        file: "build/browser.min.js",
        format: "umd",
        plugins: [terser()],
        name: "ReactMultiDatePicker",
        exports: "named",
        globals,
      },
    ],
    external,
    plugins: [
      resolve(),
      peerDepsExternal(),
      babel({
        exclude: /node_modules/,
        presets,
      }),
      commonjs(),
      postcss({ plugins: [cssvariables()] }),
      svgr(),
      url(),
    ],
  },
  ...[
    "date_panel",
    "date_picker_header",
    "multi_colors",
    "settings",
    "toolbar",
    "weekends",
    "time_picker",
    "analog_time_picker",
    "range_picker_footer",
  ].map((path) => {
    let name = path
      .replace(/^./, (w) => w.toUpperCase())
      .replace(/_./g, (w) => w.replace("_", "").toUpperCase());

    return {
      input: `src/plugins/${path}/${path}.js`,
      output: [
        {
          file: `plugins/${path}.js`,
          format: "cjs",
          plugins: [terser()],
          exports: "named",
        },
        {
          file: `build/${path}.browser.js`,
          format: "umd",
          plugins: [terser()],
          name,
          exports: "default",
          globals,
        },
      ],
      external,
      plugins: [
        resolve(),
        peerDepsExternal(),
        babel({
          exclude: /node_modules/,
          presets,
        }),
        commonjs(),
        postcss({ plugins: [cssvariables()] }),
        svgr(),
        url(),
      ],
    };
  }),
];
