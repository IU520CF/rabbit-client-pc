<script setup lang="ts">
import XtxTopNav from "@/components/XtxTopNav.vue";
import XtxHeader from "@/components/XtxHeader.vue";
import XtxFooter from "@/components/XtxFooter.vue";
</script>
<template>
  <XtxTopNav />
  <XtxHeader />
  <RouterView />
  <XtxFooter />
</template>
