import { endpoints } from "./factory"

function returnDataAfterDelay(data: any, delay = 1000) {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), delay)
  })
}

function getIdFromUrl(url: string) {
  const lookup = url.match(/\/api\/users\/([\w-]+)/)
  return lookup ? lookup[1] : null
}


function getUsers(id: string | null) {
  const list = endpoints['/api/users/'] || []
  
  if (id) {
    return list.find((item: any) => item.id === id) || {}
  }

  return list
}

function createUser(data: any) {
  const list = endpoints['/api/users/'] || []
  const id = self.crypto.randomUUID()
  const user = { id, ...data }
  
  setTimeout(() => {
    list.push(user)
  }, 1300)

  return user
}


function updateUser(id: string, data: any) {
  const list = endpoints['/api/users/'] || []

  const userIndex = list.findIndex((item: any) => item.id === id)

  if (userIndex >= 0) {
    setTimeout(() => {
      list[userIndex] = { ...list[userIndex], ...data }
      console.log("🚀 ~ setTimeout ~ list:", list)
    }, 1300)
  }

  return list[userIndex]
}

function deleteUser(id: string) {
  const list = endpoints['/api/users/'] || []

  const userIndex = list.findIndex((item: any) => item.id === id)

  if (userIndex >= 0) {
    setTimeout(() => {
      list.splice(userIndex, 1)
    }, 1300)
  }
}


export const axios = {
  get(url: string) {
    const id = getIdFromUrl(url)!

    if (url.startsWith('/api/users/')) {
      return returnDataAfterDelay({status: 200, data: getUsers(id)})
    }

    return returnDataAfterDelay({ status: 404, data: {} })
  },

  post(url: string, data: unknown) {
    return returnDataAfterDelay({ status: 201, data: createUser(data) })
  },

  patch(url: string, data: unknown) {
    const id = getIdFromUrl(url)!
    return returnDataAfterDelay({ status: 200, data: updateUser(id, data) })
  },

  delete(url: string) {
    const id = getIdFromUrl(url)!
    return returnDataAfterDelay({ status: 204, data: deleteUser(id) })
  }
}
