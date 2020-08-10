<template>
  <no-ssr>
    <v-app>
    <v-app-bar
      :clipped-left='true'
      fixed
      app
    >
    <v-btn @click='drawer = !drawer'>Click</v-btn>
    <v-expand-x-transition>
        <v-list transition="fab-transition"
                :flat='false'
                :v-ripple="false"
                class='rounded-b-lg'
                v-show='listDrop'
                style="position: absolute;
              top: 100%;
              left: 25%;
              transform: translateX(-50%)">
          <v-list-item-group mandatory active-class="list__active__style">
            <v-list-item v-for='(property, name) in selectList'
                         class='list_style'
                         :key = 'name'
                         :ripple="false"
                         @click="set_currency(name)">
              <v-list-item-title>{{ name }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
    </v-expand-x-transition>
      <v-img src='/logos/school42.jpg'
        max-width='40px'
        max-height='40px'
        contain
        style="position: absolute;
                top: 50%;
                cursor: pointer;
                left: 25%;
                transform: translate(-50%, -50%)"
        @click='listDrop = !listDrop'
      />
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
            v-else
            :key="2">
          <v-btn
            color="secondary"
            @click="signOut">ft_logOut</v-btn>
        </div>
      </transition>
    </v-app-bar>
    <!-- Drawer -->
    <v-navigation-drawer
      v-model='drawer'
      app
      style='z-index: 999'
      :clipped='true'
      enable-resize-watcher
    >
    <!-- Main list --> 
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
      <!-- User list --> 
      <transition name="slideInLeft" mode="out-in">
        <v-list class="mt-16" v-if="authUser !== null">
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
      <the-register style='z-index: 999' v-if="regForm && authUser == null"/>
      <the-log-in style='z-index: 999' v-if="logInForm && authUser == null"/>
    </transition>
    <div class="overlay" @click='closeRegLog' v-if='(regForm || logInForm) && authUser == null'></div>
  </v-app>
  </no-ssr>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data(){
    return {
      currencySelect: [{
        text: 'Dollar',
        value: 'USD'
      },
      {
        text: 'Ruble',
        value: 'RUB'
      },
      {
        text: 'Hryvnia',
        value: 'UAH'
      },
      {
        text: 'Won',
        value: 'KRW'
      },
      {
        text: 'Peso',
        value: 'MXN'
      }],
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
        },
        {
          title: 'Add wouldLike',
          icon: 'fas fa-grin-stars',
          to: 'addWouldlike'
        },
        {
          title: 'My wouldLikes',
          icon: 'fas fa-calendar-plus',
          to: 'myWouldLikes'
        }
      ],
        listDrop: false,
        drawer: true
    }
  },
  computed: mapState({
    regForm: state => state.logReg.regBool,
    logInForm: state => state.logReg.logInBool,
    authUser: state => state.auth.user,
    selectList: state => state.currency.currencies
  }),
  methods:{
    logIn_switch(){
      this.$store.commit('logReg/logIn');
    },
    reg_switch(){
      this.$store.commit('logReg/reg');
    },
    closeRegLog(){
      console.log(1);
      this.$store.commit('logReg/closeRegLog');
    },
    signOut()
    {
      this.$fireAuth.signOut()
        .catch(error => alert(error));
      this.$router.push('/');
    },
    set_currency(currency){
      this.$store.commit('currency/set_activeCur', { currency })
      this.listDrop = false;
    }
  }

}
</script>

<style scoped>
  .list__active__style{
     color: #ff7fac;
  }

  .list_style:hover{
          color: red !important;
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
  .overlay{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.9;
    background: #ff7fac;
    z-index: 10;
    cursor: pointer;
  }
</style>
