import { createStore } from "vuex";
import axios from "axios";

export default createStore({
	state: {
		productData: {},
		userOrder: [
			// {
			// 	productName: "經典水果茶",
			// 	whatCup: "大杯",
			// 	whatTemp: "少冰",
			// 	whatSugar: "少糖",
			// 	totalPrice: 60,
			// 	orderNum: 1,
			// },
		],
		orderInfo: {},
	},
	mutations: {
		setAxiosData(state, paypload) {
			state.productData = paypload;
		},
		addOrderCar(state, res) {
			state.userOrder.push(res);
		},
		deleteOrderCar(state, res) {
			state.userOrder.splice(res, 1);
		},
		cleanOrderCar(state) {
			state.userOrder = [];
		},
		cleanOrderInfo(state) {
			state.orderInfo = {};
		},
		tempOrderCar(state, res) {
			state.orderInfo = res;
		},
	},
	actions: {
		getData(context) {
			try {
				axios
					.get("static/productList.json")
					.then((res) => {
						context.commit("setAxiosData", res.data);
					})
					.catch((err) => {
						console.log(err);
					});
				return { success: true };
			} catch (e) {
				return e;
			}
		},
	},
	modules: {},
});
