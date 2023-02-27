import { appendFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { EOL } from 'os';
import { join } from 'path';

interface fileInfo {
  name: string;
  time: number;
  size: number;
}

const logDir = `${__dirname}/../logs`;
const ext = '.log';

function saveToFile(message: string, stack = '', type = 'log') {
  let folder: string;
  if (type === 'log') folder = 'access';
  else if (type === 'warn') folder = 'httpExceptions';
  else folder = 'errors';

  const date = new Date().toUTCString().split(' ').slice(0, 5).join(' ');
  const mes = `[${date}] [${stack}] ${JSON.stringify(message)}${EOL}`;
  const dest = join(logDir, folder);
  try {
    const lastFileInfo = getLastFile(dest);
    if (lastFileInfo && isValidSize(lastFileInfo)) {
      const target = join(dest, lastFileInfo.name);
      appendFileSync(target, mes);
    } else {
      const name = getFileName();
      const target = join(dest, name);
      writeFileSync(target, mes);
    }
  } catch (err) {
    throw new Error('FS operation failed');
  }
}

function getLastFile(dir: string) {
  const files = readdirSync(dir);
  const arr: fileInfo[] = [];
  for (const fileName of files) {
    const filePath = join(dir, fileName);
    const file = statSync(filePath);
    const fileStats = {
      name: fileName,
      time: file.mtime.getTime(),
      size: file.size,
    };
    arr.push(fileStats);
  }

  arr.sort((a, b) => b.time - a.time);
  //console.log(arr);
  if (!arr.length) return null;
  return arr[0];
}

function isValidSize(fileInfo: fileInfo): boolean {
  return fileInfo.size < Number(process.env.FILE_SIZE) * 1024;
  // return fileInfo.size < 1024;
}

function getFileName(): string {
  const d = new Date();
  const timestamp = d.getTime().toString();
  // return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}-${timestamp}`;
  return timestamp + ext;
}

export { saveToFile };
