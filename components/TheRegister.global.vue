<template>
  <div class="form__inner">
    <div class="overlay" @click="$store.commit('logReg/reg')"></div>
    <v-container
      fluid
      fill-height
      class='d-flex justify-center align-center'>
          <v-card width='300'>
            <v-card-title>
              <p>Register</p>
            </v-card-title>
            <v-card-text class="pb-0">
              <v-form>
                    <v-text-field
                      :type="i === 'password' || i === 'passwordRepeat' ? 'password' : 'text'"
                      v-for="(field, i) in registerField"
                      :hint="field.hintMassage"
                      v-model="field.value"
                      :label="field.label"
                      color="#ff7fac"
                      outlined
                      :key="i"
                      dense
                      @input="field_check(i, $event)"
                      >
                        <v-icon v-show="!field.valid"
                                slot="append" color="red"
                        >fas fa-skull</v-icon>
                        <v-icon v-show="field.valid"
                                slot="append"
                                color="green"
                        >far fa-hand-peace</v-icon>
                    </v-text-field>
                <v-card-actions class="pt-0">
                  <v-btn color="success"
                         class="mx-auto"
                         @click="register"
                         :disabled="isFormValid">
                    Sign-Up!
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
    </v-container>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    data(){
      return{
          registerField: {
            intra: {
              value: '',
              label: 'Intra',
              pattern: /^[a-z]{3,}$/,
              valid: false,
              hintMassage: 'Your intra, only lowercase'
              },
            email: {
              value: '',
              label: 'E-mail',
              pattern: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i,
              valid: false,
              hintMassage: 'Enter your correct email'
            },
            password: {
              value: '',
              label: 'Password',
              pattern: /^[a-zA-Z0-9-!@()_+=]{6,}$/,
              valid: false,
              hintMassage: 'Min. 6 symbols, allowed -!@()_+='
            },
            passwordRepeat: {
              value: '',
              label: 'Repeat password',
              valid: false,
              hintMassage: 'Should match with password'
            }
          }
        }
      },
    computed: mapState({
      authUser: state => state.auth.user,
      isFormValid(){
        for(let key in this.registerField){
          if(this.registerField[key].valid === false)
            return true;
        }
        return false;
      }
    }),
    methods: {
          register() {
            /* Register globally */
              this.$fireAuth.createUserWithEmailAndPassword(
                this.registerField.email.value,
                this.registerField.password.value)
              .then(data => {
                /* Saving in cloud store */
                return this.$fireStore.collection('users').doc(data.user.uid + '').set({
                  intra: this.registerField.intra.value,
                  email: this.registerField.email.value,
                  uid: data.user.uid})
              })
            .catch(error => alert(error))
            /* closing reg tab */
              this.$store.commit('logReg/reg');
          },
        field_check(i, e){
            let field = this.registerField[i];

            if(i === 'passwordRepeat')
            {
              field.value === this.registerField.password.value ? field.valid = true : field.valid = false;
              return
            }
            field.pattern.test(field.value) ? field.valid = true : field.valid = false;
        }
      }
    }
</script>
<style lang="scss" scoped>
  .slideInLeft-enter-active{
    animation: slideInLeft 0.5s;
  }
  .slideInLeft-leave-active{
    animation: slideInLeft .5s reverse;
  }
</style>

