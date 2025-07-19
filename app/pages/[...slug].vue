<template>
  <div>
    <ContentRenderer v-if="page" :value="page" />

  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('landing').path(route.path).first()
})
</script>

<style>

</style>