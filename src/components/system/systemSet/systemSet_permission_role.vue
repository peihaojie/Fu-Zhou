<template>
    <div id="systemLiangZhi_permission_role">
        <div class="centent-box">
            <!-- 搜索栏 -->
            <div class="search-box">
                <div class="input-box">
                    <input type="text" placeholder="请输入角色名" v-model="searchRoleName">
                    <a class="el-icon-search" @click="searchClick"></a>
                </div>
                <a class="new" @click="dialogClick">
                    <i class="icon"></i>
                    新增角色
                </a>
            </div>
            <!-- 列表盒子 -->
            <div class="list-box">
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
                        prop="number"
                        label="序号"
                        width="60">
                        </el-table-column>
                        <el-table-column
                        prop="roleName"
                        label="角色名称">
                        </el-table-column>
                        <el-table-column
                        prop="id"
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <a class="table-button" @click="compileClick(scope.row.id)">编辑</a>
                            <a class="table-button" @click="deleteSystemRole(scope.row.id)">删除</a>
                            <!-- <a class="table-button">权限设置</a> -->
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 分页 -->
                <div class="paging-box">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[15, 30, 45]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageTotal">
                    </el-pagination>
                </div>
            </div>
            <!-- 新增对话框 -->
            <div class="dialog-box" v-show="dialogShow">
                <div class="title">
                    新增角色
                    <a class="close" @click="dialogClick">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <ul>
                        <li>
                            <span>
                                角色名
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="roleName">
                        </li>
                        <li>
                            <span>
                                备注
                            </span>
                            <input type="text" v-model="remark">
                        </li>
                        <li class="check-box">
                            <el-checkbox 
                            :indeterminate="isIndeterminate" 
                            v-model="checkAll" 
                            @change="handleCheckAllChange">
                                全选
                            </el-checkbox>
                            <el-checkbox-group 
                            v-model="checkedCities" 
                            @change="handleCheckedCitiesChange">
                                <el-checkbox 
                                v-for="item in cities" 
                                :label="item.id" 
                                :key="item.id">
                                    {{item.privilegesName}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button" @click="insertSystemRole">确定</a>
                </div>
            </div>
            <!-- 编辑对话框 -->
            <div class="dialog-box" v-show="compileShow">
                <div class="title">
                    编辑角色
                    <a class="close" @click="compileShow=false">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <ul>
                        <li>
                            <span>
                                角色名
                                <div class="required">*</div>
                            </span>
                            <input type="text" v-model="roleName">
                        </li>
                        <li>
                            <span>
                                备注
                            </span>
                            <input type="text" v-model="remark">
                        </li>
                        <li class="check-box">
                            <el-checkbox 
                            :indeterminate="isIndeterminate" 
                            v-model="checkAll" 
                            @change="handleCheckAllChange">
                                全选
                            </el-checkbox>
                            <el-checkbox-group 
                            v-model="checkedCities" 
                            @change="handleCheckedCitiesChange">
                                <el-checkbox 
                                v-for="item in cities" 
                                :label="item.id" 
                                :key="item.id">
                                    {{item.privilegesName}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button" @click="updateSystemRole">确定</a>
                </div>
            </div>
            <!-- 遮罩层 -->
            <div class="shade-box" v-show="dialogShow||compileShow"></div>
        </div>
    </div>
</template>

<style lang="less">
    #systemLiangZhi_permission_role {
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
                    min-height: 5.6rem;
                    padding-left: .2rem;
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
                            color: #2323ff;
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
                top: 1.6rem;
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
                    overflow-x: hidden;
                    ul{
                        padding-bottom: .3rem;
                        li {
                            display: flex;
                            height: .7rem;
                            padding-top: .3rem;
                            >span {
                                width: 1.15rem;
                                height: .4rem;
                                font-size: .16rem;
                                text-align: right;
                                position: relative;
                                line-height: .4rem;
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
                                width: 5.4rem;
                                height: .4rem;
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
                        .check-box {
                            height: auto;
                            width: 6.84rem;
                            >.el-checkbox {
                                width: 1.4rem;
                                text-align: right;
                            }
                            .el-checkbox-group {
                                width: 6.6rem;
                            }
                            .el-checkbox {
                                margin: 0;
                                width: 1.4rem;
                                padding-right: .32rem;
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
        return  {
            tableData: [], // 表格数据
            page: 1, // 当前页码
            pageSize: 15, // 每页显示条数
            pageTotal: 0, // 总条数
            dialogShow: false, // 对话框显示状态
            compileShow: false, // 编辑对话框状态
            belong: 0, // 项目id
            hierarchy: 2, // 所属层级
            userId: 0, // 账号id
            checkAll: false, // 全选状态
            checkedCities: [], // 当前选中权限
            cities: [], // 权限列表
            isIndeterminate: false,
            searchRoleName: '', // 搜索框值

            // 对话框数据
            ids: '', // 当前选中权限的id
            remark: '', // 备注
            roleName: '', // 角色名
            id: '', // 当前选中的角色的id
        }
    },
    mounted() {
        this.getProjectId()
        this.getRoleList()
        this.getSystemPrivileges()
    },
    methods: {
        // 获取项目id
        getProjectId() {
            this.belong = sessionStorage.getItem('pid')
            this.userId = sessionStorage.getItem('userId')
        },

        // 全选点击事件
        handleCheckAllChange(val) {
            let cities = []
            for (let i = 0; i < this.cities.length; i++) {
                cities.push(this.cities[i].id)
            }
            this.checkedCities = val ? cities : []
            this.isIndeterminate = false
            // console.log(val)
            if (val) {
                let temp = []
                for (let i = 0; i < cities.length; i++) {
                    if (i == cities.length-1) {
                        temp+=(cities[i])
                    } else {
                        temp+=(cities[i]+',')
                    }
                }
                this.ids = temp
            } else {
                this.ids = ''
            }
        },

        // 多选框点击事件
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length
            this.checkAll = checkedCount === this.cities.length
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
            // console.log(value)
            let temp = ''
            for (let i = 0; i < value.length; i++) {
                if (i == value.length-1) {
                    temp+=(value[i])
                } else {
                    temp+=(value[i]+',')
                }
            }
            this.ids = temp
            // console.log(this.ids)
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
            this.page = val
            this.pageClick()
        },

        // 新增对话框状态切换
        dialogClick() {
            this.remark = '' 
            this.roleName = '' 
            this.checkedCities = []
            this.checkAll = false
            this.ids = ''
            this.dialogShow = !this.dialogShow
        },

        // 获取角色列表
        getRoleList() {
            this.$axios.post(`/api/systemRoleApi/selectSystemRole?page=${this.page}&pageSize=${this.pageSize}&hierarchy=${this.hierarchy}&belong=${this.belong}`).then(
                res => {
                    // console.log(res.data)
                    let temp = []
                    for (let i = 0; i < res.data.data.rows.length; i++) {
                        temp.push({
                            number: (this.page-1)*this.pageSize+i+1, // 序号
                            id: res.data.data.rows[i].id, // 角色id
                            roleName: res.data.data.rows[i].roleName, // 角色名
                        })
                    }
                    this.pageTotal = res.data.data.total
                    this.tableData = temp
                }
            )
        },

        // 获取账号权限
        getSystemPrivileges() {
            this.$axios.post(`/api/systemPrivileges/pc/selectSystemPrivileges?userId=${this.userId}`).then(
                res => {
                    // console.log(res.data)
                    this.cities = res.data.data
                }
            )
        },

        // 创建角色
        insertSystemRole() {
            if (this.roleName && this.ids) {
                this.$axios.post(`/api/systemRoleApi/insertSystemRole?roleName=${this.roleName}&remark=${this.remark}&hierarchy=${this.hierarchy}&belong=${this.belong}&ids=${this.ids}`).then(
                    res => {
                        if (res.data.code == 0) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            })
                            this.dialogShow = false
                            this.pageNum = 1
                            this.getRoleList()
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

        // 编辑
        compileClick(id) {
            this.id = id
            this.$axios.post(`api/systemRoleApi/selectSystemRoleId?id=${this.id}`).then(
                res => {
                    console.log(res.data)
                    this.remark = res.data.data.remark?res.data.data.remark:''
                    this.roleName = res.data.data.roleName
                    this.ids = res.data.data.privilegesId
                    // console.log(res.data.data.privilegesId.split(','))
                    this.compileShow = true
                }
            )
        },

        // 修改角色
        updateSystemRole() {
            if (this.roleName && this.ids) {
                this.$axios.post(`/api/systemRoleApi/updateSystemRole?id=${this.id}&roleName=${this.roleName}&remark=${this.remark}&ids=${this.ids}`).then(
                    res => {
                        if (res.data.code == 0) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                })
                                this.compileShow = false
                                this.pageNum = 1
                                this.getRoleList()
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

        // 删除角色
        deleteSystemRole(id) {
            this.$confirm('是否要删除选中的角色？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(`/api/systemRoleApi/deleteSystemRole?ids=${id}`).then(
                    res => {
                        // console.log(res.data)
                        if (res.data.code == 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            })
                            this.searchClick()
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

        // 搜索
        searchClick() {
            this.$axios.post(`/api/systemRoleApi/selectSystemRole?page=1&pageSize=${this.pageSize}&hierarchy=${this.hierarchy}&belong=${this.belong}&roleName=${this.searchRoleName}`).then(
                res => {
                    // console.log(res.data)
                    let temp = []
                    for (let i = 0; i < res.data.data.rows.length; i++) {
                        temp.push({
                            number: (this.page-1)*this.pageSize+i+1, // 序号
                            id: res.data.data.rows[i].id, // 角色id
                            roleName: res.data.data.rows[i].roleName, // 角色名
                        })
                    }
                    this.pageTotal = res.data.data.total
                    this.tableData = temp
                }
            )
        },

        // 翻页
        pageClick() {
            this.$axios.post(`/api/systemRoleApi/selectSystemRole?page=${this.page}&pageSize=${this.pageSize}&hierarchy=${this.hierarchy}&belong=${this.belong}&roleName=${this.searchRoleName}`).then(
                res => {
                    // console.log(res.data)
                    let temp = []
                    for (let i = 0; i < res.data.data.rows.length; i++) {
                        temp.push({
                            number: (this.page-1)*this.pageSize+i+1, // 序号
                            id: res.data.data.rows[i].id, // 角色id
                            roleName: res.data.data.rows[i].roleName, // 角色名
                        })
                    }
                    this.pageTotal = res.data.data.total
                    this.tableData = temp
                }
            )
        },
    }
}
</script>