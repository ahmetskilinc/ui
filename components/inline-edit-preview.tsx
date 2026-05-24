"use client";

import { useState } from "react";
import { InlineEdit } from "@/registry/default/components/inline-edit";

export default function InlineEditPreview() {
  const [title, setTitle] = useState("Untitled project");
  const [description, setDescription] = useState(
    "A description that lets you click and edit in place. Press Esc to cancel.",
  );
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <InlineEdit
        value={title}
        onChange={setTitle}
        textClassName="text-lg font-semibold"
        required
      />
      <InlineEdit
        value={description}
        onChange={setDescription}
        multiline
        textClassName="text-sm text-muted-foreground"
        placeholder="Add a description"
      />
    </div>
  );
}
