<template>
    <div id="systemSet_workAreaSet">
        <div class="content-box">
            <!-- 头部 -->
            <div class="title">
                <div class="text">工区设置</div>
            </div>
            <!-- 功能 -->
            <div class="button">
                <a>
                    <i class="icon"></i>
                    添加工区
                </a>
            </div>
            <!-- 主体 -->
            <div class="main">
                <ul>
                    <!-- <li>
                        <div class="left-box">
                            <div class="name">
                                创新科技园
                            </div>
                            <div class="location">
                                <span>地址：</span>
                                深圳市宝安区创业路创新科技园
                            </div>
                            <div class="subcontract">
                                <span>所属分包：</span>
                                某某某分包公司
                            </div>
                        </div>
                        <div class="right-box">
                            <a>编辑</a>
                            <a>删除</a>
                        </div>
                    </li>
                    <li>
                        <div class="left-box">
                            <div class="name">
                                创新科技园
                            </div>
                            <div class="location">
                                <span>地址：</span>
                                深圳市宝安区创业路创新科技园
                            </div>
                            <div class="subcontract">
                                <span>所属分包：</span>
                                某某某分包公司
                            </div>
                        </div>
                        <div class="right-box">
                            <a>编辑</a>
                            <a>删除</a>
                        </div>
                    </li> -->
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    #systemSet_workAreaSet {
        width: 100%;
        .content-box {
            min-height: 7rem;
            border-radius: .04rem;
            background-color: #fff;
            box-shadow: 0 0 .5rem -.3rem #666;
            padding-left: .2rem;
            padding-bottom: .3rem;
            .title {
                height: 1.05rem;
                width: 98%;
                border-bottom: .35rem solid #c5e8ff;
                .text {
                    font-size: .24rem;
                    text-align: center;
                    line-height: .7rem;
                }
            }
            .button {
                width: 98%;
                height: .7rem;
                position: relative;
                a {
                    float: left;
                    height: .3rem;
                    color: #0090ff;
                    font-size: .14rem;
                    transition: all .5s;
                    line-height: .28rem;
                    border-radius: .02rem;
                    padding-right: .09rem;
                    border: .01rem solid #0090ff;
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    &:hover {
                        color: #fff;
                        background-color: #0090ff;
                        .icon {
                            background-image: url('../../../../static/images/system-newHover.png');
                        }
                    }
                    .icon {
                        width: .37rem;
                        height: .28rem;
                        transition: all .5s;
                        display: inline-block;
                        vertical-align: middle;
                        background-repeat: no-repeat;
                        background-position: center center;
                        background-image: url('../../../../static/images/system-new.png');
                    }
                }
            }
            .main {
                width: 98%;
                ul {
                    width: 100%;
                    li {
                        width: 100%;
                        height: 1.29rem;
                        padding-top: .05rem;
                        padding-left: .2rem;
                        margin-bottom: .2rem;
                        border: .01rem solid #c5e8ff;
                        .left-box {
                            float: left;
                            .name {
                                color: #4a4a4a;
                                font-size: .18rem;
                                font-weight: bolder;
                                line-height: .38rem;
                            }
                            .location,
                            .subcontract {
                                color: #4a4a4a;
                                font-size: .18rem;
                                line-height: .38rem;
                                span {
                                    color: #7b7b7b;
                                }
                            }
                        }
                        .right-box {
                            float: right;
                            a {
                                color: #0090ff;
                                font-size: .18rem;
                                margin-right: .3rem;
                                line-height: 1.21rem;
                            }
                        }
                    }
                }
            }
        }
    }
</style>

<script>
export default {
    data() {
        return {
            
        }
    }
}
</script>