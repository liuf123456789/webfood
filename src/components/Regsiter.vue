<template>
  <!-- 注册 -->
  <div class="reg">
    <router-link to="/My">
      <van-nav-bar title="欢迎您注册" left-text="返回" left-arrow></van-nav-bar>
    </router-link>
    <div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          type="text"
          placeholder="请输入用户名...."
          @blur="userName"
          :error-message="message"
          :right-icon="correct"
        />
        <van-field
          v-model="pwd"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码..."
          @blur="bPwd"
          :error-message="bPwd_message"
          :right-icon="bPwd_correct"
        />
        <van-field
          v-model="passwords"
          type="password"
          name="passwords"
          label="确认密码"
          placeholder="请确认密码...."
          @blur="bPassword"
          :error-message="bPassword_message"
          :right-icon="bPassword_correct"
        />
        <van-field v-model="uname" name="uname" label="姓名" type="text" placeholder="请输入姓名...." />
        <van-field
          v-model="ph"
          name="ph"
          label="手机号码"
          type="tel"
          placeholder="请输入手机号码...."
          :rules="[{ validator:(val)=>{
           return /^1[3-9][0-9]{9}$/.test(val);
          },
           message: '请输入正确的手机号' }]"
        />
        <van-field
          v-model="email"
          name="email"
          label="邮箱"
          type="text"
          placeholder="请输入邮箱...."
          :rules="[{ validator:(val)=>{
           return /\w+@\w+\.\w+(\.cn)?/.test(val);
          },
           message: '请输入正确的邮箱' }]"
        />
        <van-field v-model="adrr" name="adrr" label="地址" type="text" placeholder="请输入地址...." />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" color="#fb5f08">注册</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      pwd: "",
      username: "",
      passwords: "",
      uname: "",
      ph: "",
      email: "",
      adrr: "",
      message: "",
      correct: "",
      bPwd_message: "",
      bPwd_correct: "",
      bPassword_message: "",
      bPassword_correct: ""
    };
  },
      
  methods: {
    userName() {
        this.axios
        .post(
          "/reg",
          "username=" +this.username 
        )
        .then(res => {
          if (res.data.code == 1) {
            this.message = "该用户已经存在,请从新输入";
            this.correct = "";
          }
        });
      let reg = /^(\w{3,10})$/;
      if (this.username == "") {
        this.message = "用户名不能为空";
        this.correct = "";
      }
      if (!reg.test(this.username)) {
        this.message = "用名输入错误，请输入数字或者字母";
        this.correct = "";
      } else {
        this.correct = "success";
        this.message = "";
      }
    },
    bPwd() {
      let reg = /^(\w{6,10})$/;
      if (this.pwd == "") {
        this.bPwd_message = "密码不能为空";
        this.bPwd_correct = "";
      }
      if (!reg.test(this.pwd)) {
        this.bPwd_message = "密码输入错误，请输入数字或者字母";
        this.bPwd_correct = "";
      } else {
        this.bPwd_message = "";
        this.bPwd_correct = "success";
      }
    },
    bPassword() {
      if (this.passwords=='') {
        this.bPassword_message = "确认密码不能为空";
        this.bPassword_correct = "";
      }
      if (this.passwords == this.pwd) {
        this.bPassword_message = "";
        this.bPassword_correct = "success";
      } else {
        this.bPassword_message = "密码不一致，请再次输入";
        this.bPassword_correct = "";
      }
    },
    onSubmit() {
      sessionStorage.clear();
      if(this.correct ==="success"&&this.bPwd_correct ==="success"&&this.bPassword_correct ==="success"){
           this.axios
        .post(
          "/regsiter",
          "username=" +this.username +"&pwd=" +this.pwd +"&uname=" +this.uname +"&ph=" +this.ph +"&email=" +this.email +"&adrr=" +this.adrr
        )
        .then(res => {
          if (res.data.code == 1) {
            Toast.success("注册成功,请输入用户名重新登录");
            this.$router.push("/Login");
          }
          if (res.data.code == 0) {
            Toast.success("注册失败");
          }
        });
      }
    }
  }
};
</script>
<style>
.reg .van-icon-arrow-left::before{
  color: rgb(10, 10, 10) ;
}
.reg  .van-nav-bar__text{
  color: rgb(10, 10, 10);
}
</style>

