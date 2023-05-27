import { components, webpack } from "replugged";
import { GuildProfileFeatures } from "./guildPorfileFeatures";
import { GuildProfileIcon } from "./guildIcon";

const { Modal: { ModalHeader } } = components;
const { header } = await webpack.waitForModule<{
  header: string;
}>(webpack.filters.byProps("pointer", "header"));

const { badgeList } = await webpack.waitForModule<{
  badgeList: string;
}>(webpack.filters.byProps("badgeList"));


export const GuildProfileHeader = (props) => {
  const { guild, counts } = props;

  return (
    <ModalHeader>
      <div className={header}>
        <GuildProfileIcon guild={guild} />
        <div>
          <GuildProfileFeatures guild={guild} className={badgeList} />
        </div>
      </div>
    </ModalHeader>
  )
}
