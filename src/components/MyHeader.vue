<template>
    <div id="myHeader">
        <div id="headerBlock">
            <div class="contentBox">
                <span>
                    <router-link to="/">點餐</router-link>
                </span>
                <span>
                    <router-link to="/orderCar">
                        <el-badge :hidden="orderData.length === 0" :value="orderData.length">
                            購物車
                        </el-badge>
                    </router-link>
                </span>
                <!-- <span>
                    <router-link to="/orderList">訂單</router-link>
                </span> -->
            </div>
            <div class="contentBox" id="headerLogo">
                <img src="@/assets/image/logo.png" alt="" />
            </div>
            <div class="contentBox">
                <span @click="isShowNav = !isShowNav">
                    <img src="@/assets/image/navbar.png" alt="" />
                </span>
                <transition name="fade">
                    <div v-show="isShowNav" @click="isShowNav = false" class="backBg"></div>
                </transition>
                <transition name="slide">
                    <div v-show="isShowNav" class="mobile_navbar">
                        <p @click="isShowNav = false">
                            <router-link to="/">點餐</router-link>
                        </p>
                        <p @click="isShowNav = false">
                            <router-link to="/orderCar">
                                <el-badge :hidden="orderData.length === 0" :value="orderData.length">
                                    購物車
                                </el-badge>
                            </router-link>
                        </p>
                        <!-- <p @click="isShowNav = false">
                            <router-link to="/orderList">訂單</router-link>
                        </p> -->
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
export default {
    name: "MyHeader",
    setup() {
        let isShowNav = ref(false);
        return { isShowNav }
    },
    computed: {
        orderData() {
            return this.$store.state.userOrder;
        },
    },
    mounted() {
    },
};
</script>

<style lang="scss" scoped>
#myHeader {
    position: fixed;
    top: 0;
    left: 0;
    padding: 0 40px;
    width: 100%;
    height: 80px;
    background: #fff;
    z-index: 99;
    box-shadow: 0px 5px 5px -5px rgba(116, 116, 116, 1);
    @media (max-width: $mediumSizeView) {
        padding: 0 20px;
        height: 55px;
    }
    > #headerBlock {
        width: 100%;
        height: 100%;
        position: relative;
        > .contentBox {
            a {
                display: inline-block;
                font-size: $titleFontSize;
                padding: 10px;
                font-weight: bold;
                color: #111;
                text-decoration: none;
                &.active {
                    color: #111;
                }
                &:hover {
                    background-color: $mainColor;
                    border-radius: 8px;
                }
            }
            &:nth-of-type(1) {
                @media (max-width: $mediumSizeView) {
                    display: none;
                }
                position: absolute;
                top: 50%;
                left: 0;
                transform: translate(0, -50%);
                display: flex;
                align-items: center;
            }
            &:nth-of-type(2) {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                > img {
                    height: 70px;
                    object-fit: cover;
                    object-position: center;
                    @media (max-width: $mediumSizeView) {
                        height: 45px;
                    }
                }
            }

            &:nth-of-type(3) {
                display: none;
                position: absolute;
                top: 50%;
                right: 0;
                transform: translate(0, -50%);
                text-align: end;
                img {
                    height: 36px;
                    object-fit: cover;
                    object-position: center;
                }
                .backBg {
                    position: absolute;
                    top: -10px;
                    right: -20px;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.5);
                }
                .mobile_navbar {
                    width: 200px;
                    height: 100vh;
                    position: absolute;
                    top: -10px;
                    right: -20px;
                    background: #fff;
                    p {
                        // height: 50px;
                        width: 100%;
                        text-align: center;
                        margin: 0;
                        border-bottom: #777 1px solid;
                    }
                    a {
                        display: inline-block;
                        padding: 10px;
                        width: 100%;
                        font-size: $titleFontSize;
                        font-weight: bold;
                        color: #111;
                        text-decoration: none;
                        &.active {
                            color: #111;
                        }
                        &:hover {
                            background-color: $mainColor;
                        }
                    }
                }
                @media (max-width: $mediumSizeView) {
                    display: block;
                }
            }
        }
    }
}
::v-deep .el-badge__content.is-fixed {
    // top: 10px;
    // right: 20px;
}

.slide-leave-active,
.slide-enter-active {
    transition: all 0.3s ease;
}
.slide-enter-from {
    transform: translateX(200%);
}
.slide-leave-to {
    transform: translateX(100%);
}

.fade-leave-active,
.fade-enter-active {
    transition: all 0.3s ease;
}
.fade-enter-from {
    opacity: 0;
}
.fade-leave-to {
    opacity: 1;
}
</style>