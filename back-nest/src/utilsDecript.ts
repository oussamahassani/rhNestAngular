import * as CryptoJS from 'crypto-js';

export function decryptData(encrypted: string, secretKey: string): any {
  const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedString);
}
