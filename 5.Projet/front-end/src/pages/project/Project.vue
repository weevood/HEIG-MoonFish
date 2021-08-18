<template>
  <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
    <div class="container mx-auto px-6 py-8 flex justify-between items-center">
      <h1 class="text-blue-900 text-3xl font-medium">{{ project.title }}</h1>
      <button v-if="inArray(project.uuid, myProjects)" @click="onAddResource = true" :disabled="onAddResource"
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded inline-flex items-center disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <span>{{ $t('Resources.new') }}</span>
      </button>
    </div>
    <section class="container" v-if="onAddResource">
      <DropZone @close="onAddResource = false"/>
    </section>
  </main>
</template>

<script>

import ProjectsService from "@/services/projects.service";
import DropZone from "@/components/ui/DropZone";
import inArray from "@/utils/inArray";

export default {
  name: 'Project',
  components: { DropZone },

  data() {
    return {
      onAddResource: false,
      project: { uuid: '', title: '' },
      myProjects: [],
    };
  },

  computed: {
    currentUser() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user.user;
      }
      return false;
    }
  },

  mounted() {
    this.retrieveProject();
    this.retrieveMyProjects();
  },

  methods: {
    inArray,
    async retrieveProject() {
      this.project = await ProjectsService.get(this.$route.params.uuid);
    },
    async retrieveMyProjects() {
      this.myProjects = await ProjectsService.getMine(this.currentUser.uuid, 'uuid');
    },
  }
};
</script>
