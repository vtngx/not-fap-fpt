<template>
  <v-app-bar
    class="main-header"
    height="64"
    fixed
    color='primary'
    dark>
    <v-btn icon class="mx-1" @click.stop="TOGGLE_DRAWER">
      <template v-if="DRAWER_STATE">
        <v-icon  style="font-size: 28px">mdi-arrow-left</v-icon>
      </template>
      <template v-else>
        <v-icon style="font-size: 28px">mdi-menu</v-icon>
      </template>
    </v-btn>

    <v-toolbar-title>NotFAP CMS</v-toolbar-title>
    <v-spacer></v-spacer>

    <template>
      <v-btn
        width="6%"
        max-height="35px"
        color="secondary"
        class="text-capitalize"
        @click="logOut"
      >Log out
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
  import config from '../../config';
  import {mapActions, mapState} from 'vuex'

  export default {
    name: 'Header',
    data: () => ({
      config,
    }),
    computed: {
      ...mapState(['drawer']),
      DRAWER_STATE :{
        get() {
          return this.drawer
        },
      }
    },
    methods: {
      ...mapActions([ 'TOGGLE_DRAWER' ]),
      logOut: function () {
        window.localStorage.removeItem('token-a');
        this.$router.push('/login');
      }
    }
  };
</script>

<style src="./Header.scss" lang="scss"></style>
