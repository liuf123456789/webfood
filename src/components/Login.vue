<template>
<!-- 登录 -->
  <div  class="login">
    <router-link to="/My"><van-nav-bar title="欢迎您登录" left-text="返回" left-arrow></van-nav-bar></router-link>
    <div>
      <van-form  @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
           :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
           :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" color="#fb5f08">登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { constants } from "zlib";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    // ...mapMutations(["updateUser"]),
    onSubmit() {
      this.axios
        .post(
          "/login",
          "username=" + this.username + "&password=" + this.password
        )
        .then(res => {
          let data = res.data.results;
          data.forEach(item => {
            let username = item.username;
            let uid = item.uid;
            if (res.data.code == 1) {
              sessionStorage.setItem("username", username);
              sessionStorage.setItem("uid", uid);
              this.$store.commit("updateUser");
              Toast.success("登录成功");
              this.$router.push("/My");
            }
            if (res.data.code == 0) {
              Toast.fail("登录失败，请重新输入");
            }
          });
        });
    }
  },
  mounted() {}
};
</script>
<style>
.login .van-icon-arrow-left::before {
  color: rgb(10, 10, 10);
}
.login .van-nav-bar__text {
  color: rgb(10, 10, 10);
}
</style>
