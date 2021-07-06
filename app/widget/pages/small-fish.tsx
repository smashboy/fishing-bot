import { botSocketsConfig } from "server/botConfigs"
import FishCounterWidget from "../components/FishCounterWidget"

const SmallFish = () => {
  return <FishCounterWidget roomEventKey={botSocketsConfig.socketEvents.JOIN_SMALL_ROOM} />
}

export default SmallFish
