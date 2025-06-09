<template>
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-sm">
        <div class="modal-content">
            <!-- 產品名 -->
            <div class="modal-header">
                <h5 class="modal-title fs-4" id="exampleModalLabel">
                    {{ sentData.productName }}
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <!-- 產品資料 -->
            <div class="modal-body">
                <!-- <div class="py-2">
                    <span class="">訂購人姓名</span>
                    <input class="form-control mt-1" type="text" />
                </div> -->
                <!-- 杯型 -->
                <div class="py-2">
                    <p><span class="text-danger">✽</span><span>杯型</span></p>
                    <div>
                        <template v-for="item,index in cup_size" :key="index">
                            <span class="m-1">
                                <input type="radio" class="btn-check" :id="`largeSize${index}`" :value="item.value" name="cupSize" v-model="orderDesc.whatCup" />
                                <label class="btn btn-outline-warning text-dark optionBtn optionBtn" :for="`largeSize${index}`">{{item.name}}</label>
                            </span>
                        </template>
                    </div>
                </div>
                <!-- 溫度 -->
                <div class="py-2">
                    <p><span class="text-danger">✽</span><span>溫度</span></p>
                    <div class="d-flex flex-wrap">
                        <template v-for="item,index in cup_temp" :key="index">
                            <span class="m-1">
                                <input type="radio" class="btn-check" :id="item.value" :value="item.value" v-model="orderDesc.whatTemp" name="temperature" />
                                <label class="btn btn-outline-warning text-dark optionBtn" :for="item.value">{{item.name}}</label>
                            </span>
                        </template>
                    </div>
                </div>
                <!-- 糖度 -->
                <div class="py-2">
                    <p><span class="text-danger">✽</span><span>糖度</span></p>
                    <div class="d-flex flex-wrap">
                        <template v-for="item,index in cup_sugar" :key="index">
                            <span class="m-1">
                                <input type="radio" class="btn-check" :id="item.value" :value="item.value" v-model="orderDesc.whatSugar" name="sugarHowMany" />
                                <label class="btn btn-outline-warning text-dark optionBtn" :for="item.value">{{item.name}}</label>
                            </span>
                        </template>
                    </div>
                </div>
                <div class="my-2">
                    <p class="text-danger" v-show="notDecide">請選擇 {{ decideWhat }}</p>
                    <!-- <p class="text-danger">{{ notDecide }}</p> -->
                </div>
            </div>
            <!-- 資料送出 -->
            <div class="modal-footer">
                <div>
                    <div class="input-group">
                        <button class="btn btn-outline-secondary" v-on:click="numMinus">
                            -
                        </button>
                        <input type="text" class="form-control text-align border-secondary" style="width: 45px" v-model="orderDesc.orderNum" />
                        <button class="btn btn-outline-secondary" v-on:click="numPlus">
                            +
                        </button>
                    </div>
                </div>
                <div>總金額：{{ totalMoney }} 元</div>
                <div></div>
                <button id="checkBtn" type="button" class="btn btn-dark text-white" @click="addOrderList">
                    加入購物車
                </button>
            </div>
        </div>
    </div>
</template>

<script>
// import { toRefs } from "vue";
import { onMounted, reactive, ref } from "vue";
import { Modal } from "bootstrap";
import { ElMessage } from 'element-plus'
export default {
    name: "OptionWindow",
    props: {
        sentData: {
            type: Object,
            dafult: {},
        },
        idx: {
            type: Number,
            dafult: 1,
        },
    },
    setup(props, { emit }) {
        let orderDesc = reactive({
            productName: "",
            whatCup: "",
            whatTemp: "",
            whatSugar: "",
            totalPrice: 0,
            orderNum: 1,
        });
        let ctrlModal = reactive({
            myModal: {},
        });

        // 這邊不合併成reactive是因為練習ref
        let notDecide = ref(false);
        let decideWhat = ref("");
        let cup_size = ref([{ name: "大杯", value: "large" }, { name: "中杯", value: "medium" }]);
        let cup_temp = ref([
            { name: "正常冰", value: "iceFull" },
            { name: "少冰", value: "iceFew" },
            { name: "微冰", value: "iceLittle" },
            { name: "去冰", value: "iceNone" },
            { name: "常溫", value: "nomralTemp" },
            { name: "熱", value: "hotTemp" },
        ]);
        let cup_sugar = ref([
            { name: "正常糖", value: "sugarFull" },
            { name: "少糖", value: "sugarFew" },
            { name: "半糖", value: "sugarHalf" },
            { name: "微糖", value: "sugarLittle" },
            { name: "無糖", value: "sugarNone" },
        ]);
        onMounted(() => {
            let optionModal = document.getElementById(`optionModal${props.idx}`);
            ctrlModal.myModal = new Modal(optionModal);
            // console.log(ctrlModal.myModal);
            optionModal.addEventListener('hidden.bs.modal', function (event) {
                emit('update');
            })
        });
        return { orderDesc, ctrlModal, notDecide, decideWhat, cup_size, cup_temp, cup_sugar };
    },
    computed: {
        totalMoney() {
            if (this.orderDesc.whatCup === "medium") {
                return this.sentData.price_medium * this.orderDesc.orderNum;
            } else {
                return this.sentData.price_large * this.orderDesc.orderNum;
            }
        },
    },
    methods: {
        numMinus() {
            return this.orderDesc.orderNum == 1 ? "" : this.orderDesc.orderNum--;
        },
        numPlus() {
            return this.orderDesc.orderNum++;
        },
        addOrderList() {
            if (this.orderDesc.whatCup == "" || this.orderDesc.whatTemp == "" || this.orderDesc.whatSugar == "") {
                this.notDecide = true;
                this.decideWhat = "";
                this.orderDesc.whatCup == "" ? (this.decideWhat += "杯型 ") : "";
                this.orderDesc.whatTemp == "" ? (this.decideWhat += "溫度 ") : "";
                this.orderDesc.whatSugar == "" ? (this.decideWhat += "糖度 ") : "";
                return;
            } else {
                this.notDecide = false;
                this.cup_size.forEach(elm => {
                    this.orderDesc.whatCup === elm.value ? this.orderDesc.whatCup = elm.name : "";
                })
                this.cup_temp.forEach(elm => {
                    this.orderDesc.whatTemp === elm.value ? this.orderDesc.whatTemp = elm.name : "";
                })
                this.cup_sugar.forEach(elm => {
                    this.orderDesc.whatSugar === elm.value ? this.orderDesc.whatSugar = elm.name : "";
                })
                this.orderDesc.productName = this.sentData.productName;
                this.orderDesc.totalPrice = this.totalMoney;
                this.$store.commit("addOrderCar", this.orderDesc);
                this.ctrlModal.myModal.hide();
                ElMessage({
                    message: '已加入購物車',
                    type: 'success',
                })
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.optionBtn {
    width: 100px;
}
</style>