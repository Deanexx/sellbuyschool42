import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const state = () => ({
  userPosts: null,
  userWouldLikes: null
})

export const mutations = {
  ...vuexfireMutations,
}

export const actions = {

  bindUserPosts: firestoreAction( async function (context) {
    await context.bindFirestoreRef('userPosts', this.$fireStore.collection('posts').where('user', '==', context.state.auth.userToken), { wait: true });
  }),
  bindUserWouldLikes: firestoreAction( async function (context) {
    await context.bindFirestoreRef('userWouldLikes', this.$fireStore.collection('wouldLikes').where('user', '==', context.state.auth.userToken), { wait: true });
  }),
  onAuthStateChanged(context,  { authUser }){
    if (!authUser) {
      context.dispatch('auth/logOutUser');
    } else {
      context.dispatch('auth/registerUser', authUser);
    }
  }
}

export const strict = false
