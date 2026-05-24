"use client";

import * as React from "react";
import { IconPlaceholder } from "@/components/icon-placeholder";
import { cn } from "@/lib/utils";

export interface TagsInputProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "size"> {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  delimiters?: string[];
  maxTags?: number;
  validate?: (tag: string) => boolean | string;
  duplicates?: "ignore" | "allow";
  formatTag?: (raw: string) => string;
  containerClassName?: string;
  tagClassName?: string;
  disabled?: boolean;
  clearable?: boolean;
  pasteSplit?: RegExp;
  size?: "sm" | "default" | "lg";
}

const sizes = {
  sm: "min-h-8 text-xs px-1.5 py-1 gap-1",
  default: "min-h-10 text-sm px-2 py-1.5 gap-1.5",
  lg: "min-h-12 text-base px-2.5 py-2 gap-1.5",
} as const;

export function TagsInput({
  value,
  onChange,
  placeholder = "Add tag...",
  delimiters = ["Enter", ","],
  maxTags,
  validate,
  duplicates = "ignore",
  formatTag,
  containerClassName,
  tagClassName,
  disabled,
  clearable = true,
  pasteSplit = /[\n,;]+/,
  size = "default",
  className,
  onBlur,
  onKeyDown,
  onPaste,
  ...inputProps
}: TagsInputProps) {
  const [draft, setDraft] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [focusedTag, setFocusedTag] = React.useState<number | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const commit = React.useCallback(
    (raw: string) => {
      const candidate = (formatTag ? formatTag(raw) : raw).trim();
      if (!candidate) return false;
      if (duplicates === "ignore" && value.includes(candidate)) {
        setError("Already added");
        return false;
      }
      if (typeof maxTags === "number" && value.length >= maxTags) {
        setError(`Max ${maxTags} tags`);
        return false;
      }
      if (validate) {
        const res = validate(candidate);
        if (res === false) {
          setError("Invalid value");
          return false;
        }
        if (typeof res === "string") {
          setError(res);
          return false;
        }
      }
      onChange([...value, candidate]);
      setError(null);
      return true;
    },
    [value, onChange, formatTag, duplicates, maxTags, validate],
  );

  const remove = (index: number) => {
    const next = value.filter((_, i) => i !== index);
    onChange(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    if (delimiters.includes(e.key) || (e.key === "Tab" && draft.trim())) {
      e.preventDefault();
      if (commit(draft)) setDraft("");
      return;
    }
    if (e.key === "Backspace" && draft === "" && value.length > 0) {
      if (focusedTag !== null) {
        remove(focusedTag);
        setFocusedTag(null);
      } else {
        setFocusedTag(value.length - 1);
      }
    } else if (focusedTag !== null) {
      setFocusedTag(null);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    onPaste?.(e);
    const text = e.clipboardData.getData("text");
    if (!text) return;
    const parts = text.split(pasteSplit).map((p) => p.trim()).filter(Boolean);
    if (parts.length <= 1) return;
    e.preventDefault();
    const working = [...value];
    let added = 0;
    for (const part of parts) {
      const candidate = (formatTag ? formatTag(part) : part).trim();
      if (!candidate) continue;
      if (duplicates === "ignore" && working.includes(candidate)) continue;
      if (typeof maxTags === "number" && working.length >= maxTags) break;
      if (validate) {
        const res = validate(candidate);
        if (res === false || typeof res === "string") continue;
      }
      working.push(candidate);
      added++;
    }
    if (added > 0) {
      onChange(working);
      setDraft("");
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
    if (draft.trim()) {
      if (commit(draft)) setDraft("");
    }
    setFocusedTag(null);
  };

  const isFull = typeof maxTags === "number" && value.length >= maxTags;

  return (
    <div className="flex flex-col gap-1">
      <div
        role="group"
        data-disabled={disabled ? "true" : undefined}
        data-error={error ? "true" : undefined}
        onClick={() => inputRef.current?.focus()}
        className={cn(
          "flex w-full flex-wrap items-center rounded-md border border-input bg-transparent shadow-xs ring-offset-background transition-[color,box-shadow] focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-60 data-[error=true]:border-destructive data-[error=true]:focus-within:ring-destructive/30",
          sizes[size],
          containerClassName,
        )}
      >
        {value.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            data-focused={focusedTag === i ? "true" : undefined}
            className={cn(
              "inline-flex h-6 max-w-full items-center gap-1 rounded-sm border border-transparent bg-secondary px-2 text-xs text-secondary-foreground data-[focused=true]:border-ring data-[focused=true]:ring-2 data-[focused=true]:ring-ring/30",
              size === "lg" && "h-7 text-sm",
              tagClassName,
            )}
          >
            <span className="truncate">{tag}</span>
            <button
              type="button"
              tabIndex={-1}
              disabled={disabled}
              aria-label={`Remove ${tag}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                e.stopPropagation();
                remove(i);
              }}
              className="-mr-1 inline-flex size-4 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:bg-foreground/10 hover:text-foreground disabled:opacity-50"
            >
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                className="size-3"
              />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          {...inputProps}
          value={draft}
          disabled={disabled || isFull}
          placeholder={value.length === 0 ? placeholder : undefined}
          onChange={(e) => {
            setDraft(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={handleBlur}
          className={cn(
            "min-w-[6ch] flex-1 bg-transparent px-1 py-0.5 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
            className,
          )}
        />
        {clearable && value.length > 0 && !disabled && (
          <button
            type="button"
            aria-label="Clear all tags"
            onClick={(e) => {
              e.stopPropagation();
              onChange([]);
              setError(null);
              inputRef.current?.focus();
            }}
            className="ml-auto inline-flex size-5 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
          >
            <IconPlaceholder
              lucide="XIcon"
              tabler="IconX"
              hugeicons="Cancel01Icon"
              phosphor="XIcon"
              className="size-3.5"
            />
          </button>
        )}
      </div>
      {error && (
        <span className="text-xs text-destructive" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
