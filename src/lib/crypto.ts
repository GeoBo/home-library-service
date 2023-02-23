import * as bcrypt from 'bcrypt';

async function getHash(password: string): Promise<string> {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
}

async function checkHash(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export { getHash, checkHash };
