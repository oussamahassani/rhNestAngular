import * as CryptoJS from 'crypto-js';

export   const encryptData = (data: any, secretKey: string): string =>  {
  const jsonString = JSON.stringify(data);
  return CryptoJS.AES.encrypt(jsonString, secretKey).toString();
}