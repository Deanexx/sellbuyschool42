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
                  v-model='formValues.title'
                  dense
                  outlined
                  background-color='vuetify_blue'
                  counter='30'
                  required>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols='2' class=''>
                <p>Price</p>
              </v-col>
              <v-col cols='2'>
                <v-text-field
                  v-model='formValues.price'
                  dense
                  outlined
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
                  v-model='formValues.desc'
                  background-color='vuetify_blue'
                  clearable
                  outlined
                  height='200'
                  counter='350'
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
            <v-btn class='mx-auto' color='success'>Publish!</v-btn>
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
        formValues:{
          title: '',
          price: '',
          desc: '',
          file: '',
          category: ''
        }
      }
    }
  }
</script>
<style>
  
</style>
