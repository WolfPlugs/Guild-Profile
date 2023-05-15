import { Injector, Logger, common, webpack } from "replugged";
import GuildProfileModal from "./modal/guildProfile";

const { fluxDispatcher, React } = common;
const { openModal } = common.modal

class GuildProfile {
  private inject = new Injector();
  private logger = Logger.plugin("GuildProfile");

  // FluxDispatcher.subscribe(
  //   'GUILD_MEMBER_LIST_UPDATE'
  // )

  // guild-header-popout

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
}

export function stop(): void {
  guildProfile.stop();
}

export function guildMenu(menu: any): void {
  if (menu?.navId !== "guild-header-popout") return;
  const { MenuGroup, MenuItem } = webpack.getByProps(["Menu", "MenuItem", "MenuGroup"]) as any;

  if (!MenuGroup) return;
  if (menu.children.at(-2)?.props?.name === "guild-profile") return;

  const guild = 
  <MenuGroup name="guild-profile" id="poop">
    <MenuItem
      label="Guild Profile"
      id="pee"
      action={() =>
        openModal((props) => <GuildProfileModal {...props} />
        )}/>
  </MenuGroup>;

  menu.children.splice(-1, 0, guild);

  console.log(menu);

}
