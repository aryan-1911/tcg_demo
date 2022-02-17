import { UPLOAD_FILE, RESET_UPLOAD_FILE_STATE } from 'const';
import { IActionFn } from 'interfaces';

export type UploadFileAction = IActionFn<{
  file: Blob | File;
  mapKey: number | string;
}>;
export const uploadFileAction: UploadFileAction = (params, redirect) => ({
  redirect,
  type: UPLOAD_FILE.PENDING,
  payload: params,
});

export const resetUploadFileStateAction: IActionFn<string | number> = (
  mapKey,
) => ({
  type: RESET_UPLOAD_FILE_STATE.SUCCESS,
  payload: mapKey,
});
