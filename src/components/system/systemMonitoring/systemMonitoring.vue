<template>
    <div id="systemMonitoring">
        <!-- 阴影框 -->
        <div class="shadow-box"></div>
        <!-- 侧导航栏 -->
        <div class="side-nav">
            <ul>
                <li class="button">
                    <router-link to="/systemHome" class="return"></router-link>
                </li>
                <li v-for="(item,index) in videoAreaData" :key="index">
                    <a :class="item.id==areaId?'active':''" @click="selectVideoArea(item.id)">
                        <!-- <div class="icon"></div> -->
                        <span>{{item.areaName}}</span>
                    </a>
                </li>
            </ul>
        </div>
        <!-- 内容 -->
        <div class="padding-box">
            <div class="content-box">
                <div class="left-box">
                    <ul>
                        <li class="active" v-for="(item,index) in videoData" :key="index" v-if="areaId==item.areaId">
                            <a class="text">
                                <i class="icon"></i>
                                <span>{{item.videoName}}</span>
                                <i class="dot"></i>
                            </a>
                            <div class="video">
                                <video id="player1" poster="" controls playsInline webkit-playsinline autoplay >
                                    <source :src="item.url" type="" />
                                    <source :src="item.url" type="application/x-mpegURL" />
                                </video>
                            </div>
                        </li>
                    </ul>
                    <!-- <ul>
                        <li class="active">
                            <a class="text">
                                <i class="icon"></i>
                                <span>摄像头001</span>
                                <i class="dot"></i>
                            </a>
                            <div class="video"></div>
                        </li>
                        <li>
                            <a class="text">
                                <i class="icon"></i>
                                <span>摄像头002</span>
                                <i class="dot"></i>
                            </a>
                            <div class="video"></div>
                        </li>
                        <li>
                            <a class="text">
                                <i class="icon"></i>
                                <span>摄像头003</span>
                                <i class="dot"></i>
                            </a>
                            <div class="video"></div>
                        </li>
                        <li>
                            <a class="text">
                                <i class="icon"></i>
                                <span>摄像头004</span>
                                <i class="dot"></i>
                            </a>
                            <div class="video"></div>
                        </li>
                        <li>
                            <a class="text">
                                <i class="icon"></i>
                                <span>摄像头005</span>
                                <i class="dot"></i>
                            </a>
                            <div class="video"></div>
                        </li>
                        <li>
                            <a class="text">
                                <i class="icon"></i>
                                <span>摄像头006</span>
                                <i class="dot"></i>
                            </a>
                            <div class="video"></div>
                        </li>
                        <li>
                            <a class="text">
                                <i class="icon"></i>
                                <span>摄像头007</span>
                                <i class="dot"></i>
                            </a>
                            <div class="video"></div>
                        </li>
                        <li>
                            <a class="text">
                                <i class="icon"></i>
                                <span>摄像头008</span>
                                <i class="dot"></i>
                            </a>
                            <div class="video"></div>
                        </li>
                        <li>
                            <a class="text">
                                <i class="icon"></i>
                                <span>摄像头009</span>
                                <i class="dot"></i>
                            </a>
                            <div class="video"></div>
                        </li>
                    </ul> -->
                </div>
                <div class="right-box" v-for="(item,index) in videoData"  :key="index">
                    <div class="equipment">
                        <div class="title">设备信息</div>
                        <ul>
                            <li>名称：{{item.videoName}}</li>
                            <li>型号：{{item.videoType}}</li>
                            <li>位置：{{item.videoAddress}}</li>
                            <li>监控方式：{{item.videoWay}}</li>
                        </ul>
                        <ul class="bottom">
                            <li>应急联系人：{{item.contacts}}</li>
                            <li>联系方式：{{item.contactsWay}}</li>
                            <li>所属部门：{{item.department}}</li>
                            <li>职务：{{item.position}}</li>
                        </ul>
                    </div>
                    <div class="early-warning">
                        <div class="title">预警信息</div>
                        <ul>
                            <li>报警级别：高级</li>
                            <li>报警时间：05-23 12:52</li>
                            <li>触发源：红外感应</li>
                            <li>报警区域：建兴科技园东侧</li>
                        </ul>
                    </div>
                    <div class="photograph">
                        <div class="title">所在位置照片</div>
                        <div class="img-box"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    #systemMonitoring {
        width: 100%;
        display: flex;
        background-color: #f7f7f7;
        .shadow-box {
            width: 100%;
            height: 0.15rem;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 20;
            box-shadow: 0 0.07rem 0.14rem -0.1rem #666 inset;
        }
        .side-nav {
            width: 3rem;
            height: 10rem;
            overflow: hidden;
            // display: inline-block;
            background-color: #54a4d7;
            ul {
                width: 3rem;
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
                        padding-left: .2rem;
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
                            font-size: .18rem;
                            vertical-align: top;
                            text-align: justify;
                            text-align-last:justify;
                            display: inline-block;
                        }
                        .home {
                            background-image: url('../../../../static/images/system-home.png');
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
                        background-image: url('../../../../static/images/system-return.png');
                    }
                    a:hover {
                        background-color: #2d83bb;
                    }
                }
            }
        }
        .padding-box {
            flex: 1;
            padding-top: 0.3rem;
            padding-left: 0.2rem;
            padding-right: 0.2rem;
            .content-box {
                height: 9.5rem;
                border-radius: .04rem;
                background-color: #fff;
                box-shadow: 0 0 .5rem -.3rem #666;
                .left-box {
                    height: 100%;
                    width: 12.6rem;
                    display: inline-block;
                    border-right: .1rem solid #f7f7f7;
                    ul {
                        display: flex;
                        flex-wrap: wrap;
                        padding-top: .52rem;
                        li {
                            width: 3.7rem;
                            height: 2.5rem;
                            padding: 0 .1rem;
                            margin-left: .35rem;
                            margin-bottom: .3rem;
                            // background-color: #fbfeff;
                            // border: .01rem solid #cce9ff;
                            background-image: url('../../../../static/images/systemMonitoring-border.png');
                            background-size: contain;
                            &.active {
                                // border: .01rem solid #3ada76;
                                background-image: url('../../../../static/images/systemMonitoring-activeBorder.png');
                            }
                            .text {
                                height: .4rem;
                                display: block;
                                line-height: .4rem;
                                .icon {
                                    width: .24rem;
                                    height: .24rem;
                                    border-radius: .24rem;
                                    display: inline-block;
                                    vertical-align: middle;
                                    // background-color: #66c1ff;
                                    background-image: url('../../../../static/images/systemMonitoring-icon.png');
                                    background-size: contain;
                                }
                                span {
                                    padding: 0 .08rem;
                                    font-size: .14rem;
                                    display: inline-block;
                                }
                                .dot {
                                    width: .06rem;
                                    height: .06rem;
                                    border-radius: .06rem;
                                    display: inline-block;
                                    vertical-align: middle;
                                    background-color: #3ada76;
                                }
                            }
                            .video {
                                width: 3.48rem;
                                height: 1.96rem;
                                // border: .01rem solid #000;
                                video {
                                    width: 100%;
                                    height: 100%;
                                    // margin: 0 auto;
                                }
                            }
                        }
                    }
                }
                .right-box {
                    padding-top: .2rem;
                    vertical-align: top;
                    padding-left: .35rem;
                    display: inline-block;
                    >div {
                        .title {
                            color: #58aaff;
                            font-size: .13rem;
                        }
                        >ul {
                            margin-top: .2rem;
                            li {
                                color: #5c5c5c;
                                font-size: .14rem;
                            }
                            &.bottom {
                                margin-top: .6rem;
                            }
                        }
                    }
                    .early-warning {
                        margin-top: .6rem;
                    }
                    .photograph {
                        margin-top: 1.3rem;
                        .img-box {
                            width: 2.48rem;
                            height: 1.66rem;
                            margin-top: .22rem;
                            border: .01rem solid #000;
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
            projectId: 0, // 项目id
            areaId: 0, // 视频区id
            activeId: 1, // 当前选中设备的id
            videoAreaData: [], // 视频区数据
            videoData: [], // 视频数据
            player1: '',
        }
    },
    created() {
        this.getProjectId()
        this.getProjectVideoArea()
    },
    updated() {
        if(this.videoData!=""){
            //如果在mounted中声明，直播地址还未取到，导致视频不显示。所以放在了这里
            this.player1 = new EZUIPlayer('player1');
            // this.player2 = new EZUIPlayer('player2')
            // this.player3 = new EZUIPlayer('player3')
            // this.player4 = new EZUIPlayer('player4')
        }
    },
    methods: {
        // 获取项目id
        getProjectId() {
            this.projectId = sessionStorage.getItem('pid')
        },

        // 获取视频区列表
        getProjectVideoArea() {
            this.$axios.post(`/api/ProjectVideoAreaApi/getProjectVideoArea?projectId=${this.projectId}`).then(
                res => {
                    // console.log(res.data)
                    if (res.data.data) {
                        // console.log('有视频区域')
                        this.videoAreaData = res.data.data
                    } else {
                        // console.log('无视频区域')
                        this.videoAreaData = [{
                            id: 0,
                            projectid: 0,
                            areaName: "无监控数据"
                        }]
                    }
                    this.areaId = res.data.data[0].id
                    this.getProjectVideo()
                }
            )
        },
        
        // 获取监控直播流
        getProjectVideo() {
            this.$axios.post(`/api/ProjectVideo/getProjectVideo?areaId=${this.areaId}`).then(
                res => {
                    // console.log(res.data)
                    this.videoData = res.data.data
                }
            )
        },

        // 当前选中视频区
        selectVideoArea(areaId) {
            // console.log(areaId)
            this.areaId = areaId
            this.getProjectVideo()
        },
    }
}
</script>