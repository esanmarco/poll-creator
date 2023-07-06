"use client";

import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "../ui/button";

const pollSchema = z.object({
  title: z.string().min(1),
  options: z.array(z.string().min(1)),
});

export type Poll = z.infer<typeof pollSchema>;

export default function CreatePoll() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch(`http//localhost:3000/api/polls`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const poll = await res.json();
    console.log(poll);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input type="text" placeholder="Poll Title" />
      <hr />

      <Input type="text" placeholder="Option 1" />
      <Input type="text" placeholder="Option 2" />

      <Button
        variant="outline"
        color="secondary"
        className="w-fit"
        disabled={!pollSchema.safeParse({ title: "", options: [] }).success}
      >
        Create Poll
      </Button>
    </form>
  );
}
