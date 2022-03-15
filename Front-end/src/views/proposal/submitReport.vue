<template>
  <div class="submitReport">
    <RainbowPanel>
      <template v-slot:name>
        Submit Report
      </template>
      <template v-slot:content>
        <div class="initiate-content">
          <h2>Report</h2>
          <el-input type="textarea" :rows="20" v-model="reportContent"></el-input>
          <div class="operating">
            <el-button size="normal" class="button3" @click="$router.back()">
              Back
            </el-button>
            <el-button size="normal" class="button1" @click="subReport">
              Submit
            </el-button>
          </div>
        </div>
      </template>
    </RainbowPanel>
  </div>
</template>

<script>
export default {
  name: "submitReport",
  data(){
    return {
      reportContent:null
    }
  },
  created() {


  },
  methods:{
    subReport(){
      this.$store.dispatch("proposal/submitReport", {
        proposalId: this.$route.params.proposalId,
        content:this.reportContent
      }).then(()=>{
        this.$message.success("success")
      }).catch((err)=>{
        this.$message.error("error" + err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.initiate{
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
      padding: 20px;
      .el-button{
        height: 36px;
        border-radius: 40px;
        width: 130px;
      }
    }
  }
}
</style>
