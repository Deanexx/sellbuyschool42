export const state = () => ({
  user: null,
  userToken: null,
  userIntra: null
})

export const mutations = {
  setUserState(state, authUser){
    state.user = authUser;
  },
    setUserToken(state, token){
    state.userToken = token;
  },
  setUserIntra(state, intra){
    state.userIntra = intra;
  },
  deleteUserState(state){
    state.user = null;
  },
  deleteUserToken(state){
    state.userToken = null
  },
  deleteUserIntra(state){
    state.userIntra = null;
  },
}

export const actions = {
  async registerUser(context, user){

    context.commit('setUserState', user);
    context.commit('setUserToken', user.uid);
    let doc = await this.$fireStore.collection('users').doc(user.uid).get();
    context.commit('setUserIntra', doc.data().intra);
  },
  logOutUser(context){
    context.commit('deleteUserState');
    context.commit('deleteUserToken');
    context.commit('deleteUserIntra');
  }
}
