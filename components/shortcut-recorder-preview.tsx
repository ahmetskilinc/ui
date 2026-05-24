"use client";

import { useState } from "react";
import { ShortcutRecorder } from "@/registry/default/components/shortcut-recorder";

export default function ShortcutRecorderPreview() {
  const [shortcut, setShortcut] = useState<string[]>(["Meta", "Shift", "K"]);
  return (
    <div className="flex flex-col items-start gap-3">
      <ShortcutRecorder
        value={shortcut}
        onChange={setShortcut}
        placeholder="Click to set"
      />
      <p className="text-xs text-muted-foreground">
        Click the field, then press a combination like ⌘+Shift+K. Press Esc to
        cancel.
      </p>
    </div>
  );
}
