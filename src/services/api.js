import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_PASTELARIA });
// const api = axios.create({ baseURL: 'https://pastelariamao.herokuapp.com' });

export default api;

/* amarelo #eeb30f
verde do caldo dentro da coroa #99a46a
verde escuro do nome # 48681c */
