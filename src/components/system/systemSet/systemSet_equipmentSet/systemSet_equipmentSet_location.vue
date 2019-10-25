<template>
    <div id="systemSet_equipmentSet_location">
        <div class="content-box">
            <!-- 头部 -->
            <div class="title">
                <div class="text">定位设置</div>
            </div>
            <!-- 导航栏 -->
            <div class="nav">
                <a @click="navState=true" :class="navState?'active':''">工区设置</a>
                <a @click="navState=false" :class="navState?'':'active'">人员设置</a>
            </div>

            <!-- 设备管理 -->
            <!-- 功能 -->
            <div class="button" v-show="navState">
                <a @click="dialogClick">
                    <i class="icon"></i>
                    添加工区
                </a>
            </div>
            <!-- 主体 -->
            <div class="main" v-show="navState">
                <ul>
                    <li>
                        <div class="left-box">
                            <div class="name">
                                创新科技园
                            </div>
                            <div class="location">
                                <span>地址：</span>
                                深圳市宝安区创业路创新科技园
                            </div>
                            <div class="subcontract">
                                <span>所属分包：</span>
                                某某某分包
                            </div>
                        </div>
                        <div class="right-box">
                            <a @click="cameraShow=true">人员设置</a>
                            <a @click="compileShow=true">编辑</a>
                            <a>删除</a>
                        </div>
                    </li>
                    <li>
                        <div class="left-box">
                            <div class="name">
                                创新科技园
                            </div>
                            <div class="location">
                                <span>地址：</span>
                                深圳市宝安区创业路创新科技园
                            </div>
                            <div class="subcontract">
                                <span>所属分包：</span>
                                某某某分包
                            </div>
                        </div>
                        <div class="right-box">
                            <a>人员设置</a>
                            <a @click="compileShow=true">编辑</a>
                            <a>删除</a>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- 人员设置 -->
            <!-- 功能 -->
            <div class="button" v-show="!navState">
                <!-- <div class="name">通知成员</div> -->
                <div class="input-box">
                    <input type="text" placeholder="请输入姓名、工区搜索">
                    <a class="el-icon-search"></a>
                </div>
                <a @click="personnelShow=true">
                    <i class="icon"></i>
                    添加人员
                </a>
            </div>
            <!-- 主体 -->
            <div class="main" v-show="!navState">
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
                        prop="name"
                        label="姓名">
                        </el-table-column>
                        <el-table-column
                        prop="workArea"
                        label="所属工区">
                        </el-table-column>
                        <el-table-column
                        prop="id"
                        label="操作"
                        width="200">
                        <template>
                            <a class="table-button" @click="modificationShow=true">编辑</a>
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

            <!-- 添加工区 -->
            <div class="dialog-box" v-show="dialogShow">
                <div class="title">
                    添加工区
                    <a class="close" @click="dialogClick">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <ul>
                        <li>
                            <span>
                                工区名称
                                <div class="required">*</div>
                            </span>
                            <input type="text">
                        </li>
                        <li>
                            <span>
                                所属位置
                                <div class="required">*</div>
                            </span>
                            <input type="text">
                        </li>
                        <li>
                            <span>
                                所属分包
                                <div class="required">*</div>
                            </span>
                            <input type="text">
                        </li>
                        <li class="rail">
                            <span>
                                选择位置
                                <div class="required">*</div>
                                
                            </span>
                            <div class="text-box">
                                经度：{{longitude}}
                                &nbsp;
                                纬度：{{latitude}}
                            </div>
                            <div class="scope">
                                范围
                                <input type="text" placeholder="默认100米">
                            </div>
                        </li>
                        <li class="map-box">
                            <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :events="events" class="amap-demo">
                            </el-amap>
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button">保存</a>
                </div>
            </div>
            <!-- 编辑工区 -->
            <div class="dialog-box" v-show="compileShow">
                <div class="title">
                    编辑工区
                    <a class="close" @click="compileShow=false">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <ul>
                        <li>
                            <span>
                                工区名称
                                <div class="required">*</div>
                            </span>
                            <input type="text">
                        </li>
                        <li>
                            <span>
                                所属位置
                                <div class="required">*</div>
                            </span>
                            <input type="text">
                        </li>
                        <li>
                            <span>
                                所属分包
                                <div class="required">*</div>
                            </span>
                            <input type="text">
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button">保存</a>
                </div>
            </div>
            <!-- 人员设置 -->
            <div class="dialog-box" v-show="cameraShow">
                <div class="title">
                    人员设置
                    <a class="close" @click="cameraShow=false">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <div class="search-box">
                        <div class="text-box" style="font-size:.18rem;line-height:.42rem;">
                            创新科技园
                        </div>
                    </div>
                    <div class="table-box">
                        <el-table
                        :data="tableData3"
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
                            prop="name"
                            label="名称">
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
                            @current-change="handleCurrentChange3"
                            :current-page="pageNum3"
                            layout="total, prev, pager, next, jumper"
                            :total="pageTotal3">
                        </el-pagination>
                    </div>
                </div>
                <div class="confirm">
                    <a class="button">保存</a>
                </div>
            </div>
            <!-- 添加人员 -->
            <div class="dialog-box" v-show="personnelShow">
                <div class="title">
                    添加人员
                    <a class="close" @click="personnelShow=false">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <ul>
                        <li>
                            <span>
                                人员名称
                                <div class="required">*</div>
                            </span>
                            <input type="text">
                        </li>
                        <li>
                            <span>
                                所属工区
                                <div class="required">*</div>
                            </span>
                            <input type="text">
                        </li>
                        <li>
                            <span>
                                绑定设备
                                <div class="required">*</div>
                            </span>
                            <input type="text">
                        </li>
                        <li>
                            <span>
                                电话
                            </span>
                            <input type="text">
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button">保存</a>
                </div>
            </div>
            <!-- 编辑人员 -->
            <div class="dialog-box" v-show="modificationShow">
                <div class="title">
                    编辑人员
                    <a class="close" @click="modificationShow=false">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <ul>
                        <li>
                            <span>
                                人员名称
                                <div class="required">*</div>
                            </span>
                            <input type="text">
                        </li>
                        <li>
                            <span>
                                所属工区
                                <div class="required">*</div>
                            </span>
                            <input type="text">
                        </li>
                        <li>
                            <span>
                                绑定设备
                                <div class="required">*</div>
                            </span>
                            <input type="text">
                        </li>
                        <li>
                            <span>
                                电话
                            </span>
                            <input type="text">
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button">保存</a>
                </div>
            </div>
            <!-- 遮罩层 -->
            <div class="shade-box" v-show="dialogShow || compileShow || personnelShow || cameraShow || modificationShow"></div>
        </div>
    </div>
</template>

<style lang="less">
    #systemSet_equipmentSet_location {
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
                >a {
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
                >.input-box {
                    width: 4rem;
                    height: .4rem;
                    overflow: hidden;
                    padding-left: .16rem;
                    border-radius: .04rem;
                    display: inline-block;
                    border: .01rem solid #b6b6b6;
                    transform: translateY(.15rem);
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
            .main {
                width: 98%;
                >ul {
                    width: 100%;
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
            }
            .dialog-box {
                left: 50%;
                top: 1.1rem;
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
                                width: 1.44rem;
                                height: .41rem;
                                font-size: .16rem;
                                text-align: right;
                                position: relative;
                                line-height: .41rem;
                                padding-right: .18rem;
                                display: inline-block;
                                .required {
                                    top: -0.01rem;
                                    right: .1rem;
                                    color: #f00;
                                    position: absolute;
                                }
                            }
                            input {
                                width: 4.8rem;
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
                        .uploading {
                            height: 2.4rem;
                            >a {
                                width: 4.8rem;
                                height: 2.1rem;
                                display: inline-block;
                                border-radius: .02rem;
                                border: .01rem solid #b1b1b1;
                            }
                        }
                        .rail {
                            position: relative;
                            .text-box {
                                padding-left: .05rem;
                                color: #333;
                                font-size: .18rem;
                                line-height: .41rem;
                            }
                            .scope {
                                position: absolute;
                                right: .6rem;
                                input {
                                    width: 1.1rem;
                                }
                            }
                        }
                        .map-box {
                            width: 5.7rem;
                            height: 2.26rem;
                            margin: 0 auto;
                            >div {
                                width: 100%;
                                height: 100%;
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
let amapManager = new VueAMap.AMapManager()
export default {
    data() {
        return {
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
                    name: '某某某工区摄像头', // 姓名
                    workArea: '创新工业园', // 所属工区
                },
            ], // 添加人员列表数据
            tableData3: [
                {
                    number: 1, // 序号
                    name: '某某某', // 名称
                    id: 1, // id
                },
                {
                    number: 2, // 序号
                    name: '某某某', // 名称
                    id: 2, // id
                },
            ], // 人员设置设置列表
            navState: true, // 当前模块
            dialogShow: false, // 添加工区对话框
            compileShow: false, // 编辑工区对话框
            personnelShow: false,// 添加人员对话框
            cameraShow: false, // 人员设置设置对话框
            modificationShow: false, // 编辑人员对话框
            pageSize: 15, // 每页条数
            pageNum: 1, // 当前页
            pageTotal: 2, // 总条数
            pageNum2: 1, // 每页条数
            pageTotal2: 2, // 总条数
            pageNum3: 1, // 每页条数
            pageTotal3: 2, // 总条数
            amapManager,
            // amapManager2,
            zoom: 12,
            center: [114.014129,22.571492],
            events: {
                init: (o) => {
                },
                'moveend': () => {
                },
                'zoomchange': () => {
                },
                'click': (e) => {
                    // console.log(e.lnglat)
                    this.longitude = e.lnglat.lng
                    this.latitude = e.lnglat.lat
                    // console.log(this.longitude+':'+this.latitude)
                }
            },
            longitude: '', // 经度
            latitude: '', // 纬度
        }
    },
    methods: {
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
            this.pageNum2 = val
        },

        // 当前页
        handleCurrentChange3(val) {
            // console.log(`当前页: ${val}`)
            this.pageNum3 = val
        },

        // 新增对话框状态切换
        dialogClick() {
            this.dialogShow = !this.dialogShow
        },
    }
}
</script>