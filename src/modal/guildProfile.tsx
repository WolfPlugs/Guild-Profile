import { common, components, webpack } from "replugged";

const { React } = common;
const { Modal: { ModalRoot, ModalHeader, ModalContent, ModalFooter }, ErrorBoundary, Flex } = components;

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

const GuildProfileSections = {
  GUILD_INFO: 'GUILD_INFO',
  FRIENDS: 'FRIENDS',
  BLOCKED_USERS: 'BLOCKED_USERS',
};


export const GuildProfileModal = (props) => {
  console.log(props)
  const [section, setSection] = React.useState(GuildProfileSections.GUILD_INFO);
  const [count, setCount] = React.useState(0);

  const { guild } = props;
  async function componentDidMount() {
    const { guild, getMemberCounts } = props;
    const memberData = await getMemberCounts(guild.id);
    setCount(memberData);
  }

  React.useEffect(() => {
    componentDidMount();
  });

  return (
    <ModalRoot className={root} transitionState={1}>
      <div className={topSectionNormal}>
        <ErrorBoundary>
          <ModalRoot className={tabBarContainer}>
            <TabBar
              type='top'
              className={tabBar}
              selectedItem={section}
              onItemSelect={setSection}
            >
              <TabBar.Item
                className={tabBarItem}
                id={GuildProfileSections.GUILD_INFO}
                key={GuildProfileSections.GUILD_INFO}
              >
                Server Info
              </TabBar.Item>
              <TabBar.Item
                className={tabBarItem}
                id={GuildProfileSections.FRIENDS}
                key={GuildProfileSections.FRIENDS}
              >
                Friends
              </TabBar.Item>
              <TabBar.Item
                className={tabBarItem}
                id={GuildProfileSections.BLOCKED_USERS}
                key={GuildProfileSections.BLOCKED_USERS}
              >
                Blocked Users
              </TabBar.Item>
            </TabBar>
          </ModalRoot>
        </ErrorBoundary>
      </div>
    </ModalRoot>
  )

}

export default GuildProfileModal;
