import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from '../../axios-order';

export function* purchaseBurgerSaga (action) {
	yield put(actions.purchaseBurgerStart()); 
	const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);

	try {
		yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
	} catch (err) {
		yield put(actions.purchaseBurgerFail(err));
		yield console.log(err);
	}
}

export function* fetchOrdersSaga (action) {
	yield put(actions.fetchOrdersStart());
	const queryParams = yield '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
	const res = yield axios.get('/orders.json' + queryParams);

	try {
		const fetchedOrders = yield [];
		for (let key in res.data) {
			yield fetchedOrders.push({
				...res.data[key],
				id: key
			});
		}

		yield put(actions.fetchOrdersSuccess(fetchedOrders));
	
	} catch (err) {
		yield put(actions.fetchOrdersFail(err));
	}
}