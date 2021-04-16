import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: `${theme.spacing(2)}px auto`,
      maxWidth: 800,
    },
    alert: {
      marginBottom: theme.spacing(2),
    },
    formRow: {
      marginBottom: theme.spacing(2),
    },
  }),
);
