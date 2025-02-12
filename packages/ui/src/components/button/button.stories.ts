import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Histórias básicas para cada variante
export const Default: Story = {
  args: {
    children: "Botão Padrão",
    variant: "default",
  },
};

export const Destructive: Story = {
  args: {
    children: "Botão Destrutivo",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Botão Outline",
    variant: "outline",
  },
};

export const Secondary: Story = {
  args: {
    children: "Botão Secundário",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Botão Ghost",
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    children: "Botão Link",
    variant: "link",
  },
};

// Histórias para diferentes tamanhos
export const Small: Story = {
  args: {
    children: "Botão Pequeno",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Botão Grande",
    size: "lg",
  },
};

// Exemplo de botão desabilitado
export const Disabled: Story = {
  args: {
    children: "Botão Desabilitado",
    disabled: true,
  },
};
