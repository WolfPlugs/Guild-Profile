import { components, webpack, common } from "replugged";
import { GuildProfileFeatures } from "./guildPorfileFeatures";
import { GuildProfileIcon } from "./guildIcon";
import { GuildBanner } from "./guildBanner";

const { i18n } = common;
const { Text, Tooltip } = components;

const { nameTag, username } = await webpack.waitForModule<{
  nameTag: string;
  username: string;
}>(webpack.filters.byProps("nameTag"));

const { guildDetail } = await webpack.waitForModule<{
  guildDetail: string;
}>(webpack.filters.byProps("guildDetail"));

const { header, headerTop, badgeList } = await webpack.waitForModule<{
  header: string;
  headerTop: string;
  badgeList: string;
}>(webpack.filters.byProps("header", "headerTop", "badgeList"));


export const GuildProfileHeader = (props) => {
  const { guild, counts } = props;

  return (
    <header>
      <GuildBanner guild={guild} />
      <div className={header}>
        <GuildProfileIcon guild={guild} />
        <div className={headerTop}>
          <GuildProfileFeatures guild={guild} className={badgeList} />
        </div>
      </div>
      <div
        className={`${nameTag}`}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        { /* Need GuildBadge */}
        <Text className={username}>{guild.name}</Text>
      </div>
      <Text
        className={`${guildDetail}`}
      >
        { /* need InviteButton */}
        {counts ? (
          <Tooltip
            text={`${counts.onlineCount} Online`}
            position={Tooltip.Positions.LEFT}
          >
            <div>
              <span
                style={{
                  backgroundColor: "var(--green-360)",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "0.5em",
                }}
              />
              <span style={{ color: "var(--green-360)" }}>{counts.onlineCount}</span>
            </div>
            <Tooltip
              text={`${counts.memberCount} Members`}
              position={Tooltip.Positions.RIGHT}
            >
              <div>
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    border: "3px solid var(--primary-400)",
                    display: "inline-block",
                    marginRight: "0.5em",
                    marginLeft: "1em"
                  }}
                />
                <span style={{ color: "var(--primary-400)" }}>{counts.memberCount}</span>
              </div>
            </Tooltip>
          </Tooltip>
        ) : (
          `${i18n.Messages.LOADING}...`
        )}
      </Text>
    </header>
  )
}
