'use strict'

import React from 'react'
import TopBar from './components/TopBar'
import BottomNav from './components/BottomNav'
import Ranking from './components/Ranking'

import './app.css'

class App extends React.Component {
  render() {
    return (
      <div>
        <TopBar />
        <Ranking />
        <BottomNav />
      </div>
    )
  }
}

export default App
