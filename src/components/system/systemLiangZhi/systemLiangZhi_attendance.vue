<template>
    <div id="systemLiangZhi_attendance">
        <div class="centent-box">
            <!-- 搜索栏 -->
            <div class="search-box">
                <div class="left-box">
                    <ul class="top-input">
                        <li>
                            <span>&#12288;&#12288;姓名：</span>
                            <input type="text" v-model="name">
                        </li>
                        <li>
                            <span>&#12288;证件号：</span>
                            <input type="text" v-model="idCode">
                        </li>
                        <li>
                            <span>&#12288;&#12288;工种：</span>
                            <el-select clearable v-model="professionValue" placeholder="请选择">
                                <el-option
                                v-for="item in profession"
                                :key="item.id"
                                :label="item.title"
                                :value="item.tag">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <span>&#12288;&#12288;班组：</span>
                            <el-select clearable v-model="teamValue" placeholder="请选择">
                                <el-option
                                v-for="item in team"
                                :key="item.id"
                                :label="item.teamName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </li>
                    </ul>
                    <ul class="bottom-input">
                        <li>
                            <span>所属单位：</span>
                            <el-select clearable v-model="contractorValue" placeholder="请选择">
                                <el-option
                                v-for="item in contractor"
                                :key="item.id"
                                :label="item.constructionName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </li>
                        <li class="date">
                            <span>&#12288;&#12288;日期：</span>
                            <el-date-picker
                                unlink-panels
                                v-model="dateValue"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                @change="getTime"
                                value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </li>
                        <li style="width:3.5rem"></li>
                        <li style="width:3.5rem"></li>
                    </ul>
                </div>
                <a class="search-button" @click="searchClick">搜索</a>
            </div>
            <!-- 主体区域 -->
            <div class="main-box">
                <!-- 功能栏 -->
                <div class="button-box">
                    <!-- <a class="delete">
                        <i class="icon"></i>
                        删除
                    </a> -->
                    <a class="derive" @click="deriveClick">
                        <i class="icon"></i>
                        导出Excel
                    </a>
                    <a class="derive" @click="getbb">
                        <i class="icon"></i>
                        导出近30天考勤报表
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
                        prop="number"
                        label="序号"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="姓名"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        prop="jobNumber"
                        label="工号"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        prop="project"
                        label="项目名称"
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="contractor"
                        label="所属单位"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="profession"
                        label="工种"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="turnover"
                        label="进出标识"
                        width="100">
                        <template slot-scope="scope">
                            {{ scope.row.turnover == 'in' ? '进' : '出'}}
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="time"
                        label="打开卡时间">
                        </el-table-column>
                        <el-table-column
                        label="查看考勤照片"
                        width="150"
                        overflow="none">
                        <template slot-scope="scope" style="overflow: none;">
                            <a class="table-button">
                                查看
                                <img :src="scope.row.url" alt="">
                            </a>
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
        </div>
    </div>
</template>

<style lang="less">
    #systemLiangZhi_attendance {
        width: 100%;
        .centent-box {
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
                        overflow: visible;
                        .el-table__body-wrapper {
                            overflow: visible;
                        }
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
                                &:hover {
                                    img {
                                        width: 2rem;
                                        height: 2rem;
                                    }
                                }
                            }
                            img {
                                width: 0;
                                height: 0;
                                position: absolute;
                                z-index: 200;
                                left: -2rem;
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
                height: 4.92rem;
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
                    height: 3.52rem;
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
            pageSize: 15, // 每页显示条数
            pageTotal: 0, // 总条数
            profession: [], // 工种选项
            professionValue: '', // 工种值
            contractor: [], // 所属参建单位选项
            contractorValue: '', // 所属参建单位值
            team: [], // 班组选项
            teamValue: '', // 班组值
            dateValue: '', // 日期
            pid: 0, // 项目id
            name: '', // 姓名
            idCode: '', // 证件号
            teamName: '', // 所属班组
            startTime: '', // 开始时间
            endTime: '', // 结束时间
        }
    },
    created() {
        this.getProjectId()
        this.getAttendanceList()
        this.getContractorList()
        this.getTeamList()
        this.getWorkList()
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

        // 获取考勤记录列表
        getAttendanceList() {
            this.$axios.post(`/api/attendanceRecordPcApi/selectAttendanceRecordList?projectId=${this.pid}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`).then(
                res => {
                    console.log(res.data)
                    let temp = []
                    for (let i = 0; i < res.data.data.rows.length; i++) {
                        temp.push({
                            number: (this.pageNum-1)*this.pageSize+i+1, // 序号
                            name: res.data.data.rows[i].name, // 姓名
                            jobNumber: res.data.data.rows[i].employeeId, // 工号
                            project: res.data.data.rows[i].projectName, // 项目名称
                            contractor: res.data.data.rows[i].companyName, // 所属参建单位
                            profession: res.data.data.rows[i].jobName, // 工种
                            turnover: res.data.data.rows[i].direction, // 进出标识
                            time: res.data.data.rows[i].passedTime, // 打开卡时间
                            url: res.data.data.rows[i].sitePhoto, // 打卡照片
                        })
                    }
                    this.pageTotal = res.data.data.total
                    this.tableData = temp
                }
            )
        },

        // 获取参建单位
        getContractorList() {
            this.$axios.post(`/api/constructionCompanyApi/selectConstructionCompanyList?projectId=${this.pid}`).then(
                res => {
                    // console.log(res.data.data.rows)
                    this.contractor = res.data.data.rows
                }
            )
        },

        // 获取班组
        getTeamList() {
            this.$axios.post(`/api/pcCompanyLibrary/selectHjTeamList?projectId=${this.pid}`).then(
                res => {
                    // console.log(res.data)
                    this.team = res.data.data.rows
                }
            )
        },

        // 获取工种
        getWorkList() {
            this.$axios.post(`/api/dictionariesApi/selectDictionaries?category=WORK_TYPE`).then(
                res => {
                    // console.log(res.data)
                    this.profession = res.data.data
                }
            )
        },

        // 获取开始时间与结束时间
        getTime() {
            // console.log(this.dateValue[0])
            this.startTime = this.dateValue[0]
            this.endTime = this.dateValue[1]
        },

        // 搜索
        searchClick() {
            this.$axios.post(`/api/attendanceRecordPcApi/selectAttendanceRecordList?projectId=${this.pid}&pageNum=1&pageSize=${this.pageSize}&name=${this.name}&idCode=${this.idCode}&jobCode=${this.professionValue}&teamName=${this.teamValue}&companyId=${this.contractorValue}&startTime=${this.startTime}&endTime=${this.endTime}`).then (
                res => {
                    let temp = []
                    for (let i = 0; i < res.data.data.rows.length; i++) {
                        temp.push({
                            number: (this.pageNum-1)*this.pageSize+i+1, // 序号
                            name: res.data.data.rows[i].name, // 姓名
                            jobNumber: res.data.data.rows[i].employeeId, // 工号
                            project: res.data.data.rows[i].projectName, // 项目名称
                            contractor: res.data.data.rows[i].companyName, // 所属参建单位
                            profession: res.data.data.rows[i].jobName, // 工种
                            turnover: res.data.data.rows[i].direction, // 进出标识
                            time: res.data.data.rows[i].passedTime, // 打开卡时间
                            url: res.data.data.rows[i].sitePhoto, // 打卡照片
                        })
                    }
                    this.pageTotal = res.data.data.total
                    this.tableData = temp
                }
            )
        },

        // 翻页
        pageClick() {
            this.$axios.post(`/api/attendanceRecordPcApi/selectAttendanceRecordList?projectId=${this.pid}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&name=${this.name}&idCode=${this.idCode}&jobCode=${this.professionValue}&teamName=${this.teamValue}&companyId=${this.contractorValue}&startTime=${this.startTime}&endTime=${this.endTime}`).then (
                res => {
                    let temp = []
                    for (let i = 0; i < res.data.data.rows.length; i++) {
                        temp.push({
                            number: (this.pageNum-1)*this.pageSize+i+1, // 序号
                            name: res.data.data.rows[i].name, // 姓名
                            jobNumber: res.data.data.rows[i].employeeId, // 工号
                            project: res.data.data.rows[i].projectName, // 项目名称
                            contractor: res.data.data.rows[i].companyName, // 所属参建单位
                            profession: res.data.data.rows[i].jobName, // 工种
                            turnover: res.data.data.rows[i].direction, // 进出标识
                            time: res.data.data.rows[i].passedTime, // 打开卡时间
                            url: res.data.data.rows[i].sitePhoto, // 打卡照片
                        })
                    }
                    this.pageTotal = res.data.data.total
                    this.tableData = temp
                }
            )
        },

         // 导出Excel
        deriveClick() {
            location.href = `http://47.106.71.3:8080/api/attendanceRecordPcApi/export?projectId=${this.pid}&name=${this.name}&idCode=${this.idCode}&jobCode=${this.professionValue}&teamName=${this.teamValue}&companyId=${this.contractorValue}&startTime=${this.startTime}&endTime=${this.endTime}`
        },

        // 导出近30天考勤报表
        getbb() {
            location.href = `http://47.106.71.3:8080/api/kqbb/getbb?projectId=${this.pid}`
        },
    }
}
</script>