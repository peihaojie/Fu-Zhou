<template>
    <div id="systemZhiHui_gaoZhiMo">
        <div class="content">
            <!-- 主体左部 -->
            <div class="left-main">
                <!-- 按钮区域 -->
                <div class="button-box">
                    <div class="top-button">
                        <a class="history" @click="alarmShow=false;historyShow=true" v-show="!historyShow">
                            <i class="icon"></i>
                            历史记录
                        </a>
                        <a class="history" @click="alarmShow=false;historyShow=false" v-show="historyShow">
                            <i class="icon"></i>
                            实时数据
                        </a>
                        <a class="cut" >
                            <i class="icon"></i>
                            切换设备
                        </a>
                        <a class="derive" >
                            <i class="icon"></i>
                            导出Excel
                        </a>
                    </div>
                    <div class="botton-button">
                        <a class="alarm" @click="alarmShow=true">
                            <i class="icon"></i>
                            设备报警
                        </a>
                    </div>
                </div>
                <!-- 警报状态 -->
                <div class="alarm-box">
                    <div class="title">
                        <span style="font-weight: bolder;">警报状态</span>
                        <span>报警数：1</span>
                    </div>
                    <div class="alarm-chart" id="alarmChart"></div>
                    <div class="list-box">
                        <ul>
                            <li>
                                <span>1号高支模于2018-02-08产生1级超阀值告警</span>
                                <a>确认</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 设备列表 -->
            </div>
            <!-- 主体右部 -->
            <div class="right-main">
                <!-- 实时数据 -->
                <div class="home-page" v-show="!alarmShow">
                    <!-- 头部 -->
                    <div class="title">
                        <div class="name">
                            <i class="icon"></i>
                            1号高支模
                        </div>
                        <div class="rank">
                            <i class="dot"></i>
                            暂无数据
                        </div>
                    </div>
                    <!-- 导航栏 -->
                    <div class="nav">
                        <a @click="selectShow=1" :class="selectShow==1?'active':''">支架沉降</a>
                        <a @click="selectShow=2" :class="selectShow==2?'active':''">立杆轴力</a>
                        <a @click="selectShow=3" :class="selectShow==3?'active':''">杆件倾角</a>
                        <a @click="selectShow=4" :class="selectShow==4?'active':''">水平位移</a>
                    </div>
                    <!-- 支架沉降实时数据 -->
                    <div class="main" v-show="selectShow==1&&!historyShow">
                        <!-- 搜索栏 -->
                        <div class="search-box">
                            <div class="left-search">
                                测点：
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="right-search">
                                <div class="input-box">
                                    <input type="text" placeholder="请输入测点名称搜索">
                                    <a class="el-icon-search"></a>
                                </div>
                            </div>
                        </div>
                        <!-- 数据内容 -->
                        <div class="data-box">
                            <div class="table-height">
                                <span>检测点</span>
                                <span>当日数据趋势图</span>
                                <span style="width:2.4rem;">当日数据列表</span>
                            </div>
                            <div class="top-box">
                                <!-- 检测点 -->
                                <div class="left-box">
                                    <div class="name">
                                        <i class="dot"></i>
                                        CJ-01
                                    </div>
                                    <ul>
                                        <li>
                                            高支模：1号高支模
                                        </li>
                                        <li>
                                            最大值：0.63mm
                                        </li>
                                        <li>
                                            最小值：0.22mm
                                        </li>
                                        <li>
                                            平均值：0.45mm
                                        </li>
                                    </ul>
                                </div>
                                <!-- 当日数据趋势图 -->
                                <div class="line-chart" id="oneChart"></div>
                                <!-- 当日数据列表 -->
                                <div class="right-box">
                                    <ul>
                                        <li>
                                            <span style="width:2rem;">支架沉降(mm)</span>
                                            <span style="width:1rem;">时间</span>
                                            <span style="width:.4rem;">状态</span>
                                        </li>
                                        <li>
                                            <span style="width:2rem;">0.5</span>
                                            <span style="width:1rem;">00:00</span>
                                            <span style="width:.4rem;">
                                                <i class="dot"></i>
                                            </span>
                                        </li>
                                        <li>
                                            <span style="width:2rem;">0.63</span>
                                            <span style="width:1rem;">12:12</span>
                                            <span style="width:.4rem;">
                                                <i class="dot"></i>
                                            </span>
                                        </li>
                                        <li>
                                            <span style="width:2rem;">0.5</span>
                                            <span style="width:1rem;">13:13</span>
                                            <span style="width:.4rem;">
                                                <i class="dot"></i>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="table-height">
                                <span style="width:33%;">检测点</span>
                                <span style="width:33%;">支架沉降(mm)</span>
                                <span style="width:33%;">采集时间</span>
                            </div>
                            <div class="bottom-box">
                                <ul>
                                    <li>
                                        <span style="width:33%;">CJ-01</span>
                                        <span style="width:33%;">0.5</span>
                                        <span style="width:33%;">2018-02-06 12:00:00</span>
                                    </li>
                                    <li class="even">
                                        <span style="width:33%;">JH-01</span>
                                        <span style="width:33%;">0.5</span>
                                        <span style="width:33%;">2018-02-06 12:00:00</span>
                                    </li>
                                    <li>
                                        <span style="width:33%;">JW-01</span>
                                        <span style="width:33%;">1.2</span>
                                        <span style="width:33%;">2018-02-06 12:00:00</span>
                                    </li>
                                    <li class="even">
                                        <span style="width:33%;">WU-01</span>
                                        <span style="width:33%;">0.5</span>
                                        <span style="width:33%;">2018-02-06 12:00:00</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- 立杆轴力实时数据 -->
                    <div class="main" v-show="selectShow==2&&!historyShow">
                        <!-- 搜索栏 -->
                        <div class="search-box">
                            <div class="left-search">
                                测点：
                                <el-select v-model="value2" placeholder="请选择">
                                    <el-option
                                    v-for="item in options2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="right-search">
                                <div class="input-box">
                                    <input type="text" placeholder="请输入测点名称搜索">
                                    <a class="el-icon-search"></a>
                                </div>
                            </div>
                        </div>
                        <!-- 数据内容 -->
                        <div class="data-box">
                            <div class="table-height">
                                <span>检测点</span>
                                <span>当日数据趋势图</span>
                                <span style="width:2.4rem;">当日数据列表</span>
                            </div>
                            <div class="top-box">
                                <!-- 检测点 -->
                                <div class="left-box">
                                    <div class="name">
                                        <i class="dot"></i>
                                        CJ-01
                                    </div>
                                    <ul>
                                        <li>
                                            高支模：1号高支模
                                        </li>
                                        <li>
                                            最大值：5.12KN
                                        </li>
                                        <li>
                                            最小值：2.11KN
                                        </li>
                                        <li>
                                            平均值：3.93KN
                                        </li>
                                    </ul>
                                </div>
                                <!-- 当日数据趋势图 -->
                                <div class="line-chart" id="twoChart"></div>
                                <!-- 当日数据列表 -->
                                <div class="right-box">
                                    <ul>
                                        <li>
                                            <span style="width:2rem;">立杆轴力(KN)</span>
                                            <span style="width:1rem;">时间</span>
                                            <span style="width:.4rem;">状态</span>
                                        </li>
                                        <li>
                                            <span style="width:2rem;">3.5</span>
                                            <span style="width:1rem;">00:00</span>
                                            <span style="width:.4rem;">
                                                <i class="dot"></i>
                                            </span>
                                        </li>
                                        <li>
                                            <span style="width:2rem;">5.63</span>
                                            <span style="width:1rem;">12:12</span>
                                            <span style="width:.4rem;">
                                                <i class="dot"></i>
                                            </span>
                                        </li>
                                        <li>
                                            <span style="width:2rem;">3.22</span>
                                            <span style="width:1rem;">13:13</span>
                                            <span style="width:.4rem;">
                                                <i class="dot"></i>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="table-height">
                                <span style="width:33%;">检测点</span>
                                <span style="width:33%;">立杆轴力(KN)</span>
                                <span style="width:33%;">采集时间</span>
                            </div>
                            <div class="bottom-box">
                                <ul>
                                    <li>
                                        <span style="width:33%;">CJ-01</span>
                                        <span style="width:33%;">5.5</span>
                                        <span style="width:33%;">2018-02-06 12:00:00</span>
                                    </li>
                                    <li class="even">
                                        <span style="width:33%;">JH-01</span>
                                        <span style="width:33%;">2.52</span>
                                        <span style="width:33%;">2018-02-06 12:00:00</span>
                                    </li>
                                    <li>
                                        <span style="width:33%;">JW-01</span>
                                        <span style="width:33%;">4.52</span>
                                        <span style="width:33%;">2018-02-06 12:00:00</span>
                                    </li>
                                    <li class="even">
                                        <span style="width:33%;">WU-01</span>
                                        <span style="width:33%;">3.51</span>
                                        <span style="width:33%;">2018-02-06 12:00:00</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- 杆件倾角实时数据 -->
                    <div class="main" v-show="selectShow==3&&!historyShow">
                        <!-- 搜索栏 -->
                        <div class="search-box">
                            <div class="left-search">
                                测点：
                                <el-select v-model="value3" placeholder="请选择">
                                    <el-option
                                    v-for="item in options3"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="right-search">
                                <div class="input-box">
                                    <input type="text" placeholder="请输入测点名称搜索">
                                    <a class="el-icon-search"></a>
                                </div>
                            </div>
                        </div>
                        <!-- 数据内容 -->
                        <div class="data-box">
                            <div class="table-height">
                                <span>检测点</span>
                                <span>当日数据趋势图</span>
                                <span style="width:2.4rem;">当日数据列表</span>
                            </div>
                            <div class="top-box">
                                <!-- 检测点 -->
                                <div class="left-box">
                                    <div class="name">
                                        <i class="dot"></i>
                                        CJ-01
                                    </div>
                                    <ul>
                                        <li>
                                            高支模：1号高支模
                                        </li>
                                        <li>
                                            最大值：0.5°
                                        </li>
                                        <li>
                                            最小值：0.14°
                                        </li>
                                        <li>
                                            平均值：0.36°
                                        </li>
                                    </ul>
                                </div>
                                <!-- 当日数据趋势图 -->
                                <div class="line-chart" id="threeChart"></div>
                                <!-- 当日数据列表 -->
                                <div class="right-box">
                                    <ul>
                                        <li>
                                            <span style="width:2rem;">杆件倾角(°)</span>
                                            <span style="width:1rem;">时间</span>
                                            <span style="width:.4rem;">状态</span>
                                        </li>
                                        <li>
                                            <span style="width:2rem;">0.5</span>
                                            <span style="width:1rem;">00:00</span>
                                            <span style="width:.4rem;">
                                                <i class="dot"></i>
                                            </span>
                                        </li>
                                        <li>
                                            <span style="width:2rem;">0.43</span>
                                            <span style="width:1rem;">12:12</span>
                                            <span style="width:.4rem;">
                                                <i class="dot"></i>
                                            </span>
                                        </li>
                                        <li>
                                            <span style="width:2rem;">0.22</span>
                                            <span style="width:1rem;">13:13</span>
                                            <span style="width:.4rem;">
                                                <i class="dot"></i>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="table-height">
                                <span style="width:33%;">检测点</span>
                                <span style="width:33%;">杆件倾角(°)</span>
                                <span style="width:33%;">采集时间</span>
                            </div>
                            <div class="bottom-box">
                                <ul>
                                    <li>
                                        <span style="width:33%;">CJ-01</span>
                                        <span style="width:33%;">0.5</span>
                                        <span style="width:33%;">2018-02-06 12:00:00</span>
                                    </li>
                                    <li class="even">
                                        <span style="width:33%;">JH-01</span>
                                        <span style="width:33%;">0.44</span>
                                        <span style="width:33%;">2018-02-06 12:00:00</span>
                                    </li>
                                    <li>
                                        <span style="width:33%;">JW-01</span>
                                        <span style="width:33%;">0.22</span>
                                        <span style="width:33%;">2018-02-06 12:00:00</span>
                                    </li>
                                    <li class="even">
                                        <span style="width:33%;">WU-01</span>
                                        <span style="width:33%;">0.33</span>
                                        <span style="width:33%;">2018-02-06 12:00:00</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- 水平位移实时数据 -->
                    <div class="main" v-show="selectShow==4&&!historyShow">
                        <!-- 搜索栏 -->
                        <div class="search-box">
                            <div class="left-search">
                                测点：
                                <el-select v-model="value4" placeholder="请选择">
                                    <el-option
                                    v-for="item in options4"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="right-search">
                                <div class="input-box">
                                    <input type="text" placeholder="请输入测点名称搜索">
                                    <a class="el-icon-search"></a>
                                </div>
                            </div>
                        </div>
                        <!-- 数据内容 -->
                        <div class="data-box">
                            <div class="table-height">
                                <span>检测点</span>
                                <span>当日数据趋势图</span>
                                <span style="width:2.4rem;">当日数据列表</span>
                            </div>
                            <div class="top-box">
                                <!-- 检测点 -->
                                <div class="left-box">
                                    <div class="name">
                                        <i class="dot"></i>
                                        CJ-01
                                    </div>
                                    <ul>
                                        <li>
                                            高支模：1号高支模
                                        </li>
                                        <li>
                                            最大值：0.61mm
                                        </li>
                                        <li>
                                            最小值：0.27mm
                                        </li>
                                        <li>
                                            平均值：0.46mm
                                        </li>
                                    </ul>
                                </div>
                                <!-- 当日数据趋势图 -->
                                <div class="line-chart" id="fourChart"></div>
                                <!-- 当日数据列表 -->
                                <div class="right-box">
                                    <ul>
                                        <li>
                                            <span style="width:2rem;">水平位移(mm)</span>
                                            <span style="width:1rem;">时间</span>
                                            <span style="width:.4rem;">状态</span>
                                        </li>
                                        <li>
                                            <span style="width:2rem;">0.61</span>
                                            <span style="width:1rem;">00:00</span>
                                            <span style="width:.4rem;">
                                                <i class="dot"></i>
                                            </span>
                                        </li>
                                        <li>
                                            <span style="width:2rem;">0.27</span>
                                            <span style="width:1rem;">12:12</span>
                                            <span style="width:.4rem;">
                                                <i class="dot"></i>
                                            </span>
                                        </li>
                                        <li>
                                            <span style="width:2rem;">0.49</span>
                                            <span style="width:1rem;">13:13</span>
                                            <span style="width:.4rem;">
                                                <i class="dot"></i>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="table-height">
                                <span style="width:33%;">检测点</span>
                                <span style="width:33%;">水平位移(mm)</span>
                                <span style="width:33%;">采集时间</span>
                            </div>
                            <div class="bottom-box">
                                <ul>
                                    <li>
                                        <span style="width:33%;">CJ-01</span>
                                        <span style="width:33%;">0.5</span>
                                        <span style="width:33%;">2018-02-06 12:00:00</span>
                                    </li>
                                    <li class="even">
                                        <span style="width:33%;">JH-01</span>
                                        <span style="width:33%;">0.44</span>
                                        <span style="width:33%;">2018-02-06 12:00:00</span>
                                    </li>
                                    <li>
                                        <span style="width:33%;">JW-01</span>
                                        <span style="width:33%;">0.11</span>
                                        <span style="width:33%;">2018-02-06 12:00:00</span>
                                    </li>
                                    <li class="even">
                                        <span style="width:33%;">WU-01</span>
                                        <span style="width:33%;">0.33</span>
                                        <span style="width:33%;">2018-02-06 12:00:00</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- 支架沉降历史数据 -->
                    <div class="main" v-show="selectShow==1&&historyShow">
                        <!-- 搜索栏 -->
                        <div class="search-box">
                            <div class="left-search">
                                测点：
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                起止时间：
                                <el-date-picker
                                v-model="date1"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                            <a class="search-btn">搜索</a>
                        </div>
                        <!-- 数据内容 -->
                        <div class="data-box">
                            <div class="table-height">
                                <span>检测点</span>
                                <span>当日数据趋势图</span>
                                <span style="width:2.4rem;">当日数据列表</span>
                            </div>
                            <div class="top-box">
                                <!-- 当日数据趋势图 -->
                                <div class="line-chart" id="historyOne"></div>
                            </div>
                            <div class="table-box">
                                <el-table
                                :data="historyTableData1"
                                stripe
                                border>
                                    <el-table-column
                                    type="selection"
                                    width="35">
                                    </el-table-column>
                                    <el-table-column
                                    type="index"
                                    label="序号" 
                                    width="100" 
                                    :index="indexMethod">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="检测点"
                                    width="150">
                                    </el-table-column>
                                    <el-table-column
                                    label="支架沉降（m）"
                                    width="150">
                                    <template slot-scope="scope">
                                        <div :style="`color:${scope.row.status==0?'#fe8990':''}`">
                                            {{scope.row.level}}
                                        </div>
                                    </template>
                                    </el-table-column>
                                    <el-table-column>
                                    <template slot-scope="scope">
                                        <div :style="`color:${scope.row.status==0?'#fe8990':'#58de87'}`">
                                            {{scope.row.status==0?'不合格':'合格'}}
                                        </div>
                                    </template>
                                    </el-table-column>
                                    <el-table-column
                                    prop="time"
                                    label="时间">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                    <!-- 立杆轴力历史数据 -->
                    <div class="main" v-show="selectShow==2&&historyShow">
                        <!-- 搜索栏 -->
                        <div class="search-box">
                            <div class="left-search">
                                测点：
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                起止时间：
                                <el-date-picker
                                v-model="date2"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                            <a class="search-btn">搜索</a>
                        </div>
                        <!-- 数据内容 -->
                        <div class="data-box">
                            <div class="table-height">
                                <span>检测点</span>
                                <span>当日数据趋势图</span>
                                <span style="width:2.4rem;">当日数据列表</span>
                            </div>
                            <div class="top-box">
                                <!-- 当日数据趋势图 -->
                                <div class="line-chart" id="historyTwo"></div>
                            </div>
                            <div class="table-box">
                                <el-table
                                :data="historyTableData2"
                                stripe
                                border>
                                    <el-table-column
                                    type="selection"
                                    width="35">
                                    </el-table-column>
                                    <el-table-column
                                    type="index"
                                    label="序号" 
                                    width="100" 
                                    :index="indexMethod">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="检测点"
                                    width="150">
                                    </el-table-column>
                                    <el-table-column
                                    label="立杆轴力（mm）"
                                    width="150">
                                    <template slot-scope="scope">
                                        <div :style="`color:${scope.row.status==0?'#fe8990':''}`">
                                            {{scope.row.level}}
                                        </div>
                                    </template>
                                    </el-table-column>
                                    <el-table-column>
                                    <template slot-scope="scope">
                                        <div :style="`color:${scope.row.status==0?'#fe8990':'#58de87'}`">
                                            {{scope.row.status==0?'不合格':'合格'}}
                                        </div>
                                    </template>
                                    </el-table-column>
                                    <el-table-column
                                    prop="time"
                                    label="时间">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                    <!-- 杆件倾角历史数据 -->
                    <div class="main" v-show="selectShow==3&&historyShow">
                        <!-- 搜索栏 -->
                        <div class="search-box">
                            <div class="left-search">
                                测点：
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                起止时间：
                                <el-date-picker
                                v-model="date3"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                            <a class="search-btn">搜索</a>
                        </div>
                        <!-- 数据内容 -->
                        <div class="data-box">
                            <div class="table-height">
                                <span>检测点</span>
                                <span>当日数据趋势图</span>
                                <span style="width:2.4rem;">当日数据列表</span>
                            </div>
                            <div class="top-box">
                                <!-- 当日数据趋势图 -->
                                <div class="line-chart" id="historyThree"></div>
                            </div>
                            <div class="table-box">
                                <el-table
                                :data="historyTableData3"
                                stripe
                                border>
                                    <el-table-column
                                    type="selection"
                                    width="35">
                                    </el-table-column>
                                    <el-table-column
                                    type="index"
                                    label="序号" 
                                    width="100" 
                                    :index="indexMethod">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="检测点"
                                    width="150">
                                    </el-table-column>
                                    <el-table-column
                                    label="杆件倾角(mm)"
                                    width="150">
                                    <template slot-scope="scope">
                                        <div :style="`color:${scope.row.status==0?'#fe8990':''}`">
                                            {{scope.row.level}}
                                        </div>
                                    </template>
                                    </el-table-column>
                                    <el-table-column>
                                    <template slot-scope="scope">
                                        <div :style="`color:${scope.row.status==0?'#fe8990':'#58de87'}`">
                                            {{scope.row.status==0?'不合格':'合格'}}
                                        </div>
                                    </template>
                                    </el-table-column>
                                    <el-table-column
                                    prop="time"
                                    label="时间">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                    <!-- 水平位移历史数据 -->
                    <div class="main" v-show="selectShow==4&&historyShow">
                        <!-- 搜索栏 -->
                        <div class="search-box">
                            <div class="left-search">
                                测点：
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                起止时间：
                                <el-date-picker
                                v-model="date4"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                            <a class="search-btn">搜索</a>
                        </div>
                        <!-- 数据内容 -->
                        <div class="data-box">
                            <div class="table-height">
                                <span>检测点</span>
                                <span>当日数据趋势图</span>
                                <span style="width:2.4rem;">当日数据列表</span>
                            </div>
                            <div class="top-box">
                                <!-- 当日数据趋势图 -->
                                <div class="line-chart" id="historyFour"></div>
                            </div>
                            <div class="table-box">
                                <el-table
                                :data="historyTableData4"
                                stripe
                                border>
                                    <el-table-column
                                    type="selection"
                                    width="35">
                                    </el-table-column>
                                    <el-table-column
                                    type="index"
                                    label="序号" 
                                    width="100" 
                                    :index="indexMethod">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="检测点"
                                    width="150">
                                    </el-table-column>
                                    <el-table-column
                                    label="水平位移（FN）"
                                    width="150">
                                    <template slot-scope="scope">
                                        <div :style="`color:${scope.row.status==0?'#fe8990':''}`">
                                            {{scope.row.level}}
                                        </div>
                                    </template>
                                    </el-table-column>
                                    <el-table-column>
                                    <template slot-scope="scope">
                                        <div :style="`color:${scope.row.status==0?'#fe8990':'#58de87'}`">
                                            {{scope.row.status==0?'不合格':'合格'}}
                                        </div>
                                    </template>
                                    </el-table-column>
                                    <el-table-column
                                    prop="time"
                                    label="时间">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 设备警报 -->
                <div class="alarm-box" v-show="alarmShow">
                    <div class="search-box">
                        <div class="left-box">
                            <el-select v-model="searchValue" placeholder="请选择">
                            <el-option
                            v-for="item in searchOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                            </el-select>
                            <el-radio v-model="radio" label="1">实时</el-radio>
                            <el-radio v-model="radio" label="2">历史</el-radio>
                            <input type="text" placeholder="请输入测点名称搜索">
                        </div>
                        <a class="search-btn">搜索</a>
                    </div>
                    <div class="table-box">
                        <el-table
                        :data="tableData"
                        stripe>
                            <el-table-column
                            prop="works"
                            label="结构物"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            prop="source"
                            label="警告源"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            prop="rank"
                            label="警告等级"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            prop="message"
                            label="警告信息"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="number"
                            label="警告次数"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            prop="time"
                            label="告警时间">
                            </el-table-column>
                            <el-table-column
                            prop="type"
                            label="操作"
                            width="110">
                            <template>
                                <a>
                                    确认
                                </a>
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="paging-box">
                        <!-- @size-change="handleSizeChange"
                            @current-change="handleCurrentChange" -->
                        <el-pagination
                            :current-page="1"
                            :page-size="4"
                            layout="total, prev, pager, next, jumper"
                            :total="4">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    #systemZhiHui_gaoZhiMo{
        width: 100%;
        .content {
            border-radius: .04rem;
            background-color: #fff;
            box-shadow: 0 0 .5rem -.3rem #666;
            display: flex;
            .left-main {
                width: 4.1rem;
                height: 9.5rem;
                border-right: .1rem solid #f7f7f7;
                .button-box {
                    height: 1.45rem;
                    padding-top: .25rem;
                    border-bottom: .1rem solid #f7f7f7;
                    .botton-button {
                        a {
                            margin-top: .25rem;
                        }
                    }
                    a {
                        float: left;
                        height: .3rem;
                        color: #0090ff;
                        font-size: .12rem;
                        transition: all .5s;
                        margin-left: .24rem;
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
                            vertical-align: top;
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
                            background-image: url('../../../../static/images/system-date.png');
                        }
                        &:hover {
                            .icon {
                                background-image: url('../../../../static/images/system-dateHover.png');
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
                    .alarm {
                        .icon {
                            background-image: url('../../../../static/images/system-alarm.png');
                        }
                        &:hover {
                            .icon {
                                background-image: url('../../../../static/images/system-alarmHover.png');
                            }
                        }
                    }
                }
                .alarm-box {
                    .title {
                        color: #4a4a4a;
                        font-size: .18rem;
                        height: .52rem;
                        line-height: .52rem;
                        display: flex;
                        padding: 0 .21rem;
                        justify-content: space-between;
                    }
                    .alarm-chart {
                        height: 3.5rem;
                    }
                    .list-box {
                        padding: 0 .21rem;
                        ul {
                            li {
                                display: flex;
                                justify-content: space-between;
                                font-size: .14rem;
                                color: #4a4a4a;
                                height: .41rem;
                                line-height: .41rem;
                                a {
                                    font-size: .14rem;
                                    color: #0090ff;
                                }
                            }
                        }
                    }
                }
            }
            .right-main {
                flex: 1;
                height: 9.5rem;
                vertical-align: top;
                .home-page {
                    .title {
                        display: flex;
                        height: .85rem;
                        padding: 0 .5rem;
                        justify-content: space-between;
                        border-bottom: .1rem solid #f7f7f7;
                        .name {
                            color: #4a4a4a;
                            height: .75rem;
                            font-size: .24rem;
                            line-height: .75rem;
                            .icon {
                                display: inline-block;
                                width: .24rem;
                                height: .75rem;
                                margin-right: .12rem;
                                vertical-align: top;
                                background-image: url('../../../../static/images/systemZhiHui-gaoZhiMoGreen.png');
                                background-position: center center;
                                background-repeat: no-repeat;
                                background-size: contain;
                            }
                        }
                        .rank {
                            height: .75rem;
                            color: #4a4a4a;
                            font-size: .18rem;
                            line-height: .75rem;
                            .dot {
                                width: .08rem;
                                height: .08rem;
                                border-radius: .08rem;
                                background-color: #929292;
                                margin-right: .15rem;
                                display: inline-block;
                                vertical-align: middle;
                            }
                            .one {
                                background-color: #ff7a81;
                            }
                            .two {
                                background-color: #feb27e;
                            }
                            .three {
                                background-color: #ffde2a;
                            }
                            .normal {
                                background-color: #3ada76;
                            }
                        }
                    }
                    .nav {
                        display: flex;
                        height: .85rem;
                        padding: 0 .7rem;
                        justify-content: space-between;
                        border-bottom: .1rem solid #f7f7f7;
                        a {
                            height: .75rem;
                            color: #4a4a4a;
                            font-size: .26rem;
                            font-weight: bolder;
                            line-height: .75rem;
                        }
                        .active {
                            color: #858585;
                            height: .8rem;
                            border-bottom: .05rem solid #3eaafd;
                        }
                    }
                    .main {
                        .search-box {
                            height: .9rem;
                            padding: 0 .38rem;
                            display: flex;
                            justify-content: space-between;
                            .left-search {
                                height: .9rem;
                                color: #4a4a4a;
                                font-size: .18rem;
                                line-height: .9rem;
                                .el-select {
                                    margin-right: .8rem;
                                    input {
                                        width: 2.6rem;
                                        height: .4rem;
                                        color: #4a4a4a;
                                        border-radius: .04rem;
                                        border: .01rem solid #b6b6b6;
                                        padding-left: .1rem;
                                    }
                                }
                                .el-date-editor {
                                    >span {
                                        width: auto;
                                    }
                                }
                            }
                            .right-search {
                                height: .9rem;
                                // line-height: .9rem;
                                .input-box {
                                    width: 3.4rem;
                                    height: .4rem;
                                    border-radius: .04rem;
                                    border: .01rem solid #b6b6b6;
                                    transform: translateY(.26rem);
                                    input {
                                        height: .38rem;
                                        font-size: .18rem;
                                        padding-left: .1rem;
                                        line-height: .38rem;
                                        width: 3rem;
                                    }
                                    a {
                                        display: inline-block;
                                        width: .38rem;
                                        height: .38rem;
                                        font-size: .2rem;
                                        text-align: center;
                                        line-height: .38rem;
                                        &:hover {
                                           color: #fff;
                                           background-color: #ccc;
                                        }
                                    }
                                }
                            }
                            .search-btn {
                                color: #fff;
                                height: 0.4rem;
                                width: 1.63rem;
                                font-size: 0.2rem;
                                text-align: center;
                                transition: all 0.5s;
                                line-height: 0.38rem;
                                border-radius: 0.02rem;
                                background-color: #ffd14f;
                                transform: translateY(.25rem);
                                border: 0.01rem solid #d4ad40;
                                &:hover {
                                  background-color: #d4ad40;
                                }
                            }
                        }
                        .data-box {
                            padding: 0 .38rem;
                            .table-height {
                                height: .6rem;
                                display: flex;
                                color: #5f676c;
                                padding: 0 .22rem;
                                background-color: #c5e8ff;
                                justify-content: space-between;
                                span {
                                    font-size: .18rem;
                                    line-height: .6rem;
                                }
                            }
                            .top-box {
                                height: 3.2rem;
                                display: flex;
                                .left-box {
                                    height: 100%;
                                    width: 2.8rem;
                                    padding-top: .6rem;
                                    .name {
                                        font-size: .18rem;
                                        margin-bottom: .06rem;
                                        padding-left: .22rem;
                                        .dot {
                                            width: .08rem;
                                            height: .08rem;
                                            margin-right: .14rem;
                                            display: inline-block;
                                            border-radius: .08rem;
                                            vertical-align: middle;
                                            background-color: #3ada76;
                                        }
                                    }
                                    ul {
                                        padding-left: .96rem;
                                        li {
                                            height: .4rem;
                                            font-size: .18rem;
                                            line-height: .4rem;
                                        }
                                    }
                                }
                                .line-chart {
                                    flex: 1;
                                }
                                .right-box {
                                    width: 4rem;
                                    height: 100%;
                                    padding-top: .6rem;
                                    ul {
                                        li {
                                            display: flex;
                                            color: #4a4a4a;
                                            font-size: .18rem;
                                            height: .44rem;
                                            line-height: .44rem;
                                            span {
                                                .dot {
                                                    width: .08rem;
                                                    height: .08rem;
                                                    margin-left: .16rem;
                                                    border-radius: .08rem;
                                                    display: inline-block;
                                                    background-color: #3ada76;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            .bottom-box {
                                ul {
                                    li {
                                        height: .6rem;
                                        display: flex;
                                        padding: 0 .22rem;
                                        justify-content: space-between;
                                        span {
                                            color: #4a4a4a;
                                            font-size: .18rem;
                                            line-height: .6rem;
                                        }
                                    }
                                    .even {
                                        background-color: #f8f9fb;
                                    }
                                }
                            }
                            .table-box {
                                height: 2.8rem;
                                .el-table {
                                    width: 11.82rem;
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
                                        color: #fd5101;
                                    }
                                    .yellow-color {
                                        color: #ffd14f;
                                    }
                                }
                            }
                        }
                    }
                }
                .alarm-box {
                    .search-box {
                        height: .9rem;
                        padding: 0 .38rem;
                        display: flex;
                        justify-content: space-between;
                        .left-box {
                            padding-top: .25rem;
                            .el-select {
                                margin-right: .3rem;
                                .el-input__inner {
                                    width: 2.6rem;
                                    height: .4rem;
                                    border-radius: .04rem;
                                    border: .01rem solid #b6b6b6;
                                }
                            }
                            >input {
                                width: 3rem;
                                height: .4rem;
                                border-radius: .04rem;
                                border: .01rem solid #b6b6b6;
                                padding-left: .1rem;
                            }
                            // input:-ms-input-placeholder,
                            input::-webkit-input-placeholder {
                                color: #bebebe;
                            }
                        }
                        .search-btn {
                            color: #fff;
                            height: 0.4rem;
                            width: 1.63rem;
                            font-size: 0.2rem;
                            text-align: center;
                            transition: all 0.5s;
                            line-height: 0.38rem;
                            border-radius: 0.02rem;
                            background-color: #ffd14f;
                            transform: translateY(.25rem);
                            border: 0.01rem solid #d4ad40;
                            &:hover {
                              background-color: #d4ad40;
                            }
                        }
                    }
                    .table-box {
                        width: 100%;
                        padding: 0 .38rem;
                        height: 7.8rem;
                        .el-table {
                            width: 11.82rem;
                            // width: 100%;
                            th {
                                padding: 0;
                                div {
                                    color: #4a4a4a;
                                    height: .6rem;
                                    line-height: .6rem;
                                    background-color: #c5e8ff;
                                    font-size: .18rem;
                                }
                            }
                            td {
                                padding: 0;
                                div {
                                    height: .6rem;
                                    color: #4a4a4a;
                                    line-height: .6rem;
                                    font-size: .18rem;
                                }
                            }
                        }
                    }
                    .paging-box {
                        width: 100%;
                        height: .32rem;
                        margin-top: .2rem;
                        .el-pagination {
                            float: right;
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
            selectShow: 1, // 当前模块
            alarmShow: false, // 警报模块状态
            historyShow: false, // 历史数据状态
            options: [], // 支架沉降测点选项
            value: '', // 支架沉降测点值
            options2: [], // 立杆轴力测点选项
            value2: '', // 立杆轴力测点值
            options3: [], // 杆件倾角测点选项
            value3: '', // 杆件倾角测点值
            options4: [], // 水平位移测点选项
            value4: '', // 水平位移测点值
            searchOptions: [], // 搜索栏选项
            searchValue: '', // 搜索栏值
            radio: '1', // 搜索栏单选框
            tableData: [
                {
                    works: '支架沉降', // 结构物
                    source: 'ZJ-01', // 警告源
                    rank: '1', // 警告等级
                    message: '超1级阀值告警', // 警告信息
                    number: '2', // 警告次数
                    time: '2018-02-06 12：00：00', // 告警时间
                },
                {
                    works: '土体位移',
                    source: 'LG-01',
                    rank: '1',
                    message: '超1级阀值告警',
                    number: '3',
                    time: '2018-02-06 12：00：00', 
                },
                {
                    works: '杆件倾角',
                    source: 'QJ-01',
                    rank: '1',
                    message: '超1级阀值告警',
                    number: '1',
                    time: '2018-02-06 12：00：00', 
                },
                {
                    works: '水平位移',
                    source: 'SP-01',
                    rank: '1',
                    message: '超1级阀值告警',
                    number: '4',
                    time: '2018-02-06 12：00：00', 
                },
            ], // 警报列表数据
            date1: '', // 支架沉降历史数据起止时间
            historyTableData1: [
                {
                    name: 'CJ-01', // 检测点
                    level: 0.5, // 支架沉降
                    status: 1, // 状态
                    time: '2019-10-10 19:19:19', // 时间
                },
                {
                    name: 'CJ-01',
                    level: 0.5,
                    status: 1,
                    time: '2019-10-10 19:19:19',
                },
                {
                    name: 'CJ-01',
                    level: 0.5,
                    status: 1,
                    time: '2019-10-10 19:19:19',
                },
                {
                    name: 'CJ-01',
                    level: 1.2,
                    status: 0,
                    time: '2019-10-10 19:19:19',
                },
                {
                    name: 'CJ-01',
                    level: 0.5,
                    status: 1,
                    time: '2019-10-10 19:19:19',
                },
                {
                    name: 'CJ-01',
                    level: 0.5,
                    status: 1,
                    time: '2019-10-10 19:19:19',
                },
                {
                    name: 'CJ-01',
                    level: 0.5,
                    status: 1,
                    time: '2019-10-10 19:19:19',
                },
            ], // 支架沉降历史数据列表
            date2: '', // 立杆轴力历史数据起止时间
            historyTableData2: [
                {
                    name: 'CJ-01', // 检测点
                    level: 0.5, // 立杆轴力
                    status: 1, // 状态
                    time: '2019-10-10 19:19:19', // 时间
                },
                {
                    name: 'CJ-01',
                    level: 0.5,
                    status: 1,
                    time: '2019-10-10 19:19:19',
                },
                {
                    name: 'CJ-01',
                    level: 0.5,
                    status: 1,
                    time: '2019-10-10 19:19:19',
                },
                {
                    name: 'CJ-01',
                    level: 1.2,
                    status: 0,
                    time: '2019-10-10 19:19:19',
                },
                {
                    name: 'CJ-01',
                    level: 0.5,
                    status: 1,
                    time: '2019-10-10 19:19:19',
                },
                {
                    name: 'CJ-01',
                    level: 0.5,
                    status: 1,
                    time: '2019-10-10 19:19:19',
                },
                {
                    name: 'CJ-01',
                    level: 0.5,
                    status: 1,
                    time: '2019-10-10 19:19:19',
                },
            ], // 立杆轴力历史数据列表
            date3: '', // 杆件倾角历史数据起止时间
            historyTableData3: [
                {
                    name: 'CJ-01', // 检测点
                    level: 0.5, // 杆件倾角
                    status: 1, // 状态
                    time: '2019-10-10 19:19:19', // 时间
                },
                {
                    name: 'CJ-01',
                    level: 0.5,
                    status: 1,
                    time: '2019-10-10 19:19:19',
                },
                {
                    name: 'CJ-01',
                    level: 0.5,
                    status: 1,
                    time: '2019-10-10 19:19:19',
                },
                {
                    name: 'CJ-01',
                    level: 1.2,
                    status: 0,
                    time: '2019-10-10 19:19:19',
                },
                {
                    name: 'CJ-01',
                    level: 0.5,
                    status: 1,
                    time: '2019-10-10 19:19:19',
                },
                {
                    name: 'CJ-01',
                    level: 0.5,
                    status: 1,
                    time: '2019-10-10 19:19:19',
                },
                {
                    name: 'CJ-01',
                    level: 0.5,
                    status: 1,
                    time: '2019-10-10 19:19:19',
                },
            ], // 杆件倾角历史数据列表
            date4: '', // 水平位移历史数据起止时间
            historyTableData4: [
                {
                    name: 'CJ-01', // 检测点
                    level: 0.5, // 水平位移
                    status: 1, // 状态
                    time: '2019-10-10 19:19:19', // 时间
                },
                {
                    name: 'CJ-01',
                    level: 0.5,
                    status: 1,
                    time: '2019-10-10 19:19:19',
                },
                {
                    name: 'CJ-01',
                    level: 0.5,
                    status: 1,
                    time: '2019-10-10 19:19:19',
                },
                {
                    name: 'CJ-01',
                    level: 1.2,
                    status: 0,
                    time: '2019-10-10 19:19:19',
                },
                {
                    name: 'CJ-01',
                    level: 0.5,
                    status: 1,
                    time: '2019-10-10 19:19:19',
                },
                {
                    name: 'CJ-01',
                    level: 0.5,
                    status: 1,
                    time: '2019-10-10 19:19:19',
                },
                {
                    name: 'CJ-01',
                    level: 0.5,
                    status: 1,
                    time: '2019-10-10 19:19:19',
                },
            ], // 水平位移历史数据列表
        }
    },
    mounted() {
        this.alarmChart()
        this.ifCart()
    },
    updated() {
        this.ifCart()
    },
    methods: {
        // 渲染塔吊预警占比图
        alarmChart() {
            let myChart = this.$echarts.init(
                document.getElementById("alarmChart")
            );
            myChart.setOption({
                color: [
                    "#ff7a81",
                    "#feb27e",
                    "#ffde2a"
                ],
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    x: "445px",
                    y: "75px",
                    itemWidth: 16, // 设置图例图形的宽
                    itemHeight: 16, // 设置图例图形的高
                    textStyle: {
                        fontSize: "16",
                        color: "#000"
                    },
                    data: ["一级预警", "二级预警", "三级预警"]
                },
                series: [
                    {
                        name: "预警占比",
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
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            { value: 0, name: "一级预警" },
                            { value: 0, name: "二级预警" },
                            { value: 0, name: "三级预警" },
                        ]
                    }
                ]
            })
        },

        // 支架沉降当日数据趋势图
        oneChart() {
            let oneChart = this.$echarts.init(
              document.getElementById("oneChart")
            )
            oneChart.setOption({
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
                        data: [
                          "00：00",
                          "04：00",
                          "08：00",
                          "12：00",
                          "16：00",
                          "20：00",
                        ],
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        min: 0,
                        interval: 0.1,
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
                        name: "支架沉降",
                        type: "line",
                        symbolSize: 10,
                        smooth: 0.2,
                        color: ["#0090ff"],
                        data: [0.6, 0.5, 0.5, 0.5, 0.4, 0.5]
                        // data: zcrs
                    },
                    // {
                    //     name: "考勤总人数",
                    //     type: "line",
                    //     symbolSize: 10,
                    //     smooth: 0.2,
                    //     color: ["#0090ff"],
                    //     // data: [300, 200, 100, 500, 300, 300, 400, 300, 100, 300],
                    //     data: kqrs
                    // },
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

        // 立杆轴力当日数据趋势图
        twoChart() {
            let twoChart = this.$echarts.init(
              document.getElementById("twoChart")
            )
            twoChart.setOption({
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
                        data: [
                          "00：00",
                          "04：00",
                          "08：00",
                          "12：00",
                          "16：00",
                          "20：00",
                        ],
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        min: 0,
                        interval: 1.5,
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
                        name: "立杆轴力",
                        type: "line",
                        symbolSize: 10,
                        smooth: 0.2,
                        color: ["#0090ff"],
                        data: [3.6, 4.5, 2.5, 3.5, 4.4, 3.5]
                        // data: zcrs
                    },
                ]
            });
        },

        // 杆件倾角当日数据趋势图
        threeChart() {
            let threeChart = this.$echarts.init(
              document.getElementById("threeChart")
            )
            threeChart.setOption({
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
                        data: [
                          "00：00",
                          "04：00",
                          "08：00",
                          "12：00",
                          "16：00",
                          "20：00",
                        ],
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        min: 0,
                        interval: 0.1,
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
                        name: "沉降",
                        type: "line",
                        symbolSize: 10,
                        smooth: 0.2,
                        color: ["#0090ff"],
                        data: [0.6, 0.5, 0.5, 0.5, 0.4, 0.5]
                        // data: zcrs
                    },
                ]
            });
        },

        // 水平位移当日数据趋势图
        fourChart() {
            let fourChart = this.$echarts.init(
              document.getElementById("fourChart")
            )
            fourChart.setOption({
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
                        data: [
                          "00：00",
                          "04：00",
                          "08：00",
                          "12：00",
                          "16：00",
                          "20：00",
                        ],
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        min: 0,
                        interval: 0.15,
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
                        name: "水平位移",
                        type: "line",
                        symbolSize: 10,
                        smooth: 0.2,
                        color: ["#0090ff"],
                        data: [0.26, 0.25, 0.35, 0.25, 0.14, 0.15]
                        // data: zcrs
                    },
                ]
            });
        },

        // 支架沉降历史数据图
        historyOne() {
            let historyOne = this.$echarts.init(
              document.getElementById("historyOne")
            )
            historyOne.setOption({
                grid: {
                    x: 50,
                    y: 30,
                    x2: 70,
                    y2: 30,
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
                        data: [
                          "2019-08-01 00：00",
                          "2019-08-01 04：00",
                          "2019-08-01 08：00",
                          "2019-08-01 12：00",
                          "2019-08-01 16：00",
                          "2019-08-01 20：00",
                        ],
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        min: 0,
                        interval: 0.1,
                        axisLabel: {
                            textStyle: {
                                color: "#000"
                            }
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
                        name: "支架沉降",
                        type: "line",
                        symbolSize: 10,
                        smooth: 0.2,
                        color: ["#0090ff"],
                        data: [0.6, 0.5, 0.5, 0.5, 0.4, 0.5]
                    }
                ]
            })
        },

        // 立杆轴力历史数据
        historyTwo() {
            let historyTwo = this.$echarts.init(
              document.getElementById("historyTwo")
            )
            historyTwo.setOption({
                grid: {
                    x: 50,
                    y: 30,
                    x2: 70,
                    y2: 30,
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
                        data: [
                          "00：00",
                          "04：00",
                          "08：00",
                          "12：00",
                          "16：00",
                          "20：00",
                        ],
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        min: 0,
                        interval: 1.5,
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
                        name: "立杆轴力",
                        type: "line",
                        symbolSize: 10,
                        smooth: 0.2,
                        color: ["#0090ff"],
                        data: [3.6, 4.5, 2.5, 3.5, 4.4, 3.5]
                        // data: zcrs
                    },
                ]
            })
        },

        // 杆件倾角历史数据
        historyThree() {
            let historyThree = this.$echarts.init(
              document.getElementById("historyThree")
            )
            historyThree.setOption({
                grid: {
                    x: 50,
                    y: 30,
                    x2: 70,
                    y2: 30,
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
                        data: [
                          "00：00",
                          "04：00",
                          "08：00",
                          "12：00",
                          "16：00",
                          "20：00",
                        ],
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        min: 0,
                        interval: 0.1,
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
                        name: "杆件倾角",
                        type: "line",
                        symbolSize: 10,
                        smooth: 0.2,
                        color: ["#0090ff"],
                        data: [0.6, 0.5, 0.5, 0.5, 0.4, 0.5]
                        // data: zcrs
                    },
                ]
            })
        },

        // 水平位移历史数据
        historyFour() {
            let historyFour = this.$echarts.init(
              document.getElementById("historyFour")
            )
            historyFour.setOption({
                grid: {
                    x: 50,
                    y: 30,
                    x2: 70,
                    y2: 30,
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
                        data: [
                          "00：00",
                          "04：00",
                          "08：00",
                          "12：00",
                          "16：00",
                          "20：00",
                        ],
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        min: 0,
                        interval: 0.15,
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
                        name: "水平位移",
                        type: "line",
                        symbolSize: 10,
                        smooth: 0.2,
                        color: ["#0090ff"],
                        data: [0.26, 0.25, 0.35, 0.25, 0.14, 0.15]
                        // data: zcrs
                    },
                ]
            })
        },

        // 渲染当前选中模块的ECharts图
        ifCart() {
            if (this.selectShow == 1 && !this.historyShow) {
                this.oneChart()
            }
            if (this.selectShow == 2 && !this.historyShow) {
                this.twoChart()
            }
            if (this.selectShow == 3 && !this.historyShow) {
                this.threeChart()
            }
            if (this.selectShow == 4 && !this.historyShow) {
                this.fourChart()
            }
            if (this.selectShow == 1 && this.historyShow) {
                this.historyOne()
            }
            if (this.selectShow == 2 && this.historyShow) {
                this.historyTwo()
            }
            if (this.selectShow == 3 && this.historyShow) {
                this.historyThree()
            }
            if (this.selectShow == 4 && this.historyShow) {
                this.historyFour()
            }
        },
    },
}
</script>