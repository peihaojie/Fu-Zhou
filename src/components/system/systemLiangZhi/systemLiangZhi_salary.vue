<template>
    <div id="systemLiangZhi_salary">
        <div class="content">
            <!-- 搜索栏 -->
            <div class="search-box">
                <div class="left-box">
                    <ul class="top-input">
                        <li>
                            <span>&#12288;&#12288;姓名：</span>
                            <input type="text">
                        </li>
                        <li>
                            <span>所属单位：</span>
                            <input type="text">
                        </li>
                        <li>
                            <span>&#12288;&#12288;工种：</span>
                            <input type="text">
                        </li>
                        <li>
                            <span>&#12288;&#12288;时间：</span>
                            <input type="text" >
                        </li>
                    </ul>
                    <ul class="bottom-input">
                        <li>
                            <span>资料属性：</span>
                            <input type="text">
                        </li>
                        <li>
                            <span>在场状态：</span>
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
                        width="100">
                        </el-table-column>
                        <el-table-column
                        label="1月"
                        width="60">
                        <template slot-scope="scope">
                            <div style="text-align:center;">
                                <i style="font-size:.2rem;font-weight: bolder;" :style="scope.row.Jan==1?'color:#1fc976;':'color:#fd5101;'" :class="scope.row.Jan==1?'el-icon-check':'el-icon-close'"></i>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="2月"
                        width="60">
                        <template slot-scope="scope">
                            <div style="text-align:center;">
                                <i style="font-size:.2rem;font-weight: bolder;" :style="scope.row.Feb==1?'color:#1fc976;':'color:#fd5101;'" :class="scope.row.Feb==1?'el-icon-check':'el-icon-close'"></i>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="3月"
                        width="60">
                        <template slot-scope="scope">
                            <div style="text-align:center;">
                                <i style="font-size:.2rem;font-weight: bolder;" :style="scope.row.Mar==1?'color:#1fc976;':'color:#fd5101;'" :class="scope.row.Mar==1?'el-icon-check':'el-icon-close'"></i>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="4月"
                        width="60">
                        <template slot-scope="scope">
                            <div style="text-align:center;">
                                <i style="font-size:.2rem;font-weight: bolder;" :style="scope.row.Apr==1?'color:#1fc976;':'color:#fd5101;'" :class="scope.row.Apr==1?'el-icon-check':'el-icon-close'"></i>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="5月"
                        width="60">
                        <template slot-scope="scope">
                            <div style="text-align:center;">
                                <i style="font-size:.2rem;font-weight: bolder;" :style="scope.row.May==1?'color:#1fc976;':'color:#fd5101;'" :class="scope.row.May==1?'el-icon-check':'el-icon-close'"></i>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="6月"
                        width="60">
                        <template slot-scope="scope">
                            <div style="text-align:center;">
                                <i style="font-size:.2rem;font-weight: bolder;" :style="scope.row.June==1?'color:#1fc976;':'color:#fd5101;'" :class="scope.row.June==1?'el-icon-check':'el-icon-close'"></i>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="7月"
                        width="60">
                        <template slot-scope="scope">
                            <div style="text-align:center;">
                                <i style="font-size:.2rem;font-weight: bolder;" :style="scope.row.July==1?'color:#1fc976;':'color:#fd5101;'" :class="scope.row.July==1?'el-icon-check':'el-icon-close'"></i>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="8月"
                        width="60">
                        <template slot-scope="scope">
                            <div style="text-align:center;">
                                <i style="font-size:.2rem;font-weight: bolder;" :style="scope.row.Aug==1?'color:#1fc976;':'color:#fd5101;'" :class="scope.row.Aug==1?'el-icon-check':'el-icon-close'"></i>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="9月"
                        width="60">
                        <template slot-scope="scope">
                            <div style="text-align:center;">
                                <i style="font-size:.2rem;font-weight: bolder;" :style="scope.row.Sept==1?'color:#1fc976;':'color:#fd5101;'" :class="scope.row.Sept==1?'el-icon-check':'el-icon-close'"></i>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="10月"
                        width="60">
                        <template slot-scope="scope">
                            <div style="text-align:center;">
                                <i style="font-size:.2rem;font-weight: bolder;" :style="scope.row.Oct==1?'color:#1fc976;':'color:#fd5101;'" :class="scope.row.Oct==1?'el-icon-check':'el-icon-close'"></i>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="11月"
                        width="60">
                        <template slot-scope="scope">
                            <div style="text-align:center;">
                                <i style="font-size:.2rem;font-weight: bolder;" :style="scope.row.Nov==1?'color:#1fc976;':'color:#fd5101;'" :class="scope.row.Nov==1?'el-icon-check':'el-icon-close'"></i>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="12月"
                        width="60">
                        <template slot-scope="scope">
                            <div style="text-align:center;">
                                <i style="font-size:.2rem;font-weight:bolder;" :style="scope.row.Dec==1?'color:#1fc976;':'color:#fd5101;'" :class="scope.row.Dec==1?'el-icon-check':'el-icon-close'"></i>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="状态"
                        width="100">
                        <template slot-scope="scope">
                            <div :style="scope.row.Dec==1?'color:#1fc976;':'color:#fd5101;'">
                                {{ scope.row.type==1?'齐全':'不齐全' }}
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column label="操作" align="left">
                            <template>
                                <el-button type="text" size="small" @click="dialogShow=true">上传</el-button>
                                <el-button type="text" size="small" @click="examineShow=true">点击查看</el-button>
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
            <!-- 上传凭证 -->
            <div class="dialog-box" v-show="dialogShow">
                <div class="title">
                    上传凭证
                    <a class="close">
                        <i class="el-icon-close" @click="dialogShow=false"></i>
                    </a>
                </div>
                <div class="form">
                    <ul>
                        <li>
                            <span>
                                发放时间
                                <div class="required">*</div>
                            </span>
                            <input type="text">
                        </li>
                        <li>
                            <span>
                                应发工资
                                <div class="required">*</div>
                            </span>
                            <input type="text">
                        </li>
                        <li>
                            <span>
                                实发工资
                                <div class="required">*</div>
                            </span>
                            <input type="text">
                        </li>
                        <li>
                            <span>
                                银行账号
                            </span>
                            <input type="text">
                        </li>
                        <li>
                            <span>
                                银行流水
                            </span>
                            <input type="text">
                        </li>
                        <li>
                            <span>
                                备注
                            </span>
                            <input type="text">
                        </li>
                        <li>
                            <span>
                                上传附件
                            </span>
                        </li>
                        <li class="uploading">
                            <a>点击选择上传文件</a>
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button">确认上传</a>
                </div>
            </div>
            <!-- 查看 -->
            <div class="dialog-box" style="width:8.84rem;top:1.78rem;" v-show="examineShow">
                <div class="title">
                    查看
                    <a class="close">
                        <i class="el-icon-close" @click="examineShow=false"></i>
                    </a>
                </div>
                <div class="table-box">
                    <el-table
                    :data="tableData2"
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
                        label="文件名">
                        </el-table-column>
                        <el-table-column
                        prop="date"
                        label="上传日期">
                        </el-table-column>
                        <el-table-column label="操作" align="left">
                            <template>
                                <el-button type="text" size="small">查看</el-button>
                                <el-button type="text" size="small">下载</el-button>
                                <el-button type="text" size="small">编辑</el-button>
                                <el-button type="text" size="small">删除</el-button>
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
                        layout="total, prev, pager, next, jumper"
                        :total="pageTotal">
                    </el-pagination>
                </div>
                <!-- <div class="confirm">
                    <a class="button">确认上传</a>
                </div> -->
            </div>
            <!-- 遮罩层 -->
            <div class="shade-box" v-show="dialogShow || examineShow"></div>
            <!-- 加载层 -->
            <div class="shade-box" v-loading="loading" v-show="loading"></div>
        </div>
    </div>
</template>

<style lang="less">
    #systemLiangZhi_salary {
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
                    .synchronization {
                        .icon {
                            background-image: url('../../../../static/images/system-synchronization.png');
                        }
                        &:hover {
                            .icon {
                                background-image: url('../../../../static/images/system-synchronizationHover.png');
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
                    .contract {
                        .icon {
                            background-image: url('../../../../static/images/system-contract.png');
                        }
                        &:hover {
                            .icon {
                                background-image: url('../../../../static/images/system-contractHover.png');
                            }
                        }
                    }
                    .last {
                        .icon {
                            background-image: url('../../../../static/images/system-last.png');
                        }
                        &:hover {
                            .icon {
                                background-image: url('../../../../static/images/system-lastHover.png');
                            }
                        }
                    }
                    .next {
                        .icon {
                            background-image: url('../../../../static/images/system-next.png');
                        }
                        &:hover {
                            .icon {
                                background-image: url('../../../../static/images/system-nextHover.png');
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
                    height: .32rem;
                    margin-top: .2rem;
                    .el-pagination {
                        float: right;
                    }
                }
            }
            .dialog-box {
                left: 50%;
                top: -.34rem;
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
            pageSize: 15, // 每页条数
            pageNum: 1, // 当前页
            pageTotal: 5, // 总条数
            dialogShow: false, // 对话框状态
            examineShow: false, // 查看对话框状态
            loading: false, // 加载遮罩层状态
            tableData: [
                {
                    name: '阳建军', // 姓名
                    Jan: 1, // 1月
                    Feb: 1, // 2月
                    Mar: 1, // 3月
                    Apr: 1, // 4月
                    May: 1, // 5月
                    June: 1, // 6月
                    July: 1, // 7月
                    Aug: 0, // 8月
                    Sept: 0, // 9月
                    Oct: 0, // 10月
                    Nov: 0, // 11月
                    Dec: 0, // 12月
                    status: 0, // 状态
                },
                {
                    name: '陈志民', 
                    Jan: 1, 
                    Feb: 1, 
                    Mar: 1, 
                    Apr: 1, 
                    May: 1, 
                    June: 1, 
                    July: 1, 
                    Aug: 0, 
                    Sept: 0, 
                    Oct: 0, 
                    Nov: 0, 
                    Dec: 0, 
                    status: 0, 
                },
                {
                    name: '欧成标', 
                    Jan: 1, 
                    Feb: 1, 
                    Mar: 1, 
                    Apr: 1, 
                    May: 1, 
                    June: 1, 
                    July: 1, 
                    Aug: 0, 
                    Sept: 0, 
                    Oct: 0, 
                    Nov: 0, 
                    Dec: 0, 
                    status: 0, 
                },
                {
                    name: '周鹏', 
                    Jan: 1, 
                    Feb: 1, 
                    Mar: 1, 
                    Apr: 1, 
                    May: 1, 
                    June: 1, 
                    July: 1, 
                    Aug: 0, 
                    Sept: 0, 
                    Oct: 0, 
                    Nov: 0, 
                    Dec: 0, 
                    status: 0, 
                },
                {
                    name: '陈为安', 
                    Jan: 1, 
                    Feb: 1, 
                    Mar: 1, 
                    Apr: 1, 
                    May: 1, 
                    June: 1, 
                    July: 1, 
                    Aug: 0, 
                    Sept: 0, 
                    Oct: 0, 
                    Nov: 0, 
                    Dec: 0, 
                    status: 0, 
                },
            ], // 列表数据
            tableData2: [
                {
                    name: '某某某2019年12月工资', // 文件名
                    date: '2019.01.01 12:11', // 上传日期
                }
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