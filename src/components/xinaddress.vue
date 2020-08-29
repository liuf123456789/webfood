<template>
  <div class="xinaddr">
    <van-nav-bar title="地址信息" left-text="返回" left-arrow  @click-left="onClickLeft"/>
    <van-empty v-if="list==''"  description="空空如也" />
    <van-address-list
       v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @select="select"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { Dialog } from 'vant';
import { Toast } from "vant";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      chosenAddressId:'1',
      list: [],
    };
  },
  computed: {
    ...mapState(["uid"])
  },
  mounted() {
    this.axios
      .get("/addree", {
        params: {
          uid: this.uid
        }
      })
      .then(res => {
        let data = res.data;
        data.forEach((item, index) => {
        this.chosenAddressId=item.aid;
          item.id = index;
          item.name = item.aUname;
          item.tel = item.aTel;
          item.address = item.addr;
          this.list.push(item);
        });
      })
      .catch(err => {
        console.error(err);
      });
  },
  methods: {
    onClickLeft() {
      window.history.back();
    },
    onAdd() {
      this.$router.push('/Addr');
    },
    onEdit(item) {
       this.$router.push({path:'/updatAddress',query:{updatAddr:item}});
    },
    select(item, index){
        Dialog.confirm({
              title: '是否选择该地址',
              // message: '弹窗内容',
        })
        .then(() => {
          window.history.back();
          //  this.$router.push('/Cart');
           this.$store.commit("address",item);
        })
        .catch(() => {
          //  cancel();
         });
     
        
    }
  }
};
</script>
<style>
.van-address-list__bottom{
    position: relative;
}
.xinaddr .van-button::before,.van-button--danger{
  background-color: #fb5f08;
}
</style>

