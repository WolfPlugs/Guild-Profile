import { Injector, Logger, common, webpack } from "replugged";

import GuildProfileModal from "./modal/guildProfile";
import memberCountsStore from "./store"
import memberCountsActions from "./acts"

import "./style.css";


const { fluxDispatcher, React, flux, users, Channels } = common;
const { openModal } = common.modal


class GuildProfile {
  private logger = Logger.plugin("GuildProfile");



  public handleMemberListUpdate(memberListUpdate) {
    updateTheMemberCounts(memberListUpdate);
  }


  public async start(): Promise<void> {
    this.logger.log("Starting GuildProfile");
  }

  public stop(): void {
    this.logger.log("Stopping GuildProfile");
  }
}


const guildProfile = new GuildProfile();

export async function start(): Promise<void> {
  await guildProfile.start();

    fluxDispatcher.subscribe(
    "GUILD_MEMBER_LIST_UPDATE",
    guildProfile.handleMemberListUpdate
  );
}

export function stop(): void {
  guildProfile.stop();
}

export function guildMenu(menu: any): void {
  if (menu?.navId !== "guild-header-popout") return;
  const { MenuGroup, MenuItem } = webpack.getByProps(["Menu", "MenuItem", "MenuGroup"]) as any;

  if (!MenuGroup) return;
  if (menu.children.at(-2)?.props?.name === "guild-profile") return;
  const guildData = menu.data[0].guild;
  const getMemberCount = (guildId) => {
    return getMemberCounts(guildId);
  }
  const guild = 
  <MenuGroup name="guild-profile" id="poop">
    <MenuItem
      label="Guild Profile"
      id="pee"
      action={() =>
        openModal((props) => <GuildProfileModal {...props} guild={guildData} getMemberCounts={getMemberCount} />
        )}
      />
  </MenuGroup>;

  menu.children.splice(-1, 0, guild);
}

export function getMemberCounts (id: string) {
  return new Promise((resolve) => {
    const memberCounts = memberCountsStore.getMemberCounts(id);

    if (memberCounts) {
      resolve(memberCounts);
      return;
    }

    const { requestMembers } = webpack.getByProps(["requestMembers"]) as any;
    requestMembers(id);

    const updateMemberCounts = (memberListUpdate) => {
      return updateTheMemberCounts(memberListUpdate);
    };

    function onRecive(memberListUpdate) {
      if (memberListUpdate.guildId === id) {
        resolve(updateMemberCounts(memberListUpdate));
      }
    }


    fluxDispatcher.subscribe("GUILD_MEMBER_LIST_UPDATE", onRecive);
  })
}

export function updateTheMemberCounts(memberListUpdate) {
  const { guildId, memberCount, groups } = memberListUpdate;
  const onlineCount = groups
    .map((group: any) => (group.id !== "offline" ? group.count : 0))
    .reduce((a: any, b: any) => {
      return a + b;
    }, 0);
  const memberCounts = { guildId, memberCount, onlineCount };

  memberCountsActions.updateMemberCounts(memberCounts);
  return memberCounts;
}

export async function openUserProfileModale(userId: string) {
  await users.getUser(userId);

  await fluxDispatcher.dispatch({
    type: "USER_PROFILE_MODAL_OPEN",
    userId,
    analythicsLocation: "Bikini Bottom"
  })
}
