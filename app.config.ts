export default defineAppConfig({
  ui: {
    primary: "sky",
    gray: "slate",
    select: {
      base: "justify-center font-medium capitalize !cursor-pointer",
      default: { trailingIcon: "" },
    },
    selectMenu: {
      default: { selectedIcon: "" },
      option: {
        selected: "pe-2",
        base: "justify-center font-medium capitalize cursor-pointer",
        icon: { base: "hidden" },
        selectedIcon: { base: "hidden" }
      },
    },
  },
});
