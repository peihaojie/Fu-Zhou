<template>
    <div id="systemSet_equipmentSet_TSP">
        <div class="content-box">
            <!-- 头部 -->
            <div class="title">
                <div class="text">TSP设置</div>
            </div>
            <!-- 导航栏 -->
            <div class="nav">
                <a @click="navState=1" :class="navState==1?'active':''">设备管理</a>
                <a @click="navState=2" :class="navState==2?'active':''">阀值设置</a>
                <a @click="navState=3" :class="navState==3?'active':''">报警设置</a>
            </div>

            <!-- 设备管理 -->
            <!-- 功能 -->
            <div class="button" v-show="navState==1">
                <a @click="dialogClick">
                    <i class="icon"></i>
                    添加设备
                </a>
            </div>
            <!-- 主体 -->
            <div class="main" v-show="navState==1">
                <ul>
                    <li v-for="(item,index) in equipmentListData" :key="index">
                        <div class="left-box">
                            <div class="name">
                                {{item.comments}}
                            </div>
                            <div class="subcontract">
                                <span>设备SN：</span>
                                {{item.sn}}
                            </div>
                            <div class="location">
                                <span>视频流：</span>
                                {{item.videoAddress}}
                            </div>
                        </div>
                        <div class="right-box">
                            <a @click="getEdit(item.id)">编辑</a>
                            <a @click="removeClick(item.id)">删除</a>
                        </div>
                    </li>
                </ul>
                <div class="paging-box">
                    <el-pagination
                        @current-change="handleCurrentChange3"
                        :current-page="pageNum3"
                        :page-size="pageSize3"
                        layout="total, prev, pager, next, jumper"
                        :total="pageTotal3">
                    </el-pagination>
                </div>
            </div>

            <!-- 阀值设置 -->
            <!-- 功能 -->
            <div class="button" v-show="navState==2">
                <div class="name">阀值设置</div>
            </div>
            <!-- 主体 -->
            <div class="main" v-show="navState==2">
                <ul class="threshol">
                    <li>
                        <div class="text-box">PM2.5</div>
                        <div class="input-box">
                            <span>最大阀值：</span>
                            <input type="number" v-model="pm25">
                        </div>
                    </li>
                    <li>
                        <div class="text-box">PM10</div>
                        <div class="input-box">
                            <span>最大阀值：</span>
                            <input type="number" v-model="pm10">
                        </div>
                    </li>
                    <li>
                        <div class="text-box">TSP</div>
                        <div class="input-box">
                            <span>最大阀值：</span>
                            <input type="number" v-model="tsp">
                        </div>
                    </li>
                    <li>
                        <div class="text-box">噪音</div>
                        <div class="input-box">
                            <span>最大阀值：</span>
                            <input type="number" v-model="noise">
                        </div>
                    </li>
                    <li>
                        <div class="text-box">温度</div>
                        <div class="input-box">
                            <span>最大阀值：</span>
                            <input type="number" v-model="temperature">
                        </div>
                    </li>
                    <li>
                        <div class="text-box">湿度</div>
                        <div class="input-box">
                            <span>最大阀值：</span>
                            <input type="number" v-model="humidity">
                        </div>
                    </li>
                    <li>
                        <div class="text-box">风速</div>
                        <div class="input-box">
                            <span>最大阀值：</span>
                            <input type="number" v-model="windSpeed">
                        </div>
                    </li>
                </ul>
                <a class="confirm" @click="updateThresholdValue">确定</a>
            </div>

            <!-- 报警设置 -->
            <!-- 功能 -->
            <div class="button" v-show="navState==3">
                <div class="name">通知成员</div>
                <a @click="personnelShow=true">
                    <i class="icon"></i>
                    添加人员
                </a>
            </div>
            <!-- 主体 -->
            <div class="main" v-show="navState==3">
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
                        prop="number"
                        label="序号"
                        width="60">
                        </el-table-column>
                        <el-table-column
                        prop="account"
                        label="账号">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="姓名">
                        </el-table-column>
                        <el-table-column
                        prop="phone"
                        label="手机号">
                        </el-table-column>
                        <el-table-column
                        prop="post"
                        label="岗位">
                        </el-table-column>
                        <el-table-column
                        prop="company"
                        label="单位">
                        </el-table-column>
                        <el-table-column
                        prop="id"
                        label="操作"
                        width="100">
                        <template>
                            <a class="table-button">删除</a>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
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

            <!-- 新增设备 -->
            <div class="dialog-box" v-show="dialogShow">
                <div class="title">
                    新增设备
                    <a class="close" @click="dialogClick">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <ul>
                        <li>
                            <span>
                                设备名称
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="addComments">
                        </li>
                        <li>
                            <span>
                                设备SN
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="addSn">
                        </li>
                        <li>
                            <span>
                                视频流
                                <div class="required"></div>
                            </span>
                            <input type="text" v-model="addVideoAddress">
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button" @click="addSave">保存</a>
                </div>
            </div>
            <!-- 编辑设备 -->
            <div class="dialog-box" v-show="compileShow">
                <div class="title">
                    编辑设备
                    <a class="close" @click="compileShow=false">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <ul>
                        <li>
                            <span>
                                设备名称
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="editComments">
                        </li>
                        <li>
                            <span>
                                设备SN
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="editSn">
                        </li>
                        <li>
                            <span>
                                视频流
                                <div class="required"></div>
                            </span>
                            <input type="text" v-model="editVideoAddress">
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button" @click="editClick">保存</a>
                </div>
            </div>
            <!-- 新增人员 -->
            <div class="dialog-box" v-show="personnelShow" style="width:11.8rem">
                <div class="title">
                    新增人员
                    <a class="close" @click="personnelShow=false">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <div class="search-box">
                        <div class="input-box">
                            <input type="text" placeholder="请输入姓名或账号搜索人员">
                            <a class="el-icon-search"></a>
                        </div>
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
                            prop="number"
                            label="序号"
                            width="60">
                            </el-table-column>
                            <el-table-column
                            prop="account"
                            label="账号">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="姓名">
                            </el-table-column>
                            <el-table-column
                            prop="phone"
                            label="手机号">
                            </el-table-column>
                            <el-table-column
                            prop="post"
                            label="岗位">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="paging-box">
                        <el-pagination
                            @current-change="handleCurrentChange2"
                            :current-page="pageNum2"
                            layout="total, prev, pager, next, jumper"
                            :total="pageTotal2">
                        </el-pagination>
                    </div>
                </div>
                <div class="confirm">
                    <a class="button">保存</a>
                </div>
            </div>
            <!-- 遮罩层 -->
            <div class="shade-box" v-show="dialogShow || compileShow || personnelShow"></div>
        </div>
    </div>
</template>

<style lang="less">
    #systemSet_equipmentSet_TSP {
        width: 100%;
        .content-box {
            min-height: 7rem;
            border-radius: .04rem;
            background-color: #fff;
            box-shadow: 0 0 .5rem -.3rem #666;
            padding-left: .2rem;
            padding-bottom: .3rem;
            >.title {
                height: .71rem;
                width: 98%;
                border-bottom: .01rem solid #c5e8ff;
                .text {
                    font-size: .24rem;
                    text-align: center;
                    line-height: .7rem;
                }
            }
            .nav {
                width: 98%;
                height: .62rem;
                padding-top: .26rem;
                border-bottom: .02rem solid #c5e8ff;
                a {
                    color: #4a4a4a;
                    font-size: .14rem;
                    line-height: .34rem;
                    display: inline-block;
                    margin-right: .35rem;
                    transition: all .5s;
                    &:hover {
                        color: #0090ff;
                        // border-bottom: .02rem solid #0090ff;
                    }
                }
                .active {
                    color: #0090ff;
                    border-bottom: .02rem solid #0090ff;
                }
            }
            .button {
                width: 98%;
                height: .7rem;
                position: relative;
                .name {
                    color: #4a4a4a;
                    font-size: .22rem;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    font-weight: bolder;
                    transform: translateY(-50%);
                }
                a {
                    float: left;
                    height: .3rem;
                    color: #0090ff;
                    font-size: .14rem;
                    transition: all .5s;
                    line-height: .28rem;
                    border-radius: .02rem;
                    padding-right: .09rem;
                    border: .01rem solid #0090ff;
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    &:hover {
                        color: #fff;
                        background-color: #0090ff;
                        .icon {
                            background-image: url('../../../../../static/images/system-newHover.png');
                        }
                    }
                    .icon {
                        width: .37rem;
                        height: .28rem;
                        transition: all .5s;
                        display: inline-block;
                        vertical-align: middle;
                        background-repeat: no-repeat;
                        background-position: center center;
                        background-image: url('../../../../../static/images/system-new.png');
                    }
                }
            }
            .main {
                width: 98%;
                position: relative;
                >ul {
                    width: 100%;
                    min-height: 5.6rem;
                    li {
                        width: 100%;
                        height: 1.29rem;
                        padding-top: .05rem;
                        padding-left: .2rem;
                        margin-bottom: .2rem;
                        border: .01rem solid #c5e8ff;
                        .left-box {
                            float: left;
                            .name {
                                color: #4a4a4a;
                                font-size: .18rem;
                                font-weight: bolder;
                                line-height: .38rem;
                            }
                            .location,
                            .subcontract {
                                color: #4a4a4a;
                                font-size: .18rem;
                                line-height: .38rem;
                                span {
                                    color: #7b7b7b;
                                }
                            }
                        }
                        .right-box {
                            float: right;
                            a {
                                color: #0090ff;
                                font-size: .18rem;
                                margin-right: .3rem;
                                line-height: 1.21rem;
                            }
                        }
                    }
                }
                .table-box {
                    width: 100%;
                    min-height: 5.6rem;
                    // padding-left: .2rem;
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
                        .table-button {
                            color: #0090ff;
                            padding: 0 .08rem;
                            text-decoration: underline;
                        }
                    }
                    .green-color {
                        color: #58de87 !important;
                    }
                    .red-color {
                        color: #fe898f !important;
                    }
                }
                .paging-box {
                    width: 100%;
                    height: .52rem;
                    margin-top: .2rem;
                    padding-right: .2rem;
                    padding-bottom: .2rem;
                    .el-pagination {
                        float: right;
                    }
                }
                .threshol {
                    display: flex;
                    min-height: 0;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    li {
                        height: .97rem;
                        width: 7.98rem;
                        border: .01rem solid #c5e8ff;
                        .text-box {
                            height: .42rem;
                            color: #4a4a4a;
                            font-size: .17rem;
                            line-height: .42rem;
                            font-weight: bolder;
                        }
                        .input-box {
                            height: .44rem;
                            span {
                                color: #7b7b7b;
                                font-size: .16rem;
                                line-height: .44rem;
                            }
                            input {
                                width: 3rem;
                                height: .4rem;
                                border-radius: .02rem;
                                border: .01rem solid #b6b6b6;
                                padding-left: .1rem;
                            }
                        }
                    }
                }
                .confirm {
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
                    >ul{
                        padding-bottom: .3rem;
                        >li {
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
                            input {
                                width: 3.66rem;
                                height: .41rem;
                                padding-left: .1rem;
                                border-radius: .02rem;
                                border: .01rem solid #b1b1b1;
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
                    >.search-box {
                        height: .82rem;
                        padding-left: .3rem;
                        padding-top: .2rem;
                        .input-box {
                            width: 4rem;
                            height: .4rem;
                            overflow: hidden;
                            padding-left: .16rem;
                            border-radius: .04rem;
                            display: inline-block;
                            border: .01rem solid #b6b6b6;
                            input {
                                width: 3.4rem;
                                height: .38rem;
                                font-size: .17rem;
                                &::placeholder {
                                    color: #dadada;
                                }
                            }
                            a {
                                color: #ccc;
                                width: .38rem;
                                height: .38rem;
                                font-size: .18rem;
                                text-align: center;
                                line-height: .38rem;
                                transition: all .5s;
                                display: inline-block;
                                &:hover {
                                    color: #fff;
                                    background-color: #ccc;
                                }
                            }
                        }
                    }
                    >.table-box {
                        width: 100%;
                        min-height: 3.85rem;
                        padding-left: .3rem;
                        padding-right: .3rem;
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
                            .table-button {
                                color: #0090ff;
                                padding: 0 .08rem;
                                text-decoration: underline;
                            }
                        }
                        .green-color {
                            color: #58de87 !important;
                        }
                        .red-color {
                            color: #fe898f !important;
                        }
                    }
                    >.paging-box {
                        width: 100%;
                        height: .52rem;
                        margin-top: .2rem;
                        padding-right: .2rem;
                        padding-bottom: .2rem;
                        .el-pagination {
                            float: right;
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
            projectId: 0, // 项目id
            tableData: [
                {
                    number: 1, // 序号
                    account: 'aqwer111', // 账号
                    name: '某某某',// 姓名
                    phone: '12345678978', // 手机号
                    post: '安全员', // 岗位
                    company: '深圳市市政有限公司', // 公司
                    id: 1, // 人员id
                },
                {
                    number: 2, // 序号
                    account: 'aqwer111', // 账号
                    name: '某某某',// 姓名
                    phone: '12345678978', // 手机号
                    post: '安全员', // 岗位
                    company: '深圳市市政有限公司', // 公司
                    id: 1, // 人员id
                }
            ], // 列表数据
            tableData2: [
                {
                    number: 1, // 序号
                    account: 'aqwer111', // 账号
                    name: '某某某',// 姓名
                    phone: '12345678978', // 手机号
                    post: '安全员', // 岗位
                    id: 1, // 人员id
                },
                {
                    number: 2, // 序号
                    account: 'aqwer111', // 账号
                    name: '某某某',// 姓名
                    phone: '12345678978', // 手机号
                    post: '安全员', // 岗位
                    id: 1, // 人员id
                },
            ], // 添加人员列表数据
            navState: 1, // 当前模块
            dialogShow: false, // 新增设备对话框
            compileShow: false, // 编辑对话框
            personnelShow: false,// 新增人员对话框
            pageSize: 15, // 每页条数
            pageNum: 1, // 当前页
            pageTotal: 2, // 总条数
            pageNum2: 1, // 当前页
            pageTotal2: 2, // 总条数
            pageNum3: 1, // 设备列表当前页
            pageSize3: 4, // 设备列表每页条数
            pageTotal3: 0, // 设备列表总条数
            equipmentListData: '', // 设备列表
            addComments: '', // 新增设备设备名称
            addSn: '', // 新增设备设备SN编号
            addVideoAddress: '', // 新增设备视频地址
            editComments: '', // 编辑设备设备名称
            editSn: '', // 编辑设备设备SN编号
            editVideoAddress: '', // 编辑设备视频地址
            selectId: '', // 当前编辑设备的id
            pm25: '', // pm2.5阀值
            pm10: '', // pm10阀值
            tsp: '', // tsp阀值
            noise: '', // 噪音阀值
            temperature: '', // 温度阀值
            humidity: '', // 湿度阀值
            windSpeed: '', // 风速阀值
            id: '', // 阀值id
        }
    },
    created() {
        this.getProjectId()
        this.getEquipmentList()
        this.getThresholdValue()
    },
    methods: {
        // 获取项目id
        getProjectId() {
            this.projectId = sessionStorage.getItem('pid')
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

        // 当前页
        handleCurrentChange2(val) {
            // console.log(`当前页: ${val}`)
            this.pageNum = val
        },

        // 设备列表当前页
        handleCurrentChange3(val) {
            // console.log(`当前页: ${val}`)
            this.pageNum3 = val
            this.getEquipmentList()
        },

        // 新增对话框状态切换
        dialogClick() {
            this.dialogShow = !this.dialogShow
            this.addComments = ''
            this.addSn = ''
            this.addVideoAddress = ''
        },

        // 获取设备列表
        getEquipmentList() {
            this.$axios.post(`/api/ProjectDustEmission/projectDustEmissionList?projectId=${this.projectId}&pageSize=${this.pageSize3}&pageNum=${this.pageNum3}`).then(
                res => {
                    // console.log(res.data)
                    this.pageTotal3 = res.data.data.total
                    this.equipmentListData = res.data.data.rows
                }
            )
        },

        // 添加设备
        addSave() {
            if (this.addComments && this.addSn) {
                this.$axios.post(`/api/ProjectDustEmission/projectDustEmissionAddSave?projectId=${this.projectId}&comments=${this.addComments}&sn=${this.addSn}&videoAddress=${this.addVideoAddress}`).then(
                    res => {
                        // console.log(res.data)
                        if (res.data.code == 0) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            })
                            this.dialogShow = false
                            // this.pageNum3 = 1
                            this.getEquipmentList()
                        } else {
                            this.$message({
                                message: `${res.data.msg}`,
                                type: 'warning'
                            })
                        }
                    }
                )
            } else {
                this.$message({
                    message: '带 * 号的输入框不得为空',
                    type: 'warning'
                })
            }
        },

        // 删除设备
        removeClick(ids) {
            this.$confirm('是否要删除选中的参建单位？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(`/api/ProjectDustEmission/remove?ids=${ids}`).then(
                    res => {
                        // console.log(res.data)
                        if (res.data.code == 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            })
                            this.pageNum3 = 1
                            this.getEquipmentList()
                        } else {
                            this.$message({
                                message: '删除失败，请重试',
                                type: 'error'
                            })
                        }
                    }
                )
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })         
            })
        },

        // 获取编辑设备信息
        getEdit(id) {
            this.$axios.post(`/api/ProjectDustEmission/projectDustEmissionById?id=${id}`).then(
                res => {
                    console.log(res.data)
                    this.editComments = res.data.data.comments
                    this.editSn = res.data.data.sn
                    this.selectId = id
                    this.editVideoAddress = res.data.data.videoAddress
                    // res.data.data.videoAddress?this.editVideoAddress='':this.editVideoAddress=res.data.data.videoAddress
                    this.compileShow = true
                    // console.log(this.editVideoAddress?'我是空':'我有值')
                }
            )
        },

        // 编辑设备
        editClick() {
            if (this.editComments && this.editSn) {
                this.$axios.post(`/api/ProjectDustEmission/projectDustEmissionEditSave?projectId=${this.projectId}&comments=${this.editComments}&sn=${this.editSn}&videoAddress=${this.editVideoAddress?this.editVideoAddress:''}&id=${this.selectId}`).then(
                    res => {
                        // console.log(res.data)
                        if (res.data.code == 0) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            })
                            this.compileShow = false
                            // this.pageNum3 = 1
                            this.getEquipmentList()
                        } else {
                            this.$message({
                                message: `${res.data.msg}`,
                                type: 'warning'
                            })
                        }
                    }
                )
            } else {
                this.$message({
                    message: '带 * 号的输入框不得为空',
                    type: 'warning'
                })
            }
        },

        // 获取阀值数据
        getThresholdValue() {
            this.$axios.post(`/api/DustEmissionThresholdValueAPI/getThresholdValue?projectId=${this.projectId}`).then(
                res => {
                    // console.log(res.data)
                    this.id = res.data.data.id
                    this.pm25 = res.data.data.pm25
                    this.pm10 = res.data.data.pm10
                    this.tsp = res.data.data.tsp
                    this.noise = res.data.data.noise
                    this.temperature = res.data.data.temperature
                    this.humidity = res.data.data.humidity
                    this.windSpeed = res.data.data.windSpeed
                }
            )
        },

        // 修改阀值
        updateThresholdValue() {
            this.$axios.post(`/api/DustEmissionThresholdValueAPI/updateThresholdValue?id=${this.id}&pm25=${this.pm25}&pm10=${this.pm10}&tsp=${this.tsp}&noise=${this.noise}&temperature=${this.temperature}&humidity=${this.humidity}&windSpeed=${this.windSpeed}`).then(
                res => {
                    if (res.data.code == 0) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                        this.getThresholdValue()
                    } else {
                        this.$message({
                            message: `${res.data.msg}`,
                            type: 'warning'
                        })
                    }
                }
            )
        },
    }
}
</script>