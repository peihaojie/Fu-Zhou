<template>
    <div id="systemLiangZhi_blacklist">
        <div class="centent-box">
            <!-- 搜索栏 -->
            <div class="search-box">
                <div class="left-box">
                    <ul class="top-input">
                        <li>
                            <span>&#12288;&#12288;姓名：</span>
                            <input type="text" v-model="empName">
                        </li>
                        <li>
                            <span>&#12288;证件号：</span>
                            <input type="text" v-model="empCode">
                        </li>
                        <!-- <li>
                            <span>&#12288;&#12288;工种：</span>
                            <el-select v-model="professionValue" placeholder="请选择">
                                <el-option
                                v-for="item in professionOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <span>&#12288;&#12288;班组：</span>
                            <input type="text">
                        </li> -->
                        <li style="width:3.5rem"></li>
                        <li style="width:3.5rem"></li>
                    </ul>
                    <!-- <ul class="bottom-input">
                        <li>
                            <span>所属单位：</span>
                            <el-select v-model="contractorValue" placeholder="请选择">
                                <el-option
                                v-for="item in contractorOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                        <li class="date">
                            <span>&#12288;&#12288;日期：</span>
                            <el-date-picker
                                v-model="dateValue"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </li>
                        <li style="width:3.5rem"></li>
                        <li style="width:3.5rem"></li>
                    </ul> -->
                </div>
                <a class="search-button" @click="searchClick">搜索</a>
            </div>
            <!-- 主体区域 -->
            <div class="main-box">
                <!-- 功能栏 -->
                <div class="button-box">
                    <a class="blacklist" @click="dialogShow=true">
                        <i class="icon"></i>
                        拉入黑名单
                    </a>
                    <a class="contract" @click="uploadClick">
                        <i class="icon"></i>
                        上传通报文件
                    </a>
                </div>
                <!-- 列表 -->
                <div class="table-box">
                    <el-table
                    :data="tableData"
                    stripe
                    border
                    @selection-change="handleSelectionChange">
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
                        prop="empName"
                        label="姓名"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        prop="empCode"
                        label="身份证">
                        </el-table-column>
                        <el-table-column
                        prop="cause"
                        label="原因">
                        </el-table-column>
                        <el-table-column
                        label="通报文件"
                        width="100">
                        <template slot-scope="scope">
                            <a class="table-button" @click="openClick(scope.row.url)">查看</a>
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
            <!-- 拉入黑名单 -->
            <div class="dialog-box" v-show="dialogShow">
                <div class="title">
                    拉入黑名单
                    <a class="close" @click="dialogClick">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <ul>
                        <li>
                            <span>
                                姓名
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="addEmpName">
                        </li>
                        <li>
                            <span>
                                身份证号码
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="addEmpCode">
                        </li>
                        <li>
                            <span>
                                闹事原因
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="addCause">
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button" @click="addBlacklist">确定</a>
                </div>
            </div>
            <!-- 上传通报文件 -->
            <div class="dialog-box" v-show="uploadShow">
                <div class="title">
                    上传通报文件
                    <a class="close" @click="uploadShow=false">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <ul>
                        <li class="file">
                            <input type="file" @change="Updata">
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button" @click="uploadBlacklist">确定</a>
                </div>
            </div>
            <!-- 遮罩层 -->
            <div class="shade-box" v-show="dialogShow || uploadShow"></div>
            <!-- 加载层 -->
            <div class="shade-box" v-loading="loading" v-show="loading"></div>
        </div>
    </div>
</template>

<style lang="less">
    #systemLiangZhi_blacklist {
        width: 100%;
        .centent-box {
            border-radius: .04rem;
            background-color: #fff;
            box-shadow: 0 0 .5rem -.3rem #666;
            .search-box {
                height: .9rem;
                padding: 0 .2rem;
                position: relative;
                border-bottom: .1rem solid #f7f7f7;
                .left-box {
                    float: left;
                    width: 100%;
                    height: .8rem;
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
                    top: .2rem;
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
                    .blacklist {
                        .icon {
                            background-image: url('../../../../static/images/system-blacklist.png');
                        }
                        &:hover {
                            .icon {
                                background-image: url('../../../../static/images/system-blacklistHover.png');
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
                            .table-button {
                                color: #0090ff;
                                padding: 0 .08rem;
                                text-decoration: underline;
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
                top: 2.14rem;
                z-index: 200;
                width: 6.84rem;
                // height: 4.92rem;
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
                    // height: 3.52rem;
                    padding-bottom: .3rem;
                    ul{
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
                    .file {
                        input {
                            width: 2rem;
                            border: none;
                            margin: 0 auto;
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
            loading: false, // 加载遮罩层状态
            tableData: [], // 表格数据
            currentPage: 1, // 当前页码
            dialogShow: false, // 新增单位对话框状态
            uploadShow: false, // 上传对话框状态
            pageTotal: 0, // 总条数
            pageSize: 15, // 每页显示条数
            pageNum: 1, // 当前页
            empName: '', // 姓名
            empCode: '', // 身份证号
            addEmpName: '', // 姓名（添加）
            addEmpCode: '', // 身份证号(添加)
            addCause: '', // 闹事原因(添加)
            ids: '', // 上传通报文件的用户id
            file: '', // 通报文件
        }
    },
    created() {
        this.getBlacklist()
        // this.getTemp2()
    },
    methods: {
        // 每页条数切换
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`)
            this.pageSize = val
            this.pageClick()
        },

        // 当前页
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`)
            this.pageNum = val
            this.pageClick()
        },

        // 当前选中的行数
        handleSelectionChange(val) {
            // console.log(val)
            let temp = ''
            for (let i = 0; i < val.length; i++) {
                if (i == val.length-1) {
                    temp+=(val[i].id)
                } else {
                    temp+=(val[i].id+',')
                }
            }
            this.ids = temp
            // console.log(this.ids)
        },

        // 序号
        indexMethod(index) {
            return (this.pageNum-1)*this.pageSize+index+1
        },

        // 新增对话框状态切换
        dialogClick() {
            this.dialogShow = !this.dialogShow
        },

        // 获取黑名单列表
        getBlacklist() {
            this.$axios.post(`/api/hjBlacklist/getBlacklist?pageNum=${this.pageNum}&pageSize=${this.pageSize}`).then(
                res => {
                    // console.log(res.data)
                    this.tableData = res.data.data.rows
                    this.pageTotal = res.data.data.total
                }
            )
        },

        // 搜索
        searchClick() {
            this.pageNum = 1
            this.$axios.post(`/api/hjBlacklist/getBlacklist?pageNum=${this.pageNum}&pageSize=${this.pageSize}&empName=${this.empName}&empCode=${this.empCode}`).then(
                res => {
                    this.tableData = res.data.data.rows
                    this.pageTotal = res.data.data.total
                }
            )
        },

        // 翻页
        pageClick() {
            this.$axios.post(`/api/hjBlacklist/getBlacklist?pageNum=${this.pageNum}&pageSize=${this.pageSize}&empName=${this.empName}&empCode=${this.empCode}`).then(
                res => {
                    this.tableData = res.data.data.rows
                    this.pageTotal = res.data.data.total
                }
            )
        },

        // 查看通报文件
        openClick(url) {
            // console.log(url)
            if (url) {
                window.open(url,"_blank")
            } else {
                this.$message({
                    message: '无通报文件',
                    type: 'error'
                })
            }
            // window.open("https://hujiang.oss-cn-shenzhen.aliyuncs.com/blacklist/%E5%85%B3%E4%BA%8E%E6%85%8E%E7%94%A8%E5%91%A8%E6%96%87%E5%85%B5%E7%AD%89%E4%BA%BA%E7%9A%84%E5%87%BD.pdf","_blank")
            // window.open(url,"_blank")
        },

        // 拉入黑名单
        addBlacklist() {
            if (this.addEmpName && this.addEmpCode && this.addCause) {
                this.$axios.post(`/api/hjBlacklist/addBlacklist?empName=${this.addEmpName}&empCode=${this.addEmpCode}&cause=${this.addCause}`).then(
                    res => {
                        // console.log(res.data)
                        if (res.data.code == 0) {
                            this.$message({
                                message: '拉入成功',
                                type: 'success'
                            })
                            this.dialogShow = false
                            this.pageNum = 1
                            this.getBlacklist()
                        } else {
                            this.$message({
                                message: '拉入失败，请重试',
                                type: 'error'
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

        // 检测有没有选择人员
        uploadClick() {
            // this.file = ''
            if (this.ids == '') {
                this.$message({
                    message: '未选择项目人员',
                    type: 'warning'
                })
            } else {
                this.uploadShow = true
            }
        },

        // 上传通报文件
        uploadBlacklist() {
            this.loading = true
            this.uploadShow = false
            let headers = {headers: {"Content-Type": "multipart/form-data"}}
            this.$axios.post(`/api/hjBlacklist/uploadBlacklist?ids=${this.ids}`,this.file,headers).then(
                res => {
                    // console.log(res.data)
                    this.loading = false
                    if (res.data.code == 0) {
                        this.$message({
                            message: '上传成功',
                            type: 'success'
                        })
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }
            )
        },

        // 拿到需要上传的文件
        Updata(e) {
            let file = e.target.files[0]
            this.file = new FormData() //创建form对象
            this.file.append('file',file) // 通过append向form对象添加数据
            console.log(this.file.get('file')) //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        },
    }
}
</script>