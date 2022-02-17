import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    buttonProgress: {
      color: '#f36c48',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
      position: 'absolute',
      zIndex: 999999,
    },
  })
));

export const LoadingButton = () => {
  const classes = useStyles();
  return (
    <CircularProgress size={50} className={classes.buttonProgress} />
  );
};
