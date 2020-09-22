import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';

import api from '../../../../services/api'

import { useForm } from 'react-hook-form'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const { register, handleSubmit } = useForm();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = data => {
    console.log(data)
    const response = api.post('/noticias', data)
      .then( sucesso => {
        console.log('Criado com sucesso')
        window.location.reload()
      })
      .catch( error => console.log(error))

  }


  return (
    <div>
      <Button        
        onClick={handleOpen}
        variant="contained"
      >
        Adicionar um novo fornecedor
      </Button>
      <Modal
        aria-describedby="simple-modal-description"
        aria-labelledby="simple-modal-title"
        onClose={handleClose}
        open={open}
      >
        <div
          className={classes.paper}
          style={modalStyle}
        >
          <form             
            onSubmit={handleSubmit(onSubmit)}
          >
            <label>Descricao</label>
            <input
              name="description"
              ref={register}
              type="text"
            />

            <Button
              style={{backgroundColor:'blue', color:'white', display: 'flex', justifyContent:'center', alignItems: 'center',margin:'auto',top:0, left:0, bottom:0, right:0}}
              type="submit"
            >Salvar</Button>

          </form>
        </div>
      </Modal>
    </div>
  );
}
