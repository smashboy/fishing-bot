export const botConfig = {
  channels: ["smashboy"],
  prefix: "!",
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
  | typeof botConfig.roomKeys.smallFish
  | typeof botConfig.roomKeys.mediumFish
  | typeof botConfig.roomKeys.largeFish

export type BotSocketEventType =
  | typeof botConfig.socketEvents.JOIN_SMALL_ROOM
  | typeof botConfig.socketEvents.JOIN_MEDIUM_ROOM
  | typeof botConfig.socketEvents.JOIN_LARGE_ROOM
