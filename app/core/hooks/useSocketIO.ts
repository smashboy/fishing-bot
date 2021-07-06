import { useEffect, useState } from "react"
import { io } from "socket.io-client"

const useSocketIO = () => {
  const [socket] = useState(
    io({
      autoConnect: false,
    })
  )

  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    socket.connect()

    socket.on("connect", () => setIsConnected(true))
    socket.on("disconnect", () => setIsConnected(false))

    return () => {
      socket.disconnect()
    }
  }, [])

  return [socket, { isConnected }] as const
}

export default useSocketIO
