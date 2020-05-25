import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
// import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

// import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/img/logoPastel.png';

export default function SignIn() {
  const [ id, setId ] = useState('');
  const history = useHistory();

  async function handleLogin(e){
    e.preventDefault();
    history.push('/dashboard')

    // try {
    //   const response = await api.post('sessions', {id});

    //   localStorage.setItem('ongId', id);
    //   localStorage.setItem('ongName', response.data.name);

    // }catch(err) {
    //   alert('Falha no login, tente novamente')
    // }
  }

  return (
    <div className="logon-container">      
      <form
        className="form-login"
        onSubmit={handleLogin}
      >
        <h1>Faça seu login</h1>

        <input 
          onChange={e=> setId(e.target.value)}
          placeholder="Usuário"
          value={id}
        />
        <input 
          // onChange={e=> setId(e.target.value)}
          placeholder="Senha"
          type="password"
          // value={id}
        />
        <button
          className="button"
          type="submit"
        >Entrar</button>

        <Link
          className="back-link"
          to="/register"
        >
          {/* <FiLogIn
              color="e02041"
              size={16}
            /> */}
          {/* Não tenho cadastro */}
        </Link>
      </form>
    </div>
  )
}
