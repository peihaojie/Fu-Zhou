<template>
    <div id="spectaculars">
        <!-- 标题 -->
        <div class="title">
            <!-- <router-link to="/systemLiangZhi">{{indexData.projectName}}</router-link> -->
            <a @click="returnClick()">{{indexData.projectName}}</a>
        </div>
        <!-- 主体 -->
        <div class="main">
            <!-- 左部分 -->
            <div class="main-left">
                <!-- 时间 -->
                <div class="date-box">
                    <div class="time">
                        <span style="font-family: YJZT;font-size:.54rem;">{{time}}</span>
                        <span>{{wek}}</span>
                    </div>
                    <div class="date">
                        <span>{{year}} </span>
                        年
                        <span>{{month}}</span>
                        月
                        <span>{{day}}</span>
                        日
                    </div>
                </div>
                <!-- 现场人员 -->
                <div class="attendance-box">
                    <!-- 模块名 -->
                    <div class="name">
                        <i class="left-icon"></i>
                        现场人员
                        <i class="right-icon"></i>
                    </div>
                    <!-- 出勤率 -->
                    <div class="attendance-list">
                        <ul>
                            <li>
                                <i class="icon one"></i>
                                <div class="text-box">
                                    <div class="top-text">项目在线人数</div>
                                    <div class="middle-text">{{indexData.xmzxrs}}</div>
                                </div>
                            </li>
                            <li>
                                <i class="icon three"></i>
                                <div class="text-box">
                                    <div class="top-text">现场实时工人</div>
                                    <div class="middle-text">{{indexData.zcssrs}}人</div>
                                </div>
                            </li>
                            <li class="more">
                                <i class="icon two"></i>
                                <div class="text-box">
                                    <div class="top-text">今日出勤人数</div>
                                    <div class="middle-text">{{indexData.jrcqrs}}</div>
                                    <div class="more-text">出勤率{{indexData.cql}}%</div>
                                </div>
                            </li>
                            <li class="more">
                                <i class="icon four"></i>
                                <div class="text-box">
                                    <div class="top-text">关键岗位出勤</div>
                                    <div class="middle-text">{{indexData.gjgwcqrs}}人</div>
                                    <div class="more-text">出勤率{{indexData.gjgwcql}}%</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- ECharts图 -->
                    <div class="attendance-ecart" id="attendanceEcart"></div>
                    <!-- 工种出勤人数 -->
                    <div class="type-number">
                        <ul>
                            <li v-for="(item,index) in indexData.gzList" :key="index" v-if="index<4">
                                <span>
                                    <i class="dot" :class="index==0?'blue':index==1?'red':index==2?'green':'yellow'"></i>
                                    {{item.jobNames}}
                                </span>
                                <span>
                                    {{item.rs}}人
                                </span>
                            </li>
                            <!-- <li>
                                <span>
                                    <i class="dot red"></i>
                                    钢筋工
                                </span>
                                <span>
                                    20人
                                </span>
                            </li>
                            <li>
                                <span>
                                    <i class="dot green"></i>
                                    架子工
                                </span>
                                <span>
                                    15人
                                </span>
                            </li>
                            <li>
                                <span>
                                    <i class="dot yellow"></i>
                                    其他
                                </span>
                                <span>
                                    8人
                                </span>
                            </li> -->
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 中间 -->
            <div class="main-middle">
                <!-- 工人动态与管理动态 -->
                <div class="top-box">
                    <!-- 工人动态 -->
                    <div class="worker">
                        <div class="title">工人动态</div>
                        <div class="list-head">
                            <span>姓名</span>
                            <span>进出</span>
                            <span>时间</span>
                        </div>
                        <div id="grdt">
                            <ul id="grdt1">
                                <li v-for="(item,index) in indexData.grdtList" :key="index">
                                    <span>{{item.name}}</span>
                                    <span>{{item.direction=='in'?'进':'出'}}</span>
                                    <span>{{item.passedTime.split(' ')[1]}}</span>
                                </li>
                            </ul>
                            <ul id="grdt2"></ul>
                        </div>
                    </div>
                    <!-- 管理动态 -->
                    <div class="manage">
                        <div class="title">管理动态</div>
                        <div class="list-head">
                            <span>姓名</span>
                            <span>进出</span>
                            <span>时间</span>
                        </div>
                        <div id="gldt">
                            <ul id="gldt1">
                                <li v-for="(item,index) in indexData.glrydtList" :key="index">
                                    <span>{{item.name}}</span>
                                    <span>{{item.direction=='in'?'进':'出'}}</span>
                                    <span>{{item.passedTime.split(' ')[1]}}</span>
                                </li>
                            </ul>
                            <ul id="gldt2"></ul>
                        </div>
                    </div>
                </div>
                <!-- 施工企业考勤情况 -->
                <div class="bottom-box">
                    <div class="title">
                        <i class="left-icon"></i>
                        施工企业考勤情况
                        <i class="right-icon"></i>
                    </div>
                    <div class="list-head">
                        <span style="width: 4.36rem;text-align:left;">施工企业</span>
                        <span>在线人数</span>
                        <span>考勤人数</span>
                        <span>考勤率</span>
                    </div>
                    <div id="qykq">
                        <ul id="qykq1">
                            <li v-for="(item,index) in indexData.sgqykq" :key="index">
                                <span style="width: 4.36rem;text-align:left;">{{item.name}}</span>
                                <span style="width: .72rem;">{{item.zc?item.zc:0}}</span>
                                <span style="width: .72rem;">{{item.kq?item.kq:0}}</span>
                                <span style="width: .6rem;text-align:right;">{{item.bfb?item.bfb:0}}%</span>
                            </li>
                        </ul>
                        <ul id="qykq2"></ul>
                    </div>
                </div>
            </div>
            <!-- 右部分 -->
            <div class="main-right">
                <!-- 对比照片 -->
                <div class="comparison">
                    <div class="title">
                        <i class="left-icon"></i>
                        对比照片
                        <i class="right-icon"></i>
                    </div>
                    <img :src="indexData.inOrOut.faceUrl" alt="">
                    <ul>
                        <li>姓名：{{indexData.inOrOut.empName}}</li>
                        <li>班组：{{indexData.inOrOut.teamName}}</li>
                        <li>工种：{{indexData.inOrOut.jobName}}</li>
                        <li>状态：{{indexData.inOrOut.status}}</li>
                    </ul>
                </div>
                <!-- 实时照片 -->
                <div class="real-time">
                    <div class="title">
                        <i class="left-icon"></i>
                        实时照片
                        <i class="right-icon"></i>
                    </div>
                    <img :src="indexData.har.sitePhoto" alt="">
                    <ul>
                        <li>设备：考勤一号机</li>
                        <li>时间：{{indexData.har.passedTime}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    #spectaculars {
        height: 10.8rem;
        background-image: url('../../../../static/images/spectaculars-background.png');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        >.title {
            height: .56rem;
            line-height: .45rem;
            text-align: center;
            background-image: url('../../../../static/images/spectaculars-topBorder.png');
            background-position: center center;
            background-repeat: no-repeat;
            background-size: contain;
            a {
                color: #fff;
                font-size: .26rem;
                font-weight: bolder;
            }
        }
        >.main {
            margin: 0 auto;
            width: 18.6rem;
            margin-top: .56rem;
            display: flex;
            justify-content: space-between;
            .main-left {
                width: 4.59rem;
                .date-box {
                    height: 2.87rem;
                    // border: .02rem solid #2b6ce9;
                    background-image: url('../../../../static/images/spectaculars-leftTopBorder.png');
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    .time {
                        color: #fff;
                        height: 1.36rem;
                        font-size: .44rem;
                        line-height: 1.26rem;
                        display: flex;
                        justify-content: space-between;
                        padding: 0 .2rem 0 .4rem;
                        // font-weight: bolder;
                    }
                    .date {
                        color: #fff;
                        height: 1.47rem;
                        font-size: .32rem;
                        line-height: 1.4rem;
                        text-align: center;
                        // font-weight: bolder;
                        span {
                            font-size: .58rem;
                            font-family: YJZT;
                        }
                    }
                }
                .attendance-box {
                    height: 6.21rem;
                    margin-top: .3rem;
                    // border: .02rem solid #2b6ce9;
                    background-image: url('../../../../static/images/spectaculars-leftBottomBorder.png');
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    .name {
                        color: #fff;
                        font-size: .21rem;
                        text-align: center;
                        height: .91rem;
                        line-height: .91rem;
                        font-weight: bolder;
                        position: relative;
                        i {
                            top: 50%;
                            transform: translateY(-50%);
                            width: .21rem;
                            height: .21rem;
                            position: absolute;
                            background-position: center center;
                            background-repeat: no-repeat;
                            background-size: cover;
                            &.left-icon {
                                background-image: url('../../../../static/images/spectaculars-leftIcon.png');
                                left: 1.5rem;
                            }
                            &.right-icon {
                                background-image: url('../../../../static/images/spectaculars-rightIcon.png');
                                right: 1.5rem;
                            }
                        }
                    }
                    .attendance-list {
                        ul {
                            display: flex;
                            justify-content: space-between;
                            flex-wrap: wrap;
                            padding-left: .27rem;
                            li {
                                width: 50%;
                                .icon {
                                    width: .61rem;
                                    height: .61rem;
                                    margin-right: .12rem;
                                    display: inline-block;
                                    background-size: cover;
                                    background-repeat: no-repeat;
                                    background-position: center center;
                                    &.one {
                                        background-image: url('../../../../static/images/l_total.png');
                                    }
                                    &.two {
                                        background-image: url('../../../../static/images/l_jrkq.png');
                                    }
                                    &.three {
                                        background-image: url('../../../../static/images/l_zc.png');
                                    }
                                    &.four {
                                        background-image: url('../../../../static/images/l_gl.png');
                                    }
                                }
                                .text-box {
                                    display: inline-block;
                                    vertical-align: top;
                                    >div {
                                        color: #fff;
                                        font-size: .18rem;
                                    }
                                    .middle-text {
                                        font-size: .2rem;
                                        font-weight: bolder;
                                        margin: .06rem 0;
                                    }
                                }
                            }
                            .more {
                                margin-top: .4rem;
                                .icon {
                                    transform: translateY(.16rem);
                                }
                            }
                        }
                    }
                    .attendance-ecart {
                        height: 2.16rem;
                    }
                    .type-number {
                        ul {
                            padding: 0 .74rem;
                            li {
                                display: flex;
                                justify-content: space-between;
                                height: .3rem;
                                line-height: .3rem;
                                span {
                                    color: #fff;
                                    font-size: .14rem;
                                    .dot {
                                        width: .09rem;
                                        height: .09rem;
                                        border-radius: .09rem;
                                        display: inline-block;
                                        &.blue {
                                            background-color: #349be6;
                                        }
                                        &.red {
                                            background-color: #fb497c;
                                        }
                                        &.green {
                                            background-color: #3ee09a;
                                        }
                                        &.yellow {
                                            background-color: #f38051;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .main-middle {
                width: 8.82rem;
                height: 9.38rem;
                padding: .19rem;
                // border: .02rem solid #2b6ce9;
                background-image: url('../../../../static/images/spectaculars-middleBorder.png');
                background-position: center center;
                background-repeat: no-repeat;
                background-size: cover;
                .top-box {
                    height: 4.03rem;
                    border: .02rem solid #173989;
                    .worker,
                    .manage {
                        width: 4.17rem;
                        height: 3.99rem;
                        padding-top: .04rem;
                        display: inline-block;
                        .title {
                            color: #fff;
                            height: .66rem;
                            font-size: .24rem;
                            line-height: .66rem;
                            text-align: center;
                            font-weight: bolder;
                        }
                        .list-head {
                            display: flex;
                            justify-content: space-between;
                            span {
                                flex: 1;
                                color: #fff;
                                text-align: center;
                                font-size: .18rem;
                            }
                        }
                        #grdt,
                        #gldt {
                            height: 2.64rem;
                            overflow: hidden;
                        }
                        ul {
                            li {
                                display: flex;
                                height: .44rem;
                                line-height: .44rem;
                                justify-content: space-between;
                                span {
                                    flex: 1;
                                    color: #fff;
                                    text-align: center;
                                    font-size: .14rem;
                                }
                            }
                        }
                    }
                    .worker, {
                        width: 4.19rem;
                        border-right: .02rem solid #173989;
                    }
                }
                .bottom-box {
                    height: 4.18rem;
                    margin-top: .77rem;
                    border: .02rem solid #173989;
                    position: relative;
                    .title {
                        color: #fff;
                        height: .66rem;
                        font-size: .24rem;
                        line-height: .66rem;
                        font-weight: bolder;
                        position: absolute;
                        top: -.7rem;
                        left: 50%;
                        transform: translateX(-50%);
                        i {
                            top: 50%;
                            transform: translateY(-50%);
                            width: .21rem;
                            height: .21rem;
                            position: absolute;
                            background-position: center center;
                            background-repeat: no-repeat;
                            background-size: cover;
                            &.left-icon {
                                background-image: url('../../../../static/images/spectaculars-leftIcon.png');
                                left: -.4rem;
                            }
                            &.right-icon {
                                background-image: url('../../../../static/images/spectaculars-rightIcon.png');
                                right: -.4rem;
                            }
                        }
                    }
                    .list-head {
                        display: flex;
                        justify-content: space-between;
                        border-bottom: .02rem solid #173989;
                        height: .63rem;
                        line-height: .63rem;
                        padding: 0 .3rem;
                        span {
                            // flex: 1;
                            color: #fff;
                            text-align: center;
                            font-size: .18rem;
                        }
                    }
                    #qykq {
                        height: 3.32rem;
                        overflow: hidden;
                    }
                    ul {
                        padding-top: .08rem;
                        li {
                            display: flex;
                            height: .36rem;
                            line-height: .36rem;
                            justify-content: space-between;
                            padding: 0 .3rem;
                            span {
                                // flex: 1;
                                color: #fff;
                                text-align: center;
                                font-size: .16rem;
                            }
                        }
                    }
                }
            }
            .main-right {
                width: 4.59rem;
                >div {
                    height: 4.54rem;
                    // border: .02rem solid #2b6ce9;
                    padding-top: .08rem;
                    background-image: url('../../../../static/images/spectaculars-rightBorder.png');
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    .title {
                        color: #fff;
                        height: 1.06rem;
                        font-size: .24rem;
                        line-height: 1.06rem;
                        text-align: center;
                        font-weight: bolder;
                        position: relative;
                        i {
                            top: 50%;
                            transform: translateY(-50%);
                            width: .21rem;
                            height: .21rem;
                            position: absolute;
                            background-position: center center;
                            background-repeat: no-repeat;
                            background-size: cover;
                            &.left-icon {
                                background-image: url('../../../../static/images/spectaculars-leftIcon.png');
                                left: 1.5rem;
                            }
                            &.right-icon {
                                background-image: url('../../../../static/images/spectaculars-rightIcon.png');
                                right: 1.5rem;
                            }
                        }
                    }
                    img {
                        width: 1.4rem;
                        height: 1.66rem;
                        margin-left: 50%;
                        display: inline-block;
                        transform: translateX(-50%);
                        border: .01rem solid #173989;
                    }
                    ul {
                        color: #fff;
                        font-size: .18rem;
                        margin-top: .26rem;
                        font-weight: bolder;
                        padding-left: .7rem;
                        li {
                            height: .4rem;
                            line-height: .4rem;
                        }
                    }
                }
                .comparison {
                    ul {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        li {
                            width: 50%;
                        }
                    }
                }
                .real-time {
                    margin-top: .3rem;
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
            projectId: 21, // 项目id
            indexData: '', // 页面数据
            timeId: '', // 定时器
            time: '', // 时间
            wek: '', // 周
            year: '', // 年
            month: '', // 月
            day: '', // 日
            indexTimeId: '', // 页面数据定时器
        }
    },
    mounted() {
        // this.attendanceEcart()
    },
    created(){
        this.getProjectId()
        this.selectIndex()
        this.setTime()
    },
    methods: {
        // 获取项目id
        getProjectId() {
            this.projectId = sessionStorage.getItem('pid')
        },

        // 现场人员Echarts图
        attendanceEcart(data) {
            let attendanceEcart = this.$echarts.init(
                document.getElementById("attendanceEcart")
            )
            attendanceEcart.setOption({
                color: ["#349be6", "#fb497c", "#24e974", "#f38051","#7377f4","#ffa32d"],
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series: [
                    {
                        name: "现场工种",
                        type: "pie",
                        radius: "80%",
                        data: [
                            { value: data[0].rs, name: data[0].jobNames },
                            { value: data[1].rs, name: data[1].jobNames },
                            { value: data[2].rs, name: data[2].jobNames },
                            { value: data[3].rs, name: data[3].jobNames }
                        ],
                        roseType: "angle",
                        // label: {
                        //     normal: {
                        //         textStyle: {
                        //             color: "rgba(255, 255, 255, 0.3)"
                        //         }
                        //     }
                        // },
                        // labelLine: {
                        //     normal: {
                        //         lineStyle: {
                        //             color: "rgba(255, 255, 255, 0.3)"
                        //         },
                        //     }
                        // }
                    }
                ]
            })
        },

        // 获取页面数据
        selectIndex() {
            this.$axios.post(`/api/inOutKanBan/selectIndex?pid=${this.projectId}`).then(
                res => {
                    // console.log(res.data)
                    this.indexData = res.data.data
                    setTimeout(()=>{
                        this.attendanceEcart(this.indexData.gzList)
                        if (this.indexData.grdtList.length > 5) {
                            this.scrollStart('grdt','grdt1','grdt2')
                        }
                        if (this.indexData.glrydtList.length > 5) {
                            this.scrollStart('gldt','gldt1','gldt2')
                        }
                        if (this.indexData.sgqykq.length > 8) {
                            this.scrollStart('qykq','qykq1','qykq2')
                        }
                    },100)
                    this.indexTimeId = setInterval(()=>{
                        this.$axios.post(`/api/inOutKanBan/selectIndex?pid=${this.projectId}`).then(
                            res => {
                                this.indexData = res.data.data
                            }
                        )
                    },10000)
                }
            )
        },

        // 获取当前时间
        setTime() {
            moment.locale('zh-CN')
            this.timeId = setInterval(()=>{
                this.time = moment().format("hh:mm:ss")
                this.wek = moment().format('dddd')
                this.year = moment().format('YYYY')
                this.month = moment().format('MM')
                this.day = moment().format('DD')
            },1000)
        },

        // 滚动启动函数
        scrollStart(id,id1,id2) {
            setTimeout(() => {
                var speed = 45;
                var colee2 = document.getElementById(id2);
                var colee1 = document.getElementById(id1);
                var colee = document.getElementById(id);
                colee2.innerHTML = colee1.innerHTML; //克隆colee1为colee2
                function Marquee1() {
                    // console.log(colee1.offsetHeight)
                    //当滚动至colee1与colee2交界时
                    if (colee2.offsetTop - colee.scrollTop <= 0) {
                        colee.scrollTop -= colee1.offsetHeight //colee跳到最顶端
                    } else {
                      colee.scrollTop++
                        if (colee.scrollTop == colee1.offsetHeight) {
                            colee.scrollTop = 0
                        }
                    }
                }
                var MyMar1 = setInterval(Marquee1, speed); //设置定时器
                // //鼠标移上时清除定时器达到滚动停止的目的
                // colee.onmouseover = function() {
                //     clearInterval(MyMar1);
                // }
                // //鼠标移开时重设定时器
                // colee.onmouseout = function() {
                //     MyMar1 = setInterval(Marquee1, speed);
                // }
            }, 1000)
        },

        // 返回
        returnClick() {
            // console.log(123)
            window.clearInterval(this.indexTimeId)
            // this.$router.go(-1)
            setTimeout(() => {
                this.$router.go(-1)
            },100)
        },
    }
}
</script>