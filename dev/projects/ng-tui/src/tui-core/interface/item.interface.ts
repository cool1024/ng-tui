export interface Item {
  text: string;
  value: any;
  content?: string;
}

export interface Node {
  value: any;
  parent: Node;
  children: Node[];
  hasChild: boolean;
}

export interface Menu {
  text: string;
  value?: any;
  icon?: string;
  image?: string;
  active?: boolean;
  children?: Menu[];
  parent?: Menu;
}

export interface TabItem {
  text: string;
  value?: any;
  icon?: string;
}
