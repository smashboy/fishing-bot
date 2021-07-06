import { botSocketsConfig } from "server/botConfigs"
import FishCounterWidget from "../components/FishCounterWidget"

const MediumFish = () => {
  return <FishCounterWidget roomEventKey={botSocketsConfig.socketEvents.JOIN_MEDIUM_ROOM} />
}

export default MediumFish
