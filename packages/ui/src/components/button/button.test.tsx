import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button, buttonVariants } from "./button";

describe("Button Component", () => {
  test("deve renderizar o botão com o texto fornecido", () => {
    render(<Button>Clique aqui</Button>);
    const button = screen.getByRole("button", { name: /clique aqui/i });
    expect(button).toBeInTheDocument();
  });

  test("deve aplicar a variante default corretamente", () => {
    render(<Button variant="default">Default</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary");
    expect(button).toHaveClass("text-primary-foreground");
  });

  test("deve aplicar a variante destructive corretamente", () => {
    render(<Button variant="destructive">Destructive</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-destructive");
    expect(button).toHaveClass("text-destructive-foreground");
  });

  test("deve aplicar o tamanho sm corretamente", () => {
    render(<Button size="sm">Pequeno</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-8");
    expect(button).toHaveClass("px-3");
    expect(button).toHaveClass("text-xs");
  });

  test("deve chamar a função onClick quando clicado", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clique</Button>);

    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("deve renderizar como Slot quando asChild é true", () => {
    render(
      <Button asChild variant="link">
        <a href="/">Link</a>
      </Button>
    );
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass(buttonVariants({ variant: "link" }));
  });

  test("deve estar desabilitado quando disabled é true", () => {
    render(<Button disabled>Desabilitado</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
