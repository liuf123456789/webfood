<template>
  <!-- 搜索 -->
  <div class="search">
    <van-search v-model="searchs" show-action placeholder="请输入搜索菜名关键词" @search="onSearch">
      <template #left>
        <van-button @click="back" color="#fb5f08" icon="arrow-left" />
      </template>
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <div v-for="(detail,i) of details" :key="i">
      <van-card :title="detail.dish" :thumb="detail.images">
        <template #tags>
          <van-tag plain type="danger">{{detail.synopsis}}</van-tag>
        </template>
        <template #footer>
          <van-button size="small" color="#fb5f08" @click="step(detail.did)">查看详情</van-button>
        </template>
      </van-card>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      searchs: "",
      details: []
    };
  },
  methods: {
    back() {
      window.history.back();
    },
    onSearch(searchs) {
      if (this.searchs.trim()) {
        this.axios
          .get("/search", { params: { title: this.searchs } })
          .then(res => {
            if(res.data.length>0){
                this.details = res.data;
            }else{
              Toast('没有相关菜谱，请重新搜索');
            }
           
          });
      }
    },
    step(did) {
      this.$router.push(`/Step/${did}`);
    }
  }
};
</script>
<style>
.search .van-search {
  height: 1rem;
  background-color: #fb5f08;
  vertical-align: baseline;
  border: 0;
}
.search > .van-search div {
  color: #fff;
}
.search > .van-search .van-button {
  height: 0;
}
.btns .van-button {
  background-color: transparent;
}
.btn .van-button {
  border: 0;
  vertical-align: top;
  height: 1rem;
}
.search .icon {
  width: 100%;
  height: 100%;
  padding-left: 12px;
  padding-top: 0.2rem;
}
.search .van-tag::after,
.van-hairline--surround::after {
  border: 0;
  display: block;
  height: 20px;
  color: #fb5f08;
}
.van-tag--danger.van-tag--plain {
  color: #fb5f08;
}
.search .van-icon-arrow-left::before {
  color: #fff;
}
.search .van-card {
  border-bottom: 1px solid #fb5f08;
}
</style>
