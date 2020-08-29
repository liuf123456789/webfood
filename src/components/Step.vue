<template>
<!-- 做菜步骤 -->
  <div class="step">
    <van-nav-bar title="步骤" left-arrow @click-left="back"></van-nav-bar>
    <div class="s_content" v-for="(step,i) of steps" :key="i">
      <van-image lazy-load :src="step.images" />
      <p class="s_title">{{step.dish}}</p>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="简介" name="1">{{step.synopsis}}</van-collapse-item>
        <van-collapse-item title="食材" name="2">
          <div v-html="step.condiments"></div>
          <p  class="s_ingredients" v-html="step.Ingredients"></p>
        
        </van-collapse-item>
        <van-collapse-item title="步骤" name="3" >{{step.operatingSteps}}</van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Lazyload } from 'vant';
Vue.use(Lazyload);
export default {
    props:['did'],
     data() {
    return {
      activeNames: ['3'],
      steps:[]
    }
  },
  created(){
    this.did=this.$route.params.did;
  },
  watch:{
     $route(){
       this.did=this.$route.params.did;
     }
  },
  methods:{
    back(){
      window.history.back();
    }
  },
  mounted(){
     this.axios
      .get("/step",
      {params:{
        did:this.did
      }})
      .then(res => {
       this.steps=res.data;
      })
      .catch(err => {
        console.error(err);
      });
  }
}
</script>
<style>

.step .van-nav-bar__title{
  color: #fff;
}
.step .van-nav-bar{
  color: #fff;
  background-color:#fb5f08 ;
  border-bottom:#fb5f08  1px solid;
}
.step .van-icon-arrow-left::before{
  color: #fff;
}
.step .van-collapse-item {
   border-top:#fb5f08  1px solid;
  border-bottom:#fb5f08  1px solid;
}
.step>.van-cell__title span{
  font-size: 14px;
}
.step .van-collapse-item__content{
  font-size: 13px;
}
.s_title{
    background-color:#ffe2ce;
     margin: 0;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
}
.s_content .van-image{
  display: flex;
  justify-content: center;
}
.s_ingredients   li{
  display: flex;
  list-style: none;
  color: rgb(116, 116, 116);
}
.s_ingredients   li p{
  padding: 0;
  margin: 0;
} 
.s_ingredients .imit_h2{
  margin:5px 0px 5px 0px;
   font-size: 14px;
   color: rgb(0, 0, 0);
}
</style>