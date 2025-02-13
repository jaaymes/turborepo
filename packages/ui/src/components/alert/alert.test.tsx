import { render } from "@testing-library/react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

describe("Alert Component", () => {
  it("renders the Alert component with default variant", () => {
    const { getByRole } = render(<Alert>Default Alert</Alert>);
    const alert = getByRole("alert");
    expect(alert).toHaveClass("bg-background text-foreground");
  });

  it("renders the Alert component with destructive variant", () => {
    const { getByRole } = render(
      <Alert variant="destructive">Destructive Alert</Alert>
    );
    const alert = getByRole("alert");
    expect(alert).toHaveClass("border-destructive/50 text-destructive");
  });

  it("renders the AlertTitle component", () => {
    const { getByText } = render(<AlertTitle>Alert Title</AlertTitle>);
    const title = getByText("Alert Title");
    expect(title).toHaveClass("mb-1 font-medium leading-none tracking-tight");
  });

  it("renders the AlertDescription component", () => {
    const { getByText } = render(
      <AlertDescription>Alert Description</AlertDescription>
    );
    const description = getByText("Alert Description");
    expect(description).toHaveClass("text-sm");
  });
});
