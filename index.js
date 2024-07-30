const {
  input,
  div,
  text,
  pre,
  script,
  domReady,
  text_attr,
} = require("@saltcorn/markup/tags");
const db = require("@saltcorn/data/db");

const headers = [
  {
    script: `/static_assets/${db.connectObj.version_tag}/mermaid.min.js`,
  },
];

const mermaid = {
  type: "String",
  isEdit: false,
  /*configFields: [
   
  ],*/
  run: (v, req, attrs = {}) => {
    return (
      pre({ class: "mermaid" }, v) +
      script(
        domReady(
          `if(!window._sc_init_mermaid){
          window._sc_init_mermaid = true;
          mermaid.initialize();
          }`
        )
      )
    );
  },
};

module.exports = {
  sc_plugin_api_version: 1,
  fieldviews: {
    mermaid,
  },
  plugin_name: "mermaid",
  headers,
};
