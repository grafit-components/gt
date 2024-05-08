import { IItskMenuItem } from '../../itsk-menu/model/i-itsk-menu-item';

export interface NavigationData {
  title?: string;
  subtitle?: string;
  footerImg: string;
  footerImgHeight?: string;
  footerImgWidth?: string;
  footerText: string;
  version: string;
  menuItems: IItskMenuItem[];
}
