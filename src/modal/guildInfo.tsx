import { webpack, common, components } from "replugged";
import moment from "moment";
import { v3 } from "murmurhash";

const { React, i18n, users } = common;
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

const { getSerializedState } = webpack.getByProps("getSerializedState");
const { getRegisteredExperiments } = webpack.getByProps("getRegisteredExperiments");


const GuildExplicitContentFilterTypes = [
  'EXPLICIT_CONTENT_FILTER_DISABLED',
  'EXPLICIT_CONTENT_FILTER_MEDIUM',
  'EXPLICIT_CONTENT_FILTER_HIGH',
];

const GuildVerificationLevels = [
  'VERIFICATION_LEVEL_NONE',
  'VERIFICATION_LEVEL_LOW',
  'VERIFICATION_LEVEL_MEDIUM',
  'VERIFICATION_LEVEL_HIGH',
  'VERIFICATION_LEVEL_VERY_HIGH',
];

const NsfwLevels = [
  'NSFW_LEVEL_DEFAULT',
  'NSFW_LEVEL_EXPLICIT',
  'NSFW_LEVEL_SAFE',
  'NSFW_LEVEL_AGE_RESTRICTED',
];


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
  const [experiments, setExperiments] = React.useState(null);
  const { guild } = props;

  async function componentDidMount() {

    const { ownerId, id } = guild
    const object = {};

    const experimentsEnabledForGuild = []
    const enabledGuildExperiments = {};

    const { loadedGuildExperiments } = getSerializedState()
    const registeredExperiments = getRegisteredExperiments()

    Object.keys(registeredExperiments).forEach(
      (experiment) => (object[v3(experiment)] = experiment)
    )
    Object.entries(loadedGuildExperiments).forEach(([key, value]) => 
    (loadedGuildExperiments[object[key]] = { ...value, hasKey: true })
    )

    const enabledExperiments = Object.keys(loadedGuildExperiments).filter(
      (k) => loadedGuildExperiments[k].hasKey != null && k !== 'undefined'
    )
    const y = {}

    Object.keys(object).forEach((key) => {
      y[object[key]] = key
    })

    enabledExperiments.forEach((key) => {
      enabledGuildExperiments[key] = loadedGuildExperiments[y[key]]
    }
    )

    enabledExperiments.forEach((key) => {
      const d = enabledGuildExperiments[key]
      if (d.overrides[id] !== undefined) {
        experimentsEnabledForGuild.push(key)
      }
    })

    setExperiments(experimentsEnabledForGuild)
    setOwner(await users.getUser(ownerId))
  }

  React.useEffect(() => {
    componentDidMount()
  }, [])

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
        <Sections title={i18n.Messages.GUILD_OWNER}>
          {/* {owner ? (
            <Met
          ) : ()} */}
        </Sections>
        <Sections title={i18n.Messages.FORM_LABEL_SERVER_DESCRIPTION}>
          {guild?.description}
        </Sections>
        {guild.vanityURLCode && (
          <Sections title={i18n.Messages.VANITY_URL}>
          {`discord.gg/${guild?.vanityURLCode}`}
        </Sections>
        )}
        <Sections title="Created At">
          {moment(extractTimestamp(guild?.id)).format("LLL")}
        </Sections>
        <Sections title="Joined At">
          {moment(guild?.joinedAt).format("LLL")}
        </Sections>
        <Sections title={i18n.Messages.FORM_LABEL_VERIFICATION_LEVEL}>
          {i18n.Messages[GuildVerificationLevels[guild?.verificationLevel]]}
        </Sections>
        <Sections title={i18n.Messages.FORM_LABEL_EXPLICIT_CONTENT_FILTER}>
          {i18n.Messages[GuildExplicitContentFilterTypes[guild?.explicitContentFilter]]}
        </Sections>
        <Sections title="Server Booster Count">
          {guild?.premiumSubscriptionCount}
        </Sections>
        <Sections title="Server Boost Lever">
          {guild?.premiumTier}
        </Sections>
        <Sections title="Preferred Locale">
          {guild?.preferredLocale}
        </Sections>
        <Sections title="Not Safe For Work (NSFW) Level">
          {i18n.Messages[NsfwLevels[guild?.nsfwLevel]]}
        </Sections>
        <Sections title="Enabled Experiments">
          {experiments && experiments.length > 0 ? experiments.join(', ') : i18n.Messages.NONE}
        </Sections>
      </Flex>
    </ModalContent>
  )

}

export default GuildInfo;
