"use client";

import { useState } from "react";
import { TagsInput } from "@/registry/default/components/tags-input";

export default function TagsInputPreview() {
  const [tags, setTags] = useState<string[]>(["nextjs", "shadcn", "typescript"]);
  return (
    <div className="w-full max-w-sm">
      <TagsInput
        value={tags}
        onChange={setTags}
        placeholder="Add a tag..."
        maxTags={8}
        formatTag={(t) => t.toLowerCase().replace(/\s+/g, "-")}
        validate={(t) =>
          /^[a-z0-9-]+$/i.test(t) || "Letters, numbers and dashes only"
        }
      />
    </div>
  );
}
