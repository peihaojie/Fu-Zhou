<template>
    <div id="systemGreen_TSP">
        <div class="content-box">
            <!-- 左边区域 -->
            <div class="left-box">
                <!-- 按钮模块 -->
                <div class="button-box">
                    <a class="history" @click="historyClick">
                        <i class="icon"></i>
                        历史记录
                    </a>
                    <a class="cut" @click="equipmentClick">
                        <i class="icon"></i>
                        切换设备
                    </a>
                    <a class="derive" @click="dialogShow=true">
                        <i class="icon"></i>
                        导出Excel
                    </a>
                </div>
                <!-- 设备列表/天气与近30天污染度 -->
                <div class="left-bottom" v-show="equipmentShow">
                    <!-- 天气模块 -->
                    <div class="weather-box">
                        <div class="title" v-for="(val,key) in equipmentData" v-if="key=='weather'">
                            <div class="city">{{val.city}}</div>
                            <div class="date">{{val.update_time.split(' ')[0]}}</div>
                        </div>
                        <div class="weather-forecast">
                            <div class="first" v-for="(item,index) in equipmentData.weather.data" key="1" v-if="index==0">
                                <div class="icon" :class="item.wea_img"></div>
                                <div class="real-temperature">
                                    <div class="temperature-text">{{item.tem}}</div>
                                    <div class="degree">℃</div>
                                </div>
                                <div class="air-temperature">
                                    {{item.tem2}}~{{item.tem1}}℃
                                </div>
                                <div class="weather-type">
                                    {{item.wea}}
                                </div>
                                <div class="wind-direction">
                                    {{item.win[0]}}
                                </div>
                            </div>
                            <div class="no-first" v-for="(item,index) in equipmentData.weather.data" key="2" v-if="index==1">
                                <div class="week">
                                    {{item.week}}
                                </div>
                                <div class="date">
                                    {{item.date}}
                                </div>
                                <div class="icon" :class="item.wea_img"></div>
                                <div class="air-temperature">
                                    {{item.tem2}}~{{item.tem1}}℃
                                </div>
                                <div class="weather-type">
                                    {{item.wea}}
                                </div>
                                <div class="wind-direction">
                                    {{item.win[0]}}
                                </div>
                            </div>
                            <div class="no-first" v-for="(item,index) in equipmentData.weather.data" key="3" v-if="index==2">
                                <div class="week">
                                    {{item.week}}
                                </div>
                                <div class="date">
                                    {{item.date}}
                                </div>
                                <div class="icon" :class="item.wea_img"></div>
                                <div class="air-temperature">
                                    {{item.tem2}}~{{item.tem1}}℃
                                </div>
                                <div class="weather-type">
                                    {{item.wea}}
                                </div>
                                <div class="wind-direction">
                                    {{item.win[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="temperature-chart">
                            <div id="temperature"></div>
                            <div class="right-top">
                                <i class="dot"></i>
                                <span>气温&#12288;单位：℃</span>
                            </div>
                            <div class="middle-text">
                                24小时温度
                            </div>
                        </div>
                    </div>
                    <!-- 近30天污染度模块 -->
                    <div class="AQI-box">
                        <div class="top-text">最近30天</div>
                        <div class="bottom-text">AQI</div>
                        <ul v-for="(val,key) in equipmentData" v-if="key == 'get30'">
                            <li class="abnormal">
                                <div class="class">异常</div>
                                <div class="progress-bar">
                                    {{val.pm25_yc}}天
                                </div>
                            </li>
                            <li class="excellent">
                                <div class="class">优</div>
                                <div class="progress-bar">
                                    {{val.pm25_yx}}天
                                </div>
                            </li>
                            <li class="good">
                                <div class="class">良</div>
                                <div class="progress-bar">
                                    {{val.pm25_lh}}天
                                </div>
                            </li>
                            <li class="mild">
                                <div class="class">轻度</div>
                                <div class="progress-bar">
                                    {{val.pm25_qd}}天
                                </div>
                            </li>
                            <li class="moderate">
                                <div class="class">中度</div>
                                <div class="progress-bar">
                                    {{val.pm25_zd}}天
                                </div>
                            </li>
                            <li class="severe">
                                <div class="class">重度</div>
                                <div class="progress-bar">
                                    {{val.pm25_zd1}}天
                                </div>
                            </li>
                            <li class="seriousness">
                                <div class="class">严重</div>
                                <div class="progress-bar">
                                    {{val.pm25_yz}}天
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 设备列表 -->
                <div class="left-bottom" v-show="!equipmentShow">
                    <div class="equipment-list">
                        <ul>
                            <li v-for="(item,index) in equipmentLisData" :key="index">
                                <a @click="equipmentSelect(item.sn)">{{ item.title }}</a>
                                <i class="line"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 主体区域 -->
            <div class="main-box">
                <!-- 主体上半部分 -->
                <div class="main-top" v-show="!historyShow" v-for="(val,key) in equipmentData" v-if="key=='data'">
                    <div class="main-middle">
                        <div class="data-box">
                            <div class="background-box">
                                <div class="PM25">
                                    <div class="title">
                                        PM2.5
                                    </div>
                                    <div class="value">
                                        {{val.new.pm25}}
                                    </div>
                                    <div class="class">
                                        优
                                    </div>
                                    <div class="city" v-for="(val,key) in equipmentData" v-if="key=='weather'">
                                        <!-- {{ val.city }} -->
                                        <!-- <span>{{ equipmentData.air_pm25 }}</span> -->
                                        <!-- | 高于本地20 -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="other">
                            <div class="PM10">
                                <i class="icon PM10Icon"></i>
                                <div class="circle-box">
                                    <div class="top-text">PM10</div>
                                    <div class="bottom-text">{{val.new.pm10}}</div>
                                </div>
                            </div>
                            <div class="PM100">
                                <i class="icon PM100Icon"></i>
                                <div class="circle-box">
                                    <div class="top-text">PM100</div>
                                    <div class="bottom-text">{{val.new.tsp}}</div>
                                </div>
                            </div>
                            <div class="noise">
                                <i class="icon noiseIcon"></i>
                                <div class="circle-box">
                                    <div class="top-text">噪音</div>
                                    <div class="bottom-text">{{val.new.noise}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="standard">
                            
                        </div>
                        <div class="green-measure">
                            绿色措施
                        </div>
                        <div class="icon-box"></div>
                    </div>
                    <div class="main-right">
                        <div class="title-bar">
                            <div class="sum">
                                <i class="icon"></i>
                                <span>设备总数：{{val.count.sum}}</span>
                            </div>
                            <div class="malfunction">
                                <i class="icon"></i>
                                <span>故障数量：{{val.count.sum_yc}}</span>
                            </div>
                        </div>
                        <div class="temperatuer">
                            <div class="text-box">
                                <i class="icon"></i>
                                <div>
                                    <span>气温</span>
                                    <span>{{val.new.temperature}}℃</span>
                                </div>
                            </div>
                            <div class="progress-box">
                                <div class="progress-bar"></div>
                            </div>
                        </div>
                        <div class="wind-speed">
                            <div class="text-box">
                                <i class="icon"></i>
                                <div>
                                    <span>风速</span>
                                    <span>{{val.new.windSpeed}}km/h</span>
                                </div>
                            </div>
                            <div class="progress-box">
                                <div class="progress-bar"></div>
                            </div>
                        </div>
                        <div class="humidity">
                            <div class="text-box">
                                <i class="icon"></i>
                                <div>
                                    <span>湿度</span>
                                    <span>{{val.new.humidity}}%</span>
                                </div>
                            </div>
                            <div class="progress-box">
                                <div class="progress-bar" style="width:80%"></div>
                            </div>
                        </div>
                        <div class="wind-direction">
                            <div class="left-box">
                                <div>
                                    西南风
                                </div>
                                <div class="img-box"></div>
                                <div>风向</div>
                            </div>
                            <div class="right-box">
                                <div class="img-box"></div>
                                <div>点击播放监控</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 主体下半部分 -->
                <div class="main-bottom" v-show="!historyShow">
                    <!-- 污染物浓度折线图 -->
                    <div class="contaminate-chart">
                        <div class="title">近8小时污染物浓度</div>
                        <div class="average" v-for="(val,key) in equipmentData.data" v-if="key=='today'">
                            PM2.5今日平均浓度：{{val.PM25}}
                            &#12288;&#12288;&#12288;
                            PM10今日平均浓度：{{val.PM10}}
                        </div>
                        <div class="lege">
                            <div class="PM25">
                                <div class="dot"></div>
                                PM2.5
                            </div>
                            <div class="PM10">
                                <div class="dot"></div>
                                PM10
                            </div>
                            <div>
                                单位：ug/m³
                            </div>
                        </div>
                        <div id="contaminate"></div>
                    </div>
                    <!-- 噪音饼状图 -->
                    <div class="noise-chart">
                            <div class="noise-text">
                                <div class="left">噪音</div>
                                <div class="right">
                                    <div class="qualified">
                                        <div class="dot"></div>
                                        合格
                                    </div>
                                    <div class="disqualification">
                                        <div class="dot"></div>
                                        不合格
                                    </div>
                                    <div class="abnormal">
                                        <div class="dot"></div>
                                        异常
                                    </div>
                                </div>
                            </div>
                            <div id="noise"></div>
                    </div>
                </div>

                <!-- 历史记录 -->
                <div class="history-box" v-show="historyShow">
                    <!-- 搜索栏 -->
                    <div class="search-box">
                        <ul>
                            <li class="date">
                                <span>日期：</span>
                                <el-date-picker
                                    v-model="dateValue"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd"
                                    @change="getTime">
                                </el-date-picker>
                            </li>
                            <li>
                                <span>类型：</span>
                                <el-select v-model="historyValue" placeholder="请选择">
                                    <el-option
                                        v-for="item in historyType"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </li>
                        </ul>
                        <a class="search-button" @click="searchClick">搜索</a>
                    </div>
                    <!-- 列表 -->
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
                            prop="pm25"
                            label="pm2.5"
                            width="70">
                            </el-table-column>
                            <el-table-column
                            prop="pm10"
                            label="pm10"
                            width="70">
                            </el-table-column>
                            <el-table-column
                            prop="tsp"
                            label="pm100"
                            width="70">
                            </el-table-column>
                            <el-table-column
                            prop="noise"
                            label="噪音"
                            width="70">
                            </el-table-column>
                            <el-table-column
                            prop="humidity"
                            label="湿度"
                            width="70">
                            </el-table-column>
                            <el-table-column
                            prop="temperature"
                            label="气温"
                            width="70">
                            </el-table-column>
                            <el-table-column
                            prop="windSpeed"
                            label="风速"
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="ifoverproof"
                            label="状态"
                            width="100">
                            <template slot-scope="scope">
                                <div :class="scope.row.ifoverproof=='YES'?'green-color':scope.row.ifoverproof=='NO'?'red-color':''">
                                    {{ scope.row.ifoverproof=='YES'?'合格':scope.row.ifoverproof=='NO'?'不合格':'' }}
                                </div>
                            </template>
                            </el-table-column>
                            <el-table-column
                            prop="date"
                            label="时间">
                            </el-table-column>
                        </el-table>
                    </div>
                    <!-- 分页 -->
                    <div class="paging-box">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="pageNum"
                            :page-size="pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="pageTotal">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <!-- 导出Excel -->
            <div class="dialog-box" v-show="dialogShow">
                <div class="title">
                    选择日期
                    <a class="close" @click="dialogShow=false">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <ul>
                        <li>
                            <span>日期：</span>
                            <el-date-picker
                                v-model="excelDate"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd"
                                @change="getTime2">
                            </el-date-picker>
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button" @click="getExcel()">确定</a>
                </div>
            </div>
            <!-- 遮罩层 -->
            <div class="shade-box" v-show="dialogShow"></div>
        </div>
    </div>
</template>

<style lang="less">
    #systemGreen_TSP {
        width: 100%;
        .content-box {
            display: flex;
            border-radius: .04rem;
            background-color: #fff;
            box-shadow: 0 0 .5rem -.3rem #666;
            .left-box {
                width: 4rem;
                .button-box {
                    height: .8rem;
                    padding-top: .2rem;
                    border-bottom: .1rem solid #f7f7f7;
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
                    .cut {
                        .icon {
                            background-image: url('../../../../static/images/systemGreen-cut.png');
                        }
                        &:hover {
                            .icon {
                                background-image: url('../../../../static/images/systemGreen-cutHover.png');
                            }
                        }
                    }
                }
                .left-bottom {
                    height: 8.7rem;
                    .weather-box {
                        height: 4.89rem;
                        .title {
                            // padding-top: .34rem;
                            // padding-left: .68rem;
                            padding: .34rem 0 .34rem .68rem;
                            .city {
                                color: #4a4a4a;
                                font-size: .24rem;
                                font-weight: bolder;
                                display: inline-block;
                            }
                            .date {
                                color: #4a4a4a;
                                margin-left: .22rem;
                                vertical-align: top;
                                display: inline-block;
                            }
                        }
                        .weather-forecast {
                            padding-left: .2rem;
                            .first {
                                width: 1.44rem;
                                display: inline-block;
                                .icon {
                                    width: .52rem;
                                    height: .52rem;
                                    margin: 0 auto;
                                    // background-color: aquamarine;
                                    background-size: contain;
                                }
                                .real-temperature {
                                    height: .43rem;
                                    text-align: center;
                                    padding-top: .15rem;
                                    .temperature-text {
                                        color: #4a4a4a;
                                        font-size: .32rem;
                                        font-weight: bolder;
                                        display: inline-block;
                                    }
                                    .degree {
                                        height: .1rem;
                                        color: #4a4a4a;
                                        font-size: .12rem;
                                        line-height: .1rem;
                                        vertical-align: top;
                                        display: inline-block;
                                    }
                                }
                                .air-temperature {
                                    height: .27rem;
                                    color: #4a4a4a;
                                    font-size: .12rem;
                                    text-align: center;
                                    padding-top: .15rem;
                                    line-height: .12rem;
                                }
                                .weather-type {
                                    height: .29rem;
                                    color: #4a4a4a;
                                    font-size: .12rem;
                                    text-align: center;
                                    line-height: .14rem;
                                    padding-top: .15rem;
                                }
                                .wind-direction {
                                    height: .29rem;
                                    color: #3ada76;
                                    font-size: .12rem;
                                    text-align: center;
                                    line-height: .14rem;
                                    padding-top: .15rem;
                                }
                            }
                            .no-first {
                                width: 1.06rem;
                                vertical-align: top;
                                display: inline-block;
                                border-left: .01rem solid #000;
                                .week {
                                    height: .14rem;
                                    color: #4a4a4a;
                                    font-size: .12rem;
                                    text-align: center;
                                    line-height: .14rem;
                                }
                                .date {
                                    height: .26rem;
                                    color: #bebebe;
                                    font-size: .12rem;
                                    text-align: center;
                                    line-height: .14rem;
                                    padding-top: .12rem;
                                }
                                .icon {
                                    width: .52rem;
                                    height: .52rem;
                                    margin: 0 auto;
                                    margin-top: .12rem;
                                    // background-color: aquamarine;
                                    background-size: contain;
                                }
                                .air-temperature {
                                    height: .24rem;
                                    color: #4a4a4a;
                                    font-size: .12rem;
                                    text-align: center;
                                    padding-top: .12rem;
                                    line-height: .12rem;
                                }
                                .weather-type {
                                    height: .26rem;
                                    color: #4a4a4a;
                                    font-size: .12rem;
                                    text-align: center;
                                    padding-top: .12rem;
                                    line-height: .14rem;
                                }
                                .wind-direction {
                                    height: .26rem;
                                    color: #3ada76;
                                    font-size: .12rem;
                                    text-align: center;
                                    line-height: .14rem;
                                    padding-top: .12rem;
                                }
                            }
                            .qing {
                                background-image: url('../../../../static/images/systemGreen-qing.png');
                            }
                            .xue {
                                background-image: url('../../../../static/images/systemGreen-xue.png');
                            }
                            .lei {
                                background-image: url('../../../../static/images/systemGreen-lei.png');
                            }
                            .yun {
                                background-image: url('../../../../static/images/systemGreen-yun.png');
                            }
                            .yu {
                                background-image: url('../../../../static/images/systemGreen-yu.png');
                            }
                            .yin {
                                background-image: url('../../../../static/images/systemGreen-yin.png');
                            }
                            .shachen {
                                background-image: url('../../../../static/images/systemGreen-shachen.png');
                            }
                            .wu {
                                background-image: url('../../../../static/images/systemGreen-wu.png');
                            }
                            .bingbao {
                                background-image: url('../../../../static/images/systemGreen-bingbao.png');
                            }
                        }
                        .temperature-chart {
                            height: 2.08rem;
                            position: relative;
                            #temperature {
                                width: 4rem;
                                height: 2.08rem;
                            }
                            .right-top {
                                top: .1rem;
                                right: .2rem;
                                font-size: .12rem;
                                position: absolute;
                                .dot {
                                    width: .1rem;
                                    height: .1rem;
                                    margin-right: .05rem;
                                    display: inline-block;
                                    border-radius: .06rem;
                                    vertical-align: middle;
                                    background-color: #3ada76;
                                }
                            }
                            .middle-text {
                                left: 50%;
                                bottom: .06rem;
                                font-size: .14rem;
                                position: absolute;
                                transform: translateX(-50%);
                            }
                        }
                    }
                    .AQI-box {
                        height: 3.81rem;
                        padding-left: .5rem;
                        padding-top: .24rem;
                        border-top: .1rem solid #f7f7f7;
                        .top-text {
                            height: .26rem;
                            color: #4a4a4a;
                            font-size: .24rem;
                            font-weight: bolder;
                            line-height: .26rem;
                        }
                        .bottom-text {
                            height: .4rem;
                            color: #4a4a4a;
                            font-size: .18rem;
                            line-height: .2rem;
                            padding-top: .2rem;
                            font-weight: bolder;
                        }
                        ul {
                            padding-top: .2rem;
                            li {
                                height: .38rem;
                                padding-bottom: .14rem;
                                .class {
                                    width: .44rem;
                                    height: .24rem;
                                    color: #4a4a4a;
                                    font-size: .16rem;
                                    text-align: right;
                                    line-height: .24rem;
                                    display: inline-block;
                                    padding-right: .12rem;
                                }
                                .progress-bar {
                                    width: .6rem;
                                    color: #fff;
                                    height: .24rem;
                                    font-size: .16rem;
                                    line-height: .24rem;
                                    padding-left: .13rem;
                                    display: inline-block;
                                    border-radius: .24rem;
                                }
                            }
                            .abnormal {
                                .progress-bar {
                                    background-color: #ff8400;
                                }
                            }
                            .excellent {
                                .progress-bar {
                                    background-color: #3ada76;
                                }
                            }
                            .good {
                                .progress-bar {
                                    background-color: #f6c500;
                                }
                            }
                            .mild {
                                .progress-bar {
                                    background-color: #fd794b;
                                }
                            }
                            .moderate {
                                .progress-bar {
                                    background-color: #f23a3a;
                                }
                            }
                            .severe {
                                .progress-bar {
                                    background-color: #9e3af2;
                                }
                            }
                            .seriousness {
                                .progress-bar {
                                    background-color: #6d1e06;
                                }
                            }
                        }
                    }
                    .equipment-list {
                        height: 8.7rem;
                        overflow: auto;
                        ul {
                            li {
                                position: relative;
                                a {
                                    color: #333;
                                    display: inline-block;
                                    width: 100%;
                                    height: .44rem;
                                    font-size: .24rem;
                                    text-align: center;
                                    line-height: .43rem;
                                    transition: all .5s;
                                    border-bottom: 0.01rem solid #98c8e7;
                                    &:hover {
                                        color: #fff;
                                        background-color: #0090ff;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .main-box {
                flex: 1;
                .main-top {
                    width: 100%;
                    height: 5.69rem;
                    .main-middle {
                        width: 68.5%;
                        height: 5.69rem;
                        position: relative;
                        vertical-align: top;
                        display: inline-block;
                        border-left: .1rem solid #f7f7f7;
                        border-right: .1rem solid #f7f7f7;
                        .data-box {
                            margin: 0 auto;
                            width: 3.22rem;
                            height: 3.86rem;
                            padding-top: .64rem;
                            .background-box {
                                width: 3.22rem;
                                height: 3.22rem;
                                padding-top: .36rem;
                                // border-radius: 3.22rem;
                                // border: .01rem solid #3edb79;
                                background-image: url('../../../../static/images/systemGreen-circle.png');
                                background-size: contain;
                                .PM25 {
                                    width: 2.48rem;
                                    margin: 0 auto;
                                    height: 2.48rem;
                                    position: relative;
                                    padding-top: .53rem;
                                    // border-radius: 2.48rem;
                                    // background-color: #3ada76;
                                    .title {
                                        color: #fff;
                                        height: .22rem;
                                        font-size: .22rem;
                                        text-align: center;
                                        line-height: .22rem;
                                        font-weight: bolder;
                                    }
                                    .value {
                                        color: #fff;
                                        height: .68rem;
                                        font-size: .44rem;
                                        text-align: center;
                                        line-height: .44rem;
                                        font-weight: bolder;
                                        padding-top: .24rem;
                                    }
                                    .class {
                                        color: #fff;
                                        height: .58rem;
                                        font-size: .32rem;
                                        text-align: center;
                                        line-height: .34rem;
                                        font-weight: bolder;
                                        padding-top: .24rem
                                    }
                                    .city {
                                        bottom: -.8rem;
                                        width: 2.48rem;
                                        font-size: .17rem;
                                        position: absolute;
                                        text-align: center;
                                        span {
                                            font-size: .25rem;
                                            font-weight: bolder;
                                        }
                                    }
                                }
                            }
                        }
                        .other {
                            top: 0;
                            right: 0;
                            width: 1.9rem;
                            position: absolute;
                            padding-top: .46rem;
                            >div {
                                height: .92rem;
                                margin-bottom: .65rem;
                                .icon {
                                    width: .3rem;
                                    height: .3rem;
                                    display: inline-block;
                                    // background-color: aquamarine;
                                    background-size: contain;
                                }
                                .circle-box {
                                    width: .92rem;
                                    height: .92rem;
                                    margin-left: .2rem;
                                    display: inline-block;
                                    border-radius: .92rem;
                                    border: .15rem solid #e2eeff;
                                    .top-text {
                                        height: .26rem;
                                        font-size: .12rem;
                                        text-align: center;
                                        line-height: .11rem;
                                        padding-top: .15rem
                                    }
                                    .bottom-text {
                                        height: .26rem;
                                        font-size: .21rem;
                                        text-align: center;
                                        line-height: .21rem;
                                        padding-top: .05rem;
                                        font-weight: bolder;
                                    }
                                }
                                .PM10Icon {
                                    background-image: url('../../../../static/images/systemGreen-PM10.png');
                                }
                                .PM100Icon {
                                    background-image: url('../../../../static/images/systemGreen-PM100.png');
                                }
                                .noiseIcon {
                                    background-image: url('../../../../static/images/systemGreen-noise.png');
                                }
                            }
                        }
                        .standard {
                            width: 6.7rem;
                            height: .34rem;
                            margin: 0 auto;
                            margin-top: 1.2rem;
                            // border-radius: .34rem;
                            // background-color: #3ada76;
                            background-image: url('../../../../static/images/systemGreen-concentration.png');
                            background-size: contain;
                        }
                        .green-measure {
                            top: .46rem;
                            left: .52rem;
                            width: .9rem;
                            height: .3rem;
                            color: #3ada76;
                            position: absolute;
                            text-align: center;
                            line-height: .28rem;
                            border-radius: .02rem;
                            border: .01rem solid #3ada76;
                        }
                        >.icon-box {
                            top: 3.56rem;
                            left: .52rem;
                            width: .64rem;
                            height: .64rem;
                            position: absolute;
                            // background-color: #3ada76;
                            background-image: url('../../../../static/images/systemGreen-decorate.png');
                            background-size: contain;
                        }
                    }
                    .main-right {
                        width: 31.5%;
                        height: 5.69rem;
                        display: inline-block;
                        .title-bar {
                            height: .8rem;
                            padding-left: .4rem;
                            border-bottom: .1rem solid #f7f7f7;
                            .sum {
                                line-height: .7rem;
                                display: inline-block;
                                .icon {
                                    width: .28rem;
                                    height: .28rem;
                                    margin-right: .09rem;
                                    display: inline-block;
                                    vertical-align: middle;
                                    background-image: url('../../../../static/images/systemGreen-quantity.png');
                                    background-size: contain;
                                }
                                span {
                                    color: #0090ff;
                                    font-size: .16rem;
                                }
                            }
                            .malfunction {
                                line-height: .7rem;
                                padding-left: .3rem;
                                display: inline-block;
                                .icon {
                                    width: .28rem;
                                    height: .28rem;
                                    margin-right: .09rem;
                                    display: inline-block;
                                    vertical-align: middle;
                                    background-image: url('../../../../static/images/systemGreen-malfunction.png');
                                    background-size: contain;
                                }
                                span {
                                    color: #ff7a81;
                                    font-size: .16rem;
                                }
                            }
                        }
                        .temperatuer,
                        .humidity,
                        .wind-speed {
                            padding-left: .4rem;
                            padding-bottom: .47rem;
                            .text-box {
                                width: 3.6rem;
                                height: .37rem;
                                padding-bottom: .12rem;
                                .icon {
                                    width: .25rem;
                                    height: .25rem;
                                    display: inline-block;
                                    border-radius: .25rem;
                                    vertical-align: middle;
                                    // background-color: #84b4fd;
                                    background-size: contain;
                                }
                                >div {
                                    width: 2.95rem;
                                    padding-left: .08rem;
                                    display: inline-flex;
                                    justify-content: space-between;
                                    span {
                                        font-size: .13rem;
                                    }
                                }
                            }
                            .progress-box {
                                width: 3.2rem;
                                height: .1rem;
                                border-radius: .1rem;
                                background-color: #e2eeff;
                            }
                        }
                        .temperatuer {
                            padding-top: .27rem;
                            .progress-box {
                                .progress-bar {
                                    width: 50%;
                                    height: .1rem;
                                    border-radius: .1rem;
                                    background: linear-gradient(to right,#ff868c,#ff787f);
                                }
                            }
                            .icon {
                                background-image: url('../../../../static/images/systemGreen-temperature.png');
                            }
                        }
                        .wind-speed {
                            .progress-box {
                                .progress-bar {
                                    width: 66%;
                                    height: .1rem;
                                    border-radius: .1rem;
                                    background: linear-gradient(to right,#ffb984,#ffb079);
                                }
                            }
                            .icon {
                                background-image: url('../../../../static/images/systemGreen-windSpeed.png');
                            }
                        }
                        .humidity {
                            .progress-box {
                                .progress-bar {
                                    width: 29%;
                                    height: .1rem;
                                    border-radius: .1rem;
                                    background: linear-gradient(to right,#76c3fe,#6aa4fd);
                                }
                            }
                            .icon {
                                background-image: url('../../../../static/images/systemGreen-humidity.png');
                            }
                        }
                        .wind-direction {
                            height: 1.52rem;
                            padding-left: .4rem;
                            .left-box {
                                width: 1.3rem;
                                height: 1.52rem;
                                display: inline-block;
                                div {
                                    font-size: .13rem;
                                    text-align: center;
                                }
                                .img-box {
                                    width: 1.3rem;
                                    height: .8rem;
                                    margin: .22rem 0;
                                    // background-color: #77e5a0;
                                    background-image: url('../../../../static/images/systemGreen-windDirection.png');
                                    background-size: contain;
                                }
                            }
                            .right-box {
                                width: 1.6rem;
                                height: 1.6rem;
                                margin-left: .28rem;
                                vertical-align: top;
                                padding-top: .46rem;
                                display: inline-block;
                                .img-box {
                                    width: 1.6rem;
                                    height: .9rem;
                                    background-color: #e2e3e2;
                                }
                                div {
                                    color: #0090ff;
                                    font-size: .13rem;
                                    text-align: center;
                                }
                            }
                        }
                    }
                }
                .main-bottom {
                    display: flex;
                    height: 3.81rem;
                    border-top: .1rem solid #f7f7f7;
                    .contaminate-chart {
                        width: 68.5%;
                        height: 3.71rem;
                        position: relative;
                        #contaminate {
                            height: 3.71rem;
                        }
                        .title {
                            top: .1rem;
                            left: .56rem;
                            font-size: .2rem;
                            position: absolute;
                            font-weight: bolder;
                        }
                        .average {
                            top: .5rem;
                            left: .56rem;
                            font-size: .18rem;
                            position: absolute;
                        }
                        .lege {
                            top: .9rem;
                            right: .8rem;
                            position: absolute;
                            >div {
                                font-size: .12rem;
                                margin-left: .30rem;
                                display: inline-block;
                                .dot {
                                    width: .1rem;
                                    height: .1rem;
                                    display: inline-block;
                                }
                            }
                            .PM25 {
                                .dot {
                                    background-color: #3ada76;
                                }
                            }
                            .PM10 {
                                .dot {
                                    background-color: #0090ff;
                                }
                            }
                        }
                    }
                    .noise-chart {
                        width: 31.5%;
                        height: 3.71rem;
                        .noise-text {
                            height: .3rem;
                            position: relative;
                            .left {
                                top: .3rem;
                                left: .1rem;
                                font-size: .18rem;
                                position: absolute;
                            }
                            .right {
                                top: .2rem;
                                right: .3rem;
                                font-size: .16rem;
                                position: absolute;
                                .qualified {
                                    .dot {
                                        width: .15rem;
                                        height: .15rem;
                                        display: inline-block;
                                        vertical-align: middle;
                                        background-color: #3ada76;
                                    }
                                }
                                .disqualification {
                                    .dot {
                                        width: .15rem;
                                        height: .15rem;
                                        display: inline-block;
                                        vertical-align: middle;
                                        background-color: #ff7a81;
                                    }
                                }
                                .abnormal {
                                    .dot {
                                        width: .15rem;
                                        height: .15rem;
                                        display: inline-block;
                                        vertical-align: middle;
                                        background-color: #ff8400;
                                    }
                                }
                            }
                        }
                        #noise {
                            height: 3.41rem;
                        }
                    }
                }
                .history-box {
                    height: 9.5rem;
                    border-left: .1rem solid #f7f7f7;
                    .search-box {
                        height: .8rem;
                        border-bottom: .1rem solid #f7f7f7;
                        ul {
                            padding-left: 1.95rem;
                            li {
                                float: left;
                                margin-right: 1rem;
                                span {
                                    float: left;
                                    height: .7rem;
                                    font-size: .18rem;
                                    line-height: .7rem;
                                }
                                input {
                                    float: left;
                                    width: 2.6rem;
                                    height: .4rem;
                                    margin-top: .15rem;
                                    padding-left: .1rem;
                                    border-radius: .02rem;
                                    vertical-align: middle;
                                    border: .01rem solid #b6b6b6;
                                }
                                .el-input {
                                    height: .4rem;
                                }
                            }
                            .date {
                                .el-date-editor {
                                    width: 2.6rem;
                                    height: .4rem;
                                    overflow: hidden;
                                    margin-top: .15rem;
                                    border: .01rem solid #b6b6b6;
                                    span {
                                        padding: 0;
                                        width: .28rem;
                                        padding-left: .1rem;
                                    }
                                    input {
                                        margin: 0;
                                        border: 0;
                                        width: .95rem;
                                    }
                                }
                            }
                        }
                        .search-button {
                            float: right;
                            color: #fff;
                            height: .4rem;
                            width: 1.63rem;
                            font-size: .2rem;
                            margin-top: .15rem;
                            margin-right: .15rem;
                            text-align: center;
                            transition: all .5s;
                            line-height: .38rem;
                            border-radius: .02rem;
                            background-color: #ffd14f;
                            border: .01rem solid #d4ad40;
                            &:hover {
                                background-color: #d4ad40;
                            }
                        }
                    }
                    .table-box {
                        width: 100%;
                        padding: 0 .2rem;
                        margin-top: .2rem;
                        min-height: 7.8rem;
                        .el-table {
                            width: 12.28rem;
                            // width: 100%;
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
                    }
                    .paging-box {
                        width: 100%;
                        height: .32rem;
                        margin-top: .2rem;
                        padding-right: .2rem;
                        .el-pagination {
                            float: right;
                        }
                    }
                }
            }
            .dialog-box {
                left: 50%;
                top: 2.14rem;
                z-index: 200;
                width: 6.84rem;
                overflow: hidden;
                position: absolute;
                border-radius: .1rem;
                transform: translate(-50%);
                background-color: #fefefe;
                .title {
                    color:#fff;
                    height: .6rem;
                    font-size: .24rem;
                    line-height: .6rem;
                    text-align: center;
                    position: relative;
                    font-weight: bolder;
                    background: linear-gradient(to right, #6cc4ff, #489cff);
                    a {
                        top: 50%;
                        right: .2rem;
                        color: #fff;
                        position: absolute;
                        transform: translateY(-50%);
                    }
                }
                .form {
                    ul{
                        padding-bottom: .3rem;
                        li {
                            display: flex;
                            height: .71rem;
                            padding-top: .3rem;
                            >span {
                                width: 1.85rem;
                                height: .41rem;
                                font-size: .16rem;
                                text-align: right;
                                position: relative;
                                line-height: .41rem;
                                padding-right: .32rem;
                                display: inline-block;
                                .required {
                                    top: -0.01rem;
                                    right: .22rem;
                                    color: #f00;
                                    position: absolute;
                                }
                            }
                            .el-range-separator {
                                width: .3rem;
                            }
                        }
                    }
                }
                .confirm {
                    height: .8rem;
                    background-color: #f8f8f8;
                    border-top: .01rem solid #dedede;
                    .button {
                        color: #fff;
                        display: block;
                        width: 1.63rem;
                        height: .49rem;
                        margin: 0 auto;
                        font-size: .2rem;
                        margin-top: .15rem;
                        text-align: center;
                        line-height: .47rem;
                        transition: all .5s;
                        border-radius: .02rem;
                        background-color: #ffd14f;
                        border: .01rem solid #d9b759;
                        &:hover {
                            background-color: #d9b759
                        }
                    }
                }
            }
            .shade-box {
                top: 0;
                left: 0;
                width: 100%;
                z-index: 100;
                height: 100%;
                position: fixed;
                background-color: rgba(0, 0, 0, .5);
            }
        }
    }
</style>

<script>
import { setInterval } from 'timers';
export default {
    data() {
        return {
            historyShow: false, // 历史记录列表显示状态
            equipmentShow: true, // 设备列表显示状态
            dialogShow: false, // 导出Excel对话框状态
            historyType: [{
              value: 1,
              label: '合格'
            }, {
              value: 0,
              label: '不合格'
            }], // 历史记录类型
            historyValue: '', // 历史记录类型当前选中值
            dateValue: '', // 日期值
            excelDate: '', // 导出excel的日期
            tableData: [], // 表格数据
            currentPage: 1, // 当前页码
            projectId: 0, // 项目id
            sn: 0, // 设备sn码
            pageNum: 1, // 当前页
            pageSize: 20, // 每页显示条数
            pageTotal: 0, // 总条数
            equipmentData: {}, // 当前设备数据
            equipmentLisData: [], // 设备列表数据
            startTime: '', // 历史记录开始时间
            endTime: '', // 历史记录结束时间
            startTime2: '', // 导出excel开始时间
            endTime2: '', // 导出excel结束时间
        }
    },
    mounted() {
        // this.temperature()
        // this.contaminate()
        // this.noise()
    },
    created() {
        this.getProjectId()
        this.getProjectDustEmission()
    },
    methods: {
        // 获取项目id
        getProjectId() {
            this.projectId = sessionStorage.getItem('pid')
        },

        // 24小时气温折线图：ECharts图渲染
        temperature(data) {
            let temperature = this.$echarts.init(
              document.getElementById("temperature")
            )
            temperature.setOption({
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
                                color: "#132e6d"
                            }
                        },
                        type: "category",
                        boundaryGap: false,
                        // data: [
                        //   "08时",
                        //   "11时",
                        //   "14时",
                        //   "17时",
                        //   "20时",
                        //   "23时",
                        //   "02时",
                        //   "05时"
                        // ]
                        data: data.time
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        min: -10,
                        interval: 10,
                        axisLabel: {
                            textStyle: {
                                color: "#000"
                            },
                            formatter: "{value}℃"
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
                        name: "气温",
                        type: "line",
                        symbolSize: 10,
                        smooth: 0.2,
                        symbol:'circle',
                        color: ["#3ada76"],
                        // data: [20, 24, 26, 26, 18, 16, 15, 15]
                        data: data.tem
                    },
                ]
            })
        },

        // 24小时污染度浓度：ECharts图渲染
        contaminate(data) {
            let contaminate = this.$echarts.init(
              document.getElementById("contaminate")
            )
            contaminate.setOption({
                grid: {
                    y: 140,
                },
                tooltip: {
                    trigger: "axis"
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    // data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
                    data: data.time
                },
                yAxis: {
                    interval: 20,
                    type: 'value'
                },
                series: [{
                    name: 'PM10',
                    // data: [100, 93, 91, 94, 109, 103, 102, 80],
                    data: data.PM10,
                    type: 'line',
                    color: '#7fc7ff',
                    symbolSize: 0,
                    areaStyle: {
                        color: '#7fc7ff'
                    }
                },{
                    name: 'PM2.5',
                    // data: [82, 63, 79, 83, 89, 93, 92, 65],
                    data: data.PM25,
                    type: 'line',
                    color: '#9cecba',
                    symbolSize: 0,
                    areaStyle: {
                        color: '#9cecba'
                    }
                }]
            })
        },

        // 噪音月占比：ECharts图渲染
        noise(data) {
            let noise = this.$echarts.init(
                document.getElementById("noise")
            )
            noise.setOption({
                color: [
                    "#3ada76",
                    "#ff7a81",
                    "#ff8400",
                ],
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c}天 ({d}%)"
                },
                // legend: {
                //     orient: "vertical",
                //     x: "445px",
                //     y: "75px",
                //     itemWidth: 16, // 设置图例图形的宽
                //     itemHeight: 16, // 设置图例图形的高
                //     textStyle: {
                //         fontSize: "16",
                //         color:"#000"
                //     },
                //     data: ["合格", "不合格"]
                // },
                series: [{
                    name: "噪音",
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
                                fontSize: "30",
                                fontWeight: "bold"
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        { value: data.hg, name: "合格" },
                        { value: data.bhg, name: "不合格" },
                        { value: data.yc, name: "异常" },
                    ]
                }]
            })
        },

        // 历史记录列表状态切换
        historyClick() {
            this.historyShow = !this.historyShow

            this.pageNum = 1
            this.historyValue = ''
            this.dateValue = ''
        },

        // 设备列表状态切换
        equipmentClick() {
            this.equipmentShow = !this.equipmentShow
        },

        handleSizeChange(val) {
            console.log(`每页${val}条`)
        },

        // 当前页
        handleCurrentChange(val) {
            // console.log(`当前页：${val}`)
            this.pageNum = val
            this.pageClick()
        },

        // 序号
        indexMethod(index) {
            return (this.pageNum-1)*this.pageSize+index+1
        },

        // 获取开始时间与结束时间
        getTime() {
            // console.log(this.dateValue[0])
            // this.startTime = this.dateValue[0]
            // this.endTime = this.dateValue[1]
            this.dateValue?this.startTime = this.dateValue[0]:this.startTime=''
            this.dateValue?this.endTime = this.dateValue[1]:this.endTime=''
        },
        getTime2() {
            // console.log(this.dateValue[0])
            // this.startTime = this.dateValue[0]
            // this.endTime = this.dateValue[1]
            this.excelDate?this.startTime2 = this.excelDate[0]:this.startTime2=''
            this.excelDate?this.endTime2 = this.excelDate[1]:this.endTime2=''
        },

        // 获取设备列表
        getProjectDustEmission() {
            // console.log(this.projectId)
            this.$axios.post(`/api/ProjectDustEmission/getProjectDustEmission?projectId=${this.projectId}`).then(
                res => {
                    // console.log(res.data)
                    this.equipmentLisData = res.data.data
                    this.sn = res.data.data[0].sn
                    this.getPM25AndPN10()
                    this.getDustEmission()
                }
            )
        },

        // 根据设备sn码获取设备信息
        getPM25AndPN10() {
            this.$axios.post(`/api/DustEmission/getPM25AndPN10?sn=${this.sn}&projectId=${this.projectId}`).then(
                res => {
                    // console.log(res.data.data.eight)
                    let that = this
                    this.equipmentData = res.data
                    let temp = {
                        time:[],
                        tem:[]
                    }
                    let temp2 = {
                        PM25:[],
                        PM10:[],
                        time:[]
                    }
                    let temp3 = {
                        hg: res.data.get30.zy_hg,
                        bhg: res.data.get30.zy_bhg,
                        yc: res.data.get30.zy_yc
                    }
                    for (let i = 0; i < res.data.weather.data[0].hours.length; i++) {
                        temp.time.push(
                            res.data.weather.data[0].hours[i].day.split('日')[1]
                        )
                        temp.tem.push(
                            res.data.weather.data[0].hours[i].tem.split('℃')[0]
                        )
                    }
                    for (let i2 = 0; i2 < res.data.data.eight.length; i2++) {
                        // console.log(res.data.data.eight[i2])
                        temp2.PM25.push(res.data.data.eight[i2].PM25)
                        temp2.PM10.push(res.data.data.eight[i2].PM10)
                        temp2.time.push(res.data.data.eight[i2].time)
                    }
                    setTimeout(()=>{
                        this.temperature(temp)
                        this.contaminate(temp2)
                        this.noise(temp3)
                    },100)
                }
            )
        },

        // 历史记录
        getDustEmission() {
            this.$axios.post(`/api/DustEmission/getDustEmission?sn=${this.sn}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`).then(
                res => {
                    // console.log(res.data)
                    this.tableData = res.data.data.rows
                    this.pageTotal= res.data.data.total
                }
            )
        },

        // 搜索
        searchClick() {
            this.pageNum = 1
            this.$axios.post(`/api/DustEmission/getDustEmission?sn=${this.sn}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&tag=${this.historyValue}&startTime=${this.startTime}&endTime=${this.endTime}`).then(
                res => {
                    // console.log(res.data)
                    this.tableData = res.data.data.rows
                    this.pageTotal= res.data.data.total
                }
            )
        },

        // 翻页
        pageClick() {
            this.$axios.post(`/api/DustEmission/getDustEmission?sn=${this.sn}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&tag=${this.historyValue}&startTime=${this.startTime}&endTime=${this.endTime}`).then(
                res => {
                    // console.log(res.data)
                    this.tableData = res.data.data.rows
                    this.pageTotal= res.data.data.total
                }
            )
        },

        // 导出历史记录
        getExcel() {
            if (this.startTime2) {
                this.dialogShow = false
                location.href = `http://47.106.71.3:8080/api/DustEmission/getExcel?sn=${this.sn}&startTime=${this.startTime2}&endTime=${this.endTime2}`
            } else {
                this.$message({
                    message: '请选择日期',
                    type: 'warning'
                })
            }
        },

        // 选择设备
        equipmentSelect(sn) {
            this.sn = sn
            this.equipmentShow = true
            this.historyShow = false
            this.getPM25AndPN10()
        }, 
    }
}
</script>