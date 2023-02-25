import * as bcrypt from 'bcrypt';

async function getHash(password: string): Promise<string> {
  const saltOrRounds = process.env.CRYPT_SALT;
  return await bcrypt.hash(password, saltOrRounds);
}

async function checkHash(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export { getHash, checkHash };
