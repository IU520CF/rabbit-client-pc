import { defineStore } from "pinia";
import type { User } from "./User";

type State = {
  profile: Partial<User>;
};

type Getters = {};

type Actions = {};

export const useUserStore = defineStore<"user", State, Getters, Actions>(
  "user",
  {
    state: () => ({
      profile: {},
    }),
    persist: true,
  }
);
