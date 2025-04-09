import { mount } from "@vue/test-utils";
import { createPinia, defineStore } from "pinia";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { piniaLogger } from "../logger";
import { nextTick, ref } from "vue";
import "../../../pinia.d";
import { afterEach } from "node:test";

describe("piniaLogger plugin", () => {
  let consoleSpy: { log: any; error: any };

  beforeEach(() => {
    const pinia = createPinia();

    consoleSpy = {
      log: vi.spyOn(console, "log").mockImplementation(() => {}),
      error: vi.spyOn(console, "error").mockImplementation(() => {}),
    };

    pinia.use(piniaLogger());

    mount({ template: "none" }, { global: { plugins: [pinia] } });
  });

  afterEach(() => {
    consoleSpy.log.mockRestore()
    consoleSpy.error.mockRestore()
  })

  test("track mutations", async () => {
    const useTestStore = defineStore("test", () => {
      const count = ref(0);

      function increment() {
        count.value++;
      }

      return {
        count,
        increment,
      };
    });

    const store = useTestStore();

    store.increment();

    await nextTick();

    expect(store.$history).toBeDefined();
    expect(store.$history).toHaveLength(1);
    expect(consoleSpy.log).toHaveBeenCalledTimes(3);
  });
});
