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

const otherAvatar = await webpack.waitForModule(webpack.filters.byProps('headerTop', 'avatar', 'badgeList'));
const { getGuildIconURL } = webpack.getByProps('getGuildIconURL');

const RealAvatar = avatar

export const GuildProfileIcon = (props) => {
  const { guild } = props;
  return (
    <div className={`${otherAvatar} ${wrapper}`}>
      <div style={{ width: '120px', height: '120px' }}>
        <div className={`${avatarStack}`}>
          {guild.icon ? (
            <img
              alt=' '
              src={getGuildIconURL(guild)}
              className={`${RealAvatar}`}
              style={{ borderRadius: '50%' }}
            />
          ) : (
            <div
              className={`${acronym} guild-icon-acronym`}
            > 
            {guild.acronym} 
            </div>
          ) }

        </div>

      </div>

    </div>
  )

}
