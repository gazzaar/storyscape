import { Link } from '@tanstack/react-router';
import Button from '@mui/material/Button';
export const Header = () => {
  return (
    <>
      <h1>StorySpace</h1>

      <Link to='/posts'>
        <Button>Posts</Button>
      </Link>
      <Link to='/'>
        <Button>Home</Button>
      </Link>
    </>
  );
};
