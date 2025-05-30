import * as crypto from 'crypto';

export class AesHelper {
  private static readonly encryptionKey = "MAKV2SPBNI99212";
  private static readonly saltString = "Ivan Medvedev";

  /**
   * Encrypts a string using AES-256-CBC with PKCS7 padding
   */
  static encrypt(plainText: string): string {
    const derived = this._generatePBKDF2Key(this.encryptionKey, this.saltString, 48);
    const key = derived.subarray(0, 32);
    const iv = derived.subarray(32, 48);

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    cipher.setAutoPadding(true); // PKCS7 padding
    
    let encrypted = cipher.update(plainText, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    return encrypted;
  }

  /**
   * Decrypts an AES-256-CBC encrypted string
   */
  static decrypt(encryptedText: string): string {
    const derived = this._generatePBKDF2Key(this.encryptionKey, this.saltString, 48);
    const key = derived.subarray(0, 32);
    const iv = derived.subarray(32, 48);

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    decipher.setAutoPadding(true); // PKCS7 padding
    
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  /**
   * PBKDF2 key derivation
   */
  private static _generatePBKDF2Key(
    password: string,
    salt: string,
    length: number
  ): Uint8Array {
    const derivedKey = crypto.pbkdf2Sync(
      password,
      salt,
      1000, // iterations
      length, // key length
      'sha1' // digest algorithm
    );

    return new Uint8Array(derivedKey);
  }
}