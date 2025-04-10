import { mount } from "@vue/test-utils";
import { createPinia, defineStore } from "pinia";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { piniaPersist } from "../persist";
import { nextTick, ref } from "vue";

describe("piniaPersist", () => {
  let mockStorage;
  let useTestStore;

  beforeEach(() => {
    const storeStorage = {};
    mockStorage = {
      getItem: vi.fn((key: string) => storeStorage[key] || null),
      setItem: vi.fn(
        (key: string, value: string) => (storeStorage[key] = value)
      ),
      removeItem: vi.fn((key: string) => delete storeStorage[key]),
    };

    const pinia = createPinia();
    pinia.use(piniaPersist({
        storage: mockStorage
    }));

    mount({ template: "none" }, { global: { plugins: [pinia] } });

    useTestStore = defineStore("test", () => {
      const count = ref(0);

      function increment() {
        count.value++;
      }

      return {
        count,
        increment,
      };
    });
  });

  test("mutation state changes storage", async () => {
    const store = useTestStore();
    store.increment();

    await nextTick();

    expect(mockStorage.setItem).toHaveBeenCalled()
    expect(mockStorage.setItem).toHaveBeenCalledWith('pinia-test', JSON.stringify({ count: 1 }))
  });

  test('Clear storage', () => {
    const store = useTestStore();
    store.$clearPersistedState()
    expect(mockStorage.removeItem).toHaveBeenCalled()
  })
});
