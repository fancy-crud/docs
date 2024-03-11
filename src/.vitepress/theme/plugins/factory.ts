import { reactive } from "vue";
import { generateUUID } from "../utils/random-ui";

export const endpoints: Record<string, any> = reactive({
  '/api/users/': [
    { id: generateUUID(), firstName: 'John', lastName: 'Doe', age: 25 },
    { id: generateUUID(), firstName: 'Jane', lastName: 'Doe', age: 24 },
    { id: generateUUID(), firstName: 'Jim', lastName: 'Doe', age: 23 },
    { id: generateUUID(), firstName: 'Jill', lastName: 'Doe', age: 22 }
  ],
})