<template>
    <div id="systemLiangZhi_personnel">
        <div class="centent-box">
            <!-- 搜索栏 -->
            <div class="search-box">
                <div class="left-box">
                    <ul class="top-input">
                        <li>
                            <span>&#12288;&#12288;姓名：</span>
                            <input type="text" v-model="searchName">
                        </li>
                        <li>
                            <span>&#12288;证件号：</span>
                            <input type="text" v-model="searchIdCode">
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
                            <span>手机号码：</span>
                            <input type="text" v-model="searchPhon">
                        </li>
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
                        <li>
                            <span>在场状态：</span>
                            <el-select clearable v-model="typeValue" placeholder="请选择">
                                <el-option
                                v-for="item in typeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                        <li style="width:3.5rem"></li>
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
                    <a class="synchronization" @click="lastClick">
                        <i class="icon"></i>
                        同步信息
                    </a>
                    <a class="derive" @click="deriveClick">
                        <i class="icon"></i>
                        导出人员
                    </a>
                    <a class="contract" @click="downloadIDCardPDF">
                        <i class="icon"></i>
                        生成合同
                    </a>
                    <a class="last" @click="lastClick">
                        <i class="icon"></i>
                        进场
                    </a>
                    <a class="next" @click="nextClick">
                        <i class="icon"></i>
                        退场
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
                        prop="contractor"
                        label="所属参建单位"
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="team"
                        label="所属班组"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="profession"
                        label="工种"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="groupLeaderState"
                        label="是否班组长"
                        width="180">
                        <template slot-scope="scope">
                            {{ scope.row.groupLeaderState==1?'是':'否' }}
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="type"
                        label="状态">
                        <template slot-scope="scope">
                            <div :class="scope.row.type==1?'red-color':scope.row.type==2?'yellow-color':''">
                                {{ scope.row.type==1?'离场':scope.row.type==2?'未同步':'在场' }}
                            </div>
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
            <!-- 新增人员 -->
            <div class="dialog-box" v-show="dialogShow">
                <div class="title">
                    新增人员
                    <a class="close" @click="dialogClick">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <div class="picture-box">
                        <ul>
                            <!-- 上传实时照片 -->
                            <input class="file" name="file" type="file" accept="image/*" @change="photographUpdate" id="photograph" style="display:none">

                            <!-- 上传身份证正面 -->
                            <input class="file" name="file" type="file" accept="image/*" @change="updateFace" id="face" style="display:none">

                            <!-- 上传身份证反面 -->
                            <input class="file" name="file" type="file" accept="image/*" @change="updateBack" id="back" style="display:none">

                            <!-- 上传银行卡照片 -->
                            <input class="file" name="file" type="file" accept="image/*" @change="updateCard" id="card" style="display:none">

                            <li class="picture">
                                <div>
                                    <span>
                                        实时照片
                                        <div class="required">*</div>
                                    </span>
                                    <a v-show="photographShow" class="photographA" @click="aClick('photograph')">+</a>
                                    <img :src="faceUrl" alt="" id="photographImg" class="photographImg" v-show="!photographShow" @click="aClick('photograph')">
                                </div>
                            </li>
                            <li class="picture">
                                <div>
                                    <span>
                                        身份证正面
                                        <div class="required">*</div>
                                    </span>
                                    <a v-show="faceShow" class="faceA" @click="aClick('face')">+</a>
                                    <img :src="idphotoScan" alt="" id="faceImg" class="faceImg" v-show="!faceShow"  @click="aClick('face')">
                                </div>
                            </li>
                            <li class="picture">
                                <div>
                                    <span>
                                        身份证反面
                                        <div class="required">*</div>
                                    </span>
                                    <a v-show="backShow" class="backA" @click="aClick('back')">+</a>
                                    <img :src="idphotoScan2" alt="" id="backImg" class="backImg" v-show="!backShow" @click="aClick('back')">
                                </div>
                            </li>
                            <li class="picture">
                                <div>
                                    <span>
                                        银行卡正面
                                    </span>
                                    <a v-show="cardShow" class="cardA" @click="aClick('card')">+</a>
                                    <img :src="bankCardUrl" alt="" id="cardImg" class="cardImg" v-show="!cardShow" @click="aClick('card')">
                                </div>
                            </li>
                        </ul>
                    </div>
                    <ul>
                        <li>
                            <div>
                                <span>
                                    姓名
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="empName">
                            </div>
                            <div>
                                <span>
                                    身份证号
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="idCode">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    性别
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="empSex">
                            </div>
                            <div>
                                <span>
                                    民族
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="empNation">
                            </div>
                        </li>
                        <li class="all">
                            <div>
                                <span>
                                    身份证地址
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="idAddress">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    签发机关
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="idAgency">
                            </div>
                            <div>
                                <span>
                                    有效期限
                                    <div class="required">*</div>
                                </span>
                                <input v-model="idValiddate">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    出生日期
                                    <div class="required">*</div>
                                </span>
                                <el-date-picker
                                v-model="dateOfBirth"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </div>
                            <div>
                                <span>
                                    籍贯
                                </span>
                                <input type="text" v-model="nativePlace">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    进场日期
                                    <div class="required">*</div>
                                </span>
                                <el-date-picker
                                v-model="startTime"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </div>
                            <div>
                                <span>
                                    退场日期
                                </span>
                                <el-date-picker
                                v-model="endTime"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    所属班组
                                    <div class="required">*</div>
                                </span>
                                <el-cascader
                                v-model="valueaa"
                                :options="option"
                                @change="handleChange">
                                </el-cascader>
                            </div>
                            <div>
                                <span>
                                    是否班组长
                                    <div class="required">*</div>
                                </span>
                                <el-select v-model="isTeam" placeholder="请选择">
                                    <el-option
                                    v-for="item in isTeamOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    重要人员
                                    <div class="required">*</div>
                                </span>
                                <el-select v-model="cwrIskeypsn" placeholder="请选择">
                                    <el-option
                                    v-for="item in cwrIskeypsnOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div>
                                <span>
                                    人员类别
                                    <div class="required">*</div>
                                </span>
                                <el-select v-model="jobTypeName" placeholder="请选择">
                                    <el-option
                                    v-for="item in jobTypeNameOption"
                                    :key="item.id"
                                    :label="item.title"
                                    :value="item.tag">
                                    </el-option>
                                </el-select>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    工种名称
                                    <div class="required">*</div>
                                </span>
                                <el-select v-model="jobName" placeholder="请选择">
                                    <el-option
                                    v-for="item in jobNameOption"
                                    :key="item.id"
                                    :label="item.title"
                                    :value="item.tag">
                                    </el-option>
                                </el-select>
                            </div>
                            <div>
                                <span>
                                    人员类型
                                    <div class="required">*</div>
                                </span>
                                <el-select v-model="empCategory" placeholder="请选择">
                                    <el-option
                                    v-for="item in empCategoryOption"
                                    :key="item.id"
                                    :label="item.title"
                                    :value="item.tag">
                                    </el-option>
                                </el-select>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    手机号
                                    <div class="required">*</div>
                                </span>
                                <input type="number" v-model="empPhon" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))">
                            </div>
                            <div>
                                <span>
                                    合同是否签订
                                    <div class="required">*</div>
                                </span>
                                <el-select v-model="ifContract" placeholder="请选择">
                                    <el-option
                                    v-for="item in ifContractOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    所属工作部门
                                </span>
                                <input type="text" v-model="empDept">
                            </div>
                            <div>
                                <span>
                                    现工作部门
                                </span>
                                <input type="text" v-model="obDept">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    开户行
                                </span>
                                <input type="text" v-model="empBankname">
                            </div>
                            <div>
                                <span>
                                    银行账号
                                </span>
                                <input type="text" v-model="empCardnum">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    账户类型
                                </span>
                                <input type="text" v-model="accountType">
                            </div>
                            <div>
                                <span>
                                    开户地址
                                </span>
                                <input type="text" v-model="accountAddress">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    获得证书
                                </span>
                                <input type="text" v-model="credential">
                            </div>
                            <div>
                                <span>
                                    备注
                                </span>
                                <input type="text" v-model="remark">
                            </div>
                        </li>

                        <!-- 合同部分 -->
                        <li class="line"></li>
                        <li class="check-box">
                            <el-checkbox-group 
                              v-model="checkedCities"
                              :min="0"
                              :max="6"
                              @change="contractSigning">
                              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                            </el-checkbox-group>
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button" @click="insertProjectWorkers">确定</a>
                    <div class="public-box">
                        <el-checkbox v-model="informationState" @change="informationChange">信息是否公开</el-checkbox>
                    </div>
                </div>
            </div>
            <!-- 编辑人员 -->
            <div class="dialog-box" v-show="compileShow">
                <div class="title">
                    编辑人员
                    <a class="close" @click="compileShow = false">
                        <i class="el-icon-close"></i>
                    </a>
                </div>
                <div class="form">
                    <div class="picture-box">
                        <ul>
                            <!-- 上传实时照片 -->
                            <input class="file" name="file" type="file" accept="image/*" @change="photographUpdate" id="photograph" style="display:none">

                            <!-- 上传身份证正面 -->
                            <input class="file" name="file" type="file" accept="image/*" @change="updateFace" id="face" style="display:none">

                            <!-- 上传身份证反面 -->
                            <input class="file" name="file" type="file" accept="image/*" @change="updateBack" id="back" style="display:none">

                            <!-- 上传银行卡照片 -->
                            <input class="file" name="file" type="file" accept="image/*" @change="updateCard" id="card" style="display:none">

                            <li class="picture">
                                <div>
                                    <span>
                                        实时照片
                                        <div class="required">*</div>
                                    </span>
                                    <a v-show="photographShow" class="photographA" @click="aClick('photograph')">+</a>
                                    <img :src="faceUrl" alt="" id="photographImg" class="photographImg" v-show="!photographShow" @click="aClick('photograph')">
                                </div>
                            </li>
                            <li class="picture">
                                <div>
                                    <span>
                                        身份证正面
                                        <div class="required">*</div>
                                    </span>
                                    <a v-show="faceShow" class="faceA" @click="aClick('face')">+</a>
                                    <img :src="idphotoScan" alt="" id="faceImg" class="faceImg" v-show="!faceShow" @click="aClick('face')">
                                </div>
                            </li>
                            <li class="picture">
                                <div>
                                    <span>
                                        身份证反面
                                        <div class="required">*</div>
                                    </span>
                                    <a v-show="backShow" class="backA" @click="aClick('back')">+</a>
                                    <img :src="idphotoScan2" alt="" id="backImg" class="backImg" v-show="!backShow" @click="aClick('back')">
                                </div>
                            </li>
                            <li class="picture">
                                <div>
                                    <span>
                                        银行卡正面
                                    </span>
                                    <a v-show="cardShow" class="cardA" @click="aClick('card')">+</a>
                                    <img :src="bankCardUrl" alt="" id="cardImg" class="cardImg" v-show="!cardShow" @click="aClick('card')">
                                </div>
                            </li>
                        </ul>
                    </div>
                    <ul>
                        <li>
                            <div>
                                <span>
                                    姓名
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="empName">
                            </div>
                            <div>
                                <span>
                                    身份证号
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="idCode">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    性别
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="empSex">
                            </div>
                            <div>
                                <span>
                                    民族
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="empNation">
                            </div>
                        </li>
                        <li class="all">
                            <div>
                                <span>
                                    身份证地址
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="idAddress">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    签发机关
                                    <div class="required">*</div>
                                </span>
                                <input type="text" v-model="idAgency">
                            </div>
                            <div>
                                <span>
                                    有效期限
                                    <div class="required">*</div>
                                </span>
                                <input v-model="idValiddate">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    出生日期
                                    <div class="required">*</div>
                                </span>
                                <el-date-picker
                                v-model="dateOfBirth"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </div>
                            <div>
                                <span>
                                    籍贯
                                </span>
                                <input type="text" v-model="nativePlace">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    进场日期
                                    <div class="required">*</div>
                                </span>
                                <el-date-picker
                                v-model="startTime"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </div>
                            <div>
                                <span>
                                    退场日期
                                </span>
                                <el-date-picker
                                v-model="endTime"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    所属班组
                                    <div class="required">*</div>
                                </span>
                                <el-cascader
                                v-model="valueaa"
                                :options="option"
                                @change="handleChange">
                                </el-cascader>
                            </div>
                            <div>
                                <span>
                                    是否班组长
                                    <div class="required">*</div>
                                </span>
                                <el-select v-model="isTeam" placeholder="请选择">
                                    <el-option
                                    v-for="item in isTeamOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    重要人员
                                    <div class="required">*</div>
                                </span>
                                <el-select v-model="cwrIskeypsn" placeholder="请选择">
                                    <el-option
                                    v-for="item in cwrIskeypsnOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div>
                                <span>
                                    人员类别
                                    <div class="required">*</div>
                                </span>
                                <el-select v-model="jobTypeName" placeholder="请选择">
                                    <el-option
                                    v-for="item in jobTypeNameOption"
                                    :key="item.id"
                                    :label="item.title"
                                    :value="item.tag">
                                    </el-option>
                                </el-select>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    工种名称
                                    <div class="required">*</div>
                                </span>
                                <el-select v-model="jobName" placeholder="请选择">
                                    <el-option
                                    v-for="item in jobNameOption"
                                    :key="item.id"
                                    :label="item.title"
                                    :value="item.tag">
                                    </el-option>
                                </el-select>
                            </div>
                            <div>
                                <span>
                                    人员类型
                                    <div class="required">*</div>
                                </span>
                                <el-select v-model="empCategory" placeholder="请选择">
                                    <el-option
                                    v-for="item in empCategoryOption"
                                    :key="item.id"
                                    :label="item.title"
                                    :value="item.tag">
                                    </el-option>
                                </el-select>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    手机号
                                    <div class="required">*</div>
                                </span>
                                <input type="number" v-model="empPhon" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))">
                            </div>
                            <div>
                                <span>
                                    合同是否签订
                                    <div class="required">*</div>
                                </span>
                                <el-select v-model="ifContract" placeholder="请选择">
                                    <el-option
                                    v-for="item in ifContractOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    所属工作部门
                                </span>
                                <input type="text" v-model="empDept">
                            </div>
                            <div>
                                <span>
                                    现工作部门
                                </span>
                                <input type="text" v-model="obDept">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    开户行
                                </span>
                                <input type="text" v-model="empBankname">
                            </div>
                            <div>
                                <span>
                                    银行账号
                                </span>
                                <input type="text" v-model="empCardnum">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    账户类型
                                </span>
                                <input type="text" v-model="accountType">
                            </div>
                            <div>
                                <span>
                                    开户地址
                                </span>
                                <input type="text" v-model="accountAddress">
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>
                                    获得证书
                                </span>
                                <input type="text" v-model="credential">
                            </div>
                            <div>
                                <span>
                                    备注
                                </span>
                                <input type="text" v-model="remark">
                            </div>
                        </li>

                        <!-- 合同部分 -->
                        <li class="line"></li>
                        <li class="check-box">
                            <el-checkbox-group 
                              v-model="checkedCities"
                              :min="0"
                              :max="6"
                              @change="contractSigning">
                              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                            </el-checkbox-group>
                        </li>
                    </ul>
                </div>
                <div class="confirm">
                    <a class="button" @click="editClick">确定</a>
                    <div class="public-box">
                        <el-checkbox v-model="informationState" @change="informationChange">信息是否公开</el-checkbox>
                    </div>
                </div>
            </div>
            <!-- 遮罩层 -->
            <div class="shade-box" v-show="dialogShow || compileShow"></div>
            <!-- 加载层 -->
            <div class="shade-box" v-loading="loading" v-show="loading"></div>
        </div>
    </div>
</template>

<style lang="less">
    #systemLiangZhi_personnel {
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
                top: .22rem;
                z-index: 200;
                width: 12.02rem;
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
                    width: 100%;
                    display: flex;
                    height: 5.6rem;
                    overflow: auto;
                    overflow-x: hidden;
                    // padding-left: .43rem;
                    padding-bottom: .3rem;
                    justify-content: space-between;
                    .picture-box {
                        height: 5rem;
                        width: 2.5rem;
                        ul {
                            width: 2.5rem;
                        }
                    }
                    ul{
                        flex: 1;
                        position: relative;
                        li {
                            display: flex;
                            height: .71rem;
                            padding-top: .3rem;
                            >div {
                                width: 4.52rem;
                                >.el-cascader {
                                    padding: 0;
                                    width: 2.8rem;
                                }
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
                                    width: 2.8rem;
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
            loading: false, // 加载遮罩层
            tableData: [], // 表格数据
            pageNum: 1, // 当前页码
            pageSize: 15, // 每页显示条数
            pageTotal: 0, // 总条数
            dialogShow: false, // 新增单位对话框状态
            compileShow: false, // 编辑对话框状态
            profession: [], // 工种选项
            professionValue: '', // 工种值
            contractor: [], // 所属参建单位选项
            contractorValue: '', // 所属参建单位值
            team: [], // 班组选项
            teamValue: '', // 班组值
            typeOptions: [{
                value: 0,
                label: '在场'
            }, {
                value: 1,
                label: '离场'
            }, {
                value: 2,
                label: '未同步'
            }], // 在场状态选项
            typeValue: '', // 在场状态值
            checkedCities: [],
            cities: ['简易劳动合同', '两制确认书', '进场承诺书', '退场承诺书','身份证复印件','安全教育培训'], // 合同签订多选
            pid: 0, // 项目id
            searchName: '', // 搜索框姓名
            searchIdCode: '', // 搜索框身份证
            searchPhon: '', // 搜索框手机
            selectionId: '', // 当前选中的id
            // 对话框数据
            isTeamOption: [{
                value: 1,
                label: '是'
            },{
                value: 0,
                label: '否'
            }], // 是否班组长选项
            jobTypeNameOption: [], // 人员类别选项
            jobNameOption: [], // 工种名称选项
            empCategoryOption: [], // 人员类型选项
            cwrIskeypsnOption: [{
                value: 1,
                label: '是'
            },{
                value: 0,
                label: '否'
            }], // 是否重要人员选项
            ifContractOption: [{
                value: 1,
                label: '是'
            },{
                value: 0,
                label: '否'
            }], // 合同是否签订选项
            option: [], // 所属班组选项
            valueaa: undefined, // 所属班组值
            empName: undefined, // 姓名
            idCode: undefined, // 身份证号码
            empPhon: undefined, // 手机号码
            empSex: '', // 性别
            empNation: '', // 民族
            idAddress: '', // 身份证地址
            idAgency: '', // 签发机关
            idValiddate: '', // 有效期限
            dateOfBirth: '', // 出生日期
            workTypenameId: '', // 所属班组id
            constructionId: '', // 参建单位id
            projectId: '', // 项目id
            isTeam: '', // 是否班组长
            jobTypeName: '', // 人员类别
            jobName: '', // 工种名称
            empCategory: '', // 人员类型
            startTime: '', // 进场日期
            idphotoScan: '', // 身份证正面照片Url
            idphotoScan2: '', // 身份证反面照片Url
            empNaticeplace: '', // 身份证人脸照片Url
            faceUrl: '', // 人脸照片Url
            cwrIskeypsn: '', // 是否重要人员
            ifContract: '', // 合同是否签订
            nativePlace: '', // 籍贯
            endTime: '', // 退场日期
            contract: 0, // 简易劳动合同上传状态
            entrance: 0, // 工人进场承诺书上传状态
            exeunt: 0, // 工人退场承诺书上传状态
            workConfirm: 0, // 两制工作确认书上传状态
            iDCardPDF: 0, // 身份证复印件上传状态
            isTrain: 0, // 安全教育培训是否合格
            bankCardUrl: '', // 银行卡照片Url
            empCardnum: '', // 银行账号
            empDept: '', // 所属工作部门
            obDept: '', // 现工作部门
            empBankname: '', // 开户行
            accountType: '', // 账户类型
            accountAddress: '', // 开户地址
            credential: '', // 获得证书
            remark: '', // 备注
            information: 0, // 信息是否公开
            informationState: false, // 信息是否公开状态
            photographFile: '', // 实时照片文件
            photographShow: true, // 实时照片显示状态
            file: '', // 证件文件
            faceShow: true, // 身份证正面图片状态
            backShow: true, // 身份证反面图片状态
            cardShow: true, // 银行卡图片状态
        }
    },
    created() {
        this.getProjectId()
        this.getPersonnelList()
        this.getContractorList()
        this.getTeamList()
        this.getWorkList()
        this.getJobTypeName()
        this.getJobName()
        this.getEmpCategory()
        this.selectConstructionCompany()
    },
    methods: {
        // 获取项目id
        getProjectId() {
            this.pid = sessionStorage.getItem('pid')
        },

        // 合同签订状态
        contractSigning(val) {
            // console.log(val)
            this.contract = 0
            this.entrance = 0
            this.exeunt = 0
            this.workConfirm = 0
            this.iDCardPDF = 0
            this.isTrain = 0
            // console.log(val[0])
            for (let i = 0; i < val.length; i++) {
               if (val[i] == '简易劳动合同') {
                   this.contract = 1
               }
               if (val[i] == '进场承诺书') {
                   this.entrance = 1
               }
               if (val[i] == '退场承诺书') {
                   this.exeunt = 1
               }
               if (val[i] == '两制确认书') {
                   this.workConfirm = 1
               }
               if (val[i] == '身份证复印件') {
                   this.iDCardPDF = 1
               }
               if (val[i] == '安全教育培训') {
                   this.isTrain = 1
               }
            }
        },

        // 信息是否公开
        informationChange(val) {
            // console.log(val)
            this.information = val?1:0
        },

        // 级联选择器
        handleChange(val) {
            // console.log(val)
            this.workTypenameId = val[1]
            this.constructionId = val[0]
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
            this.valueaa = undefined // 所属班组值
            this.empName = undefined // 姓名
            this.idCode = undefined // 身份证号码
            this.empPhon = undefined // 手机号码
            this.empSex = '' // 性别
            this.empNation = '' // 民族
            this.idAddress = '' // 身份证地址
            this.idAgency = '' // 签发机关
            this.idValiddate = '' // 有效期限
            this.dateOfBirth = '' // 出生日期
            this.workTypenameId = '' // 所属班组id
            this.constructionId = '' // 参建单位id
            this.projectId = '' // 项目id
            this.isTeam = '' // 是否班组长
            this.jobTypeName = '' // 人员类别
            this.jobName = '' // 工种名称
            this.empCategory = '' // 人员类型
            this.startTime = '' // 进场日期
            this.idphotoScan = '' // 身份证正面照片Url
            this.idphotoScan2 = '' // 身份证反面照片Url
            this.empNaticeplace = '' // 身份证人脸照片Url
            this.faceUrl = '' // 人脸照片Url
            this.cwrIskeypsn = '' // 是否重要人员
            this.ifContract = '' // 合同是否签订
            this.nativePlace = '' // 籍贯
            this.endTime = '' // 退场日期
            this.contract = 0 // 简易劳动合同上传状态
            this.entrance = 0 // 工人进场承诺书上传状态
            this.exeunt = 0 // 工人退场承诺书上传状态
            this.workConfirm = 0 // 两制工作确认书上传状态
            this.iDCardPDF = 0 // 身份证复印件上传状态
            this.isTrain = 0 // 安全教育培训是否合格
            this.bankCardUrl = '' // 银行卡照片Url
            this.empCardnum = '' // 银行账号
            this.empDept = '' // 所属工作部门
            this.obDept = '' // 现工作部门
            this.empBankname = '' // 开户行
            this.accountType = '' // 账户类型
            this.accountAddress = '' // 开户地址
            this.credential = '' // 获得证书
            this.remark = '' // 备注
            this.information = 0 // 信息是否公开
            this.informationState = false // 信息是否公开状态
            this.photographFile = '' // 实时照片文件
            this.photographShow = true // 实时照片显示状态
            this.file = '' // 证件文件
            this.faceShow = true // 身份证正面图片状态
            this.backShow = true // 身份证反面图片状态
            this.cardShow = true // 银行卡图片状态
            this.checkedCities = []
            this.dialogShow = !this.dialogShow
        },

        // 获取人员列表
        getPersonnelList() {
            this.$axios.post(`/api/pc/projectWorkersApi/list?projectId=${this.pid}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`).then(
                res => {
                    // console.log(res.data)
                    let temp = []
                    for (let i = 0; i < res.data.data.rows.length; i++) {
                        temp.push({
                            number: (this.pageNum-1)*this.pageSize+i+1, // 序号
                            name: res.data.data.rows[i].empName, // 姓名
                            jobNumber: res.data.data.rows[i].id, // 工号
                            contractor: res.data.data.rows[i].constructionName, // 所属参建单位
                            team: res.data.data.rows[i].teamName, // 所属班组
                            profession: res.data.data.rows[i].title, // 工种
                            groupLeaderState: res.data.data.rows[i].isTeam, // 是否班组长
                            type: res.data.data.rows[i].enterAndRetreatCondition, // 状态
                            id: res.data.data.rows[i].id, // id
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
                    // console.log(res.data)
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

        // 搜索
        searchClick() {
            this.$axios.post(`/api/pc/projectWorkersApi/list?projectId=${this.pid}&pageNum=1&pageSize=${this.pageSize}&empName=${this.searchName}&idCode=${this.searchIdCode}&empPhon=${this.searchPhon}&enterAndRetreatCondition=${this.typeValue}&constructionId=${this.contractorValue}&workTypenameId=${this.teamValue}&jobName=${this.professionValue}`).then(
                res => {
                    let temp = []
                    if (res.data.data.rows) {
                        for (let i = 0; i < res.data.data.rows.length; i++) {
                            temp.push({
                                number: (this.pageNum-1)*this.pageSize+i+1, // 序号
                                name: res.data.data.rows[i].empName, // 姓名
                                jobNumber: res.data.data.rows[i].id, // 工号
                                contractor: res.data.data.rows[i].constructionName, // 所属参建单位
                                team: res.data.data.rows[i].teamName, // 所属班组
                                profession: res.data.data.rows[i].title, // 工种
                                groupLeaderState: res.data.data.rows[i].isTeam, // 是否班组长
                                type: res.data.data.rows[i].enterAndRetreatCondition, // 状态
                                id: res.data.data.rows[i].id, // id
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
            this.$axios.post(`/api/pc/projectWorkersApi/list?projectId=${this.pid}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&empName=${this.searchName}&idCode=${this.searchIdCode}&empPhon=${this.searchPhon}&enterAndRetreatCondition=${this.typeValue}&constructionId=${this.contractorValue}&workTypenameId=${this.teamValue}&jobName=${this.professionValue}`).then(
                res => {
                    if (res.data.data.rows) {
                        let temp = []
                        for (let i = 0; i < res.data.data.rows.length; i++) {
                            temp.push({
                                number: (this.pageNum-1)*this.pageSize+i+1, // 序号
                                name: res.data.data.rows[i].empName, // 姓名
                                jobNumber: res.data.data.rows[i].id, // 工号
                                contractor: res.data.data.rows[i].constructionName, // 所属参建单位
                                team: res.data.data.rows[i].teamName, // 所属班组
                                profession: res.data.data.rows[i].title, // 工种
                                groupLeaderState: res.data.data.rows[i].isTeam, // 是否班组长
                                type: res.data.data.rows[i].enterAndRetreatCondition, // 状态
                                id: res.data.data.rows[i].id, // id
                            })
                        }
                        this.pageTotal = res.data.data.total
                        this.tableData = temp
                    }
                }
            )
        },
        
        // 进场
        lastClick() {
            if (this.selectionId == '') {
                this.$message({
                    message: '未选择项目人员',
                    type: 'warning'
                })
            } else {
                this.loading = true
                this.$axios.post(`/api/pc/projectWorkersApi/outOrIn?tag=0&ids=${this.selectionId}`).then(
                    res => {
                        // console.log(res.data.msg)
                        this.loading = false
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                        this.pageClick()
                    }
                )
            }
        },

        // 退场
        nextClick() {
            if (this.selectionId == '') {
                this.$message({
                    message: '未选择项目人员',
                    type: 'warning'
                })
            } else {
                this.loading = true
                this.$axios.post(`/api/pc/projectWorkersApi/outOrIn?tag=1&ids=${this.selectionId}`).then(
                    res => {
                        this.loading = false
                        // console.log(res.data.msg)
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                        this.pageClick()
                    }
                )
            }
        },

        // 获取人员类别
        getJobTypeName() {
            this.$axios.post(`/api/dictionariesApi/selectDictionaries?category=JOB_TYPR`).then(
                res => {
                    // console.log(res.data)
                    this.jobTypeNameOption = res.data.data
                }
            )
        },

        // 获取工种名称
        getJobName() {
            this.$axios.post(`/api/dictionariesApi/selectDictionaries?category=WORK_TYPE`).then(
                res => {
                    // console.log(res.data)
                    this.jobNameOption = res.data.data
                }
            )
        },

        // 获取人员类型
        getEmpCategory() {
            this.$axios.post(`/api/dictionariesApi/selectDictionaries?category=EMP_TYPR`).then(
                res => {
                    // console.log(res.data)
                    this.empCategoryOption = res.data.data
                }
            )
        },

        // 上传实时照片
        getUpload() {
            let headers = {headers: {"Content-Type": "multipart/form-data"}}
            this.$axios.post(`/api/file/upload?folderName=hj`,this.photographFile,headers).then(
                res => {
                    // console.log(res.data.data[0].fileimgurl)
                    if (res.data.code == 0) {
                        $(`.photographA`).text('+')
                        this.photographShow = false
                        // $(".photographImg").attr('src',res.data.data[0].fileimgurl)
                        this.faceUrl = res.data.data[0].fileimgurl 
                    } else {
                        $(`.photographA`).text('+')
                        this.$message({
                            message: '上传失败，请重试',
                            type: 'error'
                        })
                    }
                }
            )
        },

        // 拿到实时图片上传的文件
        photographUpdate(e) {
            let file = e.target.files[0]
            // console.log(e.target.files[0])
            this.photographFile = new FormData() //创建form对象
            this.photographFile.append('file',file) // 通过append向form对象添加数据
            // console.log(this.file.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
            // console.log(`123`)
            $(`.photographA`).text('上传中')
            this.getUpload()
        },

        // 调用照片input
        aClick(id) {
            $(`#${id}`).trigger('click')
        },

        // 身份证正面识别
        getAliOcrIdCardFace() {
            let headers = {headers: {"Content-Type": "multipart/form-data"}}
            this.$axios.post(`/api/projectWorkersApi/getAliOcrIdCard?configStr=face`,this.fileFace,headers).then(
                res => {
                    // console.log(res.data)
                    if (res.data.code == 0) {
                        this.empName = res.data.data.title
                        this.idCode = res.data.data.idNumber
                        this.empSex = res.data.data.sex
                        this.empNation = res.data.data.nation
                        this.idAddress = res.data.data.address
                        this.idphotoScan = res.data.data.url
                        this.empNaticeplace = res.data.data.empNaticeplace
                        this.dateOfBirth = res.data.data.dateOfBirth
                        // this.dateOfBirth = '1983-01-02'
                        $(`.faceA`).text('+')
                        this.faceShow = false
                        // $(".faceImg").attr('src',res.data.data.url)
                    } else {
                        $(`.faceA`).text('+')
                        this.$message({
                            message: '上传失败，请重试',
                            type: 'error'
                        })
                    }
                }
            )
        },
        // 身份证反面识别
        getAliOcrIdCardBack() {
            let headers = {headers: {"Content-Type": "multipart/form-data"}}
            this.$axios.post(`/api/projectWorkersApi/getAliOcrIdCard?configStr=back`,this.fileBack,headers).then(
                res => {
                    // console.log(res.data)
                    if (res.data.code == 0) {
                        this.idAgency = res.data.data.issue
                        this.idValiddate = res.data.data.idCardStartdate
                        // this.idValiddate = '1983-01-02'
                        this.idphotoScan2 = res.data.data.url
                        $(`.backA`).text('+')
                        this.backShow = false
                        // $(".backImg").attr('src',res.data.data.url)
                    } else {
                        $(`.backA`).text('+')
                        this.$message({
                            message: '上传失败，请重试',
                            type: 'error'
                        })
                    }
                }
            )
        },
        // 银行卡识别
        getAliOcrIdCardCard() {
            let headers = {headers: {"Content-Type": "multipart/form-data"}}
            this.$axios.post(`/api/projectWorkersApi/getAliOcrIdCard?configStr=card`,this.fileCard,headers).then(
                res => {
                    // console.log(res.data)
                    if (res.data.code == 0) {
                        // this.empCardnum = res.data.data.card_num
                        this.bankCardUrl = res.data.data.url
                        $(`.cardA`).text('+')
                        this.cardShow = false
                        // $(".cardImg").attr('src',res.data.data.url)
                    } else {
                        $(`.cardA`).text('+')
                        this.$message({
                            message: '上传失败，请重试',
                            type: 'error'
                        })
                    }
                }
            )
        },
        // 银行卡上传
        uploadingBankCard() {
            let headers = {headers: {"Content-Type": "multipart/form-data"}}
            this.$axios.post(`/api/file/upload?folderName=hj`,this.fileCard,headers).then(
                res => {    
                    if (res.data.code == 0) {
                        $(`.cardA`).text('+')
                        this.cardShow = false
                        this.bankCardUrl = res.data.data[0].fileimgurl 
                    } else {
                        $(`.cardA`).text('+')
                        this.$message({
                            message: '上传失败，请重试',
                            type: 'error'
                        })
                    }
                }
            )
        },

        // 拿到身份证正面上传的图片
        updateFace(e) {
            let file = e.target.files[0]
            this.fileFace = new FormData() //创建form对象
            this.fileFace.append('file',file) // 通过append向form对象添加数据
            // console.log(this.file.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
            // console.log(`123`)
            $(`.faceA`).text('上传中')
            // this.getAliOcrIdCardFace()
        },
        // 拿到身份证反面上传的图片
        updateBack(e) {
            let file = e.target.files[0]
            this.fileBack = new FormData() //创建form对象
            this.fileBack.append('file',file) // 通过append向form对象添加数据
            // console.log(this.file.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
            // console.log(`123`)
            $(`.backA`).text('上传中')
            this.getAliOcrIdCardBack()
        },
        // 拿到银行卡上传的图片
        updateCard(e) {
            let file = e.target.files[0]
            this.fileCard = new FormData() //创建form对象
            this.fileCard.append('file',file) // 通过append向form对象添加数据
            // console.log(this.file.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
            // console.log(`123`)
            $(`.cardA`).text('上传中')
            this.uploadingBankCard()
        },

        // 获取参建与班组的级联列表
        selectConstructionCompany() {
            this.$axios.post(`/api/constructionCompanyApi/selectConstructionCompany?projectId=${this.pid}`).then(
                res => {
                    // console.log(res.data)
                    let temp = []
                    for (let i = 0; i < res.data.data.length; i++) {
                        this.$axios.post(`/api/teamApi/app/selectTeam?constructionId=${res.data.data[i].id}`).then(
                            res2 => {
                                if (res2.data) {
                                    let temp2 = []
                                    for (let j = 0; j < res2.data.data.length; j++) {
                                        temp2.push({
                                            value: res2.data.data[j].id,
                                            label: res2.data.data[j].teamName
                                        })
                                    }
                                    temp.push({
                                        value: res.data.data[i].id,
                                        label: res.data.data[i].constructionName,
                                        children: temp2
                                    })
                                }
                            }
                        )
                    }
                    this.option = temp
                }
            )
        },

        // 人员录入
        insertProjectWorkers() {
            if (this.empName && this.idCode && this.empSex && this.empNation && this.idAddress && this.idAgency && this.idValiddate && this.dateOfBirth && this.workTypenameId && this.constructionId && (this.isTeam==1 || this.isTeam==0) && this.jobTypeName && this.jobName && this.empCategory && this.startTime && this.idphotoScan && this.idphotoScan2 && this.empNaticeplace && (this.cwrIskeypsn==1 || this.cwrIskeypsn==0) && (this.ifContract==1 || this.ifContract==0) && this.empPhon) {
                this.loading = true
                this.$axios.post(`/api/projectWorkersApi/insertProjectWorkers?empName=${this.empName}&idCode=${this.idCode}&empPhon=${this.empPhon}&empSex=${this.empSex}&empNation=${this.empNation}&idAddress=${this.idAddress}&idAgency=${this.idAgency}&idValiddate=${this.idValiddate}&dateOfBirth=${this.dateOfBirth}&workTypenameId=${this.workTypenameId}&constructionId=${this.constructionId}&projectId=${this.pid}&isTeam=${this.isTeam}&jobTypename=${this.jobTypeName}&jobName=${this.jobName}&empCategory=${this.empCategory}&startTime=${this.startTime}&idphotoScan=${this.idphotoScan}&idphotoScan2=${this.idphotoScan2}&empNaticeplace=${this.empNaticeplace}&faceUrl=${this.faceUrl}&cwrIskeypsn=${this.cwrIskeypsn}&ifContract=${this.ifContract}&nativePlace=${this.nativePlace}&endTime=${this.endTime}&contract=${this.contract}&entrance=${this.entrance}&exeunt=${this.exeunt}&workConfirm=${this.workConfirm}&iDCardPDF=${this.iDCardPDF}&information=${this.information}&isTrain=${this.isTrain}&bankCardUrl=${this.bankCardUrl}&empCardnum=${this.empCardnum}&empDept=${this.empDept}&obDept=${this.obDept}&empBankname=${this.empBankname}&accountType=${this.accountType}&accountAddress=${this.accountAddress}&credential=${this.credential}&remark=${this.remark}`).then(
                    res => {
                        if (res.data.code == 0) {
                            this.loading = false
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            })
                            this.dialogShow = false
                            this.pageNum = 1
                            this.getPersonnelList()
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
        compileClick() {
            // this.compileShow = !this.compileShow
            if (this.selectionId == '') {
                this.$message({
                    message: '未选择项目人员',
                    type: 'warning'
                })
            } else if (this.selectionId.includes(',')) {
                this.$message({
                    message: '一次只能编辑一个项目人员',
                    type: 'warning'
                })
            } else {
                // console.log(this.tableData)
                for (let i = 0; i < this.tableData.length; i++) {
                    if (this.selectionId == this.tableData[i].id) {
                        // console.log(this.tableData[i])
                        if (this.tableData[i].type == 0) {
                            this.$message({
                                message: '请将该人员退场后再进行编辑',
                                type: 'warning'
                            })
                        } else {
                            this.compileShow = true
                            this.getMessage()
                        }
                    }
                }
                // this.compileShow = true
                // this.getMessage()
            }
        },

        // 根据id查询人员信息
        getMessage() {
            this.$axios.post(`/api/pc/projectWorkersApi/queryProjectWorkers?id=${this.selectionId}`).then(
                res => {
                    console.log(res.data)
                    this.empName = res.data.data.empName
                    this.idCode = res.data.data.idCode
                    this.empPhon = res.data.data.empPhon
                    this.empSex = res.data.data.empSex
                    this.empNation = res.data.data.empNation
                    this.idAddress = res.data.data.idAddress
                    this.idAgency = res.data.data.idAgency
                    this.idValiddate = res.data.data.idValiddate
                    this.dateOfBirth = res.data.data.dateOfBirth
                    this.nativePlace = res.data.data.nativePlace?res.data.data.nativePlace:''
                    this.startTime = res.data.data.startTime
                    this.endTime = res.data.data.endTime
                    this.constructionId = res.data.data.constructionId
                    this.workTypenameId = res.data.data.workTypenameId
                    this.isTeam = res.data.data.isTeam==1?'是':'否'
                    this.cwrIskeypsn = res.data.data.cwrIskeypsn==1?'是':'否'
                    this.jobName = res.data.data.jobName
                    this.empCategory = res.data.data.empCategory
                    this.ifContract = res.data.data.ifContract==1?'是':'否'
                    this.empDept = res.data.data.empDept?res.data.data.empDept:''
                    this.obDept = res.data.data.obDept?res.data.data.obDept:''
                    this.empBankname = res.data.data.empBankname?res.data.data.empBankname:''
                    this.empCardnum = res.data.data.empCardnum?res.data.data.empCardnum:''
                    this.accountType = res.data.data.accountType?res.data.data.accountType:''
                    this.accountAddress = res.data.data.accountAddress?res.data.data.accountAddress:''
                    this.credential = res.data.data.credential?res.data.data.credential:''
                    this.remark = res.data.data.remark?res.data.data.remark:''
                    this.contract = res.data.data.contract
                    this.entrance = res.data.data.entrance
                    this.exeunt = res.data.data.exeunt
                    this.workConfirm = res.data.data.workConfirm
                    this.iDCardPDF = res.data.data.iDCardPDF
                    this.isTrain = res.data.data.isTrain
                    this.information = res.data.data.information?res.data.data.information:0
                    this.faceUrl = res.data.data.faceUrl
                    this.empNaticeplace = res.data.data.empNaticeplace
                    this.idphotoScan = res.data.data.idphotoScan
                    this.idphotoScan2 = res.data.data.idphotoScan2
                    this.bankCardUrl = res.data.data.bankCardUrl
                    this.enterAndRetreatCondition = res.data.data.enterAndRetreatCondition
                    this.constructionId = res.data.data.constructionId
                    this.jobTypeName = res.data.data.jobTypename
                    this.photographShow = false
                    this.faceShow = false
                    this.backShow = false
                    this.cardShow = false
                    
                    // 所属班组赋值
                    let temp = []
                    temp.push(Number(res.data.data.constructionId))
                    temp.push(Number(res.data.data.workTypenameId))
                    // console.log(temp)
                    this.valueaa = temp
                }
            )
        },

        // 编辑人员信息
        editClick() {
            if (this.empName && this.idCode && this.empSex && this.empNation && this.idAddress && this.idAgency && this.idValiddate && this.dateOfBirth && this.workTypenameId && this.constructionId && this.jobTypeName && this.jobName && this.empCategory && this.startTime && this.idphotoScan && this.idphotoScan2 && this.empNaticeplace && this.empPhon) {
                this.loading = true
                this.isTeam=this.isTeam=='是'?1:this.isTeam=='否'?0:this.isTeam 
                this.cwrIskeypsn=this.cwrIskeypsn=='是'?1:this.cwrIskeypsn=='否'?0:this.cwrIskeypsn 
                this.ifContract=this.ifContract=='是'?1:this.ifContract=='否'?0:this.ifContract 
                this.$axios.post(`/api/pc/projectWorkersApi/edit?empName=${this.empName}&idCode=${this.idCode}&empPhon=${this.empPhon}&empSex=${this.empSex}&empNation=${this.empNation}&idAddress=${this.idAddress}&idAgency=${this.idAgency}&idValiddate=${this.idValiddate}&dateOfBirth=${this.dateOfBirth}&workTypenameId=${this.workTypenameId}&constructionId=${this.constructionId}&projectId=${this.pid}&isTeam=${this.isTeam}&jobTypename=${this.jobTypeName}&jobName=${this.jobName}&empCategory=${this.empCategory}&startTime=${this.startTime}&idphotoScan=${this.idphotoScan}&idphotoScan2=${this.idphotoScan2}&empNaticeplace=${this.empNaticeplace}&faceUrl=${this.faceUrl}&cwrIskeypsn=${this.cwrIskeypsn}&ifContract=${this.ifContract}&nativePlace=${this.nativePlace}&endTime=${this.endTime}&contract=${this.contract}&entrance=${this.entrance}&exeunt=${this.exeunt}&workConfirm=${this.workConfirm}&iDCardPDF=${this.iDCardPDF}&information=${this.information}&isTrain=${this.isTrain}&bankCardUrl=${this.bankCardUrl}&empCardnum=${this.empCardnum}&empDept=${this.empDept}&obDept=${this.obDept}&empBankname=${this.empBankname}&accountType=${this.accountType}&accountAddress=${this.accountAddress}&credential=${this.credential}&remark=${this.remark}&id=${this.selectionId}`).then(
                    res => {
                        if (res.data.code == 0) {
                            this.loading = false
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

        // 导出Excel
        deriveClick() {
            location.href = `http://47.106.71.3:8080/api/pc/projectWorkersApi/export?projectId=${this.pid}&empName=${this.searchName}&idCode=${this.searchIdCode}&empPhon=${this.searchIdCode}&enterAndRetreatCondition=${this.typeValue}&constructionId=${this.contractorValue}&workTypenameId=${this.teamValue}&jobName=${this.professionValue}`
        },

        // 导出合同
        downloadIDCardPDF() {
            let that = this
            let i = 1
            let time = setInterval(function () {
                console.log(i)
                location.href = `http://47.106.71.3:8080/pdf/downloadIDCardPDF?ids=${that.selectionId}&tag=${i}`
                i++
                if (i==6) {
                    clearInterval(time)
                }
            },1500)
        }
    }
}
</script>