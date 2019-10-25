<template>
  <div id="q_record">
    <div class="content-box">
      <!-- 顶部导航栏 -->
      <div class="top-nav">
        <ul>
          <li class="active">
            <a>所有数据</a>
          </li>
          <!-- <li>
            <a>待整改</a>
          </li>
          <li>
            <a>待复查</a>
          </li>
          <li>
            <a>复查未通过</a>
          </li>
          <li>
            <a>复查通过</a>
          </li> -->
        </ul>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <div class="search-left">
          <ul>
            <li>
              检查结果：
              <el-select v-model="status" placeholder="请选择检查结果" size="mini" clearable>
                <el-option
                  v-for="item in option2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </li>
            <li>
              检查人：
              <el-input class="text" v-model="initiatorName" placeholder="请填写检查人" size="mini"></el-input>
            </li>
            <li>
              责任分包单位：
              <el-select v-model="constructionId" placeholder="请选择分包单位" size="mini" @change="getAreaList" @clear="none = true" clearable>
                <el-option
                  v-for="item in subcontractor"
                  :key="item.constructionId"
                  :label="item.constructionName"
                  :value="item.constructionId"
                ></el-option>
              </el-select>
            </li>
          </ul>
        </div>
        <div class="search-middle">
          <ul>
            <li>
              整改人：
              <el-input class="text" v-model="rectifyName" placeholder="请填写整改人" size="mini"></el-input>
            </li>
            <li>
              问题级别：
              <el-select v-model="problemGradeId" placeholder="请选择问题级别" size="mini" clearable>
                <el-option
                  v-for="item in option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </li>
            <li>
              隐患类型：
              <el-select v-model="hiddenId" placeholder="请选择隐患类型" size="mini" clearable>
                <el-option
                  v-for="item in azardTypeList"
                  :key="item.hiddenId"
                  :label="item.hiddenName"
                  :value="item.hiddenId"
                ></el-option>
              </el-select>
            </li>
          </ul>
        </div>
        <div class="search-right">
          <ul>
            <li>
              发起时间：
              <el-date-picker
                size="mini"
                v-model="initiatorTime"
                type="date"
                placeholder="请选择发起时间"
                class="text"
                value-format="yyyy-MM-dd"
                clearable
              ></el-date-picker>
            </li>
            <!-- <li>
              复查人：
              <el-input v-model="reviewName" placeholder="请填写复查人" size="mini"></el-input>
            </li> -->
            <li>
              检查区域：
              <el-select v-model="areaId" placeholder="请选择检查区域" size="mini" :disabled="none" clearable>
                <el-option
                  v-for="item in areaList"
                  :key="item.areaId"
                  :label="item.areaName"
                  :value="item.areaId"
                ></el-option>
              </el-select>
            </li>
            <li><div class="button" @click="getInspectionRecordList">搜索</div></li>
          </ul>
        </div>
        <!-- <div class="search-bottom">
          共
          <span>5</span>
          条记录，已完成
          <span>5</span>
          条，未完成
          <span>{{unfinished}}</span>
          条
          <div class="search-bar">
            <input type="text" placeholder="输入问题搜索" />
            <i></i>
          </div>
        </div> -->
      </div>
      <!-- 列表区域 -->
      <div class="list-box">
        <ul class="list-head">
          <li>
            <div class="issue">问题</div>
            <div class="type">隐患类型</div>
            <div class="examine">检查人|检查时间</div>
            <div class="duty">整改人|责任分包单位</div>
            <div class="date">整改期限</div>
            <div class="state">状态</div>
            <div class="operation">操作</div>
          </li>
        </ul>
        <ul class="list-body">
          <li
            v-for="(item,index) in tableData"
            :key="index"
            @click="$router.push({ path: '/kg_particulars', query: { safetyId: item.safetyId } })"
          >
            <div class="issue">
              <p>{{item.safetyDescribe}}</p>
              <span :class="item.gradeName=='轻微'?'slight':item.gradeName=='优秀'?'ordinary':'severity'"></span>
              <!-- <span class="padding">{{item.gradeName}}</span> -->
            </div>
            <div class="type">{{ item.hiddenName }}</div>
            <div class="examine">
              <p>{{item.initiatorName}}</p>
              <span>{{item.initiatorTime}}</span>
            </div>
            <div class="duty">
              <p>{{item.rectifyName}}</p>
              <span>{{item.constructionName}}</span>
            </div>
            <div class="date">
              <p>{{item.safetyDeadline.split(' ')[0]}}</p>
            </div>
            <div
              class="state green-color"
              :class="item.status!==3?'orange-color':'green-color'"
            >{{item.status==1?'待整改':item.status==2?'待复查':'已完成'}}</div>
            <div class="operation">
              <a>
                <i></i>
              </a>
            </div>
          </li>
          <!-- <li>
            <div class="issue">
              <p>此处拉结要用钢管拉结</p>
              <span class="ordinary"></span>
              <span class="padding">隧道左洞</span>
            </div>
            <div class="type">施工用电</div>
            <div class="examine">
              <p>王佳佳</p>
              <span>2019-07-05 20:11</span>
            </div>
            <div class="duty">
              <p>伟业-张东方</p>
              <span>福建省华荣建设集团有限公司</span>
            </div>
            <div class="date">
              <p>2019-07-07</p>
            </div>
            <div class="state">已整改</div>
            <div class="operation">
              <a>
                <i></i>
              </a>
            </div>
          </li>
          <li>
            <div class="issue">
              <p>此处拉结要用钢管拉结</p>
              <span class="ordinary"></span>
              <span class="padding">隧道右洞</span>
            </div>
            <div class="type">施工用电</div>
            <div class="examine">
              <p>王佳佳</p>
              <span>2019-07-15 20:11</span>
            </div>
            <div class="duty">
              <p>伟业-张东方</p>
              <span>福建省华荣建设集团有限公司</span>
            </div>
            <div class="date">
              <p>2019-07-17</p>
            </div>
            <div class="state">已整改</div>
            <div class="operation">
              <a></a>
            </div>
          </li>
          <li>
            <div class="issue">
              <p>电缆未装保护管</p>
              <span class="ordinary"></span>
              <span class="padding">隧道右洞</span>
            </div>
            <div class="type">施工用电</div>
            <div class="examine">
              <p>王佳佳</p>
              <span>2019-07-18 20:11</span>
            </div>
            <div class="duty">
              <p>伟业-张东方</p>
              <span>福建省华荣建设集团有限公司</span>
            </div>
            <div class="date">
              <p>2019-07-20</p>
            </div>
            <div class="state">已整改</div>
            <div class="operation">
              <a></a>
            </div>
          </li>
          <li>
            <div class="issue">
              <p>临时洞口未覆盖</p>
              <span class="ordinary"></span>
              <span class="padding">隧道右洞</span>
            </div>
            <div class="type">安全文明</div>
            <div class="examine">
              <p>王佳佳</p>
              <span>2019-07-21 20:11</span>
            </div>
            <div class="duty">
              <p>伟业-张东方</p>
              <span>福建省华荣建设集团有限公司</span>
            </div>
            <div class="date">
              <p>2019-07-25</p>
            </div>
            <div class="state">已整改</div>
            <div class="operation">
              <a></a>
            </div>
          </li>
          <li>
            <div class="issue">
              <p>电箱未做接地保护措施</p>
              <span class="ordinary"></span>
              <span class="padding">隧道右洞</span>
            </div>
            <div class="type">施工用电</div>
            <div class="examine">
              <p>王佳佳</p>
              <span>2019-07-27 20:11</span>
            </div>
            <div class="duty">
              <p>伟业-张东方</p>
              <span>福建省华荣建设集团有限公司</span>
            </div>
            <div class="date">
              <p>2019-07-30</p>
            </div>
            <div class="state">已整改</div>
            <div class="operation">
              <a></a>
            </div>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.green {
  color: #10de39;
}
#q_record {
  color: #fff;
  .content-box {
    width: 15rem;
    height: 9.42rem;
    padding: 0.32rem 0.18rem 0 0.18rem;
    background-image: url("../../../static/images/q_r-border.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    .top-nav {
      height: 0.33rem;
      border-bottom: 0.01rem solid #142a6a;
      ul {
        float: left;
        width: 6rem;
        display: flex;
        justify-content: space-between;
        li {
          height: 0.33rem;
          position: relative;
          a {
            color: #fff;
            font-size: 0.17rem;
          }
          i {
            color: #fff;
            width: 0.15rem;
            height: 0.15rem;
            border-radius: 0.15rem;
            overflow: hidden;
            font-style: normal;
            background-color: #3375fe;
            position: absolute;
            font-size: 0.12rem;
            right: -0.15rem;
            top: -0.15rem;
            text-align: center;
            line-height: 0.15rem;
          }
        }
        .active {
          border-bottom: 0.01rem solid #3375fe;
          a {
            color: #3375fe;
          }
        }
      }
    }
    .search-box {
      margin-top: 0.15rem;
      .search-left {
        display: inline-block;
        ul {
          width: 3.4rem;
          height: 1.8rem;
          li {
            font-size: 0.15rem;
            color: #dddedf;
            float: right;
            margin-top: 0.12rem;
            .el-select {
              overflow: hidden;
              border: 0.01rem solid #4f5167;
              border-radius: 0.02rem;
              transform: translateY(0.1rem);
              .el-input {
                .el-input__inner {
                  color: #fff;
                  font-size: 0.15rem;
                  background-color: rgba(0, 0, 0, 0);
                }
              }
            }
            .text {
              font-size: 0.15rem;
              border: 0.01rem solid #4f5167;
              border-radius: 0.02rem;
              overflow: hidden;
              transform: translateY(0.1rem);
              .el-input__inner {
                color: #fff;
                background-color: rgba(0, 0, 0, 0);
                width: 2.18rem;
                overflow: hidden;
              }
            }
            .el-input {
              width: auto;
            }
          }
        }
      }
      .search-middle {
        margin-left: 2rem;
        display: inline-block;
        ul {
          width: 3.4rem;
          height: 1.8rem;
          li {
            font-size: 0.15rem;
            color: #dddedf;
            float: right;
            margin-top: 0.12rem;
            .el-select {
              overflow: hidden;
              border: 0.01rem solid #4f5167;
              border-radius: 0.02rem;
              transform: translateY(0.1rem);
              .el-input {
                .el-input__inner {
                  color: #fff;
                  font-size: 0.15rem;
                  background-color: rgba(0, 0, 0, 0);
                }
              }
            }
            .text {
              font-size: 0.15rem;
              border: 0.01rem solid #4f5167;
              border-radius: 0.02rem;
              overflow: hidden;
              transform: translateY(0.1rem);
              .el-input__inner {
                color: #fff;
                background-color: rgba(0, 0, 0, 0);
                width: 2.18rem;
                overflow: hidden;
              }
            }
            .el-input {
              width: auto;
            }
          }
        }
      }
      .search-right {
        margin-left: 2rem;
        display: inline-block;
        ul {
          width: 3.4rem;
          height: 1.8rem;
          li {
            font-size: 0.15rem;
            color: #dddedf;
            float: right;
            margin-top: 0.12rem;
            .el-select {
              overflow: hidden;
              border: 0.01rem solid #4f5167;
              border-radius: 0.02rem;
              transform: translateY(0.1rem);
              .el-input {
                .el-input__inner {
                  color: #fff;
                  font-size: 0.15rem;
                  background-color: rgba(0, 0, 0, 0);
                }
              }
            }
            > .el-input__inner {
              border: 0.01rem solid #4f5167;
              border-radius: 0.02rem;
              width: 2.18rem;
              background-color: rgba(0, 0, 0, 0);
              .el-range-separator {
                color: #fff;
                transform: translateX(-0.02rem);
                padding: 0;
              }
              .el-range-input {
                color: #fff;
                background-color: rgba(0, 0, 0, 0);
              }
            }
            .text {
              font-size: 0.15rem;
              border: 0.01rem solid #4f5167;
              border-radius: 0.02rem;
              overflow: hidden;
              transform: translateY(0.1rem);
              .el-input__inner {
                color: #fff;
                background-color: rgba(0, 0, 0, 0);
                width: 2.18rem;
                overflow: hidden;
              }
            }
            .el-input {
              width: auto;
            }
            .button {
              width: 1rem;
              border-radius: 0.15rem;
              background: #142a6a;
              line-height: 0.4rem;
              font-size: 0.20rem;
              margin-right: 1rem;
              margin-top: 0.2rem;
              text-align: center;
              box-shadow: 4px 3px 2px 0px black;
              cursor: pointer;
              transition: all 0.5s
            }
            .button:hover {
              background: #1e41a9;
            }
          }
        }
      }
      .search-bottom {
        color: #dddedf;
        font-size: 0.15rem;
        span {
          color: #fff;
          font-size: 0.17rem;
        }
        .search-bar {
          border: 0.01rem solid #4f5167;
          border-radius: 0.02rem;
          display: inline-block;
          input {
            color: #fff;
            width: 1.8rem;
            height: 0.28rem;
            padding-left: 0.09rem;
            background-color: rgba(0, 0, 0, 0);
          }
        }
      }
    }
    .list-box {
      margin-top: 0.15rem;
      .list-head {
        height: 0.3rem;
        padding-left: 0.3rem;
        // padding-right: .3rem;
        background-color: #142a6a;
        li {
          line-height: 0.3rem;
          display: flex;
          justify-content: space-between;
          > div {
            font-size: 0.14rem;
            color: #3375fe;
          }
          .issue {
            flex: 8;
          }
          .type {
            flex: 2;
          }
          .examine {
            flex: 4;
          }
          .duty {
            flex: 6;
          }
          .date {
            flex: 2;
          }
          .state {
            flex: 2;
          }
          .operation {
            flex: 1;
          }
        }
      }
      .list-body {
        height: 0.3rem;
        // padding-right: .3rem;
        li {
          cursor: pointer;
          height: 0.6rem;
          display: flex;
          padding-top: 0.06rem;
          padding-left: 0.3rem;
          border-bottom: 0.01rem solid #142a6a;
          justify-content: space-between;
          > div {
            font-size: 0.14rem;
            color: #fff;
          }
          .issue {
            flex: 8;
            p {
              font-size: 0.14rem;
            }
            .slight {
              display: inline-block;
              width: 0.36rem;
              height: 0.13rem;
              background-image: url("../../../static/images/q_r-slight.png");
              // background-image: url('../../../static/images/bb.png');
              // background-image: url('../../../static/images/aa.svg');
              background-position: center center;
              background-repeat: no-repeat;
              background-size: contain;
              transform: translateY(0.015rem);
            }
            .ordinary {
              display: inline-block;
              width: 0.36rem;
              height: 0.13rem;
              background-image: url("../../../static/images/veryGood.png");
              background-position: center center;
              background-repeat: no-repeat;
              background-size: contain;
              transform: translateY(0.015rem);
            }
            .severity {
              display: inline-block;
              width: 0.36rem;
              height: 0.13rem;
              background-image: url("../../../static/images/good.png");
              background-position: center center;
              background-repeat: no-repeat;
              background-size: contain;
              transform: translateY(0.015rem);
            }
            span {
              font-size: 0.12rem;
            }
            .padding {
              margin-left: 0.08rem;
            }
          }
          .type {
            line-height: 0.53rem;
            flex: 2;
          }
          .examine {
            flex: 4;
          }
          .duty {
            flex: 6;
          }
          .date {
            line-height: 0.53rem;
            flex: 2;
          }
          .state {
            line-height: 0.53rem;
            flex: 2;
          }
          .green-color {
            color: #20d46c;
          }
          .orange-color {
            color: #ff721b;
          }
          .red-color {
            color: #b1335d;
          }
          .operation {
            flex: 1;
            a {
              display: block;
              width: 100%;
              height: 100%;
              background-image: url("../../../static/images/q_r-delete.png");
              background-position: left center;
              background-repeat: no-repeat;
              background-size: 0.14rem 0.14rem;
            }
          }
        }
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      pid: 2977, // 项目id
      queryPollingInFoData: "", // 检查记录列表
      sum: 0, // 检查总数
      accomplish: 0, // 已完成数量
      unfinished: 0, // 未完成数量
      tableData: "", // 表格的数据
      hiddenId: '', // 隐患类型
      status: '', // 检查结果
      initiatorTime: '', // 发起时间
      initiatorName: '', // 检查人
      rectifyName: '', // 整改人
      reviewName: '', // 复查人
      constructionId: '', // 责任分包单位ID
      areaId: '', // 检查区域
      problemGradeId: '', // 问题级别
      differentiate: 2, // 安全管理
      option2: [ // 检查结果
        {
          value: 1,
          label: "待整改"
        },
        {
          value: 2,
          label: "待复查"
        },
        {
          value: 3,
          label: "已完成"
        }
      ],
      option: [ // 问题级别
        {
          value: 3,
          label: "一般"
        },
        {
          value: 4,
          label: "优秀"
        },
        {
          value: 5,
          label: "良好"
        }
      ],
      pageNum: 1, // 当前页
      pageSize: 8, // 每页显示条数
      subcontractor: '', // 分包单位列表
      azardTypeList: '', // 隐患类型列表
      none: true, // 检查区域禁止点击
      areaList: '', // 检查区域列表
    };
  },
  created() {
    this.getPid();
    // this.getQueryPollingInFo()
    this.getInspectionRecordList();
    this.getInformationList()
    this.getHiddenList()
  },
  methods: {
    // 获取项目id
    getPid() {
      this.pid = sessionStorage.getItem("pid");
    },

    // 获取检查记录列表
    getQueryPollingInFo() {
      this.$axios
        .post(`/lz/polling/queryPollingInFo?projectId=${this.pid}`)
        .then(res => {
          // console.log(res.data.msg.length)
          this.queryPollingInFoData = res.data.msg;
          this.sum = res.data.msg.length;
          for (let i = 0; i < res.data.msg.length; i++) {
            if (res.data.msg[i].isAvailable == 0) {
              this.accomplish++;
            } else {
              this.unfinished++;
            }
          }
        });
    },

    // 进入整改单详情页
    particulars() {
      // window.open('http://localhost:8080/?xmid=DV2mxBGL1Ao%3D#/q_particulars', '_blank');
      this.$router.push({ path: "/q_particulars" });
    },

    // 获取检查记录
    getInspectionRecordList() {
      if (this.initiatorTime == null) {
        this.initiatorTime = ''
      }
      this.$axios
        .post(
          `/api/safetyPcApi/getInspectionRecordList?projectId=${this.pid}&differentiate=2&pageNum=${this.pageNum}&pageSize=${this.pageSize}&hiddenId=${this.hiddenId}&status=${this.status}&initiatorTime=${this.initiatorTime}&initiatorName=${this.initiatorName}&rectifyName=${this.rectifyName}&reviewName=${this.reviewName}&constructionId=${this.constructionId}&areaId=${this.areaId}&problemGradeId=${this.problemGradeId}`
        )
        .then(res => {
          this.tableData = res.data.data;
          // console.log(this.tableData);
        });
    },

    // 查询分包单位列表
    getInformationList() {
      this.$axios
        .post(`/api/safetyPcApi/getInformationList?projectId=${this.pid}`)
        .then(res => {
          if (res.data.code == 0) {
            this.subcontractor = res.data.data;
            // console.log(this.subcontractor)
          }
        });
    },

    // 隐患检查类型列表
    getHiddenList() {
      this.$axios
        .post(`/api/safetyPcApi/getHiddenList?projectId=${this.projectId}`)
        .then(res => {
          // console.log(res.data)
          if (res.data.code == 0) {
            this.azardTypeList = res.data.data;
            // console.log(this.azardTypeList)
          }
        });
    },

    // 查询检查区域列表
    getAreaList() {
      // console.log(this.subpackage)
      this.$axios
        .post(`/api/safetyPcApi/getAreaList?constructionId=${this.constructionId}`)
        .then(res => {
          if (res.data.code == 0) {
            this.none = false;
            this.areaList = res.data.data;
          }
          // console.log(this.areaList)
        });
    },
  }
};
</script>
