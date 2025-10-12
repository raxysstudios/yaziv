export default defineAppConfig({
  ui: {
    colors: {
      primary: "zinc",
      neutral: "zinc",
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
          class: "hover:bg-elevated/75 active:bg-accented/75",
        },
      ],
    },
    select: {
      slots: {
        base: "justify-center font-medium capitalize cursor-pointer! pe-2.5!",
        trailing: 'hidden',
        item: "justify-center font-medium capitalize cursor-pointer!",
        itemTrailing: "hidden",
      },
      defaultVariants: {
        color: "neutral",
        variant: "ghost",
      },
      compoundVariants: [
        {
          variant: "ghost",
          class: "hover:bg-elevated/75 active:bg-accented/75",
        },
      ],
    },
  },
});
