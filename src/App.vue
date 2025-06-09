<template>
    <MyHeader />
    <div id="content">
        <router-view />
    </div>
    <MyFooter />
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";
import MyFooter from "@/components/MyFooter.vue";

export default {
    name: "Home",
    components: {
        MyHeader,
        MyFooter,
    },
};
</script>

<style lang="scss">
// 卷軸消失，但還能滾動
body::-webkit-scrollbar {
    display: none;
}
body {
    -ms-overflow-style: none;
}

#myBody {
    background: $mainColor;
    box-sizing: border-box;
    margin: 0px;
    // height: 999px;
}

#app {
    // min-height: 100vh;
    margin: 90px auto 0px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    @media (max-width: $mediumSizeView) {
        margin: 55px auto 0px;
    }
}

#content {
    min-height: calc(100vh - 80px);
}
</style>
