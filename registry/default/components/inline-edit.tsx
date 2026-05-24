"use client";

import * as React from "react";
import { IconPlaceholder } from "@/components/icon-placeholder";
import { cn } from "@/lib/utils";

export interface InlineEditProps
  extends Omit<
    React.ComponentProps<"div">,
    "onChange" | "defaultValue" | "onSubmit"
  > {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void | Promise<void>;
  validate?: (value: string) => boolean | string;
  placeholder?: string;
  emptyText?: string;
  multiline?: boolean;
  disabled?: boolean;
  startInEditMode?: boolean;
  showActions?: boolean;
  required?: boolean;
  maxLength?: number;
  triggerOnBlur?: "save" | "cancel";
  selectAllOnEdit?: boolean;
  textClassName?: string;
  inputClassName?: string;
  renderDisplay?: (value: string) => React.ReactNode;
}

export function InlineEdit({
  value,
  onChange,
  onSubmit,
  validate,
  placeholder = "Type something…",
  emptyText = "Click to edit",
  multiline = false,
  disabled,
  startInEditMode = false,
  showActions = true,
  required = false,
  maxLength,
  triggerOnBlur = "save",
  selectAllOnEdit = true,
  className,
  textClassName,
  inputClassName,
  renderDisplay,
  ...props
}: InlineEditProps) {
  const [editing, setEditing] = React.useState(startInEditMode);
  const [draft, setDraft] = React.useState(value);
  const [error, setError] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement | null>(
    null,
  );

  const startEditing = React.useCallback(() => {
    setDraft(value);
    setEditing(true);
  }, [value]);

  React.useEffect(() => {
    if (!editing) return;
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    if (selectAllOnEdit && "select" in el) {
      el.select();
    }
  }, [editing, selectAllOnEdit]);

  const cancel = React.useCallback(() => {
    setEditing(false);
    setDraft(value);
    setError(null);
  }, [value]);

  const save = React.useCallback(async () => {
    const next = draft;
    if (required && next.trim() === "") {
      setError("Required");
      return;
    }
    if (validate) {
      const v = validate(next);
      if (v === false) {
        setError("Invalid value");
        return;
      }
      if (typeof v === "string") {
        setError(v);
        return;
      }
    }
    setError(null);
    if (next === value) {
      setEditing(false);
      return;
    }
    onChange(next);
    if (onSubmit) {
      try {
        setPending(true);
        await onSubmit(next);
      } finally {
        setPending(false);
      }
    }
    setEditing(false);
  }, [draft, required, validate, value, onChange, onSubmit]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === "Escape") {
      e.preventDefault();
      cancel();
    } else if (e.key === "Enter") {
      if (multiline && !(e.metaKey || e.ctrlKey)) return;
      e.preventDefault();
      void save();
    }
  };

  const isEmpty = value.trim() === "";

  if (!editing) {
    return (
      <div
        className={cn("group inline-flex items-center gap-1.5", className)}
        {...props}
      >
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && startEditing()}
          className={cn(
            "-mx-1 cursor-text rounded-md px-1 text-left transition-colors hover:bg-foreground/5 focus-visible:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60",
            isEmpty && "text-muted-foreground italic",
            textClassName,
          )}
          aria-label="Edit"
        >
          {isEmpty
            ? emptyText
            : renderDisplay
              ? renderDisplay(value)
              : value}
        </button>
        {!disabled && (
          <IconPlaceholder
            lucide="PencilIcon"
            tabler="IconPencil"
            hugeicons="PencilEdit02Icon"
            phosphor="PencilSimpleIcon"
            className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
          />
        )}
      </div>
    );
  }

  const InputTag = multiline ? "textarea" : "input";

  return (
    <div
      className={cn("flex flex-col gap-1", className)}
      {...props}
    >
      <div className="flex items-start gap-1.5">
        <InputTag
          ref={inputRef as React.Ref<HTMLInputElement & HTMLTextAreaElement>}
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (triggerOnBlur === "save") void save();
            else cancel();
          }}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={pending}
          rows={multiline ? 3 : undefined}
          className={cn(
            "w-full rounded-md border border-input bg-transparent px-2 py-1 text-sm shadow-xs ring-offset-background outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:opacity-60",
            error && "border-destructive focus-visible:ring-destructive/30",
            multiline && "resize-y",
            inputClassName,
          )}
        />
        {showActions && (
          <div className="flex shrink-0 items-center gap-0.5">
            <button
              type="button"
              aria-label="Save"
              disabled={pending}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => void save()}
              className="inline-flex size-7 items-center justify-center rounded-md border border-input bg-background text-foreground hover:bg-accent disabled:opacity-50"
            >
              <IconPlaceholder
                lucide="CheckIcon"
                tabler="IconCheck"
                hugeicons="Tick02Icon"
                phosphor="CheckIcon"
                className="size-3.5"
              />
            </button>
            <button
              type="button"
              aria-label="Cancel"
              disabled={pending}
              onMouseDown={(e) => e.preventDefault()}
              onClick={cancel}
              className="inline-flex size-7 items-center justify-center rounded-md border border-input bg-background text-foreground hover:bg-accent disabled:opacity-50"
            >
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                className="size-3.5"
              />
            </button>
          </div>
        )}
      </div>
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
}
