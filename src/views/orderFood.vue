<template>
    <div id="productList">
        <!-- 咖啡類 -->
        <template v-for="item,index in productData" :key="index">
            <div class="drinkMenu">
                <div class="drinkDesc">
                    <div class="drinkType">{{item.name}}</div>
                    <div class="drinkTitle" v-for="temp in item.drinkList" :key="temp.id" data-bs-toggle="modal" :data-bs-target="`#optionModal${idx.index}`" @click="getProductId(temp)">
                        <span class="drinkName">{{ temp.productName }}</span>
                        <span class="drinkPrice">{{ temp.price_large }}</span>
                    </div>
                </div>
            </div>
        </template>
    </div>

    <!-- Modal -->
    <div class="modal fade" :id="`optionModal${idx.index}`" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <OptionWindow :sentData="axiosData.drinkProduct" :key="idx.index" :idx="idx.index" @update="onUpdate" />
        <!-- 備註：在component加上key 點選就會重置 -->
    </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import OptionWindow from "@/components/OptionWindow.vue";

export default {
    components: {
        OptionWindow,
    },
    setup() {
        const axiosData = reactive({
            drinkProduct: {},
        });
        const idx = reactive({
            index: 1,
        });;
        return { axiosData, idx };
    },
    computed: {
        productData() {
            return this.$store.state.productData;
        },
    },
    methods: {
        getProductId(list) {
            this.axiosData.drinkProduct = list;
        },
        onUpdate() {
            this.idx.index += 1
            // console.log(this.idx.index);
        },
    },
    mounted() {
        this.$store.dispatch("getData")
    },

};
</script>

<style lang="scss" scoped>
#productList {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    flex: 1 1 100%;
    height: 700px;
    padding: 20px $largePadding;
    box-sizing: border-box;
    // overflow: auto;
    @media (max-width: $largeSizeView) {
        padding: 20px $mediumPadding;
    }
    @media (max-width: $mediumSizeView) {
        flex-wrap: nowrap;
        height: 100%;
        padding: 20px 10px;
    }
    .drinkMenu {
        position: relative;
        width: 33%;
        margin: 10px 0px;
        padding: 10px 15px;

        @media (min-width: $mediumSizeView) {
            &:nth-child(1) {
                order: 1;
            }
            &:nth-child(2) {
                order: 2;
            }
            &:nth-child(3) {
                order: 3;
            }
            &:nth-child(4) {
                order: 2;
            }
        }
        @media (max-width: $mediumSizeView) {
            width: 100%;
        }
        .drinkDesc {
            padding: 10px 15px;
            border-radius: 0.5rem;
            background: white;
            box-shadow: 0px 5px 20px -2px rgba(116, 116, 116, 0.6);
            .drinkType {
                color: $secondaryColor;
                font-size: $typeFontSize;
                font-weight: bold;
                margin: 10px 0px;
            }
            .drinkTitle {
                display: flex;
                justify-content: space-between;
                padding: 10px 0px;
                font-size: $titleFontSize;
                cursor: pointer;
                &:not(:nth-child(2)) {
                    border-top: 1px solid rgb(207, 207, 207);
                }
            }
        }
    }
}
</style>