import { webpack, common, components } from "replugged";

const { React } = common;

const { empty, emptyIconFriends } = await webpack.waitForModule<{
  empty: string;
  emptyIconFriends: string;
}>(webpack.filters.byProps("empty", "emptyIconFriends"));

export const GuildInfo = (props) => {

}
