import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

// Definindo o tipo para os props do Alert
type AlertProps = React.ComponentProps<typeof Alert>;

export default {
  title: "Components/Alert",
  component: Alert,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["default", "destructive", "info"],
      },
    },
  },
} as Meta<AlertProps>;

const Template: StoryFn<AlertProps> = (args) => (
  <Alert {...args}>
    <AlertTitle>Alert Title</AlertTitle>
    <AlertDescription>This is an alert description.</AlertDescription>
  </Alert>
);

export const Default: StoryFn<AlertProps> = Template.bind({});
Default.args = {
  variant: "default",
};

export const Destructive: StoryFn<AlertProps> = Template.bind({});
Destructive.args = {
  variant: "destructive",
};

export const Info: StoryFn<AlertProps> = Template.bind({});
Info.args = {
  variant: "info",
};
