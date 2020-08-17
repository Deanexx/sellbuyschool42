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
  async onAuthStateChanged({commit, dispatch, state},  { authUser }){
    if (!authUser) {
      console.log('signOut')
      dispatch('auth/logOutUser');
    } else {
      dispatch('auth/registerUser', authUser);
      commit('auth/check_provider_user', this.$fireAuth.currentUser.providerData[0].providerId)
      if(state.auth.googleUser === true)
        commit('auth/setUserIntra', authUser.email);
      if(state.auth.userIntra === null){
        let doc = await this.$fireStore.collection('users').doc(authUser.uid).get();
        commit('auth/setUserIntra', doc.data().intra);
      }

    }
  }
}

export const strict = false
