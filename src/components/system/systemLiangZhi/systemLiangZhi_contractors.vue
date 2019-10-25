<template>
    <div id="systemLiangZhi_contractors">
        <div class="centent-box">
            <!-- 搜索栏 -->
            <div class="search-box">
                <div class="left-box">
                    <ul>
                        <li>
                            <span>参建单位名称：</span>
                            <input type="text" v-model="param">
                        </li>
                        <li>
                            <span class="margin">社会统一信用代码：</span>
                            <input type="text" v-model="searchSuid">
                        </li>
                    </ul>
                </div>
                <a class="search-button" @click="searchClick">搜索</a>
            </div>
            <!-- 主体区域 -->
            <div class="main-box">
                <!-- 功能栏 -->
                <div class="button-box">
                    <a class="new" @click="dialogClick">
                        <i class="icon"></i>
                        新增
                    </a>
                    <a class="compile" @click="compileClick">
                        <i class="icon"></i>
                        编辑
                    </a>
                    <a class="delete" @click="deleteClick">
                        <i class="icon"></i>
                        删除
                    </a>
                    <a class="derive" @click="deriveClick">
                        <i class="icon"></i>
                        导出Excel
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
                        prop="number"
                        label="序号"
                        width="50">
                        </el-table-column>
                        <el-table-column
                        prop="licence"
                        label="社会统一信用代码"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="参建单位名称"
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="abbreviation"
                        label="简称"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="type"
                        label="单位类型"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="principal"
                        label="负责人"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="phone"
                        label="联系电话">
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
                    新增单位
                    <a class="close" @click="dialogClick">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <ul>
                        <li>
                            <div>
                                <span>
                                    单位名称
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="constructionName">
                            </div>
                            <div>
                                <span>
                                    简称
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="shortName">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    社会统一信用代码
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="suid">
                            </div>
                            <div>
                                <span>
                                    法人代表
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="legalPerson">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    单位类型
                                    <div class="required">*</div>
                                </span>
                                <el-select v-model="companyType" placeholder="请选择">
                                    <el-option
                                    v-for="item in contractorType"
                                    :key="item.id"
                                    :label="item.title"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                            <div>
                                <span>
                                    负责人
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="contacts">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    联系电话
                                    <div class="required">*</div>
                                </span>
                                <input type="number" v-model="mobilePhone">
                            </div>
                            <div>
                                <span>电子邮箱</span>
                                <input type="text" v-model="email">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>开户银行</span>
                                <input type="text" v-model="bankOpen">
                            </div>
                            <div>
                                <span>注册资金</span>
                                <input type="number" v-model="capital">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>开户地址</span>
                                <input type="text" v-model="bankAddress">
                            </div>
                            <div>
                                <span>开户账号</span>
                                <input type="text" v-model="bankNum">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>单位详细地址</span>
                                <input type="text" v-model="address">
                            </div>
                            <div>
                                <span>备注说明</span>
                                <input type="text" v-model="remark">
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button" @click="insertConstructionCompany">确定</a>
                </div>
            </div>
            <!-- 编辑 -->
            <div class="dialog-box compile-box" v-show="compileShow">
                <div class="title">
                    编辑信息
                    <a class="close" @click="compileShow = false">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <ul>
                        <li>
                            <div>
                                <span>
                                    单位名称
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="constructionName">
                            </div>
                            <div>
                                <span>
                                    简称
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="shortName">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    社会统一信用代码
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="suid">
                            </div>
                            <div>
                                <span>
                                    法人代表
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="legalPerson">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    单位类型
                                    <div class="required">*</div>
                                </span>
                                <el-select v-model="companyType" placeholder="请选择">
                                    <el-option
                                    v-for="item in contractorType"
                                    :key="item.id"
                                    :label="item.title"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                            <div>
                                <span>
                                    负责人
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="contacts">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    联系电话
                                    <div class="required">*</div>
                                </span>
                                <input type="number" v-model="mobilePhone">
                            </div>
                            <div>
                                <span>电子邮箱</span>
                                <input type="text" v-model="email">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>开户银行</span>
                                <input type="text" v-model="bankOpen">
                            </div>
                            <div>
                                <span>注册资金</span>
                                <input type="number" v-model="capital">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>开户地址</span>
                                <input type="text" v-model="bankAddress">
                            </div>
                            <div>
                                <span>开户账号</span>
                                <input type="text" v-model="bankNum">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>单位详细地址</span>
                                <input type="text" v-model="address">
                            </div>
                            <div>
                                <span>备注说明</span>
                                <input type="text" v-model="remark">
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button" @click="updateConstructionCompany">确定</a>
                </div>
            </div>
            <!-- 遮罩层 -->
            <div class="shade-box" v-show="dialogShow || compileShow"></div>
        </div>
    </div>
</template>

<style lang="less">
    #systemLiangZhi_contractors{
        width: 100%;
        .centent-box {
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
                width: 12.02rem;
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
                    padding-left: .43rem;
                    padding-bottom: .3rem;
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
            tableData: [], // 表格数据
            pageNum: 1, // 当前页码
            dialogShow: false, // 新增单位对话框状态
            compileShow: false, // 编辑对话框状态
            contractorType: [], // 单位类型选项
            pid: 0, // 项目id
            constructionName: '', // 单位名称
            shortName: '', // 简称
            capital: '', // 注册资金
            companyType: '', // 单位类型
            legalPerson: '', // 法人代表
            suid: '', // 社会统一信用代码
            bankOpen: '', // 开户银行
            bankNum: '', // 开户账号
            bankAddress: '', // 开户地址
            address: '', // 单位详细地址
            contacts: '', // 负责人 
            mobilePhone: '', // 电话
            email: '', // 电子邮箱
            remark: '', // 备注
            // pageNum: 1, // 当前页
            pageSize: 15, // 每页显示条数
            pageTotal: 0, // 总条数
            selectionId: '', // 当前选中的id
            param: '', // 参建单位名称输入框名称
            searchSuid: '', // 信用代码输入框
        }
    },
    created() {
        this.getProjectId()
        this.getContractorType()
        this.selectConstructionCompanyList()
    },
    methods: {
        // 获取项目id
        getProjectId() {
            this.pid = sessionStorage.getItem('pid')
        },

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
            this.selectionId = temp
            // console.log(this.selectionId)
        },

        // 新增单位对话框状态切换
        dialogClick() {
            this.constructionName = ''
            this.shortName = ''
            this.capital = ''
            this.companyType = ''
            this.legalPerson = ''
            this.suid = ''
            this.bankOpen = ''
            this.bankNum = ''
            this.bankAddress = ''
            this.address = ''
            this.contacts = ''
            this.mobilePhone = ''
            this.email = ''
            this.remark = ''
            this.dialogShow = !this.dialogShow
        },

        // 删除
        deleteClick() {
            // console.log(this.selectionId)
            if (this.selectionId == '') {
                this.$message({
                    message: '未选择参建单位',
                    type: 'warning'
                })
            } else {
                this.$confirm('是否要删除选中的参建单位？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post(`/api/constructionCompanyApi/deleteConstructionCompanyIds?ids=${this.selectionId}`).then(
                        res => {
                            // console.log(res.data)
                            if (res.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
                                })
                                this.selectConstructionCompanyList()
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
            }
        },

        // 编辑
        compileClick() {
            // this.compileShow = !this.compileShow
            if (this.selectionId == '') {
                this.$message({
                    message: '未选择参建单位',
                    type: 'warning'
                })
            } else if (this.selectionId.includes(',')) {
                this.$message({
                    message: '一次只能编辑一个参建单位',
                    type: 'warning'
                })
            } else {
                // console.log(Number(this.selectionId))
                this.compileShow = true
                this.selectConstructionCompanyId()
            }
        },

        // 获取单位类型
        getContractorType() {
            this.$axios.post(`/api/dictionariesApi/selectDictionaries?category=UNIT_TYPE`).then(
                res => {
                    // console.log(res.data)
                    this.contractorType = res.data.data
                }
            )
        },

        // 新增单位
        insertConstructionCompany() {
            if (this.constructionName && this.shortName && this.suid && this.companyType && this.contacts && this.mobilePhone) {
                this.$axios.post(`/api/constructionCompanyApi/insertConstructionCompany?projectId=${this.pid}&constructionName=${this.constructionName}&shortName=${this.shortName}&capital=${this.capital}&companyType=${this.companyType}&legalPerson=${this.legalPerson}&suid=${this.suid}&bankOpen=${this.bankOpen}&bankNum=${this.bankNum}&bankAddress=${this.bankAddress}&address=${this.address}&contacts=${this.contacts}&mobilePhone=${this.mobilePhone}&email=${this.email}&remark=${this.remark}`).then(
                    res => {
                        if (res.data.code == 0) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            })
                            this.dialogShow = false
                            this.pageNum = 1
                            this.selectConstructionCompanyList()
                        } else {
                            this.$message({
                                message: '添加失败，请重试',
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

        // 获取参建单位列表
        selectConstructionCompanyList() {
            this.$axios.post(`/api/constructionCompanyApi/selectConstructionCompanyList?projectId=${this.pid}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`).then(
                res => {
                    // console.log(res.data)
                    let temp = []
                    for (let i = 0; i < res.data.data.rows.length; i++) {
                        // console.log(i)
                        temp.push({
                            number: (this.pageNum-1)*this.pageSize+i+1, 
                            licence: res.data.data.rows[i].suid, 
                            name: res.data.data.rows[i].constructionName, 
                            abbreviation: res.data.data.rows[i].shortName, 
                            type: res.data.data.rows[i].dictionaries.title, 
                            principal: res.data.data.rows[i].contacts, 
                            phone: res.data.data.rows[i].mobilePhone,
                            id:  res.data.data.rows[i].id,
                        })
                    }
                    this.pageTotal = res.data.data.total
                    this.tableData = temp
                }
            )
        },

        // 根据id获取参建单位信息
        selectConstructionCompanyId() {
            this.$axios.post(`/api/constructionCompanyApi/selectConstructionCompanyId?id=${Number(this.selectionId)}`).then(
                res => {
                    console.log(res.data.data)
                    this.constructionName = res.data.data.constructionName
                    this.shortName = res.data.data.shortName
                    this.capital = res.data.data.capital?res.data.data.capital:''
                    this.companyType = res.data.data.dictionaries.title
                    this.legalPerson = res.data.data.legalPerson
                    this.suid = res.data.data.suid
                    this.remark = res.data.data.remark?res.data.data.remark:''
                    this.bankOpen = res.data.data.bankOpen?res.data.data.bankOpen:''
                    this.bankNum = res.data.data.bankNum?res.data.data.bankNum:''
                    this.bankAddress = res.data.data.bankAddress?res.data.data.bankAddress:''
                    this.address = res.data.data.address?res.data.data.address:''
                    this.contacts = res.data.data.contacts?res.data.data.contacts:''
                    this.mobilePhone = res.data.data.mobilePhone?res.data.data.mobilePhone:''
                    this.email = res.data.data.email?res.data.data.email:''
                }
            )
        },

        // 编辑信息
        updateConstructionCompany() {
            if (this.constructionName && this.shortName && this.suid && this.companyType && this.contacts && this.mobilePhone) {
                for (let i = 0; i < this.contractorType.length; i++) {
                    if (this.companyType == this.contractorType[i].title) {
                        this.companyType = this.contractorType[i].id
                    }
                }
                this.$axios.post(`/api/constructionCompanyApi/updateConstructionCompany?id=${Number(this.selectionId)}&constructionName=${this.constructionName}&shortName=${this.shortName}&capital=${this.capital}&companyType=${this.companyType}&legalPerson=${this.legalPerson}&suid=${this.suid}&bankOpen=${this.bankOpen}&bankNum=${this.bankNum}&bankAddress=${this.bankAddress}&address=${this.address}&contacts=${this.contacts}&mobilePhone=${this.mobilePhone}&email=${this.email}&remark=${this.remark}`).then(
                    res => {
                        console.log(res.data)
                        if (res.data.code == 0) {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            })
                            this.compileShow = false
                            this.pageNum = 1
                            this.searchClick()
                        } else {
                            this.$message({
                                message: '修改失败，请重试',
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

        // 单位类型测试
        companyTypeChange() {
            console.log(this.companyType)
        },

        // 搜索
        searchClick() {
            this.pageNum = 1
            this.$axios.post(`/api/constructionCompanyApi/selectConstructionCompanyList?projectId=${this.pid}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&param=${this.param}&suid=${this.searchSuid}`).then(
                res => {
                    // console.log(res.data)
                    let temp = []
                    if (res.data.data.rows) {
                        for (let i = 0; i < res.data.data.rows.length; i++) {
                            // console.log(i)
                            temp.push({
                                number: (this.pageNum-1)*this.pageSize+i+1, 
                                licence: res.data.data.rows[i].suid, 
                                name: res.data.data.rows[i].constructionName, 
                                abbreviation: res.data.data.rows[i].shortName, 
                                type: res.data.data.rows[i].dictionaries.title, 
                                principal: res.data.data.rows[i].contacts, 
                                phone: res.data.data.rows[i].mobilePhone,
                                id:  res.data.data.rows[i].id,
                            })
                        }
                    }
                    this.pageTotal = res.data.data.total
                    this.tableData = temp
                }
            )
        },

        // 翻页
        pageClick() {
            this.$axios.post(`/api/constructionCompanyApi/selectConstructionCompanyList?projectId=${this.pid}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&param=${this.param}&suid=${this.searchSuid}`).then(
                res => {
                    // console.log(res.data)
                    if (res.data.data.rows) {
                        let temp = []
                        for (let i = 0; i < res.data.data.rows.length; i++) {
                            // console.log(i)
                            temp.push({
                                number: (this.pageNum-1)*this.pageSize+i+1, 
                                licence: res.data.data.rows[i].suid, 
                                name: res.data.data.rows[i].constructionName, 
                                abbreviation: res.data.data.rows[i].shortName, 
                                type: res.data.data.rows[i].dictionaries.title, 
                                principal: res.data.data.rows[i].contacts, 
                                phone: res.data.data.rows[i].mobilePhone,
                                id:  res.data.data.rows[i].id,
                            })
                        }
                        this.pageTotal = res.data.data.total
                        this.tableData = temp
                    }  
                }
            )
        },

        // 导出Excel
        deriveClick() {
            location.href=`http://47.106.71.3:8080/api/constructionCompanyApi/export?projectId=${this.pid}&param=${this.param}&suid=${this.searchSuid}`
        },
    }
}
</script>