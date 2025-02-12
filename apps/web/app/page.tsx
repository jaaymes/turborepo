import { Button, Input } from "@workspace/ui/components";
import "@workspace/ui/styles/globals.scss";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm">Button</Button>
        <Input />
      </div>
    </div>
  );
}
