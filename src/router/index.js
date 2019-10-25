import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// import axios from 'axios'
// 默认请求域名
// axios.defaults.baseURL = "http://gd.17hr.net:8018"
// axios.defaults.baseURL = "http://192.168.1.225:808"

// 本地
// axios.defaults.baseURL = "http://192.168.0.142:8989"
// axios.defaults.baseURL = "http://192.168.1.21:8080"
// 网络
// axios.defaults.baseURL = "https://javaj.work"
// axios.defaults.baseURL = "http://39.108.103.150:8989"
// axios.defaults.baseURL = "http://47.106.71.3:8080"
// axios.defaults.baseURL = "http://192.168.1.18:8080"
// axios.defaults.withCredentials=true //让ajax携带cookie
// axios.defaults.headers={'Access-Control-Allow-Credentials':true}
// axios.defaults.headers.post['Access-Control-Allow-Credentials']='/*'
// Vue.prototype.$axios = axios

// import home from '../components/home/home.vue'
// import green from '../components/green/green.vue'
// import labour from '../components/labour/labour.vue'
// import safety from '../components/safety/safety.vue'
// import towerCrane from '../components/safety/towerCrane.vue'
// import elevator from '../components/safety/elevator.vue'
// import car from '../components/safety/car.vue'
// import gantryCrane from '../components/safety/gantryCrane.vue'
// import unopen from '../components/unopen/unopen.vue'
// import engineering from '../components/engineering/engineering.vue'
// import monitoring from '../components/monitoring/monitoring.vue'
// import quality from '../components/quality/quality.vue'
// import schedule from '../components/schedule/schedule.vue'
// import loginOld from '../components/login/loginOld.vue'
import login from '../components/login/login.vue'
// import homePage from '../components/homePage/homePage.vue'
// import projectManagement from '../components/projectManagement/projectManagement.vue'
// import mapDemo from '../components/mapDemo/mapDemo.vue'
// import location from '../components/location/location.vue'
// import l_homePage from '../components/location/l_homePage.vue'
// import l_monitoring from '../components/location/l_monitoring.vue'
// import l_search from '../components/location/l_search.vue'
// import l_history from '../components/location/l_history.vue'
// import l_set from '../components/location/l_set.vue'
// import l_rail from '../components/location/l_rail.vue'
// import gas from '../components/safety/gas.vue'
// import q_statistics from '../components/quality/q_statistics.vue'
// import q_set from '../components/quality/q_set.vue'
// import q_record from '../components/quality/q_record.vue'
// import q_particulars from '../components/quality/q_particulars.vue'
// import q_infoParticulars from '../components/quality/q_infoParticulars.vue'
// import q_infopath from '../components/quality/q_infopath.vue'
// import g_particulars from '../components/green/g_particulars.vue'
// import g_electricity from '../components/green/g_electricity.vue'
// import information from '../components/information/information.vue'
// import workerHome from '../components/worker/workerHome.vue'
// import workerParticular from '../components/worker/workerParticular.vue'
// import dormitory from '../components/dormitory/dormitory.vue'
// import gongsiManagement from '../components/gongsiManagement/gongsiManagement.vue'
// import gongsiShouquan from '../components/gongsiManagement/gongsiShouquan.vue'
// import projectShezhi from '../components/projectManagement/projectShezhi.vue'
// import projectShouquan from '../components/projectManagement/projectShouquan.vue'
// import systemHome from '../components/system/systemHome.vue'
// import systemLiangZhi from '../components/system/systemLiangZhi/systemLiangZhi.vue'
// import systemLiangZhi_home from '../components/system/systemLiangZhi/systemLiangZhi_home.vue'
// import systemLiangZhi_contractors from '../components/system/systemLiangZhi/systemLiangZhi_contractors.vue'
// import gaoZhiMo from '../components/gaoZhiMo/gaoZhiMo.vue'
// import systemLiangZhi_team from '../components/system/systemLiangZhi/systemLiangZhi_team.vue'
// import systemLiangZhi_personnel from '../components/system/systemLiangZhi/systemLiangZhi_personnel.vue'
// import systemLiangZhi_fw_one from '../components/system/systemLiangZhi/systemLiangZhi_fw_one.vue'
// import systemLiangZhi_fw_two from '../components/system/systemLiangZhi/systemLiangZhi_fw_two.vue'
// import systemLiangZhi_fw_three from '../components/system/systemLiangZhi/systemLiangZhi_fw_three.vue'
// import systemLiangZhi_fw_four from '../components/system/systemLiangZhi/systemLiangZhi_fw_four.vue'
// import systemZhiHui from '../components/system/systemZhiHui/systemZhiHui.vue'
// import systemZhiHui_taDiao from '../components/system/systemZhiHui/systemZhiHui_taDiao.vue'
// import systemZhiHui_shengJiangJi from '../components/system/systemZhiHui/systemZhiHui_shengJiangJi.vue'
// import systemZhiHui_dianXiang from '../components/system/systemZhiHui/systemZhiHui_dianXiang.vue'
// import systemZhiHui_car from '../components/system/systemZhiHui/systemZhiHui_car.vue'
// import systemZhiHui_car_sub from '../components/system/systemZhiHui/systemZhiHui_car_sub'
// import systemLiangZhi_attendance from '../components/system/systemLiangZhi/systemLiangZhi_attendance.vue'
// import systemLiangZhi_exception from '../components/system/systemLiangZhi/systemLiangZhi_exception'
// import systemLiangZhi_blacklist from '../components/system/systemLiangZhi/systemLiangZhi_blacklist'
// import systemLiangZhi_equipment from '../components/system/systemLiangZhi/systemLiangZhi_equipment'
// import systemGreen from '../components/system/systemGreen/systemGreen.vue'
// import systemGreen_TSP from '../components/system/systemGreen/systemGreen_TSP.vue'
// import systemSet from '../components/system/systemSet/systemSet.vue'
// import systemSet_workAreaSet from '../components/system/systemSet/systemSet_workAreaSet.vue'
// import systemSet_equipmentSet from '../components/system/systemSet/systemSet_equipmentSet.vue'
// import systemSet_equipmentSet_location from '../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_location.vue'
// import systemSet_equipmentSet_towerCrane from '../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_towerCrane.vue'
// import systemSet_equipmentSet_elevator from '../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_elevator.vue'
// import systemSet_equipmentSet_electricityBox from '../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_electricityBox.vue'
// import systemSet_equipmentSet_car from '../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_car.vue'
// import systemSet_equipmentSet_camera from '../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_camera.vue'
// import systemSet_equipmentSet_quality from '../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_quality.vue'
// import systemSet_equipmentSet_safety from '../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_safety.vue'
// import systemSet_equipmentSet_TSP from '../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_TSP.vue'
// import systemSet_permission_user from '../components/system/systemSet/systemSet_permission_user.vue'
// import systemSet_permission_role from '../components/system/systemSet/systemSet_permission_role.vue'
// import systemMonitoring from '../components/system/systemMonitoring/systemMonitoring.vue'
// import systemQuality from '../components/system/systemQuality/systemQuality.vue'
// import systemQuality_home from '../components/system/systemQuality/systemQuality_home.vue'
// import systemQuality_record from '../components/system/systemQuality/systemQuality_record.vue'
// import systemQuality_recordInfo from '../components/system/systemQuality/systemQuality_recordInfo.vue'
// import systemQuality_manage from '../components/system/systemQuality/systemQuality_manage.vue'
// import systemQuality_manageInfo from '../components/system/systemQuality/systemQuality_manageInfo.vue'
// import systemPersonnel from '../components/system/systemPersonnel/systemPersonnel.vue'
// import systemLocation from '../components/system/systemPersonnel/systemLocation/systemLocation.vue'
// import systemLocation_home from '../components/system/systemPersonnel/systemLocation/systemLocation_home.vue'
// import systemLocation_search from '../components/system/systemPersonnel/systemLocation/systemLocation_search.vue'
// import systemLocation_history from '../components/system/systemPersonnel/systemLocation/systemLocation_history.vue'
// import systemSafety from '../components/system/systemSafety/systemSafety.vue'
// import systemSafety_home from '../components/system/systemSafety/systemSafety_home.vue'
// import systemSafety_record from '../components/system/systemSafety/systemSafety_record.vue'
// import systemSafety_recordInfo from '../components/system/systemSafety/systemSafety_recordInfo.vue'
// import systemSafety_manage from '../components/system/systemSafety/systemSafety_manage.vue'
// import systemSafety_manageInfo from '../components/system/systemSafety/systemSafety_manageInfo'
// import companyGuanLi from '../components/company/companyGuanLi/companyGuanLi.vue'
// import companyGuanLi_set from '../components/company/companyGuanLi/companyGuanLi_set.vue'
// import companyGuanLi_user from '../components/company/companyGuanLi/companyGuanLi_user.vue'
// import companyGuanLi_role from '../components/company/companyGuanLi/companyGuanLi_role.vue'
// import projectGuanLi from '../components/company/projectGuanLi/projectGuanLi.vue'
// import projectGuanLi_set from '../components/company/projectGuanLi/projectGuanLi_set.vue'
// import projectGuanLi_user from '../components/company/projectGuanLi/projectGuanLi_user.vue'

const router = new VueRouter({

    // 需要路由拦截
    // routes:[
    //     // 看板页面
        // {path:'/login',component:login},
    //     {path:'/loginOld',component:loginOld},
    //     {path:'/',redirect:'/login'},
    //     {path:'/md',meta:{needLogin:true},component:mapDemo},
    //     {path:'/projectManagement',meta:{needLogin:true},component:projectManagement},
    //     {path:'/homePage',meta:{needLogin:true},component:homePage},
    //     {path:'/home',meta:{needLogin:true},component:home},
    //     {path:'/green',meta:{needLogin:true},component:green},
    //     {path:'/green/g_particulars',component:g_particulars},
    //     {path:'/green/g_electricity',component:g_electricity},
    //     {path:'/labour',meta:{needLogin:true},component:labour},        
    //     {path:'/unopen',meta:{needLogin:true},component:unopen},
    //     {path:'/monitoring',meta:{needLogin:true},component:monitoring},
    //     {path:'/information',meta:{needLogin:true},component:information},
    //     // {path:'/quality',meta:{needLogin:true},component:quality},
    //     {path:'/schedule',meta:{needLogin:true},component:schedule},
    //     {path:'/safety',meta:{needLogin:true},component:safety,children:[
    //         {path:"",meta:{needLogin:true},component:elevator},
    //         {path:"towerCrane",meta:{needLogin:true},component:towerCrane},
    //         {path:"elevator",meta:{needLogin:true},component:elevator},
    //         {path:"car",meta:{needLogin:true},component:car},
    //         {path:"gantryCrane",meta:{needLogin:true},component:gantryCrane},
    //         {path:"gas",meta:{needLogin:true},component:gas},
    //     ]},
    //     {path:'/location',meta:{needLogin:true},component:location,children:[
    //         {path:"",meta:{needLogin:true},component:l_homePage},
    //         {path:"l_homePage",meta:{needLogin:true},component:l_homePage},
    //         {path:"l_monitoring",meta:{needLogin:true},component:l_monitoring},
    //         {path:"l_search",meta:{needLogin:true},component:l_search},
    //         {path:"l_history",meta:{needLogin:true},component:l_history},
    //         {path:"l_set",meta:{needLogin:true},component:l_set},
    //         {path:"l_rail",meta:{needLogin:true},component:l_rail},
    //     ]},
    //     {path:'/quality',meta:{needLogin:true},component:quality,children:[
    //         {path:"",meta:{needLogin:true},component:q_statistics},
    //         {path:"q_statistics",meta:{needLogin:true},component:q_statistics},
    //         {path:"q_set",meta:{needLogin:true},component:q_set},
    //         {path:"q_record",meta:{needLogin:true},component:q_record},
    //         {path:"q_infopath",meta:{needLogin:true},component:q_infopath},
    //         {path:'q_infoParticulars',meta:{needLogin:true},component:q_infoParticulars},
    //     ]},
    //     {path:'/q_particulars',meta:{needLogin:true},component:q_particulars},
    //     {path:'/workerHome',meta:{needLogin:true},component:workerHome},
    //     {path:'/workerParticular',meta:{needLogin:true},component:workerParticular},
    //     {path:'/dormitory',meta:{needLogin:true},component:dormitory},
    //     {path:'/gongsiManagement',meta:{needLogin:true},component:gongsiManagement},
    //     {path:'/gongsiShouquan',meta:{needLogin:true},component:gongsiShouquan},
    //     {path:'/projectShezhi',meta:{needLogin:true},component:projectShezhi},
    //     {path:'/projectShouquan',meta:{needLogin:true},component:projectShouquan},
    //     {path:'/gaoZhiMo',meta:{needLogin:true},component:gaoZhiMo},
    //     {path:'/companyGuanLi',meta:{needLogin:true},component:companyGuanLi,children:[
    //         {path:'',meta:{needLogin:true},component:companyGuanLi_set},
    //         {path:'/companyGuanLi_set',meta:{needLogin:true},component:companyGuanLi_set},
    //         {path:'/companyGuanLi_user',meta:{needLogin:true},component:companyGuanLi_user},
    //         {path:'/companyGuanLi_role',meta:{needLogin:true},component:companyGuanLi_role}
    //     ]},
    //     {path:'/projectGuanLi',meta:{needLogin:true},component:projectGuanLi,children:[
    //         {path:'',meta:{needLogin:true},component:projectGuanLi_set},
    //         {path:'/projectGuanLi_set',meta:{needLogin:true},component:projectGuanLi_set},
    //         {path:'/projectGuanLi_user',meta:{needLogin:true},component:projectGuanLi_user}
    //     ]},

    //     // 后台管理系统页面
    //     {path:'/systemHome',meta:{needLogin:true},component:systemHome},
    //     {path:'/systemMonitoring',meta:{needLogin:true},component:systemMonitoring},
    //     {path:'/systemLiangZhi',meta:{needLogin:true},component:systemLiangZhi,children:[
    //         {path:'',meta:{needLogin:true},component:systemLiangZhi_home},
    //         {path:'/systemLiangZhi_home',meta:{needLogin:true},component:systemLiangZhi_home},
    //         {path:'/systemLiangZhi_contractors',meta:{needLogin:true},component:systemLiangZhi_contractors},
    //         {path:'/systemLiangZhi_team',meta:{needLogin:true},component:systemLiangZhi_team},
    //         {path:'/systemLiangZhi_personnel',meta:{needLogin:true},component:systemLiangZhi_personnel},
    //         {path:'/systemLiangZhi_attendance',meta:{needLogin:true},component:systemLiangZhi_attendance},
    //         {path:'/systemLiangZhi_exception',meta:{needLogin:true},component:systemLiangZhi_exception},
    //         {path:'/systemLiangZhi_blacklist',meta:{needLogin:true},component:systemLiangZhi_blacklist},
    //         {path:'/systemLiangZhi_equipment',meta:{needLogin:true},component:systemLiangZhi_equipment},
    //         {path:'/systemLiangZhi_fw_one',meta:{needLogin:true},component:systemLiangZhi_fw_one},
    //         {path:'/systemLiangZhi_fw_two',meta:{needLogin:true},component:systemLiangZhi_fw_two},
    //         {path:'/systemLiangZhi_fw_three',meta:{needLogin:true},component:systemLiangZhi_fw_three},
    //         {path:'/systemLiangZhi_fw_four',meta:{needLogin:true},component:systemLiangZhi_fw_four},
    //     ]},
    //     {path:'/systemZhiHui',meta:{needLogin:true},component:systemZhiHui,children:[
    //         {path:'',meta:{needLogin:true},component:systemZhiHui_taDiao},
    //         {path:'/systemZhiHui_taDiao',meta:{needLogin:true},component:systemZhiHui_taDiao},
    //         {path:'/systemZhiHui_shengJiangJi',meta:{needLogin:true},component:systemZhiHui_shengJiangJi},
    //         {path:'/systemZhiHui_dianXiang',meta:{needLogin:true},component:systemZhiHui_dianXiang},
    //         {path:'/systemZhiHui_car',meta:{needLogin:true},component:systemZhiHui_car},
    //         {path:'/systemZhiHui_car_sub',meta:{needLogin:true},component:systemZhiHui_car_sub},
    //     ]},
    //     {path:'/systemGreen',meta:{needLogin:true},component:systemGreen,children:[
    //         {path:'',meta:{needLogin:true},component:systemGreen_TSP},
    //         {path:'/systemGreen_TSP',meta:{needLogin:true},component:systemGreen_TSP},
    //     ]},
    //     {path:'/systemSet',meta:{needLogin:true},component:systemSet,children:[
    //         {path:'',meta:{needLogin:true},component:systemSet_workAreaSet},
    //         {path:'/systemSet_workAreaSet',meta:{needLogin:true},component:systemSet_workAreaSet},
    //         {path:'/systemSet_equipmentSet',meta:{needLogin:true},component:systemSet_equipmentSet},
    //         {path:'/systemSet_equipmentSet_location',meta:{needLogin:true},component:systemSet_equipmentSet_location},
    //         {path:'/systemSet_equipmentSet_towerCrane',meta:{needLogin:true},component:systemSet_equipmentSet_towerCrane},
    //         {path:'/systemSet_equipmentSet_elevator',meta:{needLogin:true},component:systemSet_equipmentSet_elevator},
    //         {path:'/systemSet_equipmentSet_electricityBox',meta:{needLogin:true},component:systemSet_equipmentSet_electricityBox},
    //         {path:'/systemSet_equipmentSet_car',meta:{needLogin:true},component:systemSet_equipmentSet_car},
    //         {path:'/systemSet_equipmentSet_camera',meta:{needLogin:true},component:systemSet_equipmentSet_camera},
    //         {path:'/systemSet_equipmentSet_TSP',meta:{needLogin:true},component:systemSet_equipmentSet_TSP},
    //         {path:'/systemSet_equipmentSet_quality',meta:{needLogin:true},component:systemSet_equipmentSet_quality},
    //         {path:'/systemSet_equipmentSet_safety',meta:{needLogin:true},component:systemSet_equipmentSet_safety},
    //         {path:'/systemSet_permission_user',meta:{needLogin:true},component:systemSet_permission_user},
    //         {path:'/systemSet_permission_role',meta:{needLogin:true},component:systemSet_permission_role},
    //     ]},
    //     {path:'/systemQuality',meta:{needLogin:true},component:systemQuality,children:[
    //         {path:'',meta:{needLogin:true},component:systemQuality_home},
    //         {path:'/systemQuality_home',meta:{needLogin:true},component:systemQuality_home},
    //         {path:'/systemQuality_record',meta:{needLogin:true},component:systemQuality_record},
    //         {path:'/systemQuality_recordInfo',meta:{needLogin:true},component:systemQuality_recordInfo},
    //         {path:'/systemQuality_manage',meta:{needLogin:true},component:systemQuality_manage},
    //         {path:'/systemQuality_manageInfo',meta:{needLogin:true},component:systemQuality_manageInfo},
    //     ]},
    //     {path:'/systemPersonnel',meta:{needLogin:true},component:systemPersonnel},
    //     {path:'/systemLocation',meta:{needLogin:true},component:systemLocation,children:[
    //         {path:'',meta:{needLogin:true},component:systemLocation_home},
    //         {path:'/systemLocation_home',meta:{needLogin:true},component:systemLocation_home},
    //         {path:'/systemLocation_search',meta:{needLogin:true},component:systemLocation_search},
    //         {path:'/systemLocation_history',meta:{needLogin:true},component:systemLocation_history},
    //     ]},
    //     {path:'/systemSafety',meta:{needLogin:true},component:systemSafety,children:[
    //         {path:'',meta:{needLogin:true},component:systemSafety_home},
    //         {path:'/systemSafety_home',meta:{needLogin:true},component:systemSafety_home},
    //         {path:'/systemSafety_record',meta:{needLogin:true},component:systemSafety_record},
    //         {path:'/systemSafety_recordInfo',meta:{needLogin:true},component:systemSafety_recordInfo},
    //         {path:'/systemSafety_manage',meta:{needLogin:true},component:systemSafety_manage},
    //         {path:'/systemSafety_manageInfo',meta:{needLogin:true},component:systemSafety_manageInfo},
    //     ]}
    // ]

    // 懒加载
    routes:[
        // 看板页面
        {path:'/login',component:login},
        {path:'/loginOld',component:resolve => require(['../components/login/loginOld.vue'],resolve)},
        {path:'/',redirect:'/login'},
        {path:'/projectManagement',meta:{needLogin:true},component:resolve => require(['../components/projectManagement/projectManagement.vue'],resolve)},
        {path:'/homePage',meta:{needLogin:true},component:resolve => require(['../components/homePage/homePage.vue'],resolve)},
        {path:'/home',meta:{needLogin:true},component:resolve => require(['../components/home/home.vue'],resolve)},
        {path:'/green',meta:{needLogin:true},component:resolve => require(['../components/green/green.vue'],resolve)},
        {path:'/green/g_particulars',component:resolve => require(['../components/green/g_particulars.vue'],resolve)},
        {path:'/green/g_electricity',component:resolve => require(['../components/green/g_electricity'],resolve)},
        {path:'/labour',meta:{needLogin:true},component:resolve => require(['../components/labour/labour.vue'],resolve)},        
        {path:'/unopen',meta:{needLogin:true},component:resolve => require(['../components/unopen/unopen.vue'],resolve)},
        {path:'/monitoring',meta:{needLogin:true},component:resolve => require(['../components/monitoring/monitoring.vue'],resolve)},
        {path:'/information',meta:{needLogin:true},component:resolve => require(['../components/information/information.vue'],resolve)},
        // {path:'/quality',meta:{needLogin:true},component:quality},
        {path:'/schedule',meta:{needLogin:true},component:resolve => require(['../components/schedule/schedule.vue'],resolve)},
        // 设备管理
        {path:'/safety',meta:{needLogin:true},component:resolve => require(['../components/safety/safety.vue'],resolve),children:[
            {path:"",meta:{needLogin:true},component:resolve => require(['../components/safety/gantryCrane.vue'],resolve)},
            {path:"towerCrane",meta:{needLogin:true},component:resolve => require(['../components/safety/towerCrane.vue'],resolve)},
            {path:"elevator",meta:{needLogin:true},component:resolve => require(['../components/safety/elevator.vue'],resolve)},
            {path:"car",meta:{needLogin:true},component:resolve => require(['../components/safety/car.vue'],resolve)},
            {path:"gantryCrane",meta:{needLogin:true},component:resolve => require(['../components/safety/gantryCrane.vue'],resolve)},
            {path:"gas",meta:{needLogin:true},component:resolve => require(['../components/safety/gas.vue'],resolve)},
        ]},
        // 人员定位
        {path:'/location',meta:{needLogin:true},component:resolve => require(['../components/location/location.vue'],resolve),children:[
            {path:"",meta:{needLogin:true},component:resolve => require(['../components/location/l_homePage.vue'],resolve)},
            {path:"l_homePage",meta:{needLogin:true},component:resolve => require(['../components/location/l_homePage.vue'],resolve)},
            {path:"l_monitoring",meta:{needLogin:true},component:resolve => require(['../components/location/l_monitoring.vue'],resolve)},
            {path:"l_search",meta:{needLogin:true},component:resolve => require(['../components/location/l_search.vue'],resolve)},
            {path:"l_history",meta:{needLogin:true},component:resolve => require(['../components/location/l_history.vue'],resolve)},
            {path:"l_set",meta:{needLogin:true},component:resolve => require(['../components/location/l_set.vue'],resolve)},
            {path:"l_rail",meta:{needLogin:true},component:resolve => require(['../components/location/l_rail.vue'],resolve)},
        ]},
        // 安全
        {path:'/quality',meta:{needLogin:true},component:resolve => require(['../components/quality/quality.vue'],resolve),children:[
            // 数据统计
            {path:"",meta:{needLogin:true},component:resolve => require(['../components/quality/q_statistics.vue'],resolve)},
            {path:"q_statistics",meta:{needLogin:true},component:resolve => require(['../components/quality/q_statistics.vue'],resolve)},
            {path:"q_set",meta:{needLogin:true},component:resolve => require(['../components/quality/q_set.vue'],resolve)},
            // 检查记录
            {path:"q_record",meta:{needLogin:true},component:resolve => require(['../components/quality/q_record.vue'],resolve)},
            {path:"q_infopath",meta:{needLogin:true},component:resolve => require(['../components/quality/q_infopath.vue'],resolve)},
            {path:'q_infoParticulars',meta:{needLogin:true},component:resolve => require(['../components/quality/q_infoParticulars.vue'],resolve)},
        ]},
        // 质量
        {path:'/kg',meta:{needLogin:true},component:resolve => require(['../components/kg/kg.vue'],resolve),children:[
            {path:"",meta:{needLogin:true},component:resolve => require(['../components/kg/kg_statistics.vue'],resolve)},
            {path:"kg_statistics",meta:{needLogin:true},component:resolve => require(['../components/kg/kg_statistics.vue'],resolve)},
            {path:"kg_record",meta:{needLogin:true},component:resolve => require(['../components/kg/kg_record.vue'],resolve)},
        ]},
        // 安全检查记录详情页
        {path:'/q_particulars',meta:{needLogin:true},component:resolve => require(['../components/quality/q_particulars.vue'],resolve)},
        // 质量检查记录详情页
        {path:'/kg_particulars',meta:{needLogin:true},component:resolve => require(['../components/kg/kg_particulars.vue'],resolve)},
        {path:'/workerHome',meta:{needLogin:true},component:resolve => require(['../components/worker/workerHome.vue'],resolve)},
        {path:'/workerParticular',meta:{needLogin:true},component:resolve => require(['../components/worker/workerParticular.vue'],resolve)},
        {path:'/dormitory',meta:{needLogin:true},component:resolve => require(['../components/dormitory/dormitory.vue'],resolve)},
        {path:'/gongsiManagement',meta:{needLogin:true},component:resolve => require(['../components/gongsiManagement/gongsiManagement.vue'],resolve)},
        {path:'/gongsiShouquan',meta:{needLogin:true},component:resolve => require(['../components/gongsiManagement/gongsiShouquan.vue'],resolve)},
        {path:'/projectShezhi',meta:{needLogin:true},component:resolve => require(['../components/projectManagement/projectShezhi.vue'],resolve)},
        {path:'/projectShouquan',meta:{needLogin:true},component:resolve => require(['../components/projectManagement/projectShouquan.vue'],resolve)},
        {path:'/gaoZhiMo',meta:{needLogin:true},component:resolve => require(['../components/gaoZhiMo/gaoZhiMo.vue'],resolve)},
        {path:'/shenJiKeng',meta:{needLogin:true},component:resolve => require(['../components/shenJiKeng/shenJiKeng.vue'],resolve)},
        {path:'/companyGuanLi',meta:{needLogin:true},component:resolve => require(['../components/company/companyGuanLi/companyGuanLi.vue'],resolve),children:[
            {path:'',meta:{needLogin:true},component:resolve => require(['../components/company/companyGuanLi/companyGuanLi_set.vue'],resolve)},
            {path:'/companyGuanLi_set',meta:{needLogin:true},component:resolve => require(['../components/company/companyGuanLi/companyGuanLi_set.vue'],resolve)},
            {path:'/companyGuanLi_user',meta:{needLogin:true},component:resolve => require(['../components/company/companyGuanLi/companyGuanLi_user.vue'],resolve)},
            {path:'/companyGuanLi_role',meta:{needLogin:true},component:resolve => require(['../components/company/companyGuanLi/companyGuanLi_role.vue'],resolve)}
        ]},
        {path:'/projectGuanLi',meta:{needLogin:true},component:resolve => require(['../components/company/projectGuanLi/projectGuanLi.vue'],resolve),children:[
            {path:'',meta:{needLogin:true},component:resolve => require(['../components/company/projectGuanLi/projectGuanLi_set.vue'],resolve)},
            {path:'/projectGuanLi_set',meta:{needLogin:true},component:resolve => require(['../components/company/projectGuanLi/projectGuanLi_set.vue'],resolve)},
            {path:'/projectGuanLi_user',meta:{needLogin:true},component:resolve => require(['../components/company/projectGuanLi/projectGuanLi_user.vue'],resolve)}
        ]},

        // 后台管理系统页面
        {path:'/spectaculars',meta:{needLogin:true},component:resolve => require(['../components/system/systemLiangZhi/spectaculars.vue'],resolve)},
        {path:'/systemHome',meta:{needLogin:true},component:resolve => require(['../components/system/systemHome.vue'],resolve)},
        {path:'/systemMonitoring',meta:{needLogin:true},component:resolve => require(['../components/system/systemMonitoring/systemMonitoring.vue'],resolve)},
        {path:'/systemInformation',meta:{needLogin:true},component:resolve => require(['../components/system/systemInformation/systemInformation.vue'],resolve)},
        {path:'/systemLiangZhi',meta:{needLogin:true},component:resolve => require(['../components/system/systemLiangZhi/systemLiangZhi.vue'],resolve),children:[
            {path:'',meta:{needLogin:true},component:resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_home.vue'],resolve)},
            {path:'/systemLiangZhi_home',meta:{needLogin:true},component:resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_home.vue'],resolve)},
            {path:'/systemLiangZhi_contractors',meta:{needLogin:true},component:resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_contractors.vue'],resolve)},
            {path:'/systemLiangZhi_team',meta:{needLogin:true},component:resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_team.vue'],resolve)},
            {path:'/systemLiangZhi_personnel',meta:{needLogin:true},component:resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_personnel.vue'],resolve)},
            {path:'/systemLiangZhi_attendance',meta:{needLogin:true},component:resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_attendance.vue'],resolve)},
            {path:'/systemLiangZhi_exception',meta:{needLogin:true},component:resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_exception'],resolve)},
            {path:'/systemLiangZhi_blacklist',meta:{needLogin:true},component:resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_blacklist'],resolve)},
            {path:'/systemLiangZhi_equipment',meta:{needLogin:true},component:resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_equipment'],resolve)},
            {path:'/systemLiangZhi_salary',meta:{needLogin:true},component:resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_salary'],resolve)},
            {path:'/systemLiangZhi_fw_one',meta:{needLogin:true},component:resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_fw_one.vue'],resolve)},
            {path:'/systemLiangZhi_fw_two',meta:{needLogin:true},component:resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_fw_two.vue'],resolve)},
            {path:'/systemLiangZhi_fw_three',meta:{needLogin:true},component:resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_fw_three.vue'],resolve)},
            {path:'/systemLiangZhi_fw_four',meta:{needLogin:true},component:resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_fw_four.vue'],resolve)},
            {path:'/systemLiangZhi_reward_category',meta:{needLogin:true},component:resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_reward_category.vue'],resolve)},
            {path:'/systemLiangZhi_reward_record',meta:{needLogin:true},component:resolve => require(['../components/system/systemLiangZhi/systemLiangZhi_reward_record.vue'],resolve)},
            {path:'/systemLuabfZhi_reward_inquire',meta:{needLogin:true},component:resolve => require(['../components/system/systemLiangZhi/systemLuabfZhi_reward_inquire.vue'],resolve)},
        ]},
        {path:'/systemZhiHui',meta:{needLogin:true},component:resolve => require(['../components/system/systemZhiHui/systemZhiHui.vue'],resolve),children:[
            {path:'',meta:{needLogin:true},component:resolve => require(['../components/system/systemZhiHui/systemZhiHui_taDiao.vue'],resolve)},
            {path:'/systemZhiHui_taDiao',meta:{needLogin:true},component:resolve => require(['../components/system/systemZhiHui/systemZhiHui_taDiao.vue'],resolve)},
            {path:'/systemZhiHui_shengJiangJi',meta:{needLogin:true},component:resolve => require(['../components/system/systemZhiHui/systemZhiHui_shengJiangJi.vue'],resolve)},
            {path:'/systemZhiHui_dianXiang',meta:{needLogin:true},component:resolve => require(['../components/system/systemZhiHui/systemZhiHui_dianXiang.vue'],resolve)},
            {path:'/systemZhiHui_car',meta:{needLogin:true},component:resolve => require(['../components/system/systemZhiHui/systemZhiHui_car.vue'],resolve)},
            {path:'/systemZhiHui_car_sub',meta:{needLogin:true},component:resolve => require(['../components/system/systemZhiHui/systemZhiHui_car_sub'],resolve)},
            {path:'/systemZhiHui_gas',meta:{needLogin:true},component:resolve => require(['../components/system/systemZhiHui/systemZhiHui_gas'],resolve)},
            {path:'/systemZhiHui_gaoZhiMo',meta:{needLogin:true},component:resolve => require(['../components/system/systemZhiHui/systemZhiHui_gaoZhiMo.vue'],resolve)},
            {path:'/systemZhiHui_shenJiKeng',meta:{needLogin:true},component:resolve => require(['../components/system/systemZhiHui/systemZhiHui_shenJiKeng.vue'],resolve)},
            {path:'/systemZhiHui_shuidian',meta:{needLogin:true},component:resolve => require(['../components/system/systemZhiHui/systemZhiHui_shuidian.vue'],resolve)},
            {path:'/systemZhiHui_unloading',meta:{needLogin:true},component:resolve => require(['../components/system/systemZhiHui/systemZhiHui_unloading.vue'],resolve)},
        ]},
        {path:'/systemGreen',meta:{needLogin:true},component:resolve => require(['../components/system/systemGreen/systemGreen.vue'],resolve),children:[
            {path:'',meta:{needLogin:true},component:resolve => require(['../components/system/systemGreen/systemGreen_TSP.vue'],resolve)},
            {path:'/systemGreen_TSP',meta:{needLogin:true},component:resolve => require(['../components/system/systemGreen/systemGreen_TSP.vue'],resolve)},
        ]},
        {path:'/systemSet',meta:{needLogin:true},component:resolve => require(['../components/system/systemSet/systemSet.vue'],resolve),children:[
            {path:'',meta:{needLogin:true},component:resolve => require(['../components/system/systemSet/systemSet_workAreaSet.vue'],resolve)},
            {path:'/systemSet_workAreaSet',meta:{needLogin:true},component:resolve => require(['../components/system/systemSet/systemSet_workAreaSet.vue'],resolve)},
            {path:'/systemSet_equipmentSet',meta:{needLogin:true},component:resolve => require(['../components/system/systemSet/systemSet_equipmentSet.vue'],resolve)},
            {path:'/systemSet_equipmentSet_location',meta:{needLogin:true},component:resolve => require(['../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_location.vue'],resolve)},
            {path:'/systemSet_equipmentSet_towerCrane',meta:{needLogin:true},component:resolve => require(['../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_towerCrane.vue'],resolve)},
            {path:'/systemSet_equipmentSet_elevator',meta:{needLogin:true},component:resolve => require(['../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_elevator.vue'],resolve)},
            {path:'/systemSet_equipmentSet_electricityBox',meta:{needLogin:true},component:resolve => require(['../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_electricityBox.vue'],resolve)},
            {path:'/systemSet_equipmentSet_car',meta:{needLogin:true},component:resolve => require(['../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_car.vue'],resolve)},
            {path:'/systemSet_equipmentSet_camera',meta:{needLogin:true},component:resolve => require(['../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_camera.vue'],resolve)},
            {path:'/systemSet_equipmentSet_TSP',meta:{needLogin:true},component:resolve => require(['../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_TSP.vue'],resolve)},
            {path:'/systemSet_equipmentSet_quality',meta:{needLogin:true},component:resolve => require(['../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_quality.vue'],resolve)},
            {path:'/systemSet_equipmentSet_safety',meta:{needLogin:true},component:resolve => require(['../components/system/systemSet/systemSet_equipmentSet/systemSet_equipmentSet_safety.vue'],resolve)},
            {path:'/systemSet_permission_user',meta:{needLogin:true},component:resolve => require(['../components/system/systemSet/systemSet_permission_user.vue'],resolve)},
            {path:'/systemSet_permission_role',meta:{needLogin:true},component:resolve => require(['../components/system/systemSet/systemSet_permission_role.vue'],resolve)},
        ]},
        {path:'/systemQuality',meta:{needLogin:true},component:resolve => require(['../components/system/systemQuality/systemQuality.vue'],resolve),children:[
            {path:'',meta:{needLogin:true},component:resolve => require(['../components/system/systemQuality/systemQuality_home.vue'],resolve)},
            {path:'/systemQuality_home',meta:{needLogin:true},component:resolve => require(['../components/system/systemQuality/systemQuality_home.vue'],resolve)},
            {path:'/systemQuality_record',meta:{needLogin:true},component:resolve => require(['../components/system/systemQuality/systemQuality_record.vue'],resolve)},
            {path:'/systemQuality_recordInfo',meta:{needLogin:true},component:resolve => require(['../components/system/systemQuality/systemQuality_recordInfo.vue'],resolve)},
            {path:'/systemQuality_manage',meta:{needLogin:true},component:resolve => require(['../components/system/systemQuality/systemQuality_manage.vue'],resolve)},
            {path:'/systemQuality_manageInfo',meta:{needLogin:true},component:resolve => require(['../components/system/systemQuality/systemQuality_manageInfo.vue'],resolve)},
        ]},
        {path:'/systemPersonnel',meta:{needLogin:true},component:resolve => require(['../components/system/systemPersonnel/systemPersonnel.vue'],resolve)},
        {path:'/systemLocation',meta:{needLogin:true},component:resolve => require(['../components/system/systemPersonnel/systemLocation/systemLocation.vue'],resolve),children:[
            {path:'',meta:{needLogin:true},component:resolve => require(['../components/system/systemPersonnel/systemLocation/systemLocation_home.vue'],resolve)},
            {path:'/systemLocation_home',meta:{needLogin:true},component:resolve => require(['../components/system/systemPersonnel/systemLocation/systemLocation_home.vue'],resolve)},
            {path:'/systemLocation_search',meta:{needLogin:true},component:resolve => require(['../components/system/systemPersonnel/systemLocation/systemLocation_search.vue'],resolve)},
            {path:'/systemLocation_history',meta:{needLogin:true},component:resolve => require(['../components/system/systemPersonnel/systemLocation/systemLocation_history.vue'],resolve)},
        ]},
        {path:'/systemSafety',meta:{needLogin:true},component:resolve => require(['../components/system/systemSafety/systemSafety.vue'],resolve),children:[
            {path:'',meta:{needLogin:true},component:resolve => require(['../components/system/systemSafety/systemSafety_home.vue'],resolve)},
            {path:'/systemSafety_home',meta:{needLogin:true},component:resolve => require(['../components/system/systemSafety/systemSafety_home.vue'],resolve)},
            {path:'/systemSafety_record',meta:{needLogin:true},component:resolve => require(['../components/system/systemSafety/systemSafety_record.vue'],resolve)},
            {path:'/systemSafety_recordInfo',meta:{needLogin:true},component:resolve => require(['../components/system/systemSafety/systemSafety_recordInfo.vue'],resolve)},
            {path:'/systemSafety_manage',meta:{needLogin:true},component:resolve => require(['../components/system/systemSafety/systemSafety_manage.vue'],resolve)},
            {path:'/systemSafety_manageInfo',meta:{needLogin:true},component:resolve => require(['../components/system/systemSafety/systemSafety_manageInfo'],resolve)},
        ]},
        {path:'/systemSchedule',meta:{needLogin:true},component:resolve => require(['../components/system/systemSchedule/systemSchedule.vue'],resolve),children:[
            {path:'',meta:{needLogin:true},component:resolve => require(['../components/system/systemSchedule/systemSchedule_home.vue'],resolve)},
            {path:'/systemSchedule_home',meta:{needLogin:true},component:resolve => require(['../components/system/systemSchedule/systemSchedule_home.vue'],resolve)},
            {path:'/systemSchedule_control',meta:{needLogin:true},component:resolve => require(['../components/system/systemSchedule/systemSchedule_control.vue'],resolve)},
            {path:'/systemSchedule_plan',meta:{needLogin:true},component:resolve => require(['../components/system/systemSchedule/systemSchedule_plan.vue'],resolve)},
        ]}
    ]

    // 不需要路由拦截
    // routes:[
    //     {path:'/login',component:login},
    //     {path:'/loginOld',component:loginOld},
    //     {path:'/',redirect:'/home'},
    //     {path:'/md',component:mapDemo},
    //     {path:'/projectManagement',component:projectManagement},
    //     {path:'/homePage',component:homePage},
    //     {path:'/home',component:home},
    //     {path:'/green',component:green},
    //     {path:'/green/g_particulars',component:g_particulars},
    //     {path:'/green/g_electricity',component:g_electricity},
    //     {path:'/labour',component:labour},        
    //     {path:'/unopen',component:unopen},
    //     {path:'/monitoring',component:monitoring},
    //     {path:'/information',component:information},
    //     // {path:'/quality',component:quality},
    //     {path:'/schedule',component:schedule},
    //     {path:'/safety',component:safety,children:[
    //         {path:"",component:elevator},
    //         {path:"towerCrane",component:towerCrane},
    //         {path:"elevator",component:elevator},
    //         {path:"car",component:car},
    //         {path:"gantryCrane",component:gantryCrane},
    //         {path:"gas",component:gas},
    //     ]},
    //     {path:'/location',component:location,children:[
    //         {path:"",component:l_homePage},
    //         {path:"l_homePage",component:l_homePage},
    //         {path:"l_monitoring",component:l_monitoring},
    //         {path:"l_search",component:l_search},
    //         {path:"l_history",component:l_history},
    //         {path:"l_set",component:l_set},
    //         {path:"l_rail",component:l_rail},
    //     ]},
    //     {path:'/quality',component:quality,children:[
    //         {path:"",component:q_statistics},
    //         {path:"q_statistics",component:q_statistics},
    //         {path:"q_set",component:q_set},
    //         {path:"q_record",component:q_record},
    //         {path:"q_infopath",component:q_infopath},
    //         {path:'q_infoParticulars',component:q_infoParticulars},
    //     ]},
    //     {path:'/q_particulars',component:q_particulars},
    //     {path:'/workerHome',component:workerHome},
    //     {path:'/workerParticular',component:workerParticular},
    //     {path:'/dormitory',component:dormitory},
    //     {path:'/gongsiManagement',component:gongsiManagement},
    //     {path:'/gongsiShouquan',component:gongsiShouquan},
    //     {path:'/projectShezhi',component:projectShezhi},
    //     {path:'/projectShouquan',component:projectShouquan},
    //     {path:'/gaoZhiMo',component:gaoZhiMo},
    // ]
})

router.beforeEach((to,from,next)=>{
    
    // 1.0
    // if (to.meta.needLogin) {
    //     const islogin = localStorage.getItem('islogin')
    //     if (islogin) {
    //         next()
    //     }else{
    //         next('/login')
    //     }
    // }else{
    //     next()
    // }

    // 2.0
    if (to.meta.needLogin) {
        const islogin = sessionStorage.getItem('islogin')
        // const islogin = localStorage.getItem('islogin')
        if (islogin) {
            next()
        }else{
            next('/login')
        }
    }else{
        next()
    }
})


export default router