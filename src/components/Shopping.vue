<template>
<!-- 商城 -->
  <div class="shopping">
   <div class="shopping_buttom">
    <van-nav-bar class="shopping_top" title="商城" ></van-nav-bar>
    <van-tabs v-model="activeName">
      <van-tab :title="vegetables+'类'" name="a" fixed>
        <div class="shopping_detalis"  v-for="(veg,i) of vegetable" :key="i">
          <router-link  :to="{ path:'/shoppingpage',query:{fid:veg.fid}}">
          <van-card
             :price="(veg.price).toFixed(2)"
             :title="veg.tilte"
             lazy-load
            :thumb="veg.image"
          >    
            <template #footer>
              <van-button size="small" color="#fb5f08" >查看详情</van-button>
            </template>
          </van-card>
          </router-link>
        </div>
      </van-tab>
      <van-tab :title="meat+'类'" name="b">
         <div class="shopping_detalis" v-for="(m,i) of meats" :key="i">
          <router-link :to="{ path:'/shoppingpage',query:{fid:m.fid}}"> 
          <van-card
            :price="(m.price).toFixed(2)"
             :title="m.tilte"
             lazy-load
            :thumb="m.image"
          >
            <template #footer>
              <van-button size="small"  color="#fb5f08">查看详情</van-button>
            </template>
          </van-card>
          </router-link>
        </div>
      </van-tab>
      <van-tab :title="fish" name="c">
        <div class="shopping_detalis" v-for="(fish,i) of fishs" :key="i">
          <router-link   :to="{ path:'/shoppingpage', query:{fid:fish.fid}}">
          <van-card
            :price="(fish.price).toFixed(2)"
             :title="fish.tilte"
           lazy-load :thumb="fish.image"
          >
            <template #footer>
              <van-button size="small"  color="#fb5f08">查看详情</van-button>
            </template>
          </van-card>
          </router-link>
        </div>
      </van-tab>
       <van-tab :title="freeze" name="d">
        <div class="shopping_detalis" v-for="(freeze,i) of freezes" :key="i">
          <router-link  :to="{ path: '/shoppingpage', query: {fid:freeze.fid}}"> 
          <van-card
            :price="(freeze.price).toFixed(2)"
             :title="freeze.tilte"
             lazy-load
            :thumb="freeze.image"
          >
            <template #footer>
              <van-button size="small"  color="#fb5f08">查看详情</van-button>
            </template>
          </van-card>
          </router-link>
        </div>
      </van-tab>
    </van-tabs>
   </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Lazyload } from 'vant';
Vue.use(Lazyload);
import Footer from './Footer.vue'
export default {
  components:{
     Footer
  },
  data(){
     return{
      vegetables:'蔬菜',
       meat:'肉',
       fish:'鱼类',
       freeze:'冷冻',
       activeName:'',
       vegetable:[],
       meats:[],
       fishs:[],
       freezes:[]
     }
  },
  mounted(){
     this.axios
      .get("/basefood")
      .then(res => {
        let data=res.data;
        data.forEach(item => {
          if(item.type==this.vegetables){
           this.vegetable.push(item);
          }
          if(item.type==this.meat){
            this.meats.push(item);
          }
          if(item.type==this.fish){
            this.fishs.push(item);
          }
          if(item.type==this.freeze){
            this.freezes.push(item);
          }
        }); 
      })
      .catch(err => {
        console.error(err);
      });
  }
}
</script>
<style>
.shopping{
  background-color:#f7eee8;
  width: 100%;
  height: 100%;
}
.shopping .van-tab__text--ellipsis{
  font-weight: bold;
  font-size: 14px;
}
.shopping_buttom{
  margin-bottom: 1.2rem;
}
.shopping .van-tabs__line{
  color: #fff;
  background-color:#fb5f08;
  z-index: -1;
}
.shopping .van-tab--active{
  color: #fb5f08;
  border-bottom: 2px solid  #fb5f08;  
}
.shopping .van-tabs__nav{
  background-color: #fff;
}
.shopping_detalis{
  margin-top:0.3rem;
}
.shopping .van-nav-bar__title{
  color: #fff;
}
.shopping .van-nav-bar{
  color: #fff;
  background-color:#fb5f08 ;
  border-bottom:rgb(211, 210, 210) 1px solid;
}
.shopping .van-card__title{
  line-height:1rem;
  font-size: 13px;
}
.shopping 
.van-card__price-currency,
.van-card__price-decimal{
  font-size: 0.5rem;
  color: #fb5f08;
}
.shopping .van-card__price-integer{
    font-size: 0.5rem;
    color: #fb5f08;
}

</style>