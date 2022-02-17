const mimeTypes = [
  'image/jpeg',
  'image/pjpeg',
  'image/jpg',
  'image/png',
  'video/mp4',
  'video/mp4v-es',
  'video/video/x-m4v',
];

// const maxFileSize = 16777216; //16Mb
const maxFileSize = 524288000 //500Mb

const maxFilesCount = 10;

const filesErrors = {
  fileType: 'Only jpg, jpeg, png, mp4, m4v',
  fileSize: 'File size must be less than 16 Mb',
  filesLimit: 'Maximum 10 files',
};

export const errorFileType = (fileType: string) => {
  if (!mimeTypes.includes(fileType)) {
    return filesErrors.fileType;
  }
  return '';
};

export const errorFileSize = (fileSize: number) => {
  if (fileSize > maxFileSize) {
    return filesErrors.fileSize;
  }
  return '';
};

export const errorFilesLimit = (count: number) => {
  if (count + 1 > maxFilesCount) {
    return filesErrors.filesLimit;
  }
  return '';
};
