export default defineAppConfig({
  ui: {
    primary: "sky",
    gray: "slate",
    select: {
      base: "justify-center font-medium capitalize !cursor-pointer",
      default: {
        trailingIcon: "",
      },
    },
    selectMenu: {
      default: { selectedIcon: "" },
      option: {
        base: "justify-center font-medium capitalize",
      },
    },
  },
});
