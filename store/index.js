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
  async onAuthStateChanged(context,  { authUser }){
    if (!authUser) {
      context.dispatch('auth/logOutUser');
    } else {
      context.dispatch('auth/registerUser', authUser);
      if(context.state.auth.userIntra === null){
        let doc = await this.$fireStore.collection('users').doc(authUser.uid).get();
        context.commit('auth/setUserIntra', doc.data().intra);
      }

    }
  }
}

export const strict = false
