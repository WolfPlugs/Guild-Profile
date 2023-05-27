import { webpack, components } from "replugged";
import Icons from "./icons";

const { Clickable, Tooltip } = components;

const { theme } = await webpack.waitForModule<{
  theme: string;
}>(webpack.filters.byProps("theme"));

const { container, clickable, profileBadge, profileBadge18, profileBadge24, desaturate } = await webpack.waitForModule<{
  container: string;
  clickable: string;
  profileBadge: string;
  profileBadge18: string;
  profileBadge24: string;
  desaturate: string;
}>(webpack.filters.byProps("container", "clickable", "profileBadge"));

export const GuildProfileFeatures = (props) => {

  const { guild, className } = props;
  return (
    <div
      aria-label="Guild Features"
      role="group"
      className={`${className} ${container}`}
    >
      {Array.from(guild.features).filter((feature) => feature !== 'VERIFIED' && feature !== 'PARTNERED').map((feature) => {
        const Icon = Icons[feature] ?? Icons.UNKNOWN;
        return (
          <Clickable
            onClick={() =>
              window.open(
                `https://github.com/Delitefully/DiscordLists#guild-feature-glossary:~:.-,text=${feature}`,
                "_blank"
              )
            }
            className={`${clickable}`}
          >
            <Tooltip
              key={feature.toLowerCase()}
              spacing={24}
              color="primary"
              text={feature}
            >
              <Icon
                className={[
                  guild.features.size > 14 ? profileBadge18 : profileBadge24,
                  profileBadge,
                  desaturate,
                ].join(" ")}
              />
            </Tooltip>
          </Clickable>
        )
      })}
    </div>
  )
};
