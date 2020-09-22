import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';

import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import StarIcon from '@material-ui/icons/Star';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import MapIcon from '@material-ui/icons/Map';

import { Profile, SidebarNav, UpgradePlan } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Produtos',
      href: '/users',
      icon: <ShoppingBasketIcon />
    },
    {
      title: 'Fornecedores',
      href: '/Fornecedores',
      icon: <AssignmentIcon />
    },
    {
      title: 'Comandas em aberto',
      href: '/comandas',
      icon: <AssignmentTurnedInIcon />
    },
    {
      title: 'Comandas fechadas do dia',
      href: '/comandasdia',
      icon: <AssignmentTurnedInIcon />
    },
    {
      title: 'Fechamento de Caixa',
      href: '/fechamento',
      icon: <AssignmentTurnedInIcon />
    },
    // {
    //   title: 'Expositores',
    //   href: '/expositores',
    //   icon: <BlurOnIcon />
    // },
    // {
    //   title: 'Mapa',
    //   href: '/mapas',
    //   icon: <MapIcon />
    // },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        {/* <Profile /> */}
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
        {/* <UpgradePlan /> */}
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
