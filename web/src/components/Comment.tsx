import { Box, Typography } from '@mui/material';
import { useGetUser } from '../hooks/useGetUser';
import { createDate } from '../util/createDate';

export const Comment = ({
  userID,
  createdAt,
  comment,
}: {
  userID: string;
  createdAt: number;
  comment: string;
}) => {
  const { user } = useGetUser(userID);
  const time = createDate(createdAt);
  return (
    <Box sx={{ m: '1.5rem 0', border: '1px solid #333', p: '.6rem 1rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
        <Typography
          variant='body2'
          sx={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            display: 'inline-block',
          }}
        >
          {user?.username}
        </Typography>
        <Typography
          sx={{
            fontSize: '1rem',
          }}
        >
          {time}
        </Typography>
      </Box>
      <Typography sx={{ ml: 1 }}>{comment}</Typography>
    </Box>
  );
};
