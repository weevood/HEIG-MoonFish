<template>
  <section class="container mb-6 shadow-inner">
    <h2 class="py-4 text-2xl font-medium" :class="podium && 'mb-6 text-white text-center font-allison italic text-6xl'"
        style="color: #DAA520">
      {{ $t('Recommendations.title') }}</h2>
    <hr v-if="podium" class="w-1/3 m-auto mb-10" style="border-color: #DAA520; margin-top: -47px;">
    <table id="podium" class="mb-4 w-full inline-table">
      <tr class="w-full">
        <td class="w-1/3 align-bottom">
          <ProjectsList v-if="projects[1]" :projects="[projects[1]]" @msg="transfer"/>
          <div id="podium-2" class="mx-8 flex justify-center items-center relative text-white text-sm"
               style="height: 50px; border: 1px solid #2c7a7b; border-bottom-left-radius: 50% 10px; border-bottom-right-radius: 50% 10px; background: linear-gradient(to right, #2c7a7b 0px, #38b2ac 10%, #38b2ac 90%, #2c7a7b 100%);">
            <div class="absolute w-full"
                 style="top: -10px; height: 20px; border: 1px solid #38b2ac; border-radius: 50%; background: radial-gradient(at center center, rgba(0, 0, 0, 0.1) 0px, #38b2ac 33%);"></div>
            2 ({{ projects[1] && Math.ceil(projects[1].recommendedAt) }}%)
          </div>
        </td>
        <td class="w-1/3 align-bottom">
          <ProjectsList v-if="projects[0]" :projects="[projects[0]]" @msg="transfer"/>
          <div id="podium-1" class="mx-8 flex justify-center items-center relative text-white text-sm"
               style="height: 65px; border: 1px solid #2c7a7b; border-bottom-left-radius: 50% 10px; border-bottom-right-radius: 50% 10px; background: linear-gradient(to right, #2c7a7b 0px, #38b2ac 10%, #38b2ac 90%, #2c7a7b 100%);">
            <div class="absolute w-full"
                 style="top: -10px; height: 20px; border: 1px solid #38b2ac; border-radius: 50%; background: radial-gradient(at center center, rgba(0, 0, 0, 0.1) 0px, #38b2ac 33%);"></div>
            1 ({{ projects[0] && Math.ceil(projects[0].recommendedAt) }}%)
          </div>
        </td>
        <td class="w-1/3 align-bottom">
          <ProjectsList v-if="projects[2]" :projects="[projects[2]]" @msg="transfer"/>
          <div id="podium-3" class="mx-8 flex justify-center items-center relative text-white text-sm"
               style="height: 35px; border: 1px solid #2c7a7b; border-bottom-left-radius: 50% 10px; border-bottom-right-radius: 50% 10px; background: linear-gradient(to right, #2c7a7b 0px, #38b2ac 10%, #38b2ac 90%, #2c7a7b 100%);">
            <div class="absolute w-full"
                 style="top: -10px; height: 20px; border: 1px solid #38b2ac; border-radius: 50%; background: radial-gradient(at center center, rgba(0, 0, 0, 0.1) 0px, #38b2ac 33%);"></div>
            3 ({{ projects[2] && Math.ceil(projects[2].recommendedAt) }}%)
          </div>
        </td>
      </tr>
    </table>
  </section>
</template>

<script>
import ProjectsList from "@/components/ui/ProjectsList";
import RecommendationsService from "@/services/recommendations.service";
import inArray from "@/utils/inArray";
import request from "@/utils/request";

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
    this.retrieveRecommendations();
  },

  methods: {
    inArray,

    transfer(msg) {
      this.$emit('msg', msg);
    },

    async retrieveRecommendations() {
      this.projects = await request(RecommendationsService.getProjects(this.number), this);
    },

  }

};
</script>
