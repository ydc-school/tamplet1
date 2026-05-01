function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")   // special chars remove
    .replace(/\s+/g, "-");      // space → hyphen
}

export default slugify;