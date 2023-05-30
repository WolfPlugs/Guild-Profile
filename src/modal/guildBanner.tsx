import { common, components, webpack } from 'replugged'

const { React, i18n } = common
const { Tooltip } = components

const { banner, profileBannerPremium, bannerPremium, profileBanner, premiumIconWrapper, premiumIcon } = await webpack.waitForModule<{
  banner: string,
  profileBannerPremium: string
  bannerPremium: string
  profileBanner: string
  premiumIconWrapper: string
  premiumIcon: string
}>(webpack.filters.byProps('profileBannerPremium', 'profileBanner'))

const { isAnimatedIconHash } = webpack.getByProps('isAnimatedIconHash')
const { canUseWebp } = webpack.getByProps('canUseWebp')
const { Colors } = webpack.getByProps('Colors')

export const GuildBanner = (props) => {

  const [color, setColor] = React.useState(Colors.BRAND)
const [hovered, setHovered] = React.useState(false)

  const { guild } = props
  const classes = [banner]
  const style = {
    backgroundColor: color,
  }

  async function componentDidMount() {
    if (guild.icon) {
      // const palette = await 
    }
  }

  if (guild.banner) {
    classes.push(bannerPremium, profileBannerPremium)

    const { id, banner } = guild

    if (banner == null) return null

    const cdnHost = window.GLOBAL_ENV.CDN_HOST
    const extension = hovered && isAnimatedIconHash(banner)
      ? 'gif' : canUseWebp ? 'webp' : 'jpg'
    const bannerSize = 4096
    let url = (cdnHost ? `${location.protocol}//${cdnHost}/banners/${id}/${banner}.${extension}` : null)

    if (extension === 'jpg') {
      url += "&quality=lossless"
    }

    style.backgroundImage = `url("${url}")`
  } else {
    classes.push(profileBanner)
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={style}
      className={classes.join(' ')}
    >
      <Tooltip
        text="Exclusive to servers with the server banner feature"
        className={premiumIconWrapper}
      >
        {/* {guild.banner && (
          <TextBadge
            color="rgba(32, 34, 37, 0.8)"
            text={
              <svg
                className={premiumIcon}
                aria-hidden="false"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  d="M11.9997 2L5.33301 8.66667V15.3333L11.9997 22L18.6663 15.3333V8.66667L11.9997 2ZM16.9997 14.65L11.9997 19.65L6.99967 14.65V9.35L11.9997 4.35L16.9997 9.35V14.65Z"
                  fill="currentColor"
                />
                <path
                  d="M8.66699 10.0501V13.9501L12.0003 17.2835L15.3337 13.9501V10.0501L12.0003 6.7168L8.66699 10.0501Z"
                  fill="currentColor"
                />
              </svg>
            }
          />
        )} */}
      </Tooltip>

    </div>
  )


}
