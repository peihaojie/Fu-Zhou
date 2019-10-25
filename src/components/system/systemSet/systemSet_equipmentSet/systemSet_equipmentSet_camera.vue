<template>
    <div id="systemSet_equipmentSet_camera">
        <div class="content-box">
            <!-- 头部 -->
            <div class="title">
                <div class="text">摄像头设置</div>
            </div>
            <!-- 导航栏 -->
            <div class="nav">
                <a @click="navState=true" :class="navState?'active':''">工区设置</a>
                <a @click="navState=false" :class="navState?'':'active'">摄像头设置</a>
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
                    <li v-for="(item,index) in workAreaList" :key="index">
                        <div class="left-box">
                            <div class="name">
                                {{item.areaName}}
                            </div>
                            <div class="location">
                                <span>地址：</span>
                                {{item.address}}
                            </div>
                            <div class="subcontract">
                                <span>所属分包：</span>
                                {{item.affiliatedUnit}}
                            </div>
                        </div>
                        <div class="right-box">
                            <a @click="cameraShow=true">查看摄像头</a>
                            <a @click="getEditData(item.id)">编辑</a>
                            <a @click="removeClick(item.id)">删除</a>
                        </div>
                    </li>
                </ul>
                <div class="paging-box">
                    <el-pagination
                        @current-change="handleCurrentChange4"
                        :current-page="pageNum4"
                        :page-size="pageSize4"
                        layout="total, prev, pager, next, jumper"
                        :total="pageTotal4">
                    </el-pagination>
                </div>
            </div>

            <!-- 摄像头设置 -->
            <!-- 功能 -->
            <div class="button" v-show="!navState">
                <!-- <div class="name">通知成员</div> -->
                <!-- <div class="input-box">
                    <input type="text" placeholder="请输入名称、型号、负责人搜索">
                    <a class="el-icon-search"></a>
                </div> -->
                <a @click="personnelShow=true">
                    <i class="icon"></i>
                    添加摄像头
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
                        type="index"
                        label="序号"
                        width="60"
                        :index="indexMethod">
                        </el-table-column>
                        <el-table-column
                        prop="videoName"
                        label="名称">
                        </el-table-column>
                        <el-table-column
                        prop="videoType"
                        label="型号">
                        </el-table-column>
                        <el-table-column
                        prop="videoAddress"
                        label="位置">
                        </el-table-column>
                        <el-table-column
                        prop="videoWay"
                        label="监控方式">
                        </el-table-column>
                        <el-table-column
                        prop="contacts"
                        label="应急联系人">
                        </el-table-column>
                        <el-table-column
                        prop="id"
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <a class="table-button" @click="selectProjectVideoById(scope.row.id)">编辑</a>
                            <a class="table-button" @click="deleteSbProjectVideoByIds(scope.row.id)">删除</a>
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
                        layout="total, prev, pager, next, jumper"
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
                            <input type="text" v-model="addAreaName">
                        </li>
                        <li>
                            <span>
                                所属位置
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="addAddress">
                        </li>
                        <li>
                            <span>
                                所属分包
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="addAffiliatedUnit">
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button" @click="addWorkAreaList">保存</a>
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
                            <input type="text" v-model="editAreaName">
                        </li>
                        <li>
                            <span>
                                所属位置
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="editAddress">
                        </li>
                        <li>
                            <span>
                                所属分包
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="editAffiliatedUnit">
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button" @click="editSave">保存</a>
                </div>
            </div>
            <!-- 摄像头设置 -->
            <div class="dialog-box" v-show="cameraShow">
                <div class="title">
                    摄像头设置
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
                            <!-- <el-table-column
                            prop="id"
                            label="操作"
                            width="100">
                            <template>
                                <a class="table-button">删除</a>
                            </template>
                            </el-table-column> -->
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
            <!-- 添加摄像头 -->
            <div class="dialog-box" v-show="personnelShow" style="top:-.3rem">
                <div class="title">
                    添加摄像头
                    <a class="close" @click="personnelShow=false">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <ul>
                        <li>
                            <span>
                                选择工区
                                <div class="required">*</div>
                            </span>
                            <el-select v-model="addAreaId" placeholder="请选择">
                              <el-option
                                v-for="item in workAreaList"
                                :key="item.id"
                                :label="item.areaName"
                                :value="item.id">
                              </el-option>
                            </el-select>
                        </li>
                        <li>
                            <span>
                                名称
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="addVideoName">
                        </li>
                        <li>
                            <span>
                                视频地址
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="addUrl">
                        </li>
                        <li>
                            <span>
                                型号
                            </span>
                            <input type="text" v-model="addVideoType">
                        </li>
                        <li>
                            <span>
                                位置
                            </span>
                            <input type="text" v-model="addVideoAddress">
                        </li>
                        <li>
                            <span>
                                监控方式
                            </span>
                            <input type="text" v-model="addVideoWay">
                        </li>
                        <li>
                            <span>
                                应急联系人
                            </span>
                            <input type="text" v-model="addContacts">
                        </li>
                        <li>
                            <span>
                                联系方式
                            </span>
                            <input type="text" v-model="addContactsWat">
                        </li>
                        <li>
                            <span>
                                所属部门
                            </span>
                            <input type="text" v-model="addDepartment">
                        </li>
                        <!-- <li class="uploading">
                            <span>
                                位置照片
                            </span>
                            <a></a>
                        </li> -->
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button" @click="projectVideoAddSave">保存</a>
                </div>
            </div>
            <!-- 编辑摄像头 -->
            <div class="dialog-box" v-show="modificationShow" style="top:-.3rem">
                <div class="title">
                    编辑摄像头
                    <a class="close" @click="modificationShow=false">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <ul>
                        <li>
                            <span>
                                选择工区
                                <div class="required">*</div>
                            </span>
                            <el-select v-model="editAreaId" placeholder="请选择">
                              <el-option
                                v-for="item in workAreaList"
                                :key="item.id"
                                :label="item.areaName"
                                :value="item.id">
                              </el-option>
                            </el-select>
                        </li>
                        <li>
                            <span>
                                名称
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="editVideoName">
                        </li>
                        <li>
                            <span>
                                视频地址
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="editUrl">
                        </li>
                        <li>
                            <span>
                                型号
                            </span>
                            <input type="text" v-model="editVideoType">
                        </li>
                        <li>
                            <span>
                                位置
                            </span>
                            <input type="text" v-model="editVideoAddress">
                        </li>
                        <li>
                            <span>
                                监控方式
                            </span>
                            <input type="text" v-model="editVideoWay">
                        </li>
                        <li>
                            <span>
                                应急联系人
                            </span>
                            <input type="text" v-model="editContacts">
                        </li>
                        <li>
                            <span>
                                联系方式
                            </span>
                            <input type="text" v-model="editContactsWat">
                        </li>
                        <li>
                            <span>
                                所属部门
                            </span>
                            <input type="text" v-model="editDepartment">
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button" @click="projectVideoEditSave">保存</a>
                </div>
            </div>
            <!-- 遮罩层 -->
            <div class="shade-box" v-show="dialogShow || compileShow || personnelShow || cameraShow || modificationShow"></div>
        </div>
    </div>
</template>

<style lang="less">
    #systemSet_equipmentSet_camera {
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
            projectId: '', // 项目id
            tableData: [], // 列表数据
            tableData2: [], // 添加人员列表数据
            tableData3: [], // 摄像头设置列表
            navState: true, // 当前模块
            dialogShow: false, // 新增设备对话框
            compileShow: false, // 编辑对话框
            personnelShow: false,// 添加摄像头对话框
            cameraShow: false, // 摄像头设置对话框
            modificationShow: false, // 编辑摄像头对话框
            pageSize: 15, // 摄像头列表每页条数
            pageNum: 1, // 摄像头列表当前页
            pageTotal: 2, // 摄像头列表总条数
            pageNum2: 1, // 每页条数
            pageTotal2: 2, // 总条数
            pageNum3: 1, // 每页条数
            pageTotal3: 2, // 总条数
            pageNum4: 1, // 工区列表当前页
            pageSize4: 4, // 工区列表每页条数
            pageTotal4: 0, // 工区列表总条数
            workAreaList: '', // 工区列表
            addAreaName: '', // 添加工区名称
            addAddress: '', // 添加工区地址
            addAffiliatedUnit: '', // 添加工区所属单位
            editAreaName: '', // 编辑工区名称
            editAddress: '', // 编辑工区地址
            editAffiliatedUnit: '', // 编辑工区所属单位
            selectId: '', // 当前选中工区id
            addAreaId: '', // 添加摄像头所属工区id
            addVideoName: '', // 添加摄像头摄像头名称
            addUrl : '', // 添加摄像头视频地址
            addVideoType: '', // 添加摄像头型号
            addVideoAddress: '', // 添加摄像头所在位置
            addVideoWay: '', // 添加摄像头监控方式
            addContacts: '', // 添加摄像头联系人
            addContactsWat: '', // 添加摄像头联系方式
            addDepartment: '', // 添加摄像头所属部门
            addPhotograph: '', // 添加摄像头所在位置照片
            cameraId: '', // 当前选中摄像头的id
            editAreaId: '', // 编辑摄像头所属工区id
            editVideoName: '', // 编辑摄像头摄像头名称
            editUrl : '', // 编辑摄像头视频地址
            editVideoType: '', // 编辑摄像头型号
            editVideoAddress: '', // 编辑摄像头所在位置
            editVideoWay: '', // 编辑摄像头监控方式
            editContacts: '', // 编辑摄像头联系人
            editContactsWat: '', // 编辑摄像头联系方式
            editDepartment: '', // 编辑摄像头所属部门
            editPhotograph: '', // 编辑摄像头所在位置照片
        }
    },
    created() {
        this.getProjectId()
        this.getWorkAreaList()
        this.getCameraList()
    },
    methods: {
        // 获取项目id
        getProjectId() {
            this.projectId = sessionStorage.getItem('pid')
        },

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

        // 工区列表当前页
        handleCurrentChange4(val) {
            // console.log(`当前页: ${val}`)
            this.pageNum4 = val
            this.getWorkAreaList()
        },

        // 新增对话框状态切换
        dialogClick() {
            this.dialogShow = !this.dialogShow
            this.addAreaName = ''
            this.addAddress = ''
            this.addAffiliatedUnit = ''
        },

        // 获取工区列表
        getWorkAreaList() {
            this.$axios.post(`/api/ProjectVideoAreaApi/list?projectId=${this.projectId}&pageNum=${this.pageNum4}&pageSize=${this.pageSize4}`).then(
                res => {
                    // console.log(res.data)
                    this.workAreaList = res.data.data.rows
                    this.pageTotal4 = res.data.data.total
                }
            )
        },

        // 添加工区
        addWorkAreaList() {
            if (this.addAreaName && this.addAddress && this.addAffiliatedUnit) {
                this.$axios.post(`/api/ProjectVideoAreaApi/add?projectid=${this.projectId}&areaName=${this.addAreaName}&address=${this.addAddress}&affiliatedUnit=${this.addAffiliatedUnit}`).then(
                    res => {
                        if (res.data.code == 0) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            })
                            this.dialogShow = false
                            this.pageNum4 = 1
                            this.getWorkAreaList()
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

        // 获取编辑工区的信息
        getEditData(id) {
            this.compileShow = true
            this.$axios.post(`/api/ProjectVideoAreaApi/edit?id=${id}`).then(
                res => {
                    // console.log(res.data)
                    this.selectId = id
                    this.editAreaName = res.data.data.areaName
                    this.editAddress = res.data.data.address
                    this.editAffiliatedUnit = res.data.data.affiliatedUnit
                }
            )
        },

        // 编辑工区
        editSave() {
            if (this.editAreaName && this.editAddress && this.editAffiliatedUnit) {
                this.$axios.post(`/api/ProjectVideoAreaApi/editSave?projectid=${this.projectId}&areaName=${this.editAreaName}&address=${this.editAddress}&affiliatedUnit=${this.editAffiliatedUnit}&id=${this.selectId}`).then(
                    res => {
                        if (res.data.code == 0) {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            })
                            this.compileShow = false
                            // this.pageNum4 = 1
                            this.getWorkAreaList()
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

        // 删除工区
        removeClick(ids) {
            this.$confirm('是否要删除选中的参建单位？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(`/api/ProjectVideoAreaApi/remove?ids=${ids}`).then(
                    res => {
                        // console.log(res.data)
                        if (res.data.code == 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            })
                            this.pageNum4 = 1
                            this.getWorkAreaList()
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

        // 获取摄像头列表
        getCameraList() {
            this.$axios.post(`/api/ProjectVideo/selectSbProjectVideoByProjectId?projectId=${this.projectId}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`).then(
                res => {
                    // console.log(res.data)
                    this.tableData2 = res.data.data.rows
                    this.pageTotal = res.data.data.total
                }
            )
        },

        // 获取所有工区
        getAllArea() {
            this.$axios.post(`/api/ProjectVideoAreaApi/list?projectId=${this.projectId}&pageNum=1&pageSize=10000`).then(
                res => {
                    this.workAreaList = res.data.data.rows
                }
            )
        },

        // 添加摄像头
        projectVideoAddSave() {
            if (this.addAreaId && this.addVideoName && this.addUrl) {
                this.$axios.post(`/api/ProjectVideo/projectVideoAddSave?areaId=${this.addAreaId}&videoName=${this.addVideoName}&url=${this.addUrl}&videoType=${this.addVideoType}&videoAddress=${this.addVideoAddress}&videoWay=${this.addVideoWay}&contacts=${this.addContacts}&contactsWay=${this.addContactsWat}&department=${this.addDepartment}`).then(
                    res => {
                        // console.log(res.data)
                        if (res.data.code == 0) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            })
                            this.pageNum = 1
                            this.getCameraList()
                            this.personnelShow = false

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

        // 根据id查询摄像头信息
        selectProjectVideoById(id) {
            this.modificationShow=true
            this.$axios.post(`/api/ProjectVideo/selectProjectVideoById?id=${id}`).then(
                res => {
                    // console.log(res.data)
                    this.cameraId = id
                    this.editAreaId = res.data.data.areaId
                    this.editVideoName = res.data.data.videoName
                    this.editUrl  = res.data.data.url
                    this.editVideoType = res.data.data.videoType
                    this.editVideoAddress = res.data.data.videoAddress
                    this.editVideoWay = res.data.data.videoWay
                    this.editContacts = res.data.data.contacts
                    this.editContactsWat = res.data.data.contactsWay
                    this.editDepartment = res.data.data.department
                }
            )
        },

        // 编辑摄像头
        projectVideoEditSave() {
            if (this.editAreaId && this.editVideoName && this.editUrl) {
                this.$axios.post(`/api/ProjectVideo/projectVideoEditSave?areaId=${this.editAreaId}&videoName=${this.editVideoName}&url=${this.editUrl}&videoType=${this.editVideoType}&videoAddress=${this.editVideoAddress}&videoWay=${this.editVideoWay}&contacts=${this.editContacts}&contactsWay=${this.editContactsWat}&department=${this.editDepartment}&id=${this.cameraId}`).then(
                    res => {
                        // console.log(res.data)
                        if (res.data.code == 0) {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            })
                            this.getCameraList()
                            this.modificationShow = false
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

        // 删除摄像头
        deleteSbProjectVideoByIds(ids) {
            this.$confirm('是否要删除选中的摄像头？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(`/api/ProjectVideo/deleteSbProjectVideoByIds?ids=${ids}`).then(
                    res => {
                        // console.log(res.data)
                        if (res.data.code == 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            })
                            this.pageNum=1
                            this.getCameraList()
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
    }
}
</script>