<template>
  <v-row class="d-flex justify-center align-center">
    <v-col xs="12" sm="8" md="5">
      <v-card>
        <v-card-title>I would like...</v-card-title>
        <v-card-text>
          <v-textarea
            v-model="inp.value"
            @input="check_inp($event)"
            height='200'
            counter='350'
            maxlength='350'
            clearable
            hint="Text length is from 20 to 350 symbols"
            outlined
            :success="inp.valid"
          >
          </v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn :disabled="!inp.valid"
                 @click="publish"
                 :loading="loading"
                 class="mx-auto"
                 color="success">
            Publish!</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

</template>

<script>
    export default {
        name: "index.vue",
        data(){
          return {
            inp: {
              value: '',
              valid: false,
              validation: /^[\w\s\d!@$%&*()_+.,':"-=]{20,350}$/
            },
            loading: false
          }
        },
        methods: {
          check_inp(e){
            this.inp.validation.test(e) ? this.inp.valid = true : this.inp.valid = false;
          },
          publish(){
            this.loading = true;

            this.$fireStore.collection('wouldLikes').add({
              title: this.inp.value,
              date: new Date().toDateString(),
              user: this.$store.state.auth.userToken,
              intra: this.$store.state.auth.userIntra
            }).then(res => {
                return this.$fireStore.collection('wouldLikes')
                  .doc(res.id)
                  .update({ id: res.id })
            }).then(() => this.$router.push('myWouldLikes'))
          }
        }
    }
</script>

<style scoped>

</style>
