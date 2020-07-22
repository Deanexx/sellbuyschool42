import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const state = () => ({
  posts: null
})

export const mutations = {
  ...vuexfireMutations,

}

export const actions = {
  bindPosts: firestoreAction( async function (context) {
    await context.bindFirestoreRef('posts', this.$fireStore.collection('posts'), { wait: true });
  }),
  unbindPosts: firestoreAction(function ({ unbindFirestoreRef }) {
    unbindFirestoreRef('posts', false);
  }),
  onAuthStateChanged(context,  { authUser, claims }){
    if (!authUser) {
      context.dispatch('auth/logOutUser');
    } else {
      context.dispatch('auth/registerUser', authUser);
    }
  }
}

export const getters = {
  readyPosts(state){
    return state.posts;
  }
}

export const strict = false
