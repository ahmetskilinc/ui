import { atomWithStorage } from "jotai/utils";

export type IconLibrary = "lucide" | "tabler" | "hugeicons" | "phosphor";

export const ICON_LIBRARIES: { id: IconLibrary; label: string }[] = [
  { id: "lucide", label: "Lucide" },
  { id: "tabler", label: "Tabler" },
  { id: "hugeicons", label: "HugeIcons" },
  { id: "phosphor", label: "Phosphor" },
];

export const iconLibraryAtom = atomWithStorage<IconLibrary>(
  "ui-ahmet-icon-library",
  "lucide",
);
