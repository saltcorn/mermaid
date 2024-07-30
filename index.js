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
    script: `static_assets/${db.connectObj.version_tag}/mermaid.min.js`,
  },
];

const mermaid = {
  type: "String",
  isEdit: true,
  /*configFields: [
   
  ],*/
  run: (v, req, attrs = {}) => {
    const rndid = Math.floor(Math.random() * 16777215).toString(16);
    const opts = {
      enableTime: !attrs.day_only,
      allowInput: attrs.allow_input,
      dateFormat: attrs.day_only ? "Y-m-d" : "Z",
      altInput: true,
      altFormat: attrs.dateFormat || (attrs.day_only ? "Y-m-d" : "Y-m-d H:i"),
      minDate: attrs.minDate,
      //maxDate: attrs.maxDate,
      locale: attrs.locale,
      defaultDate: attrs.default_now && !v ? new Date() : undefined,
      defaultHour: attrs.current_hm && !v ? new Date().getHours() : undefined,
      defaultMinute:
        attrs.current_hm && !v ? new Date().getMinutes() : undefined,
    };
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
