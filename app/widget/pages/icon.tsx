import useSocketIO from "app/core/hooks/useSocketIO"
import { useEffect, useState } from "react"
import { Image } from "blitz"
import { botSocketsConfig, IconType } from "server/botConfigs"
import fistIcon from "public/fist.png"
import fishRodIcon from "public/fish-rod.png"

const IconWidget = () => {
  const [socket, { isConnected }] = useSocketIO()

  const [selectedIcon, setSelectedIcon] = useState<IconType>("кулак")

  useEffect(() => {
    if (isConnected) {
      socket.emit(botSocketsConfig.socketEvents.JOIN_ICON_ROOM)

      socket.on(botSocketsConfig.socketEvents.UPDATE_WIDGET, handleNewIcon)
    }

    return () => {
      socket.off(botSocketsConfig.socketEvents.UPDATE_WIDGET, handleNewIcon)
    }
  }, [isConnected])

  const handleNewIcon = (icon: IconType) => {
    console.log(icon)
    setSelectedIcon(icon)
  }

  return (
    <Image
      src={selectedIcon === "удочка" ? fishRodIcon : fistIcon}
      width={268}
      height={268}
      alt="Icon"
    />
  )
}

export default IconWidget
