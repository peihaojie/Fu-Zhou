<template>
    <div id="car">
        <div class="content">
            <div class="content-box" v-for="(item,index) in carData" :key="index">
                <div class="title bolder">
                    {{item.name}}
                </div>
                <!-- :class="item.State==0?'normal':'anomaly'" -->
                <div class="status bolder normal" >
                    <!-- {{item.State==0?'正常运行':'异常运行'}} -->
                    正常运行
                </div>
                <div class="top-data">
                    <!-- :class="val.State==0?'border-blue normal':'border-red anomaly'" -->
                    <div class="amount border-blue normal" style="font-size:.24rem" >
                        {{item.todaycount.count}}
                        <p style="font-size:.18rem">今日进出</p>
                    </div>
                    <div class="truck-space" :class="item.pkcount>=1?'border-blue normal':'border-red anomaly'" style="font-size:.24rem">
                        {{item.pkcount}}
                        <p style="font-size:.18rem">剩余车位</p>
                    </div>
                </div>
                <div class="bottom-data">
                    <p class="bolder">实时进出</p>
                    <div class="licence" :id="item.name">
                        <ul :id="item.name+1">
                            <li v-for="item2 in item.todaycount.vehicleList" :key="item2.id">
                                <span>{{item2.vehicleNo}}</span>
                                <span>{{item2.gateinname}}</span>
                                <span>{{item2.liftTime}}</span>
                                <!-- <span>{{item2.CarType}}</span> -->
                            </li>
                        </ul>
                        <ul :id="item.name+2"></ul>
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
            carData:'', // 车辆出入数据
            projectId: '', // 项目id
        }
    },
    created() {
        this.getProjectId()
        this.getCarData()
    },
    methods: {
        // 请求车辆出入数据
        getCarData() {
            this.xmid = this.getQueryString('xmid')
            this.$axios.get(`http://gd.17hr.net:8018/APP/XMPage/DeviceData.ashx?method=GetPkData&xmid=DV2mxBGL1Ao%3D`).then(res=>{
                // console.log(res.data)
                this.carData = res.data;
                if (res.data.InOutOne.Data.length >=15) {
                    this.scrollStart('InOutOne','InOutOne1','InOutOne2')
                }
                if (res.data.InOutTwo.Data.length >=15) {
                    this.scrollStart('InOutTwo','InOutTwo1','InOutTwo2')
                }
                if (res.data.InOutThree.Data.length >=15) {
                    this.scrollStart('InOutThree','InOutThree1','InOutThree2')
                }
            })
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
              //当滚动至colee1与colee2交界时
              if (colee2.offsetTop - colee.scrollTop <= 0) {
                colee.scrollTop -= colee1.offsetHeight; //colee跳到最顶端
              } else {
                colee.scrollTop++;
                if (colee.scrollTop == colee1.offsetHeight) {
                  colee.scrollTop = 0;
                }
              }
            }
            var MyMar1 = setInterval(Marquee1, speed); //设置定时器
            // //鼠标移上时清除定时器达到滚动停止的目的
            // colee.onmouseover = function() {
            //   clearInterval(MyMar1);
            // };
            // //鼠标移开时重设定时器
            // colee.onmouseout = function() {
            //   MyMar1 = setInterval(Marquee1, speed);
            // };
          }, 1000);
        },

        // 获取url中的项目id
        getQueryString(name) {
          var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
          var r = window.location.search.substr(1).match(reg);
          if (r != null) {
            return unescape(r[2]);
          }
          return null;
        },

        // 获取项目id
        getProjectId() {
            this.projectId = sessionStorage.getItem('pid')
        },

        // 获取车辆出入数据
        getCarData() {
            this.$axios.post(`/api/parkings/todaycount?projectId=${this.projectId}`).then(
                res => {
                    // console.log(res.data)
                    this.carData = res.data.data
                }
            )
        },
    },
}
</script>

<style scoped>
    .bolder {
        font-weight: bolder;
    }
    .anomaly {
        color: #fb497c;
    }
    .normal {
        color: #24e974;
    }
    .warning {
        color: #ff731c;
    }
    span,
    p,
    div{
        color: #fff;
    }
    #car {
        display: flex;
        padding: 0.51rem 0.3rem 0.4rem 0.4rem;
    }
    .content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        /* width: 16.63rem;
        height: 9.41rem; */
    }
    .content-box {
        height: 9.41rem;
        width: 5.3rem;
        background-image: url('../../../static/images/s_big-box.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
    }
    .title {
        font-size: .24rem;
        line-height: .98rem;
        text-align: center;
    }
    .status {
        height: .67rem;
        background-image: url('../../../static/images/s_status-background.png');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        text-align: center;
        font-size: .24rem;
        line-height: .67rem;
    }
    .amount,
    .truck-space {
        height: 1.17rem;
        width: 1.17rem;
        /* border: .12rem solid;
        border-radius: 50%; */
        line-height: 1.17rem;
        text-align: center;
        font-size: .18rem;
        margin-top: .35rem;
    }
    .amount {
        margin-right: .87rem;
    }
    .top-data {
        display: flex;
        justify-content: center;
        height: 1.93rem;
    }
    .top-data p {
        margin-top: -0.4rem;
    }
    .border-blue {
        /* border-color: #3375fe;
        color: #fff; */
        background-image: url('../../../static/images/s_c-green.png');
        background-size: cover;
    }
    .border-red {
        /* border-color: #fb497c;
        color: #fb497c; */
        background-image: url('../../../static/images/s_c-red.png');
        background-size: cover;
    }
    .bottom-data>p {
        text-align: center;
        font-size: .18rem;
        margin-top: .16rem;
    }
    .bottom-data .licence {
        margin-top: .2rem;
        height: 5.04rem;
        overflow: hidden;
    }
    .licence li {
        font-size: .16rem;
        height: .36rem;
        text-align: center;
    }
    .licence li span {
        margin-left: .2rem;
        color: #7f9ea8;
    }
    .licence li span:first-child {
        margin: 0;
    }
</style>
