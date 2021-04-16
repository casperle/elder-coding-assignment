import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingGridWrapper: {
      margin: theme.spacing(16),
    },
  }),
);

export const LoadingIndicator = () => {
  const classes = useStyles();

  return (
    <div className={classes.loadingGridWrapper}>
      <Grid container justify="center">
        <CircularProgress />
      </Grid>
    </div>
  );
};
