<template>
  <!-- 注册 -->
  <div class="Addr">
    <router-link to="/My">
      <van-nav-bar title="地址填写" left-text="返回" left-arrow></van-nav-bar>
    </router-link>
    <div>
      <van-form @submit="onSubmit">
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
        <van-field v-model="adrr" name="adrr" label="地址" type="text" placeholder="请输入地址...." />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" color="#fb5f08">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { mapState,mapMutations} from "vuex";
import { Toast } from 'vant';
export default {
  data() {
    return {
      uname: "",
      ph: "",
      adrr: "",
    };
  },
   computed: {
    ...mapState(["uid"]),
  },   
  methods: {
    onSubmit() {
           this.axios
        .post(
          "/addr",
         "aUname=" +this.uname +"&aTel=" +this.ph +"&addr=" +this.adrr+"&addr_uid="+this.uid
        )
        .then(res => {
          if (res.data.code == 1) {
            Toast.success("提交成功");
            this.$router.push("/My");
          }
          if (res.data.code == 0) {
            Toast.success("提交失败");
          }
        });
    }
  }
};
</script>
<style >
.Addr .van-nav-bar__text{
  color: rgb(0, 0, 0);
}
.Addr .van-icon-arrow-left::before {
  color: rgb(0, 0, 0);
}
</style>
