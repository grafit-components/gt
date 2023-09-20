
export interface IId {
  id: string | number;

  [key: string]: any;
}

export class GridRow<T extends IId> {
  id: number | string;
  // active = false;
  private edit$ = false;

  set edit(value: boolean) {
    if (value !== this.edit$) {
      this.edit$ = value;
      this.hash$ = null;
    }
  }

  get edit(): boolean {
    return this.edit$;
  }

  expanded = false;
  showAdditional = false;
  data: T;
  isGroup: boolean;
  level: number;
  groupValue: any[] = [];
  groupColumn: string;
  className: string[] = [];
  isSelected: boolean;
  children: GridRow<T>[] = [];
  parents: GridRow<T>[];
  private backup: any = {};

  private hash$: string | null;

  public get hash(): string {
    if (!this.hash$) {
      const hashObj = {...this.data};
      delete hashObj.children;
      this.hash$ = JSON.stringify(hashObj);
    }
    return this.hash$;
  }

  public editData(items?: any) {
    this.data = items;
    this.hash$ = null;
  }

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.data = data;

      if (data.children && data.children.length > 0) {
        this.children = data.children.map((_: any) => new GridRow(_));
      }
    }
  }
}
