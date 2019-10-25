<template>
  <div id="taDiao">
    <div class="content">
      <div id="top">
        <div class="box">
          <div class="info">
            <div class="left">
              <img src="../../../../static/images/systemZhiHui-taDiaoOnLine.png" alt />
            </div>
            <div class="right">
              <p style="font-size:0.18rem;">在线塔机</p>
              <p style="font-size:0.26rem;margin-top:0.05rem">{{equipmentData.zxCrane}}</p>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="info">
            <div class="left">
              <img src="../../../../static/images/systemZhiHui-taDiaoOffLine.png" alt />
            </div>
            <div class="right">
              <p style="font-size:0.18rem;">离线塔机</p>
              <p style="font-size:0.26rem;margin-top:0.05rem">{{equipmentData.lxCrane}}</p>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="info">
            <div class="left">
              <img src="../../../../static/images/systemZhiHui-alertor.png" alt />
            </div>
            <div class="right">
              <p style="font-size:0.18rem;">报警统计</p>
              <p style="font-size:0.26rem;margin-top:0.05rem">{{equipmentData.bjtj}}</p>
            </div>
          </div>
        </div>
      </div>
      <div id="down">
        <div id="left">
          <div class="btnList">
            <div class="btn" @click="isShow=!isShow">
              <div class="left history"></div>
              <div class="right">历史记录</div>
            </div>
            <div class="btn" @click="equipmentShow=!equipmentShow">
              <div class="left cut"></div>
              <div class="right">切换设备</div>
            </div>
            <div class="btn" @click="dialogShow=true;excelDate=''">
              <div class="left derive"></div>
              <div class="right">导出Excel</div>
            </div>
          </div>
          <!-- 设备信息 -->
          <div class="person" v-show="!equipmentShow">
            <div class="title">{{equipmentData.dname}}</div>
            <img class="gongren" :src="equipmentData.rl" />
            <div class="gongrenInfo">
              <p style="margin-top:0.2rem">
                <span style="font-size: .2rem;">操作员</span>
                <span style="margin-left:0.2rem">{{equipmentData.name}}</span>
              </p>
              <p style="margin-top:0.2rem">
                <span style="font-size: .2rem;">上班时间</span>
                <span
                  style="margin-left:0.2rem"
                >{{equipmentData.sbTime.split(' ')[1]}}</span>
              </p>
            </div>
            <div class="day">
              <div class="bor"></div>
              <ss-calendar :checks="workDay" />
            </div>
            <div class="status">
              塔吊状态：
              <span>{{equipmentData.record?'在线':'离线'}}</span>
            </div>
          </div>
          <!-- 切换设备列表 -->
          <div class="equipment-list" v-show="equipmentShow">
            <ul>
              <li v-for="(item,index) in equipmentLisData" :key="index">
                <a @click="selectClick(item.hxzid)">{{item.dname}}</a>
              </li>
            </ul>
          </div>
        </div>
        <div id="right" v-show="isShow">
          <div class="information">
            <div class="title">实时数据</div>
            <div class="quan">
              <p class="num">{{equipmentData.record.load}}t</p>
              <p class="text">载重</p>
            </div>
            <div class="six">
              <div class="box">
                <div class="one">
                  力矩
                  <img src="../../../../static/images/systemZhiHui-taDiaoMomental.png" alt />
                </div>
                <div class="two"></div>
                <div class="three">{{equipmentData.record.moment}}%</div>
                <div class="four" style="background-color:#feb37f;"></div>
              </div>
              <div class="box">
                <div class="one">
                  风速
                  <img src="../../../../static/images/systemZhiHui-taDiaoWindSpeed.png" alt />
                </div>
                <div class="two"></div>
                <div class="three">{{equipmentData.record.windSpeed}}m/s</div>
                <div class="four" style="background-color:#ff7a81;"></div>
              </div>
              <div class="box">
                <div class="one">
                  高度
                  <img src="../../../../static/images/systemZhiHui-taDiaoAltitude.png" alt />
                </div>
                <div class="two"></div>
                <div class="three">{{equipmentData.record.height}}m</div>
                <div class="four" style="background-color:#3ada76;"></div>
              </div>
              <div class="box">
                <div class="one">
                  幅度
                  <img src="../../../../static/images/systemZhiHui-taDiaoRange.png" alt />
                </div>
                <div class="two"></div>
                <div class="three">{{equipmentData.record.range}}°</div>
                <div class="four" style="background-color:#3ada76;"></div>
              </div>
              <div class="box">
                <div class="one">
                  角度
                  <img src="../../../../static/images/systemZhiHui-taDiaoAngle.png" alt />
                </div>
                <div class="two"></div>
                <div class="three">{{equipmentData.record.slewingSpeed}}°</div>
                <div class="four" style="background-color:#3ada76;"></div>
              </div>
              <div class="box">
                <div class="one">
                  倍率
                  <img src="../../../../static/images/systemZhiHui-taDiaoDynameter.png" alt />
                </div>
                <div class="two"></div>
                <div class="three">X{{equipmentData.record.magnification}}</div>
                <div class="four" style="background-color:#3ada76;"></div>
              </div>
            </div>
            <div class="play">
              <video src controls="controls"></video>
              <p>点击播放监控</p>
            </div>
          </div>
          <div class="all">
            <div class="title">塔吊预警汇总统计</div>
            <ul>
              <li style="background-color: #0090ff;">
                <p class="name">限位报警</p>
                <p class="times">
                  <span class="num">{{equipmentData.xwbj}}</span>次
                </p>
              </li>
              <li style="background-color: #3ada76;">
                <p class="name">倾斜报警</p>
                <p class="times">
                  <span class="num"></span>无数据
                </p>
              </li>
              <li style="background-color: #ffb079;">
                <p class="name">吊重报警</p>
                <p class="times">
                  <span class="num">{{equipmentData.zzbj}}</span>次
                </p>
              </li>
              <li style="background-color: #ff7a81;">
                <p class="name">风速报警</p>
                <p class="times">
                  <span class="num"></span>无数据
                </p>
              </li>
              <li style="background-color: #ffb079;">
                <p class="name">障碍物碰撞</p>
                <p class="times">
                  <span class="num">{{equipmentData.pzbj}}</span>次
                </p>
              </li>
              <li style="background-color: #0090ff;">
                <p class="name">塔吊碰撞</p>
                <p class="times">
                  <span class="num"></span>无数据
                </p>
              </li>
              <li style="background-color: #ff7a81;">
                <p class="name">传感器故障</p>
                <p class="times">
                  <span class="num">{{equipmentData.cgqbj}}</span>次
                </p>
              </li>
              <li style="background-color: #3ada76;">
                <p class="name">进入禁行区</p>
                <p class="times">
                  <span class="num">{{equipmentData.jrqbj}}</span>次
                </p>
              </li>
            </ul>
          </div>
          <div class="zhanbitu">
            <div class="title">塔吊预警占比图</div>
            <div id="proportion" style="width: 5.5rem;height:3.1rem;"></div>
          </div>
        </div>
        <div id="infoList" v-show="!isShow">
          <div class="header">
            <p class="left">
              时间：
              <el-date-picker
                v-model="time"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择"
                @change="searchHistory"
              ></el-date-picker>
            </p>
            <p class="right">
              状态：
              <el-select v-model="status" placeholder="请选择" clearable @change="searchHistory">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </p>
          </div>
          <div class="table">
            <el-table :data="tableData" stripe border>
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column type="index" label="序号" width="80" :index="indexMethod"></el-table-column>
              <el-table-column label="载重" width="100">
                <template slot-scope="scope">
                  <div
                    :class="scope.row.load < 100?'green-color':scope.row.load>=100?'red-color':''"
                  >{{ scope.row.load}}t</div>
                </template>
              </el-table-column>
              <el-table-column label="力矩" width="100">
                <template slot-scope="scope">
                  <div>{{ scope.row.moment}}%</div>
                </template>
              </el-table-column>
              <el-table-column label="风速" width="110">
                <template slot-scope="scope">
                  <div>{{ scope.row.windSpeed}}m/s</div>
                </template>
              </el-table-column>
              <el-table-column label="高度" width="110">
                <template slot-scope="scope">
                  <div>{{ scope.row.height}}m</div>
                </template>
              </el-table-column>
              <el-table-column label="幅度" width="110">
                <template slot-scope="scope">
                  <div>{{ scope.row.range}}m</div>
                </template>
              </el-table-column>
              <el-table-column label="角度" width="110">
                <template slot-scope="scope">
                  <div>{{ scope.row.slewingSpeed}}°</div>
                </template>
              </el-table-column>
              <el-table-column label="倍率" width="110">
                <template slot-scope="scope">
                  <div>x{{ scope.row.magnification}}</div>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="status" label="状态" width="120" sortable="custom">
                <template slot-scope="scope">
                  <div
                    :class="scope.row.status=='合格'?'green-color':scope.row.status=='不合格'?'red-color':''"
                  >{{ scope.row.status }}</div>
                </template>
              </el-table-column>-->
              <el-table-column prop="runtime" label="时间"></el-table-column>
            </el-table>
          </div>
          <div class="fenye">
            <!-- 分页的两个事件 -->

            <!-- @size-change="handleSizeChange"
            @current-change="handleCurrentChange"-->
            <el-pagination
              :current-page="pageNum"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="pageTotal"
              @current-change="handleCurrentChange"
            ></el-pagination>
          </div>
        </div>
      </div>
      <!-- 导出Excel -->
      <div class="dialog-box" v-show="dialogShow">
        <div class="title">
          选择日期
          <a class="close" @click="dialogShow=false">
            <i class="el-icon-close"></i>
          </a>
        </div>
        <div class="form">
          <ul>
            <li>
              <span>日期：</span>
              <el-date-picker
                v-model="excelDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择"
              ></el-date-picker>
            </li>
          </ul>
        </div>
        <div class="confirm">
          <a class="button" @click="historyRecordExcel">确定</a>
        </div>
      </div>
      <!-- 遮罩层 -->
      <div class="shade-box" v-show="dialogShow"></div>
    </div>
  </div>
</template>

<script>
import ssCalendar from "../ss-calendar/ss-calendar.vue";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      projectId: "", // 项目id
      isShow: true, // 历史记录状态
      equipmentShow: false, // 设备列表状态
      dialogShow: false, // 导出Excel日期对话框
      excelDate: "", // 导出Excel日期
      equipmentData: {}, // 当前设备数据
      equipmentLisData: [], // 设备列表数据
      pageNum: 1, // 当前页
      pageSize: 20, // 每页显示条数
      pageTotal: 0, // 总条数
      time: "", // 历史数据时间
      status: "", // 历史记录状态
      statusOptions: [
        {
          value: 1,
          label: "合格"
        },
        {
          value: 0,
          label: "不合格"
        }
      ],
      tableData: [], // 列表数据
      workDay: [], // 工人上班日期
    };
  },
  created() {
    this.getProjectId();
    this.selectIndex();
    this.switchDevice();
  },
  methods: {
    // 获取项目id
    getProjectId() {
      this.projectId = sessionStorage.getItem("pid");
    },

    // 当前页
    handleCurrentChange(val) {
      // console.log(`当前页：${val}`)
      this.pageNum = val
      this.pageClick()
    },

    // 渲染塔吊预警占比图
    setProportion(data) {
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
          x: "445px",
          y: "75px",
          itemWidth: 16, // 设置图例图形的宽
          itemHeight: 16, // 设置图例图形的高
          textStyle: {
            fontSize: "16",
            color: "#000"
          },
          data: ["限位", "载重", "碰撞", "传感器", "禁入区"]
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
              { value: data.xwbj, name: "限位" },
              { value: data.zzbj, name: "载重" },
              { value: data.pzbj, name: "碰撞" },
              { value: data.cgqbj, name: "传感器" },
              { value: data.jrqbj, name: "禁入区" }
            ]
          }
        ]
      });
    },

    // 序号
    indexMethod(index) {
      return (this.pageNum - 1) * this.pageSize + index + 1;
    },

    // 获取塔吊页面数据和工人上班日期
    selectIndex() {
      this.$axios
        .post(`/api/craneApi/selectIndex?pid=${this.projectId}`)
        .then(res => {
          // console.log(res.data)
          this.equipmentData = res.data.data
          for (let i = 0; i < res.data.data.recordList.length; i++) {
            this.workDay.push(Number(res.data.data.recordList[i].passedTime.split(' ')[0].split('-')[2]))
          }
          console.log(this.workDay)
          this.historyRecord()
          setTimeout(() => {
            this.setProportion(res.data.data)
          }, 100)
        })
    },

    // 切换设备
    selectClick(hxzid) {
      this.$axios
        .post(`/api/craneApi/selectIndex?pid=${this.projectId}&hxzid=${hxzid}`)
        .then(res => {
          // console.log(res.data)
          this.isShow = true
          this.equipmentShow = false
          this.equipmentData = res.data.data
          this.historyRecord()
          setTimeout(() => {
            this.setProportion(res.data.data)
          }, 100)
        })
    },

    // 获取设备列表
    switchDevice() {
      this.$axios
        .post(`/api/craneApi/switchDevice?pid=${this.projectId}`)
        .then(res => {
          // console.log(res.data)
          this.equipmentLisData = res.data.data;
        });
    },

    // 获取历史数据
    historyRecord() {
      this.$axios
        .post(
          `/api/craneApi/historyRecord?hxzid=${this.equipmentData.hxzid}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`
        )
        .then(res => {
          // console.log(res.data)
          this.pageTotal = res.data.data.total
          this.tableData = res.data.data.rows
        })
    },

    // 历史记录搜索
    searchHistory() {
      this.pageNum = 1
      this.$axios
        .post(
          `/api/craneApi/historyRecord?hxzid=${this.equipmentData.hxzid}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&time=${this.time}&status=${this.status}`
        )
        .then(res => {
          // console.log(res.data)
          this.pageTotal = res.data.data.total
          this.tableData = res.data.data.rows
        })
    },

    // 翻页
    pageClick() {
      this.$axios
        .post(
          `/api/craneApi/historyRecord?hxzid=${this.equipmentData.hxzid}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&time=${this.time}&status=${this.status}`
        )
        .then(res => {
          // console.log(res.data)
          this.pageTotal = res.data.data.total
          this.tableData = res.data.data.rows
        })
    },

    // 导出Excel
    historyRecordExcel() {
      if (this.excelDate) {
        this.dialogShow = false 
        location.href = `http://47.106.71.3:8080/api/craneApi/historyRecordExcel?hxzid=${this.equipmentData.hxzid}&time=${this.excelDate}`
      } else {
        this.$message({
          message: '请选择日期',
          type: 'warning'
        })
      }
    },
  },
  mounted() {
    // this.setProportion()
  },
  components: {
    // 日历组件
    ssCalendar
  }
};
</script>

<style lang="less">
#taDiao {
  background-color: #f7f7f7;
  width: 100%;
  .content {
    // height: 100%;
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
          width: 1.52rem;
          display: flex;
          justify-content: space-around;
          margin-top: 0.24rem;
          .left {
            width: 0.5rem;
            height: 0.52rem;
            // background-color: hotpink;
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
      #left {
        width: 4rem;
        margin-top: 0.1rem;
        .btnList {
          width: 100%;
          height: 0.7rem;
          background-color: #fff;
          padding: 0.2rem;
          display: flex;
          justify-content: space-between;
          .btn {
            width: 1.04rem;
            height: 0.28rem;
            border: 1px solid #0090ff;
            border-radius: 0.04rem;
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
              .history {
                background-image: url("../../../../static/images/system-dateHover.png");
              }
              .cut {
                background-image: url("../../../../static/images/systemGreen-cutHover.png");
              }
              .derive {
                background-image: url("../../../../static/images/system-deriveHover.png");
              }
            }
            .history {
              background-image: url("../../../../static/images/system-date.png");
            }
            .cut {
              background-image: url("../../../../static/images/systemGreen-cut.png");
            }
            .derive {
              background-image: url("../../../../static/images/system-derive.png");
            }
          }
        }
        .person {
          height: 7.6rem;
          margin-top: 0.1rem;
          background-color: #fff;
          padding-top: 0.38rem;
          text-align: center;
          .title {
            font-size: 0.24rem;
            font-weight: bold;
            text-align: center;
          }
          .gongren {
            width: 1.5rem;
            height: 1.5rem;
            margin-top: 0.38rem;
          }
          .gongrenInfo {
            font-size: 0.21rem;
          }
          .day {
            position: relative;
            margin-top: 0.5rem;
            height: 2.84rem;
            .bor {
              height: 100%;
              width: 3.1rem;
              box-shadow: 0 0 0.5rem -0.3rem #666;
              position: absolute;
              left: 0.4rem;
            }
          }
          .status {
            margin-top: 0.4rem;
            font-size: 0.22rem;
            span {
              color: #3ada76;
            }
          }
        }
        .equipment-list {
          height: 7.6rem;
          margin-top: 0.1rem;
          background-color: #fff;
          overflow: auto;
          ul {
            li {
              // position: relative;
              a {
                color: #333;
                display: inline-block;
                width: 100%;
                height: 0.44rem;
                font-size: 0.24rem;
                text-align: center;
                line-height: 0.43rem;
                transition: all 0.5s;
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
      #right {
        position: relative;
        flex: 1;
        margin-left: 0.1rem;
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
            text-align: center;
            // box-shadow: 0px 0px 0px 0.27rem #fff inset;
            background-image: url("../../../../static/images/systemZhiHui-circle.png");
            background-size: contain;
            .num {
              font-size: 0.32rem;
              color: #fff;
              font-weight: bolder;
              margin-top: 0.9rem;
            }
            .text {
              font-size: 0.22rem;
              color: #fff;
              margin-top: 0.1rem;
            }
          }
          .six {
            width: 4.8rem;
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
                font-size: 0.24rem;
                margin-top: 0.15rem;
                img {
                  // width: 0.4rem;
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
          .play {
            position: absolute;
            top: 1.07rem;
            right: 0.46rem;
            text-align: center;
            video {
              width: 2.48rem;
              height: 1.38rem;
            }
            p {
              font-size: 0.22rem;
              cursor: pointer;
              color: #0090ff;
              margin-top: 0.25rem;
              &:hover {
                color: royalblue;
              }
            }
          }
        }
        .all {
          width: 6.82rem;
          height: 4.14rem;
          margin-top: 0.1rem;
          background-color: #fff;
          padding: 0.25rem;
          ul {
            display: flex;
            flex-wrap: wrap;
            margin-left: -0.2rem;
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
          width: 5.66rem;
          height: 4.14rem;
          background-color: #fff;
          #proportion {
            transform: translateX(-0.5rem);
            margin-top: 0.2rem;
          }
        }
      }
      #infoList {
        position: relative;
        flex: 1;
        margin-left: 0.1rem;
        background-color: #fff;
        margin-top: 0.1rem;
        .header {
          width: 100%;
          height: 0.7rem;
          background-color: #fff;
          position: relative;
          line-height: 0.7rem;
          text-align: center;
          p {
            font-size: 0.18rem;
            input {
              width: 2.58rem;
              height: 0.38rem;
              border: 1px solid #b6b6b6;
              border-radius: 0.04rem;
            }
          }
          .left {
            float: left;
            margin-left: 2.6rem;
          }
          .right {
            float: right;
            margin-right: 2.66rem;
          }
        }
        .table {
          width: 100%;
          min-height: 5.6rem;
          margin-top: 0.1rem;
          .el-table {
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
            .red-color {
              color: #fe8990;
            }
            .green-color {
              color: #58de87;
            }
            .checkrow {
              background-color: #fdefc6;
            }
          }
        }
        .fenye {
          position: absolute;
          right: 0.6rem;
          bottom: 0.3rem;
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
        ul {
          padding-bottom: 0.3rem;
          li {
            display: flex;
            height: 0.71rem;
            padding-top: 0.3rem;
            > span {
              width: 2.85rem;
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
            .el-range-separator {
              width: 0.3rem;
            }
            input {
                // width: 3.5rem;
                height: .4rem;
                border: .01rem solid #333;
                border-radius: .04rem;
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