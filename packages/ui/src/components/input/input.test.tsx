import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Input } from "./input";

describe("Componente Input", () => {
  it("deve renderizar o elemento input", () => {
    render(<Input type="text" placeholder="Enter text" />);

    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();
  });

  it("deve aplicar className personalizada", () => {
    render(<Input type="text" className="custom-class" />);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveClass("custom-class");
  });

  it("deve encaminhar a ref para o elemento input", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input type="text" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
