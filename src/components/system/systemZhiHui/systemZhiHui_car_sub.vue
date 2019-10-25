<template>
  <div id="systemZhiHui_car_sub">
    <div id="content">
      <div id="top">
        <div class="box">
          <div class="info">
            <div class="left" style="transform: translate(-.3rem)">
              <img src="../../../../static/images/systemZhiHui-carOnLine.png" alt="">
            </div>
            <div class="right">
              <p style="font-size:0.18rem;">在线车辆系统</p>
              <p style="font-size:0.26rem;margin-top:0.05rem">{{ count }}</p>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="info">
            <div class="left" style="transform: translate(-.3rem)">
              <img src="../../../../static/images/systemZhiHui-carOffLine.png" alt="">
            </div>
            <div class="right">
              <p style="font-size:0.18rem;">离线车辆系统</p>
              <p style="font-size:0.26rem;margin-top:0.05rem">0</p>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="info">
            <div class="left">
              <img src="../../../../static/images/systemZhiHui-truckSpace.png" alt="">
            </div>
            <div class="right">
              <p style="font-size:0.18rem;">剩余车位</p>
              <p style="font-size:0.26rem;margin-top:0.05rem">{{pkcount.pkcount}}</p>
            </div>
          </div>
        </div>
      </div>
      <div id="down">
        <div id="left">
          <div class="btnList">
            <!-- <div class="btn">
              <div class="left cut">
                <img>
              </div>
              <div class="right">切换设备</div>
            </div> -->
            <div class="btn" @click="$router.push('/systemZhiHui_car')">
              <div class="left history">
                <img>
              </div>
              <div class="right">历史记录</div>
            </div>
            <div class="btn" @click="$router.push('/systemZhiHui_car')">
              <div class="left car">
                <img>
              </div>
              <div class="right">场内车辆</div>
            </div>
            <div class="btn">
              <div class="left derive">
                <img>
              </div>
              <div class="right">导出Excel</div>
            </div>
            <div class="btn yellow" @click="$router.push('/systemZhiHui_car')">
              <div class="left waste">
                <img>
              </div>
              <div class="right">车辆管理</div>
            </div>
          </div>
        </div>
        <div id="rightTwo">
          <div class="searchBox">
            <ul>
              <li>
                驾驶员：
                <el-input placeholder="请输入驾驶员姓名" v-model="all"></el-input>
              </li>
              <li>
                进出类型：
                <el-select v-model="inOut" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                  </el-option>
                </el-select>
              </li>
              <li>
                进出时间：
                <el-date-picker
                  v-model="liftTime"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </li>
              <!-- <li id="longer">
                &#12288;关键字：
                <el-input placeholder="输入驾驶员、车牌通道......"></el-input>
              </li> -->
            </ul>
            <div class="btn" @click="searchClick">搜索</div>
          </div>
        </div>
      </div>
      <div class="table">
        <div class="tableBox">
          <el-table :data="allTableData" stripe border>
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column type="index"
                            label="序号"
                            width="69"
                            :index="indexMethod"></el-table-column>
            <el-table-column prop="cameraMaccameraMac" label="编号" width="111"></el-table-column>
            <el-table-column prop="vehicleNo" label="车牌号" width="144"></el-table-column>
            <el-table-column prop="gongdiName" label="工地名称" width="209"></el-table-column>
            <el-table-column prop="gongdiBianHao" label="工地编号" width="159"></el-table-column>
            <el-table-column prop="gateinname" label="闸机编号" width="169"></el-table-column>
            <el-table-column prop="inOut" label="进出类型" width="188">
              <template slot-scope="scope">
                {{ scope.row.inOut == 1?'进':'出' }}
              </template>
            </el-table-column>
            <el-table-column prop="liftTime" label="进出时间" width="276"></el-table-column>
            <el-table-column label="进出照片" align="center">
              <template slot-scope="scope">
                <img :src="scope.row.img" width="90" height="53">
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="fenye">
          <!-- 分页的两个事件 -->

          <!-- @size-change="handleSizeChange"
          @current-change="handleCurrentChange"-->
          <el-pagination
            :current-page="pageNum"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="pageTotal"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allTableData: [], // 列表数据
      pageSize: 8, // 每页条数
      pageNum: 1, // 当前页
      pageTotal: 0, // 总条数
      projectId: 0, // 项目id
      deptID: 0, // 车场id
      getNameState: 0, // 只从URL中拿一次值
      pkcount: '', // 剩余车位
      options: [
        {
          value: 1,
          label: '进'
        },
        {
          value: 2,
          label: '出'
        }
      ], // 进出类型选项
      inOut: '', // 进出类型
      liftTime: '', // 进出时间
      all: '', // 驾驶员姓名或通道名称
      count: '', // 在线车辆系统
    };
  },
  created() {
    this.getProjectId()
    this.getDeptID()
  },
  methods: {
    // 获取项目id
    getProjectId() {
      this.projectId = sessionStorage.getItem(`pid`)
    },

    // 获取剩余车位
    selectpkcount() {
      this.$axios.post(`/api/parkings/selectpkcount?deptID=${this.deptID}`).then(
        res => {
          console.log(res.data)
          this.pkcount = res.data.data[0]
          this.count = res.data.count
        }
      )
    },

    // 获取实时监控页面传过来的值
    getDeptID() {
        // console.log(this.$route.query.orderId)
        if (this.$route.query.orderId != undefined && this.getNameState == 0) {
            this.deptID = this.$route.query.orderId
            this.getNameState = 1
            this.getIndexData()
            this.selectpkcount()
        }
    },

    // 序号
    indexMethod(index) {
        return (this.pageNum-1)*this.pageSize+index+1
    },

    // 翻页
    handleCurrentChange(val) {
      this.pageNum = val
      this.getIndexData()
    },

    // 获取页面数据
    getIndexData() {
      this.$axios.post(`/api/parkings/selectAll?deptID=${this.deptID}&pageSize=${this.pageSize}&pageNum=${this.pageNum}&carType=1&inOut=${this.inOut}&all=${this.all}&liftTime=${this.liftTime?this.liftTime:''}`).then(
        res => {
          // console.log(res.data)
          this.allTableData = res.data.data.rows
          this.pageTotal = res.data.data.total
        }
      )
    },

    // 搜索
    searchClick() {
      this.pageNum = 1
      this.$axios.post(`/api/parkings/selectAll?deptID=${this.deptID}&pageSize=${this.pageSize}&pageNum=${this.pageNum}&carType=1&inOut=${this.inOut}&all=${this.all}&liftTime=${this.liftTime?this.liftTime:''}`).then(
        res => {
          // console.log(res.data)
          this.allTableData = res.data.data.rows
          this.pageTotal = res.data.data.total
        }
      )
    },
  }
};
</script>

<style lang="less">
#systemZhiHui_car_sub {
  width: 100%;
  background-color: #f7f7f7;
  #content {
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
          width: 1.62rem;
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
      margin-top: 0.1rem;
      display: flex;
      #left {
        width: 4rem;
        .btnList {
          width: 100%;
          height: 1.2rem;
          background-color: #fff;
          .btn {
            float: left;
            width: 1.04rem;
            height: 0.28rem;
            border: 1px solid #0090ff;
            border-radius: 0.04rem;
            display: flex;
            line-height: 0.28rem;
            color: #0090ff;
            margin-top: 0.2rem;
            margin-left: 0.2rem;
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
                background-image: url('../../../../static/images/system-dateHover.png');
              }
              .cut {
                background-image: url('../../../../static/images/systemGreen-cutHover.png');
              }
              .derive {
                background-image: url('../../../../static/images/system-deriveHover.png');
              }
              .car {
                background-image: url('../../../../static/images/system-carHover.png');
              }
            }
            .history {
              background-image: url('../../../../static/images/system-date.png');
            }
            .cut {
              background-image: url('../../../../static/images/systemGreen-cut.png');
            }
            .derive {
              background-image: url('../../../../static/images/system-derive.png');
            }
            .car {
              background-image: url('../../../../static/images/system-car.png');
            }
            .waste {
              background-image: url('../../../../static/images/systemZhiHui-waste.png');
            }
          }
          .yellow {
            color: #fff;
            width: 1.15rem;
            background-color: #ffd14f;
            border: 1px solid #d4ad40;
            &:hover {
              color: #fff;
              background-color: #fcb928;
            }
          }
        }
        .carInfo {
          height: 7.15rem;
          margin-top: 0.1rem;
          background-color: #fff;
          padding-top: 0.38rem;
          text-align: center;
          .title {
            font-size: 0.24rem;
            font-weight: bold;
            text-align: center;
          }
          .carimg {
            margin-top: 0.37rem;
            img {
              width: 2.59rem;
              height: 1.54rem;
              border: 0.03rem solid #0090ff;
            }
          }
          .infoBox {
            text-align: left;
            margin-left: 0.68rem;
            ul {
              margin-top: -0.14rem;
              li {
                font-size: 0.2rem;
                margin-top: 0.34rem;
                span {
                  font-size: 0.22rem;
                }
              }
            }
          }
          .status {
            margin-top: 0.3rem;
            font-size: 0.22rem;
            span {
              color: #3ada76;
            }
          }
        }
      }
      #rightTwo {
        flex: 1;
        margin-left: 0.1rem;
        .searchBox {
          width: 100%;
          height: 1.2rem;
          background-color: #fff;
          position: relative;
          ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding-left: 0.2rem;
            li {
              margin-top: 0.15rem;
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
                border-radius: 0.05rem;
              }
            }
            #longer {
              width: 6.3rem;
              .el-input {
                width: 5.02rem;
                height: 0.38rem;
              }
              input {
                width: 5.02rem;
                height: 0.38rem;
                border: 0.01rem solid #b6b6b6;
                border-radius: 0.05rem;
              }
            }
          }
          .btn {
            width: 1.61rem;
            height: 0.38rem;
            background-color: #ffd14f;
            border: 0.01rem solid #d4ad40;
            border-radius: 0.05rem;
            color: #fff;
            font-size: 0.2rem;
            text-align: center;
            line-height: 0.38rem;
            position: absolute;
            right: 0.28rem;
            bottom: 0.15rem;
            cursor: pointer;
            &:hover {
              color: #fff;
              background-color: #fcb928;
            }
          }
        }
      }
    }
    .table {
      padding: 0.2rem 0.21rem;
      background-color: #fff;
      height: 7.1rem;
      margin-top: 0.1rem;
      position: relative;
      .tableBox {
        width: 16.26rem;
      }
      .fenye {
        position: absolute;
        right: 0.6rem;
        bottom: 0.3rem;
      }

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
            height: 0.7rem;
            color: #646464;
            line-height: 0.7rem;
            font-size: 0.16rem;
          }
        }
      }
    }
  }
}
</style>