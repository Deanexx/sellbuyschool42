<template>
  <div class="form__inner">
      <div class="overlay" @click="$store.commit('logReg/logIn')"></div>
      <v-container
        class='d-flex justify-center align-center'
        fill-height
        fluid>
        <v-card width='300'>
          <v-card-title>
            Log in
          </v-card-title>
          <v-card-text>
            <v-text-field placeholder="Email"
                          outlined
                          dense
                          v-model="logIn"/>
            <v-text-field placeholder="Password"
                          outlined
                          dense
                          type="password"
                          v-model="password"/>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success"
                    class="mx-auto"
                    @click="signIn">Log me in</v-btn>
          </v-card-actions>
        </v-card>
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
