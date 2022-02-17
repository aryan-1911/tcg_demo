import { IPreviewDialog } from 'interfaces';

const sortDialogsByTime: typeof sortDialogs = (a, b) => {
  return +new Date(b.lastMessageDate.date) - +new Date(a.lastMessageDate.date);
};

export const sortDialogs = (a: IPreviewDialog, b: IPreviewDialog): number => {
  if (a.isAdmin && b.isAdmin) {
    return sortDialogsByTime(a, b);
  }
  if (b.isAdmin || a.isAdmin) {
    return 1;
  }

  return sortDialogsByTime(a, b);
};
