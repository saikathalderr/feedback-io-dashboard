<script lang="ts" setup>

const appName = import.meta.env.VITE_APP_NAME as string || ''

</script>

<template>
  <RouterLink to="/">
    <h1 class="logo">
      {{ appName }}
    </h1>
  </RouterLink>
</template>
