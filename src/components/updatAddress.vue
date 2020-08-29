<template>
  <!-- 注册 -->
  <div class="Addr">
    <van-nav-bar title="修改地址"   left-text="返回"  right-text="删除"  left-arrow   @click-left="onClickLeft"  @click-right="onClickRight"/>
    <div>
      <van-form @submit="onSubmit">
        <van-field v-model="upadataAddr.aUname" name="uname" label="姓名" type="text" placeholder="请输入姓名...." />
        <van-field
          v-model="upadataAddr.aTel"
          name="ph"
          label="手机号码"
          type="tel"
          placeholder="请输入手机号码...."
          :rules="[{ validator:(val)=>{
           return /^1[3-9][0-9]{9}$/.test(val);
          },
           message: '请输入正确的手机号' }]"
        />
        <van-field v-model="upadataAddr.addr" name="adrr" label="地址" type="text" placeholder="请输入地址...." />
        <div style="margin: 16px;">
          
          <van-button round block type="info" native-type="submit" color="#fb5f08">确定</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { mapState,mapMutations} from "vuex";
import { Toast } from 'vant';
import { Dialog } from 'vant';
export default {
  data() {
    return {
      uname: "",
      ph: "",
      adrr: "",
      upadataAddr:[]
    };
  },
   computed: {
    ...mapState(["uid","addr"]),
  },   
  methods: {
    onClickLeft(){
        this.$router.push('/My');
    },
    onClickRight(){
      // this.axios
      //   .delete(
      //     "/delAddr",{params:{addr_uid:this.upadataAddr.addr_uid,aid:this.upadataAddr.aid }})
      //   .then(res => {
      //     if (res.data.code == 1) {
      //       Toast.success("删除当前地址成功");
      //       console.log("sdf"+this.addr);
      //       if(this.upadataAddr.aid=this.addr.aid){
      //              this.$router.push('/My');
      //              sessionStorage.removeItem('address');
      //              this.$store.commit("address");
      //       }
      //     }
      //     if (res.data.code == 0) {
      //       Toast.success("删除当前地址失败");
      //     }
      //      });
      Dialog.confirm({
        title: '是否删除该地址',
      })
      .then(() => {
       this.axios
        .delete(
          "/delAddr",{params:{addr_uid:this.upadataAddr.addr_uid,aid:this.upadataAddr.aid }})
        .then(res => {
          if (res.data.code == 1) {
            Toast.success("删除当前地址成功");
            this.$router.push('/My');
            if(this.upadataAddr.aid=this.addr.aid){
                   this.$router.push('/My');
                   sessionStorage.removeItem('address');
                   this.$store.commit("address");
            }
          }
          if (res.data.code == 0) {
            Toast.success("删除当前地址失败");
          }
           });
      })
     .catch(() => {
     });

    },
    onSubmit() {
        this.axios
        .put(
          "/updataAddr",
         "aUname=" +this.upadataAddr.aUname +"&aTel=" +this.upadataAddr.aTel+"&addr=" +this.upadataAddr.addr+"&addr_uid="+this.upadataAddr.addr_uid+"&aid="+this.upadataAddr.aid
        )
        .then(res => {
          if (res.data.code == 1) {
            Toast.success("修改成功");
            // this.$router.push("/xinaddress");
          }
          if (res.data.code == 0) {
            Toast.success("修改失败");
          }
        });


    }
  },
  mounted(){
     this.upadataAddr=this.$route.query.updatAddr;
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
