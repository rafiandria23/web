import { memo, FC, useMemo } from 'react';
import { useTheme } from '@mui/material';
import { Container, Grid, Typography, Link } from '@mui/material';
import dayjs from 'dayjs';

const Footer: FC = () => {
  const now = useMemo(() => dayjs(), []);
  const theme = useTheme();

  return (
    <Grid
      component='footer'
      container
      justifyContent='center'
      alignItems='center'
      sx={{
        bgcolor: theme.palette.primary.light,
        p: theme.spacing(1, 0),
      }}
    >
      <Grid item>
        <Container>
          <Typography
            variant='subtitle1'
            component='p'
            color={theme.palette.primary.contrastText}
          >
            &copy; {now.format('YYYY')}{' '}
            <Link
              color='secondary'
              href='https://github.com/rafiandria23'
              target='_blank'
            >
              rafiandria23
            </Link>
          </Typography>
        </Container>
      </Grid>
    </Grid>
  );
};

export default memo(Footer);
