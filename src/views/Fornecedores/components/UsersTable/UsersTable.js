import React, { useState, useEffect } from 'react';
import moment from 'moment';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Card,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import './styles.css'
import api from '../../../../services/api'

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  tableRow: {
    backgroundColor:'transparent'
  }
}));

const UsersTable = props => {
  const { className, users, ...rest } = props;

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [ products , setProducts] = useState([])

  const handleSelectAll = event => {
    const { users } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };
  async function loadProdutos(){
    const response = await api.post('/fornecedor/detalhe')
    console.log(response.data.fornecedor)
    setProducts(response.data.fornecedor)    

  }

  function EditDrawer(produto) {
    console.log(produto)
    const id = produto.value
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
    async function AdicionaProduto(data){
      console.log(data)
      api.post('produtos/criar',data)
        .then(response => {
          // alert('Produto criado com sucesso!')
          loadProdutos()      
        })
        .catch(error => console.log(error.response))
    }
  
    const [ fornecedores, setFornecedores] =useState([])
    const [ produtoUnique, setProdutoUnique] =useState([])
  
    async function getFornecedores(){
      api.post('fornecedor/detalhe')
        .then(response => {
          setFornecedores(response.data.fornecedor)
          // console.log(response.data)
        })
        .catch(error => console.log(error.response))
    }
    async function getProdutoUnique(){
      // api.post('produtos/detalhe',id)
      //   .then(response =>{
      //     console.log(response.data)
      //     setProdutoUnique(response.data.produtos)
      //   })
      //   .catch(error =>{
      //     console.log(error.response)
      //   })
    }
  
    useEffect(() => {
      getFornecedores()
      getProdutoUnique()
    }, [])
  
    function FormTipo({ onSubmit }) {
  
      const [ descricao, setDescricao] =useState('')
      const [ quantidadeAtual, setQntdAtual] =useState('')
      const [ quantidadeMinima, setQntdMinima] =useState('')
      const [ quantidadeMaxima, setQntdMaxima] =useState('')
      const [ validade, setValidade ] =useState('')
      const [ fornecedor, setFornecedor ] =useState('')
      const [ preco, setPreco ] =useState('')
      
      console.log(produtoUnique)
  
      async function handleSubmit(e){
        e.preventDefault();
  
        await onSubmit({
          descricao,
          quantidadeAtual,
          quantidadeMinima,
          quantidadeMaxima,
          validade,
          preco,
          fornecedor:document.getElementById('fornecedor').value,
        });
      }
          
      return (
        <div className="form-produto-adicionar">
          <h1>Editar Fornecedor</h1>
          <form onSubmit={handleSubmit}>
            <div className="div-input-label">
              <label htmlFor="descricao">Nome</label>
              <input 
                className="input-produto"
                id="descricao"
                onChange={e=> setDescricao(e.target.value)}                
              />
              <label htmlFor="descricao">Contato</label>
              <input 
                className="input-produto"
                id="qntatual"
                onChange={e=>setQntdAtual( e.target.value)}                
              />              
            </div>
            <button className="btn-salvar-produto">Salvar</button>
          </form>
        </div>
      )
    }
  
    const toggleDrawer = (side, open) => event => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setState({ ...state, [side]: open });
    };
  
    const sideList = side => (
        <>
        <FormTipo
          onClick={toggleDrawer(side, false)}
          onKeyDown={toggleDrawer(side, false)}
          onSubmit={AdicionaProduto}
          role="presentation"
        />
  
      </>
    );
  
    return (
      <div>
        <button
          className="btn-edit"
          onClick={toggleDrawer('right', true)}
        />
  
        <Drawer
          anchor="right"
          onClose={toggleDrawer('right', false)}
          open={state.right}
        >
          {sideList('right')}
        </Drawer>
      </div>
    );
  }
  
  function TemporaryDrawer() {
  
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
    async function AdicionaProduto(data){
      console.log(data)
      api.post('fornecedor/criar',data)
        .then(response => {          
          loadProdutos()
          toast.success(`Fornecedor ${response.data.nome} salvo com sucesso!`,{ position: toast.POSITION.TOP_CENTER })      
        })
        .catch(error => console.log(error.response))
    }
  
    const [ fornecedores, setFornecedores] =useState([])
  
    async function getFornecedores(){
      api.post('fornecedor/detalhe')
        .then(response => {
          setFornecedores(response.data.fornecedor)
          // console.log(response.data)
        })
        .catch(error => console.log(error.response))
    }
  
    useEffect(() => {
      getFornecedores()
    }, [])
  
    
  
  
    function FormTipo({ onSubmit }) {
  
      const [ nome, setNome] =useState('')
      const [ contato, setContato] =useState('')
      
  
  
      async function handleSubmit(e){
        e.preventDefault();
  
        await onSubmit({
          nome,
          contato
        });
      }
          
      return (
        <div className="form-produto-adicionar">
          <h1>Adicionar um novo Fornecedor</h1>
          <form onSubmit={handleSubmit}>
            <div className="div-input-label">
              <label htmlFor="descricao">Nome do Fornecedor</label>
              <input 
                className="input-produto"
                id="descricao"
                onChange={e=> setNome(e.target.value)}                
              />
              <label htmlFor="descricao">Contato</label>
              <input 
                className="input-produto"
                id="qntatual"
                onChange={e=>setContato( e.target.value)}                
              />              
            </div>
            <button className="btn-salvar-produto">Salvar</button>
          </form>
        </div>
      )
    }
  
    const toggleDrawer = (side, open) => event => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setState({ ...state, [side]: open });
    };
  
    const sideList = side => (
        <>
        <FormTipo
          onClick={toggleDrawer(side, false)}
          onKeyDown={toggleDrawer(side, false)}
          onSubmit={AdicionaProduto}
          role="presentation"
        />
  
      </>
    );
  
    return (
      <div>
        <button
          className="btn-add-new-produto"
          onClick={toggleDrawer('right', true)}
          // value={marca.id}
        >Adicionar novo Fornecedor</button>
  
        <Drawer
          anchor="right"
          onClose={toggleDrawer('right', false)}
          open={state.right}
        >
          {sideList('right')}
        </Drawer>
      </div>
    );
  }

  function DeleteCliente(produto) {
    console.log(produto)
    const id = produto.value;
    console.log(id)
    const [open, setOpen] = React.useState(false);
    const [marcain, setMarcaIn] = React.useState([]);

    const handleClickOpen = () => {
      setOpen(true);
      loadStep()
    };
    async function loadStep() {
      const response = await api.post(`fornecedor/detalhe?id=${id}`)
      setMarcaIn(response.data.fornecedor)
      console.log(response.data)
    }

    async function DeleteMarca() {
      api.post(`/produtos/remover?id=${id}`)
        .then(response => {
          // toast.info(response.data[0])
          // loadClientes()
          console.log(response.data)
        })
        .catch(error => console.log(error))
      setOpen(false);
    }

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <>
      <div className="dialog-marca">
        <button
          className="btn-delete"
          onClick={handleClickOpen}
        />
        <Dialog
          aria-describedby="alert-dialog-description"
          aria-labelledby="alert-dialog-title"
          onClose={handleClose}
          open={open}

        >
          <div className="dialog-confirm">
            <DialogTitle id="alert-dialog-title"> <p> Excluir Fornecedor? </p></DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {/* <h3>{marcain.descricao}</h3> */}
                <h3>Fornecedor</h3>
              </DialogContentText>
            </DialogContent>
            <div className="dialog-btns">
              <button
                className="btn-negative"
                onClick={handleClose}
              >
                NÃO
              </button>
              <button
                autoFocus
                className="btn-confirm"
                onClick={DeleteMarca}
              >
                SIM
              </button>
            </div>
          </div>
        </Dialog>
      </div>
      </>
    );
  }
  useEffect(() => {

    loadProdutos();
  }, [])
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <TemporaryDrawer />
      <CardContent className="table">
        <PerfectScrollbar>
          <div >
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Contato</TableCell>                  
                  <TableCell>Opções</TableCell>                  
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map(user => (
                  <TableRow                    
                    hover
                    key={user.id}
                  >                                     
                    <TableCell>{user.nome}</TableCell>                    
                    <TableCell>{user.contato}</TableCell>
                    <TableCell>
                      <div className="btns-options">
                        <EditDrawer 
                          className="btn-edit"
                          value={user.id}
                        />
                        <DeleteCliente
                          className="btn-delete"
                          value={user.id}
                        />
                      </div>
                    </TableCell>                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>     
    </Card>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
