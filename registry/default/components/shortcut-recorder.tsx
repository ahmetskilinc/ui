"use client";

import * as React from "react";
import { IconPlaceholder } from "@/components/icon-placeholder";
import { cn } from "@/lib/utils";

const MOD_KEYS = new Set([
  "Meta",
  "Control",
  "Alt",
  "Shift",
  "OS",
  "Hyper",
  "Super",
]);

const KEY_DISPLAY: Record<string, string> = {
  Meta: "⌘",
  Control: "Ctrl",
  Alt: "Alt",
  Shift: "Shift",
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
  Enter: "↵",
  Escape: "Esc",
  Backspace: "⌫",
  Delete: "Del",
  Tab: "⇥",
  " ": "Space",
  Space: "Space",
};

export type ShortcutTokens = string[];

export interface ShortcutRecorderProps {
  value: ShortcutTokens;
  onChange: (value: ShortcutTokens) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  allowSingleKey?: boolean;
  allowedModifiers?: Array<"Meta" | "Control" | "Alt" | "Shift">;
  forbidden?: ShortcutTokens[];
  maxKeys?: number;
  autoCommitOnBlur?: boolean;
  separator?: React.ReactNode;
  onConflict?: (conflict: ShortcutTokens) => void;
}

const platformIsMac = () =>
  typeof navigator !== "undefined" &&
  /Mac|iPhone|iPad|iPod/.test(navigator.platform);

function normalizeKey(e: KeyboardEvent | React.KeyboardEvent): string | null {
  const key = e.key;
  if (!key) return null;
  if (key === "Control") return "Control";
  if (key === "Meta") return "Meta";
  if (key === "Alt") return "Alt";
  if (key === "Shift") return "Shift";
  if (key === " ") return "Space";
  if (key.length === 1) return key.toUpperCase();
  return key;
}

function tokensFromEvent(e: KeyboardEvent | React.KeyboardEvent): ShortcutTokens {
  const tokens: ShortcutTokens = [];
  if (e.metaKey) tokens.push("Meta");
  if (e.ctrlKey) tokens.push("Control");
  if (e.altKey) tokens.push("Alt");
  if (e.shiftKey) tokens.push("Shift");
  const key = normalizeKey(e);
  if (key && !MOD_KEYS.has(key)) tokens.push(key);
  return tokens;
}

export function shortcutMatches(
  e: KeyboardEvent | React.KeyboardEvent,
  tokens: ShortcutTokens,
): boolean {
  if (tokens.length === 0) return false;
  const evt = tokensFromEvent(e);
  if (evt.length !== tokens.length) return false;
  return tokens.every((t) => evt.includes(t));
}

export function formatShortcut(
  tokens: ShortcutTokens,
  opts?: { mac?: boolean },
) {
  const mac = opts?.mac ?? platformIsMac();
  return tokens.map((t) => {
    if (t === "Meta") return mac ? "⌘" : "Win";
    if (t === "Control") return mac ? "⌃" : "Ctrl";
    if (t === "Alt") return mac ? "⌥" : "Alt";
    if (t === "Shift") return mac ? "⇧" : "Shift";
    return KEY_DISPLAY[t] ?? t;
  });
}

export function ShortcutRecorder({
  value,
  onChange,
  placeholder = "Press shortcut",
  className,
  disabled,
  allowSingleKey = false,
  allowedModifiers,
  forbidden,
  maxKeys = 4,
  autoCommitOnBlur = true,
  separator = "+",
  onConflict,
}: ShortcutRecorderProps) {
  const [recording, setRecording] = React.useState(false);
  const [draft, setDraft] = React.useState<ShortcutTokens>([]);
  const subscribePlatform = React.useCallback(() => () => {}, []);
  const mac = React.useSyncExternalStore(
    subscribePlatform,
    () => platformIsMac(),
    () => false,
  );

  const stop = React.useCallback(() => {
    setRecording(false);
    setDraft([]);
  }, []);

  const commit = React.useCallback(
    (tokens: ShortcutTokens) => {
      if (tokens.length === 0) return;
      const hasNonMod = tokens.some((t) => !MOD_KEYS.has(t));
      const hasMod = tokens.some((t) => MOD_KEYS.has(t));
      if (!allowSingleKey && !hasMod) return;
      if (!hasNonMod) return;
      if (allowedModifiers) {
        const mods = tokens.filter((t) => MOD_KEYS.has(t));
        const ok = mods.every((m) =>
          (allowedModifiers as string[]).includes(m),
        );
        if (!ok) return;
      }
      if (forbidden?.some((f) => sameTokens(f, tokens))) {
        onConflict?.(tokens);
        return;
      }
      onChange(tokens);
      setRecording(false);
      setDraft([]);
    },
    [allowSingleKey, allowedModifiers, forbidden, onChange, onConflict],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!recording) return;
    e.preventDefault();
    e.stopPropagation();
    if (e.key === "Escape") {
      stop();
      return;
    }
    const tokens = tokensFromEvent(e);
    if (tokens.length > maxKeys) return;
    setDraft(tokens);
    const hasFinalKey = tokens.some((t) => !MOD_KEYS.has(t));
    if (hasFinalKey) commit(tokens);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!recording) return;
    if (draft.length > 0 && draft.every((t) => MOD_KEYS.has(t))) {
      setDraft(tokensFromEvent(e));
    }
  };

  const display = recording
    ? draft.length
      ? formatShortcut(draft, { mac })
      : []
    : formatShortcut(value, { mac });

  const showPlaceholder = recording ? draft.length === 0 : value.length === 0;

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <button
        type="button"
        role="textbox"
        aria-label="Keyboard shortcut"
        aria-readonly={!recording}
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          setRecording(true);
          setDraft([]);
        }}
        onBlur={() => {
          if (recording) {
            if (autoCommitOnBlur && draft.length > 0) {
              commit(draft);
            } else {
              stop();
            }
          }
        }}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        data-recording={recording ? "true" : undefined}
        className={cn(
          "inline-flex h-9 min-w-32 items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs ring-offset-background transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 data-[recording=true]:border-ring data-[recording=true]:ring-2 data-[recording=true]:ring-ring/30",
        )}
      >
        <span className="flex items-center gap-1">
          {showPlaceholder ? (
            <span className="text-muted-foreground">
              {recording ? "Press keys…" : placeholder}
            </span>
          ) : (
            display.map((label, i) => (
              <React.Fragment key={`${label}-${i}`}>
                {i > 0 && (
                  <span className="text-muted-foreground/70">{separator}</span>
                )}
                <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-[11px] font-medium text-foreground shadow-[inset_0_-1px_0_0_var(--color-border)]">
                  {label}
                </kbd>
              </React.Fragment>
            ))
          )}
        </span>
        <span className="flex items-center gap-1">
          {recording ? (
            <span className="size-2 rounded-full bg-destructive animate-pulse" />
          ) : (
            <IconPlaceholder
              lucide="CommandIcon"
              tabler="IconCommand"
              hugeicons="CommandIcon"
              phosphor="CommandIcon"
              className="size-3.5 text-muted-foreground"
            />
          )}
        </span>
      </button>
      {value.length > 0 && !disabled && !recording && (
        <button
          type="button"
          aria-label="Clear shortcut"
          onClick={() => onChange([])}
          className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
        >
          <IconPlaceholder
            lucide="XIcon"
            tabler="IconX"
            hugeicons="Cancel01Icon"
            phosphor="XIcon"
            className="size-4"
          />
        </button>
      )}
    </div>
  );
}

function sameTokens(a: ShortcutTokens, b: ShortcutTokens) {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.every((t, i) => t === sb[i]);
}

export function useKeyboardShortcut(
  tokens: ShortcutTokens,
  handler: (e: KeyboardEvent) => void,
  opts?: { enabled?: boolean; target?: HTMLElement | Document | null },
) {
  React.useEffect(() => {
    if (opts?.enabled === false) return;
    const target = opts?.target ?? (typeof document !== "undefined" ? document : null);
    if (!target) return;
    const listener = (e: Event) => {
      const ev = e as KeyboardEvent;
      if (shortcutMatches(ev, tokens)) {
        handler(ev);
      }
    };
    target.addEventListener("keydown", listener);
    return () => target.removeEventListener("keydown", listener);
  }, [tokens, handler, opts?.enabled, opts?.target]);
}
