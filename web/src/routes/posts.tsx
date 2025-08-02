import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts')({
  component: Post,
});

function Post() {
  return <div className='p-2'>Hello from posts</div>;
}
