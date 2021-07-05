import { BotCommandContext, createBotCommand } from "easy-twitch-bot"
import { botConfig, RoomKeyType } from "./botConfig"

type UpdateWidget = (roomKey: RoomKeyType, newAmount: number) => void

const commandHandler = (
  roomKey: RoomKeyType,
  updateWidget: UpdateWidget,
  params: string[],
  { msg, user, say }: BotCommandContext
) => {
  const userInfo = msg.userInfo

  if (!userInfo.isFounder || !userInfo.isBroadcaster || !userInfo.isMod) return

  const fishAmount = params[0] ? parseInt(params[0]) : null

  if (fishAmount === null) return say(`@${user} укажите количество рыб.`)

  updateWidget(roomKey, fishAmount)
}

export const smallFish = (updateWidget: UpdateWidget) =>
  createBotCommand("smallFish", (...args) =>
    commandHandler(botConfig.roomKeys.smallFish, updateWidget, ...args)
  )

export const mediumFish = (updateWidget: UpdateWidget) =>
  createBotCommand("mediumFish", (...args) =>
    commandHandler(botConfig.roomKeys.mediumFish, updateWidget, ...args)
  )

export const largeFish = (updateWidget: UpdateWidget) =>
  createBotCommand("largeFish", (...args) =>
    commandHandler(botConfig.roomKeys.largeFish, updateWidget, ...args)
  )
