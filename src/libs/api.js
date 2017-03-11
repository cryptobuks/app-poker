'use strict'

import axios from 'axios'

const API = {

  /**
   * Devolve ranking do torneio atual
   */
  getTournament: () => {
    return axios.get('http://localhost:3000/public/database/tournament.json');
  }
}

export default API
