export function isObject(value) {
  return value !== null && typeof value === 'object' && value.constructor === Object;
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}