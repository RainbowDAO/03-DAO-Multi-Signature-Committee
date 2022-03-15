<template>
  <div class="rain-header" :style="'background-image:'+ $route.path=='/cityNode'?'':'' + '!important'">
    <div class="left" @click="$router.push({name:'governance'})">
      <img class="page-title" src="../assets/img/committe_title.png" alt="">
    </div>
    <div class="right">
      <ConnectWallet class="connect-wallet"></ConnectWallet>
    </div>
  </div>
</template>

<script>
import ConnectWallet from "@/components/ConnectWallet";
import {mapGetters} from "vuex";
export default {
  name: "RainbowHeader",
  components: {
    ConnectWallet
  },
  data() {
    return {
    }
  },
  methods: {
    loginOut() {
      this.$store.dispatch('app/loginOutWeb3')
    },
    chooseAction(command) {
      switch (command) {
        case 'register':
          this.$router.push('/register')
          break;
        case 'info':
          this.$router.push({name:'my'})
              break;
      }
    },
    switchNav(path){
      this.$router.push(path)
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async showConnectList() {
      this.$store.commit("app/SET_SHOWCONNECT")
    },
  },
  created() {

  },
  watch:{
    account(){
      if(this.isConnected){

      }
    }
  },
  computed: {
    ...mapGetters([
      'isConnected',
      'account'
    ]),

  }
}
</script>

<style lang="scss" scoped>

.rain-header {
  position: relative;
  top: 0;
  overflow: hidden;
  width: 100vw;
  height: 200px;
  padding-bottom: 140px;
  display: flex;
  padding-right: 2%;
  justify-content: space-between;
  background-size: cover;
  background: url("../assets/img/header_bg.png");
  .connect-wallet{
    position:absolute;
    top: 20px;
    right: 60px;
    z-index:1000;
    ::v-deep .el-button{
      span{
        font-size: 10px;
        padding: 8px 0;
      }
    }
  }
  .button2{
    height: 28px;
    width: 100px;
    margin-right: 10px;
    background: rgba(255,255,255,0.10);
    border: 1px solid rgba(255,255,255,0.25);
    font-size: 10px;
    .el-icon-arrow-down{
      float:right;
    }
  }
  .left{
    cursor: pointer;
    display: flex;
    color: white;
    .nav-name{
      font-size: 16px;
      margin-left: 10px;
    }
  }
  .right {
    display: flex;
    justify-content: space-around;
    align-items: center;

  }
}

</style>
