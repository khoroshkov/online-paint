import React from 'react'
import { Canvas } from './Canvas'
import { SettingsBar } from './SettingsBar'
import { ToolBar } from './ToolBar'

export const PaintCanvas = () => {
  return (
    <div className="app">
      <ToolBar />
      <SettingsBar />
      <Canvas />
    </div>
  )
}
