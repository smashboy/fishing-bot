export const botConfig = {
  channels: ["mreugenee"],
  prefix: "!",
}

export const botSocketsConfig = {
  roomKeys: {
    smallFish: "small-fish",
    mediumFish: "medium-fish",
    largeFish: "large-fish",
  },
  socketEvents: {
    JOIN_SMALL_ROOM: "join-small-room",
    JOIN_MEDIUM_ROOM: "join-medium-room",
    JOIN_LARGE_ROOM: "join-large-room",
    UPDATE_WIDGET: "update-widget",
  },
}

export type RoomKeyType =
  | typeof botSocketsConfig.roomKeys.smallFish
  | typeof botSocketsConfig.roomKeys.mediumFish
  | typeof botSocketsConfig.roomKeys.largeFish

export type BotSocketEventType =
  | typeof botSocketsConfig.socketEvents.JOIN_SMALL_ROOM
  | typeof botSocketsConfig.socketEvents.JOIN_MEDIUM_ROOM
  | typeof botSocketsConfig.socketEvents.JOIN_LARGE_ROOM
