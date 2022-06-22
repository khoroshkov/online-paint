import React from 'react'
import toolState from '../store/toolState'
import '../styles/toolbar.scss'

export const SettingsBar = () => {
  return (
    <div className="settings-bar">
      <div>
        <label htmlFor="line-width">Line width</label>
        <input
          id="line-width"
          type="number"
          min={1}
          max={50}
          defaultValue={1}
          onChange={(e) => toolState.setLineWidth(e.target.value)}
        />

        <label htmlFor="stroke-color">Stroke color</label>
        <input
          id="stroke-color"
          type="color"
          onChange={(e) => toolState.setStrokeColor(e.target.value)}
        />
      </div>
    </div>
  )
}
