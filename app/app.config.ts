export default defineAppConfig({
  ui: {
    colors: {
      primary: "slate",
      neutral: "slate",
    },
    button: {
      slots: {
        base: "group cursor-pointer",
        leadingIcon: "group-hover:scale-105 group-active:scale-100",
      },
      defaultVariants: {
        color: "neutral",
        variant: "ghost",
      },
      compoundVariants: [
        {
          variant: "ghost",
          class: "hover:bg-neutral-100 active:bg-neutral-200",
        }
      ],
    },
    select: {
      slots: {
        base: "justify-center font-medium capitalize cursor-pointer!",
      },
      default: { trailingIcon: "" },
    },
    // selectMenu: {
    //   defaultVariants: {  selectedIcon: "" },
    //   option: {
    //     selected: "pe-2",
    //     base: "justify-center font-medium capitalize cursor-pointer",
    //     icon: { base: "hidden" },
    //     selectedIcon: { base: "hidden" }
    //   },
    // },
  },
});
