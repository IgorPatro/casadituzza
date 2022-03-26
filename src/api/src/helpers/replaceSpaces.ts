const replaceSpaces = (stringToReplace: string): string => {
  return stringToReplace.replace(/ /g, '<space>')
}

export default replaceSpaces
