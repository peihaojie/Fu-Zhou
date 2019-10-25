<template>
    <div id="systemZhiHui_unloading">
        <div class="content">
            <!-- 顶部状态栏 -->
            <div class="top-status">
                <ul>
                    <li>
                        <div class="icon-box online"></div>
                        <div class="text-box">
                            <div class="top-text">在线卸料平台</div>
                            <div class="bottom-text">0</div>
                        </div>
                    </li>
                    <li>
                        <div class="icon-box offline"></div>
                        <div class="text-box">
                            <div class="top-text">离线卸料平台</div>
                            <div class="bottom-text">1</div>
                        </div>
                    </li>
                    <li>
                        <div class="icon-box alarm"></div>
                        <div class="text-box">
                            <div class="top-text">报警统计</div>
                            <div class="bottom-text">0</div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 主体 -->
            <div class="main-box">
                <!-- 设备列表 -->
                <div class="equipment-list">
                    <div class="title">
                        布吉污水清理项目
                    </div>
                    <div class="list-head">
                        <span style="width:2.54rem">设备编号</span>
                        <span>状态</span>
                    </div>
                    <div class="list-body">
                        <ul>
                            <!-- <li>
                                <span style="width:2.54rem">布吉河流项目001</span>
                                <span class="green">
                                    <i class="dot"></i>
                                    运行中
                                </span>
                            </li> -->
                            <li>
                                <span style="width:2.54rem">1号卸料平台</span>
                                <span class="red">
                                    <i class="dot"></i>
                                    未运行
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 实时数据 -->
                <div class="real-time">
                    <!-- 实时数据 -->
                    <div class="top-box">
                        <div class="title">实时数据</div>
                        <div class="border-box">
                            <div class="text-box">
                                <div class="top-text">60t</div>
                                <div class="bottom-text">平台载重</div>
                            </div>
                        </div>
                        <div class="status">
                            <ul>
                                <li>
                                    <div class="top-text">幅度</div>
                                    <div class="bottom-text">2M</div>
                                    <div class="color-box"></div>
                                </li>
                                <li>
                                    <div class="top-text">主绳</div>
                                    <div class="bottom-text">正常</div>
                                    <div class="color-box"></div>
                                </li>
                                <li>
                                    <div class="top-text">副绳</div>
                                    <div class="bottom-text">正常</div>
                                    <div class="color-box"></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 预警统计 -->
                    <div class="bottom-box">
                        <div class="title">卸料预警汇总统计</div>
                        <div class="top-box">
                            <div style="background-color:#0090ff;">
                                <div class="name">载重报警</div>
                                <div class="num">
                                    <span>0</span>
                                    次
                                </div>
                            </div>
                            <div style="background-color:#3ada76;">
                                <div class="name">幅度报警</div>
                                <div class="num">
                                    <span>0</span>
                                    次
                                </div>
                            </div>
                        </div>
                        <div class="bottom-box">
                            <div style="background-color:#ffb079;">
                                <div class="name">主线报警</div>
                                <div class="num">
                                    <span>0</span>
                                    次
                                </div>
                            </div>
                            <div style="background-color:#0090ff;">
                                <div class="name">副线报警</div>
                                <div class="num">
                                    <span>0</span>
                                    次
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 历史记录 -->
                <div class="history-box">
                    <div class="btn-box">
                        <a class="date">
                            <i class="icon"></i>
                            选择时间
                        </a>
                        <a class="cut">
                            <i class="icon"></i>
                            选择状态
                        </a>
                        <a class="derive">
                            <i class="icon"></i>
                            导出Excel
                        </a>
                    </div>
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
                            prop="load"
                            label="载重"
                            width="80">
                            </el-table-column>
                            <el-table-column
                            prop="range"
                            label="幅度"
                            width="80">
                            </el-table-column>
                            <el-table-column
                            prop="mainRope"
                            label="主绳"
                            width="80">
                            </el-table-column>
                            <el-table-column
                            prop="deputyRope"
                            label="副绳"
                            width="80">
                            </el-table-column>
                            <el-table-column
                            prop="status"
                            label="状态"
                            width="80">
                            <template slot-scope="scope">
                                <div :style="scope.row.status==0?'color:#58de87;':'color:#ff8889;'">
                                    {{ scope.row.status==0?'合格':scope.row.status==1?'不合格':'' }}
                                </div>
                            </template>
                            </el-table-column>
                            <el-table-column
                            prop="time"
                            label="时间">
                            </el-table-column>
                        </el-table>
                    </div>
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
        </div>
    </div>
</template>

<style lang="less">
    #systemZhiHui_unloading {
        width: 100%;
        .content {
            border-radius: .04rem;
            background-color: #fff;
            box-shadow: 0 0 .5rem -.3rem #666;
            .top-status {
                height: 1.1rem;
                border-bottom: .1rem solid #f7f7f7;
                ul {
                    display: flex;
                    justify-content: space-between;
                    padding: 0 2.12rem;
                    li {
                        .icon-box {
                            width: .58rem;
                            height: 1rem;
                            margin-right: .2rem;
                            vertical-align: top;
                            display: inline-block;
                            background-position: center center;
                            background-repeat: no-repeat;
                            background-size: contain;
                            &.online {
                                background-image: url('../../../../static/images/online-unloading.png');
                            }
                            &.offline {
                                background-image: url('../../../../static/images/offline-unloading.png');
                            }
                            &.alarm {
                                background-image: url('../../../../static/images/systemZhiHui-alertor.png');
                            }
                        }
                        .text-box {
                            color: #303030;
                            vertical-align: top;
                            padding-top: .18rem;
                            display: inline-block;
                            .top-text {
                                font-size: .18rem;
                            }
                            .bottom-text {
                                margin-top: .1rem;
                                font-size: .26rem;
                                font-weight: bolder;
                            }
                        }
                    }
                }
            }
            .main-box {
                display: flex;
                height: 8.4rem;
                .equipment-list {
                    width: 4.1rem;
                    border-right: .1rem solid #f7f7f7;
                    .title {
                        height: .51rem;
                        font-size: .18rem;
                        line-height: .5rem;
                        color: #0090ff;
                        border-left: .04rem solid #0090ff;
                        border-bottom: .01rem solid #f7f7f7;
                        padding-left: .26rem;
                    }
                    .list-head {
                        height: .51rem;
                        color: #4a4a4a;
                        font-size: .18rem;
                        line-height: .5rem;
                        padding-left: .26rem;
                        border-bottom: .01rem solid #f7f7f7;
                        display: flex;
                        justify-content: flex-start;
                    }
                    .list-body {
                        ul {
                            li {
                                height: .51rem;
                                color: #4a4a4a;
                                font-size: .18rem;
                                line-height: .5rem;
                                padding-left: .26rem;
                                border-bottom: .01rem solid #f7f7f7;
                                display: flex;
                                justify-content: flex-start;
                                .dot {
                                    width: .08rem;
                                    height: .08rem;
                                    border-radius: .08rem;
                                    display: inline-block;
                                    vertical-align: middle;
                                }
                                .green {
                                    color: #3ada76;
                                    .dot {
                                        background-color: #3ada76;
                                    }
                                }
                                .red {
                                    color: #ff7a81;
                                    .dot {
                                        background-color: #ff7a81;
                                    }
                                }
                            }
                        }
                    }
                }
                .real-time {
                    width: 5.67rem;
                    border-right: .1rem solid #f7f7f7;
                    >.top-box {
                        height: 4.98rem;
                        padding-top: .25rem;
                        border-bottom: .1rem solid #f7f7f7;
                        .title {
                            color: #4a4a4a;
                            font-size: .18rem;
                            padding-left: .25rem;
                            font-weight: bolder;
                        }
                        .border-box {
                            width: 2.48rem;
                            height: 2.48rem;
                            // border-radius: 2.48rem;
                            // border: .01rem solid #3ada76;
                            margin: 0 auto;
                            margin-top: .25rem;
                            position: relative;
                            background-image: url('../../../../static/images/systemGreen-circle.png');
                            background-position: center center;
                            background-repeat: no-repeat;
                            background-size: contain;
                            .text-box {
                                width: 1.92rem;
                                height: 1.92rem;
                                border-radius: 1.92rem;
                                // background-color: #3ada76;
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%,-50%);
                                color: #fff;
                                text-align: center;
                                padding-top: .58rem;
                                .top-text {
                                    font-size: .34rem;
                                    font-weight: bolder;
                                }
                                .bottom-text {
                                    font-size: .28rem;
                                    margin-top: .2rem;
                                    font-weight: bolder;
                                }
                            }
                        }
                        .status {
                            margin-top: .3rem;
                            ul {
                                display: flex;
                                padding: 0 .28rem;
                                justify-content: space-between;
                                li {
                                    height: 1rem;
                                    width: 1.4rem;
                                    border-radius: .04rem;
                                    background-color: #f7f7f7;
                                    padding: 0 .2rem;
                                    color: #4a4a4a;
                                    padding-top: .07rem;
                                    .top-text {
                                        font-size: .22rem;
                                        text-align: center;
                                    }
                                    .bottom-text {
                                        font-size: .16rem;
                                        text-align: center;
                                        margin-top: .08rem;
                                    }
                                    .color-box {
                                        height: .2rem;
                                        margin-top: .08rem;
                                        background-color: #3ada76;
                                    }
                                }
                            }
                        }
                    }
                    >.bottom-box {
                        padding-top: .25rem;
                        .title {
                            color: #4a4a4a;
                            font-size: .18rem;
                            padding-left: .25rem;
                            font-weight: bolder;
                        }
                        .top-box {
                            width: 3.06rem;
                            margin: 0 auto;
                            margin-top: .3rem;
                            display: flex;
                            justify-content: space-between;
                            >div {
                                color: #fff;
                                height: .81rem;
                                width: 1.43rem;
                                border-radius: .04rem;
                                padding-top: .1rem;
                                .name {
                                    font-size: .16rem;
                                    text-align: center;
                                    font-weight: bolder;
                                }
                                .num {
                                    font-size: .14rem;
                                    text-align: center;
                                    font-weight: bolder;
                                    >span {
                                        font-size: .2rem;
                                    }
                                }
                            }
                        }
                        .bottom-box {
                            width: 3.06rem;
                            margin-top: .22rem;
                            margin: 0 auto;
                            margin-top: .3rem;
                            display: flex;
                            justify-content: space-between;
                            >div {
                                color: #fff;
                                height: .81rem;
                                width: 1.43rem;
                                border-radius: .04rem;
                                padding-top: .1rem;
                                .name {
                                    font-size: .16rem;
                                    text-align: center;
                                    font-weight: bolder;
                                }
                                .num {
                                    font-size: .14rem;
                                    text-align: center;
                                    font-weight: bolder;
                                    >span {
                                        font-size: .2rem;
                                    }
                                }
                            }
                        }
                    }
                }
                .history-box {
                    flex: 1;
                    .btn-box {
                        height: .8rem;
                        padding: 0 1.4rem;
                        padding-top: .2rem;
                        border-bottom: .1rem solid #f7f7f7;
                        a {
                            float: left;
                            height: .3rem;
                            color: #0090ff;
                            font-size: .14rem;
                            transition: all .5s;
                            line-height: .28rem;
                            border-radius: .02rem;
                            padding-right: .09rem;
                            margin-left: .2rem;
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
                        .date {
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
                    }
                    .table-box {
                        width: 100%;
                        padding: 0 .2rem;
                        margin-top: .2rem;
                        min-height: 6.4rem;
                        .el-table {
                            width: 6.5rem;
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
                            // margin: 0 auto;
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
            pageSize: 10, // 每页条数
            pageNum: 1, // 当前页
            pageTotal: 2, // 总条数
            tableData: [
                {
                    load: '20t', // 载重
                    range: '2M', // 幅度
                    mainRope: '正常', // 主绳
                    deputyRope: '正常', // 副绳
                    status: 0, // 状态
                    time: '9-11 09:11', // 时间
                },
                {
                    load: '100t', // 载重
                    range: '2M', // 幅度
                    mainRope: '正常', // 主绳
                    deputyRope: '正常', // 副绳
                    status: 1, // 状态
                    time: '9-11 11:11', // 时间
                },
            ], // 历史记录列表
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页${val}条`)
        },

        // 当前页
        handleCurrentChange(val) {
            console.log(`当前页：${val}`)
        },

        // 序号
        indexMethod(index) {
            return (this.pageNum-1)*this.pageSize+index+1
        },
    }
}
</script>