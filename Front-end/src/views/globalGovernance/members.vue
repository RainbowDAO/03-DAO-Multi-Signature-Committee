<template>
  <div class="members">
    <RainbowPanel class="committee-candidate">
      <template v-slot:name>
        <div style="display: flex;justify-content: space-between">
          MEMBERS({{daoUsers.length}})
          <el-button size="small" style="margin-left: 20px" class="button1" @click="$router.back()">BACK</el-button>
        </div>
      </template>
      <template v-slot:content>
        <div v-for="(item,index) in userArr" :key="index">
          <TableItem :tableData="item"/>
        </div>
        <div class="no-data" v-show="userArr.length==0">
          <img src="../../assets/img/no-data.png" alt="">
        </div>
      </template>
    </RainbowPanel>
  </div>
</template>

<script>
import TableItem from "../../components/TableItem";
export default {
  name: "members",
  components: {TableItem},
  data() {
    return {
      campaignMsUsers:[],
      daoUsers:[],
      camArr:[],
      userArr:[],
      proposalBlockNumber:0
    }
  },
  watch: {
    account() {
      this.getData()
    },
    campaignMsUsers() {
      let arr = []
      this.campaignMsUsers.forEach((item, index) => {
        let obj = {
          index: index + 1,
          nameObj: {
            title: "account",
          },
          infoArr: [
            {
              title: "tickets",
              data: item.tickets / 10**18
            },
            {
              title: "account",
              data: item.account
            },
            {
              title: "opposeTickets",
              data: item.opposeTickets
            },
          ],
          detailArr: [],

        }
        arr.push(obj)
      })
      this.camArr = arr
    },
    daoUsers() {
      let arr = []
      this.daoUsers.forEach((item, index) => {
        let obj = {
          index: index + 1,
          nameObj: {
            title: "account",
          },
          infoArr: [
            {
              title: "tickets",
              data: item.tickets / 10**18
            },
            {
              title: "account",
              data: item.account
            },

          ],
          detailArr: [],

        }
        arr.push(obj)
      })
      this.userArr = arr
    }
  },
  computed: {
    account() {
      return this.$store.state.app.account
    },
    daoAddress(){
      return this.$store.state.app.curDaoAddress
    }
  },
  created() {
    if(this.account){
      this.getData()
    }
  },

  methods: {
    async getPriorVotes(blockNumber,account) {
      return await this.$store.dispatch("token/getPriorVotes", {
        address: this.tokenAddress,
        blockNumber,
        account
      })
    },
    getUsers(){
      this.daoUsers = []
      console.log(this.daoAddress)
      this.$store.dispatch("daoFactory/getDaoUserLength", this.daoAddress).then(length=>{
        for (let i = 0; i < length; i++) {
          this.$store.dispatch("daoFactory/daoUsers", {
            address:this.daoAddress,
            index:i
          }).then(async userAddr => {
            let votes =await this.getPriorVotes(this.proposalBlockNumber,userAddr)
            this.daoUsers.push({
              account:userAddr,
              tickets:votes
            })
          })
        }

      })
    },
    getParliament(){
      this.parliament = []
      this.$store.dispatch("governanceDao/getParliamentLength", {
        address: this.daoAddress,
      }).then(length=>{
        for (let i = 0; i < length; i++) {
          this.$store.dispatch("governanceDao/getParliamentByIndex", {
            address: this.daoAddress,
            idx: i
          }).then(campaignList => {
            this.parliament.push(campaignList)
          })
        }

      })
    },
    parliamentApplyRecords(voteId) {
      this.campaignMsUsers = []
      this.$store.dispatch("governanceDao/getApplyUserLength", {
        address: this.daoAddress,
        id: voteId,
      }).then(length => {
        for (let i = 0; i < length; i++) {
          this.$store.dispatch("governanceDao/parliamentApplyRecords", {
            address: this.daoAddress,
            id: voteId,
            idx: i
          }).then(campaignList => {
            console.log(campaignList)
            this.campaignMsUsers.push(campaignList)
          })
        }
      })

    },

    getData() {
      if (!this.account) {
        return
      }

      this.$store.dispatch("governanceDao/cgInfo", this.daoAddress).then((res) => {
        console.log(res)
        this.tokenAddress = res.govToken

        if (res.startVote) {
          this.proposalBlockNumber = res.proposalBlockNumber
        }
        this.getUsers()
        this.getParliament()
        this.parliamentApplyRecords(res.voteId)
      }).catch(err => {
        this.$message.error("applyParliament err" + err)
      })
    }
  }
}
</script>

<style scoped>

</style>
