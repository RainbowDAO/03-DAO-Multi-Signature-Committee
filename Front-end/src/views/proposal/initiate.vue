<template>
<!--initiate-->
  <div class="initiate">
    <RainbowPanel style="width: 900px">
      <template v-slot:name>
        Initiate a proposal
      </template>
      <template v-slot:content>
        <div class="initiate-content">
          <div class="item">
            <span>Proposal stage</span>
            <el-input size="mini" placeholder="stage" v-model="proposal.stage"></el-input>
          </div>
          <div class="item">
            <span>Proposal description</span>
            <el-input type="textarea" :rows="10" v-model="proposal.description"></el-input>
          </div>
          <div class="item">
            <div class="left">
              <span>Proposal applyAmount</span>
              <el-input size="mini" v-model="proposal.applyAmount"></el-input>
            </div>
            <div class="right">
              <span>Proposal day</span>
              <el-input  size="mini" v-model="proposal.day"></el-input>
            </div>

          </div>
          <div class="tip">
            Initiate a proposal need 500 token!
          </div>
          <div class="operating">
            <el-button size="normal" class="button1" @click="subProposal">
              Initiate
            </el-button>
          </div>
        </div>
      </template>
    </RainbowPanel>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "initiate",
  data(){
    return {
      proposal:{
      },
      tokenAddress:""
    }
  },
  computed:{
    ...mapGetters([
      'account',
    ]),
  },
  created() {

  },
  watch:{
    account(){
      this.getData()
    }
  },
  methods:{
    getData(){
      this.$store.dispatch("daoFactory/getUserDaoLength").then(length => {
        this.$store.dispatch("daoFactory/getUserDaoByIndex", length - 1).then(address => {
          this.daoAddress = address
          console.log("dao" + address)
        })
      })
    },
    subProposal(){
      this.$store.dispatch("governanceDao/comGovApplyToken", {
        address:this.$store.state.daoFactory.daoAddress,
        ...this.proposal
      }).then(()=>{
        this.$message.success("succeed")
        this.$router.push('governance')
      }).catch((err)=>{
        this.$message.error("err" + err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.initiate{
  min-height: 680px;
  .tip{
    padding: 20px 0;
    font-size: 16px;
    color: #666666;
  }
  .initiate-content{
    width: 600px;
    margin: 0 auto;
    .item{
      text-align: left;
      ::v-deep .el-input__inner ,::v-deep .el-textarea__inner{
        background: #f8f8f8!important;
        border: 1px solid #eaeaea;
      }
      span{
        font-weight: bold;
        line-height: 30px;
        margin: 8px 0;
        display: block;
      }
      &:nth-child(3){
        display: flex;
        justify-content: space-between;
        .left, .right{
          width: 48%;
        }
      }
    }
    .operating{
      text-align: center;
      padding: 50px 0;
        .el-button{
          height: 36px;
          border-radius: 40px;
          width: 130px;
        }
    }
  }
}
</style>
