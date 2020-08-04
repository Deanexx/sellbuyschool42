export const state = () => ({
  regBool: false,
  logInBool: false
})

export const mutations = {
  closeRegLog(state){
    console.log(1);
    state.logInBool = false;
    state.regBool = false;
  },
  reg(state) {
    state.logInBool = false;
    !state.regBool ? state.regBool = true : state.regBool = false;
  },
  logIn(state) {
    state.regBool = false;
    !state.logInBool ? state.logInBool = true : state.logInBool = false;
  }
}
