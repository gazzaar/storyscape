import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/post')({
  component: PostRouter,
});

function PostRouter() {
  return <Outlet />;
}
