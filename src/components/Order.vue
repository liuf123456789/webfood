<template>
  <!-- 菜单 -->
  <div class="order">
    <van-nav-bar title="菜谱"></van-nav-bar>
   <div class="order_content">
    <div class="order_tilte">
      <h4>家常菜谱</h4>
      <div class="sort">
        <ul>
          <li v-for="(Bistrot,i) of Bistrots" :key="i">
            <router-link :to="`/Cookbook/${Bistrot.tid}`">
              <van-image lazy-load :src="Bistrot.images" />
              <p>{{Bistrot.ttitle}}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="order_tilte">
      <h4>主食小吃</h4>
      <div class="sort eat">
        <ul>
          <li v-for="(snack,i) of snacks" :key="i">
            <router-link :to="`/Cookbook/${snack.tid}`">
              <van-image lazy-load :src="snack.images" />
              <p>{{snack.ttitle}}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="order_tilte">
      <h4>甜品</h4>
      <div class="sort">
        <ul>
          <li v-for="(dolci,i) of dolcis" :key="i">
            <router-link :to="`/Cookbook/${dolci.tid}`">
              <van-image lazy-load :src="dolci.images" />
              <p>{{dolci.ttitle}}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import Footer from "./Footer.vue";
import { mapActions } from 'vuex'
import Vue from 'vue';
import { Lazyload } from 'vant';
Vue.use(Lazyload);
export default {
  components: {
    Footer
  },
  data() {
    return {
      Bistrots: [],
      snacks: [],
      dolcis: []
    };
  },
  methods:{
      ...mapActions([
        'CartDetails'
      ]),
  },
  mounted() {
  
    this.axios.get("/order").then(res => {
      let data = res.data;
      data.forEach(item => {
        if (item.cid == 1) {
          this.Bistrots.push(item);
        }
        if (item.cid == 2) {
          this.snacks.push(item);
        }
        if (item.cid == 3) {
          this.dolcis.push(item);
        }
      });
    });
  }
};
</script>
<style>
.order {
  font-size: 12px;
  margin-bottom: 50px;
}
.order .van-nav-bar__title{
  font-size: 15px;
  color: #fff;
}
.order .van-nav-bar{
  color: #fff;
  background-color:#fb5f08 ;
  /* border-bottom:#fb5f08  1px dotted; */
}
.order_content{
  margin-bottom:5rem;
}
.order .order_tilte{
  /* border-bottom:#fb5f08 1px dotted; */
}
.order_tilte h4 {
  font-weight: normal;
  color: black;
  font-size: 14px;
  text-align: center;
  clear: both;
}
.sort ul li{
  width: 2rem;
  float: left;
  font-size: 13px;
  text-align: center;
}
.sort ul  li a {
color: #000;
}
.sort img {
  width: 60px;
  height: 60px;
}
</style>

