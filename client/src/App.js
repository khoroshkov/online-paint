import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './components/Home'
import { PaintCanvas } from './components/PaintCanvas'
import './styles/app.scss'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<PaintCanvas />} />
      </Routes>
    </Router>
  )
}

export default App
