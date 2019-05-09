<template>
  <div id="app">
    <v-toolbar v-if="user">
      <v-toolbar-title>HierArchy</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="redirect('/')">
          <router-link to="/">Home</router-link>
        </v-btn>
        <v-btn flat @click="redirect('/orgchart')">
          <router-link to="/orgchart">OrgChart</router-link>
        </v-btn>
        <v-btn flat @click="redirect('/about')">
          <router-link to="/about">About</router-link>
        </v-btn>
        <v-btn flat @click="redirect('/offer')">
          <router-link to="/offer">offers</router-link>
        </v-btn>
        <v-btn @click="logout" flat>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </div>
</template>

<script lang="ts">
import Axios from 'axios'
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    user: (window as any).$user
  }),
  methods: {
    async logout() {
      try {
        await Axios.delete('/auth')
      } catch (e) {
        // No err. Sometimes logout returns HTTP 401
      }
      location.href = '/login'
    },
    redirect(path: string) {
      this.$router.push(path)
    }
  }
})
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
nav {
  div,
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
