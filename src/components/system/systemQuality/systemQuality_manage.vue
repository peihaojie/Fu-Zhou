<template>
  <div id="systemQuality_manage">
    <div class="content">
      <div class="searchBox">
        <ul>
          <li>
            整改状态：
            <!-- <el-input v-model="status" placeholder="所有"></el-input> -->
            <el-select placeholder="请选择" v-model="status" clearable>
              <el-option
                v-for="(item, index) in options"
                :label="item.label"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </li>
          <li>
            创建时间：
            <!-- <el-input v-model="creatTime" placeholder="所有"></el-input> -->
            <el-date-picker
              v-model="creatTime"
              placeholder="请选择日期"
              type="date"
              value-format="yyyy-MM-dd"
              clearable
            ></el-date-picker>
          </li>
          <li>
            &#12288;检查人：
            <el-input v-model="jianChaPerson"></el-input>
          </li>
          <li>
            责任分包：
            <el-select v-model="responsibility" placeholder="所有公司" clearable>
              <el-option
                v-for="item in dutyOptions"
                :key="item.constructionId"
                :label="item.constructionName"
                :value="item.constructionId"
              ></el-option>
            </el-select>
            <!-- <el-input v-model="fenBao"></el-input> -->
          </li>
          <li>
            &#12288;整改人：
            <el-input v-model="zhengGaiPerson"></el-input>
          </li>
          <li>
            &#12288;复查人：
            <el-input v-model="fuChaPerson"></el-input>
          </li>
          <li></li>
          <li></li>
        </ul>
        <div class="btn" @click="getManagementList">搜索</div>
      </div>
      <div class="tableBox">
        <el-table :data="allTableData" stripe border>
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column type="index" label="序号" width="70" :index="indexMethod"></el-table-column>
          <el-table-column prop="safetyId" label="整改单编号" width="145"></el-table-column>
          <el-table-column prop="initiatorName" label="检查人" width="104"></el-table-column>
          <el-table-column prop="constructionName" label="责任分包公司" width="219"></el-table-column>
          <el-table-column prop="status" label="整改状态" width="135">
            <template slot-scope="scope">
              <div
                class="status"
                style="color:#3ada76"
                v-if="scope.row.status==3"
              >已完成</div>
              <div
                class="status"
                style="color:#feb37f"
                v-else-if="scope.row.status==1"
              >待整改</div>
              <div
                class="status"
                style="color:#feb37f"
                v-else-if="scope.row.status==2"
              >待复查</div>
              <div
                class="status"
                style="color:#ff7a81"
                v-else
              >超期未整改</div>
              <!-- <div v-else>{{scope.row.zhengGaiStatus}}</div> -->
            </template>
          </el-table-column>
          <el-table-column prop="initiatorTime" label="创建时间" width="244"></el-table-column>
          <el-table-column label="操作" align="right">
            <template slot-scope="scope">
              <a class="a" @click="getInfo(scope.row.safetyId)">编辑</a>
              <a class="a" @click="deleteSafety(scope.row.safetyId)">删除</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="fenye">
        <!-- 分页的两个事件 -->

        <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange"-->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="pageTotal"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: "",
      creatTime: "",
      jianChaPerson: "",
      responsibility: "",
      zhengGaiPerson: "",
      fuChaPerson: "",
      allTableData: [],

      pageNum: 1, // 当前页
      pageSize: 15, // 每页显示条数
      pageTotal: 0, // 总条数
      differentiate: 2, // 质量监督
      projectId: '', // 项目id
      dutyOptions: '', // 分包公司
      options:[{
        value: 1,
        label: '待整改'
      },{
        value: 2,
        label: '待复查'
      },{
        value: 3,
        label: '已完成'
      },{
        value: 4,
        label: '超时未整改'
      }]
    };
  },
  created() {
    this.getProjectId()
    this.getManagementList()
    this.getInformationList()
  },
  methods: {
    //   行点击事件
    getInfo(safetyId) {
      this.$router.push(`/systemQuality_manageInfo?id=${safetyId}`);
    },

    // 获取项目id
    getProjectId() {
      this.projectId = sessionStorage.getItem('pid')
    },

    // 序号
    indexMethod(index) {
      return (this.pageNum-1)*this.pageSize+index+1
    },

    // 翻页
    handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
        this.pageNum = val
        this.getManagementList()
    },

    // 获取整改单管理列表
    getManagementList() {
      this.$axios.post(`/api/safetyPcApi/getManagementList?projectId=${this.projectId}&differentiate=${this.differentiate}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&status=${this.status}&initiatorTime=${this.creatTime}&initiatorName=${this.jianChaPerson}&rectifyName=${this.zhengGaiPerson}&constructionId=${this.responsibility}`).then(
        res => {
          // console.log(res.data)
          this.allTableData = res.data.data
          this.pageTotal = res.data.total
        }
      )
    },

    // 整改单管理删除
    deleteSafety(safetyId) {
      this.$axios.post(`/api/safetyPcApi/deleteSafety?safetyId=${safetyId}`).then(
        res => {
          // console.log(res.data)
          if (res.data.code == 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getManagementList()
          } else {
            this.$message({
              message: '删除失败',
              type: 'error'
            })
          }
        }
      )
    },

    // 获取分包单位
    getInformationList() {
      this.$axios
        .post(`/api/safetyPcApi/getInformationList?projectId=${this.projectId}`)
        .then(res => {
          // console.log(res)
          if (res.data.code == 0) {
            // console.log(res.data.data)
            this.dutyOptions = res.data.data
          }
        })
    }
  }
};
</script>
<style lang="less">
#systemQuality_manage {
  .content {
    position: relative;
    width: 100%;
    height: 9.5rem;
    background-color: #fff;
    box-shadow: 0 0 0.5rem -0.3rem #666;
    border-radius: 0.04rem;
    padding: 0.17rem 0.2rem 0.4rem 0.2rem;
    .searchBox {
      width: 100%;
      height: 1.4rem;
      background-color: #fff;
      position: relative;
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding-left: 0.2rem;
        li {
          margin-top: 0.2rem;
          width: 3.8rem;
          font-size: 0.18rem;
          .el-input {
            width: 2.58rem;
            height: 0.38rem;
          }
          input {
            width: 2.58rem;
            height: 0.38rem;
            border: 0.01rem solid #b6b6b6;
            border-radius: 0.03rem;
          }
        }
      }
      .btn {
        width: 1.61rem;
        height: 0.38rem;
        background-color: #ffd14f;
        border: 0.01rem solid #d4ad40;
        border-radius: 0.03rem;
        color: #fff;
        font-size: 0.2rem;
        text-align: center;
        line-height: 0.38rem;
        position: absolute;
        right: 0.28rem;
        bottom: 0.25rem;
        cursor: pointer;
        &:hover {
          color: #fff;
          background-color: #fcb928;
        }
      }
    }
    .el-table {
      width: 16.38rem;
      th {
        padding: 0;
        div {
          color: #000;
          height: 0.35rem;
          line-height: 0.35rem;
          background-color: #c5e8ff;
          font-size: 0.16rem;
        }
      }
      td {
        padding: 0;
        div {
          height: 0.35rem;
          color: #646464;
          line-height: 0.35rem;
          font-size: 0.16rem;
        }
      }
    }
    .tableBox {
      .a {
        margin-left: 0.2rem;
      }
    }
    .fenye {
      position: absolute;
      right: 0.6rem;
      bottom: 0.3rem;
    }
  }
}
</style>
