export default defineAppConfig({
  ui: {
    colors: {
      primary: "gray",
      neutral: "gray",
    },
    button: {
      slots: {
        base: "cursor-pointer transition",
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
        base: [
          "justify-center font-medium capitalize cursor-pointer!",
          "hover:bg-neutral-100 active:bg-neutral-200"
        ],
        trailing: 'hidden',
        item: "justify-center font-medium capitalize cursor-pointer!",
        itemTrailing: "hidden",
      },
    },
  },
});
