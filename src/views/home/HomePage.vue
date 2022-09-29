<script setup lang="ts">
import XtxRequestManager from "@/utils/XtxRequestManager";

XtxRequestManager.instance
  .request<{ msg: string }, { a: number; b: number }>({
    url: "",
    method: "",
    data: { a: 1, b: 2 },
    params: {},
  })
  .then((data) => {
    data.msg;
  });
</script>
<template>
  <div>HomePage</div>
</template>
