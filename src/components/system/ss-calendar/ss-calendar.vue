<template>
  <div class="calendar__wrap">
    <div class="header">
      <div class="current-date">{{currentDate}}</div>
      <!-- <div class="current-date">七月上工情况</div> -->
    </div>
    <div class="body">
      <div class="weeks">
        <div class="week__item" v-for="week in weeks" :key="week">{{week}}</div>
      </div>
      <div class="day__list">
        <div class="day__item" v-for="(item,index) in dateData" :key="index">
          <span class="checked" v-if="item==='checked'">√</span>
          <span :class="{current:item===day}" v-else>{{item}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      checks: {
        type: Array,
        // default () {
        //   return []
        // }
      }
    },
    data() {
      // 获取当前的时间
      const {
        year,
        month,
        day
      } = this.getDate()
      const dateData = this.getDateData(year, month)
      return {
        year,
        month,
        day,
        dateData,
        weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      }
    },
    computed: {
      currentDate() {
        return `${this.year}-${this.format(this.month)}`
      }
    },
    watch: {
      checks(val) {
        const {
          year,
          month
        } = this.getDate()
        const dateData = this.getDateData(year, month)
        this.dateData = dateData
      }
    },
    methods: {
      // 获取当前时间或指定时间的年月日
      getDate(current) {
        const date = current ? new Date(current) : new Date()
        const year = date.getFullYear()
        // 一月是0，所以要+1
        const month = date.getMonth() + 1
        const day = date.getDate()
        return {
          year,
          month,
          day
        }
      },

      // 获取每月天数数组，之前的空格会push空
      getDateData(year, month) {
        const date = new Date(`${year}/${month}/1`)
        // 获取date的那一天是周几，周天返回0，手动判断
        const firstDayWeek = date.getDay()
        const emptyStrNum = firstDayWeek > 0 ? firstDayWeek : 7
        const data = [...this.getEmptys(emptyStrNum), ...this.getDays()]
        return data
      },

      // 按照每月第一天是周几，给前面的数据push空，并返回空数组
      getEmptys(count) {
        let arr = []
        for (let i = 0; i < count; i++) {
          arr.push('')
        }
        return arr
      },

      // 计算当月的天数
      getLastDay() {
        // 获取当前月份年份
        let {
          year,
          month
        } = this.getDate()
        // 获取下一个月
        month += 1
        if (month > 12) {
          year += 1
          month = 1
        }
        // 根据下月1日的毫秒数减一天，算出当月有多少天
        let firstDayTimeStamp = new Date(`${year}/${month}/1`).getTime()
        let oneDayTimeStamp = 24 * 60 * 60 * 1000
        let lastDay = new Date(firstDayTimeStamp - oneDayTimeStamp).getDate()
        return lastDay

      },

      // 获取当月日期数组，并筛选传入的日期
      getDays() {
        const lastDay = this.getLastDay()
        const days = []
        for (let i = 1; i <= lastDay; i++) {
          // includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
          days.push(this.checks.includes(i) ? 'checked' : i)
        }
        return days
      },

      // 小于10的话，补零
      format(num) {
        return num < 10 ? `0${num}` : num
      }
    }
  }
</script>

<style lang="less" scoped>
  .calendar__wrap {
    background-color: #fff;
    color: #555555;
    width: 3rem;
    margin-left: .5rem;
    .header {
      padding: 0 .12rem;
      .current-date {
        text-align: center;
        font-size: .2rem;
        padding: .2rem 0;
      }
    }
    .body {
      .weeks {
        display: flex;
        font-size: .15rem;
        padding: .0rem 0;
        .week__item {
          flex: 1;
          text-align: center;
        }
      }
      .day__list {
        display: flex;
        flex-wrap: wrap;
        .day__item {
          display: flex;
          justify-content: center;
          width: 13.285%;
          text-align: center;
          padding: .05rem 0;
          font-size: .2rem;
          .checked,
          .current {
            display: flex;
            align-items: center;
            justify-content: center;
            width: .28rem;
            height: .28rem;
            border-radius: 100%;
            padding: .06rem;
            box-sizing: border-box;
            background-color: #3f9dff;
            color: #fff;
            font-size: .14rem;
          }
        }
      }
    }
  }
</style>
