<template>
    <div id="systemLiangZhi_reward_category">
        <div class="content">
            <!-- 按钮 -->
            <div class="btn-box">
                <a class="new" @click="dialogShow=true">
                    <i class="icon"></i>
                    新增
                </a>
            </div>
            <!-- 列表 -->
            <div class="main-box">
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
                        label="类别名称">
                        </el-table-column>
                        <el-table-column
                        label="奖/罚"
                        width="150">
                        <template slot-scope="scope">
                            <div :style="scope.row.type==1?'color:#38c97a':'color:#fd6c39'">
                                {{ scope.row.type==1?'奖':'罚' }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="奖惩金额"
                        width="150">
                        <template slot-scope="scope">
                            <div :style="scope.row.money>0?'color:#38c97a':'color:#fd6c39'">
                                {{ scope.row.money }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="操作">
                        <template>
                            <a>编辑</a>
                        </template>
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
            <!-- 新增奖惩类别  -->
            <div class="dialog-box" v-show="dialogShow">
                <div class="title">
                    新增奖罚类别
                    <a class="close">
                        <i class="el-icon-close" @click="dialogShow=false"></i>
                    </a>
                </div>
                <div class="form">
                    <ul>
                        <li>
                            <span>
                                类别名称
                                <div class="required">*</div>
                            </span>
                            <input type="text">
                        </li>
                        <li>
                            <span>
                                奖罚类别
                                <div class="required">*</div>
                            </span>
                            <input type="text">
                        </li>
                        <li>
                            <span>
                                奖罚金额
                                <div class="required">*</div>
                            </span>
                            <input type="text">
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button">确认</a>
                </div>
            </div>
            <!-- 遮罩层 -->
            <div class="shade-box" v-show="dialogShow || examineShow"></div>
        </div>
    </div>
</template>

<style lang="less">
    #systemLiangZhi_reward_category {
        width: 100%;
        .content {
            width: 100%;
            // height: 9.45rem;
            background-color: #fff;
            box-shadow: 0 0 0.5rem -0.3rem #666;
            border-radius: 0.04rem;
            .btn-box {
                height: .7rem;
                padding: 0 .2rem;
                padding-top: .2rem;
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
            }
            .main-box {
                .table-box {
                    width: 100%;
                    // margin-top: .2rem;
                    min-height: 5.6rem;
                    padding: 0 .2rem;
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
                                a {
                                    font-size: 0.14rem;
                                    color: #2323ff;
                                    border-bottom: 1px solid #2323ff;
                                    &:hover {
                                        font-size: 0.14rem;
                                        color: #4545c5;
                                        border-bottom: 1px solid #4545c5;

                                    }
                                }
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
                    height: .52rem;
                    margin-top: .2rem;
                    padding: 0 .2rem;
                    padding-bottom: .2rem;
                    .el-pagination {
                        float: right;
                    }
                }
            }
            .dialog-box {
                left: 50%;
                top: 2rem;
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
                    width: 100%;
                    // height: 5.6rem;
                    // padding-left: .43rem;
                    padding-bottom: .3rem;
                    ul{
                        flex: 1;
                        position: relative;
                        li {
                            display: flex;
                            height: .71rem;
                            padding-top: .3rem;
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
                                width: 4rem;
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
                                width: 2.8rem;
                                height: .41rem;
                                input {
                                    padding-left: .3rem;
                                }
                                .el-input__icon {
                                    display: none;
                                }
                                .el-input__inner {
                                    padding-left: .1rem;
                                }
                            }
                            
                        }
                        .uploading {
                            height: 2.72rem;
                            padding-top: 0;
                            > a {
                                width: 6.24rem;
                                margin: 0 auto;
                                height: 2.72rem;
                                border: .01rem solid #7b7b7b;
                                font-size: .18rem;
                                border-radius: .1rem;
                                color: #cbcbcb;
                                line-height: 2.7rem;
                                text-align: center;
                            }
                        }
                        .picture {
                            width: 2.5rem;
                            height: 1.49rem;
                            span {
                                width: 1.3rem;
                                vertical-align: top;
                            }
                            a {
                                width: 1.19rem;
                                height: 1.19rem;
                                font-size: .2rem;
                                color: #b6b5b5;
                                text-align: center;
                                line-height: 1.17rem;
                                display: inline-block;
                                border: .01rem dashed #b6b5b5;
                            }
                            img {
                                width: 1.19rem;
                                height: 1.19rem;
                                line-height: 1.17rem;
                                display: inline-block;
                                cursor: pointer;
                            }
                        }
                        .check-box {
                            width: 9.52rem;
                            height: .78rem;
                            .el-checkbox-group {
                                width: 100%;
                                display: flex;
                                flex-wrap: wrap;
                                >label {
                                    margin: 0;
                                    width: 3.15rem;
                                    height: .48rem;
                                    font-size: .16rem;
                                    padding-left: .6rem;
                                    // text-align: center;
                                }
                            }
                        }
                        .line {
                            height: .31rem;
                            width: 12.02rem;
                            transform: translateX(-2.5rem);
                            border-bottom: .01rem dashed #b6b5b5;
                        }
                        .all {
                            >div {
                                width: 9.04rem;
                                input {
                                    width: 7.32rem;
                                }
                            }
                        }
                    }
                }
                .confirm {
                    height: .8rem;
                    background-color: #f8f8f8;
                    border-top: .01rem solid #dedede;
                    position: relative;
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
                    .public-box {
                        top: 50%;
                        right: 3.5rem;
                        transform: translateY(-50%);
                        position: absolute;
                        .el-checkbox__label {
                            font-size: .16rem;
                        }
                    }
                }
                .table-box {
                    width: 100%;
                    margin-top: .3rem;
                    min-height: 4rem;
                    padding: 0 .42rem;
                    .el-table {
                        
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
                            .el-button {
                                span {
                                    font-size: 0.14rem;
                                    color: #2323ff;
                                    border-bottom: 1px solid #2323ff;
                                }
                                &:hover {
                                    span {
                                        font-size: 0.14rem;
                                        color: #4545c5;
                                        border-bottom: 1px solid #4545c5;
                                    }
                                }
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
                    height: .62rem;
                    margin-top: .2rem;
                    padding: 0 .42rem;
                    padding-bottom: .3rem;
                    .el-pagination {
                        float: right;
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
            pageNum: 1, // 当前页
            pageSize: 15, // 每页条数
            pageTotal: 2, // 总条数
            dialogShow: false, // 对话框状态
            examineShow: false, // 编辑对话框状态
            tableData: [
                {
                    name: '比赛获奖', // 类别名称
                    type: 1, // 奖/罚
                    money: 100, // 金额
                },
                {
                    name: '扰乱秩序',
                    type: 0,
                    money: -100,
                },
            ]
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