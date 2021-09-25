<template>
  <ul class="flex flex-wrap items-center" style="margin-left: -8px; margin-right: -8px">
    <li v-for="(project, i) in projects" :key="`Projects-${i}`"
        class="flex flex-col w-1/3 mb-4" :class="projects.length === 1 && 'w-full mx-3'">
      <div
          class="flex justify-between items-center p-4 mx-2 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
        <router-link :to="`/projects/${project.uuid}`" class="flex items-center">
          <div>
            <p class="text-sm font-medium text-gray-900">
              {{ project.title }}<span class="text-gray-600"> - {{ project.status?.toUpperCase() }}</span>
            </p>
            <ul class="my-2" style="margin-left: -4px; margin-right: -4px">
              <li v-for="(tag, j) in project.tags" :key="`Tags-${i}-tags-${j}`"
                  class="mx-1 text-xs inline-flex items-center font-bold leading-sm px-3 py-1 bg-blue-900 text-white rounded">
                {{ tag }}
              </li>
            </ul>
            <div v-if="inArray(project.status, finishedStatus)">
              <p class="text-sm font-normal text-gray-700 my-2">
                {{ `${ $t('Projects.end') }: ${ project.endDate && formatDate(project.endDate) }` }}</p>
              <StarRating :rating="project.mark" :rounded-corners=true :read-only=true :star-size=20
                          :increment=0.5 :show-rating=false style="margin-left: -5px" class="my-2"/>
              <router-link :to="`/resources/${project.feedback}`"
                           class="flex text-sm font-medium text-gray-900 hover:text-blue-900 my-2">
                {{ $t('Projects.feedback') }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="-4 -2 32 32"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </router-link>
            </div>
            <p v-else class="text-sm font-normal text-gray-700 my-2">{{ project.description }}</p>
          </div>
        </router-link>
      </div>
    </li>
  </ul>
</template>

<script>
import inArray from "@/utils/inArray";
import formatDate from "@/utils/formatDate";
import StarRating from 'vue-star-rating';

export default {
  name: 'ProjectsList',
  components: { StarRating },

  props: {
    projects: Array
  },

  data() {
    return {
      finishedStatus: ['ended', 'abandoned'],
    };
  },

  methods: {
    inArray,
    formatDate
  }

};
</script>
