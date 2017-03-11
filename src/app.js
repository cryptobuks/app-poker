'use strict'

import React from 'react'
import Ranking from './components/Ranking'
import BottomNav from './components/BottomNav'

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

export default App
