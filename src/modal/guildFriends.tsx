import { webpack, common, components } from "replugged";
import { openUserProfileModale } from "..";

const { React, i18n, contextMenu } = common;
const { Clickable, Modal: { ModalContent }, ErrorBoundary } = components;

const { empty } = await webpack.waitForModule<{
  empty: string;
}>(webpack.filters.byProps("emptyIconFriends"));

const { listRow, listAvatar} = await webpack.waitForModule<{
  listRow: string;
  listAvatar: string;
}>(webpack.filters.byProps("listRow"));

const { Spinner } = webpack.getByProps("Spinner");
const { Avatar } = webpack.getByProps("Avatar");

export function Friends (props) {

  const { user, status, onSelect, onContextMenu } = props;

  return (
    <Clickable
      className={listRow}
      onClick={() => onSelect(user.id)}
      onContextMenu={() => onContextMenu(user.id)}
    >
      <Avatar
        className={listAvatar}
        src={user.getAvatarURL()}
        size='SIZE_40'
        status={status}
      />
    </Clickable>
  )
}


export default function GuildFriends (props) {
  const { relationships, section } = props;

  function handleSelect (id) {
    openUserProfileModale(id);
  }

  if(!relationships) {
    return (
      <div className={empty}>
        <Spinner />
      </div>
    )
  }

  return (
    <ModalContent style={{ marginTop: '20px'}}>
      <ErrorBoundary>
        {relationships.map((relationship) => (
            <Friends
              onSelect={handleSelect}
              onContextMenu={(event) => 
                contextMenu.open(event, () => {})
              }
              user={relationship}
            />
        ))}
      </ErrorBoundary>
    </ModalContent>
  )
}
