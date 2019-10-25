<template>
    <div id="systemZhiHui_shuidian">
        <div class="content">
            <!-- 用电统计 -->
            <div class="electricity" style="border-right:.1rem solid #f7f7f7;" v-show="electricityShow">
                <!-- 在线状态 -->
                <div class="status">
                    <div>
                        <i class="icon online-dian"></i>
                        <div class="text-box">
                            <div class="top-text">
                                在线电表
                            </div>
                            <div class="bottom-text">
                                0
                            </div>
                        </div>
                    </div>
                    <div>
                        <i class="icon offline-dian"></i>
                        <div class="text-box">
                            <div class="top-text">
                                离线电表
                            </div>
                            <div class="bottom-text">
                                1
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 统计 -->
                <div class="statistics">
                    <!-- 饼图 -->
                    <div class="pie-box">
                        <div class="left-box">
                            <div class="border-box">
                                <div class="text-box">
                                    <div class="top-text">7月用电量</div>
                                    <div class="middle-text">12264</div>
                                    <div class="bottom-text">KW</div>
                                </div>
                            </div>
                        </div>
                        <div class="right-box">
                             <ul>
                                <li>
                                    <i class="circle-icon" style="background-color: #3ada76;"></i>
                                    <span>作业现场</span>
                                </li>
                                <li style="margin-top:.78rem;">
                                    <i class="circle-icon" style="background-color: #0090ff;"></i>
                                    <span>办公区</span>
                                </li>
                                <li style="margin-top:.78rem;">
                                    <i class="circle-icon" style="background-color: #feb37f;"></i>
                                    <span>生活区</span>
                                </li>
                             </ul>
                        </div>
                    </div>
                    <div class="month">月用电统计</div>
                    <!-- 柱状图 -->
                    <div class="columnar-box">
                        <a class="last-button"></a>
                        <ul>
                            <li>
                                <div class="extent-box">
                                    <div class="value"></div>
                                </div>
                                <div class="text-box">02月</div>
                            </li>
                            <li>
                                <div class="extent-box">
                                    <div class="value"></div>
                                </div>
                                <div class="text-box">03月</div>
                            </li>
                            <li>
                                <div class="extent-box">
                                    <div class="value"></div>
                                </div>
                                <div class="text-box">04月</div>
                            </li>
                            <li>
                                <div class="extent-box">
                                    <div class="value"></div>
                                </div>
                                <div class="text-box">05月</div>
                            </li>
                            <li>
                                <div class="extent-box">
                                    <div class="value"></div>
                                </div>
                                <div class="text-box">06月</div>
                            </li>
                            <li>
                                <div class="extent-box">
                                    <div class="value"></div>
                                </div>
                                <div class="text-box">07月</div>
                            </li>
                        </ul>
                        <a class="next-button"></a>
                    </div>
                    <a class="record" @click="electricityShow=false">查看详情记录</a>
                </div>
            </div>
            <!-- 用电详细记录 -->
            <div class="electricity-record" style="border-right:.1rem solid #f7f7f7;" v-show="!electricityShow">
                <!-- 头部 -->
                <div class="head">
                    <!-- 电表名 -->
                    <div class="name-box">
                        <div class="name">施工区</div>
                        <div class="status" style="color:#fe8990">离线</div>
                    </div>
                    <!-- 按钮框 -->
                    <div class="button-box">
                        <a class="history">
                            <i class="icon"></i>
                            切换设备
                        </a>
                        <a class="derive">
                            <i class="icon"></i>
                            导出Excel
                        </a>
                    </div>
                </div>
                <!-- 电表所在位置 -->
                <div class="location">
                    <!-- 地图 -->
                    <div class="plan">
                        <div class="title">电表所在位置</div>
                        <img src="../../../../static/images/waterMeter.png" alt="">
                    </div>
                    <!-- 总用电量 -->
                    <div class="sum">
                        <div class="title">总用电量7272KW</div>
                        <ul>
                            <li>
                                <div class="text-icon">日</div>
                                <div class="text-box">
                                    <div>日用电量</div>
                                    <div>111KW</div>
                                </div>
                            </li>
                            <li>
                                <div class="text-icon">周</div>
                                <div class="text-box">
                                    <div>周用电量</div>
                                    <div>701KW</div>
                                </div>
                            </li>
                            <li>
                                <div class="text-icon">月</div>
                                <div class="text-box">
                                    <div>月用电量</div>
                                    <div>3234KW</div>
                                </div>
                            </li>
                            <li>
                                <div class="text-icon">年</div>
                                <div class="text-box">
                                    <div>年用电量</div>
                                    <div>20301KW</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 列表 -->
                <div class="list">
                    <div class="control">
                        <a class="active">
                            一号楼电表1
                            <i class="el-icon-caret-bottom"></i>
                        </a>
                        <a>
                            周用电
                            <i class="el-icon-caret-bottom"></i>
                        </a>
                        <a>
                            切换图表
                            <i class="el-icon-caret-bottom"></i>
                        </a>
                    </div>
                    <div class="table-box">
                        <el-table
                        :data="tableData"
                        stripe
                        border>
                            <el-table-column
                            type="selection"
                            width="35">
                            </el-table-column>
                            <el-table-column
                            type="index"
                            label="序号"
                            width="50"
                            :index="indexMethod">
                            </el-table-column>
                            <el-table-column
                            prop="time"
                            label="时间">
                            </el-table-column>
                            <el-table-column
                            prop="electricQuantity"
                            label="电量">
                            </el-table-column>
                            <el-table-column
                            prop="average"
                            label="平均每日">
                            </el-table-column>
                            <el-table-column
                            prop="compare"
                            label="同比上周"
                            width="100">
                            <template slot-scope="scope">
                                <div :style="scope.row.compare>0?'color:#56dd86;':'color:#fe8990;'">
                                    {{ scope.row.compare }}KW
                                </div>
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <a class="return" @click="electricityShow=true">返回首页</a>
            </div>
            <!-- 用水统计 -->
            <div class="water" v-show="waterShow">
                <!-- 在线状态 -->
                <div class="status">
                    <div>
                        <i class="icon online-shui"></i>
                        <div class="text-box">
                            <div class="top-text">
                                在线水表
                            </div>
                            <div class="bottom-text">
                                0
                            </div>
                        </div>
                    </div>
                    <div>
                        <i class="icon offline-shui"></i>
                        <div class="text-box">
                            <div class="top-text">
                                离线水表
                            </div>
                            <div class="bottom-text">
                                1
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 统计 -->
                <div class="statistics">
                    <!-- 饼图 -->
                    <div class="pie-box">
                        <div class="left-box">
                            <div class="border-box">
                                <div class="text-box">
                                    <div class="top-text">7月用水量</div>
                                    <div class="middle-text">3212</div>
                                    <div class="bottom-text">m³</div>
                                </div>
                            </div>
                        </div>
                        <div class="right-box">
                             <ul>
                                <li>
                                    <i class="circle-icon" style="background-color: #3ada76;"></i>
                                    <span>作业现场</span>
                                </li>
                                <li style="margin-top:.78rem;">
                                    <i class="circle-icon" style="background-color: #0090ff;"></i>
                                    <span>办公区</span>
                                </li>
                                <li style="margin-top:.78rem;">
                                    <i class="circle-icon" style="background-color: #feb37f;"></i>
                                    <span>生活区</span>
                                </li>
                             </ul>
                        </div>
                    </div>
                    <div class="month">月用水统计</div>
                    <!-- 柱状图 -->
                    <div class="columnar-box">
                        <a class="last-button"></a>
                        <ul>
                            <li>
                                <div class="extent-box">
                                    <div class="value"></div>
                                </div>
                                <div class="text-box">02月</div>
                            </li>
                            <li>
                                <div class="extent-box">
                                    <div class="value"></div>
                                </div>
                                <div class="text-box">03月</div>
                            </li>
                            <li>
                                <div class="extent-box">
                                    <div class="value"></div>
                                </div>
                                <div class="text-box">04月</div>
                            </li>
                            <li>
                                <div class="extent-box">
                                    <div class="value"></div>
                                </div>
                                <div class="text-box">05月</div>
                            </li>
                            <li>
                                <div class="extent-box">
                                    <div class="value"></div>
                                </div>
                                <div class="text-box">06月</div>
                            </li>
                            <li>
                                <div class="extent-box">
                                    <div class="value"></div>
                                </div>
                                <div class="text-box">07月</div>
                            </li>
                        </ul>
                        <a class="next-button"></a>
                    </div>
                    <a class="record" @click="waterShow = false">查看详情记录</a>
                </div>
            </div>
            <!-- 用水详细记录 -->
            <div class="water-record" v-show="!waterShow">
                <!-- 头部 -->
                <div class="head">
                    <!-- 电表名 -->
                    <div class="name-box">
                        <div class="name">施工区</div>
                        <div class="status" style="color:#fe8990">离线</div>
                    </div>
                    <!-- 按钮框 -->
                    <div class="button-box">
                        <a class="history">
                            <i class="icon"></i>
                            切换设备
                        </a>
                        <a class="derive">
                            <i class="icon"></i>
                            导出Excel
                        </a>
                    </div>
                </div>
                <!-- 水表所在位置 -->
                <div class="location">
                    <!-- 地图 -->
                    <div class="plan">
                        <div class="title">水表所在位置</div>
                        <img src="../../../../static/images/waterMeter.png" alt="">
                    </div>
                    <!-- 总用电量 -->
                    <div class="sum">
                        <div class="title">总用水量17127m³</div>
                        <ul>
                            <li>
                                <div class="text-icon">日</div>
                                <div class="text-box">
                                    <div>日用水量</div>
                                    <div>114m³</div>
                                </div>
                            </li>
                            <li>
                                <div class="text-icon">周</div>
                                <div class="text-box">
                                    <div>周用水量</div>
                                    <div>803m³</div>
                                </div>
                            </li>
                            <li>
                                <div class="text-icon">月</div>
                                <div class="text-box">
                                    <div>月用水量</div>
                                    <div>3212m³</div>
                                </div>
                            </li>
                            <li>
                                <div class="text-icon">年</div>
                                <div class="text-box">
                                    <div>年用水量</div>
                                    <div>17127m³</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 列表 -->
                <div class="list">
                    <div class="control">
                        <a class="active">
                            一号楼水表1
                            <i class="el-icon-caret-bottom"></i>
                        </a>
                        <a>
                            周用水
                            <i class="el-icon-caret-bottom"></i>
                        </a>
                        <a>
                            切换图表
                            <i class="el-icon-caret-bottom"></i>
                        </a>
                    </div>
                    <div class="table-box">
                        <div id="water"></div>
                    </div>
                </div>
                <a class="return" @click="waterShow=true">返回首页</a>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    #systemZhiHui_shuidian {
        width: 100%;
        .content {
            display: flex;
            border-radius: .04rem;
            background-color: #fff;
            box-shadow: 0 0 .5rem -.3rem #666;
            >.electricity,
            .water {
                width: 8.34rem;
                height: 9.5rem;
                .status {
                    display: flex;
                    height: 1.1rem;
                    padding: 0 1.73rem;
                    justify-content: space-between;
                    border-bottom: .1rem solid #f7f7f7;
                    >div {
                        .icon {
                            height: 1rem;
                            width: .54rem;
                            margin-right: .14rem;
                            display: inline-block;
                            background-position: center center;
                            background-repeat: no-repeat;
                            background-size: contain;
                            &.online-dian {
                                background-image: url('../../../../static/images/online-dian.png');
                            }
                            &.offline-dian {
                                background-image: url('../../../../static/images/offline-dian.png');
                            }
                            &.online-shui {
                                background-image: url('../../../../static/images/online-shui.png');
                            }
                            &.offline-shui {
                                background-image: url('../../../../static/images/offline-shui.png');
                            }
                        }
                        .text-box {
                            height: 1rem;
                            padding-top: .2rem;
                            vertical-align: top;
                            display: inline-block;
                            .top-text {
                                color: #303030;
                                font-size: .18rem;
                            }
                            .bottom-text {
                                color: #303030;
                                font-size: .26rem;
                            }
                        }
                    }
                }
                .statistics {
                    height: 8.4rem;
                    .pie-box {
                        display: flex;
                        height: 3.94rem;
                        padding-top: .6rem;
                        .left-box {
                            padding-left: 1.4rem;
                            .border-box {
                                width: 2.6rem;
                                height: 2.6rem;
                                position: relative;
                                border-radius: 2.6rem;
                                // border: .12rem dotted #3ada76;
                                background-image: url('../../../../static/images/water-circle.png');
                                .text-box {
                                    color: #fff;
                                    width: 1.92rem;
                                    height: 1.92rem;
                                    position: absolute;
                                    border-radius: 1.92rem;
                                    // background-color: #3ada76;
                                    top: 50%;
                                    left: 50%;
                                    transform: translate(-50%,-50%);
                                    .top-text {
                                        font-size: .16rem;
                                        text-align: center;
                                        padding-top: .4rem;
                                    }
                                    .middle-text {
                                        font-size: .3rem;
                                        text-align: center;
                                        font-weight: bolder;
                                        padding-top: .2rem;
                                    }
                                    .bottom-text {
                                        font-size: .18rem;
                                        text-align: center;
                                        padding-top: .2rem;
                                    }
                                }
                            }
                        }
                        .right-box {
                            margin-left: 1.36rem;
                            ul {
                                li {
                                    .circle-icon {
                                        width: .26rem;
                                        height: .26rem;
                                        display: inline-block;
                                        border-radius: .26rem;
                                        vertical-align: middle;
                                        margin-right: .22rem;
                                    }
                                    span {
                                        font-size: .28rem;
                                        vertical-align: middle;
                                    }
                                }
                            }
                        }
                    }
                    .month {
                        font-size: .3rem;
                        text-align: center;
                    }
                    .columnar-box {
                        display: flex;
                        height: 2.7rem;
                        padding: 0 .5rem;
                        margin-top: .78rem;
                        justify-content: space-between;
                        .last-button {
                            // font-size: .34rem;
                            height: 2.7rem;
                            width: .34rem;
                            // display: inline-block;
                            // line-height: 2.7rem;
                            background-image: url('../../../../static/images/systemZhiHui-leftBtn.png');
                            background-position: center center;
                        }
                        ul {
                            flex: 1;
                            display: flex;
                            justify-content: space-between;
                            li {
                                .extent-box {
                                    height: 2.08rem;
                                    padding-left: .15rem;
                                    .value {
                                        height: 100%;
                                        width: .3rem;
                                        background-color: #3ada76;
                                    }
                                }
                                .text-box {
                                    font-size: .28rem;
                                    margin-top: .3rem;
                                }
                            }
                        }
                        .next-button {
                            // font-size: .34rem;
                            // line-height: 2.7rem;
                            height: 2.7rem;
                            width: .34rem;
                            background-image: url('../../../../static/images/systemZhiHui-rightBtn.png');
                            background-position: center center;
                        }
                    }
                    .record {
                        display: block;
                        color: #0090ff;
                        font-size: .24rem;
                        text-align: center;
                        margin-top: .3rem;
                    }
                }
            }
            >.electricity-record,
            .water-record {
                width: 8.34rem;
                height: 9.5rem;
                .head {
                    height: 1.1rem;
                    border-bottom: .1rem solid #f7f7f7;
                    display: flex;
                    .name-box {
                        width: 5.4rem;
                        border-right: .1rem solid #f7f7f7;
                        display: flex;
                        justify-content: space-between;
                        padding-left: .42rem;
                        padding-right: 1.08rem;
                        font-size: .22rem;
                        .name {
                            height: 1rem;
                            color: #303030;
                            line-height: 1rem;
                        }
                        .status {
                            color: #3ada76;
                            height: 1rem;
                            line-height: 1rem;
                            text-align: right;
                        }
                    }
                    .button-box {
                        padding-top: .35rem;
                        padding-left: .06rem;
                        a {
                            float: left;
                            height: .3rem;
                            color: #0090ff;
                            font-size: .14rem;
                            transition: all .5s;
                            margin-left: .2rem;
                            line-height: .28rem;
                            border-radius: .02rem;
                            padding-right: .09rem;
                            border: .01rem solid #0090ff;
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
                        .history {
                            .icon {
                                background-image: url('../../../../static/images/system-contract.png');
                            }
                            &:hover {
                                .icon {
                                    background-image: url('../../../../static/images/system-contractHover.png');
                                }
                            }
                        }
                    }
                }
                .location {
                    display: flex;
                    height: 3.14rem;
                    padding-top: .28rem;
                    justify-content: space-between;
                    border-bottom: .1rem solid #f7f7f7;
                    padding-left: .48rem;
                    padding-right: .75rem;
                    .plan {
                        .title {
                            color: #4a4a4a;
                            font-size: .17rem;
                            text-align: center;
                        }
                        img {
                            width: 3.2rem;
                            height: 2.2rem;
                            margin-top: .08rem;
                        }
                    }
                    .sum {
                        flex: 1;
                        margin-left: .75rem;
                        .title {
                            color: #4a4a4a;
                            font-size: .21rem;
                            text-align: center;
                        }
                        >ul {
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-between;
                            li {
                                width: 50%;
                                margin-top: .6rem;
                                >div {
                                    vertical-align: middle;
                                    font-size: .16rem;
                                    display: inline-block;
                                    &.text-icon {
                                        color: #fff;
                                        width: .24rem;
                                        height: .24rem;
                                        text-align: center;
                                        line-height: .24rem;
                                        margin-right: .1rem;
                                        border-radius: .04rem;
                                        background-color: #3ada76;
                                    }
                                    &.text-box {
                                        color: #898888;
                                    }
                                }
                            }
                        }
                    }
                }
                .list {
                    // height: 5.26rem;
                    .control {
                        height: .68rem;
                        border-bottom: .01rem solid #f7f7f7;
                        display: flex;
                        justify-content: space-between;
                        font-size: .16rem;
                        padding: 0 .3rem;
                        color: #4a4a4a;
                        padding-top: .26rem;
                        .active {
                            color: #0090ff;
                        }
                    }
                    .table-box {
                        width: 100%;
                        padding: 0 .3rem;
                        margin-top: .38rem;
                        min-height: 3.5rem;
                        .el-table {
                            width: 7.78rem;
                            th {
                                padding: 0;
                                div {
                                    color: #4a4a4a;
                                    height: .35rem;
                                    line-height: .35rem;
                                    background-color: #c5e8ff;
                                }
                            }
                            td {
                                padding: 0;
                                div {
                                    height: .35rem;
                                    color: #646464;
                                    line-height: .35rem;
                                }
                            }
                            .red-color {
                                color: #fe8990;
                            }
                            .green-color {
                                color: #58de87;
                            }
                        }
                        #water {
                            height: 3.5rem;
                            // display: inline-block;
                        }
                    }
                }
                .return {
                    display: block;
                    color: #0090ff;
                    font-size: .24rem;
                    text-align: center;
                    margin-top: .26rem;
                }
            }
        }
    }
</style>

<script>
export default {
    data() {
        return {
            electricityShow: true, // 用电统计与用电详情切换
            waterShow: true, // 用水统计与用水详情切换
            tableData: [
                {
                    time: '7.18~7.25',
                    electricQuantity: '701KW',
                    average: '100KW',
                    compare: +22
                },
                // {
                //     time: '12.18~12.25',
                //     electricQuantity: '1222KW',
                //     average: '122KW',
                //     compare: -122
                // }
            ], // 用电量列表数据
            pageSize: 1, // 每页条数
            pageNum: 1, // 当前页
            pageTotal: 2, // 总条数
        }
    },
    updated() {
        this.waterECharts()
    },
    methods: {
        // 序号
        indexMethod(index) {
            return (this.pageNum-1)*this.pageSize+index+1
        },

        // 用水量折线图：ECharts图渲染
        waterECharts(data) {
            if (!this.waterShow) {
                let water = this.$echarts.init(
                  document.getElementById("water")
                )
                water.setOption({
                    // backgroundColor: "#FBFBFB",
                    grid: {
                        x: 20,
                        y: 50,
                        x2: 30,
                        y2: 40,
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
                                    color: "#b2d5ff"
                                }
                            },
                            type: "category",
                            // boundaryGap: false,
                            data: [
                              "08-07",
                              "08-08",
                              "08-09",
                              "08-10",
                              "08-11",
                              "08-12",
                              "08-13"
                            ]
                            // data: data.time
                        }
                    ],
                    yAxis: [
                        {
                            type: "value",
                            min: 0,
                            interval: 100,
                            axisLabel: {
                                textStyle: {
                                    color: "#000"
                                },
                                formatter: "{value}m³"
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "#b2d5ff"
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: ["#b2d5ff"],
                                    width: 1,
                                    type: "dashed"
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: "用水量",
                            type: "line",
                            symbolSize: 10,
                            smooth: 0.2,
                            symbol:'circle',
                            color: ["#0090ff"],
                            data: [200, 240, 260, 260, 180, 160, 150]
                            // data: data.tem
                        },
                    ]
                })
            }
        },
    }
}
</script>