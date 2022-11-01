import { UserGateway } from './user.gateway';
import { User } from './user.reducer';

export class InMemoryUserGateway implements UserGateway {
  public fakeDelay = 1000;

  public user?: User;
  public fetchUserError?: Error;

  async fetchUser(): Promise<User | undefined> {
    await new Promise((r) => setTimeout(r, this.fakeDelay));

    if (this.fetchUserError) {
      throw this.fetchUserError;
    }

    return this.user;
  }
}
