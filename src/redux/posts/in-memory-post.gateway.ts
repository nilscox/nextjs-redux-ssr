import { PostGateway } from './post.gateway';
import { Post } from './posts.reducer';

export class InMemoryPostGateway implements PostGateway {
  public fakeDelay = 1000;

  public posts = new Map<string, Post>();
  public fetchPostError?: Error;

  async fetchPost(id: string): Promise<Post | undefined> {
    await new Promise((r) => setTimeout(r, this.fakeDelay));

    if (this.fetchPostError) {
      throw this.fetchPostError;
    }

    return this.posts.get(id);
  }
}
