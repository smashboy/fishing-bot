import { BotCommandContext, createBotCommand } from "easy-twitch-bot"
import { log } from "@blitzjs/display"
import { botSocketsConfig, RoomKeyType } from "./botConfigs"

type UpdateWidget = (roomKey: RoomKeyType, newAmount: number) => void

const commandHandler = (
  roomKey: RoomKeyType,
  updateWidget: UpdateWidget,
  params: string[],
  { msg, user, say }: BotCommandContext
) => {
  log.info(`COMMAND HANDLER TRIGGER: ${roomKey}/${user}`)

  const userInfo = msg.userInfo

  if (!userInfo.isFounder && !userInfo.isBroadcaster && !userInfo.isMod) return

  const fishAmount = params[0] ? parseInt(params[0]) : null

  if (fishAmount === null || isNaN(fishAmount)) return say(`@${user} укажите количество рыбок.`)

  updateWidget(roomKey, fishAmount)
}

export const smallFish = (updateWidget: UpdateWidget) =>
  createBotCommand("smallFish", (...args) =>
    commandHandler(botSocketsConfig.roomKeys.smallFish, updateWidget, ...args)
  )

export const mediumFish = (updateWidget: UpdateWidget) =>
  createBotCommand("mediumFish", (...args) =>
    commandHandler(botSocketsConfig.roomKeys.mediumFish, updateWidget, ...args)
  )

export const largeFish = (updateWidget: UpdateWidget) =>
  createBotCommand("largeFish", (...args) =>
    commandHandler(botSocketsConfig.roomKeys.largeFish, updateWidget, ...args)
  )
