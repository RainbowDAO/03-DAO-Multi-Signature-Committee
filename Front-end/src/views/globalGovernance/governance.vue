<template>
  <div class="committeeDetail">
    <div class="gov-nav-list">
      <div class="item" style="cursor: pointer;" @click="$router.push({name:'committeeDetail',params:{daoAddress}})">
        <img src="../../assets/img/gov_navicon1.png" class="icon" alt="">
        <div class="item-content">
          <div class="title">
            Committee
          </div>
          <div class="number">
            {{ campaignMsUsersLength }}/80
          </div>
        </div>
      </div>
      <div class="item" style="cursor: pointer;" @click="$router.push({name:'members',params:{daoAddress}})">
        <img src="../../assets/img/gov_navicon2.png" class="icon" alt="">
        <div class="item-content">
          <div class="title">
            Member
          </div>
          <div class="number">
            {{ memberNumber }}
          </div>
        </div>
      </div>
      <div class="item">
        <img src="../../assets/img/gov_navicon3.png" class="icon" alt="">
        <div class="item-content">
          <div class="title">
            My votes
          </div>
          <div class="number">
            {{ (myVotes / 10**18).toFixed(2) }}
          </div>
        </div>
      </div>

      <div class="item">
        <img src="../../assets/img/gov_navicon4.png" class="icon" alt="">
        <div class="item-content">
          <div class="title">
            Number of delegate votes accepted
          </div>
          <div class="number">
             {{acceptedVotes.toFixed(2)}}
          </div>
        </div>
      </div>
      <div class="item">
        <img src="../../assets/img/gov_navicon5.png" class="icon" alt="">
        <div class="item-content">
          <div class="title">
            DAO
          </div>
          <div class="number">
            <el-button size="small"  class="button1" @click="$router.push({name:'daoList'})">List</el-button>
            <el-button size="small"  class="button1" @click="$router.push({name:'erc20Factory'})">Creat</el-button>
          </div>
        </div>
      </div>
    </div>
    <RainbowPanel class="committee-candidate">
      <template v-slot:name>
        <div style="display: flex;justify-content: space-between">
          PROPOSAL
          <el-button size="small" style="margin-left: 20px" class="button1" @click="Initiate">Initiate</el-button>
        </div>
      </template>
      <template v-slot:content>
        <div class="nav-list">
          <div class="nav-item" :class="{'active':activeIndex == 0}" @click="activeIndex = 0">
            ALL
          </div>
          <div class="nav-item" :class="{'active':activeIndex == 1}" @click="activeIndex = 1">
            In execution
          </div>
          <div class="nav-item" :class="{'active':activeIndex == 2}" @click="activeIndex = 2">
            Voting period
          </div>
          <div class="nav-item" :class="{'active':activeIndex == 3}" @click="activeIndex = 3">
            Publicity period
          </div>
          <div class="nav-item" :class="{'active':activeIndex == 4}" @click="activeIndex = 4">
            Executed
          </div>
          <div class="nav-item" :class="{'active':activeIndex == 5}" @click="activeIndex = 5">
            Rejected
          </div>
        </div>
        <div v-for="(item,index) in camArr" :key="index" @click="toProposal(item)">
          <TableItem :tableData="item" class="proposal-item" operate-g-name="Detail" @operateGClick="toProposal"/>
        </div>
        <div class="no-data" v-show="camArr.length==0">
          <img src="../../assets/img/no-data.png" alt="">
        </div>
      </template>
    </RainbowPanel>
    <el-dialog
        title="VOTE"
        :visible.sync="isShowRecord"
        width="400px"
    >
      <el-input v-model="voteNumber" type="number"></el-input>
      <el-button @click="vote()">Vote</el-button>
    </el-dialog>
  </div>
</template>

<script>
import TableItem from "../../components/TableItem";

export default {
  name: "committeeDetail",
  components: {TableItem},
  data() {
    return {
      activeIndex: 0,
      isShowRecord: false,
      tokenAddress: "",
      daoAddress: "",
      myMsManager: [{}],
      campaignMsUsersLength: 0,
      memberNumber:0,
      proposalsArr:[],
      camArr: [],
      myVotes: 0,
      acceptedVotes:0,
      voteNumber: 0,
      currentVoteAccount: ""
    }
  },
  computed: {
    account() {
      return this.$store.state.app.account
    },
    curDaoAddress(){
      return this.$store.state.app.curDaoAddress
    }
  },
  watch: {
    account() {
      this.getData()
    },
    proposalsArr() {
      let arr = []
      this.proposalsArr.forEach((item, index) => {
        let obj = {
          index: index + 1,
          nameObj: {
            title: "id",
            data: item.id
          },
          infoArr: [
            {
              title: "applyAmount",
              data: item.applyAmount
            },
            {
              title: "creationTime",
              data: new Date(item.creationTime*1000).getFullYear() + '-' +(new Date(item.creationTime*1000).getMonth() +1) +'-' + new Date(item.creationTime*1000).getDate()
            },
            {
              title: "day",
              data: item.day
            },
            {
              title: "depositAmount",
              data: item.depositAmount /10**18
            },
          ],
          detailArr: [
            {
              title: "description",
              data: item.description
            },
          ],

        }
        arr.push(obj)

      })
      console.log(arr)
      this.camArr = arr
    }
  },
  methods: {
    toProposal(item){
      this.$router.push({
        name:"proposal",
        params: {
          proposal:this.proposalsArr[item.index-1],
          daoAddress:this.daoAddress,
          memberNumber:this.memberNumber
        }
      })
    },
    startVote() {
      this.$store.dispatch("governanceDao/startVote", eval(this.daoAddress)).then(() => {
        this.$message.success("startVote success")
        this.getData()
      }).catch(err => {
        this.$message.error("startVote err" + err)
      })
    },
    openVoteDialog(item) {
      this.currentVoteAccount = this.campaignMsUsers[item.index - 1].account
      this.isShowRecord = true
    },
    tokenProposals(){
      this.proposalsArr = []
      this.$store.dispatch("governanceDao/tokenProposalCount",{
        address: this.daoAddress
      }).then(length=>{
        for (let i = 0; i < length; i++){
          this.$store.dispatch("governanceDao/tokenProposals", {
            address: this.daoAddress,
            idx:i+1
          }).then(res => {
            console.log(res)
            this.proposalsArr.push(res)
          })
        }
      })
    },
    vote() {
      this.$store.dispatch("token/delegateVote", {
        address: this.tokenAddress,
        voteNumber: (this.voteNumber * 10 ** 3).toString()
      }).then(res => {
        console.log(res)
        this.$store.dispatch("governanceDao/voteToParliament", {
          address: this.daoAddress,
          tickets: this.voteNumber,
          user: this.currentVoteAccount
        }).then(res => {
          console.log(res)
        })
      })
    },
    impeach() {//Impeach

    },
    getPriorVotes(blockNumber) {
      this.$store.dispatch("token/getPriorVotes", {
        address: this.tokenAddress,
        blockNumber,
      }).then(res => {
        this.myVotes = res
      })
    },
    getAcceptedVotes(blockNumber){
      this.$store.dispatch("token/delegateVotes", {
        address: this.tokenAddress,
        blockNumber,
      }).then(res => {
        this.acceptedVotes = res / 10**18
      })
    },
    Initiate() { //applyParliament
      this.$router.push({name:'initiate'})
    },
    getData() {
      if (!this.account) {
        return
      }
      this.daoAddress= this.curDaoAddress
      console.log(this.curDaoAddress)
      this.$store.dispatch("daoFactory/getUserDaoLength").then(length => {
        this.$store.dispatch("daoFactory/getUserDaoByIndex", length-1).then(address => {
          if(!this.curDaoAddress){
            this.daoAddress = address
            this.$store.commit("app/SET_CURDAO",  this.daoAddress)
          }
          if(this.daoAddress){
            this.tokenProposals()
            this.getDaoInfo()
          }
        })
      })
    },
    getDaoInfo(){
      this.$store.dispatch("governanceDao/cgInfo",  this.daoAddress).then((res) => {
        console.log(res)
        this.tokenAddress = res.govToken

        if (res.startVote) {
          this.getPriorVotes(res.proposalBlockNumber)
          this.getAcceptedVotes(res.proposalBlockNumber)
        }
        this.$store.dispatch("daoFactory/getDaoUserLength", this.daoAddress).then(length => {
          console.log(length)
          this.campaignMsUsersLength = length
          this.memberNumber += parseInt(length)
        })
      }).catch(err => {
        this.$message.error("applyParliament err" + err)
      })
    }
  },

  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.committeeDetail {

  .gov-nav-list {
    width: 1100px;
    padding: 40px 50px;
    justify-content: space-between;
    border-radius: 10px;
    display: flex;
    background: #fff;
    margin: 0 auto;

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .item-content {
        margin: 0 20px;
        line-height: 26px;

        .title {
          font-size: 16px;
          color: #a98ebd;
        }

        .number {
          font-size: 14px;
        }
      }
    }
  }

  .committee-candidate {
    margin-top: 20px;
    padding-bottom: 30px;

    .nav-list {
      display: flex;
      margin: 10px 0;

      .nav-item {
        cursor: pointer;
        padding: 0 16px;
        line-height: 50px;
        font-size: 16px;
        font-weight: bold;
        margin-left: 10px;
        border-bottom: 1px solid #eee;

        &.active {
          color: #6919BB;
          border-bottom: 2px solid #6919BB;
        }
      }
    }
  }

  .committee-member {
    padding-bottom: 10px;
  }
  .proposal-item{
    margin-top: 20px;
  }
}
</style>
