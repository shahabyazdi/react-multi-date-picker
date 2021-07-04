const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const { data } = await graphql(`
    query {
      allFile {
        edges {
          node {
            dir
            ext
            name
          }
        }
      }
    }
  `);

  data.allFile.edges.forEach((edge) => {
    const { dir, name, ext } = edge.node;

    if (name === "404") return;

    const component = path.resolve(dir, name + ext).replace(/\\.js$/, ".js");

    const pagePath = `fa${
      dir.includes("plugins")
        ? dir.replace(/(^.*)\/plugins/, "/plugins")
        : dir.includes("v2.x")
        ? dir.replace(/(^.*)\/v2.x/, "/v2.x")
        : ""
    }/${name === "index" ? "" : name + "/"}`;

    createPage({
      path: pagePath,
      component,
      context: {
        language: "fa",
      },
    });
  });
};
