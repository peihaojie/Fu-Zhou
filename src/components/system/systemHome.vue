<template>
    <div id="systemHome">
        <!-- 侧导航栏 -->
        <div class="side-nav">
            <ul>
                <li class="button">
                    <a class="retract" @click="retractClick"></a>
                </li>
                <li>
                    <a class="active">
                        <div class="icon home"></div>
                        <span>首&#12288;&#12288;页</span>
                    </a>
                </li>
                <li>
                    <router-link to="/systemLiangZhi">
                        <div class="icon liangZhi"></div>
                        <span>两制管理</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/systemPersonnel">
                        <div class="icon personnel"></div>
                        <span>人员管理</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/systemSchedule">
                        <div class="icon schedule"></div>
                        <span>进度管理</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/systemZhiHui">
                        <div class="icon equipment"></div>
                        <span>设备管理</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/systemMonitoring">
                        <div class="icon video"></div>
                        <span>视频监控</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/systemQuality">
                        <div class="icon quality"></div>
                        <span>质量监督</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/systemSafety">
                        <div class="icon safety"></div>
                        <span>安全管理</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/systemGreen">
                        <div class="icon green"></div>
                        <span>绿色施工</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/systemInformation">
                        <div class="icon datum"></div>
                        <span>资料管理</span>
                    </router-link>
                </li>
                <li>
                    <a @click="unopenClick">
                        <div class="icon dormitory"></div>
                        <span>智慧宿舍</span>
                    </a>
                </li>
                <li>
                    <a @click="unopenClick">
                        <div class="icon use"></div>
                        <span>智能应用</span>
                    </a>
                </li>
                <li>
                    <router-link to="/systemSet">
                        <div class="icon set"></div>
                        <span>平台设置</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- 内容 -->
        <div class="centent">
            <div class="content-box">
                <!-- 上部盒子 -->
                <div class="top-box">
                    <div class="top-left">
                        <div class="title">
                            <div class="time">{{time}}</div>
                            <div class="date">
                                <div>{{month}}月</div>
                                <div>{{day}}</div>
                            </div>
                            <div class="line"></div>
                            <div class="weather-icon fine"></div>
                            <div class="temperature">30℃</div>
                            <div class="day">
                                安全文明施工天数：
                                <span>211</span>
                                天
                            </div>
                        </div>
                        <div class="main">

                        </div>
                    </div>
                    <div class="top-right">
                        <div class="autonym">
                            <div class="title">
                                <i class="icon"></i>
                                实名制与分账制
                            </div>
                            <div class="attendance">
                                <div class="worker">
                                    <li class="first">
                                        <span style="color:#3ada76">劳务人员</span>
                                        <span class="line green-color"></span>
                                    </li>
                                    <li>
                                        <span>在场人数</span>
                                        <span>410人</span>
                                    </li>
                                    <li>
                                        <span>考勤人数</span>
                                        <span>310人</span>
                                    </li>
                                </div>
                                <div class="manager" style="margin-top:.56rem;">
                                    <li class="first">
                                        <span style="color:#ff7a81">管理人员</span>
                                        <span class="line pink-color"></span>
                                    </li>
                                    <li>
                                        <span>在场人数</span>
                                        <span>38人</span>
                                    </li>
                                    <li>
                                        <span>考勤人数</span>
                                        <span>26人</span>
                                    </li>
                                </div>
                            </div>
                            <div class="attendance-graph" id="attendance">
                            
                            </div>
                        </div>
                        <div class="TSP">
                            <div class="title">
                                <i class="icon"></i>
                                TSP环境监测系统
                            </div>
                            <div class="main-box">
                                <li>
                                    <div>
                                        <!-- /m³ -->
                                        <div class="name">PM2.5</div>
                                        <div class="value">14μg</div>
                                        <div class="state">优</div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <div class="name">PM10</div>
                                        <div class="value">23μg</div>
                                        <div class="state">优</div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <div class="name">PM100</div>
                                        <div class="value">33μg</div>
                                        <div class="state">优</div>
                                    </div>
                                </li>
                            </div>
                            <div class="bottom-box">
                                <div class="text-box">
                                    噪音：
                                    <span>63db</span>
                                </div>
                                <div class="img-box"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 下部盒子 -->
                <div class="bottom-box">
                    <li class="car">
                        <div class="title">
                            <i class="icon carIcon"></i>
                            车牌识别系统
                        </div>
                        <div class="state">
                            <span>今日进出：0辆</span>
                            <span>运行情况：
                                <span class="pink-color">离线</span>
                            </span>
                        </div>
                        <ul>
                            <!-- <li>
                                <span>粤C CJ537</span>
                                <span>进</span>
                                <span class="yellow-color">渣土车</span>
                                <span>2019-01-01 19：:22</span>
                            </li>
                            <li>
                                <span>粤C CJ537</span>
                                <span>进</span>
                                <span>临时车</span>
                                <span>2019-01-01 19：:22</span>
                            </li>
                            <li>
                                <span>粤C CJ537</span>
                                <span>进</span>
                                <span>常驻车</span>
                                <span>2019-01-01 19：:22</span>
                            </li>
                            <li>
                                <span>粤C CJ537</span>
                                <span>进</span>
                                <span>临时车</span>
                                <span>2019-01-01 19：:22</span>
                            </li> -->
                            <!-- <li>
                                <span>粤C CJ537</span>
                                <span>进</span>
                                <span>临时车</span>
                                <span>2019-01-01 19：:22</span>
                            </li> -->
                        </ul>
                    </li>
                    <li class="tower-crane">
                        <div class="title">
                            <i class="icon tower-craneIcon"></i>
                            塔吊防碰撞系统
                        </div>
                        <div class="text-box">
                            <li>塔吊数量：2座</li>
                            <li>
                                运行情况：
                                <span class="pink-color">离线</span>
                            </li>
                            <li>报警统计：0次</li>
                        </div>
                        <div class="right-box" id="towerCrane"></div>
                    </li>
                    <li class="elevator">
                        <div class="title">
                            <i class="icon elevatorIcon"></i>
                            升降机系统
                        </div>
                        <div class="text-box">
                            <li>升降机数量数量：2座</li>
                            <li>
                                运行情况：
                                <span class="pink-color">离线</span>
                            </li>
                            <li>报警统计：0次</li>
                        </div>
                        <div class="right-box" id="elevator"></div>
                    </li>
                    <li class="electricity">
                        <div class="title">
                            <i class="icon electricityIcon"></i>
                            用电检测
                        </div>
                        <div class="text-box">
                            <li>电箱数量：2座</li>
                            <li>
                                运行情况：
                                <span class="pink-color">离线</span>
                            </li>
                            <li>报警统计：0次</li>
                        </div>
                        <div class="right-box" id="electricity"></div>
                    </li>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    #systemHome {
        width: 100%;
        display: flex;
        background-color: #f7f7f7;
        .side-nav {
            width: 1.75rem;
            height: 10rem;
            overflow: hidden;
            // display: inline-block;
            background-color: #54a4d7;
            ul {
                width: 1.75rem;
                li {
                    height: .6rem;
                    position: relative;
                    a {
                        width: 100%;
                        height: .6rem;
                        color: #fff;
                        font-size: .2rem;
                        line-height: .6rem;
                        position: absolute;
                        transition: all .5s;
                        border-bottom: .01rem solid #98c8e7;
                        .icon {
                            opacity: .5;
                            width: .6rem;
                            height: .59rem;
                            transition: all .5s;
                            display: inline-block;
                            background-repeat: no-repeat;
                            background-position: center center;
                        }
                        span {
                            // width: .8rem;
                            vertical-align: top;
                            // text-align: justify;
                            // text-align-last:justify;
                            // display: inline-block;
                        }
                        .home {
                            background-image: url('../../../static/images/system-home.png');
                        }
                        .liangZhi {
                            background-image: url('../../../static/images/systemHome-liangZhi.png');
                        }
                        .personnel {
                            background-image: url('../../../static/images/systemHome-personnel.png');
                        }
                        .equipment {
                            background-image: url('../../../static/images/systemHome-equipment.png');
                        }
                        .video {
                            background-image: url('../../../static/images/systemHome-video.png');
                        }
                        .quality {
                            background-image: url('../../../static/images/systemHome-quality.png');
                        }
                        .safety {
                            background-image: url('../../../static/images/systemHome-safety.png');
                        }
                        .green {
                            background-image: url('../../../static/images/systemHome-green.png');
                        }
                        .datum {
                            background-image: url('../../../static/images/systemHome-datum.png');
                        }
                        .dormitory {
                            background-image: url('../../../static/images/systemHome-dormitory.png');
                        }
                        .use {
                            background-image: url('../../../static/images/systemHome-use.png');
                        }
                        .set {
                            background-image: url('../../../static/images/systemHome-set.png');
                        }
                        .schedule {
                            background-image: url('../../../static/images/system-schedule.png');
                        }
                    }
                    a:hover {
                        background-color: #2d83bb;
                        .icon {
                            opacity: 1;
                        }
                    }
                    .active {
                        z-index: 10;
                        background-color: #378dc5;
                        .icon {
                            opacity: 1;
                        }
                    }
                }
                .button {
                    position: relative;
                    border-bottom: .01rem solid #98c8e7;
                    a {
                        top: 50%;
                        left: 50%;
                        border: 0;
                        padding: 0;
                        width: .22rem;
                        height: .22rem;
                        position: absolute;
                        background-repeat: no-repeat;
                        transform: translate(-50%,-50%);
                        background-position: center center;
                        background-image: url('../../../static/images/system-retract.png');
                    }
                    a:hover {
                        background-color: #2d83bb;
                    }
                }
            }
        }
        .centent {
            flex: 1;
            padding-top: .3rem;
            padding-left: .3rem;
            padding-right: .3rem;
            // display: inline-block;
            .content-box {
                padding: .3rem;
                border-radius: .1rem;
                background-color: #fff;
                .top-box {
                    height: 6.4rem;
                    display: flex;
                    justify-content: space-between;
                    .top-left {
                        width: 10rem;
                        height: 6.4rem;
                        // vertical-align: top;
                        // display: inline-block;
                        background-color: #f2f9ff;
                        .title {
                            height: .78rem;
                            >div {
                                vertical-align: top;
                                display: inline-block;
                            }
                            .time {
                                color: #4a4a4a;
                                font-size: .2rem;
                                padding-left: .3rem;
                                line-height: .78rem;
                            }
                            .date {
                                width: .6rem;
                                height: .6rem;
                                font-size: .16rem;
                                text-align: center;
                                margin-left: .1rem;
                                padding-top: .05rem;
                                border-radius: .6rem;
                                border: .01rem solid #1097ff;
                                transform: translateY(.09rem);
                            }
                            .line {
                                height: .59rem;
                                width: .03rem;
                                margin-left: .25rem;
                                // background-color: #1097ff;
                                transform: translateY(.09rem);
                                background-image: url('../../../static/images/systemHome-line.png');
                            }
                            .weather-icon {
                                width: .4rem;
                                height: .4rem;
                                margin-left: .25rem;
                                // background-color: #f6c500;
                                transform: translateY(.2rem);
                                &.fine {
                                    background-image: url('../../../static/images/systemHome-fine.png');
                                    background-size: cover;
                                }
                            }
                            .temperature {
                                color: #f6c500;
                                font-size: .2rem;
                                line-height: .78rem;
                                margin-left: .06rem;
                            }
                            .day {
                                float: right;
                                color: #3ada76;
                                font-size: .24rem;
                                line-height: .78rem;
                                padding-right: .3rem;
                                >span {
                                    font-size: .3rem;
                                }
                            }
                        }
                        .main {
                            height: 5.62rem;
                            background-size: cover;
                            background-image: url('../../../static/images/XianMuFenCai.jpg');
                        }
                    }
                    .top-right {
                        // margin-left: .3rem;
                        // vertical-align: top;
                        // display: inline-block;
                        >div {
                            width: 5.78rem;
                            height: 3.05rem;
                            // background-color: #f2f9ff;
                            background-image: url('../../../static/images/systemHome-rightBorder.png');
                            background-size: contain;
                        }
                        .autonym {
                            padding-top: .23rem;
                            padding-left: .2rem;
                            margin-bottom: .3rem;
                            .title {
                                color: #0090ff;
                                font-size: .18rem;
                                .icon {
                                    width: .23rem;
                                    height: .2rem;
                                    margin-right: .04rem;
                                    display: inline-block;
                                    // background-color: #0090ff;
                                    background-image: url('../../../static/images/systemHome-autonymIcon.png');
                                }
                            }
                            .attendance {
                                margin-top: .2rem;
                                display: inline-block;
                                >div {
                                    li {
                                        display: flex;
                                        width: 1.44rem;
                                        justify-content: space-between;
                                        >span {
                                            font-size: .13rem;
                                        }
                                        .line {
                                            width: .7rem;
                                            height: .02rem;
                                            transform: translateY(.11rem);
                                        }
                                        .green-color {
                                            background-color: #3ada76;
                                        }
                                        .pink-color {
                                            background-color: #ff7a81;
                                        }
                                    }
                                }
                            }
                            .attendance-graph {
                                height: 2rem;
                                width: 4.14rem;
                                display: inline-block;
                            }
                        }
                        .TSP {
                            padding-top: .23rem;
                            padding-left: .2rem;
                            .title {
                                color: #0090ff;
                                font-size: .18rem;
                                .icon {
                                    width: .23rem;
                                    height: .2rem;
                                    margin-right: .04rem;
                                    display: inline-block;
                                    // background-color: #0090ff;
                                    background-image: url('../../../static/images/systemHome-TSPIcon.png');
                                }
                            }
                            .main-box {
                                display: flex;
                                margin-top: .4rem;
                                padding: 0 .3rem 0 .1rem;
                                justify-content: space-between;
                                li {
                                    width: 1.25rem;
                                    height: 1.25rem;
                                    padding-top: .13rem;
                                    border-radius: 1.25rem;
                                    border: .01rem solid #3dda78;
                                    >div {
                                        color: #fff;
                                        width: .97rem;
                                        height: .97rem; 
                                        margin: 0 auto;
                                        text-align: center;
                                        padding-top: .12rem;
                                        border-radius: .97rem;
                                        background-color: #3ada76;
                                        .name {
                                            font-size: .12rem;
                                        }
                                        .value {
                                            font-size: .19rem;
                                        }
                                        .state {
                                            font-size: .13rem;
                                        }
                                    }
                                }
                            }
                            .bottom-box {
                                width: 4rem;
                                margin-top: .22rem;
                                margin-left: 60%;
                                transform: translate(-50%);
                                display: inline-block;
                                .text-box {
                                    color: #3ada76;
                                    font-size: .18rem;
                                    display: inline-block;
                                    span {
                                        font-size: .2rem;
                                    }
                                }
                                .img-box {
                                    width: 1.82rem;
                                    height: .32rem;
                                    margin-left: .12rem;
                                    display: inline-block;
                                    // background-color: #3ada76;
                                    background-image: url('../../../static/images/systemHome-noise.png');
                                    background-size: contain;
                                }
                            }
                        }
                    }
                }
                .bottom-box {
                    display: flex;
                    justify-content: space-between;
                    >li {
                        width: 3.82rem;
                        height: 2.2rem;
                        overflow: hidden;
                        margin-top: .3rem;
                        padding-top: .17rem;
                        padding-left: .17rem;
                        // background-color: #f2f9ff;
                        background-image: url('../../../static/images/systemHome-bottmBorder.png');
                        background-size: contain;
                        .green-color {
                            color: #3ada76;
                        }
                        .yellow-color {
                            color: #ffd14f;
                        }
                        .pink-color {
                            color: #ff7a81;
                        }
                        .title {
                            color: #0090ff;
                            font-size: .18rem;
                            .icon {
                                width: .23rem;
                                height: .2rem;
                                margin-right: .04rem;
                                display: inline-block;
                                // background-color: #0090ff;
                            }
                        }
                    }
                    .car {
                        .state {
                            display: flex;
                            width: 2.84rem;
                            font-size: .14rem;
                            margin-top: .1rem;
                            justify-content: space-between;
                        }
                        ul {
                            li {
                                display: flex;
                                width: 3.18rem;
                                font-size: .12rem;
                                line-height: .28rem;
                                justify-content: space-between;
                            }
                        }
                    }
                    .tower-crane,
                    .elevator,
                    .electricity {
                        .text-box {
                            width: 1.8rem;
                            margin-top: .3rem;
                            display: inline-block;
                            li {
                                font-size: .16rem;
                                line-height: .38rem;
                            }
                        }
                        .right-box {
                            width: 1.6rem;
                            height: 1.2rem;
                            vertical-align: bottom;
                            display: inline-block;
                        }
                    }
                    .carIcon {
                        background-image: url('../../../static/images/systemHome-carIcon.png');
                    }
                    .tower-craneIcon {
                        background-image: url('../../../static/images/systemHome-tower-craneIcon.png');
                    }
                    .elevatorIcon {
                        background-image: url('../../../static/images/systemHome-elevatorIcon.png');
                    }
                    .electricityIcon {
                        background-image: url('../../../static/images/systemHome-electricityIcon.png');
                    }
                }
            }
        }
    }
</style>

<script>
import moment from "moment"
export default {
    data() {
        return {
            retractState: true, // 侧导航栏状态
            timeId: '', // 定时器
            month: '', // 月份
            day: '', // 日期
            time: '', // 时间
            // lzShow: true,
        }
    },
    mounted() {
        this.setTowerCrane()
        this.setElevator()
        this.setElectricity()
        this.attendance()
        this.getDate()
    },
    methods: {
        // 侧导航栏缩进
        retractClick() {
            if (this.retractState) {
                $('.side-nav').animate({
                    width:'.6rem'
                },500)
                $('.retract').animate({
                    left:'.3rem'
                })
                this.retractState = !this.retractState
            } else {
                $('.side-nav').animate({
                    width:'1.75rem'
                },500)
                $('.retract').animate({
                    left:'50%'
                })
                this.retractState = !this.retractState
            }
        },

        // 塔吊ECharts渲染
        setTowerCrane() {
            let towerCrane = this.$echarts.init(
              document.getElementById("towerCrane")
            );
            towerCrane.setOption({
                color: [
                    "#3ada76",
                    "#ff7a81",
                ],
                tooltip: {
                    trigger: "item",
                    formatter: "{b}: {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    x: "-5px",
                    y: "0px",
                    itemWidth: 10, // 设置图例图形的宽
                    itemHeight: 10, // 设置图例图形的高
                    textStyle: {
                        fontSize: "12",
                        color: "#000"
                    },
                    data: ["载重", "重量"]
                },
                series: [
                    {
                        name: " ",
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
                            { value: 0, name: "载重" },
                            { value: 0, name: "重量" },
                        ]
                    }
                ]
            })
        },

        // 升降机ECharts渲染
        setElevator() {
            let elevator = this.$echarts.init(
              document.getElementById("elevator")
            );
            elevator.setOption({
                color: [
                    "#3ada76",
                    "#ff7a81",
                ],
                tooltip: {
                    trigger: "item",
                    formatter: "{b}: {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    x: "-5px",
                    y: "0px",
                    itemWidth: 10, // 设置图例图形的宽
                    itemHeight: 10, // 设置图例图形的高
                    textStyle: {
                        fontSize: "12",
                        color: "#000"
                    },
                    data: ["载重", "重量"]
                },
                series: [
                    {
                        name: " ",
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
                            { value: 0, name: "载重" },
                            { value: 0, name: "重量" },
                        ]
                    }
                ]
            })
        },

        // 用电ECharts渲染
        setElectricity() {
            let electricity = this.$echarts.init(
              document.getElementById("electricity")
            );
            electricity.setOption({
                color: [
                    "#3ada76",
                    "#ff7a81",
                ],
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    x: "-5px",
                    y: "0px",
                    itemWidth: 10, // 设置图例图形的宽
                    itemHeight: 10, // 设置图例图形的高
                    textStyle: {
                        fontSize: "12",
                        color: "#000"
                    },
                    data: ["漏电", "温度"]
                },
                series: [
                    {
                        name: " ",
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
                            { value: 0, name: "漏电" },
                            { value: 0, name: "温度" },
                        ]
                    }
                ]
            })
        },

        // 考勤记录ECharts渲染
        attendance() {
            let attendance = this.$echarts.init(
              document.getElementById("attendance")
            )
            attendance.setOption({
                grid: {
                    x: 30,
                    y: 20,
                    x2: 40,
                    y2: 10,
                    containLabel: true
                },
                tooltip: {
                    trigger: "axis",
                    formatter: "{b}点: {c}人"
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
                          "4",
                          "6",
                          "8",
                          "10",
                          "12",
                        ]
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        interval: 50,
                        axisLabel: {
                            textStyle: {
                                color: "#000"
                            },
                            formatter: "{value}人"
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#fff"
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: ["#0793ff"],
                                width: 1,
                                type: "dashed"
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: "考勤人数",
                        type: "line",
                        symbolSize: 10,
                        smooth: 0.2,
                        symbol:'circle',
                        color: ["#0090ff"],
                        data: [200, 240, 260, 260, 180]
                    },
                ]
            })
        },

        // 该模块暂未开放
        unopenClick() {
            this.$message({
              message: '该功能暂未开放',
              type: 'warning'
            })
        },

        // 获取时间
        getDate() {
            this.timeId = setInterval(()=>{
                this.time = moment().format("hh:mm:ss")
                this.month = moment().format("MM")
                this.day = moment().format("DD")
            },1000)
        },
    }
}
</script>