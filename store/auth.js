export const state = () => ({
  user: null,
  userToken: null,
  userIntra: null,
  googleUser: false
})

export const mutations = {
  check_provider_user(state, provider){
    if (provider === 'google.com')
      state.googleUser = true;
  },
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
  }
}

export const actions = {
  registerUser(context, user){
    context.commit('setUserState', user);
    context.commit('setUserToken', user.uid);
  },
  logOutUser(context){
    context.commit('deleteUserState');
    context.commit('deleteUserToken');
    context.commit('deleteUserIntra');
  }
}
