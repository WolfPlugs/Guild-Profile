import { common, components, webpack } from "replugged";

const { React: { useState } } = common;
const { Modal: { ModalRoot, ModalHeader, ModalContent, ModalFooter }, ErrorBoundary, Flex } = components;
const { tabBarContainer, tabBar, tabBarItem, topSectionNormal } = webpack.getByProps("tabBarContainer");
const { root } = webpack.getByProps("root");
const TabBar = webpack.getExportsForProps(
  webpack.getBySource('[role="tab"][aria-disabled="false"]'),
  ["Header", "Item", "Panel", "Separator"],
);

const [setSection, section] = useState("");

class GuildProfileBar {
  public render(): void {
    return (
      <ModalRoot>
        <TabBar
          className={tabBar}
          selectedItem='placeholder'
          tyype='top'
          onItemSelect={() => { }}
        >
          <TabBar.Item
            className={tabBarItem}
            id={'placeholder'}>
          </TabBar.Item>
        </TabBar>
      </ModalRoot>
    )

  }
}

class GuildProfileModal {
  public render(): void {
    return (
      <ModalRoot className={root} transitionState={1}>
        <div className={topSectionNormal}>
          <ErrorBoundary>
            <GuildProfileBar
              setSection={setSection}
              section={section}
            />
          </ErrorBoundary>
        </div>
      </ModalRoot>
    )
  }
}

export default GuildProfileModal;
