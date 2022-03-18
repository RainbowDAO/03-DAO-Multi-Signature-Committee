<template>
  <div class="daoList">
    <RainbowPanel class="committee-candidate">
      <template v-slot:name>
        <div style="display: flex;justify-content: space-between">
          My Dao
          <el-button size="small" style="margin-left: 20px" class="button1" @click="$router.back()">BACK</el-button>
        </div>
      </template>
      <template v-slot:content>
        <div class="daoList-box" v-for="(item,index) in myDaoList" :key="index">
          <TableItem class="item" :tableData="item" operate-g-name="Choose" @operateGClick="chooseDao(item)"/>
        </div>
        <div class="no-data" v-show="myDaoList.length==0">
          <img src="../../assets/img/no-data.png" alt="">
        </div>
      </template>
    </RainbowPanel>
    <RainbowPanel class="committee-candidate" style="margin-top: 20px">
      <template v-slot:name>
        <div style="display: flex;justify-content: space-between">
          DAO LIST
          <el-button size="small" style="margin-left: 20px" class="button1" @click="$router.back()">BACK</el-button>
        </div>
      </template>
      <template v-slot:content>
        <div class="daoList-box" v-for="(item,index) in camArr" :key="index">
          <TableItem class="item" :tableData="item" operate-g-name="JOIN" @operateGClick="joinDao(item)"/>
        </div>
        <div class="no-data" v-show="camArr.length==0">
          <img src="../../assets/img/no-data.png" alt="">
        </div>
      </template>
    </RainbowPanel>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import TableItem from "../../components/TableItem";
export default {
  name: "daoList",
  components:{TableItem},
  data() {
    return {
      myDaoList:[],
      daoList: [],
      camArr:[],
      myDaoArr:[]
    }
  },
  computed:{
    ...mapGetters([
      'account',
    ]),
  },
  watch:{
    account(){
      this.getDao()
    },

    myDaoArr() {
      let arr = []
      this.myDaoArr.forEach((item, index) => {
        let obj = {
          index: index + 1,
          nameObj: {
            title: "NAME",
            data: item.name
          },
          infoArr: [
            {
              title: "daoAddress",
              data: item.address
            },
          ],
          detailArr: [

          ],

        }
        arr.push(obj)

      })
      console.log(arr)
      this.myDaoList = arr
    },
    daoList() {
      let arr = []
      console.log(this.daoList)
      this.daoList.forEach((item, index) => {
        let obj = {
          index: index + 1,
          nameObj: {
            title: "NAME",
            data: item.name
          },
          infoArr: [
            {
              title: "daoAddress",
              data: item.dao
            },
          ],
          detailArr: [

          ],

        }
        arr.push(obj)

      })
      console.log(arr)
      this.camArr = arr
    }
  },
  mounted() {
    if(this.account){
      this.getDao()
      this.getMyDao()
    }
  },
  methods: {
    chooseDao(item){
      this.$store.commit("app/SET_CURDAO", item.infoArr[0].data)
    },
    joinDao(item) {
      this.$store.dispatch("daoFactory/joinDao",this.daoList[item.index - 1].dao).then(res => {
        console.log(res)
        this.$message("success")
      })
    },
    getMyDao(){
      this.$store.dispatch("daoFactory/getUserDaoLength").then(length => {
        for (let i =0;i<length;i++){
          this.$store.dispatch("daoFactory/getUserDaoByIndex", i).then(address => {
            this.myDaoArr.push({
              address:address
            })
          })
        }
      })

    },
    getDao() {
      this.daoList = []
      this.$store.dispatch("daoFactory/getDaoCount").then(length => {
        console.log(length)
        for (let i = 0; i < length; i++) {
          this.$store.dispatch("daoFactory/daos", i).then(res => {
            this.daoList.push(res)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.committee-candidate{
  padding-bottom: 60px;
  .daoList-box{
    .item{
      margin-top: 20px;
    }
  }
}
</style>
