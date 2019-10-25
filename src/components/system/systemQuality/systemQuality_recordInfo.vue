<template>
  <div id="systemQuality_recordInfo">
    <div class="content">
      <div class="tab">
        <span @click="$router.push('/systemQuality_record')">
          <i class="el-icon-arrow-left" style="font-size:0.18rem"></i>
          返回&nbsp;/&nbsp;
        </span>
        <!-- <span @click="$router.push('/systemQuality_home')">数据统计&nbsp;/&nbsp;</span> -->
        <span @click="$router.push('/systemQuality_record')">检查记录&nbsp;/&nbsp;</span>
        <span>详情</span>
      </div>
      <div class="status">
        <p class="text">{{indexData.status==1?'待整改':indexData.status==2?'待复查':indexData.status==3?'已完成':'超期未整改'}}</p>
        <p class="time">整改时间：{{indexData.safetyDeadline}}</p>
      </div>
      <div class="quality">
        <div class="title">
          <span class="shu"></span>
          <span class="text">质量检查</span>
        </div>
        <div class="textInfo">
          {{indexData.rectifyResult}}
          <span>{{indexData.gradeName}}</span>
        </div>
        <div class="listInfo">
          <ul>
            <li>
              检查区域：
              <span>{{indexData.areaName}}</span>
            </li>
            <li>
              隐患类型：
              <span>{{indexData.hiddenName}}</span>
            </li>
            <li>
              分包单位：
              <span>{{indexData.constructionName}}</span>
            </li>
            <li>
              &#12288;检查人：
              <span>{{indexData.initiatorName}}</span>
            </li>
          </ul>
        </div>
        <img
          :src="indexData.safetyPhotos[0]"
        >
      </div>
      <div class="inform">
        <div class="title">
          <span class="shu"></span>
          <span class="text">整改通知</span>
        </div>
        <div class="listInfo">
          <ul>
            <li>
              &#12288;整改人：
              <span>{{indexData.rectifyName}}</span>
            </li>
            <li>
              整改时限：
              <span>{{indexData.safetyDeadline}}</span>
            </li>
            <li>
              整改要求：
              <span>{{indexData.safetyRequire}}</span>
            </li>
            <li>
              创表时间：
              <span>{{indexData.safetyCreateTime}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="abarbeitungList">
        <div class="list">
          <div class="title">
            <span class="shu"></span>
            <span class="text">第1次整改</span>
          </div>
          <div class="listInfo">
            <ul>
              <li v-if="indexData.rectifyName">
                &#12288;整改人：
                <span>{{indexData.rectifyName}}</span>
              </li>
            </ul>
          </div>
          <div class="case" v-if="indexData.rectifyResult">处理情况</div>
          <div class="caseInfo" v-if="indexData.rectifyResult">{{indexData.rectifyResult}}</div>
          <img v-if="indexData.rectifyPhotos[0]" :src="indexData.rectifyPhotos[0]" />
          <div class="caseTime" v-if="indexData.rectifyTime">整改时间：{{indexData.rectifyTime}}</div>
          <div class="review" v-if="indexData.reviewOpinions">
            <p>复查意见&#12288;&#12288;{{indexData.reviewOpinions}}</p>
            <p>{{indexData.reviewResult}}</p>
            <p>复查人：{{indexData.reviewName}}</p>
            <img :src="indexData.reviewPath[0]" />
            <p class="reviewTime">复查时间：{{indexData.reviewTime}}</p>
          </div>
        </div>
        <div class="createTime">表单创建时间：{{indexData.safetyCreateTime}}</div>
      </div>
      <div class="right">
        <div class="liuCheng">
          <div class="title">
            <span class="shu"></span>
            <span class="text">流程</span>
          </div>
          <div class="rightInfo">
            <ul>
              <li v-if="list.length>0" v-for="(item, index) in list" :key="index">
                <div class="rightLine">
                  <p class="yuan"></p>
                  <p class="line"></p>
                </div>
                <div class="rightText">
                  <p>{{ item.time }}</p>
                  <p>{{ item.engineer }}{{ item.name }}</p>
                </div>
                <div class="rightStatus">{{ item.title }}</div>
              </li>
              <!-- <li>
                <div class="rightLine">
                  <p class="yuan"></p>
                  <p class="line"></p>
                </div>
                <div class="rightText">
                  <p>2019.01.01 22:36</p>
                  <p>整改负责人&#12288;项目负责人伟业-韩子昂</p>
                </div>
                <div class="rightStatus">整改完成</div>
              </li>
              <li>
                <div class="rightLine">
                  <p class="yuan"></p>
                  <p class="line"></p>
                </div>
                <div class="rightText">
                  <p>2019.01.01 21:36</p>
                  <p>整改复查&#12288;安全工程师王佳欣</p>
                </div>
                <div class="rightStatus">复查通过</div>
              </li> -->
            </ul>
          </div>
        </div>
        <div class="person">
          <div class="title">
            <span class="shu"></span>
            <span class="text">通知人</span>
          </div>
          <p v-if="indexData.makeName == []">无</p>
          <p v-else v-for="(item, index) in indexData.makeName" :key="index">{{ item }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      safetyId: '', // 整改id
      getIdState: 0, // 调用一次获取url中的值
      indexData: '', // 页面数据
      list: '' // 流程列表
    }
  },
  created() {
    this.getSafetyId()
    this.getInspectionRecordList()
  },
  methods: {
    // 获取实时监控页面传过来的值
    getSafetyId() {
        if (this.$route.query.id != undefined && this.getIdState == 0) {
            this.safetyId = this.$route.query.id
            this.getIdState = 1
        }
        // console.log(this.safetyId)
    },

    // 获取检查记录详情页数据
    getInspectionRecordList() {
      this.$axios.post(`/api/safetyPcApi/getInspectionRecordDetails?safetyId=${this.safetyId}`).then(
        res => {
          // console.log(res.data.data.list)
          this.indexData = res.data.data;
          this.list = res.data.data.list
        }
      )
    }, 
  }
};
</script>

<style lang="less">
#systemQuality_recordInfo {
  .content {
    position: relative;
    width: 100%;
    height: 9.5rem;
    background-color: #fff;
    box-shadow: 0 0 0.5rem -0.3rem #666;
    border-radius: 0.04rem;
    padding: 0.17rem 0.2rem 0.4rem 0.2rem;
    overflow: auto;

    .tab {
      span {
        display: inline-block;
        height: 0.3rem;
        cursor: pointer;
        font-size: 0.16rem;
        line-height: 0.3rem;
      }
    }
    .status {
      margin-top: 0.1rem;
      height: 0.95rem;
      width: 100%;
      background-color: #f2f9ff;
      padding-top: 0.25rem;
      padding-left: 0.33rem;
      .text {
        font-size: 0.18rem;
        color: #3ea0ff;
        font-weight: 600;
      }
      .time {
        color: #4a4a4a;
        margin-top: 0.03rem;
        font-size: 0.16rem;
      }
    }
    .quality {
      width: 50%;
      margin-top: 0.3rem;
      .textInfo {
        margin-left: 0.16rem;
        margin-top: 0.05rem;
        font-size: 0.16rem;
        font-weight: 600;
        span {
          display: inline-block;
          width: 0.42rem;
          height: 0.18rem;
          font-size: 0.12rem;
          color: #fff;
          line-height: 0.18rem;
          text-align: center;
          border-radius: 0.18rem;
          background-color: #3375fe;
          font-weight: normal;
        }
      }
    }
    .inform {
      width: 50%;
      margin-top: 0.3rem;
    }
    .abarbeitungList {
      width: 50%;
      margin-top: 0.25rem;
      .list {
        .case {
          margin-left: 0.16rem;
          font-size: 0.14rem;
          font-weight: 600;
          margin-top: 0.1rem;
        }
        .caseInfo {
          font-size: 0.14rem;
          margin-left: 0.16rem;
          margin-top: 0.02rem;
        }
        .caseTime {
          margin-left: 0.16rem;
          margin-top: 0.15rem;
        }
        .review {
          margin-left: 0.16rem;
          margin-top: 0.3rem;
          height: 3.39rem;
          background-color: #f2f9ff;
          padding-top: 0.1rem;
          padding-left: 0.2rem;
          font-size: 0.14rem;
          img {
            margin-top: 0.2rem;
            margin-left: 0;
          }
          p {
            margin-top: 0.1rem;
          }
          .reviewTime {
            margin-top: 0.2rem;
          }
        }
      }
      .createTime {
        margin-left: 0.16rem;
        margin-top: 0.25rem;
      }
    }
    .right {
      position: absolute;
      width: 50%;
      right: 0;
      top: 1.8rem;
      .liuCheng {
        .rightInfo {
          margin-left: 0.18rem;
          margin-top: 0.15rem;
          ul {
            li {
              width: 100%;
              height: 0.56rem;
              font-size: 0.12rem;
              .rightLine {
                width: 0.12rem;
                float: left;
                .yuan {
                  width: 0.1rem;
                  height: 0.1rem;
                  background-color: #24e874;
                  border-radius: 50%;
                }
                .line {
                  width: 0.02rem;
                  height: 0.46rem;
                  background-color: #24e874;
                  margin-left: 0.04rem;
                }
              }
              .rightText {
                float: left;
                margin-left: 0.1rem;
                transform: translateY(-0.05rem);
              }
              .rightStatus {
                color: #24e874;
                float: right;
                margin-right: 0.2rem;
                margin-top: 0.1rem;
                font-size: 0.14rem;
              }
            }
          }
        }
      }
      .person {
        margin-top: 0.3rem;
        p {
          font-size: 0.12rem;
          margin-top: 0.15rem;
          margin-left: 0.16rem;
        }
      }
    }
    .title {
      font-size: 0.16rem;
      font-weight: 600;
      .shu {
        display: inline-block;
        width: 0.03rem;
        height: 0.13rem;
        background-color: #0090ff;
      }
      .text {
        margin-left: 0.16rem;
      }
    }
    .listInfo {
      margin-left: 0.16rem;
      margin-top: 0.15rem;
      ul {
        li {
          color: #b3b3b3;
          font-size: 0.14rem;
          margin-top: 0.05rem;
          span {
            color: #4a4a4a;
          }
        }
      }
    }
    img {
      margin-left: 0.16rem;
      width: 1.35rem;
      height: 1.35rem;
      margin-top: 0.3rem;
    }
  }
}
</style>

