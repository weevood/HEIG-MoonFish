<template>
  <section v-if="projects.length" class="container mb-6">
    <h2 class="py-4 text-2xl font-medium" :class="podium && 'mb-4 text-white text-center font-allison italic text-6xl'" style="color: #DAA520">
      {{ $t('Recommendations.title') }}</h2>
    <table id="podium" class="mb-4 w-full inline-table">
      <tr class="w-full">
        <td class="w-1/3 align-bottom">
          <ProjectsList v-if="projects[1]" :projects="[projects[1]]" @msg="transfer"/>
          <div id="podium1" class="mx-8 flex justify-center items-center" style="height: 40px; background: #C0C0C0;">
            2 ({{ projects[1] && Math.ceil(projects[1].recommendedAt) }}%)
          </div>
        </td>
        <td class="w-1/3 align-bottom">
          <ProjectsList v-if="projects[0]" :projects="[projects[1]]" @msg="transfer"/>
          <div id="podium0" class="mx-8 flex justify-center items-center"
               style="height: 60px; background: #DAA520;">
            1 ({{ projects[0] && Math.ceil(projects[0].recommendedAt) }}%)
          </div>
        </td>
        <td class="w-1/3 align-bottom">
          <ProjectsList v-if="projects[2]" :projects="[projects[1]]" @msg="transfer"/>
          <div id="podium2" class="mx-8 flex justify-center items-center"
               style="height: 20px; background: #8C7853;">
            3 ({{ projects[2] && Math.ceil(projects[2].recommendedAt) }}%)
          </div>
        </td>
      </tr>
    </table>
  </section>
</template>

<script>
import request from "@/utils/request";
import RecommendationsService from "@/services/recommendations.service";
import inArray from "@/utils/inArray";
import ProjectsList from "@/components/layout/ProjectsList";

export default {
  name: 'Recommendations',
  components: { ProjectsList },
  emits: ['msg'],

  props: {
    number: {
      type: Number,
      default: 10
    },
    podium: {
      type: Boolean,
      default: true
    },
  },

  data() {
    return {
      projects: [],
    };
  },

  mounted() {
    this.retrieveProjectsRecommendations();
  },

  methods: {
    inArray,

    transfer(msg) {
      this.$emit('msg', msg);
    },

    async retrieveProjectsRecommendations() {
      this.projects = await request(RecommendationsService.getProjects(this.number), this);
    },

  }

};
</script>
