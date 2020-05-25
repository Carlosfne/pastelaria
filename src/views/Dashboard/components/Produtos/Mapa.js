import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

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
    backgroundColor: '#f1c40f',
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
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const Mapa = props => {
  const { className, ...rest } = props;
  const [ expositores, setExpositores ] = useState([])

  useEffect(() => {
    async function loadExpositores() {
      const expositores = await api.post('/produtos/detalhe')

      console.log(expositores.data)
      setExpositores(expositores.data.produtos.length)
    }

    loadExpositores()
  }, [])

  const classes = useStyles();

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
              PRODUTOS
            </Typography>
            <Typography variant="h3">{expositores}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <ShoppingBasketIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          {/* <ArrowDownwardIcon className={classes.differenceIcon} /> */}
          {/* <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            12%
          </Typography> */}
          <Typography
            className={classes.caption}
            variant="caption"
          >
            Total Cadastrados
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

Mapa.propTypes = {
  className: PropTypes.string
};

export default Mapa;