import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';

import api from '../../../../services/api'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.success.dark
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
  }
}));

const TotalUsers = props => {
  const { className, ...rest } = props;
  const [ noticias , setProdutos ] = useState([])

  const classes = useStyles();

  useEffect(() => {
    async function loadProdutos() {
      const noticias = await api.get('/noticias')

      setProdutos(noticias.data.length)
      console.log(noticias)
    }

    loadProdutos()
  }, [])

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              NOTICIAS
            </Typography>
            <Typography variant="h3">{noticias}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AssignmentIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <Typography
            className={classes.caption}
            variant="caption"
          >
            Noticias
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

TotalUsers.propTypes = {
  className: PropTypes.string
};

export default TotalUsers;
