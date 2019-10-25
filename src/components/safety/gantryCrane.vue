<template>
  <div id="towerCrane">
    <div class="content">
      <div class="content-box">
        <div class="top-box">
          <div class="status">
            <span class="normal">正常运行</span>
          </div>
          <div class="employee">
            <span class="bolder">操作员</span>
            <span>张士明</span>
            <span class="bolder">上班时间</span>
            <span>06:31</span>
          </div>
          <img
            src="http://hujiang.oss-cn-shenzhen.aliyuncs.com/a7c83e09-f939-4791-bb70-9b2145580936.jpg"
            alt
            class="pic"
          />
        </div>
        <div class="bottom-box">
          <div class="name">
            <span class="bolder">架桥机一号机</span>
          </div>
          <div class="top-data">
            <div class="top-left">
              <p class="warning">额定重量</p>
              <span>50t</span>
            </div>
            <div class="middle">
              <div class="middle-img">
                <span style="font-size:.24rem">30t</span>
              </div>
              <span>重量</span>
            </div>
            <div class="top-right">
              <p class="warning">起重循环</p>
              <span>66次</span>
            </div>
          </div>
          <div class="bottom-data">
            <ul>
              <li>
                <img src="../../../static/images/s_altitude.png" alt />
                <div>
                  <p class="warning">高度</p>
                  <p>22m</p>
                </div>
              </li>
              <li>
                <img src="../../../static/images/s_wind-speed.png" alt />
                <div>
                  <p class="warning">风速</p>
                  <p>1.8m</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="real-time">
            <div class="title">实时数据</div>
            <div class="main">
              <ul>
                <li>
                  <!-- <span>时间</span> -->
                  <span>重量</span>
                  <span>额定重量</span>
                  <span>角度</span>
                  <span>幅度</span>
                  <span>高度</span>
                  <span>倍率</span>
                  <span>风级</span>
                  <span>风速</span>
                </li>
                <li>
                  <!-- <span>16:10</span> -->
                  <span>12</span>
                  <span>50</span>
                  <span>54.9</span>
                  <span>27.5</span>
                  <span>0</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0.84</span>
                </li>
                <li>
                  <!-- <span>16:20</span> -->
                  <span>0</span>
                  <span>50</span>
                  <span>64.9</span>
                  <span>17.5</span>
                  <span>0</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0.64</span>
                </li>
                <li>
                  <!-- <span>16:30</span> -->
                  <span>30</span>
                  <span>50</span>
                  <span>24.6</span>
                  <span>15.2</span>
                  <span>0</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0.44</span>
                </li>
                <li>
                  <!-- <span>16:40</span> -->
                  <span>30</span>
                  <span>50</span>
                  <span>12.2</span>
                  <span>6.4</span>
                  <span>0</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0.19</span>
                </li>
                <li>
                  <!-- <span>16:50</span> -->
                  <span>0</span>
                  <span>50</span>
                  <span>47.9</span>
                  <span>22.2</span>
                  <span>0</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0.66</span>
                </li>
                <li>
                  <!-- <span>17:00</span> -->
                  <span>0</span>
                  <span>50</span>
                  <span>29.4</span>
                  <span>57.2</span>
                  <span>0</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0.82</span>
                </li>
                <li>
                  <!-- <span>17:10</span> -->
                  <span>22</span>
                  <span>50</span>
                  <span>54.9</span>
                  <span>27.5</span>
                  <span>0</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0.38</span>
                </li>
              </ul>
            </div>
            <!-- <div class="history">
                            历史数据查询
            </div>-->
          </div>
          <div class="day">
            <span class="bolder">检修倒计时：</span>
            <span class="bolder normal">65天</span>
          </div>
        </div>
      </div>
      <!-- <div class="content-box">
        <div class="top-box">
          <div class="status">
            <span class="normal">正常运行</span>
          </div>
          <div class="employee">
            <span class="bolder">操作员</span>
            <span>王砚哲</span>
            <span class="bolder">上班时间</span>
            <span>07:11</span>
          </div>
          <img
            src="http://hujiang.oss-cn-shenzhen.aliyuncs.com/9e98d8ca-9685-4291-a229-6041dd6d24ac.jpg"
            alt
            class="pic"
          />
        </div>
        <div class="bottom-box">
          <div class="name">
            <span class="bolder">龙门吊二号机</span>
          </div>
          <div class="top-data">
            <div class="top-left">
              <p class="warning">额定重量</p>
              <span>50t</span>
            </div>
            <div class="middle">
              <div class="middle-img">
                <span style="font-size:.24rem">11t</span>
              </div>
              <span>重量</span>
            </div>
            <div class="top-right">
              <p class="warning">起重循环</p>
              <span>23次</span>
            </div>
          </div>
          <div class="bottom-data">
            <ul>
              <li>
                <img src="../../../static/images/s_altitude.png" alt />
                <div>
                  <p class="warning">高度</p>
                  <p>31m</p>
                </div>
              </li>
              <li>
                <img src="../../../static/images/s_wind-speed.png" alt />
                <div>
                  <p class="warning">风速</p>
                  <p>6.5m</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="real-time">
            <div class="title">实时数据</div>
            <div class="main">
              <ul>
                <li>
                  <span>重量</span>
                  <span>额定重量</span>
                  <span>角度</span>
                  <span>幅度</span>
                  <span>高度</span>
                  <span>倍率</span>
                  <span>风级</span>
                  <span>风速</span>
                </li>
                <li>
                  <span>30</span>
                  <span>50</span>
                  <span>24.6</span>
                  <span>15.2</span>
                  <span>0</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0.44</span>
                </li>
                <li>
                  <span>30</span>
                  <span>50</span>
                  <span>12.2</span>
                  <span>6.4</span>
                  <span>0</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0.19</span>
                </li>
                <li>
                  <span>0</span>
                  <span>24.6</span>
                  <span>54.9</span>
                  <span>27.5</span>
                  <span>0</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0.84</span>
                </li>
                <li>
                  <span>0</span>
                  <span>50</span>
                  <span>64.9</span>
                  <span>17.5</span>
                  <span>0</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0.64</span>
                </li>
                <li>
                  <span>12</span>
                  <span>50</span>
                  <span>54.9</span>
                  <span>27.5</span>
                  <span>0</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0.84</span>
                </li>
                <li>
                  <span>22</span>
                  <span>50</span>
                  <span>54.9</span>
                  <span>27.5</span>
                  <span>0</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0.38</span>
                </li>
                <li>
                  <span>0</span>
                  <span>50</span>
                  <span>29.4</span>
                  <span>57.2</span>
                  <span>0</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0.82</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="day">
            <span class="bolder">检修倒计时：</span>
            <span class="bolder normal">65天</span>
          </div>
        </div>
      </div>
      <div class="content-box">
        <div class="top-box">
          <div class="status">
            <span class="normal">正常运行</span>
          </div>
          <div class="employee">
            <span class="bolder">操作员</span>
            <span>董朝华</span>
            <span class="bolder">上班时间</span>
            <span>07:29</span>
          </div>
          <img
            src="http://hujiang.oss-cn-shenzhen.aliyuncs.com/65187012-5cac-4c56-ae6c-fcdf08bd120f.jpg"
            alt
            class="pic"
          />
        </div>
        <div class="bottom-box">
          <div class="name">
            <span class="bolder">龙门吊三号机</span>
          </div>
          <div class="top-data">
            <div class="top-left">
              <p class="warning">额定重量</p>
              <span>50t</span>
            </div>
            <div class="middle">
              <div class="middle-img">
                <span style="font-size:.24rem">34t</span>
              </div>
              <span>重量</span>
            </div>
            <div class="top-right">
              <p class="warning">起重循环</p>
              <span>11次</span>
            </div>
          </div>
          <div class="bottom-data">
            <ul>
              <li>
                <img src="../../../static/images/s_altitude.png" alt />
                <div>
                  <p class="warning">高度</p>
                  <p>15m</p>
                </div>
              </li>
              <li>
                <img src="../../../static/images/s_wind-speed.png" alt />
                <div>
                  <p class="warning">风速</p>
                  <p>1.5m</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="real-time">
            <div class="title">实时数据</div>
            <div class="main">
              <ul>
                <li>
                  <span>重量</span>
                  <span>额定重量</span>
                  <span>角度</span>
                  <span>幅度</span>
                  <span>高度</span>
                  <span>倍率</span>
                  <span>风级</span>
                  <span>风速</span>
                </li>
                <li>
                  <span>22</span>
                  <span>50</span>
                  <span>54.9</span>
                  <span>27.5</span>
                  <span>0</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0.38</span>
                </li>
                <li>
                  <span>0</span>
                  <span>50</span>
                  <span>47.9</span>
                  <span>22.2</span>
                  <span>0</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0.66</span>
                </li>
                <li>
                  <span>0</span>
                  <span>50</span>
                  <span>29.4</span>
                  <span>57.2</span>
                  <span>0</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0.82</span>
                </li>
                <li>
                  <span>30</span>
                  <span>50</span>
                  <span>12.2</span>
                  <span>6.4</span>
                  <span>0</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0.19</span>
                </li>
                <li>
                  <span>30</span>
                  <span>50</span>
                  <span>24.6</span>
                  <span>15.2</span>
                  <span>0</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0.44</span>
                </li>
                <li>
                  <span>12</span>
                  <span>50</span>
                  <span>54.9</span>
                  <span>27.5</span>
                  <span>0</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0.84</span>
                </li>
                <li>
                  <span>12</span>
                  <span>50</span>
                  <span>6.1</span>
                  <span>10.5</span>
                  <span>0</span>
                  <span>2</span>
                  <span>1</span>
                  <span>0.84</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="day">
            <span class="bolder">检修倒计时：</span>
            <span class="bolder normal">65天</span>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
span,
p {
  color: #fff;
}
#towercrane {
  display: flex;
}
.content {
  /* width: 30.5%; */
  /* margin-left: .4rem; */
  /* margin-top: .51rem; */
  display: flex;
  justify-content: space-between;
  /* overflow-x:scroll;
        overflow-y: hidden;
        width: 16.63rem;
        height: 9.41rem; */
  flex-wrap: wrap;
}
.bolder {
  font-weight: bolder;
}
.anomaly {
  color: #fb497c;
}
.normal {
  color: #24e974;
}
.warning {
  color: #ff731c;
}
/* 上部盒子样式 */
.top-box {
  height: 1.61rem;
  width: 5.3rem;
  background-image: url("../../../static/images/s_top-box.png");
  background-size: contain;
  display: flex;
}
.status {
  display: inline-block;
  background-image: url("../../../static/images/s_status-background.png");
  background-repeat: no-repeat;
  background-position: center center;
  height: 1.57rem;
  width: 1.57rem;
  text-align: center;
  line-height: 1.57rem;
}
.status > span {
  font-size: 0.24rem;
  font-weight: bolder;
}
.pic {
  padding: 0.16rem;
  height: 1.61rem;
  width: 1.46rem;
}
.employee {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  padding-top: 0.29rem;
  padding-bottom: 0.29rem;
}
.employee span {
  text-align: center;
  width: 50%;
  color: #fff;
  font-size: 0.2rem;
  line-height: 0.5rem;
}
.employee .bolder {
  text-align: right;
}
/* 下部盒子样式 */
.bottom-box {
  height: 7.4rem;
  width: 5.3rem;
  background-image: url("../../../static/images/s_bottom-box.png");
  background-size: contain;
  margin-top: 0.4rem;
}
.bottom-box .name {
  height: 0.6rem;
}
.bottom-box .name > span {
  line-height: 0.8rem;
  font-size: 0.2rem;
  margin-left: 0.28rem;
}
.bottom-box .top-data {
  display: flex;
  height: 1.68rem;
}
.bottom-box .top-data > div {
  flex: 1;
  text-align: center;
}
.bottom-box .top-data .middle-img {
  height: 1.44rem;
  width: 1.44rem;
  background-image: url("../../../static/images/s_torque.png");
  background-size: contain;
  line-height: 1.44rem;
  margin-left: 50%;
  transform: translate(-50%);
}
.bottom-box .top-data > div > p {
  font-size: 0.18rem;
  margin-top: 0.6rem;
  margin-bottom: 0.12rem;
}
.bottom-box .top-data > div > span {
  font-size: 0.18rem;
}
.bottom-box .bottom-data {
  height: 1rem;
}
.bottom-box .bottom-data ul {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.bottom-box .bottom-data li {
  width: 50%;
}
.bottom-box .bottom-data li img {
  display: inline-block;
  line-height: 1.22rem;
  margin-left: 0.92rem;
  vertical-align: top;
  margin-top: 0.35rem;
}
.bottom-box .bottom-data li > div {
  display: inline-block;
  margin-top: 0.27rem;
  margin-left: 0.12rem;
}
.bottom-box .bottom-data li p {
  font-size: 0.18rem;
  line-height: 0.3rem;
}
.bottom-box .day {
  height: 0.3rem;
  text-align: center;
  margin-top: 0.2rem;
}
.bottom-box .day span {
  /* line-height: 1.27rem; */
  font-size: 0.28rem;
}
/* 实时数据样式 */
.bottom-box .real-time {
  height: 3.1rem;
}
.real-time .title {
  text-align: center;
  font-size: 0.2rem;
  font-weight: bolder;
  color: #fff;
}
.real-time .main {
  margin-top: 0.2rem;
}
.real-time .main ul {
  display: flex;
  flex-wrap: wrap;
}
.real-time .main ul li {
  width: 100%;
  padding: 0 0.3rem;
  display: flex;
  justify-content: space-between;
}
.real-time .main ul li span {
  font-size: 0.12rem;
  flex: 1;
  text-align: center;
}
.real-time .history {
  margin-top: 0.2rem;
  text-align: center;
  font-size: 0.18rem;
  color: #fff;
}
</style>

