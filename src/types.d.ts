declare namespace Discord {

  export type Guild = import('discord-types/general').Guild

  export interface TabBarProps extends React.HTMLAttributes<HTMLDivElement> {
    type: string;
    look?: string;
    selectedItem: string;
    onItemSelect: (newItem: string) => void;
  }

  export interface TabBarItemProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
    key: string;
  }

  export interface TabBar {
    (props: TabBarProps): JSX.Element;
    Item: (props: TabBarItemProps) => JSX.Element;
  }
}
