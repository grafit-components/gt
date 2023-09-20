import {ItskModalCloseReason} from './itsk-modal-close-reason.enum';

export interface IModalResult {
  /**
   * Причина закрытия окна
   */
  reason: ItskModalCloseReason;

  /**
   * Любые другие данные которые пользователь желает вернуть при закрытии окна
   */
  [key: string]: any;
}
