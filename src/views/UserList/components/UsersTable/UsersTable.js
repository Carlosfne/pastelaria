import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
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
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';

import { getInitials } from 'helpers';
import api from '../../../../services/api'
import './styles.css'
toast.configure()
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
  }
}));

const UsersTable = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [ products , setProducts] = useState([])

  function EditDrawer(produto) {
    console.log(produto)
    const id = produto.value
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
    async function EditarProduto(onSubmit){
      console.log(onSubmit)
      // var myForm = document.getElementById('from');
      // const data = new FormData(myForm);

      var formData = new FormData();
      formData.append('id', id)
      formData.append('descricao', document.getElementById('descricao').value)
      formData.append('quantidadeAtual', document.getElementById('qntatual').value)
      formData.append('quantidadeMinima', document.getElementById('qntminima').value)
      formData.append('quantidadeMaxima', document.getElementById('qntmaxima').value)
      formData.append('validade', document.getElementById('validade').value)
      formData.append('preco', document.getElementById('preco').value)
      // formData.append('fornecedor',{'id': document.getElementById('fornecedor').value})
      console.log(formData)
      api.post('produtos/alterar',formData)
        .then(response => {
          toast.success(`Produto Alterado com sucesso`)
          // console.log(response.data)
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
      api.get(`produtos/detalhe/${id}`)
        .then(response =>{
          console.log(response.data)
          setProdutoUnique(response.data.produtos)
        })
        .catch(error =>{
          console.log(error.response)
        })
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
          id,
          descricao:document.getElementById('descricao').value,
          quantidadeAtual:document.getElementById('qntatual').value,
          quantidadeMinima:document.getElementById('qntminima').value,
          quantidadeMaxima:document.getElementById('qntmaxima').value,
          validade:document.getElementById('validade').value,
          preco:document.getElementById('preco').value,
          fornecedor:document.getElementById('fornecedor').value,
        });
      }
          
      return (
        <div className="form-produto-adicionar">
          <h1>Editar produto</h1>
          <form onSubmit={handleSubmit} id='from'>
            <div className="div-input-label">
              <label htmlFor="descricao">Descrição do novo produto</label>
              <input 
                className="input-produto"
                defaultValue={produtoUnique.descricao}
                id="descricao"
                onChange={e=> setDescricao(e.target.value)}                
              />
              <label htmlFor="descricao">Digite a quantidade atual do produto</label>
              <input 
                className="input-produto"
                defaultValue={produtoUnique.quantidadeAtual}
                id="qntatual"
                onChange={e=>setQntdAtual( e.target.value)}                
              />
              <label htmlFor="descricao">Digite a quantidade minima do produto</label>
              <input 
                className="input-produto"
                defaultValue={produtoUnique.quantidadeMinima}
                id="qntminima"
                onChange={e=>setQntdMinima(e.target.value)}                
              />
              <label htmlFor="descricao">Digite a quantidade máxima do produto</label>
              <input 
                className="input-produto"
                defaultValue={produtoUnique.quantidadeMaxima}
                id="qntmaxima"
                onChange={e=>setQntdMaxima( e.target.value)}                
              />
              <label htmlFor="descricao">Digite a validade do produto</label>
              <input 
                className="input-produto"
                defaultValue={produtoUnique.validade}
                id="validade"
                onChange={e=>setValidade(e.target.value)}
                type="date"                
              />
              <label htmlFor="descricao">Digite o valor do produto</label>
              <input 
                className="input-produto"
                defaultValue={produtoUnique.preco}
                id="preco"
                onChange={e=>setPreco(e.target.value)}               
              />
              <label htmlFor="descricao">Fornecedor</label>
              <select
                className="input-produto"
                defaultValue={produtoUnique.fornecedor.id}
                id="fornecedor"
                onChange={e=>setFornecedor( e.target.value)}
              >
                {
                  fornecedores.map(fornecedor=>(
                    <option value={fornecedor.id}>{fornecedor.nome}</option>
                  )
                  )  
                }
              </select>
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
          onSubmit={EditarProduto}
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
      api.post('produtos/criar',data)
        .then(response => {
          loadProdutos()
          toast.success(`Produto ${response.data.descricao} adicionado com sucesso`, { position: toast.POSITION.TOP_CENTER})                
        })
        .catch(error => {
          console.log(error.response)
          if(error.response.data.descricao){
            toast.error('Favor inserir a descrição do produto')
            document.getElementById('descricao').focus();
            document.getElementById('descricao').style.borderStyle = 'solid';
            document.getElementById('descricao').style.borderWidth = '1px';
            document.getElementById('descricao').style.borderColor = '#48681c';
          }
          if(error.response.data.preco){
            toast.error('Favor inserir o preço do produto')
            document.getElementById('preco').focus();
            document.getElementById('preco').style.borderStyle = 'solid';
            document.getElementById('preco').style.borderWidth = '1px';
            document.getElementById('preco').style.borderColor = '#48681c';
          }
          if(error.response.data.quantidadeAtual){
            toast.error('Favor inserir a quantidade atual do produto')
            document.getElementById('qntatual').focus();
            document.getElementById('qntatual').style.borderStyle = 'solid';
            document.getElementById('qntatual').style.borderWidth = '1px';
            document.getElementById('qntatual').style.borderColor = '#48681c';
          }
          if(error.response.data.quantidadeMaxima){
            toast.error('Favor inserir a quantidade máxima do produto')
            document.getElementById('qntmaxima').focus();
            document.getElementById('qntmaxima').style.borderStyle = 'solid';
            document.getElementById('qntmaxima').style.borderWidth = '1px';
            document.getElementById('qntmaxima').style.borderColor = '#48681c';
          }
          if(error.response.data.quantidadeMinima){
            toast.error('Favor inserir a quantidade mínima do produto')
            document.getElementById('qntminima').focus();
            document.getElementById('qntminima').style.borderStyle = 'solid';
            document.getElementById('qntminima').style.borderWidth = '1px';
            document.getElementById('qntminima').style.borderColor = '#48681c';
          }
          if(error.response.data.validade){
            toast.error('Favor inserir a validade mínima do produto')
            document.getElementById('validade').focus();
            document.getElementById('validade').style.borderStyle = 'solid';
            document.getElementById('validade').style.borderWidth = '1px';
            document.getElementById('validade').style.borderColor = '#48681c';
          }
        })
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
  
      const [ descricao, setDescricao] =useState('')
      const [ quantidadeAtual, setQntdAtual] =useState('')
      const [ quantidadeMinima, setQntdMinima] =useState('')
      const [ quantidadeMaxima, setQntdMaxima] =useState('')
      const [ validade, setValidade ] =useState('')
      const [ fornecedor, setFornecedor ] =useState('')
      const [ preco, setPreco ] =useState('')
      
  
  
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
          <h1>Adicionar um novo produto</h1>
          <form onSubmit={handleSubmit}>
            <div className="div-input-label">
              <label htmlFor="descricao">Descrição do novo produto</label>
              <input 
                className="input-produto"
                id="descricao"
                onChange={e=> setDescricao(e.target.value)}                
              />
              <label htmlFor="descricao">Digite a quantidade atual do produto</label>
              <input 
                className="input-produto"
                id="qntatual"
                onChange={e=>setQntdAtual( e.target.value)}                
              />
              <label htmlFor="descricao">Digite a quantidade minima do produto</label>
              <input 
                className="input-produto"
                id="qntminima"
                onChange={e=>setQntdMinima(e.target.value)}                
              />
              <label htmlFor="descricao">Digite a quantidade máxima do produto</label>
              <input 
                className="input-produto"
                id="qntmaxima"
                onChange={e=>setQntdMaxima( e.target.value)}                
              />
              <label htmlFor="descricao">Digite a validade do produto</label>
              <input 
                className="input-produto"
                id="validade"
                onChange={e=>setValidade(e.target.value)}
                type="date"                
              />
              <label htmlFor="descricao">Digite o valor do produto</label>
              <input 
                className="input-produto"
                id="preco"
                onChange={e=>setPreco(e.target.value)}               
              />
              <label htmlFor="descricao">Fornecedor</label>
              <select
                className="input-produto"
                id="fornecedor"
                onChange={e=>setFornecedor( e.target.value)}
              >
                {
                  fornecedores.map(fornecedor=>(
                    <option value={fornecedor.id}>{fornecedor.nome}</option>
                  )
                  )  
                }
              </select>
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
        >Novo produto</button>
  
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
      const response = await api.post(`produtos/detalhe?id=${id}`)
      setMarcaIn(response.data.produtos)
      console.log(response.data)
    }

    async function DeleteMarca() {
      var formData = new FormData();
      formData.append('id', id)
      api.post(`/produtos/remover`,formData)
        .then(response => {
          loadProdutos()
          console.log('cliente excluido com sucesso')
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
            <DialogTitle id="alert-dialog-title"> <p> Excluir Produto? </p></DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <h3>{marcain.descricao}</h3>
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
  
  async function loadProdutos(){
    const response = await api.post('/produtos/detalhe')
    console.log(response.data.produtos)
    setProducts(response.data.produtos)    

  }
  useEffect(() => {

    loadProdutos();
  }, [])

  
  
  return (
    <>
    <TemporaryDrawer />
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>                  
                  <TableCell>Descrição</TableCell>
                  <TableCell>Qtd Atual</TableCell>
                  <TableCell>Qtd Mínima</TableCell>
                  <TableCell>Qtd Máxima</TableCell>
                  <TableCell>Validade</TableCell>
                  <TableCell>Preço</TableCell>
                  <TableCell>Fornecedor</TableCell>
                  <TableCell>Opções</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map(produto => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={produto.id}                    
                  >                    
                    <TableCell>{produto.descricao}</TableCell>
                    <TableCell>{produto.quantidadeAtual}</TableCell>
                    <TableCell>{produto.quantidadeMinima}</TableCell>
                    <TableCell>{produto.quantidadeMaxima}</TableCell>
                    <TableCell>{moment(produto.validade).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>{produto.preco}</TableCell>
                    <TableCell>{produto.fornecedor.nome}</TableCell>
                    <TableCell>
                      <div className="btns-option">
                        <EditDrawer 
                          className="btn-edit"
                          value={produto.id}
                        />
                        <DeleteCliente
                          className="btn-delete"
                          value={produto.id}
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
    </>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
