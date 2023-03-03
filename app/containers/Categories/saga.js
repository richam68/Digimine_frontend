/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { HOST, BASE_PATH, SCHEMES, URL } from '../config.json';
import {
  GET_CATEGORY,
  ADD_CATEGORY_RULE,
  EDIT_CATEGORY_RULE,
  ADD_CATEGORY_SUB_RULE,
  EDIT_CATEGORY_SUB_RULE,
  GET_ALL_DEPARTMENTS_CATEGORY,
  GET_SUB_RULE_DETAIL,
} from './constants';

import {
  setCategoryList,
  setAllDepartmentInCategory,
  getCategoryList,
  SetSubRuleDetail,
} from './actions';

import { silentRenewalAction } from '../LoginPage/actions';

function* getCategorySaga() {
  const requestURL = `${SCHEMES}://${BASE_PATH}${HOST}/ruleAndSubRule/list`;
  const awtToken = localStorage.getItem('awtToken');
  console.log('data in saga get :', requestURL);
  let result;
  try {
    console.log('getUsersList get ');
    result = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${awtToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('success in categorylist saga', result);
    yield put(setCategoryList(result.data));
  } catch (err) {
    console.log('Error in getUsersList saga', result, err, err.response.status);
    if (err.response.status == 401) {
      yield put(silentRenewalAction());
    } else if (result) {
      console.log(result.status.message);
    } else console.log(err);
  }
}

function* addCategoryRuleSaga(action) {
  const requestURL = `${SCHEMES}://${BASE_PATH}${HOST}/admin/rule/saveOrUpdate`;
  const awtToken = localStorage.getItem('awtToken');
  console.log('data in saga get :', requestURL, action.payload);
  let result;
  try {
    result = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${awtToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });
    console.log('success in  saga', result);
    yield put(getCategoryList());
  } catch (err) {
    console.log('Error in saveOrUpdateUserSaga saga', result, err);
    if (err.response.status == 401) {
      console.log(' Unauthorised access');
      yield put(silentRenewalAction());
    } else if (result) {
    } else console.log(err);
  }
}

function* getAllDepartmentInCategorySaga() {
  const requestURL = `${SCHEMES}://${BASE_PATH}${HOST}/department/list`;
  const awtToken = localStorage.getItem('awtToken');
  console.log('data in saga get :', requestURL);
  let result;
  try {
    result = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${awtToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('success in getAllDepartmentSaga saga', result);
    yield put(setAllDepartmentInCategory(result.data.departments));
  } catch (err) {
    console.log('Error in getAllDepartmentSaga saga', result, err);
    if (err.response.status == 401) {
      yield put(silentRenewalAction());
    } else if (result) {
    } else console.log(err);
  }
}

function* editCategoryRuleSaga() {
  const requestURL = `${SCHEMES}://${BASE_PATH}${HOST}/getallRoles`;
  const awtToken = localStorage.getItem('awtToken');
  console.log('data in saga get :', requestURL);
  let result;
  try {
    result = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${awtToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('success in saga', result);
    yield put(getCategoryList(result.data.roles));
  } catch (err) {
    if (err.response.status == 401) {
      yield put(silentRenewalAction());
    } else if (result) {
      console.log(result.status.message);
    } else console.log(err);
  }
}

function* addCategorySubRuleSaga(action) {
  // const requestURL = `${SCHEMES}://${BASE_PATH}${HOST}/admin/subRule/saveOrUpdate`;
  const requestURL = `${SCHEMES}://${BASE_PATH}${HOST}/admin/subRule/v1/saveOrUpdate`;
  const awtToken = localStorage.getItem('awtToken');
  console.log('data in saga get :', requestURL, action.payload);
  let result;
  try {
    result = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${awtToken}`,
        'Content-Type': 'multipart/form-data',
        // "Accept": "application/json",
      },
      body: JSON.stringify(action.payload),
    });
    console.log('success in deleteUserSaga saga', result);
    yield put(getCategoryList());
  } catch (err) {
    console.log('Error in deleteUserSaga saga', result, err);
    if (err.response.status == 401) {
      yield put(silentRenewalAction());
    } else if (result) {
      console.log(result.status.message);
    } else console.log(err);
  }
}

function* editCategorySubRuleSaga() {
  const requestURL = `${SCHEMES}://${BASE_PATH}${HOST}/getallRoles`;
  const awtToken = localStorage.getItem('awtToken');
  console.log('data in saga get :', requestURL);
  let result;
  try {
    result = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${awtToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('success in saga', result);
    yield put(getCategoryList(result.data.roles));
  } catch (err) {
    if (err.response.status == 401) {
      yield put(silentRenewalAction());
    } else if (result) {
      console.log(result.status.message);
    } else console.log(err);
  }
}

function* getSubRuleDetailSaga(action) {
  const requestURL = `${SCHEMES}://${BASE_PATH}${HOST}/subRules/get/${
    action.payload.ruleId
  }/${action.payload.subruleId}`;
  const awtToken = localStorage.getItem('awtToken');
  console.log('data in saga get :', requestURL);
  let result;
  try {
    result = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${awtToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('success in saga', result);
    yield put(SetSubRuleDetail(result));
  } catch (err) {
    if (err.response.status == 401) {
      yield put(silentRenewalAction());
    } else if (result) {
      console.log(result.status.message);
    } else console.log(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* CategoryDataSaga() {
  yield takeLatest(GET_CATEGORY, getCategorySaga);
  yield takeLatest(ADD_CATEGORY_RULE, addCategoryRuleSaga);
  yield takeLatest(EDIT_CATEGORY_RULE, editCategoryRuleSaga);
  yield takeLatest(
    GET_ALL_DEPARTMENTS_CATEGORY,
    getAllDepartmentInCategorySaga,
  );
  yield takeLatest(ADD_CATEGORY_SUB_RULE, addCategorySubRuleSaga);
  yield takeLatest(EDIT_CATEGORY_SUB_RULE, editCategorySubRuleSaga);
  yield takeLatest(GET_SUB_RULE_DETAIL, getSubRuleDetailSaga);
}
