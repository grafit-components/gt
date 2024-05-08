export interface IItskMenuItem {
  id?: number | null;
  parentId?: number | null;
  name: string;
  url?: string;
  outerUrl?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  hidden?: boolean;
  code?: string;
  group?: string;
  iconClassName?: string;
  sortOrder?: number;
  children?: IItskMenuItem[];
  open?: boolean;
  match?: 'exact';
  navigate?: (item: IItskMenuItem) => void;
}
