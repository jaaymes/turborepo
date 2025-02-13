import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Digite algo aqui...",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Input desabilitado",
    disabled: true,
  },
};

export const WithType: Story = {
  args: {
    type: "password",
    placeholder: "Digite sua senha",
  },
};

export const WithValue: Story = {
  args: {
    value: "Texto preenchido",
    onChange: (e) => console.log(e.target.value),
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Input com erro",
    className: "border-red-500",
  },
};
