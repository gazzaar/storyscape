import { Box, Container, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { useGetUser } from '../hooks/useGetUser';
import '../styles/link.css';

export const Post = ({
  userId,
  title,
  id,
  createdAt,
  message,
}: {
  userId: string;
  title: string;
  message: string;
  createdAt: number;
  id: string;
}) => {
  const { user, error, isLoading } = useGetUser(userId);
  const userName = isLoading || !user ? '...' : error ? '<unknown>' : user.username;

  const date = new Date(createdAt);
  let shortened = message.length > 30 ? message.slice(0, 30) + '...' : message;
  return (
    <Container
      sx={{
        border: '1px solid #5d5d5d',
        p: '0.8rem 1.2rem',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Link
          to={'/post/$postId'}
          params={{ postId: id }}
          className='link link-container'
          style={{ textDecoration: 'none' }}
        >
          <Typography variant='h4' sx={{ fontSize: '1.8rem', mb: '.5rem', color: '#f6f6f6' }}>
            {title}
          </Typography>
        </Link>
        <Typography variant='body2' sx={{ color: '#b0b0b0', fontSize: '1.4rem', mb: '1rem' }}>
          {shortened}
        </Typography>
        <Typography
          sx={{
            color: 'gray',
            display: 'inline-block',
          }}
        >
          {date.toLocaleString()}
        </Typography>
      </Box>
      <Typography sx={{ display: 'inline-block', fontWeight: '600', color: '#d1d1d1' }}>
        {userName}
      </Typography>
    </Container>
  );
};
