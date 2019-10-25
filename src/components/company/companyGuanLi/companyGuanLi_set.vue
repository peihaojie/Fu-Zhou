<template>
    <div id="companyGuanLi_set">
        <div class="centent-box">
            <!-- 搜索栏 -->
            <div class="search-box">
                <div class="input-box">
                    <input type="text" placeholder="请输入公司名称" v-model="searchName">
                    <a class="el-icon-search" @click="searchClick"></a>
                </div>
                <a class="new" @click="dialogClick">
                    <i class="icon"></i>
                    新增公司
                </a>
            </div>
            <!-- 列表盒子 -->
            <div class="list-box">
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
                        width="60">
                        </el-table-column>
                        <el-table-column
                        prop="companyName"
                        label="公司名称"
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="shortName"
                        label="公司简称"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        prop="companyType"
                        label="单位类型"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        prop="contacts"
                        label="负责人"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        prop="mobilePhone"
                        label="电话">
                        </el-table-column>
                        <el-table-column
                        prop=""
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <a class="table-button" @click="getIdcompanyList(scope.row.id)">编辑</a>
                            <!-- <a class="table-button">绑定账号</a> -->
                            <a class="table-button" @click="deleteClick(scope.row.id)">删除</a>
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
                        :page-sizes="[10, 20, 30]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageTotal">
                    </el-pagination>
                </div>
            </div>
            <!-- 新增对话框 -->
            <div class="dialog-box" v-show="dialogShow">
                <div class="title">
                    新增公司
                    <a class="close" @click="dialogClick">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <ul>
                        <li>
                            <span>
                                企业名称
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="companyName">
                        </li>
                        <li>
                            <span>
                                企业简称
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="shortName">
                        </li>
                        <li>
                            <span>
                                负责人
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="contacts">
                        </li>
                        <li>
                            <span>
                                联系电话
                                <div class="required">*</div>
                            </span>
                            <input type="number" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model="mobilePhone">
                        </li>
                        <li>
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
                        </li>
                        <li>
                            <span>
                                注册资金（万元）
                            </span>
                            <input type="number" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model="capital">
                        </li>
                        <li>
                            <span>
                                地址
                            </span>
                            <input type="text" v-model="address">
                        </li>
                        <li>
                            <span>
                                法人代表
                            </span>
                            <input type="text" v-model="legalPerson">
                        </li>
                        <li>
                            <span>
                               社会统一信用代码
                            </span>
                            <input type="text" v-model="suid">
                        </li>
                        <li>
                            <span>
                                组织机构信用代码
                            </span>
                            <input type="text" v-model="organizationCode">
                        </li>
                        <li>
                            <span>
                                电子邮箱
                            </span>
                            <input type="text" v-model="email">
                        </li>
                        <li>
                            <span>
                                开户行
                            </span>
                            <input type="text" v-model="bankOpen">
                        </li>
                        <li>
                            <span>
                                开户地址
                            </span>
                            <input type="text" v-model="bankAddress">
                        </li>
                        <li>
                            <span>
                                开户账号
                            </span>
                            <input type="number" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model="bankNum">
                        </li>
                        <li>
                            <span>
                                备注
                            </span>
                            <input type="text" v-model="remark">
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button" @click="insertHjCompanyLibrary">确定</a>
                </div>
            </div>
            <!-- 编辑对话框 -->
            <div class="dialog-box" v-show="compileShow">
                <div class="title">
                    新增公司
                    <a class="close" @click="compileShow=false">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <ul>
                        <li>
                            <span>
                                企业名称
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="companyName">
                        </li>
                        <li>
                            <span>
                                企业简称
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="shortName">
                        </li>
                        <li>
                            <span>
                                负责人
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="contacts">
                        </li>
                        <li>
                            <span>
                                联系电话
                                <div class="required">*</div>
                            </span>
                            <input type="number" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model="mobilePhone">
                        </li>
                        <li>
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
                        </li>
                        <li>
                            <span>
                                注册资金（万元）
                            </span>
                            <input type="number" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model="capital">
                        </li>
                        <li>
                            <span>
                                地址
                            </span>
                            <input type="text" v-model="address">
                        </li>
                        <li>
                            <span>
                                法人代表
                            </span>
                            <input type="text" v-model="legalPerson">
                        </li>
                        <li>
                            <span>
                               社会统一信用代码
                            </span>
                            <input type="text" v-model="suid">
                        </li>
                        <li>
                            <span>
                                组织机构信用代码
                            </span>
                            <input type="text" v-model="organizationCode">
                        </li>
                        <li>
                            <span>
                                电子邮箱
                            </span>
                            <input type="text" v-model="email">
                        </li>
                        <li>
                            <span>
                                开户行
                            </span>
                            <input type="text" v-model="bankOpen">
                        </li>
                        <li>
                            <span>
                                开户地址
                            </span>
                            <input type="text" v-model="bankAddress">
                        </li>
                        <li>
                            <span>
                                开户账号
                            </span>
                            <input type="number" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model="bankNum">
                        </li>
                        <li>
                            <span>
                                备注
                            </span>
                            <input type="text" v-model="remark">
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button" @click="updateCompanyLibrary">确定</a>
                </div>
            </div>
            <!-- 遮罩层 -->
            <div class="shade-box" v-show="dialogShow||compileShow"></div>
        </div>
    </div>
</template>

<style lang="less">
    #companyGuanLi_set {
        width: 100%;
        .centent-box {
            border-radius: .04rem;
            background-color: #fff;
            box-shadow: 0 0 .5rem -.3rem #666;
            .search-box {
                height: .7rem;
                padding-top: .15rem;
                padding-left: .2rem;
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
                .new {
                    float: right;
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
            }
            .list-box {
                .table-box {
                    width: 100%;
                    min-height: 6.6rem;
                    padding-left: .2rem;
                    .el-table {
                        width: 16.28rem;
                        // width: 100%;
                        th {
                            padding: 0;
                            div {
                                color: #4a4a4a;
                                height: .6rem;
                                line-height: .6rem;
                                background-color: #c5e8ff;
                            }
                        }
                        td {
                            padding: 0;
                            div {
                                height: .6rem;
                                color: #646464;
                                line-height: .6rem;
                            }
                        }
                        .table-button {
                            color: #2323ff;
                            padding: 0 .08rem;
                            text-decoration: underline;
                        }
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
                top: .48rem;
                z-index: 200;
                width: 10.44rem;
                height: 7rem;
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
                    overflow: auto;
                    height: 5.6rem;
                    ul{
                        padding-bottom: .35rem;
                        li {
                            display: flex;
                            height: .85rem;
                            padding-top: .35rem;
                            >span {
                                width: 2.64rem;
                                height: .5rem;
                                font-size: .16rem;
                                text-align: right;
                                position: relative;
                                line-height: .5rem;
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
                                width: 6rem;
                                height: .5rem;
                                padding-left: .1rem;
                                border-radius: .04rem;
                                border: .01rem solid #b1b1b1;
                                &::-webkit-outer-spin-button,
                                &::-webkit-inner-spin-button {
                                    appearance: none;
                                }
                                &[type="number"] {
                                    appearance: textfield;
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
            dialogShow: false, // 对话框显示状态
            compileShow: false, // 编辑对话框状态
            companyId: 0, // 所属公司id
            pageNum: 1, // 当前页码
            pageSize: 10, // 每页记录数
            pageTotal: 0, // 总条数
            searchName: '', // 需要搜索的公司名称
            selectionId: '', // 当前选中的行数
            id: '', // 当前在修改的公司id

            // 对话框数据
            contractorType: [], // 单位类型选项
            companyType: '', // 单位类型
            companyName: '', // 公司名称
            shortName: '', // 简称
            contacts: '', // 负责人
            mobilePhone: '', // 电话
            capital: '', // 注册资金
            legalPerson: '', // 法人代表
            suid: '', // 社会统一信用代码
            organizationCode: '', // 组织机构代码
            bankOpen: '', // 基本账户开户银行
            bankNum: '', // 基本账户银行账户
            bankAddress: '', // 开户地址
            address: '', // 单位详细地址
            email: '', // 电子邮箱
            remark: '', // 备注
        }
    },
    created() {
        this.getCompanyId()
        this.getCompanyList()
        this.getContractorType()
    },
    methods: {
        // 获取公司id
        getCompanyId() {
            this.companyId = sessionStorage.getItem('cid')
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

        // 新增对话框状态切换
        dialogClick() {
            this.companyType = '' // 单位类型
            this.companyName = '' // 公司名称
            this.shortName = '' // 简称
            this.contacts = '' // 负责人
            this.mobilePhone = '' // 电话
            this.capital = '' // 注册资金
            this.legalPerson = '' // 法人代表
            this.suid = '' // 社会统一信用代码
            this.organizationCode = '' // 组织机构代码
            this.bankOpen = '' // 基本账户开户银行
            this.bankNum = '' // 基本账户银行账户
            this.bankAddress = '' // 开户地址
            this.address = '' // 单位详细地址
            this.email = '' // 电子邮箱
            this.remark = '' // 备注
            this.dialogShow = !this.dialogShow
        },

        // 获取公司列表
        getCompanyList() {
            this.$axios.post(`/api/pcCompanyLibrary/companyLibraryList?companyId=${this.companyId}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`).then(
                res => {
                    // console.log(res.data)
                    let temp = []
                    for (let i = 0; i < res.data.data.rows.length; i++) {
                        temp.push({
                            number: (this.pageNum-1)*this.pageSize+i+1, // 序号
                            companyName: res.data.data.rows[i].companyName, // 公司名称
                            shortName: res.data.data.rows[i].shortName, // 公司简称
                            contacts: res.data.data.rows[i].contacts, // 负责人
                            mobilePhone: res.data.data.rows[i].mobilePhone, // 电话
                            companyType: res.data.data.rows[i].dictionaries.title, // 单位类型
                            id: res.data.data.rows[i].id, // 公司id
                        })
                    }
                    this.pageTotal = res.data.data.total
                    this.tableData = temp
                }
            )
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

        // 添加公司
        insertHjCompanyLibrary() {
            if (this.companyName && this.shortName && this.contacts && this.mobilePhone && this.companyType) {
                this.$axios.post(`/api/pcCompanyLibrary/insertHjCompanyLibrary?pid=${this.companyId}&companyName=${this.companyName}&shortName=${this.shortName}&companyType=${this.companyType}&contacts=${this.contacts}&mobilePhone=${this.mobilePhone}&capital=${this.capital}&legalPerson=${this.legalPerson}&suid=${this.suid}&organizationCode=${this.organizationCode}&bankOpen=${this.bankOpen}&bankNum=${this.bankNum}&bankAddress=${this.bankAddress}&address=${this.address}&email=${this.email}&remark=${this.remark}`).then(
                    res => {
                        // console.log(res.data)
                        if (res.data.code == 0) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            })
                            this.dialogShow = false
                            this.pageNum = 1
                            this.getCompanyList()
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

        // 搜索
        searchClick() {
            this.$axios.post(`/api/pcCompanyLibrary/companyLibraryList?companyId=${this.companyId}&pageNum=1&pageSize=${this.pageSize}&companyName=${this.searchName}`).then(
                res => {
                    // console.log(res.data)
                    let temp = []
                    for (let i = 0; i < res.data.data.rows.length; i++) {
                        temp.push({
                            number: (this.pageNum-1)*this.pageSize+i+1, // 序号
                            companyName: res.data.data.rows[i].companyName, // 公司名称
                            shortName: res.data.data.rows[i].shortName, // 公司简称
                            contacts: res.data.data.rows[i].contacts, // 负责人
                            mobilePhone: res.data.data.rows[i].mobilePhone, // 电话
                            companyType: res.data.data.rows[i].dictionaries.title, // 单位类型
                            id: res.data.data.rows[i].id, // 公司id
                        })
                    }
                    this.pageTotal = res.data.data.total
                    this.tableData = temp
                }
            )
        },

        // 翻页
        pageClick() {
            this.$axios.post(`/api/pcCompanyLibrary/companyLibraryList?companyId=${this.companyId}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&companyName=${this.searchName}`).then(
                res => {
                    // console.log(res.data)
                    if (res.data.data.rows) {
                        let temp = []
                        for (let i = 0; i < res.data.data.rows.length; i++) {
                            temp.push({
                                number: (this.pageNum-1)*this.pageSize+i+1, // 序号
                                companyName: res.data.data.rows[i].companyName, // 公司名称
                                shortName: res.data.data.rows[i].shortName, // 公司简称
                                contacts: res.data.data.rows[i].contacts, // 负责人
                                mobilePhone: res.data.data.rows[i].mobilePhone, // 电话
                                companyType: res.data.data.rows[i].dictionaries.title, // 单位类型
                                id: res.data.data.rows[i].id, // 公司id
                            })
                        }
                        this.pageTotal = res.data.data.total
                        this.tableData = temp
                    }
                }
            )
        },

        // 根据id拿到公司的详细信息
        getIdcompanyList(id) {
            this.id = id
            this.$axios.post(`/api/pcCompanyLibrary/selectHjCompanyLibrary?id=${id}`).then(
                res => {
                    // console.log(res.data)
                    if (res.data.code==0) {
                        this.companyType = res.data.data.companyType
                        this.companyName = res.data.data.companyName
                        this.shortName = res.data.data.shortName
                        this.contacts = res.data.data.contacts
                        this.mobilePhone = res.data.data.mobilePhone
                        this.capital = res.data.data.capital?res.data.data.capital:''
                        // this.capital = 0
                        this.legalPerson = res.data.data.legalPerson?res.data.data.legalPerson:''
                        this.suid = res.data.data.suid?res.data.data.suid:''
                        this.organizationCode = res.data.data.organizationCode?res.data.data.organizationCode:''
                        this.bankOpen = res.data.data.bankOpen?res.data.data.bankOpen:''
                        this.bankNum = res.data.data.bankNum?res.data.data.bankNum:''
                        this.bankAddress = res.data.data.bankAddress?res.data.data.bankAddress:''
                        this.address = res.data.data.address?res.data.data.address:''
                        this.email = res.data.data.email?res.data.data.email:''
                        this.remark = res.data.data.remark?res.data.data.remark:''
                        this.compileShow = true
                    } else {
                        this.$message({
                            message: `${res.data.msg}`,
                            type: 'warning'
                        })
                    }
                }
            )
        },

        // 修改公司信息
        updateCompanyLibrary() {
            if (this.companyName && this.shortName && this.contacts && this.mobilePhone &&this.companyType) {
                this.$axios.post(`/api/pcCompanyLibrary/updateHjCompanyLibrary?id=${this.id}&companyName=${this.companyName}&shortName=${this.shortName}&companyType=${this.companyType}&contacts=${this.contacts}&mobilePhone=${this.mobilePhone}&capital=${this.capital}&legalPerson=${this.legalPerson}&suid=${this.suid}&organizationCode=${this.organizationCode}&bankOpen=${this.bankOpen}&bankNum=${this.bankNum}&bankAddress=${this.bankAddress}&address=${this.address}&email=${this.email}&remark=${this.remark}`).then(
                    res => {
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

        // 删除
        deleteClick(id) {
            this.$confirm('是否要删除选中的参建单位？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(`/api/pcCompanyLibrary/deleteHjCompanyLibrary?ids=${id}`).then(
                    res => {
                        console.log(res.data)
                        if (res.data.code == 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            })
                            this.getCompanyList()
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