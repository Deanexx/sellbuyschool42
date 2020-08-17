<template style='position: relative'>
        <v-card width='300'
                xs-pt-4
                :loading="loading"
                style="position: fixed;
                  top: 10%;
                  left: 50%;
                  transform: translate(-50%);
                  z-index:999">
          <v-card-title>
            Log in
          </v-card-title>
          <v-card-text>
            <v-text-field outlined
                          dense
                          label="Intra"
                          v-model="logIn"/>
            <v-text-field outlined
                          dense
                          label="Password"
                          type="password"
                          v-model="password"/>
          </v-card-text>
           <h1 v-if="error === true" class="display--4">
             {{  }}
           </h1>
          <v-card-actions class="pt-0 mt-0">
            <v-btn
              class="pt-0 mt-n6"
              @click="google_signIn"
              icon>
              <v-icon color="primary">fab fa-google</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-actions class="mt-n3">
            <v-btn color="success"
                    class="mx-auto"
                    @click="signIn">Log me in</v-btn>
          </v-card-actions>
          <v-alert :value="error"
                   color="error"
                   dark
                   dismissible
                   border="bottom"
                   transition="scale-transition"
                   style="position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    text-align: center">
            {{ errorMassage }}
          </v-alert>
        </v-card>
</template>

<script>
  export default {
    data() {
      return {
        logIn: '',
        password: '',
        errorMassage: '',
        error: false,
        loading: false
      }
    },
    methods: {
      google_signIn(){
        this.loading = true;

        let provider = new this.$fireAuthObj.GoogleAuthProvider();

        this.$fireAuth.signInWithPopup(provider).then(function(result){
          this.$store.commit('logReg/logIn');
        })
        .catch(() => alert(error.message))
      },
      signIn() {
        let email = '';
        this.loading = true;

        this.$fireStore.collection("users")
          .where("intra", "==", this.logIn)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => email = doc.data().email);
            return email;
          })
          .then(innerEmail => {
            return this.$fireAuth.signInWithEmailAndPassword(innerEmail, this.password);
          })
          .then( snapshot => this.$store.commit('logReg/logIn')) // closing sign in tab)
          .catch(error => {
              this.errorMassage = error.message;
              this.error = true;
          });
      }
    },
    watch: {
      error: function(){
        if (this.error === true)
          setTimeout(() => this.error = false, 5000)
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
