<template>
  <v-app>
    <v-app-bar
      class="header__inner"
      :clipped-left="true"
      fixed
      app
    >
      <v-spacer/>
    <transition name="slideInLeft" mode="out-in">
      <div class="header__inner__buttons"
           v-if="authUser === null"
           :key="1">
        <v-btn color="primary"
               @click="logIn_switch">ft_log</v-btn>
        <v-btn class="ml-1"
               color="some"
               @click="reg_switch">ft_reg</v-btn>
      </div>
      <div class="header__inner__buttons"
           v-if="authUser !== null"
           :key="2">
        <v-btn
          color="secondary"
          @click="signOut">ft_logOut</v-btn>
      </div>
    </transition>
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
            <v-list-item-title v-text="item.title">
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <transition name="slideInLeft" mode="out-in">
        <v-list class="mt-16" v-show="authUser !== null">
          <v-list-item-group>
            <v-list-item
              v-for="(item, i) in authMenu"
              :key="i"
              :to="item.to"
              exact
              router
            >
              <v-list-item-icon>
                <v-icon right v-text="item.icon"/>
              </v-list-item-icon>
              <v-list-item-title v-text="item.title"/>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </transition>
    </v-navigation-drawer>
    <v-main>
      <v-container>
          <nuxt />
      </v-container>
    </v-main>
    <transition name="slideInDown" mode="out-in">
      <the-register v-if="regForm && authUser == null"/>
      <the-log-in v-if="logInForm && authUser == null"/>
    </transition>
  </v-app>
</template>

<script>
import { mapState, mapMethods } from 'vuex'

export default {
  data(){
    return {
      menu: [
        {
          title: 'Main',
          icon: 'fas fa-brain',
          to: '/'
        },
        {
          title: 'wouldLikes',
          icon: 'fa fa-scroll',
          to: 'wouldlikes'
        }
      ],
      authMenu: [
        {
          title: 'Add listing',
          icon: 'far fa-plus-square',
          to: 'addListing'
        },
        {
          title: 'My listings',
          icon: 'fas fa-clipboard-list',
          to: 'myListings'
        }]
    }
  },
  computed: mapState({
    regForm: state => state.logReg.regBool,
    logInForm: state => state.logReg.logInBool,
    authUser: state => state.auth.user
  }),
  methods:{
    logIn_switch(){
      this.$store.commit('logReg/logIn');
    },
    reg_switch(){
      this.$store.commit('logReg/reg');
    },
    signOut()
    {
      this.$fireAuth.signOut()
        .catch(error => alert(error));
    }
  }
}
</script>

<style lang="scss" scoped>
  .header__inner{
    z-index: 1000;
  }
  .slideInDown-enter-active{
    animation: slideInDown 0.5s;
  }
  .slideInDown-leave-active{
    animation: slideInDown .5s reverse;
  }
  .slideInLeft-enter-active{
    animation: slideInLeft 0.5s;
  }
  .slideInLeft-leave-active{
    animation: slideInLeft .5s reverse;
  }
</style>
