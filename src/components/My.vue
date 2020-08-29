<template>
  <!-- 个人主页 -->
  <div class="home">
    <van-nav-bar title="个人中心" left-arrow />
    <div class="my">
      <div class="photo">
        <van-image round width="2.5rem" height="2.5rem" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=110172327,4003804615&fm=26&gp=0.jpg" />
      </div>
      <div class="my_uname">
        <ul>
          <li>
            <router-link to="/Login" v-show="!uid&&this.$route.path!='/Login'">登录</router-link>
          </li>
          <li class="uname"  v-show="username!=''">{{username}}</li>
          <!-- <li v-show="username==''"></li> -->  
          <li v-show="!uid">
            <router-link to="/Regsiter">注册账号</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="my_classify">
      <van-grid clickable :column-num="3">
        <van-grid-item icon="balance-list" text="我的订单" @click="Myorder"  />
        <van-grid-item icon="cart" text="购物车" @click="carts" />
         <van-grid-item icon="location" text="我的地址" @click="xinaddress" />
      </van-grid>
    </div>
    <div class="my_history">
      <van-grid direction="horizontal" :column-num="2">
        <van-grid-item icon="clock" color="#fb5f08" text="历史记录" />
      </van-grid>
      <van-grid direction="horizontal" :column-num="2">
        <van-grid-item icon="star" text="我的收藏" />
      </van-grid>
      <van-grid direction="horizontal" :column-num="2">
        <van-grid-item icon="question" text="关于我们" />
      </van-grid>
      <van-grid v-show="username!=''" direction="horizontal" @click="cancel" :column-num="2">
        <van-grid-item @click="cancel" icon="clear" text="注销账号" />
      </van-grid>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { mapState,mapMutations} from "vuex";
import Footer from "./Footer.vue";
export default {
  components: {
    Footer
  },
   computed: {
    ...mapState(["uid", "username"]),
  },
  methods: {
    Myorder(){
       if (sessionStorage.getItem("username")) {
         this.$router.push("/Myorder");
       }else{
          this.$router.push("/Login");
          Toast("您还未登录，请先登录");
       }
    },
    carts(){
       if (sessionStorage.getItem("username")) {
         this.$router.push("/Cart");
       }else{
          this.$router.push("/Login");
          Toast("您还未登录，请先登录");
       }
    },
    xinaddress(){
      if (sessionStorage.getItem("username")) {
         this.$router.push("/xinaddress");
       }else{
          this.$router.push("/Login");
          Toast("您还未登录，请先登录");
       }
    },
    cancel() {
      sessionStorage.clear();
      this.$store.commit("updateUser");
    }
  },
 
};
</script>
<style>
.van-toast__text{
  color: #fff;
}
.home .van-icon-clock::before,
.van-icon-cart::before
,.van-icon-balance-list::before,
.van-icon-star::before,
.van-icon-question::before,
.van-icon-clear::before,
.van-icon-location::before
{
  color: #fb5f08;
}
.my_history .van-grid{
  border-bottom: 1px solid rgba(61, 61, 61, 0.4);
}
.home .van-nav-bar {
  color: white !important;
  background-color: transparent;
}
.home .van-nav-bar__title {
  color: white;
}
.home .van-icon-arrow-left::before {
  color: white;
}
.home [class*="van-hairline"]::after {
  border: 0;
}
.cancel {
  text-align: right;
  margin-right: 5px;
}
.photo {
  padding-top: 1.5rem;
  text-align: center;
  width: 100%;
}
.my_history {
  margin-top: 5rem;
  width: 90%;
  margin-bottom: 50px;
  margin-left: 0.5rem;
  left: 0.5rem;
  height: 7rem;
  box-shadow: 1px 1px 5px rgba(61, 61, 61, 0.5);
  background-color: rgb(255, 255, 255);
}
.my {
  position: absolute;
  top: 0;
  width: 100%;
  height: 250px;
  background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597834778573&di=aa2ce9a1b5e839aac8e53e110b887e5f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F05%2F43%2F63%2F835a72c09e4e2c1.jpg);
}

.my_classify {
  position: relative;
  top: 4.7rem;
  width: 90%;
  left: 0.5rem;
  height: 2.4rem;
  box-shadow: 1px 1px 5px rgba(61, 61, 61, 0.5);
  background-color: rgb(255, 255, 255);
}
.my_uname {
  margin: 0;
  padding: 0;
}
.my_uname ul {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.my_uname ul li {
  /* font-size: 0.4rem; */
  color: white;
}
.my_uname ul li a {
  font-size: 0.4rem;
  color: white;
}
.my_all {
  margin: 5px;
  display: flex;
  justify-content: space-between;
}
.uname{
  font-size:0.6rem;
}
.my_classify .van-grid-item__text{
  font-size: 13px;
}
.my_history .van-grid-item__text{
  font-size: 13px;
}
</style>
