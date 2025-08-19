import crypto from 'crypto';

const ENCRYPTION_ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16; // For GCM, this is the recommended IV length
const SALT_LENGTH = 64; // 64 bytes salt
const TAG_LENGTH = 16; // 16 bytes authentication tag

/**
 * Get the encryption key from environment variable
 */
function getEncryptionKey(): Buffer {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    throw new Error('ENCRYPTION_KEY environment variable is required');
  }
  
  if (key.length !== 64) { // 32 bytes = 64 hex characters
    throw new Error('ENCRYPTION_KEY must be 64 hexadecimal characters (32 bytes)');
  }
  
  return Buffer.from(key, 'hex');
}

/**
 * Derives a key from the master key and salt using PBKDF2
 */
function deriveKey(masterKey: Buffer, salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(masterKey, salt, 100000, 32, 'sha512');
}

/**
 * Encrypts a plaintext string using AES-256-GCM
 * @param plaintext - The text to encrypt
 * @returns Encrypted data in format: salt:iv:tag:ciphertext (base64 encoded)
 */
export function encrypt(plaintext: string): string {
  if (!plaintext) {
    throw new Error('Plaintext cannot be empty');
  }

  try {
    const masterKey = getEncryptionKey();
    
    // Generate random salt and IV
    const salt = crypto.randomBytes(SALT_LENGTH);
    const iv = crypto.randomBytes(IV_LENGTH);
    
    // Derive key from master key and salt
    const key = deriveKey(masterKey, salt);
    
    // Create cipher
    const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv) as crypto.CipherGCM;
    cipher.setAAD(Buffer.alloc(0)); // Additional authenticated data (empty for our use case)
    
    // Encrypt
    let ciphertext = cipher.update(plaintext, 'utf8', 'base64');
    ciphertext += cipher.final('base64');
    
    // Get authentication tag
    const tag = cipher.getAuthTag();
    
    // Combine all components: salt:iv:tag:ciphertext
    const result = [
      salt.toString('base64'),
      iv.toString('base64'),
      tag.toString('base64'),
      ciphertext
    ].join(':');
    
    return result;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypts an encrypted string using AES-256-GCM
 * @param encryptedData - The encrypted data in format: salt:iv:tag:ciphertext
 * @returns Decrypted plaintext string
 */
export function decrypt(encryptedData: string): string {
  if (!encryptedData) {
    throw new Error('Encrypted data cannot be empty');
  }

  try {
    const masterKey = getEncryptionKey();
    
    // Split the encrypted data
    const parts = encryptedData.split(':');
    if (parts.length !== 4) {
      throw new Error('Invalid encrypted data format');
    }
    
    const [saltBase64, ivBase64, tagBase64, ciphertext] = parts;
    
    if (!saltBase64 || !ivBase64 || !tagBase64 || !ciphertext) {
      throw new Error('Missing encrypted data components');
    }
    
    // Convert from base64
    const salt = Buffer.from(saltBase64, 'base64');
    const iv = Buffer.from(ivBase64, 'base64');
    const tag = Buffer.from(tagBase64, 'base64');
    
    // Validate lengths
    if (salt.length !== SALT_LENGTH) {
      throw new Error('Invalid salt length');
    }
    if (iv.length !== IV_LENGTH) {
      throw new Error('Invalid IV length');
    }
    if (tag.length !== TAG_LENGTH) {
      throw new Error('Invalid authentication tag length');
    }
    
    // Derive key from master key and salt
    const key = deriveKey(masterKey, salt);
    
    // Create decipher
    const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, key, iv) as crypto.DecipherGCM;
    decipher.setAAD(Buffer.alloc(0)); // Same additional authenticated data as encryption
    decipher.setAuthTag(tag);
    
    // Decrypt
    let plaintext = decipher.update(ciphertext, 'base64', 'utf8');
    plaintext += decipher.final('utf8');
    
    return plaintext;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
}

/**
 * Generates a new encryption key for environment setup
 * @returns A 64-character hexadecimal string (32 bytes)
 */
export function generateEncryptionKey(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Validates if the current encryption key is properly formatted
 */
export function validateEncryptionKey(): boolean {
  try {
    const key = process.env.ENCRYPTION_KEY;
    if (!key) return false;
    if (key.length !== 64) return false;
    
    // Test if it's valid hex
    Buffer.from(key, 'hex');
    return true;
  } catch {
    return false;
  }
}

/**
 * Hash a string using SHA-256 (for non-reversible hashing)
 * @param input - The string to hash
 * @returns SHA-256 hash in hexadecimal format
 */
export function hashString(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

/**
 * Generate a cryptographically secure random state for OAuth
 * @returns A random state string
 */
export function generateOAuthState(): string {
  return crypto.randomBytes(32).toString('base64url');
}

/**
 * Verify OAuth state matches expected value
 * @param state - The state to verify
 * @param expectedState - The expected state value
 * @returns True if states match
 */
export function verifyOAuthState(state: string, expectedState: string): boolean {
  if (!state || !expectedState) return false;
  return crypto.timingSafeEqual(
    Buffer.from(state),
    Buffer.from(expectedState)
  );
}