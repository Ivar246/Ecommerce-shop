import { unlink } from "fs/promises";
import fs from "fs";

export const deleteFile = async (path: string): Promise<void> => {
  try {
    // Check if the file exists
    if (fs.existsSync(path)) {
      await unlink(path);
      console.log(`File successfully deleted: ${path}`);
    } else {
      console.warn(`File not found: ${path}`);
    }
  } catch (error) {
    console.error(`Error deleting file: ${path}`, error);
    throw new Error(`Failed to delete file at ${path}`);
  }
};
