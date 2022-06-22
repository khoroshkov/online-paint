import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import canvasState from '../store/canvasState'

export const Home = observer(() => {
  const navigate = useNavigate()
  const usernameRef = useRef()

  const startPaint = () => {
    canvasState.setUserName(usernameRef.current.value)

    setTimeout(() => {
      navigate(`/f${(+new Date()).toString(16)}`, { replace: false })
    }, 500)
  }
  return (
    <div className="home">
      <div className="start-container">
        <label htmlFor="painter-name">Enter Your name</label>
        <input type="text" id="painter-name" ref={usernameRef} />
        <button onClick={startPaint}>Start Paint</button>
      </div>
    </div>
  )
})
