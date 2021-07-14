const dev = process.env.NODE_ENV !== "production"

export const botConfig = {
  channels: dev ? ["smashboy"] : ["mreugenee"],
  prefix: "!",
}

export const botSocketsConfig = {
  roomKeys: {
    smallFish: "small-fish",
    mediumFish: "medium-fish",
    largeFish: "large-fish",
    icon: "icon",
  },
  socketEvents: {
    JOIN_SMALL_ROOM: "join-small-room",
    JOIN_MEDIUM_ROOM: "join-medium-room",
    JOIN_LARGE_ROOM: "join-large-room",
    JOIN_ICON_ROOM: "join-icon-room",
    UPDATE_WIDGET: "update-widget",
  },
}

export type RoomKeyType =
  | typeof botSocketsConfig.roomKeys.smallFish
  | typeof botSocketsConfig.roomKeys.mediumFish
  | typeof botSocketsConfig.roomKeys.largeFish
  | typeof botSocketsConfig.roomKeys.icon

export type BotSocketEventType =
  | typeof botSocketsConfig.socketEvents.JOIN_SMALL_ROOM
  | typeof botSocketsConfig.socketEvents.JOIN_MEDIUM_ROOM
  | typeof botSocketsConfig.socketEvents.JOIN_LARGE_ROOM
  | typeof botSocketsConfig.socketEvents.JOIN_ICON_ROOM

export type IconType = "удочка" | "кулак"
