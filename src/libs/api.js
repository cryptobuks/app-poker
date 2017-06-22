'use strict'

import axios from 'axios'

const API = {

  // Torneios
  getTournaments: () => {
    return axios.get('http://localhost:3000/public/database/tournaments.json');
  },

  // Etapas cadastradas
  getSteps: () => {
    return axios.get('http://localhost:3000/public/database/steps.json');
  },

  // Jogadores
  getPlayers: () => {
    return axios.get('http://localhost:3000/public/database/players.json');
  }
}

export default API
