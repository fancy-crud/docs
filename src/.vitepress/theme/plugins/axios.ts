export const axios = {
  get() {
    return Promise.resolve({
      status: 200,
      data: {}
    })
  },

  post(url: string, data: unknown) {
    return new Promise(resolve => {
      setTimeout(() => resolve({status: 200, data: {}}), 1500)
    })
  }
}
