<template>
  <no-ssr>
    <v-app>
<!--      Navigation drawer-->
      <v-navigation-drawer  :clipped="clipped"
                           v-model="drawer"
                           disable-resize-watcher
                           app
                           dark
                           class="primary"
                           style="
                           z-index: 999;
                           visibility: visible;
                           display: block;
                            overflow: visible;">
        <!-- Main list -->
        <v-list :class="{'mt-15' : $vuetify.breakpoint.mdAndDown}">
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
<!--      App-bar, header-->
    <v-app-bar fixed app clipped-left style="z-index: 999">
    <v-expand-x-transition>
        <v-list
                :flat='false'
                :v-ripple="false"
                class='rounded-b-lg'
                v-show='listDrop'
                style="position: absolute;
                  top: 100%;
                  border-left: 2px solid #ff7fac;
                  border-right: 2px solid #ff7fac;
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
<!--      Button for drawer-->
<transition name='btn' mode='in-out'>
        <v-btn
        class="btn"
        v-if="$vuetify.breakpoint.mdAndDown"
        v-show="!drawer"
        icon
        x-large
        v-ripple="false"
        :color="!drawer ? 'primary' : 'warning'"
        @click='drawer = !drawer'>
        <v-icon>{{ drawer ? 'far fa-compass' : 'fas fa-compass'}}</v-icon>
      </v-btn>
</transition>
<!--     End Button for drawer-->
      <v-img src='/logos/school42.png'
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
                 v-bind="size"
                 class="text-lowercase"
                @click="logIn_switch">ft_log</v-btn>
          <v-btn class="ml-1 text-lowercase"
                color="some"
                 v-bind="size"
                @click="reg_switch">ft_reg</v-btn>
        </div>
        <div class="header__inner__buttons"
            v-else
            :key="2">
        <v-btn

            class="text-lowercase"
            color="secondary"
            v-bind="size"
            @click="signOut">ft_out</v-btn>
        </div>
      </transition>
    </v-app-bar>
    <!-- Drawer -->
    <v-main>
      <v-container>
          <nuxt />
      </v-container>
    </v-main>
    <transition name="slideInDownInner" mode="out-in">
      <the-register style='z-index: 999'
                    v-if="regForm && authUser == null"/>
      <the-log-in style='z-index: 999'
                  v-if="logInForm && authUser == null"/>
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
        drawer: this.$vuetify.breakpoint.mdAndUp,
        clipped: true
    }
  },
  computed: mapState({
    regForm: state => state.logReg.regBool,
    logInForm: state => state.logReg.logInBool,
    authUser: state => state.auth.user,
    selectList: state => state.currency.currencies,
    size () {
      const size = {xs:'x-small',sm:'small',lg:'small',xl:'small'}[this.$vuetify.breakpoint.name];
      return size ? { [size]: true } : {}
    }
  }),
  methods:{
    logIn_switch(){
      this.$store.commit('logReg/logIn');
    },
    reg_switch(){
      this.$store.commit('logReg/reg');
    },
    closeRegLog(){
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

  .btn{
    position: absolute;
    top: 111%;
    left: 5%;
    animation: pulse 3s linear reverse infinite;
    animation-delay: 3s;
  }

  .btn::before{
    position: absolute;
    opacity: 0;
    display: none;
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

  .list__active__style{
     color: #ff7fac;
  }

  .list_style:hover{
          color: red !important;
  }
  .btn-leave-active{
    animation:rotate-out-2-cw .3s cubic-bezier(.25,.46,.45,.94) both
    }
  .btn-enter-active{
    animation:rotate-out-2-cw .3s cubic-bezier(.25,.46,.45,.94) both reverse;
  }

  .slideInDownInner-enter-active{
    animation: slideInDownInner 0.5s;
  }
  .slideInDownInner-leave-active{
    animation: slideInDownInner .5s reverse;
  }
  .slideInLeft-enter-active{
    animation: slideInLeft 0.5s;
  }
  .slideInLeft-leave-active{
    animation: slideInLeft .5s reverse;
  }
  @keyframes slideInDownInner {
    from {
      transform: translate3d(-50%, -100%, 0);
      visibility: visible;
      opacity: 0;
    }

    to {
      transform: translate3d(-50%, 0, 0);
      opacity: 1;
    }
  }

  @keyframes pulse {
    from {
      transform: scale3d(1, 1, 1);
    }

    50% {
      transform: scale3d(1.15, 1.15, 1.15);
    }

    to {
      transform: scale3d(1, 1, 1);
    }
  }

@keyframes rotate-out-2-cw{
  0%{
    transform:rotate(0);
    opacity:1}
  100%{
    transform:rotate(45deg);
    opacity:0
    }}
</style>
