import { Guild } from "discord-types/general";
import { common, components, webpack } from "replugged";

import { GuildProfileHeader } from "./guildProfileHeader";
import GuildInfo from './guildInfo';

const { React, flux, users } = common;
const {
  Modal: { ModalRoot, ModalHeader, ModalContent, ModalFooter },
  ErrorBoundary,
  Flex,
} = components;

const { tabBarContainer, tabBar, tabBarItem, topSectionNormal } = await webpack.waitForModule<{
  tabBarContainer: string;
  tabBar: string;
  tabBarItem: string;
  topSectionNormal: string;
}>(webpack.filters.byProps("tabBarContainer"));

const { root } = await webpack.waitForModule<{
  root: string;
}>(webpack.filters.byProps("root"));

const TabBar = webpack.getExportsForProps(
  await webpack.waitForModule(webpack.filters.bySource('[role="tab"][aria-disabled="false"]')),
  ["Header", "Item", "Panel", "Separator"],
) as unknown as Discord.TabBar;

const relationShips = await webpack.waitForProps(["getRelationships"]);
const Users = await webpack.waitForProps(["getCurrentUser", "getUser"]);
const guildUsers = await webpack.waitForProps(["isMember"]);

const GuildProfileSections = {
  GUILD_INFO: "GUILD_INFO",
  FRIENDS: "FRIENDS",
  BLOCKED_USERS: "BLOCKED_USERS",
};

export const GuildProfileModal = (props) => {
  const [section, setSection] = React.useState(GuildProfileSections.GUILD_INFO);
  const [counts, setCount] = React.useState(0);

  const { guild } = props;
  async function componentDidMount() {
    const { getMemberCounts } = props;
    const memberData = await getMemberCounts(guild.id);
    setCount(memberData);
  }

  switch (section) {
    case GuildProfileSections.GUILD_INFO:
      setSection(<GuildInfo guild={guild} />);
      break;
    // case GuildProfileSections.FRIENDS:
    //   return <Friends guild={guild} />;
    // case GuildProfileSections.BLOCKED_USERS:
    //   return <BlockedUsers guild={guild} />;
    // default:
    //   return null;
  }

  // React.useEffect(async () => {
  //   componentDidMount();
  // });

  return (
    <ErrorBoundary>
      <ModalRoot className={root} transitionState={1}>
        <Flex direction={Flex.Direction.VERTICAL}>
        <div className={topSectionNormal}>
          <GuildProfileHeader guild={guild} counts={counts} />
          <div className={tabBarContainer}>
          <TabBar type="top" className={tabBar} selectedItem={section} onItemSelect={setSection}>
            <TabBar.Item
              className={tabBarItem}
              id={GuildProfileSections.GUILD_INFO}
              key={GuildProfileSections.GUILD_INFO}>
              Server Info
            </TabBar.Item>
            <TabBar.Item
              className={tabBarItem}
              id={GuildProfileSections.FRIENDS}
              key={GuildProfileSections.FRIENDS}>
              Friends
            </TabBar.Item>
            <TabBar.Item
              className={tabBarItem}
              id={GuildProfileSections.BLOCKED_USERS}
              key={GuildProfileSections.BLOCKED_USERS}>
              Blocked Users
            </TabBar.Item>
          </TabBar>
          </div>
        </div>
         <div>{section}</div>
        </Flex>
      </ModalRoot>
    </ErrorBoundary>
  );
};

export default flux.connectStores([relationShips, Users, guildUsers], (compProps) => {
  const relationships = relationShips.getRelationships();
  const props = {
    friends: [],
    blocked: [],
  };

  for (const userId in relationships) {
    if (!users.isMember(compProps.guild.id, userId)) {
      continue;
    }

    const relationshipType = relationships[userId];
    const user = Users.getUser(userId);
    if (!user) {
      users?.getUser(userId);
      continue;
    }

    if (relationshipType === 1) {
      props.friends.push(user);
    } else if (relationshipType === 2) {
      props.blocked.push(user);
    }
  }

  return props;
})(GuildProfileModal) as unknown as typeof GuildProfileModal;
