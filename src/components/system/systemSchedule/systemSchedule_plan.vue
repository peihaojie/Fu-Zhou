<template>
  <div id="systemSchedule_plan">
    <div class="content">
      <!-- 按钮栏 -->
      <div class="top-button">
        <div class="button-box">
          <a class="new" @click="createShow = true; name=''; dateValue=''">
            <i class="icon"></i>
            创建进度计划
          </a>
          <!-- <a class="contract" @click="nodeShow = true;">
            <i class="icon"></i>
            导入节点 要改
          </a> -->
          <!-- <a class="derive" @click="exportZhNode">
            <i class="icon"></i>
            导出计划
          </a> -->
          <!-- <a @click="planShow = true">
            <i class="icon"></i>
            导入计划
          </a> -->
          <!-- <a class="cut">
            <i class="icon"></i>
            切换甘特图
          </a> -->
        </div>
        <div class="search-box">
          <!-- <el-select v-model="stateValue" placeholder="延迟状态" size="mini" clearable>
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="rankValue" placeholder="管控级别" size="mini" clearable>
            <el-option
              v-for="item in rankOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              size="mini"
            ></el-option>
          </el-select> -->
          <el-date-picker
            v-model="dateValue"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            value-format="yyyy-MM-dd"
            @change="search"
          ></el-date-picker>
        </div>
      </div>
      <!-- 主体列表 -->
      <div class="main-list">
        <div class="main-list-item" v-for="(item,index) in planList" :key="index">
            <div class="main-list-top" @click="itemClicked(index)">
              <span class="name">{{item.name}}（{{item.predictStart.split(' ')[0]}}~{{item.predictEnd.split(' ')[0]}}）</span>
              <span class="progress-bar">
                <div class="schedule-bg">
                  <div v-if="item.nodeList" class="sub-schedule" :style="`width: ${getPercentage(item.nodeList)}%`"></div>
                </div>
                <div v-if="item.nodeList" class="text-box">{{getPercentage(item.nodeList)}}%</div>
                <div v-else class="text-box">0%</div>
              </span>
              <span v-if="item.nodeList" class="state">共{{item.nodeList.length}}个节点，已完成{{item.done}}个，未完成{{item.nodeList.length - item.done}}个</span>
              <span v-else class="state">共0个节点，已完成0个，未完成0个</span>
              <el-dropdown @command="handleCommand">
                <a class="el-dropdown-link">
                  <!-- <i class="el-icon-setting"></i> -->
                </a>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="`importNode:${item.id}`">导入节点</el-dropdown-item>
                  <el-dropdown-item  :command="item">导出计划</el-dropdown-item>
                  <!-- <el-dropdown-item>导入计划</el-dropdown-item> -->
                  <el-dropdown-item :command="`delete:${item.id}`">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <i :class="itemClick == index?'el-icon-arrow-down' : 'el-icon-arrow-right'" class="itemClick"></i>
            </div>
            <div class="main-list-button" :class="itemClick == index?'block' : 'none'">
              <ul>
                <li class="first">
                  <div class="number">编号</div>
                  <div class="node">节点</div>
                  <div class="schedule">进度</div>
                  <div class="status">状态</div>
                  <div class="rank">管控级别</div>
                  <div class="plan-time">计划工期</div>
                  <div class="practical-time">实际工期</div>
                  <div class="plan-start">计划开始</div>
                  <div class="plan-end">计划结束</div>
                  <div class="practical-start">实际开始</div>
                  <div class="practical-end">实际结束</div>
                  <div class="operation">操作</div>
                </li>
                <li v-for="(item2, index2) in item.nodeList" :key="index2">
                  <div v-for="(item3,index3) in nodeList" :key="index3" v-show="item2.nodeId == item3.id">
                    <div class="number">{{index2+1}}</div>
                    <div class="node">
                      <!-- <a>
                        <i class="el-icon-remove-outline" style="color:#46aeff"></i>
                      </a> -->
                      {{item3.name}}
                      <!-- <a>
                        <i class="el-icon-edit-outline" style="color:#46aeff" @click="nodeOperation(item3)"></i>
                      </a> -->
                    </div>
                    <div class="schedule">
                      <div class="schedule-bar">
                        <div class="sub-schedule" :style="`width:${percentage(item3)};color:#000`">{{percentage(item3)}}</div>
                      </div>
                      <a>
                        <i class="el-icon-edit-outline" style="color:#46aeff" @click="clickProgress(item3)"></i>
                      </a>
                    </div>
                    <!-- <div class="status">{{item3.state==0?'正常开始':item3.state==1?'未开始':item3.state==2?'延期未开始':item3.state==3?'延期开始':item3.state==4?'延期完成':'正常完成'}}</div> -->
                    <div class="status" style="color:#3ada76" v-if="item3.state == 0">正常开始</div>
                    <div class="status" style="color:#c0bfbf" v-else-if="item3.state == 1">未开始</div>
                    <div class="status" style="color:#ff7a81" v-else-if="item3.state == 2">延期未开始</div>
                    <div class="status" style="color:#feb37f" v-else-if="item3.state == 3">延期开始</div>
                    <div class="status" style="color:#ff7a81" v-else-if="item3.state == 4">延期完成</div>
                    <div class="status" style="color:#3ada76" v-else>正常完成</div>


                    <div class="rank">{{item3.controlRank==1?'一级':item3.controlRank==2?'二级':'三级'}}</div>
                    <div class="plan-time">{{ getPlanDays(item3) }}天</div>
                    <div class="practical-time" v-if="item3.end">{{ getEndDays(item3) }}天</div>
                    <div class="practical-time" v-else>-</div>
                    <div class="plan-start">{{item3.predictStart.split(' ')[0]}}</div>
                    <div class="plan-end">{{item3.predictEnd.split(' ')[0]}}</div>
                    <div class="practical-start" v-if="!item3.start">-</div>
                    <div class="practical-start" v-else>{{item3.start.split(' ')[0]}}</div>
                    <div class="practical-end" v-if="!item3.end">-</div>
                    <div class="practical-end" v-else>{{item3.end.split(' ')[0]}}</div>
                    <div class="operation">
                      <el-dropdown @command="nodeOperation">
                        <a class="el-dropdown-link">
                          <i class="el-icon-setting"></i>
                        </a>
                        <el-dropdown-menu slot="dropdown">
                          <!-- <el-dropdown-item :command="`sameLevel:${item3.id}`">插入同级节点</el-dropdown-item> -->
                          <!-- <el-dropdown-item :command="`subordinate:${item3.id}`">插入下级节点</el-dropdown-item> -->
                          <el-dropdown-item :command="item3">编辑</el-dropdown-item>
                          <el-dropdown-item :command="`delete:${item2.id}`">删除</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                </li>
                <!-- <li>
                  <div class="number">2</div>
                  <div class="node" style="color:#c0bfbf">&#12288;&nbsp;开工准备</div>
                  <div class="schedule">
                    <div class="schedule-bar">
                      <div class="sub-schedule" style="width:100%">100%</div>
                    </div>
                  </div>
                  <div class="status" style="color:#3ada76">正常完成</div>
                  <div class="rank">一级</div>
                  <div class="plan-time">365天</div>
                  <div class="practical-time">-</div>
                  <div class="plan-start">2018-01-01</div>
                  <div class="plan-end">2018-01-25</div>
                  <div class="practical-start">2018-01-01</div>
                  <div class="practical-end">-</div>
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
                <li>
                  <div class="number">3</div>
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
                  <div class="status" style="color:#feb37f">超期开始</div>
                  <div class="rank">三级</div>
                  <div class="plan-time">24天</div>
                  <div class="practical-time">-</div>
                  <div class="plan-start">2018-01-01</div>
                  <div class="plan-end">2018-01-25</div>
                  <div class="practical-start">2018-01-01</div>
                  <div class="practical-end">-</div>
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
                <li>
                  <a class="relevance"></a>
                  <div class="number">4</div>
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
                  <div class="status" style="color:#ff7a81">已超期</div>
                  <div class="rank">三级</div>
                  <div class="plan-time">24天</div>
                  <div class="practical-time">-</div>
                  <div class="plan-start">2018-01-01</div>
                  <div class="plan-end">2018-01-25</div>
                  <div class="practical-start">2018-01-01</div>
                  <div class="practical-end">-</div>
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
                <li>
                  <a class="relevance"></a>
                  <div class="number">5</div>
                  <div class="node">&#12288;&nbsp;1A、1B电梯工程</div>
                  <div class="schedule">
                    <div class="schedule-bar">
                      <div class="sub-schedule" style="width:100%">100%</div>
                    </div>
                  </div>
                  <div class="status" style="color:#ff7a81">超期完成</div>
                  <div class="rank">三级</div>
                  <div class="plan-time">24天</div>
                  <div class="practical-time">-</div>
                  <div class="plan-start">2018-01-01</div>
                  <div class="plan-end">2018-01-25</div>
                  <div class="practical-start">2018-01-01</div>
                  <div class="practical-end">-</div>
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
                </li> -->
              </ul>
            </div>
        </div>
      </div>
      <!-- 新增进度计划 -->
      <div class="dialog-box" v-show="createShow" style="width:6.5rem">
        <div class="title">
          生成计划节点
          <a class="close" @click="createShow=false">
            <i class="el-icon-close"></i>
          </a>
        </div>
        <div class="form">
          <ul>
            <li>
              <span>
                计划名称
                <div class="required">*</div>
              </span>
              <input type="text" v-model="name" />
            </li>
            <li>
              <span>
                计划时间
                <div class="required">*</div>
              </span>
              <el-date-picker
                v-model="dateValue"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                @change="getTime"
              ></el-date-picker>
            </li>
          </ul>
        </div>
        <div class="confirm">
          <a class="button" @click="addProgressPlan()">确定</a>
        </div>
      </div>
      <!-- 导入节点 -->
      <div class="dialog-box" v-show="nodeShow">
        <div class="title">
          导入节点
          <a class="close" @click="nodeShow=false;">
            <i class="el-icon-close"></i>
          </a>
        </div>
        <div class="table">
          <div class="table-title">
            从总控计划导入
          </div>
          <div class="table-box">
            <el-table
              :data="nodeList"
              ref="nodeTable"
              id="nodeTable"
              border
              highlight-current-row
              @selection-change="selectionChange"
              @row-click="rowClick"
            >
              <el-table-column type="selection" width="40" :selectable="checkSelectable"></el-table-column>
              <el-table-column type="index" label="序号" width="60" :index="indexMethod"></el-table-column>
              <el-table-column prop="name" label="节点" width="700"></el-table-column>
              <!-- <el-table-column prop="deadline" label="计划工期"></el-table-column> -->
              <el-table-column label="负责人">
                <template slot-scope="scope">
                  {{ getName(scope.row.principal) }}
                </template>
              </el-table-column>
              <!-- <el-table-column prop="parentId" label="父节点"></el-table-column> -->
              <el-table-column label="计划所占进度">
                <template slot-scope="scope">
                  <el-input placeholder="节点占进度的百分比" :disabled="disableInput(scope.row)" v-model="scope.row.nodeProgressRatio" type="number" name="input" @keyup.enter.native="inputBlur(scope.row)" @focus="inoutFocus(scope.row)"></el-input>
                  <!-- <input type="number" v-model="scope.row.nodeProgressRatio"  @blur="inputBlur(scope.row)" @focus="inoutFocus(scope.row)"> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- <div class="paging-box"> -->
            <!-- @current-change="handleCurrentChange2" -->
            <!-- <el-pagination
              :current-page="pageNum"
              layout="total, prev, pager, next, jumper"
              :total="pageTotal">
            </el-pagination>
          </div> -->
        </div>
        <!-- <div class="form">
          <ul>
            <li>
              <span>
                节点名称
                <div class="required">*</div>
              </span>
              <el-select v-model="nodeId" placeholder="请选择节点名称">
                <el-option
                  v-for="item in nodeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </li>
            <li>
              <span>
                节点占进度百分比
                <div class="required">*</div>
              </span>
              <input type="number" v-model="progressNodeRatio" />
            </li>
            <li>
              <span>
                进度占节点百分比
                <div class="required">*</div>
              </span>
              <input type="number" v-model="nodeProgressRatio" />
            </li>
          </ul>
        </div> -->
        <div class="confirm">
          <a class="button" @click="submitNode()">确定</a>
        </div>
      </div>
      <!-- 导入计划 -->
      <div class="dialog-box" v-show="planShow" style="top:.2rem;width:14.08rem">
        <div class="title">
          导入计划
          <a class="close" @click="planShow=false">
            <i class="el-icon-close"></i>
          </a>
        </div>
        <div class="table">
          <div class="table-title">
            2019年12月计划（2019-12-01~2019-12-30）
            <a class="click">
              <i class="icon"></i>
              点击导入
            </a>
          </div>
          <div class="table-box">
            <el-table :data="tableData2" stripe border>
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column type="index" label="序号" width="60" :index="indexMethod2"></el-table-column>
              <el-table-column prop="name" label="名称" width="500"></el-table-column>
              <el-table-column prop="change" label="进度变化"></el-table-column>
              <el-table-column prop="uploading" label="上传人"></el-table-column>
              <el-table-column prop="date" label="上传日期"></el-table-column>
              <el-table-column label="操作" width="200">
                <template>
                  <a style="color:#0090ff">下载</a>
                  <a style="margin-left:.2rem;color:#0090ff">查看备注</a>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="paging-box">
            <!-- @current-change="handleCurrentChange2" -->
            <el-pagination
              :current-page="pageNum2"
              layout="total, prev, pager, next, jumper"
              :total="pageTotal2"
            ></el-pagination>
          </div>
        </div>
        <div class="confirm">
          <a class="button">确定</a>
        </div>
      </div>
      <!-- 操作编辑 -->
      <div class="dialog-box1" v-show="editShow">
        <div class="title">
          编辑计划节点
          <a class="close" @click="editShow=false;this.editObject.principal = '';
            this.editObject.parentId = ''">
            <i class="el-icon-close"></i>
          </a>
        </div>
        <div class="form2">
          <ul>
            <li>
              <div>
                <span>
                  节点名称
                  <div class="required">*</div>
                </span>
                <input type="text" v-model="editObject.name" />
              </div>
              <div>
                <span>父级节点</span>
                <!-- <input type="text" v-model="editObject.parentId"/> -->
                <el-select v-model="editObject.parentId" placeholder="请选择父级节点" clearable>
                  <el-option
                    v-for="item in nodeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
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
                  v-model="editObject.predictStart"
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
                  v-model="editObject.predictEnd"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </div>
            </li>
            <li>
              <div>
                <span>负责人</span>
                <!-- <input type="text" v-model="editObject.principal"/> -->
                <el-select v-model="editObject.principal" placeholder="请选择负责人" clearable>
                  <el-option
                    v-for="item in people"
                    :key="item.id"
                    :label="item.empName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <div>
                <span>
                  管控级别
                  <div class="required">*</div>
                </span>
                <el-select v-model="editObject.controlRank" placeholder="请选择">
                  <el-option
                    v-for="item in rankOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </li>
          </ul>
        </div>
        <div class="confirm">
          <a class="button" @click="editClick">确定</a>
        </div>
      </div>
      <!-- 修改进度 -->
      <div class="dialog-box3" v-show="editNode">
        <div class="title">
          编辑节点进度
          <a class="close" @click="editNode=false;notStart=false">
            <i class="el-icon-close"></i>
          </a>
        </div>
        <div class="form">
          <div class="flex">
            <div class="name">节点名称:</div>
            <el-input v-model="nodeName" disabled></el-input>
          </div>
          <div class="flex">
            <div class="progress">进度:</div>
            <el-input v-model="progress" type="number" :disabled="notStart"></el-input>
          </div>
        </div>
        <div class="confirm">
          <a class="button" @click="submitProgress">确定</a>
        </div>
      </div>
      <!-- 遮罩层 -->
      <div class="shade-box" v-show="createShow || nodeShow || planShow || editShow || editNode"></div>
    </div>
  </div>
</template>

<style lang="less">
#systemSchedule_plan {
  width: 100%;
  .content {
    border-radius: 0.04rem;
    background-color: #fff;
    box-shadow: 0 0 0.5rem -0.3rem #666;
    min-height: 9rem;
    box-sizing: border-box;
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
      padding: 0 0.2rem;
      > .main-list-item {
        // height: 0.62rem;
        // border: .01rem solid #f3f3f3;
        // background-color: #f8f9fb;
        .main-list-top {
          height: 0.62rem;
          line-height: 0.62rem;
          border: 0.01rem solid #f3f3f3;
          background-color: #f8f9fb;
          display: flex;
          justify-content: space-between;
          padding-left: 0.32rem;
          .name {
            width: 7.3rem;
            color: #4a4a4a;
            font-size: 0.16rem;
          }
          .progress-bar {
            height: 0.6rem;
            width: 3.9rem;
            .schedule-bg {
              width: 2.5rem;
              height: 0.15rem;
              display: inline-block;
              background-color: #e9f2fe;
              vertical-align: middle;
              .sub-schedule {
                height: 100%;
                background-color: #0090ff;
              }
            }
            .text-box {
              height: 0.6rem;
              color: #4a4a4a;
              font-size: 0.16rem;
              line-height: 0.6rem;
              display: inline-block;
              margin-left: 0.14rem;
            }
          }
          .state {
            width: 3.3rem;
            color: #4a4a4a;
            font-size: 0.18rem;
          }
          .el-dropdown {
            height: 0.62rem;
            margin-right: 0.7rem;
            .el-dropdown-link {
              width: 0.2rem;
              height: 0.62rem;
              // line-height: .48rem;
              display: inline-block;
              background-image: url("../../../../static/images/systemSchedule-icon.png");
              background-position: center center;
              background-repeat: no-repeat;
              background-size: contain;
            }
          }
          .itemClick {
            font-size: 0.25rem;
            margin-right: 0.15rem;
            margin-top:0.2rem;
            // transform: rotate(90deg)
          }
        }
        .el-collapse-item__content {
          padding: 0;
        }
      }
      .main-list-button {
        li {
          height: 0.32rem;
          width: 100%;
          padding-left: 0.52rem;
          border: 0.01rem solid #f3f3f3;
          border-bottom: none;
          display: flex;
          justify-content: space-between;
          position: relative;
          // > div {
          //   color: #4a4a4a;
          //   font-size: 0.12rem;
          //   line-height: 0.3rem;
          // }
          > div {
            height: 0.32rem;
            width: 100%;
            // padding-left: 0.52rem;
            display: flex;
            justify-content: space-between;
            position: relative;
            font-size: 0.12rem;
            // .schedule {
            //   width: 0.9rem;
            //   .schedule-bar {
            //     width: 0.6rem;
            //     height: 0.12rem;
            //     background-color: #e9f2fe;
            //     transform: translateY(0.12rem);
            //     .sub-schedule {
            //       background-color: #0090ff;
            //       // width: 50%;
            //       color: #fff;
            //       text-align: center;
            //       height: 0.12rem;
            //       line-height: 0.12rem;
            //     }
            //   }
            // }
            // .number {
            //   width: 0.5rem;
            // }
            // .node {
            //   flex: 1;
            // }
            // .status,
            // .rank,
            // .plan-time,
            // .practical-time {
            //   width: 0.7rem;
            // }
            // .plan-start,
            // .plan-end,
            // .practical-start,
            // .practical-end {
            //   width: 0.8rem;
            // }
            // .operation {
            //   width: 0.3rem;
            //   a {
            //     font-size: 0.2rem;
            //     text-align: center;
            //   }
            // }
          }
          .schedule {
            width: 0.9rem;
            position: relative;
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
            .el-icon-edit-outline {
              position: absolute;
              right:0.1rem;
            }
          }
          .number {
            width: 0.5rem;
          }
          .node {
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
        .first {
          > div {
            font-weight: bolder;
          }
        }
      }
      .block {
        display: block;
      }
      .none {
        display: none;
      }
    }
    .dialog-box {
      left: 50%;
      top: .3rem;
      z-index: 200;
      width: 14.1rem;
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
      .form {
        ul {
          padding-bottom: 0.3rem;
          li {
            display: flex;
            height: 0.71rem;
            padding-top: 0.3rem;
            > span {
              width: 1.85rem;
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
            }
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button { -webkit-appearance: none; }
            input[type="number"]{ -moz-appearance: textfield; }
            .el-date-editor {
              width: 3.66rem;
              height: 0.41rem;
              overflow: hidden;
              input {
                padding-left: 0;
                border: 0;
              }
              span {
                width: auto;
              }
            }
          }
        }
      }
      .table {
        .table-title {
          height: 0.57rem;
          color: #4a4a4a;
          font-size: 0.18rem;
          text-align: center;
          line-height: 0.57rem;
          font-weight: bolder;
          position: relative;
          > a {
            top: 0.16rem;
            right: 0.4rem;
            height: 0.3rem;
            color: #0090ff;
            font-size: 0.14rem;
            transition: all 0.5s;
            line-height: 0.28rem;
            border-radius: 0.02rem;
            padding-right: 0.09rem;
            border: 0.01rem solid #0090ff;
            position: absolute;
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
        }
        > .table-box {
          width: 100%;
          min-height: 3.85rem;
          max-height: 6rem;
          padding-left: 0.3rem;
          padding-right: 0.3rem;
          overflow-y: scroll;
          .el-table {
            width: 16.28rem;
            // width: 100%;
            th {
              padding: 0;
              div {
                color: #4a4a4a;
                height: 0.35rem;
                line-height: 0.35rem;
                background-color: #c5e8ff;
              }
            }
            td {
              padding: 0;
              div {
                height: 0.35rem;
                color: #646464;
                line-height: 0.35rem;
              }
            }
            .table-button {
              color: #0090ff;
              padding: 0 0.08rem;
              text-decoration: underline;
            }
            .el-input__inner {
              height: 0.25rem;
              width: 2.5rem;
            }
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
              -webkit-appearance: none;
            }
            input[type="number"] {
              -moz-appearance: textfield;
            }
          }
          .green-color {
            color: #58de87 !important;
          }
          .red-color {
            color: #fe898f !important;
          }
          .el-table__body tr.current-row>td {
            background-color: #F0F9EB !important;
            /* color: #f19944; */  /* 设置文字颜色，可以选择不设置 */
          }
        }
        > .paging-box {
          width: 100%;
          height: 0.52rem;
          margin-top: 0.2rem;
          padding-right: 0.2rem;
          padding-bottom: 0.2rem;
          .el-pagination {
            float: right;
          }
        }
        .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          background-color: #409EFF!important;
          border-color: #409EFF!important
        }
        .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
          border-color: #fff;
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
    .dialog-box1 {
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
      .form2 {
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
    .dialog-box3 {
      left: 50%;
      top: 0.22rem;
      z-index: 200;
      width: 6rem;
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
      .form {
        padding: 0.3rem 0.43rem;
        .flex {
          line-height: 0.41rem;
          input {
            border:1px solid #B1B1B1;
            border-radius: 0.02rem;
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
              appearance: none;
            }
            &[type="number"] {
              appearance: textfield;
            }
          }
          li {
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
  }
}
</style>

<script>
export default {
  data() {
    return {
      stateOptions: [
        {
          value: 1,
          label: "提前"
        },
        {
          value: 2,
          label: "正常"
        },
        {
          value: 3,
          label: "延期"
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
      createShow: false, // 新增对话框显示状态
      nodeShow: false, // 导入节点对话框状态
      planShow: false, // 导入计划对话框状态
      tableData: [
        {
          node: "深圳科伦特产业园中心2019年施工及验收计划", // 节点
          deadline: "180天", // 计划工期
          startTime: "2019-01-01", // 计划开始
          endTime: "2019-06-01", // 计划结束
          schedule: "100%" // 计划所占进度
        },
        {
          node: "深圳科伦特产业园中心2019年施工及验收计划",
          deadline: "180天",
          startTime: "2019-01-01",
          endTime: "2019-06-01",
          schedule: "100%"
        }
      ], // 导入节点列表数据
      pageSize: 10, // 导入节点每页条数
      pageNum: 1, // 导入节点当前页
      pageTotal: 2, // 导入节点总条数
      tableData2: [
        {
          name: "2019年12月计划（2019-12-01~2019-12-30）", // 名称
          change: "10%~90%", // 进度变化
          uploading: "某某某", // 上传人
          date: "2019-06-01" // 上传日期
        }
      ], // 导入节点列表数据
      pageSize2: 10, // 导入计划每页条数
      pageNum2: 1, // 导入计划当前页
      pageTotal2: 2, // 导入计划总条数

      creatorId: "", // 创建人id
      nodeList: [], // 节点列表
      planList: [], // 计划列表
      dateValue: "", // 日期范围
      name: "", // 计划名称
      predictStart: "", // 计划开始时间
      predictEnd: "", // 计划结束时间
      nodeId: "", // 节点id
      progressNodeRatio: "", // 节点占进度百分比
      nodeProgressRatio: "", // 进度占节点百分比
      progressId: "", // 当前选中计划id
      itemClick: 9999999, // 向下的箭头
      subSchedule: { // 进度条文字颜色
        width: 0,
        color: 'black'
      },
      editShow: false, // 编辑栏弹窗
      editObject:{}, // 节点列表的对象
      people:[], // 人员列表
      editNode: false, // 编辑节点进度
      nodeName: '', // 节点名称
      progress: '', // 进度
      submitProgressNodeId: '', // 修改节点进度时使用的节点id
      notStart: false, // 节点未开始，用来控制进度的选择
      submitNodeList: [], // 添加到计划节点列表
      newSubmitNodeList: [], // 添加新计划节点列表
    };
  },
  created() {
    this.getCreatorId();
    this.selectZhNodeList();
    this.selectZhProgressPlanList();
    this.getPersonnelList();
  },
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

    // 操作下拉框点击事件
    handleCommand(command) {
      // console.log(command)
      if (typeof command == 'object') {
        this.downloadPlan(command)
      } else {
        if (command.split(":")[0] == "delete") {
          this.remoProgressPlan(command.split(":")[1]);
        }
        if (command.split(":")[0] == "importNode") {
          this.progressId = command.split(":")[1];
          this.nodeId = '';
          this.progressNodeRatio = '';
          this.nodeProgressRatio = '';
          this.nodeShow = true;
          // console.log(this.progressId)
        }
      }
    },

    // 导入节点序号
    indexMethod(index) {
      return (this.pageNum - 1) * this.pageSize + index + 1;
    },

    // 导入计划序号
    indexMethod2(index) {
      return (this.pageNum - 1) * this.pageSize + index + 1;
    },

    // 获取创建人id
    getCreatorId() {
      // debugger
      this.creatorId = sessionStorage.getItem("userId");
      this.projectId = sessionStorage.getItem("pid");
    },

    // 查询节点列表
    selectZhNodeList() {
      this.$axios
        .post(
          `/api/Node/selectZhNodeList?creatorId=${this.creatorId}`
          // '/api/Node/selectZhNodeList', {
          //   creatorId: this.creatorId
          // }
        )
        .then(res => {
          // console.log(res.data)
          this.nodeList = res.data.data;
          for (let i = 0; i < this.nodeList.length; i++) {
            this.nodeList[i].subSchedule = {}
          }
          // console.log(this.nodeList)
        });
    },

    // 获取进度计划列表
    selectZhProgressPlanList() {
      this.$axios
        .post(
          `/api/Node/selectZhProgressPlanList?creatorId=${this.creatorId}`
          // '/api/Node/selectZhProgressPlanList', {
          //   creatorId: this.creatorId,
          //   predictStart: this.startTime,
          //   predictEnd: this.endTime
          // }
        )
        .then(res => {
          // console.log(res.data)
          this.planList = res.data.data;
          this.selectZhProgressNodeList();
        });
    },

    // 搜索进度计划列表
    searchSelectZhProgressPlanList() {
      this.$axios
        .post(
          `/api/Node/selectZhProgressPlanList?creatorId=${this.creatorId}&predictStart=${this.startTime}&predictEnd=${this.endTime}`
          // '/api/Node/selectZhProgressPlanList', {
          //   creatorId: this.creatorId,
          //   predictStart: this.startTime,
          //   predictEnd: this.endTime
          // }
        )
        .then(res => {
          // console.log(res.data)
          this.planList = res.data.data;
          this.selectZhProgressNodeList();
        });
    },

    // 查询计划节点关联列表
    selectZhProgressNodeList() {
      for (let i = 0; i < this.planList.length; i++) {
        // console.log(this.planList[i].id)
        this.$axios
          .post(
            `/api/Node/selectZhProgressNodeList?progressId=${this.planList[i].id}`
            // '/api/Node/selectZhProgressNodeList', {
            //   progressId: this.planList[i].id
            // }
          )
          .then(res => {
            // console.log(res.data.data)
            // this.planList[i].nodeList = res.data.data;

            this.$set(this.planList[i], 'nodeList', res.data.data)


            let temp = 0;
            for (let j = 0; j < res.data.data.length; j++) {
              // console.log(res.data.data[j].nodeId)
              for (let z = 0; z < this.nodeList.length; z++) {
                // console.log(this.nodeList[z].id)
                if (res.data.data[j].nodeId == this.nodeList[z].id) {
                  if (this.nodeList[z].progress == 100) {
                    temp += 1
                  }
                }
                // console.log(this.nodeList[z].progress)
              }
            }
            this.planList[i].done = temp;
          });
      }
    },

    // 添加进度计划
    addProgressPlan() {
      if (this.name == '') {
        this.$message({
          message: "请填写计划名称",
          type: "warning"
        });
      } else if (this.dateValue == '') {
        this.$message({
          message: "请填写计划时间",
          type: "warning"
        });
      } else {
        this.$axios
          .post(
            `/api/Node/addProgressPlan?name=${this.name}&creatorId=${this.creatorId}&predictStart=${this.predictStart}&predictEnd=${this.predictEnd}`
            // '/api/Node/addProgressPlan', {
            //   "name": this.name,
            //   "creatorId": this.creatorId,
            //   "predictStart": this.predictStart + ' 00:00:00',
            //   "predictEnd": this.predictEnd + ' 00:00:00'
            // }
          )
          .then(res => {
            // console.log(res.data)
            if (res.data.code == 0) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.createShow = false;
              this.dateValue = '';
              this.selectZhProgressPlanList();
            } else {
              this.$message({
                message: "添加失败",
                type: "warning"
              });
            }
          });
      }
    },

    // 删除进度计划
    remoProgressPlan(id) {
      this.$axios
        .post(
          `/api/Node/remoProgressPlan?id=${id}`
          // '/api/Node/remoProgressPlan', {
          //   id: id
          // }
        )
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.selectZhProgressPlanList();
          } else {
            this.$message({
              message: "删除失败",
              type: "warning"
            });
          }
        });
    },

    // 进度计划导入关联节点
    addProgressNode() {
      if (this.nodeId == '') {
        this.$message({
          message: '请选择计划名称',
          type: 'warning'
        })
      } else if (this.progressNodeRatio == '') {
        this.$message({
          message: '请填写节点占进度百分比',
          type: 'warning'
        })
      } else if (this.progressNodeRatio > 100) {
        this.$message({
          message: '百分比需要小于100',
          type: 'warning'
        })
        this.progressNodeRatio = ''
      } else if (this.nodeProgressRatio == '') {
        this.$message({
          message: '请填写进度占节点百分比',
          type: 'warning'
        })
      } else if (this.nodeProgressRatio > 100) {
        this.$message({
          message: '百分比需要小于100',
          type: 'warning'
        })
        this.nodeProgressRatio = ''
      }  else {
        this.$axios
          .post(
            `/api/Node/addProgressNode?progressId=${this.progressId}&nodeId=${this.nodeId}&progressNodeRatio=${this.progressNodeRatio}&nodeProgressRatio=${this.nodeProgressRatio}`
            // '/api/Node/addProgressNode', {
            //   progressId: this.progressId,
            //   nodeId: this.nodeId,
            //   progressNodeRatio: this.progressNodeRatio,
            //   nodeProgressRatio: this.nodeProgressRatio
            // }
          )
          .then(res => {
            if (res.data.code == 0) {
              this.$message({
                message: "导入成功",
                type: "success"
              });
              this.nodeShow = false;
              this.itemClick = 9999999;
              this.selectZhProgressNodeList();
            } else {
              this.$message({
                message: "导入失败",
                type: "warning"
              });
            }
          });
      }
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

    // 修改css百分比 和完成数
    percentage(ratio) {
      if (ratio.progress == null) {
        return 0 + '%';
      } else {
        // this.subSchedule.color = '#fff';
        // this.subSchedule.width = ratio + '%';
        return ratio.progress + '%';
      }
    },

    // 节点的操作
    nodeOperation(command) {
      if (typeof command == 'object') {
        // console.log('编辑按钮被点击啦！')
        // console.log(command);
        this.editObject = command;
        this.editObject.principal = this.editObject.principal.toString()
        // console.log(typeof this.editObject.principal)
        // console.log('负责人' + this.editObject.principal)
        // console.log('父ID：' + this.editObject.parentId)
        // if (this.editObject.parentId == 0) {
        //   this.editObject.parentId = ''
        // }
        this.editShow = true;
      } else {
        if (command.split(':')[0] == 'delete') {
          this.$axios
          .post(
            `/api/Node/removeProgressNode?id=${command.split(":")[1]}`
            // '/api/Node/removeProgressNode', {
            //   id: command.split(":")[1]
            // }
          )
          .then(res => {
            // console.log(res.data)
            if (res.data.code == 0) {
              this.selectZhProgressPlanList();
              this.itemClick = 9999999;
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.selectZhNodeList();
            } else {
              // console.log(res.data)
              this.$message({
                message: "删除失败",
                type: "warning"
              });
            }
          });
        }
        if (command.split(':')[0] == 'sameLevel') {
          console.log('插入同级按钮被点击啦！')
        }
        if (command.split(':')[0] == 'subordinate') {
          console.log('插入下级按钮被点击啦！')
        }
      }
    },

    // 编辑提交按钮
    editClick() {
      this.$axios
        .post(
          `/api/Node/editNode?creatorId=${this.creatorId}&name=${this.editObject.name}&predictStart=${this.editObject.predictStart}&predictEnd=${this.editObject.predictEnd}&controlRank=${this.editObject.controlRank}&id=${this.editObject.id}&principals=${this.editObject.principal}&parentIds=${this.editObject.parentId}`
          // '/api/Node/editNode', {
          //   creatorId: this.creatorId,
          //   name: this.editObject.name,
          //   predictStart: this.editObject.predictStart,
          //   predictEnd: this.editObject.predictEnd,
          //   controlRank: this.editObject.controlRank,
          //   id: this.editObject.id,
          //   principal: this.editObject.principal,
          //   projectId: this.editObject.parentId
          // }
        )
        .then(res => {
          // console.log(res.data)
          if (res.data.code == 0) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.editShow = false;
            this.editObject.principal = '';
            this.editObject.parentId = ''
            this.selectZhNodeList();
          } else {
            // console.log(res.data)
            this.$message({
              message: "修改失败",
              type: "warning"
            });
          }
        });
    },

    // 搜索
    search() {
      // console.log(this.dateValue);
      this.dateValue?this.startTime = this.dateValue[0]:this.startTime='';
      this.dateValue?this.endTime = this.dateValue[1]:this.endTime='';
      this.searchSelectZhProgressPlanList()
      this.$message({
          message: '搜索成功',
          type: 'success'
        });
    },

    // 获取人员列表
    getPersonnelList() {
      this.$axios
        .post(
          `/api/pc/projectWorkersApi/list?projectId=${this.projectId}&pageNum=1&pageSize=1000`
          // '/api/pc/projectWorkersApi/list', {
          //   projectId: this.projectId,
          //   pageNum: 1,
          //   pageSize: 1000
          // }
        )
        .then(res => {
          this.people = res.data.data.rows;
          // console.log(this.people);
        });
    },

    // 导出选中excel
    downloadPlan(command) {
      // this.$axios
      //   .get(
      //     `/api/Node/exportZhProgressPlan?progressId=${command.id}`
      //     // '/api/Node/exportZhProgressPlan', {
      //     //   progressId: command.id,
      //     //   title: command.name,
      //     //   outS: 'C:\Users\Administrator\Desktop'
      //     // }
      //   )
      //   .then(res => {
      //     if (res.data.code == 0) {
      //       // console.log(res.data)
      //       this.$message({
      //         message: '开始下载',
      //         type: 'success'
      //       })
      //     }
      //   })
      location.href=`http://47.106.71.3:8080/api/Node/exportZhProgressPlan?progressId=${command.id}`
    },

    // 获取总进度条的百分比
    getPercentage(id) {
      let temp = 0
      for (let i = 0; i < id.length; i++) {
        // console.log(id[i].progressNodeRatio)
        for (let j = 0; j < this.nodeList.length; j++) {
          if (this.nodeList[j].id == id[i].nodeId) {
            temp += (this.nodeList[j].progress * id[i].progressNodeRatio)/100
          }
        }
      }
      return temp.toFixed(2)
    },

    // 计划工期
    getPlanDays(item) {
      // console.log(item.predictStart)
      // console.log(item.predictEnd)
      let data1 = new Date(item.predictStart.split(' ')[0].split('-').join('/'));
      let data2 = new Date(item.predictEnd.split(' ')[0].split('-').join('/'));
      let time = (data2.getTime() - data1.getTime())/(1000*60*60*24);
      // console.log(time)
      return time
    },

    // 计划实际工期
    getEndDays(item) {
      let data1 = new Date(item.start.split(' ')[0].split('-').join('/'));
      let data2 = new Date(item.end.split(' ')[0].split('-').join('/'));
      let time = (data2.getTime() - data1.getTime())/(1000*60*60*24);
      // console.log(time)
      return time
    },

    // 点击修改节点进度按钮
    clickProgress(item) {
      this.editNode = true;
      // console.log(item);
      this.nodeName = item.name;
      this.progress = item.progress;
      this.submitProgressNodeId = item.id
      // console.log(item.state)
      if (item.state == 1  || item.state == 2) {
        this.notStart = true
      }
    },

    // 提交修改后的节点进度
    submitProgress() {
      if (this.progress == null) {
        this.$message({
          message: '请输入进度',
          type: 'warning'
        })
      } else if (this.progress > 100) {
        this.$message({
          message: '进度需小于100%',
          type: 'warning'
        })
      } else {
        this.$axios
          .post(`/api/Node/editNode?id=${this.submitProgressNodeId}&progress=${this.progress}`)
          .then(res => {
            // console.log(res.data)
            if (res.data.code == 0) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.editNode = false;
              this.selectZhNodeList()
            } else {
              this.$message({
                message: '修改失败',
                type: 'warning'
              })
            }
          })
      }
      this.notStart = false
    },

    // 导出所有计划
    exportZhNode() {
      this.$axios
        .post(`/api/Node/exportZhNode?title=导出所有计划节点&outS=C:\Users\Administrator\Desktop>`)
        .then(res => {
          console.log(res.data)
        })
    },

    // 总控导入节点的负责人，人名获取
    getName(id) {
      let temp = '无'
      for (let i = 0; i < this.people.length; i++) {
        if (this.people[i].id == id) {
          temp = this.people[i].empName
        }
      }
      return temp
    },

    // 导入节点时，根据是否有子节点来判断select是否可选
    checkSelectable(row, index) {
      // let temp = null
      // for (let i = 0; i < this.nodeList.length; i++) {
      //   if (row.id == this.nodeList[i].parentId) {
      //     temp = false
      //     break
      //   } else {
      //     temp = true
      //   }
      // }
      // return temp
      return false
    },

    // 导入节点的函数
    selectionChange(val) {
      // console.log(val)
      let temp = []
      val.forEach(item => {
        // temp.push({
        //   id: item.id,
        //   principal: item.principal,
        //   nodeProgressRatio: item.nodeProgressRatio
        // })
        temp.push(item.id)
      });
      this.submitNodeList = temp
      console.log(temp)
    },

    // 导入节点时离开input标签
    inputBlur(row) {
      if (row.nodeProgressRatio == null || row.nodeProgressRatio == 0) {
        row.nodeProgressRatio = ''
      } else if(row.nodeProgressRatio > 100) {
        this.$message({
          message: '计划占进度比不可超过100%',
          type: 'warning'
        })
      } else {
        // this.$refs.nodeTable.toggleRowSelection(row)
        var input = document.getElementById('nodeTable').getElementsByTagName('input')
        for (let i = 0; i < input.length; i++) {
          if (input[i].name == 'input') {
            input[i].blur()
          }
        }
      }
      // console.log(row.nodeProgressRatio)
    },

    // 导出节点时获得input标签焦点
    inoutFocus(row) {
      if (row.nodeProgressRatio == 0) {
        row.nodeProgressRatio = ''
      }
      // console.log('获得焦点')
    },

    // 导入节点的提交按钮
    submitNode() {
      // console.log(this.submitNodeList)
      let temp = true
      var temp2 = false
      for (let i = 0; i < this.submitNodeList.length; i++) {
        for (let j = 0; j < this.nodeList.length; j++) {
          if (this.nodeList[j].id == this.submitNodeList[i]) {
            this.newSubmitNodeList.push({
              id: this.nodeList[j].id,
              principal: this.nodeList[j].principal,
              nodeProgressRatio: this.nodeList[j].nodeProgressRatio
            })
          }
        }
      }
      // console.log(this.newSubmitNodeList)
      for (let i = 0; i < this.newSubmitNodeList.length; i++) {
        if (this.newSubmitNodeList[i].principal == null) {
          this.$message({
            message: '负责人为必填项',
            type: 'warning'
          })
          temp = false
        } else if (this.newSubmitNodeList[i].nodeProgressRatio == 0 || this.newSubmitNodeList[i].nodeProgressRatio == '') {
          this.$message({
            message: '请填写计划占进度百分比',
            type: 'warning'
          })
          temp = false
        } else if (this.newSubmitNodeList[i].nodeProgressRatio > 100) {
          this.$message({
            message: '计划占进度百分比不可大于100%',
            type: 'warning'
          })
          temp = false
        }
      }
      // console.log(temp)
      // console.log(this.progressId)
      if (temp) {
        for (let i = 0; i < this.newSubmitNodeList.length; i++) {
          // console.log(this.submitNodeList[i])
          this.$axios
            .post(`/api/Node/addProgressNode?progressId=${this.progressId}&nodeId=${this.newSubmitNodeList[i].id}&nodeProgressRatio=${this.newSubmitNodeList[i].nodeProgressRatio}`)
            .then(res => {
              if (res.data.code == 0) {
                temp2 = true
              } else {
                temp2 = false
              }
              // console.log(temp2)
            })
        }
      }
      // console.log(temp2)
      // if (temp2 == true) {
      //   this.$message({
      //     message: '添加成功',
      //     type: 'success'
      //   })
      // } else if(temp2 == false) {
      //   this.$message({
      //     message: '添加失败',
      //     type: 'warning'
      //   })
      // }
      setTimeout(() => {
        // console.log(temp2)
        if (temp2 == true) {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
      } else if(temp2 == false) {
        this.$message({
          message: '添加失败',
          type: 'warning'
        })
      }
      this.nodeShow = false
      this.$refs.nodeTable.clearSelection();
      this.nodeList = []
      this.submitNodeList = []
      this.newSubmitNodeList = []
      this.selectZhNodeList()
      this.selectZhProgressPlanList()
      // location.reload()
      }, 500);
    },

    //导入节点点击事件
    rowClick(row, event, el) {
      // console.log(el.target.nodeName)
      if (el.target.nodeName == 'DIV') {
        if (row.nodeProgressRatio == null || row.nodeProgressRatio == 0) {
        this.$message({
          message: '请先填写计划占进度比',
          type: 'warning'
        })
        } else {
          this.$refs.nodeTable.toggleRowSelection(row)
        }
      }
    },

    // 导入节点，有子节点的input不可选
    disableInput(row) {
      var temp = false
      for (let i = 0; i < this.nodeList.length; i++) {
        if (row.id == this.nodeList[i].parentId) {
          temp = true
        }
      }
      return temp
    }
  }
};
</script>