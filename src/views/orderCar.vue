<template>
    <div id="orderList">
        <div id="orderDesc">
            <div class="fs-3">訂購資訊</div>
            <div class="py-3">
                <div class="fs-4"><span class="text-danger">✽</span> 取餐方式</div>
                <div class="my-1">
                    <span class="m-2">
                        <input type="radio" id="bySelf" class="btn-check" name="getStyle" value="自取" v-model="orderInfo.howToGet" @change="onChange" />
                        <label class="btn btn-outline-warning text-dark optionBtn optionBtn" for="bySelf">自取
                        </label>
                    </span>
                    <span class="m-2">
                        <input type="radio" id="byShop" class="btn-check" name="getStyle" value="外送" v-model="orderInfo.howToGet" @change="onChange" />
                        <label class="btn btn-outline-warning text-dark optionBtn optionBtn" for="byShop">外送
                        </label>
                    </span>
                </div>
            </div>
            <div class="py-3 border-top">
                <div class="fs-4"><span class="text-danger">✽</span> 聯絡人資訊</div>
                <label class="fs-5 my-1" for="buyerName">姓名</label>
                <input class="form-control form-control-sm optionText my-1" type="text" id="buyerName" v-model="orderInfo.contact_name" />
                <label class="fs-5 my-1" for="buyerPhone">手機電話</label>
                <input class="form-control form-control-sm optionText my-1" type="text" id="buyerPhone" v-model="orderInfo.contact_phone" @focusout="onFocusOut(orderInfo.contact_phone)" />
                <p class="textError" v-if="judgment.isTextError">號碼輸入錯誤</p>
            </div>
            <div class="py-2 border-top">
                <div class="fs-4"><span class="text-danger">✽</span> 結帳方式</div>
                <div class="my-1">
                    <input type="radio" id="byCash" class="btn-check" value="現金" v-model="orderInfo.howToPay" @change="onChange" />
                    <label class="btn btn-outline-warning text-dark optionBtn optionBtn" for="byCash">現金
                    </label>
                </div>
            </div>
            <div class="py-3 border-top">
                <div class="fs-4">
                    訂購明細 <span class="fs-6">總金額:{{amount}}元</span>
                    <!-- (總金額:100元) -->
                </div>
                <div class="d-flex justify-content-start align-items-sm-center" v-for="temp,index in orderData" :key="temp.id">
                    <div class="px-2 my-1">
                        <span class="fs-5">{{temp.productName}}</span><span></span><br />
                        <span>{{temp.whatCup}} / {{temp.whatTemp}} / {{temp.whatSugar}} / ${{temp.totalPrice}} / {{temp.orderNum}}杯</span>
                    </div>
                    <div class="ps-4" @click="deleteList(index)">
                        <el-button size="small" round plain>刪除</el-button>
                    </div>
                </div>
            </div>
            <div class="py-3 border-top d-flex justify-content-between align-items-sm-center">
                <span class="m-1">
                    <router-link to="/"><button class="btn btn-outline-dark optionBtn2">
                            繼續加購
                        </button>
                    </router-link>
                </span>
                <span class="m-1">
                    <button @click="checkOrder" :disabled="!judgment.isCheckOrder" class="btn btn-dark optionBtn2">結帳</button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
    computed: {
        orderData() {
            return this.$store.state.userOrder;
        },
        amount() {
            let sum = 0
            this.orderData.forEach(elm => {
                sum = sum + elm.totalPrice
            })
            return sum
        },
    },
    setup() {
        const store = useStore();
        const info = computed(() => store.state.orderInfo);
        const order = computed(() => store.state.userOrder);
        const orderInfo = reactive({
            howToGet: info.value.howToGet,
            contact_name: info.value.contact_name,
            contact_phone: info.value.contact_phone,
            howToPay: info.value.howToPay,
            orderList: order.value,
        });
        const judgment = reactive({
            isCheckOrder: false,
            isTextError: false,
        });
        return { orderInfo, judgment };
    },
    methods: {
        onChange() {
            this.$store.commit("tempOrderCar", this.orderInfo);
            this.verifyStep();
        },
        // (\d{2,3}-?|\(\d{2,3}\))\d{3,4}-?\d{4}|09\d{2}(\d{6}|-\d{3}-\d{3})
        onFocusOut(val) {
            var rules = new RegExp(/^[0-9]{10}$/g);
            if (!rules.test(val)) {
                this.judgment.isCheckOrder = false;
                this.judgment.isTextError = true;
                return
            } else {
                this.judgment.isTextError = false;
                this.verifyStep();
            }
        },
        deleteList(index) {
            ElMessageBox.confirm(
                '確認是否刪除品項',
                {
                    confirmButtonText: '刪除',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(() => {
                    this.$store.commit("deleteOrderCar", index);
                })
                .catch(() => {
                })
        },
        checkOrder() {
            ElMessageBox.confirm(
                '確認是否送出訂單',
                {
                    confirmButtonText: '確認',
                    cancelButtonText: '取消',
                    type: 'info',
                }
            )
                .then(() => {
                    this.$store.commit("cleanOrderCar");
                    this.$store.commit("cleanOrderInfo");
                    this.orderInfo.howToGet = "";
                    this.orderInfo.contact_name = "";
                    this.orderInfo.contact_phone = null;
                    this.orderInfo.howToPay = "";
                    this.orderInfo.orderList = [];
                    this.judgment.isCheckOrder = false;
                    ElMessage({
                        message: '已送出訂單',
                        type: 'success',
                    })
                })
                .catch(() => {
                })
        },
        verifyStep() {
            if (this.orderData.length === 0) {
                return;
            }
            this.judgment.isCheckOrder = true;
            Object.values(this.orderInfo).forEach(element => {
                !Boolean(element) ? this.judgment.isCheckOrder = false : '';
            });
        },
    },
    mounted() {
        this.verifyStep()
    },
};
</script>

<style lang="scss" scoped>
#orderList {
    width: 50%;
    margin: 0 auto;
    padding: 40px 0px;
    @media (max-width: $largeSizeView) {
        width: 70%;
    }
    @media (max-width: $mediumSizeView) {
        width: 95%;
    }
    #orderDesc {
        padding: 20px 15px;
        border-radius: 0.5rem;
        background: white;
        box-shadow: 0px 5px 20px -2px rgba(116, 116, 116, 0.6);
        .optionBtn {
            width: 100px;
        }
        .optionBtn2 {
            height: 50px;
            width: 120px;
        }
        .optionText {
            width: 300px;
            @media (max-width: $mediumSizeView) {
                width: 100%;
            }
        }
    }
    .textError {
        margin: 0;
        color: red;
    }
    .btn-dark:disabled {
        background-color: #717f8d;
        border-color: #717f8d;
    }
}
</style>