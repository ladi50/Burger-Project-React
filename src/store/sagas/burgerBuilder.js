import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "axios";

export function* initIngredientsSaga (action) {
	const response = yield axios.get('https://react-my-burger-a86a2.firebaseio.com/ingredients.json');

	try {
		yield put(actions.setIngredients(response.data));
	} catch (error) {
		yield put(actions.fetchIngredientsFailed());
	}
}