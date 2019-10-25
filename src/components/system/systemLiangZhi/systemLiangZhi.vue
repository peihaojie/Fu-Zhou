<template>
  <div id="systemLiangZhi">
    <!-- 阴影框 -->
    <div class="shadow-box"></div>
    <!-- 侧导航栏 -->
    <div class="side-nav">
      <ul>
        <li class="button">
          <router-link to="/systemHome" class="return" v-show="retractState" @click="permissionShow=false, fwShow=false"></router-link>
          <a class="retract" @click="retractClick" ></a>
        </li>
        <li @click="isActiveShow('/systemLiangZhi_home')">
          <router-link
            to="/systemLiangZhi_home"
            :class="activeShow=='/systemLiangZhi_home'||activeShow=='/systemLiangZhi'?'active':''"
          >
            <div class="icon home"></div>
            <span>首&#12288;&#12288;页</span>
          </router-link>
        </li>
        <li @click="isActiveShow('/systemLiangZhi_contractors')">
          <router-link
            to="/systemLiangZhi_contractors"
            :class="activeShow=='/systemLiangZhi_contractors'?'active':''"
          >
            <div class="icon contractors"></div>
            <span>参建单位</span>
          </router-link>
        </li>
        <li @click="isActiveShow('/systemLiangZhi_team')">
          <router-link
            to="/systemLiangZhi_team"
            :class="activeShow=='/systemLiangZhi_team'?'active':''"
          >
            <div class="icon team"></div>
            <span>参建班组</span>
          </router-link>
        </li>
        <li @click="isActiveShow('/systemLiangZhi_personnel')">
          <router-link
            to="/systemLiangZhi_personnel"
            :class="activeShow=='/systemLiangZhi_personnel'?'active':''"
          >
            <div class="icon personnel"></div>
            <span>项目人员</span>
          </router-link>
        </li>
        <li @click="isActiveShow('/systemLiangZhi_attendance')">
          <router-link
            to="/systemLiangZhi_attendance"
            :class="activeShow=='/systemLiangZhi_attendance'?'active':''"
          >
            <div class="icon attendance"></div>
            <span>考勤记录</span>
          </router-link>
        </li>
        <li @click="isActiveShow('/systemLiangZhi_exception')">
          <router-link
            to="/systemLiangZhi_exception"
            :class="activeShow=='/systemLiangZhi_exception'?'active':''"
          >
            <div class="icon exception"></div>
            <span>异常记录</span>
          </router-link>
        </li>
        <li @click="isActiveShow('/systemLiangZhi_blacklist')">
          <router-link
            to="/systemLiangZhi_blacklist"
            :class="activeShow=='/systemLiangZhi_blacklist'?'active':''"
          >
            <div class="icon blacklist"></div>
            <span>黑&#8194;名&#8194;单</span>
          </router-link>
        </li>
        <li @click="rewardClick">
          <a :class="activeShow.includes('reward')?'active':''">
            <div class="icon reward"></div>
            <span>奖罚记录</span>
          </a>
        </li>
        <li @click="isActiveShow('/systemLiangZhi_salary')">
          <router-link to="/systemLiangZhi_salary" :class="activeShow=='/systemLiangZhi_salary'?'active':''">
            <div class="icon salary"></div>
            <span>工资上传</span>
          </router-link>
        </li>
        <li @click="isActiveShow('/systemLiangZhi_equipment')">
          <router-link
            to="systemLiangZhi_equipment"
            :class="activeShow=='/systemLiangZhi_equipment'?'active':''"
          >
            <div class="icon equipment"></div>
            <span>设备管理</span>
          </router-link>
        </li>
        <li @click="fw('fw')">
          <a :class="activeShow.includes('fw')?'active':''">
            <div class="icon serve"></div>
            <span>两制服务</span>
          </a>
        </li>
        <!-- <li @click="permissionClick">
          <a :class="activeShow.includes('/systemLiangZhi_permission')?'active':''">
            <div class="icon"></div>
            <span>权限设置</span>
          </a>
        </li> -->
      </ul>
    </div>
    <!-- 两制服务侧拉框 -->
    <div class="subnav" v-show="fwShow">
      <ul>
        <li @click="isActiveShow('/fw')">
          <router-link to="systemLiangZhi_fw_one">项目信息</router-link>
        </li>
        <li @click="isActiveShow('/fw')">
          <router-link to="systemLiangZhi_fw_two">分包信息</router-link>
        </li>
        <li @click="isActiveShow('/fw')">
          <router-link to="systemLiangZhi_fw_three">工人信息</router-link>
        </li>
        <li @click="isActiveShow('/fw')">
          <router-link to="systemLiangZhi_fw_four">工作汇报</router-link>
        </li>
      </ul>
    </div>
    <div class="sanjiao" v-show="fwShow"></div>
    <!-- 权限设置侧拉框 -->
    <div class="permission-nav" v-show="permissionShow">
      <div class="triangle"></div>
      <div class="nav-box">
        <ul>
          <li @click="isActiveShow('/systemLiangZhi_permission_user')"> 
            <router-link to="/systemLiangZhi_permission_user">用户管理</router-link>
          </li>
          <li @click="isActiveShow('/systemLiangZhi_permission_role')">
            <router-link to="/systemLiangZhi_permission_role">角色管理</router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- 内容 -->
    <router-view class="router-box"></router-view>
    <!-- 奖罚记录侧拉框 -->
    <div class="reward-subNav" v-show="rewardShow">
      <ul>
        <li @click="isActiveShow('/reward')">
          <router-link to="/systemLuabfZhi_reward_inquire">奖罚查询</router-link>
        </li>
        <li @click="isActiveShow('/reward')">
          <router-link to="/systemLiangZhi_reward_record">奖罚记录</router-link>
        </li>
        <li @click="isActiveShow('/reward')">
          <router-link to="/systemLiangZhi_reward_category">奖罚类别</router-link>
        </li>
      </ul>
    </div>
    <div class="reward-sanjiao" v-show="rewardShow"></div>
  </div>
</template>

<style lang="less">
#systemLiangZhi {
  width: 100%;
  display: flex;
  position: relative;
  background-color: #f7f7f7;
  .shadow-box {
    width: 100%;
    height: 0.15rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20;
    box-shadow: 0 0.07rem 0.14rem -0.1rem #666 inset;
  }
  .side-nav {
    width: 1.75rem;
    height: 10rem;
    overflow: hidden;
    background-color: #54a4d7;
    ul {
      width: 1.75rem;
      li {
        height: 0.6rem;
        position: relative;
        a {
          width: 100%;
          height: 0.6rem;
          color: #fff;
          font-size: 0.2rem;
          line-height: 0.6rem;
          position: absolute;
          transition: all 0.5s;
          border-bottom: 0.01rem solid #98c8e7;
          .icon {
            opacity: 0.5;
            width: 0.6rem;
            height: 0.59rem;
            transition: all 0.5s;
            display: inline-block;
            background-repeat: no-repeat;
            background-position: center center;
          }
          span {
            // width: 0.8rem;
            vertical-align: top;
            // text-align: justify;
            // display: inline-block;
            // text-align-last: justify;
          }
          .home {
            background-image: url("../../../../static/images/system-home.png");
          }
          .contractors {
            background-image: url("../../../../static/images/system-contractors.png");
          }
          .team {
            background-image: url("../../../../static/images/system-team.png");
          }
          .personnel {
            background-image: url("../../../../static/images/system-personnel.png");
          }
          .attendance {
            background-image: url("../../../../static/images/system-attendance.png");
          }
          .exception {
            background-image: url("../../../../static/images/system-exception.png");
          }
          .blacklist {
            background-image: url("../../../../static/images/system-blacklistNav.png");
          }
          .reward {
            background-image: url("../../../../static/images/system-reward.png");
          }
          .salary {
            background-image: url("../../../../static/images/system-salary.png");
          }
          .equipment {
            background-image: url("../../../../static/images/system-equipment.png");
          }
          .serve {
            background-image: url("../../../../static/images/system-serve.png");
          }
        }
        a:hover {
          background-color: #2d83bb;
          .icon {
            opacity: 1;
          }
        }
        .active {
          z-index: 10;
          background-color: #378dc5;
          .icon {
            opacity: 1;
          }
        }
      }
      .button {
        position: relative;
        border-bottom: 0.01rem solid #98c8e7;
        a {
          top: 50%;
          border: 0;
          padding: 0;
          width: 0.22rem;
          height: 0.22rem;
          position: absolute;
          transform: translateY(-50%);
          background-repeat: no-repeat;
          background-position: center center;
          &:hover {
            background-color: #2d83bb;
          }
        }

        .return {
          left: 0.4rem;
          background-image: url("../../../../static/images/system-return.png");
        }
        .retract {
          right: 0.4rem;
          background-image: url("../../../../static/images/system-retract.png");
        }
      }
    }
  }
  .subnav {
    position: absolute;
    left: 1.75rem;
    top: 5.52rem;
    z-index: 1000;
    background-color: #1872ad;
    // display: none;
    ul {
      width: 2rem;
      height: 1.68rem;
      li {
        font-size: 0.18rem;
        line-height: 0.36rem;
        padding-left: 0.18rem;
        margin-top: 0.06rem;
        width: 1.9rem;
        margin-left: 0.05rem;
        z-index: 6;
        cursor: pointer;
        &:hover {
          background-color: #54a4d7;
        }
        a {
          color: #fff;
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .sanjiao {
    position: absolute;
    top: 6.78rem;
    left: 1.65rem;
    width: 25px;
    height: 0.25rem;
    background-color: #1872ad;
    transform: rotate(45deg);
    z-index: 999;
    // display: none;
  }
  .permission-nav {
    position: absolute;
    left: 1.65rem;
    .triangle {
      position: absolute;
      top: 7.38rem;
      left: 0;
      width: 25px;
      height: 0.25rem;
      background-color: #1872ad;
      transform: rotate(45deg);
      z-index: 999;
    }
    .nav-box {
      position: absolute;
      left: .1rem;
      top: 7.05rem;
      z-index: 1000;
      background-color: #1872ad;
      ul {
        width: 2rem;
        padding-bottom: .06rem;
        li {
          font-size: 0.18rem;
          line-height: 0.36rem;
          padding-left: 0.18rem;
          margin-top: 0.06rem;
          width: 1.9rem;
          margin-left: 0.05rem;
          z-index: 6;
          cursor: pointer;
          &:hover {
            background-color: #54a4d7;
          }
          a {
            color: #fff;
            display: inline-block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .router-box {
    flex: 1;
    padding-top: 0.3rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
  }
  .reward-subNav {
    position: absolute;
    left: 1.75rem;
    top: 4.82rem;
    z-index: 1000;
    background-color: #1872ad;
    // display: none;
    ul {
      width: 2rem;
      height: 1.26rem;
      li {
        font-size: 0.18rem;
        line-height: 0.36rem;
        padding-left: 0.18rem;
        margin-top: 0.06rem;
        width: 1.9rem;
        margin-left: 0.05rem;
        z-index: 6;
        cursor: pointer;
        &:hover {
          background-color: #54a4d7;
        }
        a {
          color: #fff;
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .reward-sanjiao {
    position: absolute;
    top: 4.98rem;
    left: 1.65rem;
    width: 25px;
    height: 0.25rem;
    background-color: #1872ad;
    transform: rotate(45deg);
    z-index: 999;
    // display: none;
  }
}
</style>

<script>
export default {
  data() {
    return {
      retractState: true, // 侧导航栏缩进状态
      activeShow: "/systemLiangZhi_home", // 当前选中的模块
      fwShow: false, // 两制服务系统侧拉框状态
      rewardShow: false, // 奖罚记录侧拉框状态
      permissionShow: false, // 权限设置侧拉框状态
    };
  },
  created() {
    this.getPath();
  },
  methods: {
    // 侧导航栏缩进
    retractClick() {
      this.permissionShow = false
      if (this.retractState) {
        $(".side-nav").animate(
          {
            width: ".6rem"
          },
          500
        )
        $(".retract").animate({
          right: "1.35rem"
        })
        $(".sanjiao").animate({
          left: "0.5rem"
        })
        $(".subnav").animate({
          left: "0.6rem"
        })
        $(".reward-sanjiao").animate({
          left: "0.5rem"
        })
        $(".reward-subNav").animate({
          left: "0.6rem"
        })
        $(".permission-nav").animate({
          left: "0.5rem"
        })

        this.retractState = !this.retractState;
      } else {
        $(".side-nav").animate(
          {
            width: "1.75rem"
          },
          500
        )
        $(".retract").animate({
          right: ".4rem"
        })
        $(".sanjiao").animate({
          left: "1.65rem"
        })
        $(".subnav").animate({
          left: "1.75rem"
        })
        $(".reward-sanjiao").animate({
          left: "1.65rem"
        })
        $(".reward-subNav").animate({
          left: "1.75rem"
        })
        $(".permission-nav").animate({
          left: "1.65rem"
        })

        this.retractState = !this.retractState;
      }
    },

    // 选择模块
    isActiveShow(i) {
        this.activeShow = i
        this.permissionShow = false
        this.fwShow = false
        this.rewardShow = false
    },

    // 页面刷新时重新赋值
    getPath() {
        this.activeShow = this.$route.path;
    },

    // 两制服务选项弹出
    fw(i) {
        this.fwShow = !this.fwShow
        this.permissionShow = false
        this.rewardShow = false
        // $(".sanjiao").show();
        // $(".subnav").show();
        // this.activeShow = i;
    },

    rewardClick() {
      this.rewardShow = !this.rewardShow
      this.fwShow = false
    },
    
    // 权限设置侧拉框
    permissionClick() {
      this.permissionShow = !this.permissionShow
      this.fwShow = false
    },

    // 功能未开发
    unopenClick() {
      this.$message({
        message: '该功能暂未开放',
        type: 'warning'
      })
    }
  }
};
</script>