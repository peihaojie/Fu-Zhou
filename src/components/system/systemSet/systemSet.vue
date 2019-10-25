<template>
    <div id="systemSet">
        <!-- 阴影框 -->
        <div class="shadow-box"></div>
        <!-- 侧导航栏 -->
        <div class="side-nav">
            <ul>
                <li class="button">
                    <router-link to="/systemHome" class="return" v-show="retractState"></router-link>
                    <a class="retract" @click="retractClick"></a>
                </li>
                <li @click="isActiveShow('/systemSet_workAreaSet')">
                    <router-link
                    to="/systemSet_workAreaSet"
                    :class="activeShow=='/systemSet_workAreaSet'||activeShow=='/systemSet'?'active':''">
                        <div class="icon"></div>
                        <span>工区设置</span>
                    </router-link>
                </li>
                <li @click="isActiveShow('/systemSet_equipmentSet')">
                    <router-link to="/systemSet_equipmentSet" :class="activeShow.includes('/systemSet_equipmentSet')?'active':''">
                        <div class="icon"></div>
                        <span>设备设置</span>
                    </router-link>
                </li>
                <li @click="permissionClick">
                    <a :class="activeShow.includes('/systemSet_permission')?'active':''">
                        <div class="icon"></div>
                        <span>权限设置</span>
                    </a>
                </li>
                <li>
                    <a>
                        <div class="icon"></div>
                        <span>操作日志</span>
                    </a>
                </li>
            </ul>
        </div>
        <!-- 权限设置侧拉框 -->
        <div class="permission-nav" v-show="permissionShow">
            <div class="triangle"></div>
            <div class="nav-box">
                <ul>
                    <li @click="isActiveShow('/systemSet_permission_user')"> 
                        <router-link to="/systemSet_permission_user">用户管理</router-link>
                    </li>
                    <li @click="isActiveShow('/systemSet_permission_role')">
                        <router-link to="/systemSet_permission_role">角色管理</router-link>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 内容 -->
        <router-view class="router-box"></router-view>
    </div>
</template>

<style lang="less">
#systemSet {
    width: 100%;
    height: 100%;
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
                    // background-color: #fff;
                    transform: translateY(-50%);
                    background-repeat: no-repeat;
                    background-position: center center;
                }
                a:hover {
                    background-color: #2d83bb;
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
    .permission-nav {
        position: absolute;
        left: 1.65rem;
        .triangle {
            position: absolute;
            top: 1.98rem;
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
            top: 1.65rem;
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
        padding-right: 0.2rem;
    }
}
</style>

<script>
export default {
    data() {
        return {
            retractState: true, // 侧导航栏缩进状态
            activeShow: "/systemSet_workAreaSet", // 当前选中的模块
            permissionShow: false, // 权限设置侧拉框状态
        }
    },
    created() {
        this.getPath();
    },
    methods: {
        // 侧导航栏缩进
        retractClick() {
            if (this.retractState) {
                $(".side-nav").animate({
                    width: ".6rem"
                },500);
                $(".retract").animate({
                    right: "1.35rem"
                });
                $(".sanjiao").animate({
                    left: "0.5rem"
                });
                $(".subnav").animate({
                    left: "0.6rem"
                });

              this.retractState = !this.retractState;
            } else {
                $(".side-nav").animate({
                    width: "1.75rem"
                },500)
                $(".sanjiao").animate({
                    left: "1.65rem"
                })
                $(".subnav").animate({
                    left: "1.75rem"
                })

                $(".retract").animate({
                    right: ".4rem"
                })
                this.retractState = !this.retractState;
            }
        },

        // 选择模块
        isActiveShow(i) {
            this.activeShow = i
            this.permissionShow = false
        },

        // 页面刷新时重新赋值
        getPath() {
            this.activeShow = this.$route.path;
        },

        // 权限设置侧拉框
        permissionClick() {
            this.permissionShow = !this.permissionShow
        },
    }
}
</script>