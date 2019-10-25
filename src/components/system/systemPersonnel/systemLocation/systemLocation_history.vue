<template>
    <div id="systemLocation_history">
        <div class="content-box">
            <div class="message">
                <div class="inquire">
                    <el-input v-model="name" placeholder="姓名或设备编号或电话"></el-input>
                    <el-date-picker
                        v-model="createDate"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                    <!-- <el-date-picker
                        v-model="createDate"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        @change="getTime">
                    </el-date-picker> -->
                    <a class="button" @click="getHireHistory">搜索</a>
                </div>
                <div class="message-box">
                    <ul>
                        <li>
                            姓名：<span>{{historyData.userName}}</span>
                        </li>
                        <li>
                            电话：<span>{{historyData.userPhone}}</span>
                        </li>
                        <li>
                            所属公司：<span>{{historyData.constructionName}}</span>
                        </li>
                        <li>
                            设备编号：<span>{{historyData.imei}}</span>
                        </li>
                        <li class="start">
                            开始
                        </li>
                        <li>
                            设备电量：<span v-if="historyData.list.length > 0">{{historyData.list[historyData.list.length-1].bat}}%</span>
                        </li>
                        <li>
                            时间：<span v-if="historyData.list.length > 0">{{historyData.list[historyData.list.length-1].watchDate}}</span>
                        </li>
                        <li>
                            位置：<span v-if="historyData.list.length > 0">{{historyData.list[historyData.list.length-1].address}}</span>
                        </li>
                        <li class="end">
                            结束
                        </li>
                        <li>
                            设备电量：<span v-if="historyData.list.length > 0">{{historyData.list[0].bat}}%</span>
                        </li>
                        <li>
                            时间：<span v-if="historyData.list.length > 0">{{historyData.list[0].watchDate}}</span>
                        </li>
                        <li>
                            位置：<span v-if="historyData.list.length > 0">{{historyData.list[0].address}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="map">
                <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" :events="events" class="amap-demo">
                </el-amap>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    #systemLocation_history {
        width: 100%;
        .content-box {
            display: flex;
            height: 9.45rem;
            border-radius: .04rem;
            background-color: #fff;
            padding: .3rem .3rem .3rem .2rem;
            box-shadow: 0 0 .5rem -.3rem #666;
            .message {
                width: 3.17rem;
                // height: 1.41rem;
                .inquire {
                    // transform: translateY(.18rem);
                    position: relative;
                    .el-date-editor {
                        width: 2.95rem;
                        // border: 0.01rem solid #b6b6b6;
                        .el-range-separator {
                            width: auto;
                        }
                    }
                    .el-input {
                        width: 2.97rem;
                        height: .6rem;
                        padding: .01rem;
                        .el-input__inner {
                            color: #5a5a5a;
                            height: .4rem;
                            line-height: .38rem;
                            font-size: .16rem;
                            padding-left: .1rem;
                            border: .01rem solid #b6b6b6;
                            border-radius: .05rem;
                            // background-color: #fff;
                        }
                        .el-input__prefix {
                            display: none;
                        }
                        .el-input__icon {
                            height: .4rem;
                            line-height: .4rem;
                        }
                    }
                    .button {
                        top: 1.2rem;
                        right: .2rem;
                        color: #fff;
                        height: .34rem;
                        width: 1.4rem;
                        font-size: .18rem;
                        text-align: center;
                        position: absolute;
                        transition: all .5s;
                        line-height: .32rem;
                        border-radius: .02rem;
                        background-color: #ffd14f;
                        border: .01rem solid #d4ad40;
                        &:hover {
                            background-color: #d4ad40;
                        } 
                    }
                }
                .message-box {
                    color: #5a5a5a;
                    font-size: .16rem;
                    width: 2.97rem;
                    margin-top: .64rem;
                    .start {
                        margin-top: .2rem;
                        margin-bottom: .1rem;
                        color: #3ee09a;
                        font-size: .16rem;
                    }
                    .end {
                        margin-top: .2rem;
                        margin-bottom: .1rem;
                        color: #fb497c;
                        font-size: .16rem;
                    }
                    .enter {
                        width: .3rem;
                        height: .3rem;
                        font-size: .16rem;
                        line-height: .3rem;
                        text-align: center;
                        margin-top: .15rem;
                        border-radius: .3rem;
                        background-color: #3ee09a;
                    }
                    .come {
                        width: .3rem;
                        height: .3rem;
                        font-size: .16rem;
                        line-height: .3rem;
                        text-align: center;
                        margin-top: .15rem;
                        border-radius: .3rem;
                        background-color: #fb497c;
                    }
                }
            }
            .map {
                flex: 1;
            }
        }
    }
</style>

<script>
let amapManager = new VueAMap.AMapManager()
export default {
    data() {
        return {
            projectId: 1, //项目id
            name: '', //需要查询的人名或设备编号或手机号码
            startTime: '', // 开始时间
            endTime: '', // 结束时间
            createDate: '', //需要查询的定位数据的日期
            circle: '', // 电子围栏位置信息
            polyline: '', //历史轨迹
            historyData: {
                id: 0,
                userName: "",
                userPhone: "",
                constructionName: "",
                imei: "",
                bat: '',
                watchDate: "",
                xloc: '',
                yloc: '',
                address: "",
                list: [
                    {
                        xloc: '',
                        watchDate: "",
                        address: "",
                        bat: '',
                        yloc: ''
                    },
                ]
            }, //人员历史轨迹数据
            time: '', //时间
            amapManager,
            zoom: 12,
            center: [114.083372,22.544146],
            events: {
                init: (o) => {
                    // 历史轨迹
                    this.polyline = new AMap.Polyline({
                        path:[
                            [113.994194,22.578189],
                            [114.004537,22.563725],
                            [114.009601,22.570383],
                            [114.006167,22.580171]
                        ],
                        lineJoin: 'round', //折线拐点样式
                        showDir: true, //移动方向
                        strokeWeight: 2, //线条宽度
                        strokeColor: '#3366ff', //线条颜色
                    })
                    this.polyline.setMap(o)
                    this.polyline.hide()
                    // 渲染电子围栏
                    this.circle = new AMap.Circle({
                        center: [114.007675,22.663599], // 圆心位置
                        radius: 0,         // 圆半径
                        fillColor: 'none',   // 圆形填充颜色
                        fillOpacity: 0,      // 填充色透明度
                        strokeColor: '#3979fe', // 描边颜色
                        strokeWeight: 2,     // 描边宽度
                    })
                    this.circle.setMap(o)
                },
                'moveend': () => {
                },
                'zoomchange': () => {
                },
                'click': (e) => {
                //   alert('map clicked')
                }
            },
            plugin: [{
                pName: 'ToolBar',
                direction: false,
                events: {
                    init(instance) {
                        // console.log(instance);
                    },
                }
            }],
        }
    },
    created() {
        this.getPid()
    },
    methods: {
        // 获取人员定位数据
        getLocaltionListData() {
            this.$axios.get(`/lz/hire/localtionList?id=${this.pid}&string=${this.name}&createDate=${this.createDate}`).then(
                res => {
                    // console.log(res.data.length)
                    // 电子围栏渲染
                    let temp = []
                    let temp2 = []
                    let temp3 = []
                    if (res.data.length > 0) {
                        if (res.data[0].localtionList.length>0) {
                            this.localtionListData = res.data[0]
                            temp.push(this.localtionListData.areaList[0].xloc)
                            temp.push(this.localtionListData.areaList[0].yloc)
                            // console.log(temp)

                            // 遍历历史轨迹记录
                            for (let i = 0; i < this.localtionListData.localtionList.length; i++) {
                                temp2 = []
                                temp2.push(this.localtionListData.localtionList[this.localtionListData.localtionList.length-1-i].xloc)
                                temp2.push(this.localtionListData.localtionList[this.localtionListData.localtionList.length-1-i].yloc)
                                temp3.push(temp2)
                            }
                            this.circle.setCenter(temp)
                            this.circle.setRadius(this.localtionListData.areaList[0].radius)
                            // 地图中心点设为电子围栏中心点
                            this.center = temp3[0]
                            this.zoom = 14
                            // 渲染历史轨迹
                            this.polyline.setPath(temp3)
                            this.polyline.show()
                        } else {
                            this.$message({
                              message: '无此人定位数据',
                              type: 'warning'
                            })
                        }
                    } else {
                        this.$message({
                          message: '无此人定位数据',
                          type: 'warning'
                        })
                    }
                }
            )
        },

        // 获取项目id
        getPid() {
            this.projectId = sessionStorage.getItem('pid')
        },

        // 获取开始时间与结束时间
        // getTime() {
        //     this.createDate?this.startTime = this.createDate[0]:this.startTime=''
        //     this.createDate?this.endTime = this.createDate[1]:this.endTime=''
        // },

        // 获取人员历史轨迹
        getHireHistory() {
            if (this.name && this.createDate ) {
                this.$axios.post(`/api/hireApi/getHireHistory?filed=${this.name}&startTime=${this.createDate}&projectId=${this.projectId}`).then(
                    res => {
                        console.log(res.data)
                        if (res.data.code == 0) {
                            this.historyData = res.data.data[0]
                            console.log(this.historyData)
                            if (this.historyData.list.length == 0) {
                                this.$message({
                                message: '未找到相关日期',
                                type: 'warning'
                            })
                            } else {
                                let temp = []
                                let temp2 = []
                                let temp3 = []
                                // 遍历历史轨迹记录
                                for (let i = 0; i < this.historyData.list.length; i++) {
                                    temp = []
                                    temp.push(this.historyData.list[this.historyData.list.length-1-i].xloc)
                                    temp.push(this.historyData.list[this.historyData.list.length-1-i].yloc)
                                    temp2.push(temp)
                                }
                                temp3.push(this.historyData.list[0].areaXloc)
                                temp3.push(this.historyData.list[0].areaYloc)
                                // console.log(temp3)
                                this.circle.setRadius(this.historyData.list[0].areaRadius)
                                this.circle.setCenter(temp3)
                                this.center = temp2[0]
                                this.zoom = 14
                                this.polyline.setPath(temp2)
                                this.polyline.show()
                                this.$message({
                                    message: '查询成功',
                                    type: 'success'
                                })
                            }
                        } else {
                            this.name = ''
                            this.createDate = ''
                            this.$message({
                                message: '未找到相关人员',
                                type: 'warning'
                            })
                        }
                    }
                )
            } else {
                this.$message({
                    message: '输入框不得为空',
                    type: 'warning'
                })
            }
        },
    }
}
</script>