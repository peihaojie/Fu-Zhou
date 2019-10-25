<template>
  <div id="systemZhiHui_gas">
    <div class="content">
      <div id="top">
        <div class="box">
          <div class="info">
            <div class="left">
              <img src="../../../../static/images/systemZhiHui-gasIcon.png" alt="">
            </div>
            <div class="right">
              <p style="font-size:0.18rem;">在线气体检测</p>
              <p style="font-size:0.26rem;margin-top:0.05rem">0</p>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="info">
            <div class="left">
              <img src="../../../../static/images/systemZhiHui-gasIcon.png" alt="">
            </div>
            <div class="right">
              <p style="font-size:0.18rem;">离线气体检测</p>
              <p style="font-size:0.26rem;margin-top:0.05rem">1</p>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="info">
            <div class="left">
              <img src="../../../../static/images/systemZhiHui-alertor.png" alt="">
            </div>
            <div class="right">
              <p style="font-size:0.18rem;">报警统计</p>
              <p style="font-size:0.26rem;margin-top:0.05rem">0</p>
            </div>
          </div>
        </div>
      </div>
      <div id="down">
        <div id="right">
          <div class="information">
            <div class="title">实时数据</div>
            <div class="quan">
              <p class="num">气体正常</p>
              <!-- <p class="text">温度</p> -->
            </div>
            <div class="six">
              <div class="box">
                <div class="one">
                  EX(易燃)
                </div>
                <div class="two"></div>
                <div class="three">--%LEL</div>
                <div class="four" style="background-color:#feb37f;"></div>
              </div>
              <!-- <div class="box">
                <div class="one">
                  漏电B
                  <img>
                </div>
                <div class="two"></div>
                <div class="three">0a</div>
                <div class="four" style="background-color:#ff7a81;"></div>
              </div>
              <div class="box">
                <div class="one">
                  箱门
                  <img>
                </div>
                <div class="two"></div>
                <div class="three">开</div>
                <div class="four" style="background-color:#3ada76;"></div>
              </div> -->
              <div class="box">
                <div class="one">
                  O2(缺氧)
                </div>
                <div class="two"></div>
                <div class="three">--%VOL</div>
                <div class="four" style="background-color:#ff7a81;"></div>
              </div>
              <div class="box">
                <div class="one">
                  H2S(中毒)
                </div>
                <div class="two"></div>
                <div class="three">--%PPM</div>
                <div class="four" style="background-color:#3ada76;"></div>
              </div>
              <div class="box">
                <div class="one">CO(中毒)</div>
                <div class="two"></div>
                <div class="three">--%PPM</div>
                <div class="four" style="background-color:#3ada76;"></div>
              </div>
            </div>
          </div>
          <div class="all">
            <div class="title">气体预警汇总统计</div>
            <ul>
              <!-- <li style="background-color: #0090ff;">
                <p class="name">关门超时报警</p>
                <p class="times">
                  <span class="num">0</span>次
                </p>
              </li>
              <li style="background-color: #3ada76;">
                <p class="name">温度报警</p>
                <p class="times">
                  <span class="num">0</span>次
                </p>
              </li> -->
              <li style="background-color: #0090ff;">
                <p class="name">EX报警</p>
                <p class="times">
                  <span class="num">0</span>次
                </p>
              </li>
              <li style="background-color: #3ada76;">
                <p class="name">O2报警</p>
                <p class="times">
                  <span class="num">0</span>次
                </p>
              </li>
              <li style="background-color: #ffb079;">
                <p class="name">H2S报警</p>
                <p class="times">
                  <span class="num">0</span>次
                </p>
              </li>
              <li style="background-color: #0090ff;">
                <p class="name">CO报警</p>
                <p class="times">
                  <span class="num">0</span>次
                </p>
              </li>
            </ul>
          </div>
          <div class="zhanbitu">
            <div class="title">气体预警占比图</div>
            <div id="proportion" style="width: 5.5rem;height:3.1rem;"></div>
          </div>
        </div>
        <div id="infoList">
          <div class="btnList">
            <div class="btn" @click="historyShow=true">
              <div class="left compile">
                <img>
              </div>
              <div class="right">选择时间</div>
            </div>
            <div class="btn" @click="equipmentClick">
              <div class="left cut">
                <img>
              </div>
              <div class="right">切换设备</div>
            </div>
            <div class="btn" @click="excelShow=true">
              <div class="left derive">
                <img>
              </div>
              <div class="right">导出Excel</div>
            </div>
          </div>
          <div class="table" v-show="!equipmentShow">
            <el-table :data="tableData" stripe border>
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column type="index" label="序号" width="60" :index="indexMethod"></el-table-column>
              <el-table-column prop="EX" label="EX" >
                <template slot-scope="scope">
                  <div>{{ scope.row.EX}}%LEL</div>
                </template>
              </el-table-column>
              <el-table-column prop="O2" label="O2" >
                <template slot-scope="scope">
                  <div>{{ scope.row.O2}}%VOL</div>
                </template>
              </el-table-column>
              <el-table-column prop="H2S" label="H2S" >
                <template slot-scope="scope">
                  <div>{{ scope.row.H2S}}%PPM</div>
                </template>
              </el-table-column>
              <el-table-column prop="CO" label="CO" >
                <template slot-scope="scope">
                  <div>{{ scope.row.CO }}%PPM</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="fenye" v-show="!equipmentShow">
            <!-- 分页的两个事件 -->

            <!-- @size-change="handleSizeChange"
            @current-change="handleCurrentChange"-->
            <el-pagination
              :current-page="pageNum"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="pageTotal"
            ></el-pagination>
          </div>
          <!-- 设备列表 -->
          <div class="equipment-list" v-show="equipmentShow">
            <ul>
              <li>
                <a>设备1</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 历史记录时间 -->
      <div class="dialog-box" v-show="historyShow">
        <div class="title">
            选择时间
            <a class="close" @click="historyShow=false">
                <i class="el-icon-close"></i>
            </a>
        </div>
        <div class="form">
            <ul>
                <li>
                    <span>日期：</span>
                    <el-date-picker
                        v-model="historyDate"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        @change="getTime">
                    </el-date-picker>
                </li>
            </ul>
        </div>
        <div class="confirm">
            <a class="button">确定</a>
        </div>
      </div>
      <!-- 导出Excel时间 -->
      <div class="dialog-box" v-show="excelShow">
        <div class="title">
            选择导出Excel的时间
            <a class="close" @click="excelShow=false">
                <i class="el-icon-close"></i>
            </a>
        </div>
        <div class="form">
            <ul>
                <li>
                    <span>日期：</span>
                    <el-date-picker
                        v-model="excelDate"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        @change="getTime2">
                    </el-date-picker>
                </li>
            </ul>
        </div>
        <div class="confirm">
            <a class="button">确定</a>
        </div>
      </div>
      <!-- 遮罩层 -->
      <div class="shade-box" v-show="historyShow || excelShow"></div>
    </div>
  </div>
</template>

<style lang="less">
#systemZhiHui_gas {
  background-color: #f7f7f7;
  width: 100%;
  .content {
    height: 100%;
    width: 100%;
    background-color: #f7f7f7;
    box-shadow: 0 0 0.5rem -0.3rem #666;
    #top {
      width: 100%;
      height: 1rem;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      .box {
        flex: 1;
        text-align: center;
        .info {
          margin: 0 auto;
          width: 2rem;
          display: flex;
        //   justify-content: space-around;
          margin-top: 0.24rem;
          .left {
            width: 0.5rem;
            height: 0.52rem;
            // background-color: hotpink;
            margin-right: .2rem;
          }
          .right {
            p {
              text-align: left;
            }
          }
        }
      }
    }
    #down {
      display: flex;
      justify-content: space-around;
      #right {
        position: relative;
        flex: 1;
        background-color: #f7f7f7;
        margin-top: 0.1rem;
        .title {
          font-size: 0.22rem;
        }
        .information {
          display: flex;
          position: relative;
          height: 4.16rem;
          width: 100%;
          padding: 0.25rem;
          background-color: #fff;
          .quan {
            width: 2.46rem;
            height: 2.46rem;
            // background-color: #3ada76;
            // border: 1px solid #3ada76;
            // border-radius: 50%;
            margin-top: 0.6rem;
            margin-left: 0.4rem;
            text-align: center;
            // box-shadow: 0px 0px 0px 0.27rem #fff inset;
            background-image: url('../../../../static/images/systemZhiHui-circle.png');
            background-size: contain;
            .num {
              font-size: 0.32rem;
              color: #fff;
              font-weight: bolder;
              margin-top: 1.05rem;
            }
            .text {
              font-size: 0.22rem;
              color: #fff;
              margin-top: 0.1rem;
            }
          }
          .six {
            width: 3rem;
            height: 3.68rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            text-align: center;
            margin-left: 0.8rem;
            .box {
              width: 1.4rem;
              height: 1.54rem;
              background-color: #f7f7f7;
              .one {
                font-size: 0.2rem;
                margin-top: 0.15rem;
                text-align: center;
                img {
                  // width: 0.26rem;
                  height: 0.26rem;
                  margin-left: 0.17rem;
                }
              }
              .two {
                width: 100%;
                height: 0.24rem;
                font-size: 0.14rem;
                margin-top: 0.1rem;
                color: #787878;
              }
              .three {
                font-size: 0.2rem;
                margin-top: 0.1rem;
              }
              .four {
                width: 1rem;
                height: 0.2rem;
                margin: 0 auto;
                margin-top: 0.1rem;
              }
            }
          }
        }
        .all {
          width: 4.05rem;
          height: 4.14rem;
          margin-top: 0.1rem;
          background-color: #fff;
          padding: 0.25rem;
          ul {
            display: flex;
            flex-wrap: wrap;
            margin-left: 0rem;
            margin-top: 0.58rem;
            li {
              width: 1.43rem;
              height: 0.81rem;
              border-radius: 0.03rem;
              margin-left: 0.2rem;
              margin-top: 0.22rem;
              text-align: center;
              .name {
                margin-top: 0.14rem;
                color: #fff;
                font-size: 0.18rem;
              }
              .times {
                margin-top: 0.05rem;
                color: #fff;
                font-size: 0.16rem;
                .num {
                  font-size: 0.22rem;
                }
              }
            }
          }
        }
        .zhanbitu {
          position: absolute;
          padding: 0.25rem;
          right: 0;
          bottom: 0;
          width: 4.73rem;
          height: 4.14rem;
          background-color: #fff;
          margin-left: 0.1rem;
          #proportion {
            transform: translateX(-1.2rem);
            margin-top: 0.2rem;
          }
        }
      }
      #infoList {
        width: 7.6rem;
        position: relative;
        margin-left: 0.1rem;
        background-color: #f7f7f7;
        margin-top: 0.1rem;
        .btnList {
          width: 100%;
          height: 0.7rem;
          background-color: #fff;
          padding: 0.2rem;
          padding-left: 1.8rem;
          .btn {
            float: left;
            margin-left: .2rem;
            width: 1.04rem;
            height: 0.28rem;
            border: 1px solid #0090ff;
            border-radius: 0.02rem;
            display: flex;
            line-height: 0.28rem;
            color: #0090ff;
            cursor: pointer;
            .left {
              width: 0.37rem;
              height: 100%;
              background-repeat: no-repeat;
              background-position: center center;
            }
            &:hover {
              color: #fff;
              background-color: #0090ff;
              .compile {
                  background-image: url('../../../../static/images/system-compileHover.png');
              }
              .cut {
                background-image: url('../../../../static/images/systemGreen-cutHover.png');
              }
              .derive {
                background-image: url('../../../../static/images/system-deriveHover.png');
              }
            }
            .compile {
              background-image: url('../../../../static/images/system-compile.png');
            }
            .cut {
              background-image: url('../../../../static/images/systemGreen-cut.png');
            }
            .derive {
              background-image: url('../../../../static/images/system-derive.png');
            }
          }
        }

        .table {
          background-color: #fff;
          width: 100%;
          min-height: 7.6rem;
          margin-top: 0.1rem;
          .el-table {
            th {
              padding: 0;
              div {
                color: #000;
                height: 0.35rem;
                line-height: 0.35rem;
                background-color: #c5e8ff;
                font-size: 0.14rem;
              }
            }
            td {
              padding: 0;
              div {
                height: 0.35rem;
                color: #646464;
                line-height: 0.35rem;
                font-size: 0.14rem;
              }
            }
            .red-color {
              color: #fe8990;
            }
            .green-color {
              color: #58de87;
            }
          }
        }
        .fenye {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0.3rem;
        }
        .equipment-list {
          background-color: #fff;
        //   width: 6.15rem;
          height: 7.6rem;
          margin-top: 0.1rem;
          overflow: auto;
          ul {
            li {
              position: relative;
              a {
                color: #333;
                display: inline-block;
                width: 100%;
                height: .44rem;
                font-size: .24rem;
                text-align: center;
                line-height: .43rem;
                transition: all .5s;
                border-bottom: 0.01rem solid #98c8e7;
                &:hover {
                    color: #fff;
                    background-color: #0090ff;
                }
              }
            }
          }
        }
      }
    }
    .dialog-box {
        left: 50%;
        top: 2.14rem;
        z-index: 200;
        width: 6.84rem;
        overflow: hidden;
        position: absolute;
        border-radius: .1rem;
        transform: translate(-50%);
        background-color: #fefefe;
        .title {
            color:#fff;
            height: .6rem;
            font-size: .24rem;
            line-height: .6rem;
            text-align: center;
            position: relative;
            font-weight: bolder;
            background: linear-gradient(to right, #6cc4ff, #489cff);
            a {
                top: 50%;
                right: .2rem;
                color: #fff;
                position: absolute;
                transform: translateY(-50%);
            }
        }
        .form {
            ul{
                padding-bottom: .3rem;
                li {
                    display: flex;
                    height: .71rem;
                    padding-top: .3rem;
                    >span {
                        width: 1.85rem;
                        height: .41rem;
                        font-size: .16rem;
                        text-align: right;
                        position: relative;
                        line-height: .41rem;
                        padding-right: .32rem;
                        display: inline-block;
                        .required {
                            top: -0.01rem;
                            right: .22rem;
                            color: #f00;
                            position: absolute;
                        }
                    }
                    .el-range-separator {
                        width: .3rem;
                    }
                }
            }
        }
        .confirm {
            height: .8rem;
            background-color: #f8f8f8;
            border-top: .01rem solid #dedede;
            .button {
                color: #fff;
                display: block;
                width: 1.63rem;
                height: .49rem;
                margin: 0 auto;
                font-size: .2rem;
                margin-top: .15rem;
                text-align: center;
                line-height: .47rem;
                transition: all .5s;
                border-radius: .02rem;
                background-color: #ffd14f;
                border: .01rem solid #d9b759;
                &:hover {
                    background-color: #d9b759
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
        background-color: rgba(0, 0, 0, .5);
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
        historyShow: false, // 历史记录时间对话框
        excelShow: false, // 导出Excel对话框状态
        equipmentShow: false, // 切换设备显示状态
        tableData: [
            {
                EX: 10, //EX
                O2: 20, //O2
                H2S: 13, //H2S
                CO: 5, //CO
            }
        ], // 列表数据
        pageNum: 1, // 当且页
        pageSize: 15, // 每页显示条数
        pageTotal: 1, // 总条数
        historyDate: [], // 历史记录时间值 
        excelDate: [], // 历史记录时间值 
        startTime: '', // 历史记录起始时间
        endTime: '', // 历史记录结束时间
        startTime2: '', // 导出Excel起始时间
        endTime2: '', // 导出Excel结束时间
    };
  },
  methods: {
    // 渲染气体预警占比图
    setProportion() {
      let myProportion = this.$echarts.init(
        document.getElementById("proportion")
      );
      myProportion.setOption({
        color: [
          "#3ada76",
          "#ff7a81",
          "#4fadef",
          "#f2a23a",
          "#f23a3a",
          "#9e3af2"
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "435px",
          y: "75px",
          itemWidth: 16, // 设置图例图形的宽
          itemHeight: 16, // 设置图例图形的高
          textStyle: {
            fontSize: "16",
            color: "#000"
          },
          data: ["EX", "O2", "H2S", "CO"]
        },
        series: [
          {
            name: "预警占比",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "24"
                  // fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 0, name: "EX" },
              { value: 0, name: "O2" },
              { value: 0, name: "H2S" },
              { value: 0, name: "CO" },
            ]
          }
        ]
      });
    },

    // 序号
    indexMethod(index) {
        return (this.pageNum-1)*this.pageSize+index+1
    },

    // 设备列表状态切换
    equipmentClick() {
        this.equipmentShow = !this.equipmentShow
    },

    // 获取开始时间与结束时间
    getTime() {
          // console.log(this.historyDate)
            this.historyDate?this.startTime = this.historyDate[0]:this.startTime=''
            this.historyDate?this.endTime = this.historyDate[1]:this.endTime=''
    },
    getTime2() {
            // console.log(this.excelDate)
            this.historyDate?this.startTime2 = this.excelDate[0]:this.startTime2=''
            this.historyDate?this.endTime2 = this.excelDate[1]:this.endTime2=''
    },
  },
  mounted() {
    this.setProportion();
  }
};
</script>