function sortByIndex(array) {
    return [...array].sort((a, b) => (a.Index_No || 0) - (b.Index_No || 0));
}
export { sortByIndex };