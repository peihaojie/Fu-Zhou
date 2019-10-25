<template>
  <div id="q_particulars">
    <!-- 主体区域 -->
    <div class="content-box">
      <!-- 面包屑导航 -->
      <div class="crumbs-nav">
        <router-link to="/quality/q_statistics">首页</router-link>
        <span>/</span>
        <router-link to="/quality/q_record">检查记录</router-link>
        <span>/</span>
        <span class="present">详情</span>
      </div>
      <!-- 表标题 -->
      <div class="list-title">
        <div class="title-left">
          <div
            class="state green-color"
            :class="inspect.status==1?'red-color':inspect.status==3?'green-color':'orange-color'"
          >{{inspect.status==1?'待整改':inspect.status==2?'待复查':'已完成'}}</div>
          <div class="creation-time">创建时间：{{inspect.initiatorTime}}</div>
        </div>
        <!-- <div class="title-right">
          <div class="number">编号:{{pollingList.pollingId}}</div>
          <div class="QRcode-box"></div>
        </div>-->
      </div>
      <!-- 流程详细信息 -->
      <div class="flow">
        <!-- 安全检查 -->
        <div class="examine">
          <div class="title">安全检查</div>
          <div class="issue">
            {{inspect.status==1?'待整改':inspect.status==2?'待复查':'已完成'}}
            <!-- <i class="slight"></i> -->
          </div>
          <ul>
            <li>
              <span class="align">检查区域：</span>
              <span>{{inspect.areaName}}</span>
            </li>
            <li>
              <span class="align">隐患类型：</span>
              <span>{{inspect.hiddenName}}</span>
            </li>
            <li>
              <span class="align">分包单位：</span>
              <span>{{inspect.constructionName}}</span>
            </li>
            <li>
              <span class="align">检查人：</span>
              <span>{{ inspect.initiatorName }}</span>
            </li>
            <!-- <li>
              <span class="align">检查时间：</span>
              {{pollingList.createTime}}
            </li>-->
          </ul>
          <div class="pic-box" :style="`background-image:url(${inspect.safetyPhotos[0]})`"></div>
        </div>
        <!-- 整改通知 -->
        <div class="inform">
          <div class="title">整改通知</div>
          <ul>
            <li>
              <span class="align">整改人：</span>
              {{ inspect.rectifyName }}
            </li>
            <li>
              <span class="align">整改时限：</span>
              {{inspect.safetyDeadline}}
            </li>
            <li>
              <span class="align">整改要求：</span>
              {{inspect.safetyRequire}}
            </li>
            <li>表单创造时间：{{inspect.safetyCreateTime}}</li>
          </ul>
        </div>
        <!-- 详情 -->
        <div class="ergodic-box">
          <!-- 整改情况 -->
          <div class="dispose">
            <div class="title">第一次整改</div>
            <div class="name">
              <span class="algin">整改人：</span>
              {{ inspect.rectifyName }}
              <!-- <span>整改人</span> -->
            </div>
            <div class="situation">
              <span>处理情况</span>
              <br />
              {{inspect.rectifyResult}}
            </div>
            <div class="pic-box" :style="`background-image:url(${inspect.rectifyPhotos})`"></div>
            <div class="time">
              <span class="align">整改时间：</span>
              {{inspect.rectifyTime}}
            </div>
          </div>
          <!-- 复查情况 -->
          <div class="review">
            <div class="opinion">
              复查意见
              &nbsp;&nbsp;&nbsp;&nbsp;
              {{inspect.reviewOpinions}}
              <br />
              {{inspect.reviewOpinions}}
            </div>
            <div class="person">复查人：{{ inspect.reviewName }}</div>
            <div class="pic-box" :style="`background-image:url(${inspect.reviewPath[0]})`"></div>
            <div class="time">复查时间：{{inspect.safetyCreateTime}}</div>
          </div>
        </div>
        <!-- 表单创建时间 -->
        <div class="establish-time">表单创建时间：{{inspect.initiatorTime}}</div>
      </div>
      <!-- 流程进度 -->
      <!-- <div class="schedule">
        <div class="left-box">
          <div class="top-title">流程</div>
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(item, index) in inspect.list"
              :key="index"
              :color="activity.color"
              placement="top"
              :timestamp="item.time"
            >{{item.name}}</el-timeline-item>
          </el-timeline>
          <div class="bottom-title">通知人</div>
          <div class="inform">无</div>
        </div>
        <div class="right-box">
          <ul>
            <li>发起安全整改</li>
            <li>整改完成</li>
            <li>复查通过</li>
          </ul>
        </div>
      </div> -->
      <div class="right">
        <div class="liuCheng">
          <div class="title">
            <span class="shu"></span>
            <span class="text">流程</span>
          </div>
          <div class="rightInfo">
            <ul>
              <li v-for="(item, index) in inspect.list" :key="index">
                <div class="rightLine">
                  <p class="yuan"></p>
                  <p class="line"></p>
                </div>
                <div class="rightText">
                  <p>{{ item.time }}</p>
                  <p>{{ item.engineer }}{{ item.name }}</p>
                </div>
                <div class="rightStatus">{{ item.title }}</div>
              </li>
              <!-- <li>
                <div class="rightLine">
                  <p class="yuan"></p>
                  <p class="line"></p>
                </div>
                <div class="rightText">
                  <p>2019.01.01 22:36</p>
                  <p>整改负责人&#12288;项目负责人伟业-韩子昂</p>
                </div>
                <div class="rightStatus">整改完成</div>
              </li>
              <li>
                <div class="rightLine">
                  <p class="yuan"></p>
                  <p class="line"></p>
                </div>
                <div class="rightText">
                  <p>2019.01.01 21:36</p>
                  <p>整改复查&#12288;安全工程师王佳欣</p>
                </div>
                <div class="rightStatus">复查通过</div>
              </li> -->
            </ul>
          </div>
        </div>
        <div class="person">
          <div class="title">
            <span class="shu"></span>
            <span class="text">通知人</span>
          </div>
          <p v-if="inspect.makeName == []">无</p>
          <p v-else v-for="(item, index) in inspect.makeName" :key="index">{{ item }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
#q_particulars {
  .content-box {
    width: 18.4rem;
    margin: 0 auto;
    margin-top: 0.5rem;
    padding: 0.3rem 0.3rem 0.3rem 0.7rem;
    border: 0.02rem solid #142a6a;
    .crumbs-nav {
      a {
        color: #fff;
        font-size: 0.12rem;
      }
      span {
        color: #fff;
        padding: 0 0.08rem;
      }
      .present {
        color: #a8a9ae;
        padding: 0;
      }
    }
    .list-title {
      background-color: #142a6a;
      height: 1.04rem;
      margin-top: 0.3rem;
      margin-bottom: 0.4rem;
      padding: 0.25rem 0.2rem 0 0.2rem;
      .title-left {
        float: left;
        .state {
          font-size: 0.18rem;
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
        .creation-time {
          color: #fff;
          font-size: 0.13rem;
          margin-top: 0.1rem;
        }
      }
      .title-right {
        float: right;
        position: relative;
        .number {
          top: -0.24rem;
          left: 0;
          color: #fff;
          font-size: 0.12rem;
          position: absolute;
        }
        .QRcode-box {
          width: 0.6rem;
          height: 0.6rem;
          background-color: #fff;
        }
      }
    }
    .flow {
      color: #fff;
      display: inline-block;
      .pic-box {
        width: 1.35rem;
        height: 1.35rem;
        margin-top: 0.3rem;
        padding-left: 0.18rem;
        background-image: url("../../../static/images/temp4.jpg");
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
      }
      .examine {
        .title {
          height: 0.2rem;
          line-height: 0.2rem;
          font-size: 0.18rem;
          font-weight: bolder;
          padding-left: 0.15rem;
          border-left: 0.03rem solid #0097fe;
        }
        .issue {
          margin-top: 0.16rem;
          padding-left: 0.18rem;
          font-size: 0.15rem;
          font-weight: bolder;
          .slight {
            display: inline-block;
            width: 0.36rem;
            height: 0.13rem;
            margin-left: 0.2rem;
            background-image: url("../../../static/images/q_r-slight.png");
            background-position: center center;
            background-repeat: no-repeat;
            background-size: contain;
          }
        }
        ul {
          margin-top: 0.21rem;
          padding-left: 0.18rem;
          li {
            font-size: 0.12rem;
            line-height: 0.32rem;
            .align {
              display: inline-block;
              width: 0.6rem;
              text-align: right;
            }
          }
        }
      }
      .inform {
        margin-top: 0.3rem;
        .title {
          height: 0.2rem;
          line-height: 0.2rem;
          font-size: 0.18rem;
          font-weight: bolder;
          padding-left: 0.15rem;
          border-left: 0.03rem solid #0097fe;
        }
        ul {
          padding-left: 0.18rem;
          li {
            font-size: 0.12rem;
            line-height: 0.32rem;
            .align {
              display: inline-block;
              width: 0.6rem;
              text-align: right;
            }
          }
        }
      }
      .dispose {
        margin-top: 0.3rem;
        .title {
          height: 0.2rem;
          line-height: 0.2rem;
          font-size: 0.18rem;
          font-weight: bolder;
          padding-left: 0.15rem;
          border-left: 0.03rem solid #0097fe;
        }
        .name {
          padding-left: 0.18rem;
          font-size: 0.12rem;
          margin-top: 0.1rem;
          .algin {
            display: inline-block;
            width: 0.6rem;
            text-align: right;
          }
        }
        .situation {
          margin-top: 0.05rem;
          font-size: 0.12rem;
          span {
            font-size: 0.14rem;
            font-weight: bolder;
          }
        }
        .time {
          color: #fff;
          font-size: 0.12rem;
          margin-top: 0.2rem;
          // padding-left: 0.18rem;
          .align {
            display: inline-block;
            width: 0.6rem;
            text-align: right;
          }
        }
      }
      .review {
        width: 8.88rem;
        height: 3.4rem;
        margin-top: 0.3rem;
        padding-top: 0.3rem;
        padding-left: 0.18rem;
        background-color: #142a6a;
        .opinion {
          font-size: 0.14rem;
          line-height: 0.34rem;
        }
        .time {
          margin-top: 0.2rem;
          font-size: 0.12rem;
        }
      }
      .establish-time {
        font-size: 0.12rem;
        margin-top: 0.3rem;
      }
    }
    .schedule {
      width: 7.84rem;
      float: right;
      .left-box {
        display: inline-block;
        .top-title {
          color: #fff;
          height: 0.18rem;
          line-height: 0.18rem;
          font-size: 0.16rem;
          padding-left: 0.15rem;
          border-left: 0.03rem solid #0097fe;
        }
        .el-timeline {
          margin-top: 0.2rem;
          padding-left: 0.18rem;
          .el-timeline-item {
            color: #fff;
            .el-timeline-item__tail {
              border-color: #24e874;
            }
            .el-timeline-item__wrapper {
              .el-timeline-item__timestamp {
                color: #fff;
              }
              .el-timeline-item__content {
                color: #fff;
              }
            }
          }
        }
        .bottom-title {
          color: #fff;
          height: 0.18rem;
          line-height: 0.18rem;
          font-size: 0.16rem;
          margin-top: 0.1rem;
          padding-left: 0.15rem;
          border-left: 0.03rem solid #0097fe;
        }
        .inform {
          color: #fff;
          font-size: 0.14rem;
          margin-top: 0.15rem;
          padding-left: 0.18rem;
        }
      }
      .right-box {
        float: right;
        ul {
          padding-top: 0.38rem;
          padding-right: 0.2rem;
          li {
            color: #24e874;
            height: 0.69rem;
          }
        }
      }
    }
    .right {
      position: absolute;
      width: 50%;
      right: 0.5rem;
      top: 3.5rem;
      color: #fff;
      .liuCheng {
        .rightInfo {
          margin-left: 0.18rem;
          margin-top: 0.15rem;
          ul {
            li {
              width: 100%;
              height: 0.56rem;
              font-size: 0.12rem;
              .rightLine {
                width: 0.12rem;
                float: left;
                .yuan {
                  width: 0.1rem;
                  height: 0.1rem;
                  background-color: #24e874;
                  border-radius: 50%;
                }
                .line {
                  width: 0.02rem;
                  height: 0.46rem;
                  background-color: #24e874;
                  margin-left: 0.04rem;
                }
              }
              .rightText {
                float: left;
                margin-left: 0.1rem;
                transform: translateY(-0.05rem);
              }
              .rightStatus {
                color: #24e874;
                float: right;
                margin-right: 0.2rem;
                margin-top: 0.1rem;
                font-size: 0.14rem;
              }
            }
          }
        }
      }
      .person {
        margin-top: 0.3rem;
        p {
          font-size: 0.12rem;
          margin-top: 0.15rem;
          margin-left: 0.16rem;
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
      reverse: true,
      activities: [
        {
          content: "整改复检 安全工程师王家兴",
          timestamp: "2018-04-15",
          color: "#24e874"
        },
        {
          content: "整改负责人 项目负责人伟业-韩子昂",
          timestamp: "2018-04-13",
          color: "#24e874"
        },
        {
          content: "安全工程师王家兴",
          timestamp: "2018-04-11",
          color: "#24e874"
        }
      ],
      getNameState: 0, // getName状态只调用一次
      pollingId: "", // 整改id
      pollingDetail: "", // 整改单详情
      pollingList: "", // 整改单基础信息
      pid: "", // 项目id
      number: 0, // 整改次数
      inspect: "" // 检查详情
    };
  },
  created() {
    this.getPid();
    this.getName();
    this.getPollingDetail();
    this.getQueryPollingInFo();
    this.getInspectionRecordDetails();
  },
  methods: {
    // 获取实时监控页面传过来的值
    getName() {
      // console.log(this.$route.query.orderId)
      if (this.$route.query.pollingId != undefined && this.getNameState == 0) {
        this.pollingId = this.$route.query.pollingId;
        this.getNameState = 1;
      }
      // console.log(this.pollingId)
    },

    // 根据整改id获取整改单详情
    getPollingDetail() {
      this.$axios
        .post(`/lz/polling/selectPollingDetail?pollingId=${this.pollingId}`)
        .then(res => {
          console.log(res.data);
          this.pollingDetail = res.data.msg;
        });
    },

    // 获取整改单的基础信息
    getQueryPollingInFo() {
      this.$axios
        .post(`/lz/polling/queryPollingInFo?projectId=${this.pid}`)
        .then(res => {
          // console.log(res.data)
          for (let i = 0; i < res.data.msg.length; i++) {
            if (res.data.msg[i].pollingId == this.pollingId) {
              this.pollingList = res.data.msg[i];
            }
          }
          // console.log(this.pollingList)
        });
    },

    // 获取项目id
    getPid() {
      this.pid = sessionStorage.getItem("pid");
    },

    // 获取检查记录详情
    getInspectionRecordDetails() {
      this.$axios
        .post(
          `/api/safetyPcApi/getInspectionRecordDetails?safetyId=${this.$route.query.safetyId}`
        )
        .then(res => {
          this.inspect = res.data.data;
        });
    }
  }
};
</script>