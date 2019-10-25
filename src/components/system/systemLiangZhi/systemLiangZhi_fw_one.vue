<template>
  <div id="fw_one">
    <!-- <input type="checkbox" name="vehicle" value="Bike" /> -->
    <div class="content">
      <div class="title">项目信息</div>
      <div class="table-box">
        <el-table :data="tableData" stripe border>
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column prop="number" label="序号" width="100"></el-table-column>
          <el-table-column prop="name" label="资料名称" width="400"></el-table-column>
          <el-table-column prop="person" label="上传人" width="130"></el-table-column>
          <el-table-column prop="time" label="上传时间" width="200"></el-table-column>
          <el-table-column prop="status" label="状态" width="80" sortable="custom">
            <template slot-scope="scope">
              <div
                :class="scope.row.status=='已上传'?'green-color':scope.row.status=='未上传'?'red-color':''"
              >{{ scope.row.status }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="right">
            <template slot-scope="scope">
              <el-button @click="openUploading(scope.row.id)" type="text" size="small">上传</el-button>
              <!-- <el-button type="text" size="small" v-if="scope.row.status=='已上传'">编辑</el-button> -->
              <el-button
                type="text"
                size="small"
                v-if="scope.row.status=='已上传'"
                @click="getParticulars(scope.row.id);lookInfo=true"
              >点击查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="fenye">
        <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange"-->
        <!-- <el-pagination
          :current-page="1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="8"
        ></el-pagination> -->
      </div>
      <!-- 上传弹框 -->
      <div id="uploading">
        <el-dialog :title="uploadingTitle" :visible.sync="uploading" width="34.5%">
          <div v-if="uploadingTitle=='工资足额发放表'">
            <span class="checkDate">
              选择日期
              <span style="color:red">*</span>
            </span>
            <el-date-picker type="date" placeholder="选择日期" v-model="gongZidate"></el-date-picker>
          </div>
          <div v-if="uploadingTitle=='保障维权信息公告牌（栏）'">
            <span class="checkDate">
              选择日期
              <span style="color:red">*</span>
            </span>
            <el-date-picker type="date" placeholder="选择日期" v-model="weiQuandate"></el-date-picker>
          </div>
          <div class="top">
            <div class="name">
              上传附件
              <span
                style="color:red"
                v-if="uploadingTitle=='工资足额发放表' || uploadingTitle=='保障维权信息公告牌（栏）'"
              >*</span>
            </div>
            <div class="checkImg">
              <div class="lxSb">
                <input type="file" class="lxSbfile" @change="fileUp" />
              </div>
              <!-- <div class="lxsupserSb" v-if="file !=''">
                <div class="info">
                  <span class="text">选 中 1 个 文 件，共 120 K。</span>
                  <el-tooltip content="最多一次性添加12张图片！" placement="top">
                    <span class="addBtn">
                      继续添加
                      <input type="file" class="lxSbfile" @change="fileUp" />
                    </span>
                  </el-tooltip>
                </div>
                <div class="imgLook">
                  <div>
                    <img
                      src="https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=220ca2dacafdfc03e578e4beec04e0a9/242dd42a2834349be9cb3aa1c0ea15ce37d3bec1.jpg"
                    />
                    <img src="../../../../static/images/fw_upImg2.jpg" />
                  </div>
                </div>
              </div> -->
            </div>
          </div>
          <div class="bottom">
            <div class="name">添加备注</div>
            <textarea v-model="remark" class="bz" cols="86" rows="10" placeholder="请输入备注信息......."></textarea>
          </div>
          <span slot="footer" class="dialog-footer">
            <button @click="uploadingClick" class="uploadingBtn">确认上传</button>
            <button @click="uploading = false" class="closeBtn">取 消</button>
          </span>
        </el-dialog>
      </div>
      <!-- 查看弹框 -->
      <div id="lookInfo">
        <el-dialog :title="lookInfoTitle" :visible.sync="lookInfo" width="45%">
          <div class="lookInfoTable">
            <el-table :data="lookInfoTable" stripe>
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column type="index" label="序号" width="100" :index="indexMethod" align="center"></el-table-column>
              <el-table-column prop="fileName" label="文件名" width="300" align="center"></el-table-column>
              <el-table-column prop="uploadingDate" label="上传时间" width="200" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <!-- <el-button type="text" size="small">查看</el-button> -->
                  <el-button type="text" size="small" @click="downloadClick(scope.row.filePath)">下载</el-button>
                  <!-- <el-button type="text" size="small" :info="scope.row">编辑</el-button> -->
                  <el-button type="text" size="small" :info="scope.row" @click="deleteClick(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="lookInfoFenye">
            <!-- @size-change="handleSizeChange"
            @current-change="handleCurrentChange"-->
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="pageToral"
            ></el-pagination>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          number: 1, // 序号
          name: "开工证明", // 资料名称
          person: "某某某", // 上传人
          time: "2019-04-29", // 上传时间
          status: "已上传", // 状态
          id: "" // id
        },
        {
          number: 2, // 序号
          name: "施工总承包合同", // 资料名称
          person: "某某某", // 上传人
          time: "2019-04-29", // 上传时间
          status: "未上传", // 状态
          id: ""
        },
        {
          number: 3, // 序号
          name: "工资保证金", // 资料名称
          person: "某某某", // 上传人
          time: "2019-04-29", // 上传时间
          status: "已上传", // 状态
          id: ""
        },
        {
          number: 4, // 序号
          name: "保障维权信息公告牌（栏）", // 资料名称
          person: "某某某", // 上传人
          time: "2019-04-29", // 上传时间
          status: "已上传", // 状态
          id: ""
        },
        {
          number: 5, // 序号
          name: "每月考勤表", // 资料名称
          person: "某某某", // 上传人
          time: "2019-04-29", // 上传时间
          status: "已上传", // 状态
          id: ""
        },
        {
          number: 6, // 序号
          name: "工资足额发放表", // 资料名称
          person: "某某某", // 上传人
          time: "2019-04-29", // 上传时间
          status: "已上传", // 状态
          id: ""
        },
        {
          number: 7, // 序号
          name: "劳务工工资专用专户备案", // 资料名称
          person: "某某某", // 上传人
          time: "2019-04-29", // 上传时间
          status: "已上传", // 状态
          id: ""
        },
        {
          number: 8, // 序号
          name: "劳务工工资专户监管协议", // 资料名称
          person: "某某某", // 上传人
          time: "2019-04-29", // 上传时间
          status: "已上传", // 状态
          id: ""
        }
      ], // 表格数据,
      //   点击查看的表格数据
      lookInfoTable: [],
      // 上传弹框的头部文字信息
      uploadingTitle: "",
      // 查看弹框的头部文字信息
      lookInfoTitle: "",
      //   上传弹框的判断值
      uploading: false,
      //   查看弹框的判断值
      lookInfo: false,
      //   工资足额发放选择的日期
      gongZidate: "",
      //   维权公告选择的日期
      weiQuandate: "",

      pageToral: 1, // 查看菜单总条数
      pageSize: 8, // 查看菜单每页显示条数
      pageNum: 1, // 查看菜单当前页
      activeId: '', // 当前查看的菜单id
      userName: '', // 上传人名称
      uploadingId: '', // 上传菜单的id
      remark: '', // 备注
      file: '', // 文件
    };
  },
  created() {
    this.getProjectId();
    this.getUserName()
    this.getProjectList();
  },
  methods: {
    // 序号
    indexMethod(index) {
      return (this.pageNum - 1) * this.pageSize + index + 1;
    },

    // 当前页
    handleCurrentChange(val) {
      // console.log(`当前页：${val}`)
      this.pageNum = val
      this.getParticulars(this.activeId)
    },


    // 获取项目id
    getProjectId() {
      this.projectId = sessionStorage.getItem(`pid`);
    },

    // 获取用户名
    getUserName() {
      this.userName = sessionStorage.getItem('userName')
      // console.log(this.userName)
    },

    //   打开上传弹框
    openUploading(id) {
      this.uploadingId = id;
      this.uploading = true;
    },

    // 上传文件处理
    fileUp(e) {
      let file = e.target.files[0]
      this.file = new FormData()
      this.file.append('file',file)
      // console.log(file)
    },

    // 打开查看弹框
    openLookInfo(text) {
      this.pageNum = 1
      this.lookInfoTitle = text;
      this.lookInfo = true;
    },

    // 获取项目消息列表
    getProjectList() {
      this.$axios
        .post(`/api/menu/seleall?projectId=${this.projectId}&typeId=1`)
        .then(res => {
          // console.log(res.data.list)
          for (let i = 0; i < this.tableData.length; i++) {
            for (let i2 = 0; i2 < res.data.list.length; i2++) {
              if (this.tableData[i].number == res.data.list[i2].size) {
                this.tableData[i].person = res.data.list[i2].uploadingname;
                this.tableData[i].time = res.data.list[i2].uploadingDate;
                this.tableData[i].status = res.data.list[i2].uploadingType;
                this.tableData[i].id = res.data.list[i2].id;
              }
            }
          }
        });
    },

    // 查看上传资料
    getParticulars(id) {
      this.activeId = id
      this.$axios
        .post(`/api/lzfw/particulars?projectId=${this.projectId}&menuId=${this.activeId}&pageSize=${this.pageSize}&pageNum=${this.pageNum}`)
        .then(res => {
          // console.log(res.data)
          this.lookInfoTable = res.data.data.rows;
          this.pageToral = res.data.total;
        });
    },

    // 删除资料
    deleteClick(id) {
      this.$confirm("是否要删除资料？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(id)
          this.$axios.post(`/api/lzfw/deleteHjInformationById?id=${id}`).then(
            res => {
              // console.log(res.data)
              if (res.data.msg == '删除成功') {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.getParticulars(this.activeId)
                this.getProjectList()
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
        });
    },

    // 上传资料
    uploadingClick() {
      // console.log('文件:'+this.file)
      // console.log('上传菜单的id:'+this.uploadingId)
      // console.log('上传人名称:'+this.userName)
      // console.log('项目id:'+this.projectId)
      // console.log('备注：'+this.remark)
      if (this.file) {
        let headers = {headers: {"Content-Type": "multipart/form-data"}}
        this.$axios.post(`/api/lzfw/instadd?menuId=${this.uploadingId}&uploadingName=${this.userName}&projectId=${this.projectId}&remark=${this.remark}`,this.file,headers).then(
          res => {
            // console.log(res.data)
            if (res.data.msg == '添加成功') {
                this.$message({
                  type: "success",
                  message: "上传成功"
                });
                this.uploading = false
                this.getProjectList()
              } else {
                this.$message({
                  message: "上传失败",
                  type: "error"
                });
              }
          }
        )
      } else {
        this.$message({
          message: "请选择需要上传的文件",
          type: "error"
        });
      }
    },

    // 下载
    downloadClick(imgURL) {
      // console.log(fileName)
      location.href=`http://47.106.71.3:8080/api/lzfw/testDownload?imgURL=${imgURL}`
      // location.href=`http://192.168.1.18:8080/api/lzfw/testDownload?imgURL=${imgURL}`
    }
  }
};
</script>
<style lang="less">
#fw_one {
  background-color: #f7f7f7;
  .content {
    width: 100%;
    height: 9.45rem;
    background-color: #fff;
    box-shadow: 0 0 0.5rem -0.3rem #666;
    border-radius: 0.04rem;
    .title {
      font-size: 0.24rem;
      width: 100%;
      text-align: center;
      font-weight: bold;
      line-height: 0.6rem;
    }
    .table-box {
      width: 100%;
      min-height: 5.6rem;
      margin-left: 0.2rem;
      .el-table {
        width: 16.28rem;
        th {
          padding: 0;
          div {
            color: #4a4a4a;
            height: 0.45rem;
            line-height: 0.45rem;
            background-color: #c5e8ff;
            font-size: 0.18rem;
          }
        }
        td {
          padding: 0;
          div {
            height: 0.45rem;
            color: #646464;
            line-height: 0.45rem;
            font-size: 0.18rem;
            .el-button {
              span {
                font-size: 0.18rem;
                color: #2323ff;
                border-bottom: 1px solid #2323ff;
              }
              &:hover {
                span {
                  font-size: 0.18rem;
                  color: #4545c5;
                  border-bottom: 1px solid #4545c5;
                }
              }
            }
          }
        }
        .red-color {
          color: #fd5101;
        }
        .yellow-color {
          color: #ffd14f;
        }
      }
    }
    .lookInfoTable {
      .el-table {
        width: 16.28rem;
        th {
          padding: 0;
          div {
            color: #4a4a4a;
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
            font-size: 0.14rem;
            .el-button {
              span {
                font-size: 0.14rem;
                color: #2323ff;
                border-bottom: 1px solid #2323ff;
              }
              &:hover {
                span {
                  font-size: 0.14rem;
                  color: #4545c5;
                  border-bottom: 1px solid #4545c5;
                }
              }
            }
          }
        }
        .red-color {
          color: #fd5101;
        }
        .yellow-color {
          color: #ffd14f;
        }
      }
    }
    .fenye {
      position: absolute;
      right: 0.6rem;
      bottom: 0.3rem;
    }
    #uploading {
      .el-dialog {
        margin-top: 10vh !important;
        border-radius: 0.1rem;
        .el-dialog__header {
          background-color: #5fb6ff;
          border-top-left-radius: 0.1rem;
          border-top-right-radius: 0.1rem;
          height: 0.57rem;
          position: relative;
          .el-dialog__title {
            font-weight: bolder;
            font-size: 0.2rem;
            color: #fff;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
          .el-dialog__close {
            font-size: 0.26rem;
            color: #fff;
            // font-weight: bold;
          }
        }
        .el-dialog__body {
          input {
            -webkit-appearance: none;
            background-color: #fff;
            border-radius: 0.04rem;
            border: 1px solid #acabab;
            width: 100%;
            box-sizing: border-box;
            width: 5.2rem;
          }
          .checkDate {
            font-size: 0.16rem;
            margin-left: 0.06rem;
          }
          .el-date-editor {
            margin-left: 0.2rem;
          }
          .top {
            margin-top: 0.1rem;
            .name {
              position: relative;
              width: 0.9rem;
              height: 0.33rem;
              border: 1px solid #7b7b7b;
              font-size: 0.16rem;
              color: #4a4a4a;
              line-height: 0.33rem;
              text-align: center;
              border-top-left-radius: 0.04rem;
              border-top-right-radius: 0.04rem;
              border-bottom-color: #fff;
              background-color: #fff;
            }
            .checkImg {
              margin-top: -0.01rem;
              width: 6.22rem;
              // height: 2.71rem;
              border: 1px solid #7b7b7b;
              border-top-right-radius: 0.04rem;
              border-bottom-right-radius: 0.04rem;
              border-bottom-left-radius: 0.04rem;
              padding: 0.2rem;
              .lxSb {
                width: 5.86rem;
                height: 2.35rem;
                border-radius: 0.05rem;
                background-image: url("../../../../static/images/fw_upImg1.jpg");
                background-size: contain;
                cursor: pointer;
                .lxSbfile {
                  width: 100%;
                  height: 100%;
                  opacity: 0;
                  cursor: pointer;
                }
              }
              .lxsupserSb {
                width: 5.86rem;
                //   height: 2.35rem;
                position: relative;
                .info {
                  width: 5.86rem;
                  height: 0.32rem;
                  border-bottom: 1px solid #b0afaf;
                  line-height: 0.3rem;
                  .text {
                    position: absolute;
                    font-size: 0.16rem;
                    color: #4a4a4a;
                    top: -0.05rem;
                  }
                  .addBtn {
                    float: right;
                    width: 1.28rem;
                    height: 0.33rem;
                    border: 1px solid #dadada;
                    border-radius: 0.04rem;
                    cursor: pointer;
                    text-align: center;
                    font-size: 0.16rem;
                    line-height: 0.3rem;
                    color: #272727;
                    transform: translateY(-0.1rem);
                    &:hover {
                      color: #fff;
                      background-color: #4fa4ff;
                    }
                    .lxSbfile {
                      position: absolute;
                      width: 1.28rem;
                      height: 0.33rem;
                      right: 0;
                      opacity: 0;
                      cursor: pointer;
                    }
                  }
                }
                .imgLook {
                  div {
                    margin-left: -0.2rem;
                    height: 4.2rem;
                    img {
                      width: 1.22rem;
                      height: 1.22rem;
                      float: left;
                      margin-top: 0.19rem;
                      margin-left: 0.27rem;
                    }
                  }
                }
              }
            }
          }
          .bottom {
            margin-top: 0.2rem;
            .name {
              color: #4a4a4a;
              position: relative;
              width: 0.9rem;
              height: 0.33rem;
              font-size: 0.16rem;
              line-height: 0.33rem;
              text-align: center;
              background-color: #fff;
            }
            .bz {
              border: 1px solid #7b7b7b;
              border-radius: 0.05rem;
              padding-left: 0.1rem;
              width: 6.22rem;
              &::placeholder {
                color: #ccc;
              }
            }
          }
        }
        .el-dialog__footer {
          background-color: #f9f9f9;
          border-top: 1px solid #dedede;
          border-bottom-left-radius: 0.05rem;
          border-bottom-right-radius: 0.05rem;
          button {
            width: 0.98rem;
            border: 1px solid #d4ad40;
            transform: translateY(0.05rem);
            border-radius: 0.02rem;
            margin-right: 0.2rem;
            font-size: 0.15rem;
            line-height: 0.24rem;
          }
          .uploadingBtn {
            background-color: #ffd14f;
            color: #fff;
          }
          .closeBtn {
            border-color: #dadada;
            background-color: #fff;
          }
        }
      }
    }
    #lookInfo {
      .el-dialog {
        margin-top: 10vh !important;
        border-radius: 0.1rem;
        min-height: 5rem;
        .el-dialog__header {
          background-color: #5fb6ff;
          border-top-left-radius: 0.1rem;
          border-top-right-radius: 0.1rem;
          height: 0.57rem;
          position: relative;
          .el-dialog__title {
            font-weight: bolder;
            font-size: 0.2rem;
            color: #fff;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
          .el-dialog__close {
            font-size: 0.26rem;
            color: #fff;
            // font-weight: bold;
          }
        }
        .lookInfoFenye {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0.2rem;
        }
      }
    }
  }
}
</style>
