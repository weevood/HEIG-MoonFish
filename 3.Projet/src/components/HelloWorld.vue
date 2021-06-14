<template>
  <h1>{{ msg }}</h1>
  <button type="button" class="btn btn-green" @click="state.count++">Count is: {{ state.count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script setup>
import { defineProps, reactive } from 'vue'

defineProps({
  msg: String
})

const state = reactive({ count: 0 })
</script>

<style scoped>
* {
  @apply transition duration-300;
}
.btn {
  @apply py-2 px-4 font-semibold rounded shadow transition duration-300;
}
.btn-green {
  @apply text-white bg-green-500 hover:bg-green-700;
}
</style>
