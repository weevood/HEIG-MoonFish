<template>
  <main class="flex-1 bg-gray-100">
    <div class="container mx-auto px-6 py-8">
      <h1 class="text-blue-900 text-3xl font-medium">{{ $t('Resources.title') }}</h1>
    </div>
    <div class="container">
      <p v-if="!resources?.length" class="mb-3 italic text-gray-600">{{ $t('noItems') }}</p>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Resources',

  data() {
    return {
      resources: [],
    };
  },

  mounted() {}
};
</script>
