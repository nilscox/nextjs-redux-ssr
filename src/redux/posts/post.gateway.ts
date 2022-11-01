import { Post } from './posts.reducer';

export interface PostGateway {
  fetchPost(id: string): Promise<Post | undefined>;
}
