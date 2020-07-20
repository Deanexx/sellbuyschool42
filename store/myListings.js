import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const state = () => ({
  listNotification: false,
})

export const mutations = {
  listAddNotification(state){
    state.listNotification = true;
    setTimeout(() => {
      state.listNotification = false
    },1500)
  }
}

export const actions = {

}
