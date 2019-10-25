<template>
    <div id="systemLocation_home">
        <div class="content-box">
            <div class="nav">
                <el-collapse accordion>
                    <el-collapse-item v-for="(item,index) in workAreaList" :title="item.projectName" name="1" :key="index">
                        <el-collapse @change="handleChange" accordion>
                            <!-- <el-collapse-item v-for="(item,index) in monitoringData.areaList" :key="index" :title="item.name" :name="`${item.name}`">
                                <div v-for="(item2,index2) in item.hireList" :key="index2">
                                    <a style="color:#fff" @click="$router.push({ path: '/location/l_search', query: { orderId: item2.hname } })">
                                    {{item2.hname}}
                                    <span class="online" v-show="item2.xloc">在线</span>
                                    <span class="offline" v-show="!item2.xloc">不在线</span>
                                    </a>
                                </div>
                            </el-collapse-item> -->
                            <el-collapse-item :title="item2.areaName" :name="item2.areaId" v-for="item2 in item.areaList" :key="item2.areaId">
                                <div v-for="item3 in item2.userList" :key="item3.yuserId">
                                    <a style="color:#4a4a4a" @click="$router.push({ path: '/systemLocation_search',query: { orderId: item3.userName}})">
                                    {{item3.userName}}
                                    <span :class="item3.userStatus?'online':'offline'">{{item3.userStatus?'在线':'不在线'}}</span>
                                    <!-- <span class="offline">不在线</span> -->
                                    </a>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div class="map">
                <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" :events="events" class="amap-demo">
                </el-amap>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    #systemLocation_home {
        width: 100%;
        .content-box {
            display: flex;
            height: 9.45rem;
            border-radius: .04rem;
            background-color: #fff;
            padding: .3rem .3rem .3rem .2rem;
            box-shadow: 0 0 .5rem -.3rem #666;
            .nav {
                width: 3.17rem;
                .el-collapse {
                    border: 0;
                    // transform: translateY(.12rem);
                    .el-collapse {
                        .el-collapse-item__header {
                            font-size: .16rem;
                            background-color: #fff;
                        }
                    }
                    .el-collapse-item__header {
                        border: 0;
                        color:#4a4a4a;
                        font-size: .18rem;
                        line-height: .2rem;
                        padding-left: .14rem;
                        background-color: #c5e8ff;
                    }
                    .el-collapse-item__wrap {
                        padding-left: .18rem;
                        border: 0;
                        overflow: visible;
                        .el-collapse-item__content {
                            padding-bottom: 0;
                            padding-left: .16rem;
                            a {
                                display: block;
                                width: 100%;
                                height: 100%;
                                font-size: .14rem;
                                position: relative;
                                .online {
                                    color: #24e974;
                                    position: absolute;
                                    right: .5rem;
                                    // top: 0;
                                }
                                .offline {
                                    color: #fb497c;
                                    position: absolute;
                                    right: .5rem;
                                }
                            }
                        }
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
            polygon: '',
            text: '',
            amapManager,
            circle: '', // 电子围栏位置信息
            zoom: 12,
            center: [114.014129,22.571492],
            events: {
                init: (o) => {
                    this.text = new AMap.Text({
                        position: [114.003378,22.669854],
                        text: '20人在场',
                    });
                    // this.text.setMap(o);
                    // this.text.hide();

                    this.polygon = new AMap.Polygon({
                        path: [
                            new AMap.LngLat(113.992992,22.581439),
                            new AMap.LngLat(114.01033,22.582786),
                            new AMap.LngLat(114.010287,22.562853),
                            new AMap.LngLat(113.996898,22.563329)
                        ],  
                        fillColor: '#fff', // 多边形填充颜色
                        fillOpacity: 0, //填充颜色透明度
                        borderWeight: 1, // 线条宽度
                        strokeColor: '#137ed2', // 线条颜色}
                    })
                    // this.polygon.setMap(o)
                    // this.polygon.hide()
                    // 电子围栏位置信息
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
                    // alert('map clicked')
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
            projectId: 1, //项目id
            workAreaList: '', // 工区列表
        }
    },
    created() {
        this.getPid()
        // this.getMonitoringData()
        this.getHirePeople()
    },
    methods: {
        // 导航栏点击事件
        handleChange(val) {
            // console.log(val)
            // if (val == '1-1') {
            //     this.polygon.show()
            //     this.text.show()
            //     this.marker.hide()
            // }
            // this.circle.show()
            console.log(this.workAreaList)
            let temp = []
            for (let i = 0; i < this.workAreaList[0].areaList.length; i++) {
                // console.log(this.monitoringData.areaList[i].name)
                if (val == this.workAreaList[0].areaList[i].areaId) {
                    temp.push(this.workAreaList[0].areaList[i].areaXloc)
                    temp.push(this.workAreaList[0].areaList[i].areaYloc)
                    // 设置电子围栏圆心
                    this.circle.setCenter(temp)
                    // 设置电子围栏半径
                    this.circle.setRadius(this.workAreaList[0].areaList[i].areaRadius)
                    // 设置地图中心点
                    this.center = temp
                    // 设置地图缩放等级
                    this.zoom = 14
                }
            }
        },

        // 获取项目id
        getPid() {
            this.projectId = sessionStorage.getItem('pid')
        //   console.log(this.projectId)
        },

        // 获取工区列表
        getHirePeople() {
            this.$axios.post(`/api/hireApi/getHirePeople?projectId=${this.projectId}`).then(
                res => {
                    // console.log(res.data.data[0])
                    // for (let i = 0; i < res.data.data.length; i++) {
                    //     if (this.projectId==res.data.data[i].projectId) {
                    //         this.workAreaList.push(res.data.data[i])
                    //     }
                    // }
                    this.workAreaList = res.data.data
                    // console.log(this.workAreaList)
                }
            )
        },

    }
}
</script>