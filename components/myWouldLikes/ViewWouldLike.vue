<template style="position: relative">
  <v-card style="position: fixed;
                        top: 15%;
                        left: 50%;
                        transform: translateX(-50%);
                        z-index: 1"
    width="300px"
    color="primary">
  <v-btn absolute
         top
         right
         :disabled="updateSent"
         :ripple="false"
         small
         class="rounded-sm"
         fab
         tile
         @click="$emit('close_post')"
  >
    <v-icon color="error">far fa-window-close</v-icon>
  </v-btn>
    <v-card-title>
      I would like...
    </v-card-title>
    <v-card-text class="pb-1">
      <v-textarea
        v-model="inp.value"
        background-color='vuetify_blue'
        clearable
        outlined
        :success="inp.valid"
        height='200'
        counter='350'
        maxlength='350'
        @input="check_field($event)"
        required>
      >
      </v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success"
             class='mx-auto'
             :loading="updateSent"
             :disabled="!inp.valid"
             @click="updateWouldLike"
        >
        Update
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    export default {
        name: "ViewWouldLike",
        props: ['wouldLike'],
        data(){
          return {
            updateSent: false,
            inp: {
              value: this.wouldLike.title,
              valid: true,
              validation: /^[\w\s\d!@$%&*()_+.,':"-=]{20,350}$/
            }
          }
        },
      methods:{
        check_field(e){
          this.inp.validation.test(e) ? this.inp.valid = true : this.inp.valid = false;
        },
        updateWouldLike(){
          this.updateSent = true;
          this.$fireStore.collection('wouldLikes')
            .doc(this.wouldLike.id)
            .update({ title: this.inp.value })
            .then(res => this.$emit('close_post'))
        }
      }
    }

</script>

<style scoped>
</style>
