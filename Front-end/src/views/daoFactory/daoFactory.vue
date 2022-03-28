<template>
  <div class="daoFactory">
    <div class="rainbow-panel" v-loading="loading">
      <div class="title">
        Initialize Contract
      </div>
      <div class="info">
        Choose your Tokens settings below.
      </div>
      <div class="src20-form">
        <div class="item">
          <div class="title">
            name
          </div>
          <div class="input">
            <input type="text" v-model="form.inGov.name" placeholder="name">
          </div>
        </div>
        <div class="item-box">
          <div class="item">
            <div class="title">
              parliamentCount
            </div>
            <div class="input">
              <input type="number" v-model="form.inGov.parliamentCount"  placeholder="parliamentCount">
            </div>
          </div>
          <div class="item">
            <div class="title">
              approveCount
            </div>
            <div class="input">
              <input type="number" v-model="form.inGov.approveCount" placeholder="approveCount">
            </div>
          </div>
        </div>
        <div class="item-box">
          <div class="item">
            <div class="title">
              workDays
            </div>
            <div class="input">
              <input type="number" v-model="form.inGov.workDays" placeholder="workDays">
            </div>
          </div>
          <div class="item">
            <div class="title">
              applyTime
            </div>
            <div class="input">
              <input type="number" v-model="form.inGov.applyTime" placeholder="applyTime">
            </div>
          </div>
        </div>

        <div class="item-box">
          <div class="item">
            <div class="title">
              applyMemberCount
            </div>
            <div class="input">
              <input type="number" v-model="form.inGov.applyMemberCount" placeholder="applyMemberCount">
            </div>
          </div>
          <div class="item">
            <div class="title">
              depositCount
            </div>
            <div class="input">
              <input type="number" v-model="form.inGov.depositCount" placeholder="depositCount">
            </div>
          </div>
        </div>
        <div class="item-box">
          <div class="item">
            <div class="title">
              voteInterval
            </div>
            <div class="input">
              <input type="number" v-model="form.inGov.voteInterval" placeholder="voteInterval">
            </div>
          </div>
          <div class="item">
            <div class="title">
              publicityTime
            </div>
            <div class="input">
              <input type="number" v-model="form.inGov.publicityTime" placeholder="publicityTime">
            </div>
          </div>

        </div>

      </div>
      <div class="mint" @click="createDao">
        createDao
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "daoFactory",
  data(){
    return {
      loading:false,
      form:{
        inGov:{},
        govToken:null
      }
    }
  },
  methods:{
    createDao(){
      this.loading = true
      let arr = []
      for(let i in this.form.inGov){
        if(false){

        }else{
          arr.push({
            type:"BigNumber",
            hex:this.$store.state.app.web3.utils.utf8ToHex(this.form.inGov[i].toString())
         })
        }
      }
      this.$store.dispatch("daoFactory/createDao", {
        inGov:this.form.inGov,
        govToken:this.$route.query.address
      }).then(()=>{
        setTimeout(()=>{
          this.$router.push({
            path:"/governance"
          })
        },2000)
      }).catch(err=>{
        this.$message.error(err)
      })
      this.loading = false
    }
  },
  mounted() {
    window.ethereum.sendAsync({
        method: 'wallet_watchAsset',
        params: {
            type: 'ERC20',
            options: {
                address: this.$route.query.address,
                symbol: this.$route.query.symbol,
                decimals: 18,
            },
        },
    })
  }
}
</script>

<style lang="scss" scoped>
.daoFactory{
  .rainbow-panel{
    width: 1200px;
    border-radius: 20px;
    background: #fff;
    margin: 20px auto;
    padding: 30px;
  }
  .title{
    font-size: 30px;
    text-align: center;
    color: #333333;
    line-height: 45px;
  }
  .info{
    text-align: center;
    font-weight: 500;
    color: #666666;
    line-height: 24px;
  }
  .src20-form{
    .item-box{
      display: flex;
      justify-content: space-between;
      padding: 4px 120px;
    }
    .item{
      text-align: center;
      .title{
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 700;
      }
      .input{
        input{
          padding-left: 10px;
          width: 420px;
          height: 42px;
          background: #ffffff;
          border: 1px solid #eaeaea;
          border-radius: 10px;
        }
      }
    }
  }
  .mint{
    text-align: center;
    width: 180px;
    height: 50px;
    background: linear-gradient(90deg,#12c2e9 0%, #c471ed 64%, #f64f59 100%);
    border: 1px solid #eaeaea;
    border-radius: 10px;
    cursor: pointer;
    margin: 20px auto;
    user-select: none;
    font-size: 20px;
    line-height: 50px;
    color: #fff;
  }
}
</style>
