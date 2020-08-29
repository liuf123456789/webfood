<template>
  <!-- 我的订单 -->
  <div class="myorder">
    <router-link to="/My">
      <van-nav-bar title="我的订单" left-arrow></van-nav-bar>
    </router-link>
    <van-tabs v-model="active">
      <van-tab title="已完成">
        <div   v-for="(finish,i) of finishs" :key="'i'+i">
        
           <van-card
            :num="finish.num"
            :price="finish.base_price"
            :title="finish.base_title"
           :thumb="finish.base_image"
           >
          <template #footer>
            <van-button plain  size="small" color="#fb5f08" @click="del(finish.base_id)">删除订单</van-button>
          </template>
        </van-card>
      
      </div>
       
      </van-tab> 
      <van-tab title="待支付">
         <van-card 
         v-for="(undone,i) of undones" :key="'i'+i"
          :num="undone.num"
          :price="undone.base_price"
          :title="undone.base_title"
          :thumb="undone.base_image"
        >
          <template #footer>
            <van-button plain  size="small" color="#fb5f08" @click="del(undone.base_id)">删除</van-button>
            <van-button plain  size="small" color="#fb5f08">重新支付</van-button>
          </template>
        </van-card>
      </van-tab> 
    </van-tabs>
  </div>
</template>
<script>
import { Dialog } from 'vant';
import { Toast } from "vant";
import { mapState } from "vuex";
export default {
  data() {
    return {
      finishs: [],
      undones: [],
      active: ""
    };
  },
  computed: {
    ...mapState(["uid"])
  },
  methods: {
    del(fid) {
       Dialog.confirm({
         title: '是否删除',
        })
      .then(() => {
           this.axios
        .get("/del", {
          params: {
            fid: fid
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            this.finishs.splice(fid,1);
            this.undones.splice(fid,1);
            Toast.success("删除成功");
            this.finishs=[];
            this.undones=[];
          }
          if (res.data.code == 0) {
             Toast.fail("删除失败");
          }
        });

        })
       .catch(() => {
        done();
       
      });

  



    }
  },
  mounted() {
    this.axios
      .get("/myorder", {
        params: { uid: this.uid }
      })
      .then(res => {
        let data = res.data;
        data.forEach(item => {
          if (item.status === "已支付") {
            this.finishs.push(item);
          }
          if (item.status === "待支付") {
            this.undones.push(item);
          }
        });
      });
  }
};
</script>
<style>
.myorder .van-tab__text--ellipsis {
  font-size: 14px;
  font-weight: bold;
}
.myorder .van-card__title {
  font-size: 13px;
}
.myorder .van-tabs__line {
  color: #fff;
  background-color: #fb5f08;

  z-index: -1;
}
.myorder .van-tabs__wrap {
  background-color: #fafafa;
}
.myorder .van-tab--active {
  color: #fb5f08;
  border-bottom: 3px solid #fb5f08;
}
.myorder .van-tabs__nav {
  background-color: transparent;
}

.myorder .van-card {
  margin-top: 0.3rem;
}
.myorder .van-nav-bar__title {
  color: #fff;
}
.myorder .van-nav-bar {
  color: #fff;
  background-color: #fb5f08;
}
.myorder .van-icon-arrow-left::before {
  color: #fff;
}
.myorder .van-card__price-currency,
.van-card__price-decimal {
  font-size: 0.5rem;
  color: #fb5f08;
}
.myorder .van-card__price-integer {
  font-size: 0.5rem;
  color: #fb5f08;
}
</style>