<template>
    <div id="systemSet_equipmentSet">
        <div class="content-box">
            <!-- 头部 -->
            <div class="title">
                <div class="text">设备设置</div>
            </div>
            <!-- 主体 -->
            <div class="main">
                <ul>
                    <li>
                        <i class="icon location"></i>
                        <div class="text">
                            <div class="name">人员定位</div>
                            <router-link to="/systemSet_equipmentSet_location">
                                <i class="setIcon"></i>
                                设置
                            </router-link>
                        </div>
                    </li>
                    <li>
                        <i class="icon tower-crane"></i>
                        <div class="text">
                            <div class="name">塔吊</div>
                            <router-link to="systemSet_equipmentSet_towerCrane">
                                <i class="setIcon"></i>
                                设置
                            </router-link>
                        </div>
                    </li>
                    <li>
                        <i class="icon elevator"></i>
                        <div class="text">
                            <div class="name">升降机</div>
                            <router-link to="/systemSet_equipmentSet_elevator">
                                <i class="setIcon"></i>
                                设置
                            </router-link>
                        </div>
                    </li>
                    <li>
                        <i class="icon electricity"></i>
                        <div class="text">
                            <div class="name">智能电箱</div>
                            <router-link to="/systemSet_equipmentSet_electricityBox">
                                <i class="setIcon"></i>
                                设置
                            </router-link>
                        </div>
                    </li>
                    <li>
                        <i class="icon car"></i>
                        <div class="text">
                            <div class="name">车辆</div>
                            <router-link to="/systemSet_equipmentSet_car">
                                <i class="setIcon"></i>
                                设置
                            </router-link>
                        </div>
                    </li>
                    <li>
                        <i class="icon camera"></i>
                        <div class="text">
                            <div class="name">摄像头</div>
                            <router-link to="/systemSet_equipmentSet_camera">
                                <i class="setIcon"></i>
                                设置
                            </router-link>
                        </div>
                    </li>
                    <li>
                        <i class="icon quality"></i>
                        <div class="text">
                            <div class="name">质量巡检</div>
                            <router-link to="/systemSet_equipmentSet_quality">
                                <i class="setIcon"></i>
                                设置
                            </router-link>
                        </div>
                    </li>
                    <li>
                        <i class="icon safety"></i>
                        <div class="text">
                            <div class="name">安全巡检</div>
                            <router-link to="/systemSet_equipmentSet_safety">
                                <i class="setIcon"></i>
                                设置
                            </router-link>
                        </div>
                    </li>
                    <li>
                        <i class="icon TSP"></i>
                        <div class="text">
                            <div class="name">TSP设置</div>
                            <router-link to="/systemSet_equipmentSet_TSP">
                                <i class="setIcon"></i>
                                设置
                            </router-link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    #systemSet_equipmentSet {
        width: 100%;
        .content-box {
            min-height: 7rem;
            border-radius: .04rem;
            background-color: #fff;
            box-shadow: 0 0 .5rem -.3rem #666;
            padding-left: .2rem;
            padding-bottom: .3rem;
            .title {
                height: 1.05rem;
                width: 98%;
                border-bottom: .35rem solid #c5e8ff;
                .text {
                    font-size: .24rem;
                    text-align: center;
                    line-height: .7rem;
                }
            }
            .main {
                width: 98%;
                ul {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    li {
                        width: 25%;
                        margin-top: .4rem;
                        .icon {
                            width: .8rem;
                            height: .8rem;
                            display: inline-block;
                            background-color: #0090ff;
                            background-repeat: no-repeat;
                            background-position: center center;
                            background-size: auto .44rem;
                        }
                        .text {
                            height: .8rem;
                            vertical-align: top;
                            padding-left: .14rem;
                            display: inline-block;
                            .name {
                                height: .4rem;
                                color: #4a4a4a;
                                font-size: .16rem;
                                line-height: .4rem;
                            }
                            >a {
                                height: .4rem;
                                color: #4e96db;
                                font-size: .16rem;
                                line-height: .4rem;
                                .setIcon {
                                    width: .16rem;
                                    height: .16rem;
                                    display: inline-block;
                                    // background-color: #4e96db;
                                    vertical-align: middle;
                                    background-image: url('../../../../static/images/systemSet-setIcon.png');
                                    background-position: center center;
                                    background-repeat: no-repeat;
                                    background-size: contain;
                                }
                            }
                        }
                        .location {
                            background-image: url('../../../../static/images/systemSet-location.png');
                        }
                        .tower-crane {
                            background-image: url('../../../../static/images/systemSet-towerCrane.png');
                        }
                        .elevator {
                            background-image: url('../../../../static/images/systemSet-elevator.png');
                        }
                        .electricity {
                            background-image: url('../../../../static/images/systemSet-electricity.png');
                        }
                        .car {
                            background-image: url('../../../../static/images/systemSet-car.png');
                        }
                        .camera {
                            background-image: url('../../../../static/images/systemSet-camera.png');
                        }
                        .quality {
                            background-image: url('../../../../static/images/systemSet-quality.png');
                        }
                        .safety {
                            background-image: url('../../../../static/images/systemSet-safety.png');
                        }
                        .TSP {
                            background-image: url('../../../../static/images/systemSet-TSP.png');
                        }
                    }
                }
            }
        }
    }
</style>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>