import type { Preview } from "@storybook/react";
import "@workspace/ui/globals.scss";

/* TODO: update import to your tailwind styles file */

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [],
};

export default preview;
