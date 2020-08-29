const mutations={
 
 
  updateUser(state) {
    state.uid = sessionStorage.getItem("uid");
    state.username = sessionStorage.getItem("username");
  },
  address(state,data){ 
    state.addr=data;
    sessionStorage.setItem("addr",JSON.stringify(state.addr));
  }
}
export default mutations