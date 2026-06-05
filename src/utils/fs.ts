import fs from 'fs-extra';
import path from 'path';

/**
 * Resolves a path relative to the given target directory (defaults to cwd).
 */
export function resolvePath(targetDir: string, ...segments: string[]): string {
  return path.join(targetDir, ...segments);
}

/**
 * Returns true if the file or directory exists.
 */
export async function exists(filePath: string): Promise<boolean> {
  return fs.pathExists(filePath);
}

/**
 * Returns the size in bytes of a file, or 0 if it does not exist.
 */
export async function fileSize(filePath: string): Promise<number> {
  try {
    const stat = await fs.stat(filePath);
    return stat.size;
  } catch {
    return 0;
  }
}

/**
 * Reads a JSON file and returns the parsed object, or null on failure.
 */
export async function readJson<T>(filePath: string): Promise<T | null> {
  try {
    return await fs.readJson(filePath) as T;
  } catch {
    return null;
  }
}

/**
 * Writes a JSON file, creating parent directories if needed.
 */
export async function writeJson(filePath: string, data: unknown): Promise<void> {
  await fs.ensureDir(path.dirname(filePath));
  await fs.writeJson(filePath, data, { spaces: 2 });
}

/**
 * Writes a text file, creating parent directories if needed.
 */
export async function writeText(filePath: string, content: string): Promise<void> {
  await fs.ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, content, 'utf-8');
}

/**
 * Returns file names (not full paths) inside a directory, or [] if the
 * directory does not exist.
 */
export async function listDir(dirPath: string): Promise<string[]> {
  try {
    return await fs.readdir(dirPath);
  } catch {
    return [];
  }
}
