<template>
  <!-- 确认订单后支付 -->
  <div class="confirmOrder">
    <router-link to="/Cart">
      <van-nav-bar title="确认订单" left-arrow />
    </router-link>
    <div class="confirmOrder_content">
     
      <div class="personal_ifno">
        <div class="p_icon">
          <router-link  to="/xinaddress"><van-icon size="1rem" name="location"  badge="地址点击"  color="#fb5f08" /></router-link>
        </div>
         <router-link v-if="!addr||address===undefined" to="/xinaddress"><p  class="add" to="/xinaddress">请选择你的地址</p></router-link>
        <div  v-else  class="s-card">  
          <van-card >
            <template #tags>
              <div>
                <div class="s-card_name_phone">
                <p class="info"><van-icon color="#fb5f08" size="0.5rem" name="manager" />{{addr.aUname}}</p>
                <p class="info phone"> <van-icon  color="#fb5f08"  size="0.5rem" name="phone-circle" />{{addr.aTel}}</p>
              </div>
              <div class="s-card_name_phone">
                 <p class="info"><van-icon  color="#fb5f08" size="0.5rem" name="wap-home" />{{addr.addr}}</p>
              </div>
              </div>
            </template>
          </van-card>
        </div>
      </div>

      <div class="confirmOrder_shop">
        <van-card 
          v-for="(detail,index) of confirmOrder" :key="index"
          :num="detail.cnum"
          :price="detail.cprice"
          :title="detail.ctitle"
          :thumb="detail.ciamges"
        ></van-card>
      </div>
      <van-submit-bar  
        :disabled="!addr||address===undefined"
        :price="total*100"
        button-color="#fb5f08"
        button-text="去支付"
        @submit="Dialog()"
      >
        <van-dialog v-model="show" title="确认支付" :before-close="onBeforeClose" show-cancel-button>
          <div class="pay">
            <img src="../assets/images/pay/pay.png" />
            <p>总金额：{{total}}</p>
          </div>
        </van-dialog>
      </van-submit-bar>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      confirmOrder: [],
      total: 0,
      address: [],
      ran: "",
      time: new Date(),
      show: false,
      status: "已支付",
      statu: "待支付"
    };
  },
  computed: {
    ...mapState(["uid","addr"])
  },
  methods: {
    Dialog() {
      this.ran = "";
      for (var i = 0; i < 12; i++) {
        this.ran += Math.floor(Math.random() * 10);
      }
      this.show = true;
    },
    onBeforeClose(action, done) {
      if (action == "confirm") {
        // 确定订单后删除购物车
        this.confirmOrder.forEach(item => {
          this.axios
            .get("/del_carts", {
              params: {
                cid: item.cid
              }
            })
            .then(res => {
              if (res.data.code == 1) {
                Toast.success("提交清除购物车成功");
              }
              if (res.data.code == 0) {
                Toast.fail("提交清除购物车成功失败");
              }
            });
        });
        // 确认支付插入订单数据
        this.confirmOrder.forEach(item => {
          this.axios
            .get("/orderdetail", {
              params: {
                base_id: item.cbaseid,
                base_title: item.ctitle,
                base_price: item.cprice,
                base_image: item.ciamges,
                num: item.cnum,
                order_num: this.ran,
                status: this.status,
                o_uid: this.uid,
                c_cid: item.cid
              }
            })
            .then(res => {});
        });

          // this.axios
          //   .get("/list", {
          //     params: {
          //       addUname:this.addr.aUname,
          //       addPh: this.addr.aTel,
          //       address: this.addr.addr,
          //       total:this.total,
          //       add_Id:this.addr.aid,
          //       ordernumber: this.ran,
          //       time: this.time,
          //       order_uid: this.uid
          //     }
          //   })
          //   .then(res => {});
        this.$router.push("/My");
      }
      if (action === "cancel") {
        this.confirmOrder.forEach(item => {
          this.axios
            .get("/orderdetail", {
              params: {
                base_id: item.cbaseid,
                base_title: item.ctitle,
                base_price: item.cprice,
                base_image: item.ciamges,
                num: item.cnum,
                order_num: this.ran,
                status: this.statu,
                o_uid: this.uid,
                c_cid: item.cid
              }
            })
            .then(res => {});
        });
          // this.axios
          //   .get("/list", {
          //     params: {
          //       addUname:this.addr.aUname,
          //       addPh:this.addr.aTel,
          //       address:this.addr.addr,
          //       total: this.total,
          //       add_Id:this.addr.aid,
          //       ordernumber: this.ran,
          //       time: this.time,
          //       order_uid: this.uid
          //     }
          //   })
          //   .then(res => {});
        done();
      }
    }
  },
  mounted() {
    this.address=sessionStorage.getItem('addr');
    this.confirmOrder = this.$route.query.confirmOrder;
    this.total = this.$route.query.total,
    this.total=this.total.toFixed(2);
    // console.log(this.total);
  }
};
</script>
<style>
.van-info{
  min-width: 1.4rem;
  top:20px;
  right:64px;
  font-size: 0.1rem;
  background-color: #fb5f08;
}
.add {
  font-size: 0.4rem;
  width: 4rem;
  padding: 0.3rem 0rem 0rem 0rem;
}
.s-card_name_phone {
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
}
.s-card_name_phone .phone {
  padding-left: 2rem;
}
.s-card_name_phone .van-icon {
  margin-right: 0.1rem;
  vertical-align: bottom;
}
.s-card .van-card {
  padding: 0;
}
.personal_ifno {
  background-color: #fafafa;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #cecece;
}
.personal_ifno .van-card {
  border-bottom: 0;
}
.confirmOrder 
.van-card__price-currency,
.van-card__price-decimal {
  font-size: 0.5rem;
  color: #fb5f08;
}
.confirmOrder
.van-card__price-integer{
    color: #fb5f08;
     font-size: 0.5rem;
}
.confirmOrder .van-submit-bar__price{
   color: #fb5f08;
   font-size: 0.5rem;
}
.p_icon .van-icon {
  width: 2rem;
  vertical-align: top;
  padding: 0.75rem 0.2rem 0.5rem 0.5rem;
}
.confirmOrder .van-nav-bar__title {
  color: #fff;
}
.confirmOrder .van-nav-bar {
  color: #fff;
  background-color: #fb5f08;
}
.confirmOrder .van-icon-arrow-left::before {
  color: #fff;
}
.confirmOrder .van-card {
  margin-top: 0;
}
.confirmOrder_content {
  margin-bottom: 50px;
}
.confirmOrder .pay {
  width: 200px;
  margin: 0 auto;
  text-align: center;
}
.pay p {
  margin: 0;
  padding: 0;
}
.confirmOrder_shop {
  margin-top: 0.2rem;
  border-top: 1px solid #cecece;
  border-bottom: 1px solid #cecece;
}
.confirmOrder .van-multi-ellipsis--l2 {
  font-size: 14px;
}
.pay img {
  width: 200px;
}
</style>

