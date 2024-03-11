import { reactive } from "vue";

export const endpoints: Record<string, any> = reactive({
  '/api/users/': [
    { id: self.crypto.randomUUID(), firstName: 'John', lastName: 'Doe', age: 25 },
    { id: self.crypto.randomUUID(), firstName: 'Jane', lastName: 'Doe', age: 24 },
    { id: self.crypto.randomUUID(), firstName: 'Jim', lastName: 'Doe', age: 23 },
    { id: self.crypto.randomUUID(), firstName: 'Jill', lastName: 'Doe', age: 22 }
  ],
})