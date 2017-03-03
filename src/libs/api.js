'use strict'

import axios from 'axios';

const API = {
  getPlayers: () => {
    return axios.get('http://localhost:3000/public/database/players.json');
  }
}

export default API;
