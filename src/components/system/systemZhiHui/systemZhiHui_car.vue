<template>
  <div id="systemZhiHui_car">
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
            <div class="btn" @click="equipmentShow = !equipmentShow">
              <div class="left cut">
                <img>
              </div>
              <div class="right">切换设备</div>
            </div>
            <div class="btn"  @click="isShow=='two'?isShow='one':isShow='two'">
              <div class="left history">
                <img>
              </div>
              <div class="right">历史记录</div>
            </div>
            <div class="btn" @click="isShow=='three'?isShow='one':isShow='three'">
              <div class="left car">
                <img>
              </div>
              <div class="right">场内车辆</div>
            </div>
            <div class="btn" @click="down">
              <div class="left derive">
                <img>
              </div>
              <div class="right">导出Excel</div>
            </div>
            <div class="btn yellow">
              <div class="left waste">
                <img>
              </div>
              <div class="right"  @click="$router.push({ path:'/systemZhiHui_car_sub',query: { orderId: deptID}})">废弃物监管</div>
            </div>
          </div>
          <div class="carInfo" v-show="!equipmentShow">
            <div class="title">车辆进出实时情况</div>
            <div class="carimg">
              <img :src="newData.img" alt="">
            </div>
            <div class="infoBox">
              <ul>
                <li>
                  <span>驾驶员：</span>{{newData.name}}
                </li>
                <li>
                  <span>车牌号：</span>{{newData.vehicleNo}}
                </li>
                <li>
                  <span>通道名称：</span>{{newData.gateinname}}
                </li>
                <li>
                  <span>进出类型：</span>{{newData.inOut==1?'进':'出'}}
                </li>
                <li>
                  <span>车辆类型：</span>{{newData.cardType==0?'临时车':'月租车'}}
                </li>
                <li>
                  <span>抬杆方式：</span>自动抬杆
                </li>
                <li>
                  <span>进出时间：</span>{{newData.liftTime}}
                </li>
              </ul>
            </div>
            <div class="status">
              设备状态：
              <span>在线</span>
            </div>
          </div>
          <!-- 设备列表 -->
          <div class="equipment-list" v-show="equipmentShow">
            <ul>
              <li v-for="(item,index) in equipmentList" :key="index">
                <a @click="selectEquipment(item)">{{item.snName}}</a>
              </li>
            </ul>
          </div>
        </div>
        <div id="rightOne" v-show="isShow=='one'">
          <div class="into">
            <div class="title">实时进场</div>
            <div class="tableBox">
              <el-table :data="intoTableData" stripe border style="width: 100%">
                <el-table-column type="index"
                            label="序号"
                            width="80"
                            :index="indexMethod2"></el-table-column>
                <el-table-column prop="name" label="驾驶员" width="195"></el-table-column>
                <el-table-column prop="vehicleNo" label="车牌号" width="173"></el-table-column>
                <el-table-column prop="gateinname" label="通道名称" width="179"></el-table-column>
                <el-table-column label="进出类型" width="193">
                  <template slot-scope="scope">
                    {{ scope.row.inOut==1?'进':'出' }}
                  </template>
                </el-table-column>
                <el-table-column label="车辆类型" width="144">
                  <template slot-scope="scope">
                    {{ scope.row.cardType==0?'临时车':'月租车' }}
                  </template>
                </el-table-column>
                <el-table-column prop="liftTime" label="时间"></el-table-column>
              </el-table>
            </div>
          </div>
          <div class="outin">
            <div class="title">实时出场</div>
            <div class="tableBox">
              <el-table :data="outinTableData" stripe border style="width: 100%">
                <el-table-column type="index"
                            label="序号"
                            width="80"
                            :index="indexMethod2"></el-table-column>
                <el-table-column prop="name" label="驾驶员" width="195"></el-table-column>
                <el-table-column prop="vehicleNo" label="车牌号" width="173"></el-table-column>
                <el-table-column prop="gateinname" label="通道名称" width="179"></el-table-column>
                <el-table-column label="进出类型" width="193">
                  <template slot-scope="scope">
                    {{ scope.row.inOut==1?'进':'出' }}
                  </template>
                </el-table-column>
                <el-table-column label="车辆类型" width="144">
                  <template slot-scope="scope">
                    {{ scope.row.cardType==0?'临时车':'月租车' }}
                  </template>
                </el-table-column>
                <el-table-column prop="liftTime" label="时间"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div id="rightTwo" v-show="isShow=='two'">
          <div class="searchBox">
            <ul>
              <li>
                进出时间：
                <el-date-picker
                  v-model="liftTime"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </li>
              <li>
                进出类型：
                <el-select v-model="inOut" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </li>
              <li>
                &#12288;&#12288;搜索：
                <el-input placeholder="输入驾驶员、车牌通道......" v-model="all"></el-input>
              </li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <div class="btn" @click="searchClick">搜索</div>
          </div>
          <!-- 历史记录 -->
          <div class="table">
            <div class="tableBox">
              <el-table :data="allTableData" stripe border>
                <el-table-column type="index"
                            label="序号"
                            width="80"
                            :index="indexMethod"></el-table-column>
                <el-table-column prop="name" label="驾驶员" width="195"></el-table-column>
                <el-table-column prop="vehicleNo" label="车牌号" width="173"></el-table-column>
                <el-table-column prop="gateinname" label="通道名称" width="179"></el-table-column>
                <el-table-column prop="inOut" label="进出类型" width="193">
                  <template slot-scope="scope">
                    {{ scope.row.inOut==1?'进':'出' }}
                  </template>
                </el-table-column>
                <el-table-column prop="cardType" label="车辆类型" width="144">
                  <template slot-scope="scope">
                    {{ scope.row.cardType==0?'临时车':'月租车' }}
                  </template>
                </el-table-column>
                <el-table-column prop="liftTime" label="时间"></el-table-column>
              </el-table>
            </div>
            <div class="fenye">
              <!-- 分页的两个事件 -->

              <!-- @size-change="handleSizeChange"
              @current-change="handleCurrentChange"-->
              <el-pagination
                :current-page="historyPageNum"
                :page-size="historyPageSize"
                layout="total, prev, pager, next, jumper"
                :total="historyPageTotal"
                @current-change="handleCurrentChange"
              ></el-pagination>
            </div>
          </div>
        </div>
        <!-- 场内车辆 -->
        <div id="rightThree" v-show="isShow=='three'">
          <div class="car">
            <span>车辆类型：</span>
            <ul>
              <li @click="cardType=3" :class="cardType==3?'active':''">全部</li>
              <li @click="cardType=0" :class="cardType==0?'active':''">临时车</li>
              <li @click="cardType=1" :class="cardType==1?'active':''">月租车</li>
            </ul>
          </div>
          <div class="time">
            <span>停车时长：</span>
            <ul>
              <li @click="ihour=0" :class="ihour==0?'active':''">全部</li>
              <li @click="ihour=1" :class="ihour==1?'active':''">1小时</li>
              <li @click="ihour=2" :class="ihour==2?'active':''">2小时</li>
              <li @click="ihour=3" :class="ihour==3?'active':''">3小时</li>
              <li @click="ihour=4" :class="ihour==4?'active':''">4小时</li>
            </ul>
            <!-- <div class="input">
              <input type="number">&nbsp;&nbsp;-
              &nbsp;
              <input type="number">&nbsp;&nbsp;&nbsp;小时
            </div> -->
          </div>
          <div class="search">
            关键字：
            <input type="text" placeholder="请输入车牌号码查询" v-model="vehicleNo">
            <span class="btn" @click="inquireClick">查询</span>
            <div class="info">
              <p>
                场内共
                <span style="color:#ffd14f">{{carSum}}&nbsp;</span>辆车
              </p>
              <p>
                剩余
                <span style="color:#3ada76">{{pkcount.pkcount}}&nbsp;</span>个车位
              </p>
            </div>
          </div>
          <div class="carList">
            <ul id="ul">
              <li v-for="(item,index) in truckSpace" :key="index">
                <p class="head">{{item.vehicleNo}}({{item.cardType==0?'临时车':'月租车'}})</p>
                <img :src="item.img">
                <p class="into">
                  <span style="color:#fcd178">{{item.liftTime}}</span>&nbsp;
                </p>
                <p class="intoTime">
                  已停放&nbsp;
                  <span style="color:#fcd178">{{item.days}}</span>天&nbsp;
                  <span style="color:#fcd178">{{item.hours}}</span>&nbsp;小时
                </p>
              </li>
            </ul>
            <div class="fenye">
              <!-- 分页的两个事件 -->
              <!-- @size-change="handleSizeChange"
              @current-change="handleCurrentChange"-->
              <el-pagination
                :current-page="truckSpacePageNum"
                :page-size="truckSpacePageSize"
                layout="total, prev, pager, next, jumper"
                :total="truckSpacePageTotal"
                @current-change="handleCurrentChange2"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      projectId: 0, // 项目id
      intoTableData: [], // 实时进场列表
      outinTableData: [], // 实时出场列表
      allTableData: [], // 历史记录列表
      newData: '', // 最新进场数据
      isShow: "one", // 当前模块
      equipmentList: [], // 设备列表
      deptID: 0, // 车场id
      truckSpace: [], // 剩余车位数据
      pkcount: [], // 剩余车位数据
      equipmentShow: false, // 切换设备列表状态
      historyPageNum: 1, // 历史记录当前页
      historyPageSize: 15, // 历史记录每页条数
      historyPageTotal: 0, // 历史记录总条数
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
      inOut: '', // 进出方向
      liftTime: '', // 时间
      all: '', // 驾驶员或通道名称
      truckSpacePageSize: 10, // 车位每页条数
      truckSpacePageNum: 1, // 车位当前页
      truckSpacePageTotal: 0, // 车位总条数
      vehicleNo: '', // 车牌
      ihour: 0, // 停放时间
      cardType: 3, // 车辆类型
      sn: '', // 设备编号
      count: '', // 在线车辆系统
      carSum: '', // 场内车数量
    }
  },
  created() {
    this.getProjectId()
    this.getEquipmentList()
  },
  methods: {
    // 获取项目id
    getProjectId() {
      this.projectId = sessionStorage.getItem('pid')
    },

    // 序号
    indexMethod(index) {
        return (this.historyPageNum-1)*this.historyPageSize+index+1
    },

    // 实时进场序号
    indexMethod2(index) {
        return index = 1+index++
    },

    // 获取设备列表
    getEquipmentList() {
      this.$axios.post(`/api/parkings/selectpkcount?projectId=${this.projectId}`).then(
        res => {
          // console.log(res.data)
          this.equipmentList = res.data.data
          this.deptID = this.equipmentList[0].deviceId
          this.selectpkcount()
          this.selectAll()
          this.selectScene()
          this.getCarSum()
          this.selectIn()
          this.selectOut()
          this.selectNew()
        }
      )
    },

    // 选择设备
    selectEquipment(item) {
      this.deptID = item.deviceId
      this.sn = item.sn
      this.equipmentShow = false
      this.selectpkcount()
      this.selectAll()
      this.selectScene()
      this.getCarSum()
      this.selectIn()
      this.selectOut()
      this.selectNew()
      this.isShow = 'one'
    },

    // 获取剩余车位
    selectpkcount() {
      this.$axios.post(`/api/parkings/selectpkcount?deptID=${this.deptID}`).then(
        res => {
          // console.log(res.data)
          this.count = res.data.count
          this.pkcount = res.data.data[0]
        }
      )
    },

    // 查询车辆进出数据列表
    selectAll() {
      this.$axios.post(`/api/parkings/selectAll?deptID=${this.deptID}&pageSize=${this.historyPageSize}&pageNum=${this.historyPageNum}&inOut=${this.inOut}&all=${this.all}&liftTime=${this.liftTime?this.liftTime:''}`).then(
        res => {
          // console.log(res.data)
          this.allTableData = res.data.data.rows
          this.historyPageTotal = res.data.data.total
        }
      )
    },

    // 搜索
    searchClick() {
      this.historyPageNum = 1
      this.$axios.post(`/api/parkings/selectAll?deptID=${this.deptID}&pageSize=${this.historyPageSize}&pageNum=${this.historyPageNum}&inOut=${this.inOut}&all=${this.all}&liftTime=${this.liftTime?this.liftTime:''}&sn=${this.sn}`).then(
        res => {
          // console.log(res.data)
          this.allTableData = res.data.data.rows
          this.historyPageTotal = res.data.data.total
        }
      )
    },

    // 历史记录翻页
    handleCurrentChange(val) {
      this.historyPageNum = val
      this.selectAll()
    },

    // 查询实时进场车辆
    selectIn() {
      this.$axios.post(`/api/parkings/selectAll?deptID=${this.deptID}&pageSize=8&pageNum=1&inOut=1&&sn=${this.sn}`).then(
        res => {
          // console.log(res.data)
          this.intoTableData = res.data.data.rows
        }
      )
    },

    // 查询实时出场车辆
    selectOut() {
      this.$axios.post(`/api/parkings/selectAll?deptID=${this.deptID}&pageSize=8&pageNum=1&inOut=2&&sn=${this.sn}`).then(
        res => {
          // console.log(res.data)
          this.outinTableData = res.data.data.rows
        }
      )
    },

    // 获取最新车辆数据
    selectNew() {
      this.$axios.post(`/api/parkings/selectAll?deptID=${this.deptID}&pageSize=1&pageNum=1&sn=${this.sn}`).then(
        res => {
          // console.log(res.data)
          this.newData = res.data.data.rows[0]
        }
      )
    },

    // 场内车辆查询
    selectScene() {
      this.$axios.post(`/api/parkings/parking/selectscene?deptID=${this.deptID}&pageSize=${this.truckSpacePageSize}&pageNum=${this.truckSpacePageNum}&cardType=${this.cardType==3?'':this.cardType}&ihour=${this.ihour}&vehicleNo=${this.vehicleNo}`).then(
        res => {
          // console.log(res.data)
          this.truckSpace = res.data.data.rows
          this.truckSpacePageTotal = res.data.data.total
        }
      )
    },

    // 场内车辆查询点击
    inquireClick() {
      this.truckSpacePageNum = 1
      this.$axios.post(`/api/parkings/parking/selectscene?deptID=${this.deptID}&pageSize=${this.truckSpacePageSize}&pageNum=${this.truckSpacePageNum}&cardType=${this.cardType==3?'':this.cardType}&ihour=${this.ihour}&vehicleNo=${this.vehicleNo}`).then(
        res => {
          // console.log(res.data)
          // this.truckSpace = res.data.data.rows
          if (res.data.data) {
            this.truckSpace = res.data.data.rows
          } else {
            this.truckSpace = []
          }
          if (res.data.data) {
            this.truckSpacePageTotal = res.data.data.total
          } else {
            this.truckSpacePageTotal = 0
          }
        }
      )
    },

    // 车位翻页
    handleCurrentChange2(val) {
      this.truckSpacePageNum = val
      this.selectScene()
    },

    // 获取场内车辆数量
    getCarSum() {
      this.$axios.post(`/api/parkings/parking/selectscene?deptID=${this.deptID}&pageSize=${this.truckSpacePageSize}&pageNum=${this.truckSpacePageNum}`).then(
        res => {
          // console.log(res)
          this.carSum = res.data.data.total
        }
      )
    },

    // 导出Excel
    down() {
      location.href=`http://47.106.71.3:8080/api/parkings/export?deptID=${this.deptID}`
    }
  }
}
</script>

<style lang="less">
#systemZhiHui_car {
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
          height: 1.15rem;
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
      }
      #rightOne {
        margin-left: 0.1rem;
        flex: 1;
        .into,
        .outin {
          width: 100%;
          background-color: #fff;
          padding: 0.2rem;
          height: 4.15rem;
          .title {
            font-size: 0.2rem;
          }
          .tableBox {
            margin-top: 0.16rem;
            max-height: 3.25rem;
            width: 12.18rem;
          }
        }
        .outin {
          margin-top: 0.1rem;
        }
      }
      #rightTwo {
        flex: 1;
        margin-left: 0.1rem;
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
            bottom: 0.25rem;
            cursor: pointer;
            &:hover {
              color: #fff;
              background-color: #fcb928;
            }
          }
        }
        .table {
          width: 100%;
          height: 6.9rem;
          background-color: #fff;
          margin-top: 0.1rem;
          padding: 0.2rem;
          .fenye {
            position: absolute;
            right: 0.6rem;
            bottom: 0.3rem;
          }
        }
      }
      #rightThree {
        flex: 1;
        margin-left: 0.1rem;
        .car,
        .time {
          position: relative;
          height: 0.6rem;
          background-color: #fff;
          width: 100%;
          font-size: 0.18rem;
          padding-left: 0.2rem;
          span {
            float: left;
            line-height: 0.6rem;
          }
          ul {
            height: 0.58rem;
            transform: translateX(-0.35rem);
            li {
              cursor: pointer;
              height: 0.58rem;
              margin-left: 0.61rem;
              line-height: 0.6rem;
              float: left;
            }
            li.active {
              color: #0090ff;
              border-bottom: 0.02rem solid #0090ff;
              box-sizing: border-box;
            }
          }
        }
        .time {
          margin-top: 0.1rem;
          .input {
            position: absolute;
            font-size: 0.18rem;
            top: 0.11rem;
            left: 7.3rem;
            input {
              width: 0.78rem;
              height: 0.38rem;
              border: 1px solid #b6b6b6;
              border-radius: 0.04rem;
            }
          }
        }
        .search {
          position: relative;
          margin-top: 0.1rem;
          height: 0.6rem;
          background-color: #fff;
          padding-left: 0.4rem;
          font-size: 0.18rem;
          input {
            width: 3.98rem;
            height: 0.38rem;
            border: 0.01rem solid #b6b6b6;
            border-radius: 0.04rem;
            padding-left: 0.1rem;
            margin-left: 0.2rem;
            transform: translateY(-0.02rem);
          }
          ::placeholder {
            color: #d4d3d3;
          }
          .btn {
            display: inline-block;
            width: 1.61rem;
            height: 0.38rem;
            border: 0.01rem solid #d4ad40;
            text-align: center;
            line-height: 0.38rem;
            color: #fff;
            background-color: #ffd14f;
            border-radius: 0.04rem;
            margin-left: 0.4rem;
            margin-top: 0.11rem;
            cursor: pointer;
            &:hover {
              color: #fff;
              background-color: #fcb928;
            }
          }
          .info {
            position: absolute;
            font-size: 0.14rem;
            top: 0.21rem;
            left: 9.5rem;
            p {
              float: left;
              margin-left: 0.25rem;
            }
            span {
              font-size: 0.22rem;
            }
          }
        }
        .carList {
          height: 6.3rem;
          background-color: #fff;
          margin-top: 0.1rem;
          // padding: 0 0.3rem;
          padding-right: .3rem;
          #ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            li {
              width: 2.1rem;
              height: 2.35rem;
              background-color: #f7f7f7;
              text-align: center;
              margin-top: 0.4rem;
              margin-left: .35rem;
              img {
                width: 1.79rem;
                height: 1.09rem;
                border: 0.02rem solid #4a4a4a;
                margin-top: 0.15rem;
              }
              .head {
                font-size: 0.18rem;
                margin-top: 0.14rem;
                font-weight: 600;
              }
              .into {
                margin-top: 0.1rem;
                font-size: 0.14rem;
              }
              .intoTime {
                margin-top: 0.05rem;
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
    }
  }
}
</style>