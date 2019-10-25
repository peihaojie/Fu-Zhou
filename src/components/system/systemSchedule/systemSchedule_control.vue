<template>
  <div id="systemSchedule_control">
    <div class="content">
      <!-- 按钮栏 -->
      <div class="top-button">
        <div class="button-box">
          <a class="new" @click="createNodes">
            <i class="icon"></i>
            创建节点
          </a>
          <!-- <a class="contract">
            <i class="icon"></i>
            生成计划
          </a>
          <a class="derive">
            <i class="icon"></i>
            导出计划
          </a>-->
          <a class="cut" @click="ganttShow=!ganttShow;">
            <i class="icon"></i>
            切换甘特图
          </a>
        </div>
        <div class="search-box">
          <el-select
            v-model="stateValue"
            placeholder="延迟状态"
            size="mini"
            clearable
            @change="search"
            @clear="selectZhProgressPlanList"
          >
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            v-model="rankValue"
            placeholder="管控级别"
            size="mini"
            clearable
            @change="search"
            @clear="selectZhProgressPlanList"
          >
            <el-option
              v-for="item in rankOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              size="mini"
            ></el-option>
          </el-select>
          <el-date-picker
            v-model="dateValue"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            size="mini"
            @change="search"
            claerable
            @clear="selectZhProgressPlanList"
          ></el-date-picker>
        </div>
      </div>
      <!-- 主体列表 -->
      <div class="main-list">
        <ul>
          <li class="first">
            <!-- 编号 -->
            <div class="number">编号</div>
            <!-- 节点 -->
            <div class="node">节点</div>
            <!-- 负责人 -->
            <div class="principal">负责人</div>
            <!-- 进度 -->
            <div class="schedule">进度</div>
            <!-- 状态 -->
            <div class="status">状态</div>
            <!-- 级别 -->
            <div class="rank">管控级别</div>
            <!-- 计划工期 -->
            <div class="plan-time">计划工期</div>
            <!-- 实际工期 -->
            <div class="practical-time">实际工期</div>
            <!-- 计划开始 -->
            <div class="plan-start">计划开始</div>
            <!-- 计划结束 -->
            <div class="plan-end">计划结束</div>
            <!-- 实际开始 -->
            <div class="practical-start">实际开始</div>
            <!-- 实际结束 -->
            <div class="practical-end">实际结束</div>
            <!-- 操作 -->
            <div class="operation">操作</div>
          </li>
          <li class="ul-list" v-for="(item,index) in nodeList" :key="index">
            <div class="ul-list-father">
              <!-- <a class="relevance" @click="selectZhPreposeList(item.id)" v-if="item.relevance==1"></a> -->

              <a class="relevance" @click="selectZhPreposeList(item.id)"></a>

              <div class="number">{{index+1}}</div>
              <div class="node" @click="itemClicked(index)">
                <a v-if="showAdd(item.id)">
                  <i
                    :class="itemClick == index?'el-icon-remove-outline':'el-icon-circle-plus-outline'"
                    style="color:#46aeff"
                  ></i>
                </a>
                <span v-else style="width:0.12rem;height:0.12rem;display:inline-block"></span>
                {{item.name}}
                <!-- <a>
                  <i class="el-icon-edit-outline" style="color:#46aeff"></i>
                </a>-->
              </div>
              <div class="principal" v-if="!item.principal">-</div>
              <div class="principal" v-else>{{getPrincipal(item)}}</div>
              <!-- <div class="principal" v-else>{{item.principal}}</div> -->
              <div class="schedule">
                <div class="schedule-bar">
                  <div
                    class="sub-schedule"
                    :style="`width:${percentage(item.progress)};color:#000`"
                  >{{percentage(item.progress)}}</div>
                </div>
              </div>
              <div class="status" style="color:#3ada76" v-if="item.state == 0">正常开始</div>
              <div class="status" style="color:#c0bfbf" v-else-if="item.state == 1">未开始</div>
              <div class="status" style="color:#ff7a81" v-else-if="item.state == 2">延期未开始</div>
              <div class="status" style="color:#feb37f" v-else-if="item.state == 3">延期开始</div>
              <div class="status" style="color:#ff7a81" v-else-if="item.state == 4">延期完成</div>
              <div class="status" style="color:#3ada76" v-else>正常完成</div>
              <div class="rank">{{item.controlRank==1?'一级':item.controlRank==2?'二级':'三级'}}</div>
              <!-- <div class="plan-time">-</div> -->
              <div class="plan-time">{{ getPlanDays(item) }}天</div>
              <div class="practical-time" v-if="item.end">{{ getEndDays(item) }}天</div>
              <div class="practical-time" v-else>-</div>
              <div class="plan-start">{{item.predictStart.split(' ')[0]}}</div>
              <div class="plan-end">{{item.predictEnd.split(' ')[0]}}</div>
              <div class="practical-start">
                <div v-if="!item.start">-</div>
                <!-- <a class="startClick" v-if="!item.start" @click="getStartTime(item)">开始</a> -->
                <div v-else>{{item.start.split(' ')[0]}}</div>
              </div>
              <div class="practical-end" v-if="item.start">
                <div v-if="!item.end">-</div>
                <!-- <a class="startClick" v-if="!item.end" @click="getEndTime(item)">结束</a> -->
                <div v-else>{{item.end.split(' ')[0]}}</div>
              </div>
              <div class="practical-end" v-else>-</div>
              <div class="operation">
                <el-dropdown @command="handleCommand">
                  <a class="el-dropdown-link">
                    <i class="el-icon-setting"></i>
                  </a>
                  <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item>插入同级节点</el-dropdown-item>
                    <el-dropdown-item>插入下级节点</el-dropdown-item>-->
                    <el-dropdown-item :command="`preposition:${item.id}`">设置前置节点</el-dropdown-item>
                    <el-dropdown-item :command="`edit:${item.id}`">编辑</el-dropdown-item>
                    <el-dropdown-item :command="`delete:${item.id}`">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <div class="ul-list-child" v-show="itemClick == index">
              <ul>
                <li
                  v-for="(item2,index2) in nodeList"
                  :key="index2"
                  v-if="item.id == item2.parentId"
                >
                  <!-- id:{{item2.id}} {{item2.name}} 父节点id:{{item2.parentId}} -->
                  <div class="ul-list-child">
                    <!-- <a class="relevance" @click="selectZhPreposeList(item.id)" v-show="item.relevance!=1"></a> -->
                    <div class="number"></div>
                    <div class="node">
                      <!-- <a>
                        <i class="el-icon-remove-outline" style="color:#46aeff"></i>
                      </a>
                      <a>
                        <i class="el-icon-circle-plus-outline" style="color:#46aeff"></i>
                      </a>-->
                      {{item2.name}}
                      <!-- <a>
                        <i class="el-icon-edit-outline" style="color:#46aeff"></i>
                      </a>-->
                    </div>
                    <div class="principal" v-if="!item2.principal">-</div>
                    <div class="principal" v-else>{{getPrincipal(item2)}}</div>
                    <!-- <div class="principal" v-else>{{item.principal}}</div> -->
                    <div class="schedule">
                      <div class="schedule-bar">
                        <div class="sub-schedule" :style="subSchedule">{{percentage(item2.ratio)}}</div>
                      </div>
                    </div>
                    <div class="status" style="color:#3ada76" v-if="item2.state == 0">正常开始</div>
                    <div class="status" style="color:#c0bfbf" v-else-if="item2.state == 1">未开始</div>
                    <div class="status" style="color:#ff7a81" v-else-if="item2.state == 2">延期未开始</div>
                    <div class="status" style="color:#feb37f" v-else-if="item2.state == 3">延期开始</div>
                    <div class="status" style="color:#ff7a81" v-else-if="item2.state == 4">延期完成</div>
                    <div class="status" style="color:#3ada76" v-else>正常完成</div>
                    <div class="rank">{{item2.controlRank==1?'一级':item2.controlRank==2?'二级':'三级'}}</div>
                    <!-- <div class="plan-time">-</div> -->
                    <div class="plan-time">{{ getPlanDays(item2) }}天</div>
                    <div class="practical-time" v-if="item2.end">{{ getEndDays(item2) }}天</div>
                    <div class="practical-time" v-else>-</div>
                    <div class="plan-start">{{item2.predictStart.split(' ')[0]}}</div>
                    <div class="plan-end">{{item2.predictEnd.split(' ')[0]}}</div>
                    <div class="practical-start">
                      <div v-if="!item.start">-</div>
                      <!-- <a class="startClick" v-if="!item2.start" @click="getStartTime(item2)">开始</a> -->
                      <div v-else>{{item2.start.split(' ')[0]}}</div>
                    </div>
                    <div class="practical-end" v-if="item2.start">
                      <a class="startClick" v-if="!item2.end" @click="getEndTime(item2)">结束</a>
                      <div v-else>{{item2.end.split(' ')[0]}}</div>
                    </div>
                    <div class="practical-end" v-else>-</div>
                    <div class="operation">
                      <el-dropdown @command="handleCommand">
                        <a class="el-dropdown-link">
                          <i class="el-icon-setting"></i>
                        </a>
                        <el-dropdown-menu slot="dropdown">
                          <!-- <el-dropdown-item>插入同级节点</el-dropdown-item>
                          <el-dropdown-item>插入下级节点</el-dropdown-item>-->
                          <el-dropdown-item :command="`preposition:${item2.id}`">设置前置节点</el-dropdown-item>
                          <el-dropdown-item :command="`edit:${item2.id}`">编辑</el-dropdown-item>
                          <el-dropdown-item :command="`delete:${item2.id}`">删除</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <!-- <li >
                        <div class="number">
                            2
                        </div>
                        <div class="node" style="color:#c0bfbf">
                            &#12288;&nbsp;开工准备
                        </div>
                        <div class="schedule">
                            <div class="schedule-bar">
                                <div class="sub-schedule" style="width:100%">100%</div>
                            </div>
                        </div>
                        <div class="status" style="color:#3ada76">
                            正常完成
                        </div>
                        <div class="rank">
                            一级
                        </div>
                        <div class="plan-time">
                            365天
                        </div>
                        <div class="practical-time">
                            -
                        </div>
                        <div class="plan-start">
                            2018-01-01
                        </div>
                        <div class="plan-end">
                            2018-01-25
                        </div>
                        <div class="practical-start">
                            2018-01-01
                        </div>
                        <div class="practical-end">
                            -
                        </div>
                        <div class="operation">
                            <el-dropdown>
                                <a class="el-dropdown-link">
                                    <i class="el-icon-setting"></i>
                                </a>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>插入同级节点</el-dropdown-item>
                                    <el-dropdown-item>插入下级节点</el-dropdown-item>
                                    <el-dropdown-item>编辑</el-dropdown-item>
                                    <el-dropdown-item>删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </li>
                    <li >
                        <div class="number">
                            3
                        </div>
                        <div class="node">
                            <a>
                                <i class="el-icon-circle-plus-outline" style="color:#46aeff"></i>
                            </a>
                            主体工程
                        </div>
                        <div class="schedule">
                            <div class="schedule-bar">
                                <div class="sub-schedule" style="width:50%">50%</div>
                            </div>
                        </div>
                        <div class="status" style="color:#feb37f">
                            超期开始
                        </div>
                        <div class="rank">
                            三级
                        </div>
                        <div class="plan-time">
                            24天
                        </div>
                        <div class="practical-time">
                            -
                        </div>
                        <div class="plan-start">
                            2018-01-01
                        </div>
                        <div class="plan-end">
                            2018-01-25
                        </div>
                        <div class="practical-start">
                            2018-01-01
                        </div>
                        <div class="practical-end">
                            -
                        </div>
                        <div class="operation">
                            <el-dropdown>
                                <a class="el-dropdown-link">
                                    <i class="el-icon-setting"></i>
                                </a>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>插入同级节点</el-dropdown-item>
                                    <el-dropdown-item>插入下级节点</el-dropdown-item>
                                    <el-dropdown-item>编辑</el-dropdown-item>
                                    <el-dropdown-item>删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </li>
                    <li >
                        <a class="relevance" @click="relevanceShow=true"></a>
                        <div class="number">
                            4
                        </div>
                        <div class="node">
                            <a>
                                <i class="el-icon-remove-outline" style="color:#46aeff"></i>
                            </a>
                            电梯工程
                        </div>
                        <div class="schedule">
                            <div class="schedule-bar">
                                <div class="sub-schedule" style="width:50%">50%</div>
                            </div>
                        </div>
                        <div class="status" style="color:#ff7a81">
                            已超期
                        </div>
                        <div class="rank">
                            三级
                        </div>
                        <div class="plan-time">
                            24天
                        </div>
                        <div class="practical-time">
                            -
                        </div>
                        <div class="plan-start">
                            2018-01-01
                        </div>
                        <div class="plan-end">
                            2018-01-25
                        </div>
                        <div class="practical-start">
                            2018-01-01
                        </div>
                        <div class="practical-end">
                            -
                        </div>
                        <div class="operation">
                            <el-dropdown>
                                <a class="el-dropdown-link">
                                    <i class="el-icon-setting"></i>
                                </a>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>插入同级节点</el-dropdown-item>
                                    <el-dropdown-item>插入下级节点</el-dropdown-item>
                                    <el-dropdown-item>编辑</el-dropdown-item>
                                    <el-dropdown-item>删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </li>
                    <li >
                        <a class="relevance" @click="relevanceShow=true"></a>
                        <div class="number">
                            5
                        </div>
                        <div class="node">
                            &#12288;&nbsp;1A、1B电梯工程
                        </div>
                        <div class="schedule">
                            <div class="schedule-bar">
                                <div class="sub-schedule" style="width:100%">100%</div>
                            </div>
                        </div>
                        <div class="status" style="color:#ff7a81">
                            超期完成
                        </div>
                        <div class="rank">
                            三级
                        </div>
                        <div class="plan-time">
                            24天
                        </div>
                        <div class="practical-time">
                            -
                        </div>
                        <div class="plan-start">
                            2018-01-01
                        </div>
                        <div class="plan-end">
                            2018-01-25
                        </div>
                        <div class="practical-start">
                            2018-01-01
                        </div>
                        <div class="practical-end">
                            -
                        </div>
                        <div class="operation">
                            <el-dropdown>
                                <a class="el-dropdown-link">
                                    <i class="el-icon-setting"></i>
                                </a>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>插入同级节点</el-dropdown-item>
                                    <el-dropdown-item>插入下级节点</el-dropdown-item>
                                    <el-dropdown-item>设置前置节点</el-dropdown-item>
                                    <el-dropdown-item>编辑</el-dropdown-item>
                                    <el-dropdown-item>删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
          </li>-->
        </ul>
      </div>
      <!-- 关联计划 -->
      <div class="relevance-box" v-show="relevanceShow">
        <!-- 导航栏 -->
        <div class="title">
          <span>关联计划</span>
          <a @click="relevanceShow=false">
            <i class="el-icon-close"></i>
          </a>
        </div>
        <!-- 按钮栏 -->
        <div class="button-box">
          <div class="nav-box">
            <a :class="relevanceActive?'active':''" @click="relevanceActive=true">关联的计划</a>
            <a
              :class="!relevanceActive?'active':''"
              style="margin-left:.38rem;"
              @click="relevanceActive=false"
            >前置任务</a>
          </div>
          <div class="btn-box">
            <!-- <a v-show="relevanceActive">添加进度计划关联</a> -->
            <!-- <a v-show="!relevanceActive">添加前置任务</a> -->
          </div>
        </div>
        <!-- 关联计划列表 -->
        <div class="relevance-list" v-show="relevanceActive">
          <ul>
            <li class="first">
              <!-- 编号 -->
              <div class="number">编号</div>
              <!-- 节点 -->
              <div class="node">节点</div>
              <!-- 计划名称 -->
              <div class="name">计划名称</div>
              <!-- 计划所占进度 -->
              <div class="occupation">计划所占进度</div>
              <!-- 进度 -->
              <!-- <div class="schedule">进度</div> -->
              <!-- 计划开始 -->
              <div class="plan-start">计划开始</div>
              <!-- 计划结束 -->
              <div class="plan-end">计划结束</div>
              <!-- 实际开始 -->
              <!-- <div class="practical-start">实际开始</div> -->
              <!-- 实际结束 -->
              <!-- <div class="practical-end">实际结束</div> -->
            </li>
            <!-- 循环所有节点列表，选择点击的节点 -->
            <li
              style="padding-left:0"
              v-for="(item, index) in nodeList"
              :key="index"
              v-if="item.id==activeMainPlan"
            >
              <!-- 循环所有的关联列表 -->
              <div v-for="(item2, index2) in item.associatedNode" :key="index2">
                <!-- 循环所有的计划列表，判断关联列表的计划id是否一致 -->
                <div
                  v-for="(item3, index3) in schedulePlan"
                  :key="index3"
                  v-if="item2.progressId == item3.id"
                >
                  <div class="number">{{index3+1}}</div>
                  <div class="node">{{item.name}}</div>
                  <div class="name">{{item3.name}}</div>
                  <div class="occupation">{{item2.progressNodeRatio}}%</div>
                  <!-- <div class="schedule">
                    <div class="schedule-bar">
                      <div class="sub-schedule" style="width:50%">50%</div>
                    </div>
                  </div>-->
                  <div class="plan-start">{{item3.predictStart.split(' ')[0]}}</div>
                  <div class="plan-end">{{item3.predictEnd.split(' ')[0]}}</div>
                  <!-- <div class="practical-start">2018-01-01</div>
                  <div class="practical-end">-</div>-->
                </div>
              </div>
            </li>
            <!-- <li>
              <div class="number">1</div>
              <div class="node">1A、1B电梯工程</div>
              <div class="name">2019年1月计划</div>
              <div class="occupation">20%</div>
              <div class="schedule">
                <div class="schedule-bar">
                  <div class="sub-schedule" style="width:50%">50%</div>
                </div>
              </div>
              <div class="plan-start">2018-01-01</div>
              <div class="plan-end">2018-12-30</div>
              <div class="practical-start">2018-01-01</div>
              <div class="practical-end">-</div>
            </li>-->
          </ul>
          <!-- 分页 -->
          <div class="paging-box">
            <!-- @size-change="handleSizeChange"
            @current-change="handleCurrentChange"-->
            <!-- <el-pagination
              :current-page="1"
              :page-size="6"
              layout="total, prev, pager, next, jumper"
              :total="1"
            ></el-pagination>-->
          </div>
        </div>
        <!-- 前置任务列表 -->
        <div class="preposition-list" v-show="!relevanceActive">
          <ul>
            <li class="first">
              <!-- 编号 -->
              <div class="number">编号</div>
              <!-- 节点 -->
              <div class="node">节点</div>
              <!-- 计划名称 -->
              <div class="name">计划名称</div>
              <!-- 前置类型 -->
              <div class="preposition">前置类型</div>
              <!-- 延迟间隔 -->
              <div class="interval">延迟间隔</div>
              <!-- 操作 -->
              <div class="interval">操作</div>
            </li>
            <li v-for="item in preposeList" :key="item.id">
              <div
                class="li-box"
                v-for="(item2,index) in nodeList"
                :key="index"
                v-show="item.preposePian==item2.id"
              >
                <div class="number">{{index+1}}</div>
                <div class="node">{{item2.name}}</div>
                <div class="name">{{item2.state==0?'正常开始':item2.state==1?'未开始':''}}</div>
                <div class="preposition">{{item2.predictStart.split(' ')[0]}}</div>
                <div class="interval">{{item2.predictEnd.split(' ')[0]}}</div>
                <div class="interval">
                  <a @click="removePrepose(item.id)">删除</a>
                </div>
              </div>
            </li>
          </ul>
          <!-- 分页 -->
          <div class="paging-box">
            <!-- @size-change="handleSizeChange"
            @current-change="handleCurrentChange"-->
            <!-- <el-pagination
              :current-page="1"
              :page-size="6"
              layout="total, prev, pager, next, jumper"
              :total="1"
            ></el-pagination>-->
          </div>
        </div>
      </div>
      <!-- 新增计划节点 -->
      <div class="dialog-box" v-show="dialogShow">
        <div class="title" v-show="dialogState">
          新增计划节点
          <a class="close" @click="dialogShow=false">
            <i class="el-icon-close"></i>
          </a>
        </div>
        <div class="title" v-show="!dialogState">
          编辑计划节点
          <a class="close" @click="dialogShow=false">
            <i class="el-icon-close"></i>
          </a>
        </div>
        <!-- <div class="nav">
                    <a @click="newActive=1" :class="newActive==1?'active':''">基础信息</a>
                    <a @click="newActive=2" :class="newActive==2?'active':''">前置任务</a>
                    <a @click="newActive=3" :class="newActive==3?'active':''">关联计划</a>
        </div>-->
        <div class="form" v-show="newActive==1">
          <ul>
            <li>
              <div>
                <span>
                  节点名称
                  <div class="required">*</div>
                </span>
                <input type="text" v-model="nodeName" />
              </div>
              <div>
                <span>父级节点</span>
                <!-- <input type="text" /> -->
                <el-select v-model="parentId" placeholder="请选择父级节点" clearable>
                  <el-option
                    v-for="item in nodeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </li>
            <li>
              <div>
                <span>
                  计划开始
                  <div class="required">*</div>
                </span>
                <el-date-picker
                  v-model="predictStart"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </div>
              <div>
                <span>
                  计划结束
                  <div class="required">*</div>
                </span>
                <el-date-picker
                  v-model="predictEnd"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </div>
            </li>
            <!-- <li>
                            <div>
                                <span>
                                    实际开始
                                </span>
                                <el-date-picker
                                    v-model="start"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </div>
                            <div>
                                <span>
                                    实际结束
                                </span>
                                <el-date-picker
                                    v-model="end"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </div>
            </li>-->
            <li>
              <div>
                <span>负责人</span>
                <!-- <input type="text" /> -->
                <el-select v-model="principal" placeholder="请选择负责人" clearable>
                  <el-option
                    v-for="item in people"
                    :key="item.id"
                    :label="item.empName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
              <div>
                <span>
                  管控级别
                  <div class="required">*</div>
                </span>
                <el-select v-model="controlRank" placeholder="请选择">
                  <el-option
                    v-for="item in rankOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </li>
            <li>
              <!-- <div>
                      <span>
                          流水段
                      </span>
                      <input type="text">
              </div>-->
              <div>
                <span>关键节点</span>
                <el-radio v-model="radio" label='true'>是</el-radio>
                <el-radio v-model="radio" label='false'>否</el-radio>
              </div>
            </li>
          </ul>
        </div>
        <div class="form" v-show="newActive==2">
          <div class="button-box">
            <a>添加</a>
          </div>
          <div class="list-box">
            <ul>
              <li class="first">
                <!-- 编号 -->
                <div class="number">编号</div>
                <!-- 任务名称 -->
                <div class="task-name">任务名称</div>
                <!-- 计划名称 -->
                <div class="plan-name">计划名称</div>
                <!-- 前置类型 -->
                <div class="preposition">前置类型</div>
                <!-- 延迟间隔 -->
                <div class="interval">延迟间隔</div>
                <!-- 操作 -->
                <div class="operation">操作</div>
              </li>
              <li>
                <div class="number">1</div>
                <div class="task-name">F1/F2电梯（-3~69F）</div>
                <div class="plan-name">2019年11月计划</div>
                <div class="preposition">
                  <input type="text" />
                </div>
                <div class="interval">
                  <input type="text" />
                </div>
                <div class="operation">
                  <i class="el-icon-error"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="form" v-show="newActive==3">
          <div class="button-box">
            <a>添加</a>
          </div>
          <div class="list-box">
            <ul>
              <li class="first">
                <!-- 编号 -->
                <div class="number">编号</div>
                <!-- 任务名称 -->
                <div class="task-name">任务名称</div>
                <!-- 计划名称 -->
                <div class="plan-name">计划名称</div>
                <!-- 计划所占进度 -->
                <div class="proportion">计划所占进度</div>
                <!-- 操作 -->
                <div class="operation">操作</div>
              </li>
              <li>
                <div class="number">1</div>
                <div class="task-name">F1/F2电梯（-3~69F）</div>
                <div class="plan-name">2019年11月计划</div>
                <div class="proportion">
                  <input type="text" />
                </div>
                <div class="operation">
                  <i class="el-icon-error"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="confirm">
          <a v-show="dialogState" class="button" @click="addNode()">确定</a>
          <a v-show="!dialogState" class="button" @click="editNode()">确定</a>
        </div>
      </div>
      <!-- 前置任务选则 -->
      <div class="dialog-box" v-show="prepositionShow" style="width:6rem">
        <div class="title" v-show="dialogState">
          新增前置节点
          <a class="close" @click="prepositionShow=false">
            <i class="el-icon-close"></i>
          </a>
        </div>
        <div class="form">
          <ul style="padding-left:0">
            <li>
              <div>
                <span>节点名称</span>
                <el-select v-model="preposePian" placeholder="选择前置节点">
                  <el-option
                    v-for="item in nodeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </li>
          </ul>
        </div>
        <div class="confirm">
          <a class="button" @click="addPrepose">确定</a>
        </div>
      </div>
      <!-- 遮罩层 -->
      <div class="shade-box" v-show="dialogShow || prepositionShow"></div>
      <!-- 甘特图 -->
      <!-- <div class="gantt-chart" v-show="ganttShow">
        <ul>
          <li>
            <div class="month">2019.1</div>
            <div class="day">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
              <span>11</span>
              <span>12</span>
              <span>13</span>
              <span>14</span>
              <span>15</span>
              <span>16</span>
              <span>17</span>
              <span>18</span>
              <span>19</span>
              <span>20</span>
              <span>21</span>
              <span>22</span>
              <span>23</span>
              <span>24</span>
              <span>25</span>
              <span>26</span>
              <span>27</span>
              <span>28</span>
              <span>29</span>
              <span>30</span>
            </div>
            <div class="progress-bar">
              <div class="schedule-bg" style="width: 100%">
                <div class="sub-schedule" style="width: 50%">
                  <div class="text-box">50%</div>
                </div>
              </div>
            </div>
            <div class="progress-bar">
              <div class="schedule-bg" style="left:20%;width: 57%">
                <div class="sub-schedule" style="width: 100%;background-color: #feb37f;">
                  <div class="text-box">100%</div>
                </div>
              </div>
            </div>
            <div class="progress-bar">
              <div class="schedule-bg" style="width: 57%">
                <div class="sub-schedule" style="width: 80%;background-color: #ff7a81;">
                  <div class="text-box">80%</div>
                </div>
              </div>
            </div>
            <div class="progress-bar">
              <div class="schedule-bg" style="left:10%;width: 67%">
                <div class="sub-schedule" style="width: 100%">
                  <div class="text-box">100%</div>
                </div>
              </div>
            </div>
            <div class="progress-bar">
              <div class="schedule-bg" style="left:37%;width: 57%">
                <div class="sub-schedule" style="width: 100%">
                  <div class="text-box">100%</div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="month">2019.2</div>
            <div class="day">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
              <span>11</span>
              <span>12</span>
              <span>13</span>
              <span>14</span>
              <span>15</span>
              <span>16</span>
              <span>17</span>
              <span>18</span>
              <span>19</span>
              <span>20</span>
              <span>21</span>
              <span>22</span>
              <span>23</span>
              <span>24</span>
              <span>25</span>
              <span>26</span>
              <span>27</span>
              <span>28</span>
              <span>29</span>
              <span>30</span>
            </div>
            <div class="progress-bar">
              <div class="schedule-bg" style="width: 100%">
                <div class="sub-schedule" style="width: 50%">
                  <div class="text-box">50%</div>
                </div>
              </div>
            </div>
            <div class="progress-bar">
              <div class="schedule-bg" style="left:20%;width: 57%">
                <div class="sub-schedule" style="width: 100%;background-color: #feb37f;">
                  <div class="text-box">100%</div>
                </div>
              </div>
            </div>
            <div class="progress-bar">
              <div class="schedule-bg" style="width: 57%">
                <div class="sub-schedule" style="width: 80%;background-color: #ff7a81;">
                  <div class="text-box">80%</div>
                </div>
              </div>
            </div>
            <div class="progress-bar">
              <div class="schedule-bg" style="left:10%;width: 67%">
                <div class="sub-schedule" style="width: 100%">
                  <div class="text-box">100%</div>
                </div>
              </div>
            </div>
            <div class="progress-bar">
              <div class="schedule-bg" style="left:37%;width: 57%">
                <div class="sub-schedule" style="width: 100%">
                  <div class="text-box">100%</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>-->
      <!-- 甘特图 -->
      <div>
        <div ref="gantt" id="gantt" :style="ganttShow?block:none"></div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
#systemSchedule_control {
  width: 100%;
  .content {
    border-radius: 0.04rem;
    background-color: #fff;
    box-shadow: 0 0 0.5rem -0.3rem #666;
    min-height: 5.6rem;
    max-height: 9rem;
    overflow-y: scroll;
    position: relative;
    .top-button {
      height: 0.7rem;
      padding: 0.2rem;
      display: flex;
      justify-content: space-between;
      .button-box {
        height: 0.3rem;
        a {
          float: left;
          height: 0.3rem;
          color: #0090ff;
          font-size: 0.14rem;
          transition: all 0.5s;
          margin-right: 0.2rem;
          line-height: 0.28rem;
          border-radius: 0.02rem;
          padding-right: 0.09rem;
          border: 0.01rem solid #0090ff;
          &:hover {
            color: #fff;
            background-color: #0090ff;
          }
          .icon {
            width: 0.37rem;
            height: 0.28rem;
            transition: all 0.5s;
            display: inline-block;
            vertical-align: middle;
            background-repeat: no-repeat;
            background-position: center center;
          }
        }
        .new {
          .icon {
            background-image: url("../../../../static/images/system-new.png");
          }
          &:hover {
            .icon {
              background-image: url("../../../../static/images/system-newHover.png");
            }
          }
        }
        .derive {
          .icon {
            background-image: url("../../../../static/images/system-derive.png");
          }
          &:hover {
            .icon {
              background-image: url("../../../../static/images/system-deriveHover.png");
            }
          }
        }
        .contract {
          .icon {
            background-image: url("../../../../static/images/system-contract.png");
          }
          &:hover {
            .icon {
              background-image: url("../../../../static/images/system-contractHover.png");
            }
          }
        }
        .cut {
          .icon {
            background-image: url("../../../../static/images/systemGreen-cut.png");
          }
          &:hover {
            .icon {
              background-image: url("../../../../static/images/systemGreen-cutHover.png");
            }
          }
        }
      }
      .search-box {
        .el-select {
          height: 0.3rem;
          border: 0.01rem solid #c0c0c0;
          border-radius: 0.04rem;
          margin-right: 0.1rem;
        }
        .el-date-editor {
          height: 0.3rem;
          border-color: #c0c0c0;
        }
      }
    }
    .main-list {
      ul {
        padding: 0.2rem;
        .ul-list {
          .ul-list-father {
            height: 0.32rem;
            width: 100%;
            padding-left: 0.52rem;
            border: 0.01rem solid #f3f3f3;
            border-bottom: none;
            display: flex;
            justify-content: space-between;
            position: relative;
            // &:last-child {
            //   border-bottom: 0.01rem solid #f3f3f3;
            //   background-color: #000;
            // }
            > div {
              color: #4a4a4a;
              font-size: 0.12rem;
              line-height: 0.3rem;
            }
            .schedule {
              width: 0.9rem;
              .schedule-bar {
                width: 0.6rem;
                height: 0.12rem;
                background-color: #e9f2fe;
                transform: translateY(0.12rem);
                .sub-schedule {
                  background-color: #0090ff;
                  // width: 50%;
                  color: #fff;
                  text-align: center;
                  height: 0.12rem;
                  line-height: 0.12rem;
                }
              }
            }
            .number {
              width: 0.5rem;
            }
            .node {
              flex: 1;
              cursor: pointer;
            }
            .principal,
            .status,
            .rank,
            .plan-time,
            .practical-time {
              width: 0.7rem;
            }
            .plan-start,
            .plan-end,
            .practical-start,
            .practical-end {
              width: 0.8rem;
              .startClick {
                color: #009933;
              }
            }
            .practical-start {
              .startClick {
                color: #009933;
              }
            }
            .operation {
              width: 0.3rem;
              a {
                font-size: 0.2rem;
                text-align: center;
              }
            }
            .relevance {
              position: absolute;
              width: 0.18rem;
              height: 0.12rem;
              // background-color: #0090ff;
              left: 0.21rem;
              top: 50%;
              transform: translateY(-50%);
              background-image: url("../../../../static/images/systemSchedule-btn.png");
              background-position: center center;
              background-repeat: no-repeat;
              background-size: contain;
            }
          }
          &:last-child {
            border-bottom: 0.01rem solid #f3f3f3;
          }
          .ul-list-child {
            background-color: rgb(234, 247, 234);
            ul {
              padding: 0;
              li {
                > div {
                  height: 0.32rem;
                  width: 100%;
                  padding-left: 0.7rem;
                  border: 0.01rem solid #f3f3f3;
                  border-bottom: none;
                  display: flex;
                  justify-content: space-between;
                  position: relative;
                  > div {
                    color: #4a4a4a;
                    font-size: 0.12rem;
                    line-height: 0.3rem;
                  }
                  .schedule {
                    width: 0.9rem;
                    .schedule-bar {
                      width: 0.6rem;
                      height: 0.12rem;
                      background-color: #e9f2fe;
                      transform: translateY(0.12rem);
                      .sub-schedule {
                        background-color: #0090ff;
                        // width: 50%;
                        color: #fff;
                        text-align: center;
                        height: 0.12rem;
                        line-height: 0.12rem;
                      }
                    }
                  }
                  .number {
                    width: 0.5rem;
                  }
                  .node {
                    flex: 1;
                    // padding-left: 0.15rem;
                    color: #b5b4b4;
                  }
                  .principal,
                  .status,
                  .rank,
                  .plan-time,
                  .practical-time {
                    width: 0.7rem;
                  }
                  .plan-start,
                  .plan-end,
                  .practical-start,
                  .practical-end {
                    width: 0.8rem;
                    .startClick {
                      color: #009933;
                    }
                  }
                  .practical-start {
                    .startClick {
                      color: #009933;
                    }
                  }
                  .operation {
                    width: 0.3rem;
                    a {
                      font-size: 0.2rem;
                      text-align: center;
                    }
                  }
                }
              }
            }
          }
        }
        .first {
          height: 0.32rem;
          width: 100%;
          padding-left: 0.52rem;
          border: 0.01rem solid #f3f3f3;
          border-bottom: none;
          display: flex;
          justify-content: space-between;
          position: relative;
          &:last-child {
            border-bottom: 0.01rem solid #f3f3f3;
          }
          > div {
            color: #4a4a4a;
            font-size: 0.12rem;
            line-height: 0.3rem;
          }
          .schedule {
            width: 0.9rem;
            .schedule-bar {
              width: 0.6rem;
              height: 0.12rem;
              background-color: #e9f2fe;
              transform: translateY(0.12rem);
              .sub-schedule {
                background-color: #0090ff;
                // width: 50%;
                color: #fff;
                text-align: center;
                height: 0.12rem;
                line-height: 0.12rem;
              }
            }
          }
          .number {
            width: 0.5rem;
          }
          .node {
            flex: 1;
          }
          .principal,
          .status,
          .rank,
          .plan-time,
          .practical-time {
            width: 0.7rem;
          }
          .plan-start,
          .plan-end,
          .practical-start,
          .practical-end {
            width: 0.8rem;
            .startClick {
              color: #009933;
            }
          }
          .practical-start {
            .startClick {
              color: #009933;
            }
          }
          .operation {
            width: 0.3rem;
            a {
              font-size: 0.2rem;
              text-align: center;
            }
          }
          .relevance {
            position: absolute;
            width: 0.18rem;
            height: 0.12rem;
            // background-color: #0090ff;
            left: 0.21rem;
            top: 50%;
            transform: translateY(-50%);
            background-image: url("../../../../static/images/systemSchedule-btn.png");
            background-position: center center;
            background-repeat: no-repeat;
            background-size: contain;
          }
          > div {
            font-weight: bolder;
          }
        }
      }
    }
    .relevance-box {
      width: 17.28rem;
      height: 5.12rem;
      position: fixed;
      left: 1.75rem;
      top: 5.67rem;
      .title {
        height: 0.51rem;
        border-bottom: 0.01rem solid #b5b5b5;
        font-size: 0.16rem;
        font-weight: bolder;
        display: flex;
        padding: 0 0.5rem;
        line-height: 0.5rem;
        justify-content: space-between;
        background-color: #f2f2f2;
      }
      .button-box {
        height: 0.41rem;
        background-color: #fff;
        border-bottom: 0.01rem solid #f3f3f3;
        display: flex;
        justify-content: space-between;
        padding: 0 0.5rem;
        .nav-box {
          > a {
            color: #4a4a4a;
            height: 0.41rem;
            font-size: 0.16rem;
            line-height: 0.4rem;
            display: inline-block;
            &.active {
              color: #0090ff;
              border-bottom: 0.02rem solid #0090ff;
            }
          }
        }
        .btn-box {
          a {
            width: 1.12rem;
            display: inline-block;
            height: 0.28rem;
            color: #0090ff;
            font-size: 0.12rem;
            transition: all 0.5s;
            line-height: 0.26rem;
            border-radius: 0.02rem;
            border: 0.01rem solid #0090ff;
            text-align: center;
            transform: translateY(0.08rem);
            &:hover {
              color: #fff;
              background-color: #0090ff;
            }
          }
        }
      }
      .relevance-list {
        height: 4.2rem;
        background-color: #fff;
        > ul {
          padding: 0.2rem;
          min-height: 2.1rem;
          li {
            height: 0.32rem;
            width: 100%;
            padding-left: 0.52rem;
            border: 0.01rem solid #f3f3f3;
            border-bottom: none;
            display: flex;
            // justify-content: space-between;
            position: relative;
            &:last-child {
              border-bottom: 0.01rem solid #f3f3f3;
            }
            > div > div {
              width: 16.88rem;
              padding-left: 0.52rem;
              display: flex;
              justify-content: space-between;
              > div {
                color: #4a4a4a;
                font-size: 0.12rem;
                line-height: 0.3rem;
                > div {
                  color: #4a4a4a;
                  font-size: 0.12rem;
                  line-height: 0.3rem;
                }
              }
              .number {
                width: 0.5rem;
              }
              .node,
              .name,
              .occupation {
                flex: 1;
              }
              .plan-start,
              .plan-end {
                width: 1.2rem;
              }
            }
            > div {
              color: #4a4a4a;
              font-size: 0.12rem;
              line-height: 0.3rem;
              > div {
                color: #4a4a4a;
                font-size: 0.12rem;
                line-height: 0.3rem;
              }
            }
            .li-box {
              display: flex;
              justify-content: space-between;
              position: relative;
              height: 0.3rem;
              width: 100%;
            }
            .schedule {
              width: 0.9rem;
              .schedule-bar {
                width: 0.6rem;
                height: 0.12rem;
                background-color: #e9f2fe;
                transform: translateY(0.12rem);
                .sub-schedule {
                  background-color: #0090ff;
                  // width: 50%;
                  color: #fff;
                  text-align: center;
                  height: 0.12rem;
                  line-height: 0.12rem;
                }
              }
            }
            .number {
              width: 0.5rem;
            }
            .node,
            .name,
            .occupation,
            .interval,
            .preposition {
              flex: 1;
            }
            .status,
            .rank,
            .plan-time,
            .practical-time {
              width: 0.7rem;
            }
            .plan-start,
            .plan-end,
            .practical-start,
            .practical-end {
              width: 1.2rem;
            }
            .operation {
              width: 0.3rem;
              > a {
                font-size: 0.2rem;
                text-align: center;
              }
            }
            .relevance {
              position: absolute;
              width: 0.18rem;
              height: 0.12rem;
              background-color: #0090ff;
              left: 0.21rem;
              top: 50%;
              transform: translateY(-50%);
            }
            .preposition,
            .interval {
              input {
                width: 1.16rem;
                height: 0.28rem;
                border: 0.01rem solid #acabab;
                border-radius: 0.04rem;
              }
            }
          }
          .first {
            > div {
              font-weight: bolder;
            }
          }
        }
        .paging-box {
          width: 100%;
          height: 0.16rem;
          margin-top: 0.2rem;
          padding-right: 0.2rem;
          .el-pagination {
            float: left;
            margin-left: 50%;
            transform: translateX(-50%);
          }
        }
      }
      .preposition-list {
        height: 4.2rem;
        background-color: #fff;
        > ul {
          padding: 0.2rem;
          min-height: 2.1rem;
          li {
            height: 0.32rem;
            width: 100%;
            padding-left: 0.52rem;
            border: 0.01rem solid #f3f3f3;
            border-bottom: none;
            display: flex;
            justify-content: space-between;
            position: relative;
            &:last-child {
              border-bottom: 0.01rem solid #f3f3f3;
            }
            > div {
              color: #4a4a4a;
              font-size: 0.12rem;
              line-height: 0.3rem;
              > div {
                color: #4a4a4a;
                font-size: 0.12rem;
                line-height: 0.3rem;
              }
            }
            .li-box {
              display: flex;
              justify-content: space-between;
              position: relative;
              height: 0.3rem;
              width: 100%;
            }
            .schedule {
              width: 0.9rem;
              .schedule-bar {
                width: 0.6rem;
                height: 0.12rem;
                background-color: #e9f2fe;
                transform: translateY(0.12rem);
                .sub-schedule {
                  background-color: #0090ff;
                  // width: 50%;
                  color: #fff;
                  text-align: center;
                  height: 0.12rem;
                  line-height: 0.12rem;
                }
              }
            }
            .number {
              width: 0.5rem;
            }
            .node,
            .name,
            .occupation,
            .interval,
            .preposition {
              flex: 1;
            }
            .status,
            .rank,
            .plan-time,
            .practical-time {
              width: 0.7rem;
            }
            .plan-start,
            .plan-end,
            .practical-start,
            .practical-end {
              width: 0.8rem;
            }
            .operation {
              width: 0.3rem;
              > a {
                font-size: 0.2rem;
                text-align: center;
              }
            }
            .relevance {
              position: absolute;
              width: 0.18rem;
              height: 0.12rem;
              background-color: #0090ff;
              left: 0.21rem;
              top: 50%;
              transform: translateY(-50%);
            }
            .preposition,
            .interval {
              input {
                width: 1.16rem;
                height: 0.28rem;
                border: 0.01rem solid #acabab;
                border-radius: 0.04rem;
              }
            }
          }
          .first {
            > div {
              font-weight: bolder;
            }
          }
        }
        .paging-box {
          width: 100%;
          height: 0.16rem;
          margin-top: 0.2rem;
          padding-right: 0.2rem;
          .el-pagination {
            float: left;
            margin-left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
    .dialog-box {
      left: 50%;
      top: 0.22rem;
      z-index: 200;
      width: 12.02rem;
      overflow: hidden;
      position: absolute;
      border-radius: 0.1rem;
      transform: translate(-50%);
      background-color: #fefefe;
      .title {
        color: #fff;
        height: 0.6rem;
        font-size: 0.24rem;
        line-height: 0.6rem;
        text-align: center;
        position: relative;
        font-weight: bolder;
        background: linear-gradient(to right, #6cc4ff, #489cff);
        a {
          top: 50%;
          right: 0.2rem;
          color: #fff;
          position: absolute;
          transform: translateY(-50%);
        }
      }
      .nav {
        height: 0.58rem;
        border: 0.01rem solid #dedede;
        padding: 0 3.28rem;
        display: flex;
        justify-content: space-between;
        > a {
          color: #4a4a4a;
          height: 0.58rem;
          font-size: 0.18rem;
          font-weight: bolder;
          line-height: 0.57rem;
          display: inline-block;
          &.active {
            color: #0090ff;
            border-bottom: 0.02rem solid #0090ff;
          }
        }
      }
      .form {
        padding-bottom: 0.3rem;
        // min-height: 4.56rem;
        > ul {
          padding-left: 0.43rem;
          li {
            display: flex;
            height: 0.71rem;
            padding-top: 0.3rem;
            > div {
              width: 5.38rem;
              > span {
                width: 1.72rem;
                height: 0.41rem;
                font-size: 0.16rem;
                text-align: right;
                position: relative;
                line-height: 0.41rem;
                padding-right: 0.32rem;
                display: inline-block;
                .required {
                  top: -0.01rem;
                  right: 0.22rem;
                  color: #f00;
                  position: absolute;
                }
              }
              input {
                width: 3.66rem;
                height: 0.41rem;
                padding-left: 0.1rem;
                border-radius: 0.02rem;
                border: 0.01rem solid #b1b1b1;
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
                height: 0.41rem;
                input {
                  padding-left: 0.3rem;
                }
              }
            }
          }
        }
        .button-box {
          height: 0.49rem;
          border-bottom: 0.01rem solid #dedede;
          padding-top: 0.1rem;
          padding-left: 0.92rem;
          a {
            float: left;
            height: 0.28rem;
            width: 0.98rem;
            color: #0090ff;
            font-size: 0.14rem;
            transition: all 0.5s;
            line-height: 0.26rem;
            border-radius: 0.02rem;
            border: 0.01rem solid #0090ff;
            text-align: center;
            &:hover {
              color: #fff;
              background-color: #0090ff;
            }
          }
        }
        .list-box {
          li {
            padding-left: 1rem;
            display: flex;
            height: 0.61rem;
            border-bottom: 0.01rem solid #dedede;
            > div {
              color: #4a4a4a;
              font-size: 0.14rem;
              line-height: 0.6rem;
              input {
                width: 1.35rem;
                height: 0.32rem;
                border: 0.01rem solid #acabab;
                border-radius: 0.04rem;
              }
            }
            .number {
              width: 1rem;
            }
            .task-name,
            .plan-name {
              width: 2.3rem;
            }
            .preposition,
            .interval {
              width: 2rem;
            }
            .proportion {
              width: 4rem;
            }
            .operation {
              font-size: 0.2rem;
            }
          }
          .first {
            height: 0.29rem;
            background-color: #f8f8f8;
            > div {
              color: #4a4a4a;
              font-size: 0.16rem;
              line-height: 0.28rem;
            }
          }
        }
      }
      .confirm {
        height: 0.8rem;
        background-color: #f8f8f8;
        border-top: 0.01rem solid #dedede;
        .button {
          color: #fff;
          display: block;
          width: 1.63rem;
          height: 0.49rem;
          margin: 0 auto;
          font-size: 0.2rem;
          margin-top: 0.15rem;
          text-align: center;
          line-height: 0.47rem;
          transition: all 0.5s;
          border-radius: 0.02rem;
          background-color: #ffd14f;
          border: 0.01rem solid #d9b759;
          &:hover {
            background-color: #d9b759;
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
      background-color: rgba(0, 0, 0, 0.5);
    }
    .gantt-chart {
      width: 11.9rem;
      position: absolute;
      top: 0.58rem;
      right: 0.2rem;
      background-color: #fff;
      border-left: 0.02rem solid #f3f3f3;
      border-right: 0.01rem solid #f3f3f3;
      min-height: 5.02rem;
      overflow: auto;
      ul {
        width: 200%;
        li {
          float: left;
          width: 11.87rem;
          .month {
            color: #4a4a4a;
            height: 0.32rem;
            font-size: 0.12rem;
            font-weight: bolder;
            border-top: 0.01rem solid #f3f3f3;
            border-bottom: 0.01rem solid #f3f3f3;
            text-align: center;
            border-right: 0.01rem solid #f3f3f3;
            line-height: 0.3rem;
          }
          .day {
            color: #4a4a4a;
            height: 0.32rem;
            font-size: 0.12rem;
            font-weight: bolder;
            border-top: 0.01rem solid #f3f3f3;
            border-bottom: 0.01rem solid #f3f3f3;
            display: flex;
            justify-content: space-between;
            span {
              flex: 1;
              line-height: 0.3rem;
              text-align: center;
              border-right: 0.01rem solid #f3f3f3;
            }
          }
          .progress-bar {
            height: 0.32rem;
            border-top: 0.01rem solid #f3f3f3;
            border-bottom: 0.01rem solid #f3f3f3;
            position: relative;
            .schedule-bg {
              height: 0.12rem;
              position: absolute;
              background-color: #e9f2fe;
              bottom: 0;
              .sub-schedule {
                height: 0.12rem;
                position: relative;
                font-size: 0.12rem;
                line-height: 0.12rem;
                background-color: #0090ff;
                .text-box {
                  top: -0.14rem;
                  right: -0.24rem;
                  position: absolute;
                }
              }
            }
          }
        }
      }
    }
    #gantt {
      width: 11.9rem;
      position: absolute;
      top: 0.58rem;
      right: 0.2rem;
      min-block-size: 5rem;
      max-height: 7rem;
      overflow: auto;
    }
  }
}
</style>

<script>
import moment from "moment";
// 甘特图
import gantt from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import "dhtmlx-gantt/codebase/locale/locale_cn";
export default {
  data() {
    return {
      relevanceShow: false, // 关联计划显示状态
      relevanceActive: true, // 关联计划当前选中模块
      dialogShow: false, // 对话框显示状态
      dialogState: true, // 对话框状态
      prepositionShow: false, // 添加前置节点对话框显示状态
      newActive: 1, // 新增对话框当前选中模块
      radio: 'false', // 是否关键节点
      ganttShow: false, // 甘特图显示状态
      stateOptions: [
        {
          value: 0,
          label: "正常开始"
        },
        {
          value: 1,
          label: "未开始"
        },
        {
          value: 2,
          label: "延期未开始 "
        },
        {
          value: 3,
          label: "延期开始"
        },
        {
          value: 4,
          label: "延期完成"
        },
        {
          value: 5,
          label: "正常完成"
        }
      ], // 延迟状态选项
      stateValue: "", // 延迟状态值
      rankOptions: [
        {
          value: 1,
          label: "一级"
        },
        {
          value: 2,
          label: "二级"
        },
        {
          value: 3,
          label: "三级"
        }
      ], // 管控级别选项
      rankValue: "", // 管控级别值
      dateValue: "", // 日期

      projectId: "", // 项目id
      creatorId: "", // 创建人id
      nodeName: "", // 节点名称
      parentId: 0, // 父级节点
      predictStart: "", // 计划开始时间
      predictEnd: "", // 计划结束时间
      start: "", // 实际开始时间
      end: "", // 实际结束时间
      controlRank: "", // 管控级别值
      principal: "", // 负责人id
      pipeliningSegment: "", // 流水段id
      nodeList: "", // 节点列表
      activeId: "", // 当前选中id
      preposePian: "", // 前置节点id
      preposeList: "", // 前置节点列表
      activeMainPlan: "", // 当前选中节点id
      start: "", // 开始时间
      people: [], // 人员列表
      subSchedule: {
        // 进度条文字颜色
        width: 0,
        color: "black"
      },
      schedulePlan: [], // 所有的进度计划
      tasks: {
        // 甘特图
        data: [
          {
            id: 1,
            text: "节点1",
            start_date: "15-08-2017",
            duration: 3,
            progress: 0.6
          },
          {
            id: 2,
            text: "节点2",
            start_date: "18-04-2017",
            duration: 3,
            progress: 0.4
          },
          {
            id: 3,
            text: "节点3",
            start_date: "20-04-2017",
            duration: 3,
            progress: 0.4
          }
        ]
      },
      test: {
        // 甘特图的数据
        data: []
      },
      none: {
        display: "none"
      },
      block: {
        display: "block"
      },
      itemClick: 9999999, // 子节点的显示
      parentIdList: [] // 所有的父节点列表
    };
  },
  created() {
    this.getCreatorId();
    this.selectZhNodeList();
    this.getPersonnelList();
    this.selectZhProgressPlanList();
  },
  // mounted() {
  //   // 初始化甘特图
  //   gantt.init(this.$refs.gantt);
  //   // 修改表格
  //   gantt.config.scales = [
  //     {unit: "month", step: 1, format: "%F, %Y"},
  //     {unit: "day", step: 1, format: "%d"}
  //   ];
  //   // 表格左侧宽度
  //   gantt.config.grid_width = 200;
  //   // 表头高度
  //   gantt.config.scale_height = 50;
  //   // 表格每栏的宽度
  //   gantt.autosize_max_width = 1;
  //   // 是否显示依赖线
  //   gantt.config.show_links = false;
  //   // 行高
  //   gantt.config.row_height = 30;
  //   // 滚动
  //   gantt.config.autoscroll = true;
  //   // 表格属性
  //   gantt.config.columns = [
  //     { name:"text", label:"节点名称", tree: false, max_width:'200' }
  //   ]
  //   // 拖拽图形
  //   gantt.config.drag_move = false;
  //   // 拖拽百分比
  //   gantt.config.drag_progress = false;
  //   // 改变工期
  //   gantt.config.drag_resize = false;
  //   // 数据解析
  //   // gantt.parse(this.test);
  // },
  methods: {
    // 获取开始时间与结束时间
    getTime() {
      // console.log(this.dateValue)
      this.dateValue
        ? (this.predictStart = this.dateValue[0])
        : (this.predictStart = "");
      this.dateValue
        ? (this.predictEnd = this.dateValue[1])
        : (this.predictEnd = "");
    },
    // 获取创建人id
    getCreatorId() {
      this.creatorId = sessionStorage.getItem("userId");
      this.projectId = sessionStorage.getItem("pid");
    },

    // 获取人员列表
    getPersonnelList() {
      this.$axios
        .post(
          `/api/pc/projectWorkersApi/list?projectId=${this.projectId}&pageNum=1&pageSize=1000`
        )
        .then(res => {
          // console.log(res.data.data.rows);
          // console.log(res);
          this.people = res.data.data.rows;
        });
    },

    // 查询节点列表
    selectZhNodeList() {
      this.$axios
        .post(
          `/api/Node/selectZhNodeList?creatorId=${this.creatorId}&state=${this.stateValue}&controlRank=${this.rankValue}`
        )
        .then(res => {
          this.nodeList = res.data.data;
          // console.log(this.nodeList)
          this.selectRelevanceNode();
          this.getGantt();
        });
    },

    // 搜索节点列表searchSelectZhNodeList
    searchSelectZhNodeList() {
      this.$axios
        .post(
          `/api/Node/selectZhNodeList?creatorId=${this.creatorId}&state=${this.stateValue}&controlRank=${this.rankValue}&predictStart=${this.startTime}&predictEnd=${this.endTime}`
        )
        .then(res => {
          this.nodeList = res.data.data;
          // console.log(this.nodeList)
          this.selectRelevanceNode();
          this.getGantt();
        });
    },

    // 查询计划列表
    selectZhProgressPlanList() {
      this.$axios
        .post(`/api/Node/selectZhProgressPlanList?creatorId=${this.creatorId}`)
        .then(res => {
          // console.log(res.data.data)
          this.schedulePlan = res.data.data;
        });
    },

    // 添加节点
    addNode() {
      // debugger
      if (
        this.nodeName &&
        this.predictStart &&
        this.predictEnd &&
        this.controlRank
      ) {
        this.$axios
          .post(
            `/api/Node/addNode?creatorId=${this.creatorId}&name=${this.nodeName}&parentId=${this.parentId}&predictStart=${this.predictStart}&predictEnd=${this.predictEnd}&controlRank=${this.controlRank}&principal=${this.principal}&content=${this.radio}`
          )
          .then(res => {
            // console.log(res.data)
            if (res.data.code == 0) {
              this.$message({
                message: "创建成功",
                type: "success"
              });
              this.dialogShow = false;
              this.selectZhNodeList();
            } else {
              this.$message({
                message: "创建失败",
                type: "warning"
              });
            }
          });
      } else {
        this.$message({
          message: "带*号的输入框不得为空",
          type: "warning"
        });
      }
    },

    // 删除节点
    removeNode(id) {
      this.$axios.post(`/api/Node/removeNode?id=${id}`).then(res => {
        // console.log(res.data)
        if (res.data.code == 0) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.selectZhNodeList();
        } else {
          this.$message({
            message: "删除失败",
            type: "warning"
          });
        }
      });
    },

    // 操作下拉框点击事件
    handleCommand(command) {
      // console.log(command)
      if (command.split(":")[0] == "delete") {
        this.removeNode(command.split(":")[1]);
      }
      if (command.split(":")[0] == "edit") {
        this.activeId = command.split(":")[1];
        for (let i = 0; i < this.nodeList.length; i++) {
          if (this.activeId == this.nodeList[i].id) {
            this.nodeName = this.nodeList[i].name;
            this.parentId = this.nodeList[i].parentId;
            if (this.parentId == 0) {
              this.parentId = null;
            }
            this.predictStart = this.nodeList[i].predictStart;
            this.predictEnd = this.nodeList[i].predictEnd;
            this.principal = this.nodeList[i].principal.toString();
            // console.log(typeof this.principal)
            this.controlRank = this.nodeList[i].controlRank;
          }
        }
        this.dialogState = false;
        this.dialogShow = true;
      }
      if (command.split(":")[0] == "preposition") {
        this.activeId = command.split(":")[1];
        this.prepositionShow = true;
      }
    },

    // 编辑节点
    editNode() {
      this.$axios
        .post(
          `/api/Node/editNode?creatorId=${this.creatorId}&name=${this.nodeName}&parentId=${this.parentId}&predictStart=${this.predictStart}&predictEnd=${this.predictEnd}&controlRank=${this.controlRank}&id=${this.activeId}&principal=${this.principal}&content=${this.radio}`
        )
        .then(res => {
          // console.log(res.data)
          if (res.data.code == 0) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.dialogShow = false;
            this.selectZhNodeList();
          } else {
            this.$message({
              message: "修改失败",
              type: "warning"
            });
          }
        });
    },

    // 查询节点关联列表
    selectRelevanceNode() {
      for (let i = 0; i < this.nodeList.length; i++) {
        // console.log(this.nodeList[i].id)
        // console.log(this.nodeList[i].parentId)
        this.parentIdList.push(this.nodeList[i].parentId);
        this.$axios
          .post(
            `/api/Node/selectZhProgressNodeList?nodeId=${this.nodeList[i].id}`
          )
          .then(res => {
            // console.log(res.data.data)
            this.nodeList[i]["associatedNode"] = res.data.data;
            if (res.data.data.length == 0) {
              // this.nodeList[i]["relevance"] = 0;
              this.$set(this.nodeList[i], "relevance", 0);
            } else {
              // this.nodeList[i]["relevance"] = 1;
              this.$set(this.nodeList[i], "relevance", 1);
            }
            // console.log(this.nodeList[i]["relevance"])
          });
      }
      // console.log(this.nodeList);
      // console.log(this.parentIdList)
    },

    // 添加前置节点
    addPrepose() {
      this.$axios
        .post(
          `/api/Node/addPrepose?mainPlan=${this.activeId}&preposePian=${this.preposePian}`
        )
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.prepositionShow = false;
            this.selectZhPreposeList(this.activeMainPlan);
            // this.selectZhNodeList()
          } else {
            this.$message({
              message: "添加失败",
              type: "warning"
            });
          }
          console.log(res.data);
        });
    },

    // 查询前置节点列表
    selectZhPreposeList(mainPlan) {
      this.relevanceShow = true;
      this.activeMainPlan = mainPlan;
      // console.log(mainPlan)
      this.$axios
        .post(`/api/Node/selectZhPreposeList?mainPlan=${mainPlan}`)
        .then(res => {
          console.log(res.data);
          this.preposeList = res.data.data;
        });
    },

    // 删除前置节点
    removePrepose(id) {
      // console.log(id)
      this.$axios
        .post(`/api/Node/removePrepose?id=${id}`)
        .then(res => {
          // console.log(res.data)
          if (res.data.code == 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.selectZhPreposeList(this.activeMainPlan);
          } else {
            this.$message({
              message: "删除失败",
              type: "warning"
            });
          }
        });
    },

    // 搜索
    search() {
      // console.log(this.dateValue);
      this.dateValue
        ? (this.startTime = this.dateValue[0])
        : (this.startTime = "");
      this.dateValue ? (this.endTime = this.dateValue[1]) : (this.endTime = "");
      this.searchSelectZhNodeList();
      this.$message({
        message: "搜索成功",
        type: "success"
      });
    },

    // 获取开始时间并显示
    getStartTime(item) {
      // console.log(item)
      this.start = moment().format("YYYY-MM-DD");
      // console.log(this.start)
      this.$axios
        .post(`/api/Node/editNode?id=${item.id}&start=${this.start}`)
        .then(res => {
          // console.log(res.data)
          if (res.data.code == 0) {
            this.$message({
              message: "开始时间已更新",
              type: "success"
            });
            item.start = this.start;
            this.selectZhNodeList();
          }
        });
    },

    // 显示责任人人名
    getPrincipal(item) {
      var temp = "";
      this.people.forEach(items => {
        if (items.id == item.principal) {
          // console.log(items.empName);
          temp = items.empName;
          // item.principal = items.empName
        }
      });
      // console.log(temp)
      return temp;
    },

    // 修改css百分比 和完成数
    percentage(ratio) {
      if (ratio == null) {
        return 0 + "%";
      } else {
        // this.subSchedule.color = '#fff';
        // this.subSchedule.width = ratio + '%';
        return ratio + "%";
      }
    },

    // 点击添加节点按钮
    createNodes() {
      this.nodeName = "";
      this.parentId = "";
      this.predictStart = "";
      this.predictEnd = "";
      this.principal = "";
      this.controlRank = "";
      this.dialogShow = true;
      this.dialogState = true;
    },

    // 甘特图数据
    getGantt() {
      // 清除数据
      // gantt.clearAll();
      gantt.init(this.$refs.gantt);
      // 修改表格
      gantt.config.scales = [
        { unit: "month", step: 1, format: "%F, %Y" },
        { unit: "day", step: 1, format: "%d" }
      ];
      // 表格左侧宽度
      gantt.config.grid_width = 200;
      // 表头高度
      gantt.config.scale_height = 63;
      // 表格每栏的宽度
      gantt.autosize_max_width = 1;
      // 是否显示依赖线
      gantt.config.show_links = false;
      // 行高
      gantt.config.row_height = 32;
      // 滚动
      gantt.config.autoscroll = true;
      // 表格属性
      gantt.config.columns = [
        { name: "text", label: "节点名称", tree: false, max_width: "200" }
      ];
      // 拖拽图形
      gantt.config.drag_move = false;
      // 拖拽百分比
      gantt.config.drag_progress = false;
      // 改变工期
      gantt.config.drag_resize = false;
      // gantt.clearAll()
      for (let i = 0; i < this.nodeList.length; i++) {
        let temp = {};
        let day = 0;
        temp.id = i + 1;
        temp.text = this.nodeList[i].name;
        // 结束时间
        let data1 = new Date(
          this.nodeList[i].predictStart
            .split(" ")[0]
            .split("-")
            .join("/")
        );
        let data2 = new Date(
          this.nodeList[i].predictEnd
            .split(" ")[0]
            .split("-")
            .join("/")
        );
        temp.duration =
          (data2.getTime() - data1.getTime()) / (1000 * 60 * 60 * 24);
        // temp.duration = 10;
        // 进度 0~1
        temp.progress = this.nodeList[i].progress / 100;
        temp.start_date =
          this.nodeList[i].predictStart.split(" ")[0].split("-")[2] +
          "-" +
          this.nodeList[i].predictStart.split(" ")[0].split("-")[1] +
          "-" +
          this.nodeList[i].predictStart.split(" ")[0].split("-")[0];
        // temp.start_date = '15-08-2018';
        this.test.data.push(temp);
      }
      // console.log('开始时间' + new Date(this.nodeList[0].predictStart.split(' ')[0].split('-').join('/')).getTime());
      // console.log('结束时间' + new Date(this.nodeList[0].predictEnd.split(' ')[0].split('-').join('/')).getTime());
      // console.log('天数' + (new Date(this.nodeList[0].predictEnd.split(' ')[0].split('-').join('/')).getTime() - new Date(this.nodeList[0].predictStart.split(' ')[0].split('-').join('/')).getTime()) / (1000*60*60*24))
      // console.log(this.nodeList[0].predictStart.split(' ')[0].split('-')[2] + '-' + this.nodeList[0].predictStart.split(' ')[0].split('-')[1] + '-' + this.nodeList[0].predictStart.split(' ')[0].split('-')[0])
      // console.log(this.nodeList[0].name)
      gantt.parse(this.test);
    },

    // 计划工期
    getPlanDays(item) {
      // console.log(item.predictStart)
      // console.log(item.predictEnd)
      let data1 = new Date(
        item.predictStart
          .split(" ")[0]
          .split("-")
          .join("/")
      );
      let data2 = new Date(
        item.predictEnd
          .split(" ")[0]
          .split("-")
          .join("/")
      );
      let time = (data2.getTime() - data1.getTime()) / (1000 * 60 * 60 * 24);
      // console.log(time)
      return time;
    },

    // 获取结束时间
    getEndTime(item) {
      // console.log(item)
      this.end = moment().format("YYYY-MM-DD");
      // console.log(this.end)
      this.$axios
        .post(`/api/Node/editNode?id=${item.id}&end=${this.end}`)
        .then(res => {
          // console.log(res.data)
          if (res.data.code == 0) {
            this.$message({
              message: "结束时间已更新",
              type: "success"
            });
            item.end = this.end;
            this.selectZhNodeList();
          }
        });
    },

    // 计划实际工期
    getEndDays(item) {
      let data1 = new Date(
        item.start
          .split(" ")[0]
          .split("-")
          .join("/")
      );
      let data2 = new Date(
        item.end
          .split(" ")[0]
          .split("-")
          .join("/")
      );
      let time = (data2.getTime() - data1.getTime()) / (1000 * 60 * 60 * 24);
      // console.log(time)
      return time;
    },

    // 节点点击弹开，关闭其他节点
    itemClicked(index) {
      if (this.itemClick !== index) {
        // this.itemClick = 9999999;
        this.itemClick = index;
      } else {
        if (this.itemClick == index) {
          this.itemClick = 9999999;
        } else {
          this.itemClick = index;
        }
      }
    },

    // 加号是否显示
    showAdd(id) {
      let temp = false;
      this.parentIdList.forEach(item => {
        if (item == id) {
          temp = true;
        }
      });
      return temp;
    }
  }
};
</script>