import { Injector, Logger, common, webpack } from "replugged";
const { fluxDispatcher: FluxDispatcher } = common;
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

}
