import { BotCommandContext, createBotCommand } from "easy-twitch-bot/lib"
import { log } from "@blitzjs/display"
import { botSocketsConfig, IconType, RoomKeyType } from "./botConfigs"

type UpdateFishWidget = (roomKey: RoomKeyType, newAmount: number) => void
type UpdateIconWidget = (roomKey: RoomKeyType, icon: IconType) => void

// TODO: can not import types from lib
const isUserAuthorized = (user: any) => user.isFounder || user.isBroadcaster || user.isMod
const reply2User = (say: (message: string) => void, username: string, message: string) =>
  say(`@${username} ${message}`)

const fishCommandHandler = (
  roomKey: RoomKeyType,
  updateWidget: UpdateFishWidget,
  params: string[],
  { msg, user, say }: BotCommandContext
) => {
  log.info(`FISH COMMAND TRIGGER: ${roomKey}/${user}`)

  const userInfo = msg.userInfo

  if (!isUserAuthorized(userInfo)) return

  const fishAmount = params[0] ? parseInt(params[0]) : null

  if (fishAmount === null || isNaN(fishAmount))
    return reply2User(say, user, "укажите количество рыбок.")
  updateWidget(roomKey, fishAmount)
}

const iconCommandHandler = (
  roomKey: RoomKeyType,
  updateWidget: UpdateIconWidget,
  params: string[],
  { msg, user, say }: BotCommandContext
) => {
  log.info(`ICON COMMAND TRIGGER: ${roomKey}/${user}`)

  const userInfo = msg.userInfo

  if (!isUserAuthorized(userInfo)) return

  const icon: IconType | null | string = params[0] || null

  if (icon !== "удочка" && icon !== "кулак")
    return reply2User(say, user, "недопустимый тип значка.")

  updateWidget(roomKey, icon)
}

export const smallFish = (updateWidget: UpdateFishWidget) =>
  createBotCommand("smallfish", (...args) =>
    fishCommandHandler(botSocketsConfig.roomKeys.smallFish, updateWidget, ...args)
  )

export const mediumFish = (updateWidget: UpdateFishWidget) =>
  createBotCommand("mediumfish", (...args) =>
    fishCommandHandler(botSocketsConfig.roomKeys.mediumFish, updateWidget, ...args)
  )

export const largeFish = (updateWidget: UpdateFishWidget) =>
  createBotCommand("largefish", (...args) =>
    fishCommandHandler(botSocketsConfig.roomKeys.largeFish, updateWidget, ...args)
  )

export const icon = (updateWidget: UpdateIconWidget) =>
  createBotCommand("icon", (...args) =>
    iconCommandHandler(botSocketsConfig.roomKeys.icon, updateWidget, ...args)
  )
