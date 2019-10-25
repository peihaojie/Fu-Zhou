<template>
  <div id="systemSchedule_home">
    <div class="content">
      <!-- 上部分 -->
      <div class="top-box">
        <!-- 实际进度 -->
        <div class="top-left">
          <div class="title">
            <span>实际进度</span>
            <a>
              2019-3-21
              <i class="el-icon-caret-bottom"></i>
            </a>
          </div>
          <div class="carousel">
            <el-carousel trigger="click">
              <el-carousel-item>
                <img src="../../../../static/images/systemSchedule-bg.png" alt />;
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <!-- 进度计划对比图与节点预警 -->
        <div class="top-right">
          <!-- 进度计划 -->
          <div class="plan">
            <div class="title">
              <span>进度计划对比图</span>
              <div class="label">
                <div>
                  <div class="line" style="background-color:#0090ff"></div>计划完成
                </div>
                <div>
                  <div class="line" style="background-color:#3ada76"></div>实际完成
                </div>
              </div>
              <div class="unit">单位：%</div>
            </div>
            <div id="plan" style="width:100%;height:2.61rem"></div>
          </div>
          <!-- 节点预警 -->
          <div class="warning">
            <div class="button-box">
              <a class="active">节点预警(30)</a>
              <a>即将开始节点提醒(30)</a>
              <a>即将完成节点提醒(30)</a>
            </div>
            <ul>
              <li class="first">
                <span style="width:1.4rem">节点名称</span>
                <span style="width:1.2rem">计划开始时间</span>
                <span style="width:1.2rem">计划完成时间</span>
                <span style="width:.9rem">状态</span>
              </li>
              <li>
                <span style="width:1.4rem">
                  <i class="dot"></i>
                  6区室外管网工程
                </span>
                <span style="width:1.2rem">2019-04-20</span>
                <span style="width:1.2rem">2019-05-24</span>
                <span style="width:.9rem">未按时启动，延期88天</span>
              </li>
              <li>
                <span style="width:1.4rem">
                  <i class="dot"></i>
                  6区室外管网工程
                </span>
                <span style="width:1.2rem">2019-04-20</span>
                <span style="width:1.2rem">2019-05-24</span>
                <span style="width:.9rem">未按时启动，延期88天</span>
              </li>
              <li>
                <span style="width:1.4rem">
                  <i class="dot"></i>
                  6区室外管网工程
                </span>
                <span style="width:1.2rem">2019-04-20</span>
                <span style="width:1.2rem">2019-05-24</span>
                <span style="width:.9rem">未按时启动，延期88天</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 下部分 -->
      <div class="bottom-box">
        <div class="title">工程进度</div>
        <div class="day" style="margin-right:.8rem">
          <div class="top-text">已施工（天）</div>
          <div class="bottom-text">1304</div>
        </div>
        <a class="btn" style="margin-right:.2rem">
          <i class="el-icon-arrow-left"></i>
        </a>
        <div class="schedule-bar">
          <ul>
            <li>
              <div class="top-box">
                <div class="dot">
                  <div class="sub-dot"></div>
                </div>
                <div class="line"></div>
              </div>
              <div class="bottom-box">
                <span>
                  2019/3/21
                  2栋主体封顶
                </span>
              </div>
            </li>
            <li>
              <div class="top-box">
                <div class="dot">
                  <div class="sub-dot"></div>
                </div>
                <div class="line"></div>
              </div>
              <div class="bottom-box">
                <span>
                  2019/3/21
                  3栋主体封顶
                </span>
              </div>
            </li>
            <li>
              <div class="top-box">
                <div class="dot">
                  <div class="sub-dot"></div>
                </div>
                <div class="line"></div>
              </div>
              <div class="bottom-box">
                <span>
                  2019/3/21
                  4栋主体封顶
                </span>
              </div>
            </li>
            <li>
              <div class="top-box">
                <div class="dot">
                  <div class="sub-dot"></div>
                </div>
                <div class="line"></div>
              </div>
              <div class="bottom-box">
                <span>
                  2019/3/21
                  5栋主体封顶
                </span>
              </div>
            </li>
            <li>
              <div class="top-box">
                <div class="dot">
                  <div class="sub-dot"></div>
                </div>
                <div class="line" style="background-color:#d1e4fd"></div>
              </div>
              <div class="bottom-box">
                <span>
                  2019/3/21
                  6栋主体封顶
                </span>
              </div>
            </li>
            <li>
              <div class="top-box">
                <div class="dot" style="border-color:#d1e4fd">
                  <div class="sub-dot" style="background-color:#d1e4fd"></div>
                </div>
              </div>
              <div class="bottom-box">
                <span>
                  2019/3/21
                  7栋主体封顶
                </span>
              </div>
            </li>
          </ul>
        </div>
        <a class="btn">
          <i class="el-icon-arrow-right"></i>
        </a>
        <div class="day" style="margin-left:.8rem">
          <div class="top-text">总工期（天）</div>
          <div class="bottom-text">2000</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
#systemSchedule_home {
  width: 100%;
  .content {
    padding: 0.3rem;
    border-radius: 0.04rem;
    background-color: #fff;
    box-shadow: 0 0 0.5rem -0.3rem #666;
    > .top-box {
      display: flex;
      justify-content: space-between;
      .top-left {
        width: 10rem;
        height: 6.4rem;
        background-color: #f2f9ff;
        .title {
          height: 0.78rem;
          display: flex;
          justify-content: space-between;
          padding: 0 0.3rem;
          span {
            height: 0.78rem;
            color: #4a4a4a;
            font-size: 0.3rem;
            line-height: 0.78rem;
            font-weight: bolder;
          }
          a {
            height: 0.78rem;
            color: #0089ff;
            font-size: 0.18rem;
            line-height: 0.78rem;
          }
        }
        .carousel {
          height: 5.62rem;
          .el-carousel {
            height: 5.62rem;
            width: 100%;
            .el-carousel__container {
              height: 5.62rem;
              width: 100%;
              img {
                height: 5.62rem;
                width: 100%;
              }
            }
          }
        }
      }
      .top-right {
        width: 5.95rem;
        height: 6.4rem;
        .plan {
          width: 5.95rem;
          height: 3.05rem;
          background-color: #f2f9ff;
          .title {
            display: flex;
            padding: 0 0.2rem;
            padding-top: 0.2rem;
            justify-content: space-between;
            position: relative;
            span {
              color: #0090ff;
              font-size: 0.18rem;
            }
            .label {
              display: flex;
              > div {
                color: #4a4a4a;
                font-size: 0.12rem;
                .line {
                  width: 0.3rem;
                  height: 0.02rem;
                  display: inline-block;
                  margin-left: 0.14rem;
                  margin-right: 0.07rem;
                  vertical-align: middle;
                }
              }
            }
            .unit {
              color: #0090ff;
              font-size: 0.12rem;
              position: absolute;
              bottom: -0.3rem;
              left: 0.2rem;
            }
          }
        }
        .warning {
          width: 5.95rem;
          height: 3.05rem;
          margin-top: 0.3rem;
          background-color: #f2f9ff;
          .button-box {
            display: flex;
            padding: 0 0.18rem;
            padding-top: 0.24rem;
            justify-content: space-between;
            a {
              height: 0.3rem;
              width: 1.8rem;
              color: #fff;
              font-size: 0.14rem;
              text-align: center;
              line-height: 0.3rem;
              border-radius: 0.04rem;
              background-color: #79c4ff;
              &.active {
                background-color: #0090ff;
              }
            }
          }
          ul {
            padding: 0 0.18rem;
            .first {
              height: 0.3rem;
              color: #fff;
              font-size: 0.14rem;
              margin-top: 0.13rem;
              line-height: 0.3rem;
              text-align: center;
              background-color: #79c4ff;
              display: flex;
              justify-content: space-between;
            }
            li {
              color: #5a5b5c;
              font-size: 0.14rem;
              display: flex;
              justify-content: space-between;
              text-align: center;
              margin-top: 0.13rem;
              span {
                position: relative;
                .dot {
                  width: 0.08rem;
                  height: 0.08rem;
                  position: absolute;
                  border-radius: 0.08rem;
                  background-color: #ff7a81;
                  left: 0;
                  top: 0.08rem;
                }
              }
            }
          }
        }
      }
    }
    > .bottom-box {
      width: 100%;
      height: 2.2rem;
      margin-top: 0.3rem;
      background-color: #f2f9ff;
      padding: 0 1.5rem;
      .title {
        color: #4a4a4a;
        font-size: 0.24rem;
        text-align: center;
        font-weight: bolder;
        padding-top: 0.36rem;
      }
      .day {
        display: inline-block;
        .top-text {
          font-size: 0.16rem;
          text-align: center;
        }
        .bottom-text {
          font-size: 0.3rem;
          margin-top: 0.1rem;
          text-align: center;
        }
      }
      .btn {
        display: inline-block;
        color: #3ada76;
        font-size: 0.24rem;
        font-weight: bolder;
      }
      .schedule-bar {
        display: inline-block;
        ul {
          display: flex;
          li {
            .top-box {
              height: 0.19rem;
              .dot {
                width: 0.19rem;
                height: 0.19rem;
                border-radius: 0.19rem;
                display: inline-block;
                position: relative;
                border: 0.01rem solid #3ada76;
                vertical-align: middle;
                .sub-dot {
                  width: 0.11rem;
                  height: 0.11rem;
                  border-radius: 0.11rem;
                  background-color: #3ada76;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
              }
              .line {
                width: 1.35rem;
                height: 0.04rem;
                display: inline-block;
                background-color: #3ada76;
                vertical-align: middle;
                // transform: translateY(.075rem);
              }
            }
            .bottom-box {
              span {
                display: inline-block;
                color: #4a4a4a;
                font-size: 0.16rem;
                width: 1.1rem;
                font-weight: bolder;
                margin-top: 0.25rem;
              }
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
    return {};
  },
  mounted() {
    this.planECharts();
  },
  methods: {
    // 进度计划对比图：ECharts图渲染
    planECharts() {
      let plan = this.$echarts.init(document.getElementById("plan"));
      plan.setOption({
        // backgroundColor: "#FBFBFB",
        grid: {
          x: 30,
          y: 50,
          x2: 40,
          y2: 20,
          containLabel: true
        },
        tooltip: {
          trigger: "axis"
        },
        calculable: true,
        xAxis: [
          {
            axisLabel: {
              rotate: 0,
              interval: 0,
              color: "#000"
            },
            axisLine: {
              lineStyle: {
                color: "#132e6d"
              }
            },
            type: "category",
            boundaryGap: false,
            data: [
              "1月计划",
              "2月计划",
              "3月计划",
              "4月计划",
              "5月计划",
              "6月计划",
              "7月计划",
              "8月计划"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            interval: 20,
            axisLabel: {
              textStyle: {
                color: "#000"
              }
              //   formatter: "{value} 度"
            },
            axisLine: {
              lineStyle: {
                color: "#132e6d"
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#ccc"],
                width: 1,
                type: "dashed"
              }
            }
          }
        ],
        series: [
          {
            name: "计划完成",
            type: "line",
            symbolSize: 10,
            smooth: 0.2,
            color: ["#0090ff"],
            data: [90, 60, 70, 40, 80, 60, 70, 50]
          },
          {
            name: "实际完成",
            type: "line",
            symbolSize: 10,
            smooth: 0.2,
            color: ["#3ada76"],
            data: [70, 50, 40, 40, 60, 55, 50, 45]
          }
        ]
      });
    }
  }
};
</script>