import { Injector, Logger, common, webpack } from "replugged";
import GuildProfileModal from "./modal/guildProfile";

const { fluxDispatcher, React, Flux } = common;
const { openModal } = common.modal

const memberCounts = [];

// export Object.freeze({
//   FluxActions: {
//     UPDATE_MEMBER_COUNTS: "GUILD_PROFILE_UPDATE_MEMBER_COUNTS",
//   }
// })

class GuildProfile {
  private logger = Logger.plugin("GuildProfile");

  public async start(): Promise<void> {
    this.logger.log("Starting GuildProfile");
  }

  public stop(): void {
    this.logger.log("Stopping GuildProfile");
  }
}

// probably move this to another file?
class MemberCountStore extends Flux.Store {
  public getStore(): any {
    return {
      memberCounts,
    }
  }

  getAllMemberCounts(): any {
    return memberCounts;
  }

  getMemberCounts(guildId: string): any {
    return memberCounts.find((memberCounts) => memberCounts.guildId === guildId);
  }
}


const guildProfile = new GuildProfile();

export async function start(): Promise<void> {
  await guildProfile.start();
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
  const guild = 
  <MenuGroup name="guild-profile" id="poop">
    <MenuItem
      label="Guild Profile"
      id="pee"
      action={() =>
        openModal((props) => <GuildProfileModal {...props} guild={guildData} />
        )}
      />
  </MenuGroup>;

  menu.children.splice(-1, 0, guild);
}

export function getMemberCounts (id: string) {
  return new Promise((resolve) => {
    const memberCounts = memberCountsStore.getMemberCounts(id);
  })
}
