"use client";

import { Button } from "@/components/ui/button";
import { toast} from "sonner";

export default function Home() {
  return (
    <Button size="xs" onClick={() => toast("Hello, world!")}>
      Click me
    </Button>
  );
}