"use client";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./theme/switcher";

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between w-full space-x-6 text-sm font-medium shadow">
      <Button className="text-sm">Poll Creator</Button>

      <ThemeSwitcher />
    </nav>
  );
}
