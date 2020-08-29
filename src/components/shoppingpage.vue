<template>
  <!-- 商品详情页可添加到购物车 -->
  <div class="shoppingPage">
    <router-link to="/Shopping">
      <van-nav-bar title="商品详情" left-arrow></van-nav-bar>
    </router-link>
    <div class="shoppingpage_content" v-for="(detail,i) of shoppingpage" :key="i">
      <van-image fit="contain" lazy-load :src="detail.image"></van-image>
      <div class="goodDetailTitle">
        <h3>{{detail.tilte}}</h3>
        <h4>简介:{{detail.synopsis}}</h4>
        <h5>￥{{(detail.price).toFixed(2)}}</h5>
      </div>
    </div>
    <div class="shopingpage-cart" v-for="(addcart,i) of shoppingpage" :key="'i'+i">
      <van-goods-action>
        <van-goods-action-icon icon="star" text="收藏" color="#ff5000" />
        <van-goods-action-icon icon="cart-o" text="购物车" :badge="cartLen" @click="carts()" />
        <van-goods-action-button type="warning" text="加入购物车" @click="addGoodsCar(addcart)"/>
        <van-goods-action-button type="danger" text="立即购买"    @click="pay(addcart)" />
      </van-goods-action>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Lazyload } from "vant";
Vue.use(Lazyload);
import { mapState } from "vuex";
import { Toast } from "vant";
import { constants } from "zlib";
export default {
  data() {
    return {
      cartLen: 0,
      shoppingpage: []
    };
  },
  computed: {
    ...mapState(["uid"])
  },
  methods: {
    // 添加到购物车
    addGoodsCar(addcart) {
      if (sessionStorage.getItem("username")) {
        this.cartLen++;
        this.axios
          .get("/addcarts", {
            params: {
              ctitle: addcart.tilte,
              ciamges: addcart.image,
              cprice: addcart.price,
              cnum: this.cartLen,
              cuid: this.uid,
              cbaseid: addcart.fid
            }
          })
          .then(res => {});
        Toast.success("添加成功");
      } else {
        this.$router.push("/Login");
        Toast.fail("请登录");
      }
    },
    // 跳转到购物车
    carts() {
      if (sessionStorage.getItem("username")) {
        this.$router.push("/Cart");
      } else {
        this.$router.push("/Login");
        Toast.fail("请登录");
      }
    },
    // 立即购买
    pay(addcart) {
      if (sessionStorage.getItem("username")) {
        this.$router.push({ path: "/pay", query: { pay: addcart } });
      } else {
        this.$router.push("/Login");
        Toast.fail("请登录");
      }
    }
  },

  mounted() {
    // 用户地址
    this.axios
      .get("/shoppingpage", {
        params: {
          fid: this.$route.query.fid
        }
      })
      .then(res => {
        this.shoppingpage = res.data;
      });
  }
};
</script>
<style>
.shoppingPage .van-nav-bar__title {
  color: #fff;
}
.shoppingPage .van-nav-bar {
  color: #fff;
  background-color: #fb5f08;
}
.shoppingPage .van-icon-arrow-left::before {
  color: #fff;
}
.shoppingPage {
  height: 100%;
}
.shoppingpage_content {
  margin: 10px;
  font-size: 20px;
}
.shoppingpage_content .van-image {
  width: 100%;
  justify-self: center;
  align-self: center;
}
.shopingpage-cart {
  margin-top: 70px;
}
.goodDetailTitle h3 {
  color: rgb(250, 250, 250);
  font-size: 0.6rem;
  color: #3a3a3a;
}
.goodDetailTitle h4 {
  font-size: 0.38rem;
  color: #70706f;
  border-bottom: 1px dotted #fb5f08;
}
.goodDetailTitle h5 {
  margin-top: 0.6rem;
  padding: 0;
  line-height: 22px;
}
.goodDetailTitle h3,
h4 {
  margin: 0;
  padding: 0;
  line-height: 30px;
}
.goodDetailTitle h5 {
  font-size: 1rem;
  color: #ff660a;
}
</style>