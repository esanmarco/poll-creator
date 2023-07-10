"use client";

import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { PlusSquare } from "lucide-react";
import { useRouter } from "next/navigation";

const pollSchema = z.object({
  title: z.string().min(1),
  options: z.array(z.string().min(1)),
});

export type Poll = z.infer<typeof pollSchema>;

/**
 * Todo:
 * - Add "email address" field to form
 * - Handle data validation & submission / rehydration
 */

export default function CreatePoll() {
  const router = useRouter();
  const [optionCount, setOptionCount] = useState(2);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const { title, ...rest } = data;
    const optionsArray = Object.values(rest);

    await fetch(`/api/polls`, {
      method: "POST",
      body: JSON.stringify({
        title,
        options: optionsArray,
      }),
    });

    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input name="title" type="text" placeholder="Poll Title" />
      <hr />

      <div className="flex flex-col items-start gap-2">
        <p>Poll Options:</p>
        {Array.from({ length: optionCount }).map((_, i) => (
          <Input
            key={i}
            name={`options[${i}]`}
            type="text"
            placeholder="Poll Option"
          />
        ))}

        <Button onClick={() => setOptionCount(optionCount + 1)}>
          <PlusSquare />
        </Button>
      </div>

      <Button variant="outline" color="secondary" className="w-fit">
        Create Poll
      </Button>
    </form>
  );
}
