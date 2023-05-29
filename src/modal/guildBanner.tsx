import { common, components, webpack } from 'replugged'

const { React } = common
const { Tooltip } = components

const { Colors } = await webpack.waitForModule<{ Colors: any }>(webpack.filters.byProps('Colors'))

const [color, setColor] = React.useState(Colors.BRAND)
const [hovered, setHovered] = React.useState(false)

export const GuildBanner = (props) => {
  const { guild } = props
  function async componentDidMount() {
    if (guild.icon) {
      // const palette = await 
    }
  }


}
