<template>
    <div id="systemLiangZhi_home">
        <div class="content-box">
            <!-- 顶部盒子 -->
            <div class="top-box">
                <div class="title">
                    <div class="text">
                        <span>当前工程：</span>
                        <router-link to="/spectaculars" class="project-name">
                            {{indexData.projectName}}
                        </router-link>
                    </div>
                    <!-- 完工=accomplish 正常=normal 停工=lockout -->
                    <div class="state" :class="indexData.status=='ABUILDING'?'normal':indexData.status=='LOCKOUT'?'accomplish':'lockout'">
                        {{indexData.status=='ABUILDING'?'在建':indexData.status=='LOCKOUT'?'竣工':'停工'}}
                    </div>
                </div>
                <div class="condition">
                    <div class="worker">
                        <div class="icon green-color">
                        </div>
                        <div class="text">
                            <div class="title">劳务工人情况</div>
                            <ul>
                                <li>
                                    <p>{{indexData.grzrs}}</p>
                                    <span>劳务工人总数</span>
                                </li>
                                <li>
                                    <p>{{indexData.grzcrs}}</p>
                                    <span>在场劳务工人</span>
                                </li>
                                <li>
                                    <p>{{indexData.grkqrs}}</p>
                                    <span>今日考勤人数</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="manage">
                        <div class="icon yellow-color"></div>
                        <div class="text">
                            <div class="title">管理人员情况</div>
                            <ul>
                                <li>
                                    <p>{{indexData.glzrs}}</p>
                                    <span>管理人员总数</span>
                                </li>
                                <li>
                                    <p>{{indexData.glzcrs}}</p>
                                    <span>在场管理人员</span>
                                </li>
                                <li>
                                    <p>{{indexData.glkqrs}}</p>
                                    <span>今日考勤人数</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 中部盒子 -->
            <div class="middle-box">
                <!-- 考勤统计表 -->
                <div class="left-box">
                    <div class="title">
                        <span>最近10天考勤统计</span>
                        <div class="select-box">
                            <el-select v-model="attendanceValue" placeholder="请选择" size="mini" @change="attendanceChange">
                                <el-option
                                v-for="item in attendanceOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="label-box">
                            <ul>
                                <li>
                                    <i class="orange-color">
                                        <i class="dot"></i>
                                    </i>
                                    <span>当前在场人数</span>
                                </li>
                                <li>
                                    <i class="blue-color">
                                        <i class="dot"></i>
                                    </i>
                                    <span>考勤总人数</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="attendance" id="attendanceGr" v-show="attendanceShow"></div>
                    <div class="attendance" id="attendanceGl" v-show="!attendanceShow" style="width:8.04rem"></div>
                </div>
                <div class="right-box">
                    <!-- 分账情况 -->
                    <div class="routing">
                        <div class="title">分账情况</div>
                        <ul>
                            <li>
                                <i class="dot"></i>
                                <span>三方协议：</span>
                                <!-- <a class="blue-color">点击上传</a> -->
                            </li>
                            <li>
                                <i class="dot"></i>
                                <span>工资专户：</span>
                                <!-- <span class="green-color">已上传</span> -->
                            </li>
                            <li>
                                <i class="dot"></i>
                                <span>工资保证金：</span>
                                <!-- <span class="green-color">已上传</span> -->
                            </li>
                        </ul>
                    </div>
                    <!-- 安全培训情况 -->
                    <div class="safety">
                        <div class="title">安全培训情况</div>
                        <ul>
                            <li>
                                <i class="dot"></i>
                                <span>在场劳务工人未培训数：</span>
                                <span class="blue-color">{{indexData.grwpx}}人</span>
                            </li>
                            <li>
                                <i class="dot"></i>
                                <span>在场劳务工人未培训率：</span>
                                <span class="blue-color">{{indexData.grwpxl}}%</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 底部盒子 -->
            <div class="bottom-box">
                <!-- 工资发放统计 -->
                <div class="title">
                    <span>工资发放统计</span>
                    <div class="select-box">
                        <el-select v-model="grantValue" placeholder="请选择" size="mini" @change="grantChange">
                            <el-option
                            v-for="item in grantOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </div>
                    <div class="year-box">
                        <a class="last" @click="lastYear">
                            <i class="el-icon-arrow-left"></i>
                        </a>
                        <div class="year">{{year}}年</div>
                        <a class="next" @click="nextYear">
                            <i class="el-icon-arrow-right"></i>
                        </a>
                    </div>
                    <div class="label-box">
                        <ul>
                            <li>
                                <i class="orange-color"></i>
                                <span>发工资人数</span>
                            </li>
                            <li>
                                <i class="blue-color"></i>
                                <span>考勤人数</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="grant" id="grant"></div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    #systemLiangZhi_home {
        width: 100%;
        .content-box {
            width: 100%;
            padding: .3rem;
            border-radius: .1rem;
            background-color: #fff;
            .top-box {
                height: 1.6rem;
                padding-left: .2rem;
                padding-right: .2rem;
                border-radius: .04rem;
                background-color: #fff;
                box-shadow: 0 0 .5rem -.3rem #666;
                >.title {
                    height: .39rem;
                    border-bottom: .01rem solid #bdbdbd;
                    >div {
                        float: left;
                    }
                    .text {
                        font-size: .15rem;
                        line-height: .38rem;
                        .project-name {
                            color: #0090ff;
                        }
                    }
                    .state {
                        color: #fff;
                        width: 1.12rem;
                        height: .22rem;
                        font-size: .15rem;
                        text-align: center;
                        line-height: .22rem;
                        margin-left: .18rem;
                        border-radius: .04rem;
                        transform: translateY(.08rem);
                        background-size: contain;
                        background-repeat: no-repeat;
                        background-position: center center;
                    }
                    .accomplish {
                        background-image: url('../../../../static/images/system-complete.png');
                    }
                    .normal {
                        background-image: url('../../../../static/images/system-normal.png');
                    }
                    .lockout {
                        background-image: url('../../../../static/images/system-lockout.png');
                    }
                }
                .condition {
                    display: flex;
                    height: 1.21rem;
                    padding-top: .31rem;
                    >div {
                        flex: 1;
                        .icon {
                            float: left;
                            width: .6rem;
                            height: .6rem;
                            border-radius: .04rem;
                            background-repeat: no-repeat;
                            background-position: center center;
                            background-image: url('../../../../static/images/system-helmet.png');
                        }
                        .green-color {
                            background-color: #04c366;
                        }
                        .yellow-color {
                            background-color: #ffd14f;
                        }
                        .text {
                            float: left;
                            padding-left: .2rem;
                            .title {
                                height: .16rem;
                                color: #4a4a4a;
                                font-size: .14rem;
                                line-height: .16rem;
                            }
                            ul {
                                display: flex;
                                margin-top: .1rem;
                                padding-top: .07em;
                                li {
                                    width: 1.84rem;
                                    height: .33rem;
                                    padding-left: .08rem;
                                    p {
                                        height: .14rem;
                                        font-size: .14rem;
                                        line-height: .14rem;
                                        font-weight: bolder;
                                    }
                                    span {
                                        height: .14rem;
                                        font-size: .12rem;
                                        line-height: .14rem;
                                        display: inline-block;
                                    }
                                    &:nth-child(1) {
                                        border-left: .02rem solid #0090ff;
                                    }
                                    &:nth-child(2) {
                                        border-left: .02rem solid #04c366;
                                    }
                                    &:nth-child(3) {
                                        border-left: .02rem solid #ffd14f;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .middle-box {
                display: flex;
                height: 2.79rem;
                margin-top: .3rem;
                justify-content: space-between;
                .left-box {
                    width: 50%;
                    height: 2.79rem;
                    border-radius: .04rem;
                    background-color: #fff;
                    box-shadow: 0 0 .5rem -.3rem #666;
                    .title {
                        height: .47rem;
                        position: relative;
                        line-height: .3rem;
                        padding-top: .17rem;
                        padding-left: .2rem;
                        >span {
                            float: left;
                            height: .16rem;
                            font-size: .14rem;
                            line-height: .3rem;
                        }
                        .select-box {
                            float: left;
                            margin-left: .3rem;
                            input {
                                height: .3rem;
                                width: 1.05rem;
                                border-radius: .02rem;
                                border: .01rem solid #f1f1f1;
                            }
                        }
                        .label-box {
                            right: .3rem;
                            position: absolute;
                            ul {
                                li {
                                    float: right;
                                    height: .3rem;
                                    line-height: .3rem;
                                    span {
                                        font-size: .12rem;
                                    }
                                    &:first-child {
                                        margin-left: .3rem;
                                    }
                                    >i {
                                        width: .26rem;
                                        height: .01rem;
                                        position: relative;
                                        display: inline-block;
                                        vertical-align: middle;
                                        .dot {
                                            top: 50%;
                                            left: 50%;
                                            width: .13rem;
                                            height: .13rem;
                                            position: absolute;
                                            border-radius: .13rem;
                                            background-color: #fff;
                                            transform: translate(-50%,-50%);
                                        }
                                    }
                                    .blue-color {
                                        background-color: #0090ff;
                                        .dot {
                                            border: .01rem solid #0090ff;
                                        }
                                    }
                                    .orange-color {
                                        background-color: #fd5101;
                                        .dot {
                                            border: .01rem solid #fd5101;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .attendance {
                        width: 100%;
                        height: 2.32rem;
                    }
                }
                .right-box {
                    width: 48.1%;
                    >div {
                        height: 1.25rem;
                        padding-top: .37rem;
                        padding-left: .29rem;
                        border-radius: .04rem;
                        background-color: #fff;
                        box-shadow: 0 0 .5rem -.3rem #666;
                        .title {
                            height: .16rem;
                            font-size: .14rem;
                            font-weight: bolder;
                            line-height: .16rem;
                        }
                        ul {
                            display: flex;
                            margin-top: .2rem;
                            li {
                                height: .14rem;
                                font-size: .12rem;
                                line-height: .14rem;
                                .dot {
                                    width: .06rem;
                                    height: .06rem;
                                    margin-right: .06rem;
                                    border-radius: .06rem;
                                    display: inline-block;
                                    background-color: #0090ff;
                                }
                                .green-color {
                                    color: #04c366;
                                }
                                .blue-color {
                                    color: #0090ff;
                                }
                            }
                        }
                    }
                    .routing {
                        ul {
                            li {
                                width: 2rem;
                            }
                        }
                    }
                    .safety {
                        margin-top: .29rem;
                        ul {
                            li {
                                width: 3.42rem;
                            }
                        }
                    }
                }
            }
            .bottom-box {
                width: 100%;
                height: 2.8rem;
                margin-top: .3rem;
                border-radius: .04rem;
                background-color: #fff;
                box-shadow: 0 0 .5rem -.3rem #666;
                .title {
                    height: .41rem;
                    position: relative;
                    line-height: .3rem;
                    padding-top: .11rem;
                    padding-left: .2rem;
                    >span {
                        float: left;
                        height: .16rem;
                        font-size: .14rem;
                        line-height: .3rem;
                    }
                    .select-box {
                        float: left;
                        margin-left: .3rem;
                        input {
                            height: .3rem;
                            width: 1.05rem;
                            border-radius: .02rem;
                            border: .01rem solid #f1f1f1;
                        }
                    }
                    .year-box {
                        top: .11rem;
                        left: 50%;
                        display: flex;
                        position: absolute;
                        transform: translate(-50%);
                        >a {
                            float: left;
                            width: .3rem;
                            height: .3rem;
                            color: #0090ff;
                            font-size: .16rem;
                            line-height: .3rem;
                            text-align: center;
                            transition: all .5s;
                            border-radius: .02rem;
                            &:hover {
                                background-color: #f7f7f7;
                            }
                        }
                        >div {
                            float: left;
                            font-size: .2rem;
                            font-weight: bolder;
                            padding: 0 .1rem;
                        }
                    }
                    .label-box {
                        right: .3rem;
                        position: absolute;
                        ul {
                            li {
                                float: right;
                                height: .3rem;
                                line-height: .3rem;
                                span {
                                    font-size: .12rem;
                                }
                                &:first-child {
                                    margin-left: .3rem;
                                }
                                >i {
                                    width: .12rem;
                                    height: .12rem;
                                    margin-right: .12rem;
                                    display: inline-block;
                                    vertical-align: middle;
                                }
                                .blue-color {
                                    background-color: #0090ff;
                                }
                                .orange-color {
                                    background-color: #fd5101;
                                }
                            }
                        }
                    }
                }
                .grant {
                    width: 100%;
                    height: 2.39rem;
                }
            }
        }
    }
</style>

<script>
export default {
    data() {
        return {
            attendanceOptions: [{
                value: '劳务工人',
                label: '劳务工人'
            }, {
                value: '管理人员',
                label: '管理人员'
            }], // 考勤统计选项
            attendanceValue: '劳务工人', // 考勤统计显示的人员类型
            grantOptions: [{
                value: '劳务工人',
                label: '劳务工人'
            }, {
                value: '管理人员',
                label: '管理人员'
            }], // 工资发放统计选项
            grantValue: '劳务工人', // 工资发放统计显示的人员类型
            year: 2019, // 工资发放统计年份
            pid: 0, // 项目id
            indexData: {}, // 页面数据
            attendanceShow: true, // 考勤统计表显示状态
        }
    },
    mounted() {
        // this.attendanceGr()
        // this.attendanceGl()
        this.grant()
    },
    created() {
        this.getProjectId()
        this.selectIndex()
    },
    methods: {
        // 获取项目id
        getProjectId() {
            this.pid = sessionStorage.getItem('pid')
        },

        // 考勤统计统计模块：ECharts图渲染
        attendanceGr(zcrs,kqrs,day) {
            let attendanceGr = this.$echarts.init(
              document.getElementById("attendanceGr")
            )
            attendanceGr.setOption({
                // backgroundColor: "#FBFBFB",
                grid: {
                    x: 60,
                    y: 30,
                    x2: 50,
                    y2: 50,
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
                        // data: [
                        //   "05-02",
                        //   "05-03",
                        //   "05-04",
                        //   "05-05",
                        //   "05-06",
                        //   "05-07",
                        //   "05-08",
                        //   "05-09",
                        //   "05-10",
                        //   "05-11"
                        // ],
                        data: day
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
                        name: "当日在场人数",
                        type: "line",
                        symbolSize: 10,
                        smooth: 0.2,
                        color: ["#fd5101"],
                        // data: [600, 500, 500, 500, 400, 500, 500, 400, 400, 500]
                        data: zcrs
                    },
                    {
                        name: "考勤总人数",
                        type: "line",
                        symbolSize: 10,
                        smooth: 0.2,
                        color: ["#0090ff"],
                        // data: [300, 200, 100, 500, 300, 300, 400, 300, 100, 300],
                        data: kqrs
                    },
                    // {
                    //     name: "管理人员出勤人数",
                    //     type: "line",
                    //     symbolSize: 4,
                    //     smooth: 0.2,
                    //     color: ["#33577c"],
                    //     data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                    //     // data: aMZcGly
                    // }
                ]
            });
        },
        // 考勤统计统计模块管理人员：ECharts图渲染
        attendanceGl(zcrs,kqrs,day) {
            let attendanceGl = this.$echarts.init(
              document.getElementById("attendanceGl")
            )
            attendanceGl.setOption({
                // backgroundColor: "#FBFBFB",
                grid: {
                    x: 60,
                    y: 30,
                    x2: 50,
                    y2: 50,
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
                        // data: [
                        //   "05-02",
                        //   "05-03",
                        //   "05-04",
                        //   "05-05",
                        //   "05-06",
                        //   "05-07",
                        //   "05-08",
                        //   "05-09",
                        //   "05-10",
                        //   "05-11"
                        // ],
                        data: day
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
                        name: "当日在场人数",
                        type: "line",
                        symbolSize: 10,
                        smooth: 0.2,
                        color: ["#fd5101"],
                        // data: [600, 500, 500, 500, 400, 500, 500, 400, 400, 500]
                        data: zcrs
                    },
                    {
                        name: "考勤总人数",
                        type: "line",
                        symbolSize: 10,
                        smooth: 0.2,
                        color: ["#0090ff"],
                        // data: [300, 200, 100, 500, 300, 300, 400, 300, 100, 300],
                        data: kqrs
                    },
                    // {
                    //     name: "管理人员出勤人数",
                    //     type: "line",
                    //     symbolSize: 4,
                    //     smooth: 0.2,
                    //     color: ["#33577c"],
                    //     data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                    //     // data: aMZcGly
                    // }
                ]
            });
        },

        // 工资发放统计模块：ECharts图渲染
        grant() {
            let grant = this.$echarts.init(
              document.getElementById("grant")
            )
            grant.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line'
                    }
                },
                grid: {
                    x: 20,
                    y: 20,
                    x2: 20,
                    y2: 20,
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['1月','2月','3月','4月','5月','6月','7月','8月']
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        interval: 50,
                    }
                ],
                series : [
                    {
                        color: ["#0090ff"],
                        name:'考勤人数',
                        type:'bar',
                        barWidth: 20,
                        data:[20, 49, 33, 35, 70, 76, 135, 162],
                    },
                    {
                        color: ["#fd5101"],
                        name:'发放工资人数',
                        type:'bar',
                        barWidth: 20,
                        data:[16, 29, 29, 26, 58, 70, 105, 152,],
                    }
                ]
            })
        },

        // 上一年
        lastYear() {
            this.year = this.year-1
        },

        // 下一年 
        nextYear() {
            this.year = this.year+1
        },

        // 获取页面数据
        selectIndex() {
            this.$axios.post(`/api/pcLzIndex/selectIndex?pid=${this.pid}`).then(
                res => {
                    // console.log(res.data)
                    this.indexData = res.data.data
                    let grzcrs = []
                    let grkqrs = []
                    let grday = []
                    let glzcrs = []
                    let glkqrs = []
                    let glday = []
                    for (let i = 0; i < res.data.data.grkqtj.length; i++) {
                        grzcrs.push(res.data.data.grkqtj[i].numberOne)
                        grkqrs.push(res.data.data.grkqtj[i].numberTwo)
                        grday.push(res.data.data.grkqtj[i].time.split(' ')[0])
                    }
                    for (let i = 0; i < res.data.data.glkqtj.length; i++) {
                        glzcrs.push(res.data.data.glkqtj[i].numberOne)
                        glkqrs.push(res.data.data.glkqtj[i].numberTwo)
                        glday.push(res.data.data.glkqtj[i].time.split(' ')[0])
                    }
                    this.attendanceGr(grzcrs,grkqrs,grday)
                    this.attendanceGl(glzcrs,glkqrs,glday)
                }
            )
        },

        attendanceChange() {
            console.log(this.attendanceValue)
            if (this.attendanceValue == '劳务工人') {
                this.attendanceShow = true
            } else {
                this.attendanceShow = false
                // console.log(`123`)
            }
        },

        grantChange() {
            console.log(this.grantValue)
        }
    }
}
</script>