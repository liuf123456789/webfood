<template>
  <div class="carts">
     <van-nav-bar title="购物车" left-arrow  @click-left="back()"></van-nav-bar>
    <van-empty
    v-if="carts==''"
     class="custom-image"
     image="https://img.yzcdn.cn/vant/custom-empty-image.png"
     description="空空如也,开始你的购物之旅"
    />
    <div v-else>
     <div class="cart_conntent">
        <div class="carts_box"  v-for="(item,i) of carts" :key="i">
           <van-checkbox  checked-color="#fb5f08"     v-model="item.checked"  @change="doCheckOne"></van-checkbox>
           <van-card :price="item.cprice" :title="item.ctitle" :thumb="item.ciamges">
              <template #tags>
                 <div class="van-stepper" value="1">
                    <button class="van-stepper__minus" @click="minus(i)"></button>
                    <input type="number" class="van-stepper__input" v-model="item.cnum"  @change="onChange(item.cnum)"/>
                    <button class="van-stepper__plus" @click="plus(i)"></button>
                  </div>
            </template>
        <template #footer>
              <van-button plain  size="small" color="#fb5f08"  @click="del(i)">删除</van-button>
        </template>
      </van-card>
    </div>
  </div>
  <div class="allchecked">
    <van-submit-bar :price="totalPrice*100" button-color="#fb5f08"  :disabled="totalPrice==0" button-text="提交订单" @submit="onSubmit">
        <van-checkbox checked-color="#fb5f08"  v-model="checkAll" @change="doCheckAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
 </div>
  <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Footer from "./Footer.vue";
import { Toast } from "vant";
export default {
  components: {
    Footer
  },
  data() {
    return {
      carts: [],
      checkAll: false
      // totalPrice:0
    };
  },
  computed: {
    ...mapState(["uid"]),
    // 计算总价
    totalPrice() {
      let total = 0;
      this.carts.forEach(item => {
        total += item.cprice * item.cnum * item.checked;
      });
      return total;
    }
  },
  methods: {
    back() {
      window.history.back();
    },
    // 减去数量
    minus(i) {
      let { cbaseid, cid, cnum } = this.carts[i];
      if (cnum == 1) {
        Toast.fail("商品数量不能小于1");
        return;
      }
      this.axios
        .get("/carts_minus", {
          params: { cbaseid: cbaseid, cid: cid, cnum: cnum }
        })
        .then(res => {
          if (res.data.code == 1) {
            this.carts[i].cnum = parseInt(this.carts[i].cnum) - 1;
          }
          if (res.data.code == 0) {
            Toast.fail("减少失败");
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    // 添加数量
    plus(i) {
      let { cbaseid, cid, cnum } = this.carts[i];
      this.axios
        .get("/carts_plus", {
          params: { cbaseid: cbaseid, cid: cid, cnum: cnum }
        })
        .then(res => {
          if (res.data.code == 1) {
            this.carts[i].cnum = parseInt(this.carts[i].cnum) + 1;
          }
          if (res.data.code == 0) {
            Toast.fail("增加失败");
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    // 删除数量
    del(i) {
      let { cid } = this.carts[i];
      this.axios.get("/carts_del", { params: { cid: cid } }).then(res => {
        if (res.data.code == 1) {
          this.carts.splice(i, 1);
          Toast.success("删除成功");
        }
        if (res.data.code == 0) {
          Toast.fail("删除失败");
        }
      });
    },
    // 单选
    doCheckOne() {
      let count = this.carts.length;
      let num = 0;
      this.carts.forEach(item => {
        num += item.checked;
      });
      this.checkAll = num == count;
    },
    // 全选
    doCheckAll() {
      this.carts.forEach(item => {
        item.checked = this.checkAll;
      });
    },
    onSubmit() {
      let pay = [];
      this.carts.forEach(item => {
        if (item.checked) {
          pay.push({
            cid: item.cid,
            ctitle: item.ctitle,
            ciamges: item.ciamges,
            cprice: item.cprice,
            cnum: item.cnum,
            cuid: item.cuid,
            cbaseid: item.cbaseid
          });
        }
      });
      if (pay.length === 0) {
        Toast("请选择商品购买");
      } else {
        this.$router.push({
          path: "confirmOrder",
          query: { confirmOrder: pay, total: this.totalPrice }
        });
      }
    }
  },
  mounted() {
    // 查询该用户购物车的所有商品
    this.axios
      .get("/carts", { params: { cuid: this.uid } })
      .then(res => {
        res.data.forEach(item => {
          item.checked = false;
        });
        this.carts = res.data;
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>
<style>
.carts {
  background-color: #fff;
}
 .custom-image .van-empty__image {
   margin-top:2rem;
  }
.carts_box {
  display: flex;
  margin-bottom: 0.3rem;
  background-color: #f8f8f8;
}
.carts_box .van-stepper__minus,
.van-stepper__plus,
.van-stepper__input {
  width: 0.6rem;
  height: 0.65rem;
}
.carts_box .van-card {
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.carts_box .van-card__footer {
  margin-top: 0.5rem;
}
.carts_box .van-checkbox__icon {
  background-color: #fff;
  border-radius: 50%;
}
.carts .van-nav-bar__title {
  color: #fff;
}
.carts .van-nav-bar {
  color: #fff;
  background-color: #fb5f08;
}
.carts .van-icon-arrow-left::before {
  color: #fff;
}
.carts .van-card__title {
  font-size: 0.4rem;
  margin-bottom: 0.3rem;
}
.cart_conntent {
  margin-bottom: 100px;
}
.carts .van-card__bottom {
  font-size: 0.5rem;
}
.carts .van-multi-ellipsis--l2 {
  font-size: 14px;
}
.carts .van-submit-bar {
  border-top: 1px solid rgb(206, 206, 206);
  bottom: 50px;
}
.allchecked .van-submit-bar__price,
.van-submit-bar__price--integer {
  color: #fb5f08;
  font-size: 0.5rem;
}
.carts .van-card__price-currency,
.van-card__price-decimal {
  color: #fb5f08;
  font-size: 0.5rem;
}
.carts .van-card__price-integer {
  color: #fb5f08;
  font-size: 0.5rem;
}
.carts .van-stepper {
  padding: 0;
  margin: 0;
}
</style>