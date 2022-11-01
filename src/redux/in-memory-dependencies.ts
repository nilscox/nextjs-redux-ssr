import { Dependencies } from './store';
import { InMemoryPostGateway } from './posts/in-memory-post.gateway';
import { InMemoryUserGateway } from './user/in-memory-user.gateway';

const userGateway = new InMemoryUserGateway();
const postGateway = new InMemoryPostGateway();

userGateway.user = {
  id: '42',
  nick: 'nilscox',
};

postGateway.posts.set('1', {
  id: '1',
  date: new Date('2022-10-31').toISOString(),
  title: 'When should we upgrade on to next 13?',
  content: 'Not yet.',
});

postGateway.posts.set('2', {
  id: '2',
  date: new Date('2022-11-01').toISOString(),
  title: 'How to do SSR with next and redux',
  content: 'Look at the code.',
});

export const inMemoryDependencies: Dependencies = {
  userGateway,
  postGateway,
};
