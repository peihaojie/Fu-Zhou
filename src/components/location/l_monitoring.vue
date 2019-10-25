<template>
    <div id="l_monitoring">
        <div class="content-box">
            <div class="nav">
                <!-- <el-collapse accordion>
                    <el-collapse-item :title="monitoringData.title" name="1">
                        <el-collapse @change="handleChange" accordion>
                            <el-collapse-item v-for="(item,index) in monitoringData.areaList" :key="index" :title="item.name" :name="`${item.name}`">
                                <div v-for="(item2,index2) in item.hireList" :key="index2">
                                    <a style="color:#fff" @click="$router.push({ path: '/location/l_search', query: { orderId: item2.hname } })">
                                    {{item2.hname}}
                                    <span class="online" v-show="item2.xloc">在线</span>
                                    <span class="offline" v-show="!item2.xloc">不在线</span>
                                    </a>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </el-collapse-item>
                </el-collapse> -->
                <el-collapse accordion>
                    <el-collapse-item v-for="(item,index) in workAreaList" :title="item.projectName" name="1" :key="index">
                        <el-collapse @change="handleChange" accordion>
                            <el-collapse-item :title="item2.areaName" :name="item2.areaId" v-for="item2 in item.areaList" :key="item2.areaId">
                                <div v-for="item3 in item2.userList" :key="item3.yuserId">
                                    <a @click="$router.push({ path: '/location/l_search',query: { orderId: item3.userName}})">
                                    {{item3.userName}}
                                    <span :class="item3.userStatus?'online':'offline'">{{item3.userStatus?'在线':'不在线'}}</span>
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
    #l_monitoring{
        .content-box {
            width: 15rem;
            height: 9.39rem;
            padding: .07rem .07rem .07rem .28rem;
            background-image: url('../../../static/images/location-bigBorder.png');
            background-position: center center;
            background-repeat: no-repeat;
            background-size: contain;
            display: flex;
            .nav {
                width: 2.55rem;
                .el-collapse {
                    border: 0;
                    transform: translateY(.12rem);
                    .el-collapse {
                        .el-collapse-item__header {
                            font-size: .15rem;
                        }
                    }
                    .el-collapse-item__header {
                        border: 0;
                        color:#3375fe;
                        font-size: .17rem;
                        background-color: #030625;
                        // width: 2.55rem;
                        height: .4rem;
                        line-height: .17rem;
                        // overflow: hidden;
                        // white-space: nowrap;
                        // text-overflow: ellipsis;
                    }
                    .el-collapse-item__wrap {
                        background-color: #030625;
                        padding-left: .2rem;
                        border: 0;
                        overflow: visible;
                        .el-collapse-item__content {
                            padding-bottom: 0;
                            a {
                                display: block;
                                width: 100%;
                                height: 100%;
                                font-size: .13rem;
                                position: relative;
                                color: #fff;
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
            marker: '', 
            amapManager,
            circle: '', // 电子围栏位置信息
            // circleCenter: [], // 圆心位置
            // circleRadius: 0, // 园半径
            zoom: 12,
            center: [114.014129,22.571492],
            events: {
                init: (o) => {
                    // this.marker = new AMap.Marker({
                    //     position: [114.003378,22.571492]
                    // });
                    // this.marker.setMap(o);
                    // console.log(o.getCenter())
                    // console.log(this.$refs.map.$$getInstance())
                    // o.getCity(result => {
                    //     console.log(result)
                    // })
                    this.text = new AMap.Text({
                        position: [114.003378,22.669854],
                        text: '20人在场',
                    });
                    this.text.setMap(o);
                    this.text.hide();
                    // let circle1 = new AMap.Circle({
                    //     center: [113.994194,22.578189],
                    //     fillOpacity: 1, //透明度
                    //     zIndex: 100, //层级
                    //     radius: 10, //半径
                    //     fillColor: '#e10505', //填充颜色
                    //     strokeColor: '#e10505', //轮廓线颜色
                    // })
                    // let circle2 = new AMap.Circle({
                    //     center: [114.004537,22.563725],
                    //     fillOpacity: 1, //透明度
                    //     zIndex: 100, //层级
                    //     radius: 10, //半径
                    //     fillColor: '#e10505', //填充颜色
                    //     strokeColor: '#e10505', //轮廓线颜色
                    // })
                    // let circle3 = new AMap.Circle({
                    //     center: [114.009601,22.570383],
                    //     fillOpacity: 1, //透明度
                    //     zIndex: 100, //层级
                    //     radius: 10, //半径
                    //     fillColor: '#e10505', //填充颜色
                    //     strokeColor: '#e10505', //轮廓线颜色
                    // })
                    // let circle4 = new AMap.Circle({
                    //     center: [114.006167,22.580171],
                    //     fillOpacity: 1, //透明度
                    //     zIndex: 100, //层级
                    //     radius: 10, //半径
                    //     fillColor: '#e10505', //填充颜色
                    //     strokeColor: '#e10505', //轮廓线颜色
                    // })
                    // circle1.setMap(o);
                    // circle2.setMap(o);
                    // circle3.setMap(o);
                    // circle4.setMap(o);
                    // // marker = [marker1,marker2]
                    // // marker.setMap(o)
                    // let polyline = new AMap.Polyline({
                    //     path:[
                    //         new AMap.LngLat(113.994194,22.578189),
                    //         new AMap.LngLat(114.004537,22.563725),
                    //         new AMap.LngLat(114.009601,22.570383),
                    //         new AMap.LngLat(114.006167,22.580171)
                    //     ],
                    //     lineJoin: 'round', //折线拐点样式
                    //     showDir: true, //移动方向
                    //     strokeWeight: 3, //线条宽度
                    //     strokeColor: '#3366ff', //线条颜色
                    // })
                    // polyline.setMap(o);
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
                    this.polygon.setMap(o)
                    this.polygon.hide()
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
            projectId: '', // 项目id
            workAreaList: '', // 工区列表
        }
    },
    created() {
        this.getProjectId()
        this.getMonitoringData()
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

        // 获取工区列表
        getMonitoringData() {
            this.$axios.post(`/api/hireApi/getHirePeople?projectId=${this.projectId}`).then(
                res => {
                    this.workAreaList = res.data.data
                }
            )
        },

        // 获取项目id
        getProjectId() {
          this.projectId = sessionStorage.getItem('pid')
        }
    }
}
</script>