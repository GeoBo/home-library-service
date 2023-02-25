import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
  private readonly blackList: string[] = [];

  add(token: string) {
    if (token) this.blackList.push(token);
  }

  isValid(token: string): boolean {
    const pos = this.blackList.indexOf(token);
    return pos === -1;
  }
}
