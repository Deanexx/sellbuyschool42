<template style='position: relative'>
        <v-card width='300' style="position: fixed;
          top: 50%;
          left: 50%;
          z-index:999">
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
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
