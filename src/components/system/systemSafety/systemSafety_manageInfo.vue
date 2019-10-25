<template>
  <div id="systemQuality_manageInfo">
    <div class="content">
      <div class="tab">
        <span @click="$router.push('/systemQuality_manage')">
          <i class="el-icon-arrow-left" style="font-size:0.18rem"></i>
          返回&nbsp;/&nbsp;
        </span>
        <!-- <span @click="$router.push('/systemQuality_home')">数据统计&nbsp;/&nbsp;</span> -->
        <span @click="$router.push('/systemQuality_manage')">整改单管理&nbsp;/&nbsp;</span>
        <span>详情</span>
      </div>
      <div class="status">
        <div class="box">
          <p class="text">{{indexData.status==1?'待整改':indexData.status==2?'待复查':indexData.status==3?'已完成':'超期未整改'}}</p>
          <p class="time">整改时间：{{indexData.safetyDeadline}}</p>
        </div>
      </div>
      <div class="tableBox">
        <div class="title">
          <span class="shu"></span>
          <span class="text">隐患明细</span>
        </div>
        <el-table :data="allTableData" stripe border>
          <el-table-column prop="problem" label="问题">
            <template slot-scope="scope">
              <div class="problem">
                <p>{{indexData.safetyDescribe}}</p>
                <p style="height:.23rem;overflow:hidden;">
                  <span
                    v-if="indexData.gradeName=='严重'"
                    class="problemRed problemTu"
                  >{{indexData.gradeName}}</span>
                  <span
                    v-else-if="indexData.gradeName=='轻微'"
                    class="problemBlue problemTu"
                  >{{indexData.gradeName}}</span>
                  <span
                    v-else-if="indexData.gradeName=='一般'"
                    class="problemYellow problemTu"
                  >{{indexData.gradeName}}</span>
                  <span v-else class="problemGreen problemTu">{{indexData.gradeName}}</span>
                  <span style="margin-left:0.05rem">{{indexData.areaName}}</span>
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="danger" label="隐患类型" width="185">
            <template slot-scope="scope">
              <div class="danger" style="line-height:0.7rem">{{indexData.hiddenName}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="examine" label="检查人 | 检查时间" width="275">
            <template slot-scope="scope">
              <div class="examine">
                <p>{{indexData.initiatorName}}</p>
                <p>{{indexData.initiatorTime}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="repair" label="整改人 | 责任分包公司" width="295">
            <template slot-scope="scope">
              <div class="repair">
                <p>{{indexData.rectifyName}}</p>
                <p>{{indexData.constructionName}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="整改期限" width="195">
            <template slot-scope="scope">
              <div class="time" style="line-height:0.7rem">{{indexData.safetyDeadline}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="185">
            <template slot-scope="scope">
              <div
                style="line-height:0.7rem;color:#3ada76"
                v-if="indexData.status== 3"
              >已完成</div>
              <div
                style="line-height:0.7rem;color:#feb37f"
                v-else-if="indexData.status==1"
              >待整改</div>
              <div
                style="line-height:0.7rem;color:#feb37f"
                v-else-if="indexData.status==2"
              >待复查</div>
              <div style="line-height:0.7rem;color:#ff7a81" v-else>超期未整改</div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <div style="line-height:0.7rem">
                <a @click="handleDelete(scope.row)">删除</a>
              </div>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
      <div class="searchBox">
        <div class="title">
          <span class="shu"></span>
          <span class="text">整改单基础信息</span>
        </div>

        <ul>
          <li>
            &#12288;检查人：
            <!-- <el-input v-model="jianChaPerson" placeholder="所有"></el-input> -->
            <el-select v-model="jianChaPerson" :disabled="disabled" placeholder="请选择检查人" clearable>
              <el-option
                v-for="(item, index) in people"
                :label="item.userName"
                :value="item.userId"
                :key="index"
              ></el-option>
            </el-select>
          </li>
          <li>
            &#12288;整改人：
            <!-- <el-input v-model="zhengGaiPerson" placeholder="所有"></el-input> -->
            <el-select v-model="zhengGaiPerson" :disabled="disabled" placeholder="请选择整改人" clearable>
              <el-option
                v-for="(item, index) in people"
                :label="item.userName"
                :value="item.userId"
                :key="index"
              ></el-option>
            </el-select>
          </li>
          <li>
            &#12288;复查人：
            <!-- <el-input v-model="fuChaPerson" placeholder="所有"></el-input> -->
            <el-select v-model="fuChaPerson" :disabled="disabled" placeholder="请选择复查人" clearable>
              <el-option
                v-for="(item, index) in people"
                :label="item.userName"
                :value="item.userId"
                :key="index"
              ></el-option>
            </el-select>
          </li>
          <li>
            &#12288;参与人：
            <!-- <el-input v-model="participation" placeholder="所有"></el-input> -->
            <el-select v-model="participation" multiple :disabled="disabled" placeholder="请选择参与人" clearable>
              <el-option
                v-for="(item, index) in people"
                :label="item.userName"
                :value="item.userId"
                :key="index"
              ></el-option>
            </el-select>
          </li>
          <li>
            检查日期：
            <el-date-picker v-model="initiatorTime" type="datetime" placeholder="请选择检查日期" clearable value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </li>

          <li>
            整改日期：
            <el-date-picker v-model="rectifyTime" :disabled="haveRectifyTime" type="datetime" placeholder="请选择整改日期" clearable value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </li>
          <li>
            检查区域：
            <!-- <el-input v-model="areaId" placeholder="请选择检查区域"></el-input> -->
            <el-select v-model="areaId" placeholder="请选择检查区域" clearable @change="areaIdChange">
              <el-option
                v-for="(item, index) in indexData.areaList"
                :label="item.areaNames"
                :value="item.areaId"
                :key="index"
              ></el-option>
            </el-select>
          </li>
          <li>
            复查日期：
            <el-date-picker v-model="reviewTime" :disabled="haveReviewTime" type="datetime" placeholder="请选择复查日期" clearable value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </li>

          <li>
            整改期限：
            <el-date-picker v-model="safetyDeadline" type="datetime" placeholder="请选择整改期限" clearable value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </li>
          <li>
            检查类型：
            <!-- <el-input v-model="hiddenId" placeholder="请选择检查类型"></el-input> -->
            <el-select v-model="hiddenId" placeholder="请选择检查类型" clearable>
              <el-option
                v-for="item in hiddenList"
                :label="item.hiddenName"
                :value="item.hiddenId"
                :key="item.hiddenId"
              ></el-option>
            </el-select>
          </li>
          <li></li>
          <li></li>
        </ul>
        <div class="li">
          整改要求：
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="textarea"></el-input>
        </div>
      </div>
      <div class="btn" @click="updateSafety">确定</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allTableData: [
        {
          number: 1,
          problem: "某某某工地没护栏",
          problemStatus: "严重",
          problemArea: "南山EPC创新工业园",
          danger: "施工用电",
          examine: "某某某",
          examineTime: "2019-01-01 20:11",
          repair: "伟业-某某某",
          repairSubpackage: "深圳市伟业建筑劳务有限公司",
          time: "2018-01-23",
          status: "复查通过"
        }
      ],

      safetyId: '', // 整改id
      getIdState: 0, // 调用一次获取url中的值
      indexData: '', // 页面数据
      disabled: true, // 下拉框是否可选择
      jianChaPerson: '', // 检查人
      zhengGaiPerson: '', // 整改人
      fuChaPerson: '', // 复查人
      participation: [], // 参与人
      initiatorTime: '', // 检查日期
      rectifyTime: '', // 整改日期
      areaId: '', // 检查区域
      reviewTime: '', // 复查日期
      safetyDeadline: '', // 整改期限
      hiddenId: '', // 检查类型
      textarea: '', // 整改要求
      people: [], // 人员列表
      hiddenList: '', //隐患列表
      submit: false, // 是否可提交
      haveRectifyTime: true, // 整改日期是否不可选
      haveReviewTime: true // 复查日期是否不可选
    }
  },
  created() {
    this.getSafetyId()
    this.getManagementDetails()
    this.getHiddenList()
  },
  methods: {
    // 获取实时监控页面传过来的值
    getSafetyId() {
        if (this.$route.query.id != undefined && this.getIdState == 0) {
            this.safetyId = this.$route.query.id
            this.getIdState = 1
        }
        // console.log(this.safetyId)
    },

    // 获取整改单管理详情
    getManagementDetails() {
      this.$axios.post(`/api/safetyPcApi/getManagementDetails?safetyId=${this.safetyId}`).then(
        res => {
          // console.log(res.data.data)
          this.indexData = res.data.data;
          this.initiatorTime = this.indexData.initiatorTime;
          this.rectifyTime = this.indexData.rectifyTime;
          this.areaId = this.indexData.areaId;  // 检查区域
          this.reviewTime = this.indexData.reviewTime
          this.safetyDeadline = this.indexData.safetyDeadline;
          this.textarea = this.indexData.safetyRequire;
          this.hiddenId = this.indexData.hiddenId; // 检查内容
          this.jianChaPerson = this.indexData.initiatorId;
          this.zhengGaiPerson = this.indexData.rectifyId;
          this.fuChaPerson = this.indexData.reviewId;
          if (this.indexData.makeId !== null) {
            this.participation = this.indexData.makeId;
            // console.log(this.participation)
          }
          if (this.rectifyTime !== null) {
            this.haveRectifyTime = false
          }
          if (this.reviewTime !== null) {
            this.haveReviewTime = false
          }
          if (this.areaId !== null) {
            this.areaIdChange()
          }
        }
      )
    },

    // 修改整改单
    updateSafety() {
      if (this.jianChaPerson == '') {
        this.submit = false;
        this.$message({
          message: '请填写检查人',
          type: 'warning'
        })
      } else if (this.zhengGaiPerson == ''){
        this.submit = false;
        this.$message({
          message: '请填写整改人',
          type: 'warning'
        })
      } else if (this.fuChaPerson == '') {
        this.submit = false;
        this.$message({
          message: '请填写复查人',
          type: 'warning'
        })
      } else if (this.initiatorTime == ''){
        this.submit = false;
        this.$message({
          message: '请填写检查日期',
          type: 'warning'
        })
      } else if (this.rectifyTime == '' && !this.haveRectifyTime){
        this.submit = false;
        this.$message({
          message: '请填写整改日期',
          type: 'warning'
        })
      } else if (this.areaId == ''){
        this.submit = false;
        this.$message({
          message: '请填写检查区域',
          type: 'warning'
        })
      } else if (this.safetyDeadline == ''){
        this.submit = false;
        this.$message({
          message: '请填写整改期限',
          type: 'warning'
        })
      } else if (this.hiddenId == null){
        this.submit = false;
        this.$message({
          message: '请填写检查类型',
          type: 'warning'
        })
      } else {
        this.submit = true;
      }
      if (this.reviewTime == null) {
        this.reviewTime = ''
      }
      if (this.participation == null) {
        this.participation = []
      }
      if (this.rectifyTime == null) {
        this.rectifyTime = ''
      }
      if (this.submit == true) {
        this.$axios
          .post(`/api/safetyPcApi/updateSafety?safetyId=${this.safetyId}&initiatorId=${this.jianChaPerson}&rectifyId=${this.zhengGaiPerson}&make=${this.participation}&areaId=${this.areaId}&safetyDeadline=${this.safetyDeadline}&hiddenId=${this.hiddenId}&safetyRequire=${this.textarea}&initiatorTime=${this.initiatorTime}&rectifyTime=${this.rectifyTime}&reviewTime=${this.reviewTime}&reviewId=${this.fuChaPerson}`)
          .then(res => {
            if (res.data.code == 0) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getManagementDetails()
            } else if (res.data.code == -1) {
              this.$message({
                message: '未整改，无法修改日期',
                type: 'warning'
              })
            } else {
              this.$message({
                message: '修改失败',
                type: 'warning'
              })
            }
          })
      }
    },

    // 检查区域选择
    areaIdChange() {
      if (this.areaId !== '') {
        this.disabled = false;
        for (let i = 0; i < this.indexData.areaList.length; i++) {
          if (this.indexData.areaList[i].areaId == this.areaId) {
            this.people = this.indexData.areaList[i].userList
          }
        }
        console.log(this.people)
      } else {
        this.disabled = true
      }
    },

    // 获取检查类型
    getHiddenList() {
      this.$axios
        .post(`/api/safetyPcApi/getHiddenList`)
        .then(res => {
          if (res.data.code == 0) {
            // console.log(res.data.data)
            this.hiddenList = res.data.data
          }
        })
    },
  }
};
</script>
<style lang="less">
#systemQuality_manageInfo {
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-shadow: 0 0 0.5rem -0.3rem #666;
    border-radius: 0.04rem;
    padding: 0.17rem 0.2rem 0.4rem 0.2rem;
    .tab {
      span {
        display: inline-block;
        height: 0.3rem;
        cursor: pointer;
        font-size: 0.16rem;
        line-height: 0.3rem;
      }
    }
    .status {
      margin-top: 0.2rem;
      height: 0.95rem;
      width: 100%;
      background-color: #f2f9ff;
      padding-top: 0.25rem;
      padding-left: 0.33rem;
      .text {
        font-size: 0.18rem;
        color: #3ea0ff;
        font-weight: 600;
      }
      .time {
        color: #4a4a4a;
        margin-top: 0.03rem;
        font-size: 0.16rem;
      }
    }
    .el-table {
      margin-top: 0.2rem;
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
          height: 0.7rem;
          color: #646464;
          font-size: 0.16rem;
        }
      }
    }
    .tableBox {
      margin-top: 0.35rem;
      .problem {
        padding-top: 0.12rem;
        .problemTu {
          display: inline-block;
          width: 0.54rem;
          height: 0.19rem;
          border-radius: 0.19rem;
          line-height: 0.19rem;
          color: #fff;
          text-align: center;
          font-size: 0.14rem;
        }
        .problemRed {
          background-color: #ff7a81;
        }
        .problemBlue {
          background-color: #0090ff;
        }
        .problemYellow {
          background-color: #feb37f;
        }
        .problemGreen {
          background-color: #3ada76;
        }
        .a {
          line-height: 0.7rem;
        }
      }
      .examine {
        padding-top: 0.12rem;
      }
      .repair {
        padding-top: 0.12rem;
      }
    }
    .title {
      font-size: 0.18rem;
      font-weight: 600;
      .shu {
        display: inline-block;
        width: 0.04rem;
        height: 0.18rem;
        background-color: #0090ff;
        transform: translateY(0.04rem);
      }
      .text {
        margin-left: 0.16rem;
      }
    }
    .searchBox {
      margin-top: 0.4rem;
      width: 100%;
      //   height: 1.4rem;
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
      .li {
        margin-top: 0.2rem;
        width: 3.8rem;
        font-size: 0.18rem;
        margin-left: 0.2rem;
        width: 7.87rem;
        .el-textarea__inner {
          width: 6.83rem;
          transform: translate(0.94rem, -0.25rem);
          border: 0.01rem solid #b6b6b6;
        }
      }
    }
    .btn {
      width: 1.61rem;
      height: 0.47rem;
      background-color: #ffd14f;
      border: 0.01rem solid #d4ad40;
      border-radius: 0.03rem;
      color: #fff;
      font-size: 0.2rem;
      text-align: center;
      line-height: 0.47rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 1rem;
      cursor: pointer;
      &:hover {
        color: #fff;
        background-color: #fcb928;
      }
    }
  }
}
</style>

