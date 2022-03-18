<template>
  <div class="proposal">
    <RainbowPanel>
      <template v-slot:name>
        <div class="proposal-header">
          <div class="name">
            Proposal
            <div class="status">
              {{ stageByIdx.get((proposal.status?proposal.status:1).toString()) }}
            </div>
          </div>
          <div class="time">
          </div>
        </div>
      </template>
      <template v-slot:content>
        <div class="proposal-status">
          <div class="schedule">
            <div class="line1">
              <div class="left">
                <span class="r-g-color">
                  {{ ((voteNumber / campaignMsUsersLength) * 100).toFixed(0) }}%
                </span>
                <span>
                  <strong class="r-g-color">
                     {{ voteNumber }}
                  </strong>
                 Agree
                </span>
              </div>
              <div class="right">
                 <span>
                  <strong class="r-orange-color">
                     {{ campaignMsUsersLength - voteNumber }}
                  </strong>
                 Refuse
                </span>
                <span class="r-orange-color">
                  {{ ((1 - (voteNumber / campaignMsUsersLength)) * 100).toFixed(0) }}%
                </span>
              </div>
            </div>
            <div class="line2">
              <div class="agree" :style="'width:' + 360* (voteNumber/campaignMsUsersLength) + 'px'"></div>
              <div class="refuse" :style="'width:' + 360* (1-(voteNumber/campaignMsUsersLength))+ 'px'"></div>
            </div>
            <div class="line3" v-if="proposal.status==1">
              <el-button size="mini" @click="parliamentsVoteProposal"> Agree</el-button>
            </div>
            <div class="line4" v-if="proposal.status==3">
              <el-button size="mini" @click="isShowOppose=true"> Refuse</el-button>
            </div>
          </div>
          <div class="vote-detail">

          </div>
          <div class="proposal-operating" v-if="proposal.status==2">
            <el-button size="mini">revocation</el-button>
            <el-button size="mini">entrust</el-button>
            <el-button size="mini">bazaar</el-button>
          </div>
        </div>
        <div class="r-line" style="background: #eaeaea;margin-top:30px;"></div>
        <div class="proposal-content">
          <div class="content-html">
            <div class="proposal-name">
              <strong>proposal id:{{ proposal.id }}</strong>
            </div>
            <div v-html="proposal.description"></div>
            <div class="r-line"></div>
            <div class="proposal-detail">
              <div class="left">
                <div class="proposal-people">
                  <div class="title">
                    <div class="dot"></div>
                    <strong>owner</strong>
                  </div>
                  <div class="title" style="display: flex;align-items: center;">
                    {{ proposal.owner }}
                  </div>
                </div>
                <div class="proposal-time">
                  <div class="title">
                    <div class="dot"></div>
                    <strong>proposal sub time</strong>
                  </div>
                  <div>
                    {{ new Date(proposal.creationTime * 1000) | formatDate }}
                  </div>
                </div>
                <div class="proposal-amount">
                  <div class="title">
                    <div class="dot"></div>
                    <strong>applyAmount</strong>
                  </div>
                  <div class="amount">
                    <strong> <span class="r-p-color"> {{ proposal.applyAmount | formatNumber }}</span> </strong>
                  </div>
                  <div class="title">
                    <div class="dot"></div>
                    <strong>depositAmount</strong>
                  </div>
                  <div class="amount">
                    <strong> <span class="r-p-color"> {{ proposal.depositAmount / 10**18 | formatNumber }}</span> </strong>
                  </div>
                  <div class="stage"  v-for="(item,index) in proposal.stage" :key="index">
                    <div> <strong>stage {{ index + 1}}</strong>
                      <strong class="r-p-color">
                      {{ (proposal.applyAmount / proposal.stage).toFixed(2)  |formatNumber }}
                      </strong></div>
                  </div>
                  <div class="operating" v-if="proposal.stageIndex==3">
                    <el-button size="mini">Draw</el-button>
                    <el-button size="mini">Report</el-button>
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="title">
                  <div class="dot"></div>
                  <strong>Timeline</strong>
                </div>
                <div class="step">
                  <el-steps :active="parseInt(proposal.status)" direction="vertical" finish-status="success">
                    <el-step title="Establish" :description="new Date(proposal.creationTime*1000) | formatDate"></el-step>
                    <el-step title="Voting period" :description="new Date((proposal.creationTime)*1000 ) | formatDate"></el-step>
                    <el-step title="Publicity period"
                             :description="new Date((parseInt(proposal.creationTime)+ 3*86400 )*1000) | formatDate"></el-step>
                    <el-step title="In execution"
                             :description="new Date((parseInt(proposal.creationTime)+10*86400)*1000 ) | formatDate"></el-step>
                    <el-step title="Finished"
                             :description="new Date((parseInt(proposal.creationTime)+20*86400)*1000 ) | formatDate"></el-step>
                  </el-steps>
                </div>
              </div>
            </div>
            <el-button v-if="proposal.status > 2" @click="toReport" size="small" style="margin-top: 20px;"
                      class="button1">
              sub report
            </el-button>
          </div>
          <div class="r-line"></div>
          <div class="discuss" v-if="discussArr>0">
            <div class="discuss-item" v-for="(item,index) in discussArr" :key="index">
              <div class="user-info">
                <img class="header"
                     :src="item.header"
                     alt="">
                <div>
                  <div class="name r-purple-color">
                    {{ item.name }}
                  </div>
                  <div class="time">
                    2021-03-15 11:01
                  </div>
                </div>
              </div>
              <div class="content">
                {{ item.content }}
              </div>
              <div class="like-drop">
                  <span>
                    <img src="../../assets/img/like.png" alt="">
                    {{ 1000000|formatNumber }}
                  </span>
                <span>
                    <img src="../../assets/img/drop.png" alt="">
                    {{ 1000000|formatNumber }}
                  </span>
              </div>
              <div class="r-line"></div>
            </div>
            <div class="more-box">
              <div class="more">
                MORE
              </div>
            </div>
          </div>
        </div>
        <div class="r-line"></div>

      </template>
    </RainbowPanel>


    <el-dialog
        title="votes"
        :visible.sync="isShowOppose"
        width="400px"
    >
      <div class="oppose-dialog">
        <el-input v-model="opposeAmount"></el-input>
        my votes：{{ myCampaignVote }}
        <el-button class="button1" @click="oppose">submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

let stageByIdx = new Map([
  ["1", "Voting period"],
  ["2", "Publicity period"],
  ["3", "In execution"],
  ["4", "In execution"],
])
export default {
  name: "proposal",
  data() {
    return {
      stageByIdx,
      isShowOppose: false,
      opposeAmount: 0,
      proposal: {
        status: 1,
        stageName: 'vote',
        htmlContent: ``,
      },
      campaignMsUsersLength:0,
      proposalStatus:1,
      discussArr: [],
      myVotes:0,
      myCampaignVote:0,
      voteNumber:0,
    }
  },
  computed: {
    ...mapGetters([
      'isConnected',
      'account'
    ]),
    daoAddress(){
      return this.$store.state.app.curDaoAddress
    }
  },
  watch: {},
  created() {
    if(!this.$route.params){
      this.$router.push({path:'/'})
    }
    this.proposal = this.$route.params.proposal
    this.memberNumber = this.$route.params.memberNumber
    this.getData()
  },
  methods: {
    getParliamentLength(){
      this.$store.dispatch("governanceDao/getParliamentLength", {
        address:this.daoAddress,
      }).then(length => {
        this.campaignMsUsersLength = length
      })
    },
    parliamentsAgree() {
      this.$store.dispatch("governanceDao/parliamentsAgree", {
        address: this.daoAddress,
        id: this.proposal.id
      }).then(res => {
        console.log(res)
        this.voteNumber = res
      })
    },
    parliamentsVoteProposal(){
      this.$store.dispatch("governanceDao/parliamentsVoteProposal", {
        address: this.daoAddress,
        stage: 0,
        id: this.proposal.id
      }).then(res => {
        console.log(res)
        this.getData()
      })
    },
    toReport() {
      this.$router.push({
        name: 'submitReport',
        params: {
          proposalId:this.proposal.proposalId
        }
      })
    },
    getCurrentStage(){
      this.$store.dispatch("governanceDao/getCurrentStage",{    address: this.daoAddress,
        id: this.proposal.id }).then(res=>{
          this.proposal.status = res
      })
    },
    getData() {
      this.getCurrentStage()
      this.getParliamentLength()
      this.parliamentsAgree()
    },
    oppose() {
      this.$store.dispatch("proposal/proposalPersonVote", {
        proposalId: this.proposal.proposalId,
        nodeId: this.proposal.nodeId,
        amount: this.opposeAmount
      }).then(() => {
        this.$message.success("success")
      }).catch((err) => {
        this.$message.error("error" + err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.proposal {
  text-align: left;

  .el-button {
    width: 80px;
    height: 30px;
    border-radius: 20px;
    color: white;
  }

  .r-line {
    background: #eaeaea;
    margin-top: 50px;
    height: 1px;
  }

  .proposal-header {
    display: flex;
    justify-content: space-between;

    .name {
      display: flex;
      font-weight: bold;

      .status {
        margin: 4px 0 0 10px;
        font-size: 12px;
        text-align: center;
        color: rgba(95, 220, 167);
        padding: 0 10px;
        height: 22px;
        line-height: 18px;
        background: rgba(94, 219, 166, 0.20);
        border: 1px solid rgba(95, 220, 167, 0.50);
        border-radius: 6px;
      }
    }

    .time {
      width: 240px;
      font-size: 14px;
      color: #736dff;
    }
  }

  .proposal-status {
    display: flex;

    .schedule {
      width: 360px;
      margin: 30px 0px 0 30px;
      .line1, .line2, .line3 {
        display: flex;
        justify-content: space-between;
      }

      .line2 {
        margin: 10px 0px;
        width: 360px;
        border-radius: 5px;
        overflow: hidden;

        .agree {
          background: linear-gradient(270deg, #64e4ae, #46b787);
        }

        .refuse {
          background: linear-gradient(270deg, #f15887, #fe9b86 63%);
        }

        > div {
          height: 6px;
        }
      }

      .line3 {
        .el-button:nth-child(2) {
          background: linear-gradient(90deg, #fe9b86, #f15887 100%);
          box-shadow: 0px 3px 5px 0px rgba(254, 151, 134, 0.50);
        }

        .el-button:nth-child(1) {
          background: linear-gradient(225deg, #64e4ae, #46b787);
          box-shadow: 0px 3px 5px 0px rgba(99, 226, 172, 0.50);
        }
      }

      .line4 {
        text-align: center;

        .el-button {
          background: linear-gradient(90deg, #fe9b86, #f15887 100%);
          box-shadow: 0px 3px 5px 0px rgba(254, 151, 134, 0.50);
        }
      }
    }

    .vote-detail {
      padding: 0 10px 0 40px;
      width: 460px;
      display: flex;
      justify-content: space-around;

      .votes-item {
        text-align: left;

        strong {

          font-weight: 700;
          font-size: 18px;
        }
      }
    }

    .proposal-operating {
      min-width: 330px;

      .el-button:nth-child(1) {
        background: linear-gradient(90deg, #fe9b86, #f15887 100%);
        box-shadow: 0px 3px 5px 0px rgba(254, 151, 134, 0.50);
      }

      .el-button:nth-child(2) {
        background: linear-gradient(225deg, #64e4ae, #46b787);
        box-shadow: 0px 3px 5px 0px rgba(99, 226, 172, 0.50);
      }

      .el-button:nth-child(3) {
        background: linear-gradient(225deg, #736dff, #a97fff);
        box-shadow: 0px 3px 5px 0px rgba(116, 109, 255, 0.30);
      }
    }
  }

  .proposal-content {
    margin-top: 30px;

    .dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      background: linear-gradient(225deg, #7700ff, #ed6868);
      border-radius: 50%;
    }

    .content-html {
      margin: 0 auto;
      width: 630px;

      .proposal-name {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        padding-bottom: 20px;
      }

      .r-line {
        margin-top: 30px;
        background: #eaeaea;
      }

      .proposal-detail {

        display: flex;
        justify-content: space-between;

        .title {
          padding: 10px 0;

          .name {

          }

          .dot {
            margin-right: 8px;
          }
        }

        .header {
          border-radius: 50%;
          width: 30px;
          height: 30px;
        }

        .proposal-amount {
          .amount {
            font-size: 18px;
          }

          .stage {
            margin-top: 10px;

            > div {
              padding-top: 8px;
            }
          }

          .operating {
            padding-top: 10px;

            .el-button:nth-child(1) {
              background: linear-gradient(90deg, #fe9b86, #f15887 100%);
              box-shadow: 0px 3px 5px 0px rgba(254, 151, 134, 0.50);
            }

            .el-button:nth-child(2) {
              background: linear-gradient(225deg, #736dff, #a97fff);
              box-shadow: 0px 3px 5px 0px rgba(116, 109, 255, 0.30);
            }
          }
        }

        .step {
          width: 160px;

          ::v-deep .el-step__title {
            font-size: 14px;
          }

          ::v-deep .el-step__icon {
            width: 20px;
            height: 20px;
          }

          ::v-deep .el-step__line {
            left: 9px;
          }

          ::v-deep .el-step__main {
            padding: 0;
          }
        }
      }
    }

    .discuss {
      width: 600px;
      margin: 30px auto;

      .discuss-item {
        text-align: left;
        margin-top: 20px;

        .user-info {
          display: flex;

          .header {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
          }

          .name {
            font-size: 14px;
          }

          .time {
            font-size: 12px;
            color: #999999;
          }
        }

        .content {
          margin-top: 14px;
          text-indent: 20px;
          font-size: 14px;
          line-height: 22px;
          color: #333333;
        }

        .like-drop {
          display: flex;
          justify-content: flex-end;
          height: 40px;

          span {
            width: 80px;
            justify-content: space-between;
            margin-left: 18px;
            display: flex;
            align-items: center;
          }

          img {
            width: 16px;
          }
        }

        .r-line {
          margin-top: 10px;
        }
      }

      .more-box {
        width: 100%;
        padding: 10px 0;
        display: flex;
        justify-content: center;

        .more {
          width: 70px;
          height: 26px;
          text-align: center;
          user-select: none;
          cursor: pointer;
          border: 1px solid #736dff;
          border-radius: 6px;
          line-height: 26px;
          color: #736dff;
        }
      }
    }
  }

  .submit-comments {
    width: 600px;
    margin: 40px auto;

    ::v-deep .el-textarea__inner {
      margin: 10px 0;
      background: #f8f8f8;
      border: 1px solid #eaeaea;
    }

    .el-button {
      width: 120px;
    }
  }

  .oppose-dialog {
    .el-button {
      width: 120px;
      height: 32px;
      margin: 20px 36% 0;
    }
  }
}
</style>
