<template>
  <v-app>
    <v-app-bar
      :clipped-left="true"
      fixed
      app
    >
      <v-spacer/>
      <v-btn color="primary"
        @click="logInOverlay = !logInOverlay">ft_log</v-btn>
      <v-btn class="ml-1"
         color="some"
         @click="regOverlay = !regOverlay">ft_reg</v-btn>
    </v-app-bar>
    <v-navigation-drawer
      app
      permanent
      :clipped="true"
      class="rounded-br-xl"
      src="/backgrounds/nav.png"
    >
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in menu"
            :key="i"
            :to="item.to"
            exact
            router>
            <v-list-item-icon>
              <v-icon v-text="item.icon"
                right></v-icon>
            </v-list-item-icon>
            <v-list-item-title class='item__title' v-text="item.title">
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <v-overlay :value="regOverlay || logInOverlay">
          <the-register v-if="regOverlay"/>
          <the-log-in v-if="logInOverlay"/>
        </v-overlay>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data(){
    return {
      menu: [
        {
          title: 'Main',
          icon: 'mdi-home-roof',
          to: '/'
        },
        {
          title: 'wouldLikes',
          icon: 'mdi-horseshoe',
          to: 'wouldlikes'
        }
      ],
      regOverlay: false,
      logInOverlay: false
    }
  },
  methods:{
    some(){
      console.log(1);
    }
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
</style>
