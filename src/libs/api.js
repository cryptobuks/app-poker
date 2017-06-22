'use strict'

import axios from 'axios'

let pathDatabase = '/public/';

if(process.env.NODE_ENV == 'production') {
  pathDatabase = ''
}

const API = {

  // Torneios
  getTournaments: () => {
    return axios.get(pathDatabase + 'database/tournaments.json');
  },

  // Etapas cadastradas
  getSteps: () => {
    return axios.get(pathDatabase + 'database/steps.json');
  },

  // Jogadores
  getPlayers: () => {
    return axios.get(pathDatabase + 'database/players.json');
  }
}

export default API
