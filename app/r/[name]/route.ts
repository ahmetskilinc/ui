import { readdir, readFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

let componentsCache: Set<string> | null = null;

async function getAvailableComponents(): Promise<Set<string>> {
  if (componentsCache) {
    return componentsCache;
  }

  const publicDir = path.join(process.cwd(), "registry", "output");
  const files = await readdir(publicDir);

  const components = files
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(".json", ""));

  componentsCache = new Set(components);
  return componentsCache;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> },
) {
  try {
    const { name: componentName } = await params;

    const availableComponents = await getAvailableComponents();

    if (!availableComponents.has(componentName)) {
      return NextResponse.json(
        {
          error: "Component not found",
          availableComponents: Array.from(availableComponents),
        },
        { status: 404 },
      );
    }

    const filePath = path.join(
      process.cwd(),
      "registry",
      "output",
      `${componentName}.json`,
    );
    const fileContent = await readFile(filePath, "utf-8");
    const jsonData = JSON.parse(fileContent);

    return NextResponse.json(jsonData);
  } catch (error) {
    console.error("Error reading component JSON:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
