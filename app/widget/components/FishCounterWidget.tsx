import useSocketIO from "app/core/hooks/useSocketIO"
import { useEffect, useState } from "react"
import { BotSocketEventType, botSocketsConfig } from "server/botConfigs"

const FishCounterWidget: React.FC<{ roomEventKey: BotSocketEventType }> = ({ roomEventKey }) => {
  const [socket, { isConnected }] = useSocketIO()

  const [fishCounter, setFishCounter] = useState(0)

  useEffect(() => {
    if (isConnected) {
      socket.emit(roomEventKey)

      socket.on(botSocketsConfig.socketEvents.UPDATE_WIDGET, handleNewFishAmount)
    }

    return () => {
      socket.off(botSocketsConfig.socketEvents.UPDATE_WIDGET, handleNewFishAmount)
    }
  }, [isConnected])

  const handleNewFishAmount = (newAmount: number) => setFishCounter(newAmount)

  return <h1 className="text-9xl text-center">{fishCounter}</h1>
}

export default FishCounterWidget
