<template>
  <div id="engineering">
    <!-- 侧导航栏 -->
    <div class="select">
      <ul>
        <li @click="isActive='/kg/kg_statistics'">
          <router-link
            to="/kg/kg_statistics"
            :class="isActive=='/kg/kg_statistics'?'active':''"
          >
            <i class="statisti"></i>
            数据统计
          </router-link>
        </li>
        <li @click="isActive='/kg/kg_record'">
          <router-link to="/kg/kg_record" :class="isActive=='/kg/kg_record'?'active':''">
            <i class="search"></i>
            检查记录
          </router-link>
        </li>
        <!-- <li @click="isActive='/kg/kg_infopath'">
          <router-link
            to="/kg/kg_infopath"
            :class="isActive=='/kg/kg_infopath'?'active':''"
          >
            <i class="form"></i>
            整改单管理
          </router-link>
        </li> -->
        <!-- <li @click="isActive='/kg/kg_set'">
                    <router-link to="/kg/kg_set" :class="isActive=='/kg/kg_set'?'active':''">
                        <i class="system"></i>
                        安全隐患库
                    </router-link>
        </li>-->
      </ul>
    </div>
    <!-- 内容区域 -->
    <router-view class="router-box"></router-view>
  </div>
</template>

<style lang="less">
#engineering {
  padding: 0.5rem 0.4rem 0 0.4rem;
  display: flex;
  .select {
    width: 3rem;
    height: 9.41rem;
    background-image: url("../../../static/images/m_left-border.png");
    background-size: contain;
    background-color: #020521;
    padding: 0.02rem;
    margin-right: 0.4rem;
    ul {
      li {
        height: 0.57rem;
        background-image: url("../../../static/images/m_select-border.png");
        background-position: bottom center;
        background-repeat: no-repeat;
        background-size: 2.73rem 0.01rem;
        a {
          display: block;
          width: 2.94rem;
          height: 0.56rem;
          color: #3979fe;
          position: relative;
          line-height: 0.56rem;
          padding-left: 0.42rem;
          i {
            width: 0.17rem;
            height: 0.17rem;
            position: absolute;
            background-size: contain;
            left: 0.17rem;
            top: 50%;
            transform: translateY(-50%);
          }
          .form {
            background-image: url("../../../static/images/quality-form.png");
          }
          .statisti {
            background-image: url("../../../static/images/location-statisti.png");
          }
          .system {
            background-image: url("../../../static/images/location-system.png");
          }
          .search {
            background-image: url("../../../static/images/location-search.png");
          }
        }
        .active {
          background-image: url("../../../static/images/location-active.png");
          background-size: contain;
        }
      }
    }
  }
  .router-box {
    flex: 1;
  }
}
</style>

<script>
export default {
  data() {
    return {
      activeNames: [""],
      isActive: "/kg/kg_statistics"
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    getRouter() {
      if (this.$route.path != "/kg") {
        this.isActive = this.$route.path;
      }
    }
  },
  created() {
    this.getRouter();
  }
};
</script>
