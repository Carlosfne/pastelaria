import React, { useState, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';

import api from '../../../../services/api'
import './styles.css'

export default function TemporaryDrawer() {
  
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
        alert('Produto criado com sucesso!')        
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
      >Adicionar novo produto</button>

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
