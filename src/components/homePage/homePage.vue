<template>
  <div class="homePage" id="homePage">
    <!-- 顶部通栏 -->
    <div class="top">
      <div class="nav-logo">
        <a class="logo-box"></a>
        <i class="line"></i>
      </div>
      <!-- <div class="company">深圳市市政总公司</div> -->
      <div class="company">&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;</div>
      <div class="nav">
        <ul>
          <li>
            <router-link to="/homePage" class="active">首页</router-link>
          </li>
          <!-- <li>
            <router-link to="/projectManagement">项目管理</router-link>
          </li> -->

          <li>
            <router-link to="/companyGuanLi">公司管理</router-link>
          </li>
          <li v-if="userType==1">
            <router-link to="/projectGuanLi">项目管理</router-link>
          </li>

          <!-- <li>
            <router-link to="/gongsiManagement">公司管理</router-link>
          </li>
          <li>
            <router-link to="/projectShezhi">项目管理</router-link>
          </li> -->
        </ul>
      </div>
      <div class="user">
        <el-dropdown @command="handleCommand">
          <a class="el-dropdown-link">
            用户名
            <i class="el-icon-arrow-down el-icon--right"></i>
          </a>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item command="login">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div> 
    <!-- 内容 -->
    <div class="main">
      <!-- 地图 -->
      <div class="amap-page-container">
        <el-amap
          ref="map"
          vid="amapDemo"
          :amap-manager="amapManager"
          :center="center"
          :zoom="zoom"
          :plugin="plugin"
          :events="events"
          class="amap-demo"
        ></el-amap>
      </div>
      <!-- 搜索框 -->
      <div class="search-bar">
        <input type="text" placeholder="输入信息名称进行搜索">
        <a href="#">
          <i></i>
        </a>
      </div>
      <!-- 公司名称/地区 -->
      <div class="menu">
        <a class="company" @click="dropDownClck('company')">
          <span class="text">{{companyName}}</span>
          <i class="icon el-icon-arrow-down"></i>
        </a>
        <a class="district" @click="dropDownClck('district')">
          <span class="text">{{provinceActive}}</span>
          <i class="icon el-icon-arrow-down"></i>
        </a>
        <div class="company-box" v-show="companyShow">
          <div class="now">
            当前组织：{{companyName}}
          </div>
          <div class="search-box">
            <i class="el-icon-search"></i>
            <input type="text" placeholder="输入组织名称后回车搜索">
          </div>
          <div class="collapse-box">
            <el-collapse>
              <el-collapse-item v-for="item in companyList" :title="item.companyName" :name="item.id" :key="item.id">
                <el-collapse>
                  <el-collapse-item title="中建二局西南分公司" name="1-1">
                    <div>
                      <a>中建二局广州分公司</a>
                    </div>
                    <div>
                      <a>中建二局揭阳分公司</a>
                    </div>
                    <div>
                      <a>中建二局深圳分公司</a>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
        <div class="district-box" v-show="districtShow">
          <div class="now">
            当前区域：{{provinceActive}}
          </div>
          <ul>
            <li>
              <a :class="provinceActive=='全国'?'active':''" @click="provinceActive='全国';region=0;getProjectList()">全国</a>
            </li>
            <li v-for="item in provinceList" :key="item.id">
              <a :class="provinceActive==item.title?'active':''" @click="provinceActive=item.title;region=item.id;getProjectList()">{{item.title}}</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 侧拉框 -->
      <!-- <div class="side-nav" :class="sidNavClass">
        <a href="javascript:void(0);" @click="sideNavState"></a>
        <div class="title">
          总共
          <span>1</span>个智慧工地项目
        </div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <a>
                <div class="img">
                  <div class="subImg"></div>
                </div>
                <div class="datum">
                  <div class="title">深圳市市政总有限公司</div>
                  <p>深圳市 南山区</p>
                  <p>中建二局第三建筑工程有限公司</p>
                </div>
              </a>
            </template>
            <el-submenu index="1-1" style="pandding-left: 1rem;">
              <template slot="title" style="pandding-left: 1rem">
                <a>
                  <div class="img">
                    <div class="subImg"></div>
                  </div>
                  <div class="datum">
                    <div class="title">深圳市市政总隧道分公司</div>
                    <p>深圳市 南山区</p>
                    <p>中建二局第三建筑工程有限公司</p>
                  </div>
                </a>
              </template>
              <el-submenu index="1-1-1" style="pandding-left: 1rem;" class="project">
                <template slot="title" style="pandding-left: 1rem">
                  <router-link to="/home">
                    <div class="img">
                      <div class="subImg"></div>
                    </div>
                    <div class="datum">
                      <div class="title">试点项目</div>
                      <p>深圳市 南山区</p>
                      <p>中建二局第三建筑工程有限公司</p>
                    </div>
                    <div class="state yellow-color">待审核</div>
                  </router-link>
                </template>
              </el-submenu>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </div> -->
      <div class="side-nav" :class="sidNavClass">
        <a href="javascript:void(0);" @click="sideNavState"></a>
        <div class="title">
          总共
          <span>{{projectSum}}</span>个智慧工地项目
          <a>最新项目</a>
        </div>
        <div class="data">
          <ul>
            <li>
              在场工人：人
              <span>{{projectList.numW}}</span>
            </li>
            <li>
              参建单位：
              <span>{{projectList.numC}}</span>
              家
            </li>
            <li>
              今日上工：
              <span style="color:#3ada76;">{{projectList.numWing}}</span>
              人
              (<span style="color:#3ada76;">{{Math.floor((projectList.numWing/projectList.numW)*100)}}</span>%)
            </li>
            <li>
              投资金额：
              <span>{{projectList.totalMoney}}</span>
              万
            </li>
          </ul>
        </div>
        <ul class="main-list">
          <li v-for="(val,key) in projectList.map" :key="key">
            <a @click="projectClick(val.id)">
              <div class="img-box">
                <img>
              </div>
              <div class="text-box">
                <div class="title">
                  {{val.projectName}}
                  <span class="year">2019</span>
                </div>
                <div class="middle">
                  <span class="type">建设单位：</span>
                  <span>{{val.companyName}}</span>
                </div>
                <div class="middle">
                  <span class="type">开工日期：</span>
                  <span>{{val.startingTime.split(' ')[0]}}</span>
                </div>
                <div class="middle">
                  <span class="type">参建单位：</span>
                  <span><span style="color:#048fe8;">{{val.numProjectC}}</span>家</span>
                </div>
                <div class="bottom">
                  <div class="left-box">
                    <span class="type">在场工人：</span>
                    <span><span style="color:#3ada76;">{{val.numProjectWorking}}</span>人</span>
                  </div>
                  <div class="right-box">
                    <span class="type">今日上工：</span>
                    <span><span style="color:#048fe8;">{{val.numProjectC}}</span>人</span>
                  </div>
                </div>
              </div>
            </a>
          </li>
          <!-- <li>
            <div class="img-box">
              <img>
            </div>
            <div class="text-box">
              <div class="title">
                深圳科伦特几条大厦项目
                <span class="year">2019</span>
              </div>
              <div class="middle">
                <span class="type">建设单位：</span>
                <span>深圳市投资控股有限公司</span>
              </div>
              <div class="middle">
                <span class="type">开工日期：</span>
                <span>2018-12-12</span>
              </div>
              <div class="middle">
                <span class="type">参建单位：</span>
                <span><span style="color:#048fe8;">10</span>家</span>
              </div>
              <div class="bottom">
                <div class="left-box">
                  <span class="type">在场工人：</span>
                  <span><span style="color:#048fe8;">100</span>人</span>
                </div>
                <div class="right-box">
                  <span class="type">在场工人：</span>
                  <span><span style="color:#3ada76;">80</span>人</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="img-box">
              <img>
            </div>
            <div class="text-box">
              <div class="title">
                深圳科伦特几条大厦项目
                <span class="year">2019</span>
              </div>
              <div class="middle">
                <span class="type">建设单位：</span>
                <span>深圳市投资控股有限公司</span>
              </div>
              <div class="middle">
                <span class="type">开工日期：</span>
                <span>2018-12-12</span>
              </div>
              <div class="middle">
                <span class="type">参建单位：</span>
                <span><span style="color:#048fe8;">10</span>家</span>
              </div>
              <div class="bottom">
                <div class="left-box">
                  <span class="type">在场工人：</span>
                  <span><span style="color:#048fe8;">100</span>人</span>
                </div>
                <div class="right-box">
                  <span class="type">在场工人：</span>
                  <span><span style="color:#3ada76;">80</span>人</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="img-box">
              <img>
            </div>
            <div class="text-box">
              <div class="title">
                深圳科伦特几条大厦项目
                <span class="year">2019</span>
              </div>
              <div class="middle">
                <span class="type">建设单位：</span>
                <span>深圳市投资控股有限公司</span>
              </div>
              <div class="middle">
                <span class="type">开工日期：</span>
                <span>2018-12-12</span>
              </div>
              <div class="middle">
                <span class="type">参建单位：</span>
                <span><span style="color:#048fe8;">10</span>家</span>
              </div>
              <div class="bottom">
                <div class="left-box">
                  <span class="type">在场工人：</span>
                  <span><span style="color:#048fe8;">100</span>人</span>
                </div>
                <div class="right-box">
                  <span class="type">在场工人：</span>
                  <span><span style="color:#3ada76;">80</span>人</span>
                </div>
              </div>
            </div>
          </li> -->
        </ul>
      </div>
      <!-- <div class="info-box">
        <div class="top-box">
          <span>深圳科伦特大厦项目</span>
          <span class="state" style="color:#3ada76;">合格</span>
        </div>
        <div class="bottom-box">
          <div class="left-box">
            <span class="type">在场工人：</span>
            <span style="color:#048fe8;">100</span>
            <span>人</span>
          </div>
          <div class="right-box">
            <span class="type">在场工人：</span>
            <span style="color:#3ada76;">80</span>
            <span>人</span>
          </div>
        </div> -->
    </div>
  </div>
</template>

<script>
// import { amapManager } from 'vue-amap';
let amapManager = new VueAMap.AMapManager();
export default {
  data() {
    return {
      // 地图配置项
      // AMapManager,
      amapManager,
      marker1: '',
      marker2: '',
      marker3: '',
      marker4: '',
      marker5: '',
      zoom: 12,
      center: [114.083372, 22.544146],
      events: {
        init: o => {
          // console.log(o.getCenter());
          // console.log(this.$refs.map.$$getInstance());
          // o.getCity(result => {
          //     console.log(result)
          // })
          this.marker1 = new AMap.Marker({
            position: [113.983372, 22.644146],
            // title: "深圳湾创新科技中心",
            label: {
        //       content: `<div class="info-box">
        // <div class="top-box">
        //   <span>深圳科伦特大厦项目</span>
        //   <span class="state" style="color:#3ada76;">合格</span>
        // </div>
        // <div class="bottom-box">
        //   <div class="left-box">
        //     <span class="type">在场工人：</span>
        //     <span style="color:#048fe8;">100</span>
        //     <span>人</span>
        //   </div>
        //   <div class="right-box">
        //     <span class="type">在场工人：</span>
        //     <span style="color:#3ada76;">80</span>
        //     <span>人</span>
        //   </div>
        // </div>`,
              content: '',
              offset: new AMap.Pixel(-115, -80)
            }
            // content: ' ',
          });
          this.marker1.setMap(o)
          this.marker1.hide()
          this.marker2 = new AMap.Marker({
            position: [113.983372, 22.644146],
            label: {
              content: '',
              offset: new AMap.Pixel(-115, -80)
            }
          })
          this.marker2.setMap(o)
          this.marker2.hide()
          this.marker3 = new AMap.Marker({
            position: [113.983372, 22.644146],
            label: {
              content: '',
              offset: new AMap.Pixel(-115, -80)
            }
          })
          this.marker3.setMap(o)
          this.marker3.hide()
          this.marker4 = new AMap.Marker({
            position: [113.983372, 22.644146],
            label: {
              content: '',
              offset: new AMap.Pixel(-115, -80)
            }
          })
          this.marker4.setMap(o)
          this.marker4.hide()
          this.marker5 = new AMap.Marker({
            position: [113.983372, 22.644146],
            label: {
              content: '',
              offset: new AMap.Pixel(-115, -80)
            }
          })
          this.marker5.setMap(o)
          this.marker5.hide()
        },
        moveend: () => {},
        zoomchange: () => {},
        // click: e => {
        //   alert("map clicked");
        // }
      },
      // plugin: ['ToolBar', {
      //     pName: 'MapType',
      //     // defaultType: 0,
      //     events: {
      //         init(o) {
      //             console.log(o);
      //         }
      //     }
      // }],
      plugin: [
        {
          pName: "ToolBar",
          direction: false,
          events: {
            init(instance) {
              // console.log(instance);
            }
          }
        }
      ],

      // 状态储存
      sideNavState: this.enter,
      sidNavClass: "enter",

      userType: 1, // 账号类型

      companyShow: false, // 公司下拉框状态
      districtShow: false, // 地区下拉框状态
      companyId: 0, // 公司id
      companyName: '', // 当前公司名
      companyList: '', // 公司列表
      region: 0, // 区域id
      projectList: [], // 项目列表数据
      projectSum: '', // 项目总数
      provinceList: '', // 城市列表
      provinceActive: '全国', // 当前选中城市
    }
  },
  created() {
    this.getUserType()
    this.getComoanyId()
    this.getProjectList()
    this.getCompanyList()
    this.getComoanyName()
    this.getProvinceList()
  },
  methods: {
    enter() {
      this.sidNavClass = "come"
      $(".side-nav").animate({
        right: "-4.56rem"
      },1000)
      $(".menu").animate({
        right: ".24rem"
      },1000)
      this.sideNavState = this.come
    },
    come() {
      this.sidNavClass = "enter"
      $(".side-nav").animate({
        right: "0"
      },1000)
      $(".menu").animate({
        right: "4.8rem"
      },1000)
      this.sideNavState = this.enter
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },

    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },

    // 获取账号类型
    getUserType() {
      this.userType = sessionStorage.getItem('userType')
    },

    // 退出
    handleCommand(command) {
        if (command == 'login') {
            this.$router.push('login')
        }
    },

    // 下拉框点击事件
    dropDownClck(val) {
      if (val == 'company') {
        this.districtShow = false
        this.companyShow = !this.companyShow
      } else {
        this.companyShow = false
        this.districtShow = !this.districtShow
      }
    },

    // 获取公司id
    getComoanyId() {
      this.companyId = sessionStorage.getItem(`cid`)
    },

    // 获取项目列表
    getProjectList() {
      this.$axios.post(`/api/project/selectListProjectArea?companyId=${this.companyId}&region=${this.region}`).then(
        res => {
          if (res.data.map) {
            let key = 'companyName'
            for(var i in res.data.map) {
            this.projectSum = Number(i)+1
            let i2 = i
            this.$axios.post(`/api/pcCompanyLibrary/selectHjCompanyLibrary?id=${res.data.map[i].constructionId}`).then(
              res2 => {
                res.data.map[i2][key] = res2.data.data.companyName
              }
            )
            }
            setTimeout(()=>{
            this.projectList = res.data
            },300)
            let temp = []
            temp.push(res.data.map[0].longitude)
            temp.push(res.data.map[0].latitude)
            this.marker1.setPosition(temp)
            this.center = temp
            this.marker1.setTitle(res.data.map[0].projectName)
            this.marker1.setLabel({
                content: `<div class="info-box">
                <div class="top-box">
                  <span>${res.data.map[0].projectName}</span>
                  <span class="state" style="color:${Math.floor((res.data.map[0].numWing/res.data.map[0].numW)*100)>80?'#3ada76;':'#ff7a81;'}">${Math.floor((res.data.map[0].numProjectC/res.data.map[0].numProjectW)*100)>80?'合格':'不合格'}</span>
                </div>
                <div class="bottom-box">
                  <div class="left-box">
                    <span class="type">在场工人：</span>
                    <span style="color:#048fe8;">${res.data.map[0].numProjectW}</span>
                    <span>人</span>
                  </div>
                  <div class="right-box">
                    <span class="type">在场工人：</span>
                    <span style="color:#3ada76;">${res.data.map[0].numProjectC}</span>
                    <span>人</span>
                  </div>
                </div>`,
                offset: new AMap.Pixel(-115, -80)
              })
            this.marker1.show()

            let temp1 = []
            temp1.push(res.data.map[1].longitude)
            temp1.push(res.data.map[1].latitude)
            this.marker2.setPosition(temp1)
            this.marker2.setTitle(res.data.map[1].projectName)
            this.marker2.setLabel({
                content: `<div class="info-box">
                <div class="top-box">
                  <span>${res.data.map[1].projectName}</span>
                  <span class="state" style="color:${Math.floor((res.data.map[1].numWing/res.data.map[1].numW)*100)>80?'#3ada76;':'#ff7a81;'}">${Math.floor((res.data.map[1].numProjectC/res.data.map[1].numProjectW)*100)>80?'合格':'不合格'}</span>
                </div>
                <div class="bottom-box">
                  <div class="left-box">
                    <span class="type">在场工人：</span>
                    <span style="color:#048fe8;">${res.data.map[1].numProjectW}</span>
                    <span>人</span>
                  </div>
                  <div class="right-box">
                    <span class="type">在场工人：</span>
                    <span style="color:#3ada76;">${res.data.map[1].numProjectC}</span>
                    <span>人</span>
                  </div>
                </div>`,
                offset: new AMap.Pixel(-115, -80)
              })
            this.marker2.show()

            let temp2 = []
            temp2.push(res.data.map[2].longitude)
            temp2.push(res.data.map[2].latitude)
            this.marker3.setPosition(temp2)
            this.marker3.setTitle(res.data.map[2].projectName)
            this.marker3.setLabel({
                content: `<div class="info-box">
                <div class="top-box">
                  <span>${res.data.map[2].projectName}</span>
                  <span class="state" style="color:${Math.floor((res.data.map[2].numWing/res.data.map[2].numW)*100)>80?'#3ada76;':'#ff7a81;'}">${Math.floor((res.data.map[2].numProjectC/res.data.map[2].numProjectW)*100)>80?'合格':'不合格'}</span>
                </div>
                <div class="bottom-box">
                  <div class="left-box">
                    <span class="type">在场工人：</span>
                    <span style="color:#048fe8;">${res.data.map[2].numProjectW}</span>
                    <span>人</span>
                  </div>
                  <div class="right-box">
                    <span class="type">在场工人：</span>
                    <span style="color:#3ada76;">${res.data.map[2].numProjectC}</span>
                    <span>人</span>
                  </div>
                </div>`,
                offset: new AMap.Pixel(-115, -80)
              })
            this.marker3.show()

            let temp3 = []
            temp3.push(res.data.map[3].longitude)
            temp3.push(res.data.map[3].latitude)
            this.marker4.setPosition(temp3)
            this.marker4.setTitle(res.data.map[3].projectName)
            this.marker4.setLabel({
                content: `<div class="info-box">
                <div class="top-box">
                  <span>${res.data.map[3].projectName}</span>
                  <span class="state" style="color:${Math.floor((res.data.map[3].numWing/res.data.map[3].numW)*100)>80?'#3ada76;':'#ff7a81;'}">${Math.floor((res.data.map[3].numProjectC/res.data.map[3].numProjectW)*100)>80?'合格':'不合格'}</span>
                </div>
                <div class="bottom-box">
                  <div class="left-box">
                    <span class="type">在场工人：</span>
                    <span style="color:#048fe8;">${res.data.map[3].numProjectW}</span>
                    <span>人</span>
                  </div>
                  <div class="right-box">
                    <span class="type">在场工人：</span>
                    <span style="color:#3ada76;">${res.data.map[3].numProjectC}</span>
                    <span>人</span>
                  </div>
                </div>`,
                offset: new AMap.Pixel(-115, -80)
              })
            this.marker4.show()

            let temp4 = []
            temp4.push(res.data.map[4].longitude)
            temp4.push(res.data.map[4].latitude)
            this.marker5.setPosition(temp4)
            this.marker5.setTitle(res.data.map[4].projectName)
            this.marker5.setLabel({
                content: `<div class="info-box">
                <div class="top-box">
                  <span>${res.data.map[4].projectName}</span>
                  <span class="state" style="color:${Math.floor((res.data.map[4].numWing/res.data.map[4].numW)*100)>80?'#3ada76;':'#ff7a81;'}">${Math.floor((res.data.map[4].numProjectC/res.data.map[4].numProjectW)*100)>80?'合格':'不合格'}</span>
                </div>
                <div class="bottom-box">
                  <div class="left-box">
                    <span class="type">在场工人：</span>
                    <span style="color:#048fe8;">${res.data.map[4].numProjectW}</span>
                    <span>人</span>
                  </div>
                  <div class="right-box">
                    <span class="type">在场工人：</span>
                    <span style="color:#3ada76;">${res.data.map[4].numProjectC}</span>
                    <span>人</span>
                  </div>
                </div>`,
                offset: new AMap.Pixel(-115, -80)
              })
            this.marker5.show()
          } else {
            this.$message({
              message: '该地区无项目',
              type: 'error'
            })
          }
        }
      )
    },

    // 获取当前公司名
    getComoanyName() {
      this.$axios.post(`/api/pcCompanyLibrary/selectHjCompanyLibrary?id=${this.companyId}`).then(
        res => {
          // console.log(res.data)
          this.companyName = res.data.data.companyName
        }
      )
    },

    // 获取公司列表
    getCompanyList() {
      this.$axios.post(`/api/pcCompanyLibrary/selectHjCompanyList?companyId=${this.companyId}`).then(
        res => {
          // console.log(res.data)
          this.companyList = res.data
        }
      )
    },

    // 获取省份列表
    getProvinceList() {
      this.$axios.post(`/api/area/getArea?parentId=0`).then(
        res => {
          // console.log(res.data)
          this.provinceList = res.data.data
        }
      )
    },

    // 项目看板跳转
    projectClick(id) {
      // console.log(id)
      sessionStorage.setItem("pid", id)
      this.$router.push({ path: "/spectaculars" })
    }
  }
};
</script>

<style lang="less">
#homePage {
  .green-color {
    color: #5be4a5;
  }
  .yellow-color {
    color: #f5c98d;
  }
  .red-color {
    color: #f00;
  }
  .top {
    width: 19.2rem;
    height: 0.8rem;
    padding-top: 0.24rem;
    background-size: cover;
    background: linear-gradient(to right, #6cc4ff, #489cff);
  }
  .top > div {
    float: left;
  }
  .top .nav-logo {
    height: 0.24rem;
  }
  .top .logo-box {
    display: inline-block;
    height: 0.45rem;
    width: 1.24rem;
    background-image: url("../../../static/images/yzt-whiteLogo.png");
    background-size: contain;
    margin-left: 0.24rem;
    vertical-align: top;
  }
  .top .nav-logo .line {
    display: inline-block;
    width: 0.01rem;
    height: 0.18rem;
    margin-left: 0.16rem;
    margin-bottom: 0.03rem;
    background-color: #fff;
    vertical-align: text-top;
  }
  .top .company {
    margin-left: 0.16rem;
    font-size: 0.18rem;
    color: #fff;
    line-height: 0.24rem;
    vertical-align: text-top;
    text-shadow: .02rem .02rem .02rem #666;
  }
  .top .nav {
    margin-left: 0.99rem;
  }
  .top .nav ul li {
    float: left;
  }
  .top .nav li a {
    display: block;
    font-size: 0.2rem;
    color: #fff;
    padding-left: 0.16rem;
    padding-right: 0.16rem;
    height: 0.56rem;
    margin-left: 0.17rem;
  }
  .top .nav li a.active {
    border-bottom: 0.04rem solid #fff;
  }
  .top .user {
    float: right;
    margin-right: 0.36rem;
  }
  .top .user a {
    font-size: 0.2rem;
    color: #fff;
  }
  /* 主体区域样式 */
  .main {
    position: relative;
    height: 10rem;
    overflow: hidden;
    .info-box {
      width: 2.3rem;
      height: .66rem;
      border-radius: .04rem;
      background-color: #fff;
      position: absolute;
      padding: .12rem;
      overflow: hidden;
      // top: 500px;
      // left: 1000px;
      .top-box {
        display: flex;
        justify-content: space-between;
        span {
          color: #4a4a4a;
          font-size: .14rem;
          height: .16rem;
          line-height: .16rem;
        }
        .state {
          font-size: .12rem;
          text-align: right;
        }
      }
      .bottom-box {
        display: flex;
        margin-top: .12rem;
        justify-content: space-between;
        >div {
          height: .14rem;
          line-height: .14rem;
          span {
            font-size: .12rem;
          }
          .type {
            color: #a5a5a5;
          }
        }
      }
    }
  }
  .amap-demo {
    height: 10rem;
  }
  .main .search-bar {
    position: absolute;
    width: 3.66rem;
    height: 0.46rem;
    background-image: url("../../../static/images/homePage-inputBg.png");
    background-size: contain;
    top: 0.15rem;
    left: 0.7rem;
    padding-left: 0.17rem;
  }
  .main .search-bar input {
    font-size: 0.14rem;
    height: 0.4rem;
    width: 3rem;
    padding: 0;
    transform: translateY(0.01rem);
  }
  .main .search-bar a {
    width: 0.45rem;
    height: 0.4rem;
    display: inline-block;
    transform: translateY(-0.09rem);
  }
  .main .search-bar a i {
    width: 0.49rem;
    height: 0.17rem;
    display: inline-block;
    background-image: url("../../../static/images/homePage-search.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    transform: translateY(0.11rem);
  }
  .main .menu {
    position: absolute;
    width: 3.66rem;
    height: 0.46rem;
    background-image: url("../../../static/images/homePage-inputBg.png");
    background-size: contain;
    top: 0.15rem;
    right: 4.8rem;
    padding-top: .06rem;
    >a {
      display: inline-block;
      position: relative;
      .icon {
        position: absolute;
        right: .08rem;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .company {
      width: 2.47rem;
      height: .3rem;
      line-height: .3rem;
      border-right: .02rem solid #f2f2f2;
      padding-left: .16rem;
    }
    .district {
      width: 1.13rem;
      height: .3rem;
      line-height: .3rem;
      padding-left: .1rem;
    }
    .company-box,
    .district-box {
      // height: 1rem;
      width: 3.6rem;
      position: absolute;
      left: .04rem;
      top: .4rem;
      background-color: #fff;
      .now {
        color: #4a4a4a;
        font-size: .12rem;
        background-color: #f8f8f8;
        height: .34rem;
        line-height: .34rem;
        padding-left: .18rem;
        font-weight: border;
      }
    }
    .company-box {
      padding-bottom: .2rem;
      .search-box {
        height: .47rem;
        border-bottom: .01rem solid #f8f8f8;
        padding-left: .18rem;
        line-height: .46rem;
        font-size: .12rem;
        input {
          padding-left: .1rem;
        }
      }
      .collapse-box {
        padding: 0 .18rem;
        .el-collapse {
          border: none;
          position: relative;
          .el-collapse-item__header {
              font-size: .12rem;
              color: #878787;
              // background-color: #54a4d7;
              border-bottom: 0;
              height: .25rem;
              padding: 0;
              line-height: .25rem;
              // padding-left: .35rem;
              // border-bottom: .01rem solid #f2f8fc;
          }
          .el-collapse-item__content {
              padding: 0;
              >div {
                  // background-color: #54a4d7;
                  a {
                      display: block;
                      color: #878787;
                      font-size: .12rem;
                      line-height: .3rem;
                  }
              }
          }
          .el-collapse-item__wrap {
              // background-color: #54a4d7;
              padding-left: .2rem;
              border: none;
              overflow: visible;
              // height: auto;
          }
        }
      }
    }
    .district-box {
      ul {
        padding: .04rem .18rem .08rem .18rem;
        display: flex;
        flex-wrap: wrap;
        li {
          height: .3rem;
          line-height: .3rem;
          margin-right: .21rem;
          a {
            font-size: .12rem;
            color: #7a7a7a;
            &.active {
              color: #5e9fde;
            }
          }
        }
      }
    }
  }
  .main .side-nav {
    position: absolute;
    // width: 4.83rem;
    width: 6.07rem;
    height: 10.2rem;
    padding-left: 0.28rem;
    transform: translateX(1.24rem);
    padding-right: 1.24rem;
    background-position: right center;
    background-repeat: no-repeat;
    background-size: contain;
    top: 0;
    right: 0;
    >.data {
      height: .75rem;
      background-color: #ededed;
      ul {
        display: flex;
        flex-wrap: wrap;
        padding-left: .3rem;
        padding-top: .1rem;
        li {
          width: 50%;
          font-size: .12rem;
          span {
            color: #048fe8;
            font-size: .16rem;
          }
        }
      }
    }
    >.main-list {
      >li {
        height: 1.52rem;
        border-bottom: .01rem solid #e8e8e8;
        padding-left: .3rem;
        padding-top: .2rem;
        a {
          display: flex;
          .img-box {
            width: 1.11rem;
            height: 1.11rem;
            margin-right: .14rem;
            img {
              width: 1.11rem;
              height: 1.11rem;
            }
          }
          .text-box {
            div {
              color: #4a4a4a;
              font-size: .12rem;
            }
            .title {
              height: .16rem;
              font-size: .14rem;
              font-weight: bolder;
              position: relative;
              line-height: .16rem;
              overflow: hidden;
              .year {
                font-size: .12rem;
                width: .4rem;
                height: .16rem;
                color: #fff;
                // position: absolute;
                display: inline-block;
                border-radius: .04rem;
                background-color: #009cff;
                text-align: center;
                line-height: .16rem;
                // right: -0.1rem;
                // top: 0;
              }
            }
            .middle {
              .type {
                color: #a5a5a5;
              }
            }
            .bottom {
              display: flex;
              >div {
                .type {
                  color: #a5a5a5;
                }
              }
              .left-box {
                margin-right: .24rem;
              }
            }
          }
        }
      }
    }
  }
  .enter {
    background-image: url("../../../static/images/homePage-come.png");
  }

  .come {
    background-image: url("../../../static/images/homePage-enter.png");
  }
  .main .side-nav > a {
    width: 0.2rem;
    height: 0.5rem;
    position: absolute;
    left: 0.1rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .main .side-nav > .title {
    // width: 5.93rem;
    height: 0.51rem;
    background-color: #f8f8f8;
    border-bottom: 0.01rem solid #d4d4d4;
    font-size: 0.14rem;
    line-height: 0.5rem;
    padding-left: 0.3rem;
    // transform: translate(-0.04rem);
    position: relative;
    a {
      color: #009cff;
      font-size: .14rem;
      position: absolute;
      right: .37rem;
    }
  }
  .main .side-nav > .title span {
    color: #3278b6;
    font-size: 0.2rem;
  }
  .el-submenu {
    height: 1rem;
    .el-submenu__title {
      height: 100%;
      border-bottom: 0.01rem solid #d4d4d4;
      .el-submenu__icon-arrow {
        color: #6cbbff;
        font-weight: bolder;
        font-size: 0.18rem;
        transform: rotate(-90deg);
      }
      a {
        display: block;
        width: 100%;
        height: 1rem;
        position: relative;
        padding-top: 0.11rem;
        // padding-left: 0.8rem;
        .img {
          display: inline-block;
          width: 0.6rem;
          height: 0.6rem;
          background-image: url("../../../static/images/homePage-temp.jpg");
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          position: relative;
          // transform: translateY(-0.3rem);
          .subImg {
            position: absolute;
            width: 0.29rem;
            height: 0.29rem;
            left: 0;
            top: 0;
            background-image: url("../../../static/images/homePage-emphasis.png");
            background-size: contain;
            z-index: 10;
          }
        }
        .datum {
          display: inline-block;
          padding-left: 0.2rem;
          // transform: translateY(-0.3rem);
          line-height: 0.25rem;
        }
        .state {
          top: 50%;
          right: .32rem;
          font-size: .12rem;
          position: absolute;
          transform: translateY(-50%);
        }
      }
    }
  }
  .project {
    .el-submenu__icon-arrow {
      display: none;
    }
  }
  .is-opened {
    >.el-submenu__title {
      .el-submenu__icon-arrow {
        transform: rotate(0deg) !important;
      }
    }
  }
  .main .side-nav li a .datum .title {
    color: #4a4a4a;
    font-size: 0.14rem;
    font-weight: bolder;
  }
  .main .side-nav li a .datum p {
    font-size: 0.12rem;
    color: #a5a5a5;
  }
  /* 占位符样式 */
  ::-webkit-input-placeholder {
    color: #a5a5a5;
  }
  ::-moz-placeholder {
    color: #a5a5a5;
  } /* firefox 19+ */
  :-ms-input-placeholder {
    color: #a5a5a5;
  } /* Internet Explorer 10+ */
  :-moz-placeholder {
    color: #a5a5a5;
  } /* firefox 14-18 */
}
</style>
