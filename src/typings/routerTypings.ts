export interface TabBarItem {
  title: string;
  path: string;
  icon: string;
}

export interface RouterItem {
  tabBars?: TabBarItem[];
  path?: string;
  element?: React.ReactNode;
  children?: RouterItem[];
}
