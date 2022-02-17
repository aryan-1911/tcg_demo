export const downloadFile = (url: string, name: string) => {
  const link = document.createElement('a');
  link.download = name;
  link.href = url;
  link.target = '_blanck';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
