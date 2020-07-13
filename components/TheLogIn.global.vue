<template>
  <div class="form__inner">
      <div class="overlay" @click="$store.commit('logReg/logIn')"></div>
      <v-container
        fill-height
        fluid>
        <v-row
          align="center"
          justify="center">
          <v-col cols="3">
            <v-card>
              <v-card-title>
                Log in
              </v-card-title>
              <v-card-text>
                <v-text-field placeholder="Email"
                              v-model="logIn"/>
                <v-text-field placeholder="Password"
                              v-model="password"/>
              </v-card-text>
              <v-card-actions>
                <v-btn color="success"
                       class="mx-auto"
                       @click="signIn">Log me in</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        logIn: '',
        password: ''
      }
    },
    computed: {

    },
    methods:  {
      signIn(){
        this.$fireAuth.signInWithEmailAndPassword(this.logIn, this.password)
        .catch(error => alert(error.message));
        this.$store.commit('logReg/logIn'); // closing sign in tab
      }
    }
  }
</script>

<style lang="scss">
  .form__inner{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10
  }
  .overlay{
    @extend .form__inner;
    z-index: 0;
  }
</style>
