import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import axios from 'axios'
import '../styles/canvas.scss'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import Rect from '../tools/Rect'

export const Canvas = observer(() => {
  const canvasRef = useRef()
  const params = useParams()
  console.log(params)

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL())
  }

  const drawHandler = (msg) => {
    const figure = msg.figure
    const ctx = canvasRef.current.getContext('2d')
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y)
        break
      case 'rect':
        Rect.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.color
        )
        break
      case 'finish':
        ctx.beginPath()
        break
    }
  }
  useEffect(() => {
    canvasState.setCanvas(canvasRef.current)
    let ctx = canvasRef.current.getContext('2d')
    axios
      .get(`http://localhost:5000/image?id=${params.id}`)
      .then((response) => {
        const img = new Image()
        img.src = response.data
        img.onload = () => {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
          ctx.drawImage(
            img,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          )
        }
      })
  }, [])

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket(`ws://localhost:5000/`)
      canvasState.setSocket(socket)
      canvasState.setSessionId(params.id)
      toolState.setTool(new Brush(canvasRef.current, socket, params.id))
      socket.onopen = () => {
        console.log('Подключение установлено')
        socket.send(
          JSON.stringify({
            id: params.id,
            username: canvasState.username,
            method: 'connection'
          })
        )
      }
      socket.onmessage = (event) => {
        let msg = JSON.parse(event.data)
        switch (msg.method) {
          case 'connection':
            console.log(`пользователь ${msg.username} присоединился`)
            break
          case 'draw':
            drawHandler(msg)
            break
        }
      }
    }
  }, [canvasState.username])

  return (
    <div className="canvas">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onMouseDown={() => mouseDownHandler()}
      />
    </div>
  )
})
