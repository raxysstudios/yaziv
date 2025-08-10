export default defineAppConfig({
  ui: {
    colors: {
      primary: "slate",
    },
    button: {
      slots: {
        base: "group cursor-pointer",
        leadingIcon: "transition group-hover:scale-105 group-active:scale-100",
      },
      defaultVariants: {
        color: "neutral",
        variant: "ghost",
      },
      compoundVariants: [
        {
          variant: "ghost",
          class: "hover:bg-neutral-100 active:bg-neutral-50",
        }
      ],
    },
    select: {
      slots: {
        base: [
          "justify-center font-medium capitalize cursor-pointer!",
          "hover:bg-neutral-100 active:bg-neutral-50"
        ],
        trailing: 'hidden',
        item: "justify-center font-medium capitalize cursor-pointer!",
        itemTrailing: "hidden",
      },
    },
  },
});
