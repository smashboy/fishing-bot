import { botSocketsConfig } from "server/botConfigs"
import FishCounterWidget from "../components/FishCounterWidget"

const LargeFish = () => {
  return <FishCounterWidget roomEventKey={botSocketsConfig.socketEvents.JOIN_LARGE_ROOM} />
}

export default LargeFish
