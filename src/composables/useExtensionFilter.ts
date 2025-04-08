import { computed, ref, type Ref } from "vue";
import type { User } from "../types/user";

export function useExtensionFilter(users: Ref<User[]>) {
  const extensions = ["tv", "biz", "net", "org"];
  const extSelected = ref("");
  const usersFiltered = computed(() => {
    if (!extSelected.value) {
      return users.value;
    }
    return users.value.filter((user) => user.email.endsWith(extSelected.value));
  });

  return {
    extensions,
    extSelected,
    usersFiltered
  }
}
