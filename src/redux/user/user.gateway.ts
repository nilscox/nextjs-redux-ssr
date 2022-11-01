import { User } from './user.reducer';

export interface UserGateway {
  fetchUser(): Promise<User | undefined>;
}
