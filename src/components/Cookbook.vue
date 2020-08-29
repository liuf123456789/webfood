<template>
  <!-- 菜谱 -->
  <diV class="Cookbook">
    <router-link to="/Order" v-for="(type,index) of cookBookTop" :key="'one'+index">
      <van-nav-bar :title="type.ttitle" left-arrow fixed></van-nav-bar>
    </router-link>
    <div class="c_detalis">
      <router-link  v-for="(cookbook,i) of cookbooks" :key="i" :to="`/Step/${cookbook.did}`">
        <van-card :desc="cookbook.synopsis" :title="cookbook.dish" :thumb="cookbook.images">
        </van-card>
      </router-link>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </diV>
</template>
<script>
import Footer from "./Footer.vue";
export default {
  props: ["tid"],
  components: {
    Footer
  },
  data() {
    return {
      cookBookTop: [],
      cookbooks: []
    };
  },
  created() {
    this.tid = this.$route.params.tid;
  },
  watch: {
    $route() {
      this.tid = this.$route.params.tid;
    }
  },
  mounted() {
    this.axios
      .get("/cookbook_top", {
        params: {
          tid: this.tid
        }
      })
      .then(res => {
        this.cookBookTop = res.data;
      });
    this.axios
      .get("/cookbook", {
        params: {
          tid: this.tid
        }
      })
      .then(res => {
        this.cookbooks = res.data;
      });
  }
};
</script>
<style>
.c_detalis{
  margin-top:50px;
  margin-bottom: 50px;
}
.c_detalis .van-card{
  border-bottom: #fb5f08 1.5px dotted;
}
.Cookbook .van-card__content{
  padding-top: 0.2rem;
}
.Cookbook .van-card__desc{
  line-height: 0.8rem;
  font-size: 12px;
}
.Cookbook .van-multi-ellipsis--l2{
  font-size:14px;
  line-height:1rem;
}
/* 头部样式 */
.Cookbook .van-nav-bar__title {
  color: #fff;
}
.Cookbook .van-nav-bar {
  color: #fff;
  background-color: #fb5f08;
  
}
.Cookbook .van-icon-arrow-left::before {
  color: #fff;
}
</style>