import { common, webpack } from "replugged";
const { React } = common;

const { wrapper, avatar, avatarStack } = await webpack.waitForModule<{
  wrapper: string;
  avatar: string;
  avatarStack: string;
}>(webpack.filters.byProps("wrapper", "avatar", "avatarStack"));

const { acronym } = await webpack.waitForModule<{
  acronym: string;
}>(webpack.filters.byProps("childWrapper", "acronym"));

const { getGuildIconURL } = await webpack.waitForModule<{
  getGuildIconURL: (guild: Discord.Guild, size: number, format: string) => string;
}>(webpack.filters.byProps("getGuildIconURL"));


export const GuildProfileIcon = (props) => {
  const { guild } = props;

  return (
    <div className={`${avatar} ${wrapper}`}>
      <div style={{ width: '120px', height: '120px' }}>
        <div className={`${avatarStack}`}>
          {guild.icon ? (
            <img
              alt=' '
              src={getGuildIconURL(guild, 128, 'webp')}
              className={`${avatar}`}
              style={{ borderRadius: '50%' }}
            />
          ) : (
            <div
              className={`${acronym}, guild-icon-acronym`}
            > 
            {guild.acronym} 
            </div>
          ) }

        </div>

      </div>

    </div>
  )

}
