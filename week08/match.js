function match(selector, element) {
  if (!selector || !element.attributes) {
    return false;
  }
  let lastIndex = selector.length - 1;
  let currentElement = element;
  let currentSelector = selector[lastIndex];
  while (lastIndex >= 0 && currentElement) {
    let parent = currentElement.parent;
    let siblings = parent ? currentElement.children.filter(element => element.tagName) : [];
    switch (currentSelector) {
      case '>':
        return match(parent, selector.slice(0, lastIndex));
      case '~':
        return siblings.slice(0, currentElement.nthChild).some(element => match(element, selector.slice(0, lastIndex)));
      case '+':
        return match(siblings[currentElement.nthChild - 1]), selector.slice(0, lastIndex)

      default:
        let type = currentSelector.charAt(0);
        let attribute;
        switch (type) {
          case '#':
            attribute = currentElement.attributes.find(attr => attr.name === 'id');
            if (attribute && attribute.value === currentSelector.replace('#', '')) {
              currentSelector = selector[--lastIndex];
            }
            break;
          case '.':
            attribute = currentElement.attributes.find(attr => attr.name === 'class');
            if (attribute && attribute.value === currentSelector.replace('.', '')) {
              currentSelector = selector[--lastIndex];
            }
            break;
          default:
            if (currentElement.tagName === currentSelector) {
              currentSelector = selectors[--lastIndex];
            }
            break;
        }
        if (lastIndex === selector.length - 1) return false;
        if (!['>', '~', '+']) {
          currentElement = currentElement.parent;
        }
        currentElement.attributes.find(attr => attr.name === 'id');
        break;
    }
  }
  if (lastIndex < 0) {
    return true;
  }
  return false;
}