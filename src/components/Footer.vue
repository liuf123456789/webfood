<template>
<!-- 底导航 -->
    <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="apps-o" to="/Order">分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" to="/Shopping">商城</van-tabbar-item>
        <van-tabbar-item icon="smile-o" to="/My">我的</van-tabbar-item>
      </van-tabbar>
</template>
<script>
export default {
    data(){
        return{
           active:''
        }
    }
}
</script>
<style>
 .van-tabbar-item{
  color: rgb(255, 255, 255);
}
.van-tabbar-item__text{
    font-size: 13px;
  color: rgb(255, 255, 255);
}
/* .van-tabbar底部导航 */
.van-tabbar{
  color: white;
   background-color:#fb5f08;
}
</style>


