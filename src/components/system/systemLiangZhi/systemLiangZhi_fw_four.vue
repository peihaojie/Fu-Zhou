<template>
  <div id="fw_four">
    <div class="content-box">
      <div class="title">工作汇报</div>

      <!-- 搜索栏 -->
      <div class="search-box">
        <div class="left-box">
          <ul>
            <li>
              <span>类型：</span>
              <input type="text">
            </li>
            <li class="date">
              <span>&#12288;&#12288;日期：</span>
              <el-date-picker
                v-model="dateValue"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </li>
            <li>
              <span class="margin">生成人：</span>
              <input type="text">
            </li>
          </ul>
        </div>
        <a class="search-button">搜索</a>
      </div>
      <!-- 主体区域 -->
      <div class="main-box">
        <!-- 功能栏 -->
        <div class="button-box">
          <a class="contract" @click="dialogClick">
            <i class="icon"></i>
            生成报表
          </a>
          <a class="delete">
            <i class="icon"></i>
            删除
          </a>
          <a class="derive" @click="deriveClick()">
            <i class="icon"></i>
            导出
          </a>
        </div>
        <!-- 列表 -->
        <div class="table-box">
          <el-table :data="tableData" stripe border>
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column type="index" label="序号" width="100" :index="indexMethod"></el-table-column>
            <el-table-column prop="reportDesignation" label="报告名称" width="400"></el-table-column>
            <el-table-column prop="reportName" label="生成人" width="150"></el-table-column>
            <el-table-column prop="reportDate" label="生成时间" width="300"></el-table-column>
            <el-table-column label="类型" width="100">
              <template slot-scope="scope">
                <div>{{scope.row.reportType==2?'月报':scope.row.reportType==1?'周报':'日报'}}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="right">
              <template slot-scope="scope">
                <el-button type="text" size="small">查看</el-button>
                <el-button type="text" size="small" @click="deleteClick(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="paging-box">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[15, 30, 45]"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="pageTotal"
          ></el-pagination>
        </div>
      </div>
      <!-- 生产报表 -->
      <div class="dialog-box" v-show="dialogShow">
        <div class="title">
          生成报表
          <a class="close" @click="dialogClick">
            <i class="el-icon-close"></i>
          </a>
        </div>
        <div class="form">
          <ul>
            <li>
              <div>
                <span>
                  选择类型
                  <div class="required">*</div>
                </span>
                <el-select v-model="reportType" placeholder="请选择">
                  <el-option
                    v-for="item in statementType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </li>
            <li>
              <div>
                <span>
                  选择日期
                  <div class="required">*</div>
                </span>
                <el-date-picker
                  v-model="time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </div>
            </li>
            <li>
              <div>
                <span>
                  报告名称
                  <div class="required">*</div>
                </span>
                <input type="text" class="name" v-model="reportDesignation">
              </div>
            </li>
          </ul>
          <div class="wenti">
            <img src="../../../../static/images/fw_jiantou.jpg">
            <div class="left">
              <p>两制问题</p>
              <textarea v-model="issue" cols="30" rows="10" placeholder="两制工作中遇到的问题......."></textarea>
            </div>
            <div class="right">
              <p>解决方案</p>
              <textarea v-model="solution" cols="30" rows="10" placeholder="遇到问题的解决办法......."></textarea>
            </div>
          </div>
          <div class="bz">
            <p>备注</p>
            <textarea v-model="remark" cols="30" rows="10" placeholder="请输入备注......."></textarea>
          </div>
        </div>

        <div class="confirm">
          <a class="button" @click="getAddReport()">确定</a>
        </div>
      </div>
      <!-- 遮罩层 -->
      <div class="shade-box" v-show="dialogShow"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [], // 表格数据
      currentPage: 1, // 当前页码
      dialogShow: false, // 新增单位对话框状态
      statementType: [
        {
          value: 0,
          label: "日报"
        },
        {
          value: 1,
          label: "周报"
        },
        {
          value: 2,
          label: "月报"
        }
      ], // 报表类型选项
      startDate: "", // 入场日期
      finishDate: "", // 退场日期
      dateValue: "", // 日期

      projectId: '', // 项目id
      userName: '', // 报告人
      pageTotal: 0, // 总条数
      pageNum: 1, // 当前页
      pageSize: 15, // 每页显示条数
      time: '', // 选择日期值
      beginTime: '2019-08-01', // 报告开始时间
      finishTime: '2019-08-02', // 报告结束时间
      reportDesignation: '', // 报告名称
      reportType: '', // 报表类型
      issue: '', // 两制问题
      solution: '', // 解决方案
      remark: '', // 备注
    };
  },
  created() {
    this.getProjectId()
    this.getUserName()
    this.getReportList()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    // 序号
    indexMethod(index) {
      return (this.pageNum - 1) * this.pageSize + index + 1;
    },

    // 新增单位对话框状态切换
    dialogClick() {
      this.dialogShow = !this.dialogShow;
    },

    // 获取项目id
    getProjectId() {
      this.projectId = sessionStorage.getItem(`pid`)
    },

    // 获取用户名
    getUserName() {
      this.userName = sessionStorage.getItem('userName')
    },

    // 获取报告列表
    getReportList() {
      this.$axios.post(`/api/baogao/select?projectId=${this.projectId}&pageSize=${this.pageSize}&pageNum=${this.pageNum}`).then(
        res => {
          // console.log(res.data)
          this.tableData = res.data.data.rows
          this.pageTotal = res.data.data.total 
        }
      )
    },

    // 添加报告
    getAddReport() {
      if (this.reportDesignation&&(this.reportType==0||this.reportType)&&this.issue&&this.solution) {
        this.$axios.post(`/api/baogao/add?beginTime=${this.beginTime}&finishTime=${this.finishTime}&reportDesignation=${this.reportDesignation}&reportName=${this.userName}&reportType=${this.reportType}&issue=${this.issue}&solution=${this.solution}&remark=${this.remark}&projectId=${this.projectId}`).then(
          res => {
            // console.log(res.data)
            if (res.data.data == 1) {
               this.$message({
                  type: "success",
                  message: "生成成功"
                })
                this.getReportList()
                this.dialogShow = false
            } else {
              this.$message({
                message: "生成失败",
                type: "error"
              });
            }
          }
        )
      } else {
        this.$message({
          message: "输入框不得为空",
          type: "error"
        });
      }
    },

    // 删除
    deleteClick(id) {
      this.$confirm("是否要删除资料？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // console.log(id)
        this.$axios.post(`/api/baogao/delete?id=${id}`).then(
          res => {
            // console.log(res.data)
            if (res.data.msg == '删除成功') {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getReportList()
            } else {
              this.$message({
                message: "删除失败",
                type: "error"
              });
            }
          }
        )
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      })
    },

    // 导出
    deriveClick() {
      location.href=`http://47.106.71.3:8080/api/baogao/export?projectId=${this.projectId}`
    }
  }
};
</script>
<style lang="less">
#fw_four {
  .content-box {
    border-radius: 0.04rem;
    background-color: #fff;
    box-shadow: 0 0 0.5rem -0.3rem #666;
    .title {
      font-size: 0.24rem;
      width: 100%;
      text-align: center;
      font-weight: bold;
      line-height: 0.6rem;
    }

    .search-box {
      height: 0.9rem;
      padding: 0 0.2rem;
      border-bottom: 0.1rem solid #f7f7f7;
      .left-box {
        float: left;
        height: 0.8rem;
        ul {
          li {
            float: left;
            margin-right: 0.35rem;
            span {
              float: left;
              height: 0.8rem;
              font-size: 0.18rem;
              line-height: 0.8rem;
            }
            input {
              float: left;
              width: 3.6rem;
              height: 0.4rem;
              margin-top: 0.2rem;
              padding-left: 0.1rem;
              border-radius: 0.02rem;
              vertical-align: middle;
              border: 0.01rem solid #b6b6b6;
            }
          }
          .date {
            margin-left: -0.1rem;
            .el-date-editor {
              vertical-align: middle;
              margin-top: 0.2rem;
              width: 3.6rem;
              height: 0.4rem;
              overflow: hidden;
              border: 0.01rem solid #b6b6b6;
              span {
                padding: 0;
                width: 0.28rem;
                padding-left: 0.1rem;
              }
              input {
                margin-bottom: 0.2rem;
                border: 0;
                width: 0.95rem;
              }
            }
          }
        }
      }
      .search-button {
        float: right;
        color: #fff;
        height: 0.4rem;
        width: 1.63rem;
        font-size: 0.2rem;
        margin-top: 0.2rem;
        text-align: center;
        transition: all 0.5s;
        line-height: 0.38rem;
        border-radius: 0.02rem;
        background-color: #ffd14f;
        border: 0.01rem solid #d4ad40;
        &:hover {
          background-color: #d4ad40;
        }
      }
    }
    .main-box {
      padding: 0.2rem 0.2rem 0.25rem 0.2rem;
      .button-box {
        height: 0.3rem;
        a {
          float: left;
          height: 0.3rem;
          color: #0090ff;
          font-size: 0.14rem;
          transition: all 0.5s;
          margin-right: 0.2rem;
          line-height: 0.28rem;
          border-radius: 0.02rem;
          padding-right: 0.09rem;
          border: 0.01rem solid #0090ff;
          &:hover {
            color: #fff;
            background-color: #0090ff;
          }
          .icon {
            width: .37rem;
            height: .28rem;
            transition: all .5s;
            display: inline-block;
            vertical-align: middle;
            background-repeat: no-repeat;
            background-position: center center;
          }
        }
        .derive {
            .icon {
                background-image: url('../../../../static/images/system-derive.png');
            }
            &:hover {
                .icon {
                    background-image: url('../../../../static/images/system-deriveHover.png');
                }
            }
        }
        .contract {
            .icon {
                background-image: url('../../../../static/images/system-contract.png');
            }
            &:hover {
                .icon {
                    background-image: url('../../../../static/images/system-contractHover.png');
                }
            }
        }
        .delete {
            .icon {
                background-image: url('../../../../static/images/system-delete.png');
            }
            &:hover {
                .icon {
                    background-image: url('../../../../static/images/system-deleteHover.png');
                }
            }
        }
      }
      .table-box {
        width: 100%;
        margin-top: 0.2rem;
        min-height: 5.6rem;
        .el-table {
          width: 16.28rem;
          // width: 100%;
          th {
            padding: 0;
            div {
              color: #4a4a4a;
              height: 0.4rem;
              line-height: 0.4rem;
              background-color: #c5e8ff;
              font-size: 0.16rem;
            }
          }
          td {
            padding: 0;
            div {
              height: 0.4rem;
              font-size: 0.16rem;
              color: #646464;
              line-height: 0.4rem;
              .el-button {
                span {
                  font-size: 0.16rem;
                  color: #2323ff;
                  border-bottom: 1px solid #2323ff;
                }
                &:hover {
                  span {
                    font-size: 0.16rem;
                    color: #4545c5;
                    border-bottom: 1px solid #4545c5;
                  }
                }
              }
            }
          }
        }
      }
      .paging-box {
        width: 100%;
        height: 0.32rem;
        margin-top: 0.2rem;
        .el-pagination {
          float: right;
        }
      }
    }
    .dialog-box {
      left: 50%;
      top: 0.22rem;
      z-index: 200;
      width: 10.5rem;
      height: 9.1rem;
      overflow: hidden;
      position: absolute;
      border-radius: 0.1rem;
      transform: translate(-50%);
      background-color: #fefefe;
      .title {
        color: #fff;
        height: 0.6rem;
        font-size: 0.24rem;
        line-height: 0.6rem;
        text-align: center;
        position: relative;
        font-weight: bolder;
        background: linear-gradient(to right, #6cc4ff, #489cff);
        a {
          top: 50%;
          right: 0.2rem;
          color: #fff;
          position: absolute;
          transform: translateY(-50%);
        }
      }
      .form {
        height: 7.7rem;
        padding-left: 0.43rem;
        ul {
          li {
            display: flex;
            height: 0.71rem;
            padding-top: 0.3rem;
            margin-left: -0.4rem;
            > div {
              width: 10.56rem;
              > span {
                width: 1.72rem;
                height: 0.41rem;
                font-size: 0.16rem;
                text-align: right;
                position: relative;
                line-height: 0.41rem;
                padding-right: 0.32rem;
                display: inline-block;
                .required {
                  top: -0.01rem;
                  right: 0.22rem;
                  color: #f00;
                  position: absolute;
                }
              }
              .el-select {
                width: 8.06rem;
                input {
                  width: 8.06rem;
                  height: 0.41rem;
                  padding-left: 0.1rem;
                  border-radius: 0.02rem;
                  border: 0.01rem solid #b1b1b1;
                }
              }
              .name {
                width: 8.06rem;
                height: 0.41rem;
                padding-left: 0.1rem;
                border-radius: 0.02rem;
                border: 0.01rem solid #b1b1b1;
              }
              .el-date-editor {
                width: 8.06rem;
                height: 0.41rem;
                border: 0.01rem solid #b1b1b1 !important;
                input {
                  padding-left: 0.3rem;
                }
              }
            }
          }
        }
        .wenti {
          position: relative;
          margin-top: 0.22rem;
          height: 2.53rem;
          img {
            position: absolute;
            left: 49%;
            transform: translateX(-70%);
            top: 1.35rem;
          }
          .left {
            float: left;
            width: 4.5rem;
            p {
              width: 1.72rem;
              height: 0.41rem;
              font-size: 0.16rem;
              text-align: center;
              position: relative;
              line-height: 0.41rem;
              padding-right: 0.32rem;
            }
            textarea {
              padding-left: 0.1rem;
              margin-top: 0.05rem;
              width: 4.3rem;
              height: 2rem;
              border: 1px solid #acabab;
              margin-left: 0.35rem;
              border-radius: 0.04rem;
              &::placeholder {
                color: #ccc;
              }
            }
          }
          .right {
            float: left;
            width: 4.5rem;
            margin-left: 0.2rem;
            p {
              width: 1.72rem;
              height: 0.41rem;
              font-size: 0.16rem;
              text-align: center;
              position: relative;
              line-height: 0.41rem;
              padding-right: 0.32rem;
            }
            textarea {
              padding-left: 0.1rem;
              margin-top: 0.05rem;
              width: 4.3rem;
              height: 2rem;
              border: 1px solid #acabab;
              margin-left: 0.35rem;
              border-radius: 0.04rem;
              &::placeholder {
                color: #ccc;
              }
            }
          }
        }
        .bz {
          position: relative;
          //   margin-top: 0.22rem;
          p {
            width: 1.72rem;
            height: 0.41rem;
            font-size: 0.16rem;
            text-align: center;
            position: relative;
            line-height: 0.41rem;
            padding-right: 0.62rem;
          }
          textarea {
            padding-left: 0.1rem;
            width: 9rem;
            height: 2rem;
            border: 1px solid #acabab;
            margin-left: 0.35rem;
            border-radius: 0.04rem;
            &::placeholder {
              color: #ccc;
            }
          }
        }
      }
      .confirm {
        height: 0.8rem;
        background-color: #f8f8f8;
        border-top: 0.01rem solid #dedede;
        .button {
          color: #fff;
          display: block;
          width: 1.63rem;
          height: 0.49rem;
          margin: 0 auto;
          font-size: 0.2rem;
          margin-top: 0.15rem;
          text-align: center;
          line-height: 0.47rem;
          transition: all 0.5s;
          border-radius: 0.02rem;
          background-color: #ffd14f;
          border: 0.01rem solid #d9b759;
          &:hover {
            background-color: #d9b759;
          }
        }
      }
    }
    .shade-box {
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      height: 100%;
      position: fixed;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
