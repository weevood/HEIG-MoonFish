<template>
  <nav class="my-10">
    <ul>
      <li>

        <router-link to="/dashboard"
                     :class="$route.path === '/dashboard' ? 'bg-teal-500 text-gray-100' : 'text-gray-500'"
                     class="flex items-center my-2 py-2 px-6 hover:bg-teal-500 hover:bg-opacity-25 hover:text-gray-100 rounded m-2">
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
          </svg>
          <span class="mx-3">Dashboard</span>
        </router-link>

        <div>
          <router-link to="/projects"
                       :class="$route.path === '/projects' ? 'bg-teal-500 text-gray-100' : 'text-gray-500'"
                       class="flex items-center my-2 py-2 px-6 hover:bg-teal-500 hover:bg-opacity-25 hover:text-gray-100 rounded m-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
            </svg>
            <span class="mx-3">Projects</span>
          </router-link>

          <ul class="pl-4">
            <li v-for="(project, i) in projects" :key="`project-${i}`">
              <router-link :to="`/projects/${project.uuid}`"
                           :class="$route.path === `/projects/${project.uuid}` ? 'bg-teal-500 text-gray-100' : 'text-gray-500'"
                           class="flex items-center my-2 py-2 px-6 hover:bg-teal-500 hover:bg-opacity-25 hover:text-gray-100 rounded m-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6"/>
                </svg>
                <span class="mx-3">{{ project.title }}</span>
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <router-link to="/teams"
                       :class="$route.path === '/teams' ? 'bg-teal-500 text-gray-100' : 'text-gray-500'"
                       class="flex items-center my-2 py-2 px-6 hover:bg-teal-500 hover:bg-opacity-25 hover:text-gray-100 rounded m-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span class="mx-3">Teams</span>
          </router-link>

          <ul class="pl-4">
            <li v-for="(team, i) in myTeams.STATUS_ACTIVE" :key="`Team-${i}`">
              <router-link :to="`/teams/${team.uuid}`"
                           :class="$route.path === `/teams/${team.uuid}` ? 'bg-teal-500 text-gray-100' : 'text-gray-500'"
                           class="flex items-center my-2 py-2 px-6 hover:bg-teal-500 hover:bg-opacity-25 hover:text-gray-100 rounded m-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                </svg>
                <span class="ml-2 mr-1">{{ team.name }}</span>
                <svg v-if="team.relation.isOwner" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="-4 -4 32 32" stroke="#c0392b">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </router-link>
            </li>
          </ul>
        </div>

        <router-link to="/resources"
                     :class="$route.path === '/resources' ? 'bg-teal-500 text-gray-100' : 'text-gray-500'"
                     class="flex items-center my-2 py-2 px-6 hover:bg-teal-500 hover:bg-opacity-25 hover:text-gray-100 rounded m-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span class="mx-3">Resources</span>
        </router-link>
      </li>

      <li v-if="showModeratorBoard">
        <hr class="border-gray-500 border-t-2 mx-3">
        <router-link to="/moderator"
                     :class="$route.path === '/moderator' ? 'bg-teal-500 text-gray-100' : 'text-gray-500'"
                     class="flex items-center my-2 py-2 px-6 hover:bg-teal-500 hover:bg-opacity-25 hover:text-gray-100 rounded m-2">
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
            </path>
          </svg>
          <span class="mx-3">Moderator Board</span>
        </router-link>

        <ul class="pl-4">
          <li>
            <router-link to="/moderator/teams"
                         :class="$route.path === '/admin/users' ? 'bg-teal-500 text-gray-100' : 'text-gray-500'"
                         class="flex items-center my-2 py-2 px-6 hover:bg-teal-500 hover:bg-opacity-25 hover:text-gray-100 rounded m-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span class="mx-3">Teams</span>
            </router-link>
          </li>
        </ul>
      </li>

      <li v-if="showAdminBoard">
        <hr class="border-gray-500 border-t-2 mx-3">
        <router-link to="/admin" :class="$route.path === '/admin' ? 'bg-teal-500 text-gray-100' : 'text-gray-500'"
                     class="flex items-center my-2 py-2 px-6 hover:bg-teal-500 hover:bg-opacity-25 hover:text-gray-100 rounded m-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          <span class="mx-3">Admin Board</span>
        </router-link>

        <ul class="pl-4">
          <li>
            <router-link to="/admin/users"
                         :class="$route.path === '/admin/users' ? 'bg-teal-500 text-gray-100' : 'text-gray-500'"
                         class="flex items-center my-2 py-2 px-6 hover:bg-teal-500 hover:bg-opacity-25 hover:text-gray-100 rounded m-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
              <span class="mx-3">Users</span>
            </router-link>
          </li>
        </ul>
      </li>

    </ul>
  </nav>
</template>
<script>

import TeamsService from "@/services/teams.service";
import ProjectsService from "@/services/projects.service";
import request from "@/utils/request";

export default {
  name: 'Navigation',

  data() {
    return {
      error: '',
      projects: [],
      myTeams: { STATUS_ACTIVE: [], STATUS_INACTIVE: [], STATUS_BANNED: [] },
    };
  },

  computed: {
    currentUser() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user.user;
      }
      return false;
    },
    showAdminBoard() {
      return this.currentUser && this.currentUser['role'] && this.currentUser['role'] === 'admin';
    },
    showModeratorBoard() {
      return this.showAdminBoard || (this.currentUser && this.currentUser['role'] && this.currentUser['role'] === 'moderator');
    }
  },

  mounted() {
    this.retrieveMyProjects();
    this.retrieveMyTeams();
  },

  methods: {
    async retrieveMyProjects() {
      this.projects = await request(ProjectsService.getMine(this.currentUser.uuid), this);
    },
    async retrieveMyTeams() {
      this.myTeams = await request(TeamsService.getMine(), this);
    }
  }

}
</script>
