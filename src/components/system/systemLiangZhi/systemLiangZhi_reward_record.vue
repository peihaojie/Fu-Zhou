<template>
    <div id="systemLiangZhi_reward_record">
        <div class="content">
            <!-- 搜索栏 -->
            <div class="search-box">
                <div class="left-box">
                    <ul class="top-input">
                        <li>
                            <span>奖罚类型：</span>
                            <input type="text">
                        </li>
                        <li>
                            <span>奖罚类别：</span>
                            <input type="text">
                        </li>
                        <li>
                            <span>&#12288;&#12288;时间：</span>
                            <input type="text">
                        </li>
                        <li>
                            <span>&#12288;&#12288;工种：</span>
                            <input type="text">
                        </li>
                    </ul>
                    <ul class="bottom-input">
                        <li>
                            <span>参建单位：</span>
                            <input type="text">
                        </li>
                        <li class="date">
                            <span>搜索姓名：</span>
                            <input type="text">
                        </li>
                        <li style="width:3.5rem"></li>
                        <li style="width:3.5rem"></li>
                    </ul>
                </div>
                <a class="search-button">搜索</a>
            </div>
            <!-- 主体区域 -->
            <div class="main-box">
                <!-- 功能栏 -->
                <div class="button-box">
                    <!-- <a class="delete">
                        <i class="icon"></i>
                        删除
                    </a> -->
                    <a class="derive">
                        <i class="icon"></i>
                        导出
                    </a>
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
                        width="100"
                        :index="indexMethod">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="姓名"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        prop="num"
                        label="工号"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        prop="company"
                        label="所属参建单位"
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="team"
                        label="所属班组"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="typeWork"
                        label="工种"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="rewardType"
                        label="奖罚类别"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="money"
                        label="奖罚金额"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="date"
                        label="奖罚日期">
                        </el-table-column>
                        <el-table-column
                        prop="reason"
                        label="奖罚事由">
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 分页 -->
                <div class="paging-box">
                    <!-- @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" -->
                    <el-pagination
                        :current-page="pageNum"
                        :page-sizes="[15, 30, 45]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageTotal">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    #systemLiangZhi_reward_record {
        width: 100%;
        .content {
            border-radius: .04rem;
            background-color: #fff;
            box-shadow: 0 0 .5rem -.3rem #666;
            .search-box {
                height: 1.5rem;
                padding: 0 .2rem;
                position: relative;
                border-bottom: .1rem solid #f7f7f7;
                .left-box {
                    float: left;
                    width: 100%;
                    height: 1.4rem;
                    padding-top: .2rem;
                    ul {
                        width: 100%;
                        height: .4rem;
                        display: flex;
                        justify-content: space-between;
                        li {
                            height: .4rem;
                            div {
                                height: .4rem;
                            }
                            span {
                                float: left;
                                height: .4rem;
                                font-size: .18rem;
                                line-height: .4rem;
                            }
                            input {
                                float: left;
                                width: 2.6rem;
                                height: .4rem;
                                padding-left: .1rem;
                                border-radius: .02rem;
                                vertical-align: middle;
                                border: .01rem solid #b6b6b6;
                            }
                        }
                        .date {
                            .el-date-editor {
                                width: 2.6rem;
                                height: .4rem;
                                overflow: hidden;
                                border: .01rem solid #b6b6b6;
                                span {
                                    padding: 0;
                                    width: .28rem;
                                    padding-left: .1rem;
                                }
                                input {
                                    border: 0;
                                    width: .95rem;
                                }
                            }
                        }
                    }
                    .bottom-input {
                        margin-top: .2rem;
                    }
                }
                .search-button {
                    top: .8rem;
                    right: .2rem;
                    color: #fff;
                    height: .4rem;
                    width: 1.63rem;
                    font-size: .2rem;
                    text-align: center;
                    position: absolute;
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
            .main-box {
                padding: .2rem .2rem .25rem .2rem;
                .button-box {
                    height: .3rem;
                    a {
                        float: left;
                        height: .3rem;
                        color: #0090ff;
                        font-size: .14rem;
                        transition: all .5s;
                        margin-right: .2rem;
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
                    .delete {
                        .icon {
                            background-image: url('../../../../static/images/system-delete.png');
                        }
                        &:hover {
                            .icon {
                                background-image: url('../../../../static/images/system-deleteHover.png');
                            }
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
                }
                .table-box {
                    width: 100%;
                    margin-top: .2rem;
                    min-height: 5.6rem;
                    .el-table {
                        width: 16.28rem;
                        // width: 100%;
                        overflow: visible;
                        .el-table__body-wrapper {
                            overflow: visible;
                        }
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
                            .table-button {
                                color: #0090ff;
                                padding: 0 .08rem;
                                text-decoration: underline;
                                &:hover {
                                    img {
                                        width: 2rem;
                                        height: 2rem;
                                    }
                                }
                            }
                            img {
                                width: 0;
                                height: 0;
                                position: absolute;
                                z-index: 200;
                                left: -2rem;
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
</style>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                    name: '阳建军', // 姓名
                    num: 10000001, // 工号
                    company: '深圳市国为建筑安装有限公司', // 所属参建单位
                    team: '国为1班', // 所属班组
                    typeWork: '普工', // 工种
                    rewardType: '罚', // 奖罚类别
                    money: -100, // 奖罚金额
                    date: '2019-07-09', // 奖罚日期
                    reason: '扰乱秩序', // 奖罚事由
                },
            ], // 列表数据
            pageNum: 1, // 当前页
            pageSize: 15, // 每页显示条数
            pageTotal: 2, // 总条数
        }
    },
    methods: {
        // 序号
        indexMethod(index) {
            return (this.pageNum-1)*this.pageSize+index+1
        },
    }
}
</script>