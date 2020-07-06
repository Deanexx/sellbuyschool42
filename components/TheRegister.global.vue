<template>
    <v-card>
      <v-card-title>
        <p>Register</p>
      </v-card-title>
      <v-card-text class="pb-0">
        <v-form>
          <v-row class="d-flex flex-column justify-center">
            <v-col cols="12"
                   v-for="(field, i) in registerField"
                   :key="i"
                   class="py-0"
            >
              <v-text-field
                v-model="field.value"
                :label="field.label"
                color="#ff7fac"
                outlined
                dense
              />
            </v-col>
          </v-row>
          <v-card-actions class="pt-0">
            <v-btn color="success" class="mx-auto" @click="register">
              Sign-Up!
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
</template>
<script>
  export default {
    data(){
      return{
          registerField: {
            intra: {
              value: '',
              label: 'Intra',
              },
            email: {
              value: '',
              label: 'E-mail',
            },
            password: {
              value: '',
              label: 'Password',
            },
            passwordRepeat: {
              value: '',
              label: 'Repeat password'
            }
          }
        }
      },
    methods:{
      register(){
        this.$fireAuth.createUserWithEmailAndPassword(this.registerField.email.value, this.registerField.password.value);
      }
    }
    }
</script>
<style lang="scss" scoped>
  .authCard-enter-active{
    animation: slideInDown 2s;
  }
  .authCard-leave-active{
    animation: slideInDown 2s reverse;
  }
  @keyframes slideInDown {
    from {
      transform: translate3d(0, -100%, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }
</style>
