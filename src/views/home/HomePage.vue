<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
userStore.$patch({ profile: { token: "test token" } });
</script>
<template>
  <div class="box">Home Page</div>
</template>

<style lang="less"></style>
