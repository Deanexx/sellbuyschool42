<template>
  <v-container>
    <v-row>
      <v-col cols='12'>
        <v-card>
          <v-card-title>Adding listing</v-card-title>
          <v-card-text>
          <!-- Title -->  
            <v-row>
              <v-col cols='2' class=''>
                <p>Title</p>
              </v-col>
              <v-col cols='10'>
                <v-text-field
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
          <!-- Price --> 
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
                  required
                  @input="check_post('price', $event)"
                  >
                </v-text-field>
              </v-col>
            </v-row>
          <!-- Desc --> 
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
                  @input="check_post('desc', $event)"
                  required>
                </v-textarea>
              </v-col>
            </v-row>
          <!-- Category -->
            <v-row>
              <v-col cols='2'>
                <p>Category</p>
              </v-col>
              <v-col cols='3'>
                <v-select
                  v-model='formValues.category.value'
                  outlined
                  background-color='vuetify_blue'
                  dense
                  :items='slectItems'
                >
                </v-select>
              </v-col>
            </v-row>
          <!-- File -->
          <v-row>
            <v-col cols='2'>
              <p>File</p>
            </v-col>
            <v-col cols='2'>
              <input type="file" 
                hidden 
                multiple 
                ref='files' 
                @change='listfiles'
              >
            <v-btn @click='$refs.files.click()'>Add pictures</v-btn>
            </v-col>
              <v-chip
                  v-for='(file, i) in formValues.files.value'
                  :key='file.name'
                  close
                  @click:close='removeChip(i)'>
                  {{ file.name }}
              </v-chip>
          </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn class='mx-auto'
            color='success'
            :disabled='isValid'
            @click='add_post'>
              Publish!
            </v-btn>
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
            validation: /^[\sA-Za-z0-9!@$%&*()_+.,':"-=]{3,128}$/,
            valid: false
          },
          price: {
            value: '',
            validation: /^[\d]{1,4}$/,
            valid: false
          },
          desc: {
            value: '',
            validation: /^[\w\s\d!@$%&*()_+.,':"-=]{3,350}$/,
            valid: false
          },
          files: {
            value: []
          },
          category: {
            value: 'Other'
          }
        }
      }
    },
    computed: {
      isValid()
      {
          for(let key in this.formValues){
            if(this.formValues[key].valid === false)
              return true;
        }
        return false;
      }
    },
    methods: {
      check_post(key, event){
        let field = this.formValues[key];

        field.validation.test(event) ? field.valid = true : field.valid = false;
      },
      add_post(){
        
      },
      listfiles () {
        this.formValues.files.value = [];

        for(let i = 0; i < this.$refs.files.files.length; i++)
        {
          this.formValues.files.value.push(this.$refs.files.files[i]);
        }
      },
      removeChip(key){
        this.formValues.files.value.splice(key, 1);
      }
    }
  }
</script>
<style>
</style>