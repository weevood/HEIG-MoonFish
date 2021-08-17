<template>
  <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
    <div class="container mx-auto px-6 py-8">
      <h1 class="text-blue-900 text-3xl font-medium">{{ $t('Resources.title') }}</h1>
    </div>
    <div class="container">
      <pre>{{ content }}</pre>
    </div>
  </main>
</template>

<script>

export default {
  name: 'Resources',
  data() {
    return {
      content: '',
    };
  },
  mounted() {
  },
};
</script>
