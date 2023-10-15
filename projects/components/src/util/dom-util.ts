export function findScrollableParentY(node: HTMLElement) {
  while (node !== null) {
    if (node.scrollHeight > node.offsetHeight) {
      const style = getComputedStyle(node);
      if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
        return node;
      }
    }
    node = node.parentNode as HTMLElement;
  }
  return null;
}

export function findScrollableParentX(node: HTMLElement) {
  while (node !== null) {
    if (node.scrollWidth > node.offsetWidth) {
      const style = getComputedStyle(node);
      if (style.overflowX === 'auto' || style.overflowX === 'scroll') {
        return node;
      }
    }
    node = node.parentNode as HTMLElement;
  }
  return null;
}


export function findTransformedParent(node: HTMLElement) {
  while (node !== null && node.tagName !== 'BODY') {
    const style = getComputedStyle(node);
    if (style.transform !== 'none') {
      return node;
    }
    node = node.parentNode as HTMLElement;
  }
  return null;
}

export function getRealPosition(node: HTMLElement): {
  top: number,
  left: number,
  right: number,
  bottom: number,
  width: number,
  height: number
} {
  const rect = node.getBoundingClientRect();
  const leftPosition = rect.left + window.pageXOffset;
  const topPosition = rect.top + window.pageYOffset;
  return {
    top: topPosition,
    left: leftPosition,
    width: rect.width,
    height: rect.height,
    right: leftPosition + rect.width,
    bottom: topPosition + rect.height
  };
}
