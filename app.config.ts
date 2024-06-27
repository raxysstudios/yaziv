export default defineAppConfig({
  ui: {
    primary: "slate",
    gray: "slate",
    button: {
      base: "group",
      default: {
        color: "gray",
        variant: "ghost"
      },
      color: {
        gray: {
          ghost: "hover:bg-gray-100 active:bg-gray-200"
        }
      },
      icon: {
        base: "group-hover:scale-105"
      }
    },
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
