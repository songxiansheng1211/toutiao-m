// 本地存储封装模块
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  //   data 有可能不是 json字符串是的话转为对象 不是直接返回
  try {
    //   尝试把 data转为 js 对象
    return JSON.parse(data)
  } catch {
    return data
  }
}

export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
