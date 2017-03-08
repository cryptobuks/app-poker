'use strict'

import React from 'react';
import Ranking from './components/Ranking.js';
import BottomNav from './components/BottomNav.js';

class App extends React.Component {
  render() {
    return (
      <div>
        <Ranking />
        <BottomNav />
      </div>
    )
  }
}

export default App;
