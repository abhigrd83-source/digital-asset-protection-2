import { imageHash } from "image-hash";

export function generateHash(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // 16 bits -> 256 bit hash (64 hex characters typically, or 256 depending on implementation)
    imageHash(filePath, 16, true, (error: any, data: string) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}
