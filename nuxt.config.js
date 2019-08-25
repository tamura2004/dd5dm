import colors from "vuetify/es5/util/colors";

module.exports = {
  mode: "spa",
  head: {
    title: "dd5tools",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "tool for D&D 5e offline game session",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  devModules: ["@nuxtjs/vuetify"],
  plugins: [
    "~/plugins/firebase.js",
    "~/plugins/components.js",
    "~/plugins/filters.js",
    "~/plugins/layout/title.js",
  ],
  router: {
    middleware: ["firebase"],
  },
  vuetify: {
    customVariables: ["~/assets/variables.sass"],
    theme: {
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken4,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
};
