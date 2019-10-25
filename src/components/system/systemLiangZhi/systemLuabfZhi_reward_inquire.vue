<template>
    <div id="systemLuabfZhi_reward_inquire">
        <div class="content">
            <!-- 搜索栏 -->
            <div class="search-box">
                <div class="left-box">
                    <ul>
                        <li>
                            <span>参建单位名称：</span>
                            <input type="text">
                        </li>
                        <li>
                            <span class="margin">班组名称：</span>
                            <input type="text">
                        </li>
                        <li>
                            <span class="margin">人员名称：</span>
                            <input type="text">
                        </li>
                    </ul>
                </div>
                <a class="search-button">搜索</a>
            </div>
            <!-- 主体区域 -->
            <div class="main-box">
                <!-- 功能栏 -->
                <div class="button-box">
                    <a class="new" @click="dialogShow=true">
                        <i class="icon"></i>
                        批量奖罚
                    </a>
                    <!-- <a class="compile">
                        <i class="icon"></i>
                        批量惩罚
                    </a> -->
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
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="profession"
                        label="工种"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        label="是否班组长"
                        width="200">
                        <template slot-scope="scope">
                            {{ scope.row.group==1?'是':'否'}}
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="状态">
                        <template slot-scope="scope">
                            <div :style="scope.row.state==1?'color:#04c366':scope.row.state==2?'color:#ffd14f':'color:#fd5101'">
                                {{ scope.row.state==1?'在场':scope.row.state==2?'待进场':'离场'}}
                            </div>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 分页 -->
                <div class="paging-box">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="[15, 30, 45]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageTotal">
                    </el-pagination>
                </div>
            </div>
            <!-- 新增单位 -->
            <div class="dialog-box" v-show="dialogShow">
                <div class="title">
                    新增奖罚
                    <a class="close" @click="dialogShow=false">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <div class="list-box">
                        <ul>
                            <li class="first-active">
                                已选待奖惩人员
                            </li>
                        </ul>
                        <ul>
                            <li class="first-name">
                                姓名
                            </li>
                        </ul>
                    </div>
                    <div class="input-box">
                        <ul>
                            <li>
                                <div>
                                    <span>
                                        奖罚类型
                                        <div class="required">*</div>
                                    </span>
                                    <input type="text" v-model="constructionName">
                                </div>
                            </li>
                            <li>
                                <div>
                                    <span>
                                        奖罚金额
                                        <div class="required">*</div>
                                    </span>
                                    <input type="text" v-model="constructionName">
                                </div>
                            </li>
                            <li>
                                <div>
                                    <span>
                                        奖罚日期
                                        <div class="required">*</div>
                                    </span>
                                    <input type="text" v-model="constructionName">
                                </div>
                            </li>
                            <li>
                                <div>
                                    <span>
                                        奖罚说明
                                    </span>
                                    <input type="text" v-model="constructionName">
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="confirm">
                    <a class="button">确定</a>
                </div>
            </div>
            <!-- 遮罩层 -->
            <div class="shade-box" v-show="dialogShow"></div>
        </div>
    </div>
</template>

<style lang="less">
    #systemLuabfZhi_reward_inquire {
        width: 100%;
        .content {
            border-radius: .04rem;
            background-color: #fff;
            box-shadow: 0 0 .5rem -.3rem #666;
            .search-box {
                height: .9rem;
                padding: 0 .2rem;
                border-bottom: .1rem solid #f7f7f7;
                .left-box {
                    float: left;
                    height: .8rem;
                    ul {
                        li {
                            float: left;
                            margin-right: .35rem;
                            span {
                                float: left;
                                height: .8rem;
                                font-size: .18rem;
                                line-height: .8rem;
                            }
                            input {
                                float: left;
                                width: 2.6rem;
                                height: .4rem;
                                margin-top: .2rem;
                                padding-left: .1rem;
                                border-radius: .02rem;
                                vertical-align: middle;
                                border: .01rem solid #b6b6b6;
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
                    margin-top: .2rem;
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
                    .new {
                        .icon {
                            background-image: url('../../../../static/images/system-new.png');
                        }
                        &:hover {
                            .icon {
                                background-image: url('../../../../static/images/system-newHover.png');
                            }
                        }
                    }
                    .compile {
                        .icon {
                            background-image: url('../../../../static/images/system-compile.png');
                        }
                        &:hover {
                            .icon {
                                background-image: url('../../../../static/images/system-compileHover.png');
                            }
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
            .dialog-box {
                left: 50%;
                top: .22rem;
                z-index: 200;
                width: 8.51rem;
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
                    .list-box {
                        width: 2.35rem;
                        height: 3.51rem;
                        display: inline-block;
                        border-right: .01rem solid #dedede;
                        overflow: auto;
                        ul {
                            li {
                                height: .35rem;
                                color: #4a4a4a;
                                font-size: .16rem;
                                line-height: .35rem;
                                padding-left: .22rem;
                                a {
                                    display: block;
                                    color: #4a4a4a;
                                    font-size: .16rem;
                                }
                                &.first-active {
                                    color: #0090ff;
                                    background-color: #c5e8ff;
                                }
                                &.first-name {
                                    background-color: #f9f9f9;
                                }
                            }
                        }
                    }
                    .input-box {
                        vertical-align: top;
                        display: inline-block;
                        ul{
                            li {
                                display: flex;
                                height: .71rem;
                                padding-top: .3rem;
                                >div {
                                    width: 5.38rem;
                                    >span {
                                        width: 1.72rem;
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
                                    input {
                                        width: 3.66rem;
                                        height: .41rem;
                                        padding-left: .1rem;
                                        border-radius: .02rem;
                                        border: .01rem solid #b1b1b1;
                                        &::-webkit-outer-spin-button,
                                        &::-webkit-inner-spin-button {
                                            appearance: none;
                                        }
                                        &[type="number"] {
                                            appearance: textfield;
                                        }
                                    }
                                    .el-date-editor {
                                        width: 3.66rem;
                                        height: .41rem;
                                        input {
                                            padding-left: .3rem;
                                        }
                                    }
                                }
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
export default {
    data() {
        return {
            tableData: [
                {
                    name: '阳建军', // 姓名
                    num: '10000001', // 工号
                    company: '深圳市国为建筑安装有限公司', // 所属参建单位
                    team: '国为1班', // 所属班组
                    profession: '普工', // 工种
                    group: 0, // 是否班组长
                    state: 1, // 状态
                },
                {
                    name: '陈志民',
                    num: '10000002',
                    company: '深圳市国为建筑安装有限公司',
                    team: '国为1班',
                    profession: '普工',
                    group: 0,
                    state: 1
                },
                {
                    name: '欧成标',
                    num: '10000003',
                    company: '深圳市国为建筑安装有限公司',
                    team: '国为1班',
                    profession: '普工',
                    group: 0,
                    state: 1
                },
                {
                    name: '周鹏',
                    num: '10000004',
                    company: '深圳市国为建筑安装有限公司',
                    team: '国为1班',
                    profession: '普工',
                    group: 0,
                    state: 1
                },
                {
                    name: '陈为安',
                    num: '10000005',
                    company: '深圳市国为建筑安装有限公司',
                    team: '国为1班',
                    profession: '普工',
                    group: 0,
                    state: 1
                }
            ], // 列表数据
            dialogShow: false, // 对话框显示状态
            pageNum: 1, // 当前页
            pageSize: 15, // 每页条数
            pageTotal: 5, // 总条数
        }
    },
    created() {

    },
    methods: {
        // 序号
        indexMethod(index) {
            return (this.pageNum-1)*this.pageSize+index+1
        },

        // 每页条数切换
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`)
            this.pageSize = val
        },

        // 当前页
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`)
            this.pageNum = val
        },
    }
}
</script>