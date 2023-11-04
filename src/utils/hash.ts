import crypto from 'crypto';
export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return { hash, salt };
}

type VerifyPasswordInput = {
  candidatePassword: string; //when user input login
  salt: string;
  hash: string; // in db user
};
export function verifyPassword({
  candidatePassword,
  salt,
  hash,
}: VerifyPasswordInput) {
  const candidateHash = crypto
    .pbkdf2Sync(candidatePassword, salt, 1000, 64, 'sha512')
    .toString('hex');

  return candidateHash === hash;
}
