<template>
  <div class="committeeDetail">
    <RainbowPanel class="committee-member">
      <template v-slot:name>
        <div style="display: flex;justify-content: space-between">
          Committee members
          <div style="display: flex;align-items: center;">
            my votes：{{ (myVotes / 10 ** 18).toFixed(2) }}

            <el-button size="small"
                       style="margin-left: 20px;background-image: linear-gradient(to right, #ed6868 0%, #ef72e2 50%, #ed6868 100%);"
                       class="button1" @click="Approve" v-show="allowanceNumber==0&& isStartVote">Approve
            </el-button>
            <el-button size="small"
                       style="margin-left: 20px;background-image: linear-gradient(to right, #ed6868 0%, #ef72e2 50%, #ed6868 100%);"
                       class="button1" @click="Campaign" v-show="allowanceNumber>100000000 &&isStartVote">Campaign
            </el-button>
            <el-button size="small"
                       style="margin-left: 20px;background-image: linear-gradient(to right, #ed6868 0%, #b057e0 50%, #ed6868 100%);"
                       class="button1" @click="startVote" v-show="!isStartVote">startVote
            </el-button>
            <el-button size="small"
                       style="margin-left: 20px;background-image: linear-gradient(to right, #ed6868 0%, #7700FF 50%, #ed6868 100%);"
                       class="button1" @click="endToParliament" v-show="isStartVote">endToParliament
            </el-button>
          </div>
        </div>
      </template>
      <template v-slot:content>
        <div v-for="(item,index) in parliamentList" :key="index">
          <TableItem :tableData="item" operate-g-name="Impeach" @operateGClick="impeachDialog = true"
                    />
        </div>
        <div class="no-data" v-show="parliamentList.length==0">
          <img src="../../assets/img/no-data.png" alt="">
        </div>
      </template>
    </RainbowPanel>
    <RainbowPanel class="committee-candidate">
      <template v-slot:name>
        Candidate
      </template>
      <template v-slot:content>
        <div v-for="(item,index) in camArr" :key="index">
          <TableItem :tableData="item" operate-g-name="delegate" @operateGClick="delegateDialog = true"
                     operateRName="vote" @operateRClick="openVoteDialog(item)"/>
        </div>
        <div class="no-data" v-show="camArr.length==0">
          <img src="../../assets/img/no-data.png" alt="">
        </div>
      </template>
    </RainbowPanel>
    <el-dialog
        title="VOTE"
        :visible.sync="isShowVote"
        width="400px"
    >
      <div class="input-box">
        <div class="name">votes:</div>
        <el-input v-model="voteNumber" type="number"></el-input>
      </div>
      <el-button @click="vote()">Vote</el-button>
    </el-dialog>
    <el-dialog
        title="Delegate"
        :visible.sync="delegateDialog"
        width="400px"
    >
      <div class="input-box">
        <div class="name">votes:</div>
        <el-input v-model="delegateNumber" type="number" placeholder="votes"></el-input>
      </div>
      <div class="input-box">
        <div class="name">address:</div>
        <el-input v-model="delegateAddress" type="text" placeholder="account address"></el-input>
      </div>
      <el-button @click="delegate()">delegate</el-button>
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
      impeachDialog:false,
      isStartVote: false,
      allowanceNumber: 0,
      delegateDialog: false,
      isShowVote: false,
      isOpenVoteDialog: false,
      tokenAddress: "",
      myMsManager: [{}],
      campaignMsUsers: [],
      parliament: [],
      parliamentList: [],
      camArr: [],
      myVotes: 0,
      voteNumber: 0,
      delegateNumber: 0,
      delegateAddress: '',
      currentVoteAccount: ""
    }
  },
  watch: {
    account() {
      this.getData()
    },
    parliament() {
      let arr = []
      this.parliament.forEach((item, index) => {
        let obj = {
          index: index + 1,
          nameObj: {
            title: "account",
          },
          infoArr: [
            {
              title: "account",
              data: item.account
            },
          ],
          detailArr: [],

        }
        arr.push(obj)

      })
      console.log(arr)
      this.parliamentList = arr
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
              data: item.tickets / 10 ** 18
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
      console.log(arr)
      this.camArr = arr
    }
  },
  methods: {
    startVote() {
      this.$store.dispatch("governanceDao/startVote", this.daoAddress).then(() => {
        this.$message.success("startVote success")
        this.getData()
      }).catch(err => {
        this.$message.error("startVote err" + err)
      })
    },
    openVoteDialog(item) {
      this.currentVoteAccount = this.campaignMsUsers[item.index - 1].account
      this.isShowVote = true
    },
    delegate() {
      console.log(this.delegateAddress)
      this.$store.dispatch("token/delegateVote", {
        address: this.tokenAddress,
        delegateNumber: (this.delegateNumber).toString() + "000000000000000000",
        delegateAddress: this.delegateAddress
      }).then(() => {
        this.$message.success("you can vote")
        this.delegateDialog = false
      })
    },
    vote() {
      this.$store.dispatch("governanceDao/voteToParliament", {
        address: this.daoAddress,
        tickets: this.voteNumber + "000000000000000000",
        user: this.currentVoteAccount
      }).then(() => {
        this.isShowVote = false
        this.getData()
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
    endToParliament() {
      this.$store.dispatch("governanceDao/endToParliament", eval(this.daoAddress)).then(() => {
        this.$message.success("applyParliament success")
        this.getData()
      }).catch(err => {
        this.$message.error("applyParliament err" + err)
      })
    },
    Approve() { //applyParliament
      console.log(this.tokenAddress, this.daoAddress)
      this.$store.dispatch("token/approve", {
        address: this.tokenAddress,
        contract: this.daoAddress
      }).then(() => {
        this.getData()
      })
    },
    Allowance() {
      this.$store.dispatch("token/allowance", {
        address: this.tokenAddress,
        contract: this.daoAddress
      }).then(res => {
        this.allowanceNumber = res
      })
    },
    Campaign() {
      this.$store.dispatch("governanceDao/applyParliament", eval(this.daoAddress)).then(() => {
        this.$message.success("applyParliament success")
        this.getData()
      }).catch(err => {
        this.$message.error("applyParliament err" + err)
      })
    },
    getParliament() {
      this.parliament = []
      this.$store.dispatch("governanceDao/getParliamentLength", {
        address: this.daoAddress,
      }).then(length => {
        console.log(length)
        for (let i = 0; i < length; i++) {
          this.$store.dispatch("governanceDao/getParliamentByIndex", {
            address: this.daoAddress,
            idx: i
          }).then(campaign => {
            this.parliament.push({
              account:campaign
            })
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
        this.tokenAddress = res.govToken
        this.isStartVote = res.startVote
        if (res.startVote) {
          this.getPriorVotes(res.proposalBlockNumber)
          this.Allowance()
        }
        this.getParliament()
        this.parliamentApplyRecords(res.voteId)
      }).catch(err => {
        this.$message.error("applyParliament err" + err)
      })
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
    if (!this.$route.params) {
      this.$router.push({name:"governance"})
    }
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.committeeDetail {
  .committee-candidate {
    margin-top: 20px;
    padding-bottom: 30px;
  }

  .committee-member {
    padding-bottom: 30px;
  }
}
</style>
