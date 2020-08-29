<template>
  <!-- 主页 -->
  <div class="bg">
    <router-link to="/Search">
      <van-search v-model="value" shape="round" background="#fb5f08" placeholder="请输入搜索菜名关键词...." />
    </router-link>
    <div id="top"  >
         <router-link to=""><van-icon color="rgba(255,255,255,0.9)"  name="arrow-up" size="0.9rem" @click="backTop"/></router-link>
    </div>
    <div class="mian_buttom"  >
    <div class="banner">
      <div class="banner_text">
        <p>独乐乐</p>
        <p>不如众乐乐</p>
        <p class="dryFood">快晒上你的美食吧！</p>
      </div>
    </div>
    <div class="recommend">
      <h6>
        <img src="../assets/images/index/food.png" />
        <span>晒美食</span>
      </h6>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(personal,i) of personall" :key="i">
          <img v-lazy="personal.image" />
          <div class="dryFood_title">
            <span>菜名：{{personal.mtitle}}</span>
            <span>
              <van-icon name="good-job" color="#fb5f08" />
              &nbsp;{{personal.popular}} &nbsp;
              <van-icon name="fire" color="#fb5f08" />
              &nbsp;{{personal.page_view}}
            </span>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
   
    <div class="nav">
      <van-tabs v-model="active">
        <van-tab title="家常菜谱">
          <!-- <van-loading v-if="details==''" type="spinner" color="#1989fa" /> -->
          <div  class="detalis">
            <ul>
              <li v-for="(detail,index) of details" :key="index">
                <router-link :to="`/Step/${detail.did}`">
                  <van-image lazy-load :src="detail.images" />
                  <p>{{detail.dish}}</p>
                </router-link>
              </li>
            </ul>
          </div>
         
        </van-tab>
        <van-tab title="小吃">
          <div class="detalis">
            <ul>
              <li v-for="(detail,index) of  details" :key="index">
                <router-link :to="`/Step/${detail.did}`">
                  <van-image lazy-load :src="detail.images" />
                  <p>{{detail.dish}}</p>
                </router-link>
              </li>
            </ul>
          </div>
        </van-tab>
        <van-tab title="甜点">
          <div class="detalis">
            <ul>
              <li v-for="(detail,index) of details" :key="index">
                <router-link :to="`/Step/${detail.did}`">
                  <van-image lazy-load :src="detail.images" />
                  <p>{{detail.dish}}</p>
                </router-link>
              </li>
            </ul>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Footer from "./Footer.vue";
import { Lazyload } from "vant";
Vue.use(Lazyload);
export default {
  components: {
    Footer
  },
  data() {
    return {
      value:'',
      active: "",
      personall: [],
      details: [],
    };
  },
  watch: {
    active() {
      this.axios
        .get("/index", { params: { active: this.active } })
        .then(res => {
          this.details = res.data;
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  
  mounted() {
      window.addEventListener("scroll", this.scrollTop);

    this.axios
      .get("/personall")
      .then(res => {
        this.personall = res.data;
      })
      .catch(err => {
        console.error(err);
      });
  },
methods: {
      scrollTop() {
      let top=document.getElementById("top");
      let scrollTop =window.pageYOffset ||document.documentElement.scrollTop ||document.body.scrollTop;
      if (scrollTop>500) {
          top.style.display="block";
      } else {
          top.style.display="none"; 
      }
    },
     backTop() {
        window.scrollTo(0, 0);
    },
  },
   destroyed () {
    window.removeEventListener("scroll", this.scrollTop);
   },
};
</script>
<style>
#top{
  position: fixed;
  right: 0.1rem;
  top:84%;
  z-index: 1;
  width: 0.9rem;
  height: 0.9rem;
  background-color: #fb5f08;
  border-radius: 50%;
  animation:top 1.4s linear infinite;
}
#top .van-icon{
  position: fixed;
}
@keyframes top {
  25% {transform: translateY(20px);}
  50%, 100% {transform: translateY(0);}
  75% {transform: translateY(-10px);}
 }
/* .van-tabbar-item修改底部图标 */
.footer .van-tabbar-item{
  color: rgb(255, 255, 255);
}
.footer .van-tabbar-item__text{
  font-size: 13px;
  color: rgb(255, 255, 255);
}
/* .van-tabbar底部导航 */
.footer .van-tabbar{
   color: white;
   background-color:#fb5f08;
}
/* 头部搜索 */
.bg .van-search {
  color: rgb(247, 182, 4);
}
.detalis ul {
  display: flex;
  flex-wrap: wrap;
 
}
.detalis ul li {
  text-align: center;
  padding:0.1rem ;
  margin: 0.1rem 0px 12px 12px;
  background-color: #fff;
}
.detalis ul li  img {
  width: 160px;
}
/* 内容页标题 */
.detalis ul li p {
  width: 160px;
  margin: 0;
  padding:0.3rem 0 0.3rem 0 ;
  background-color: #fff;
}
.banner {
  background-image: url(../assets/images/index/headerbg.jpg);
  height: 200px;
  margin: 0px auto 0px auto;
}
.banner_text {
  padding-top: 40px;
  text-align: center;
  width: 180px;
  margin: 0 auto;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
}
.dryFood {
  padding-top: 5px;
  border-top: 1px solid rgb(155, 4, 4);
  color: rgb(155, 4, 4);
}
.banner_text p:first-child,
:nth-child(2) {
  color: rgb(43, 0, 0);
}
.banner_text p {
  font-size: 18px;
  margin: 7px;
}
.banner img {
  height: 200px;
  width: 100%;
}
/* 晒美食滚动 */
.recommend {
   background-color:#ffe2ce;
  margin: 0;
  margin-top: 3px;
}
/* 晒美食标题 */
.recommend h6 {
  margin: 0;
  padding-left: 10px;
  line-height: 40px;
  height: 40px;
}
.recommend h6 > img {
  height: 25px;
}
/* 晒美食 */
.recommend h6 > img,
h6 > span {
  font-size: 14px;
  font-weight: bold;
  vertical-align: middle;
  padding-left: 4px;
}
.recommend .van-swipe-item img {
  height: 220px;
  width: 100%;
}
/* 内容区域 */
.nav {
  background-color: #ffe2ce;
  font-size: 13px;
}
.nav .banner_text p:first-child, :nth-child(2){
  color:#646566;
}
.nav span {
  padding-top: 4px;
}
.nav .van-tab--active{
  color: #fb5f08;
}
.nav .van-tab__text--ellipsis{
  font-weight: bold;
  font-size: 14px
}
/* 晒美食菜名栏 */
.dryFood_title {
  height: 1rem;
  line-height:1rem;
  background-color: #ffe2ce;
  font-size:13px;
  display: flex;
  justify-content: space-between;
}
.dryFood_title .span {
  margin: 0;
  padding: 0;
}
.mian_buttom{
  margin-bottom: 1.3rem;
}
</style>