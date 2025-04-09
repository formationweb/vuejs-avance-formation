import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { User } from "../types/user";

const URL = "https://jsonplaceholder.typicode.com/users";

export type UserPayload = {
  email: string;
  name: string;
};

export const useUserStore = defineStore("user", () => {
  const users = ref<User[]>([]);
  const loading = ref(false);
  const searchName = ref('')
  const firstNames = computed(() => users.value.map(user => user.name));
  const firstNamesFiltered = computed(() => {
    return firstNames.value.filter(name => name.startsWith(searchName.value))
  })
  const usersSearched = computed(() => {
    return users.value.filter(user => user.name.startsWith(searchName.value))
  })

  async function me() {
    const res = await axios.get(URL + '/1')
    return res.data
  }

  async function getUsers() {
    try {
      loading.value = true;
      const res = await axios.get(URL);
      users.value = res.data;
    } catch (err) {
      // gérer le cas d'erreur
    } finally {
      loading.value = false;
    }
  }

  async function createUser(payload: UserPayload) {
    const { data: user } = await axios.post(URL, payload);
    users.value = [...users.value, user];
    return user;
  }

  async function deleteUser(id: number) {
    await axios.delete(URL + "/" + id);
    users.value = users.value.filter((user) => user.id != id);
  }

  return {
    // state
    users,
    searchName,
    loading,

    // getters
    firstNames,
    firstNamesFiltered,
    usersSearched,

    // actions
    getUsers,
    createUser,
    deleteUser,
    me
  };
});
