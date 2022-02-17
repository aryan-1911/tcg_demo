export const findParent = (node: any, className: string): any => {
  if (node.classList.contains(className)) return node;
  if (!node.parentNode) return null;
  if (!node.parentNode.classList) return null;
  if (node.parentNode.classList.contains(className)) return node.parentNode;
  return findParent(node.parentNode, className);
};

function fallbackCopyTextToClipboard(textarea: HTMLTextAreaElement) {
  textarea.focus();
  textarea.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }
  return true;
}

export const copyTextToClipboard = async (
  text: string,
  textarea?: HTMLTextAreaElement,
) => {
  if (!navigator.clipboard) {
    if (!textarea) {
      return false;
    }
    return fallbackCopyTextToClipboard(textarea);
  }
  return navigator.clipboard.writeText(text).then(
    () => {
      return true;
    },
    (err) => {
      console.error('Async: Could not copy text: ', err);
      return false;
    },
  );
};
