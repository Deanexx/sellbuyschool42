<template>
  <v-container>
    <v-row>
      <v-col cols='12'>
        <v-card>
          <v-card-title>Adding listing</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols='2' class=''>
                <p>Title</p>
              </v-col>
              <v-col cols='10'>
                <v-text-field
                  :error="!formValues.title.valid"
                  v-model='formValues.title.value'
                  dense
                  outlined
                  background-color='vuetify_blue'
                  counter='50'
                  maxlength='50'
                  required
                  @input="check_post('title', $event)"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols='2' class=''>
                <p>Price</p>
              </v-col>
              <v-col cols='2'>
                <v-text-field
                  v-model='formValues.price.value'
                  dense
                  outlined
                  maxlength='4'
                  background-color='vuetify_blue'
                  prefix='$'
                  required>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols='2' class=''>
                <p>Describtion</p>
              </v-col>
              <v-col cols='10'>
                <v-textarea
                  v-model='formValues.desc.value'
                  background-color='vuetify_blue'
                  clearable
                  outlined
                  height='200'
                  counter='350'
                  maxlength='350'
                  required>
                </v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols='2'>
                <p>Category</p>
              </v-col>
              <v-col cols='3'>
                <v-select
                  outlined
                  background-color='vuetify_blue'
                  dense
                  :items='slectItems'
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols='2'>
                <p>File</p>
              </v-col>
              <v-col cols='10'>
                <v-file-input
                  outlined
                  dense
                  background-color='vuetify_blue'
                  prepend-icon='far fa-folder-open'
                  chips
                  >
                  </v-file-input>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn class='mx-auto'
                   color='success'
                   :disabled='post_validation'
                   >Publish!</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    middleware: 'authenticated',
    data(){
      return {
        slectItems: ['Cars / Motorcycles', 'Books', 'Electronics', 'Furniture', 'Other'],
        formValues: {
          title: {
            value: '',
            validation: /^[A-Za-z0-9!@$%&*(()_+-=]{3,128}$/,
            valid: false
          },
          price: {
            value: '',
            validation: /^\d{0, 5}$/,
            valid: false
          },
          desc: {
            value: '',
            validation: /^[!@#$%^&*()?]\w\s\d{0, 350}$/,
            valid: false
          },
          file: {
            value: ''
          },
          category: {
            value: ''
          }
        }
      }
    },
    computed: {
      post_validation()
      {

        //console.log(Object.values(this.formValues).forEach(el => el.valid === false ? return true : return false));
        Object.values(this.formValues).forEach(el => { if(el.valid === false) return false });
        return true;
       /* for(let key in this.formValues)
        {
          if(this.formValues[key].valid === false)
            return false;
        }
        return true;*/
      }
    },
    methods: {
      check_post(key, event){
        let field = this.formValues[key];

        field.validation.test(event) ? field.valid = true : field.valid = false;
      },
      add_post(){

      }
    }
  }
</script>
<style>

</style>
