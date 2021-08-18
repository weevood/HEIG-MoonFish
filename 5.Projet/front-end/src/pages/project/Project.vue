<template>
  <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
    <div class="container mx-auto px-6 py-8">
      <h1 class="text-blue-900 text-3xl font-medium">{{ project.title }}</h1>
    </div>
  </main>
</template>

<script>

import ProjectsService from "@/services/projects.service";

export default {
  name: 'Project',

  data() {
    return {
      project: { uuid: '', title: '' },
    };
  },

  mounted() {
    this.retrieveProject();
  },

  methods: {
    async retrieveProject() {
      this.project = await ProjectsService.get(this.$route.params.uuid);
    }
  }
};
</script>
