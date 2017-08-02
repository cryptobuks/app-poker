'use strict'

import axios from 'axios'

let pathDatabase = '/public/';

if(process.env.NODE_ENV == 'production') {
  pathDatabase = ''
}

const API = {
  noCache: Math.floor(Math.random() * 10000),

  // Torneios
  getTournaments: () => {
    return axios.get(pathDatabase + 'database/tournaments.json?' + API.noCache);
  },

  // Etapas cadastradas
  getSteps: () => {
    return axios.get(pathDatabase + 'database/steps.json?' + API.noCache);
  },

  // Jogadores
  getPlayers: () => {
    return axios.get(pathDatabase + 'database/players.json?' + API.noCache);
  }
}

export default API
