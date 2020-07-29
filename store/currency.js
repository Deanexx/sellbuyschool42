export const state = () => ({
    currencies : {
        USD : {
          value: 1,
          sign: 'fas fa-dollar-sign'
        },
        UAH : {
          value: 27.74,
          sign: 'fas fa-hryvnia'},
        RUB : {
          value: 71.58,
          sign: 'fas fa-ruble-sign'},
        MXN : {
          value: 21.94,
          sign: 'fas fa-dollar-sign'},
        EUR : {
          value: 0.85,
          sign: 'fas fa-euro-sign'},
        KRW : {
          value: 1196,
          sign: 'fas fa-won-sign'}
    },
    activeCur : 'USD'
})

export const mutations = {
  set_activeCur(state, payload){
    state.activeCur = payload.currency;
    console.log(state.activeCur)
  }
}

export const actions = {

}

 export const getters = {

 }
