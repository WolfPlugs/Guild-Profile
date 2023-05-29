import { webpack, common, components } from "replugged";
import moment from "moment";

const { React, i18n } = common;
const { Modal: { ModalContent }, Flex, Text } = components;

const { empty, emptyIconFriends, emptyIconStreamerMode, emptyText } = await webpack.waitForModule<{
  empty: string;
  emptyIconFriends: string;
  emptyIconStreamerMode: string;
  emptyText: string;
}>(webpack.filters.byProps("empty", "emptyIconFriends"));

const { marginBottom8 } = await webpack.waitForModule<{
  marginBottom8: string;
}>(webpack.filters.byProps("marginBottom8"));

const { extractTimestamp } = webpack.getByProps("extractTimestamp");

const { hidePersonalInformation } = await webpack.waitForModule<{
  hidePersonalInformation: boolean;
}>(webpack.filters.byProps("hidePersonalInformation"));

const { FormSection } = await webpack.waitForModule<{
  FormSection: (props: { title: string; children?: React.ReactNode; className?: string }) => React.ReactNode;
}>(webpack.filters.byProps("FormSection"));

export const Sections = (props) => {
  const { children, title } = props;

  if (!children) {
    return null;
  }

  return (
    <FormSection
    className={`${marginBottom8} guild-info-section`}
    title={title}
    >
      <Text selectable={true}>
        {children}
      </Text>
    </FormSection>
  )
} 

export const GuildInfo = (props) => {
  const [owner, setOwner] = React.useState(null);
  const { guild } = props;
  // if (!children) {
  //   return null;
  // }
  if(hidePersonalInformation) {
    return (
      <div className={empty}>
        <div className={emptyIconStreamerMode} />
          <div className={emptyText}>
            {i18n.Messages.STREAMER_MODE_ENABLED}
          </div>
      </div>
    )
  }

  return (
    <ModalContent>
      <Flex wrap={Flex.Wrap.WRAP} justify={Flex.Justify.START}>
        {/* <Sections title={i18n.Messages.GUILD_OWNER}>
          {owner ? (
            <Met
          ) : ()}
        </Sections> */}
        <Sections title={i18n.Messages.FORM_LABEL_SERVER_DESCRIPTION}>
          {guild?.description}
        </Sections>
        {guild.vanityURLCode && (
          <Sections title={i18n.Messages.VANITY_URL}>
          {guild?.vanityURLCode}
        </Sections>
        )}
        <Sections title={i18n.Messages.CREATED_AT}>
          {moment(extractTimestamp(guild?.id)).format("LLL")}
        </Sections>
        <Sections title={i18n.Messages.JOINED_AT}>
          {moment(guild?.joinedAt).format("LLL")}
        </Sections>
        <Sections title={i18n.Messages.FORM_LABEL_VERIFICATION_LEVEL}>
          {i18n.Messages[`VERIFICATION_LEVEL_${guild?.verificationLevel}`]}
        </Sections>
        <Sections title={i18n.Messages.FORM_LABEL_EXPLICIT_CONTENT_FILTER}>
          {i18n.Messages[`EXPLICIT_CONTENT_FILTER_${guild?.explicitContentFilter}`]}
        </Sections>
        <Sections title={i18n.Messages.GUILD_PREMIUM_SUBSCRIPTION_COUNT}>
          {guild?.premiumSubscriptionCount}
        </Sections>
        <Sections title={i18n.Messages.GUILD_PREMIUM_TIER}>
          {i18n.Messages[`PREMIUM_TIER_${guild?.premiumTier}`]}
        </Sections>
        <Sections title={i18n.Messages.PREFERRED_LOCALE}>
          {guild?.preferredLocale}
        </Sections>
        <Sections title={i18n.Messages.NSFW}>
          {guild?.nsfw ? i18n.Messages.YES : i18n.Messages.NO}
        </Sections>
        <Sections title={i18n.Messages.ENABLED_EXPERIMENTS}>
          {guild?.enabledExperiments?.join(", ")}
        </Sections>
      </Flex>
    </ModalContent>
  )

}

export default GuildInfo;
