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
          class: "hover:bg-neutral-100 active:bg-neutral-200 dark:hover:bg-neutral-800 dark:active:bg-neutral-700",
        },
        {
          variant: "subtle",
          class: "hover:bg-accented!",
        }
      ],
    },
    select: {
      slots: {
        base: [
          "justify-center font-medium capitalize cursor-pointer! pe-2.5!",
          "hover:bg-neutral-100 active:bg-neutral-200 dark:hover:bg-neutral-800 dark:active:bg-neutral-700"
        ],
        trailing: 'hidden',
        item: "justify-center font-medium capitalize cursor-pointer!",
        itemTrailing: "hidden",
      },
    },
  },
});
