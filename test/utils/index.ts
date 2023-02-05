const dynamicDataKeySet = ['id', 'created', 'modified', '_id', '__v']
export const clearDynamicData = (data: any) => {
  if (Array.isArray(data)) {
    return data.forEach(clearDynamicData)
  }
  if (typeof data === 'object') {
    for (const key of dynamicDataKeySet) {
      Reflect.deleteProperty(data, key)
    }
  }
  return data
}
