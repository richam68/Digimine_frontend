/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { GET_ALL_DEPARTMENTS, GET_ASSIGNED_WORKS, GET_DROPDOWN_PERSON_LIST, GET_RULE_AND_SUBRULE } from './constants';
import { HOST, BASE_PATH, SCHEMES, URL } from '../config.json';
import { setAllDepartment, setAssignedWorks, setDropdownList, setRuleAndSubrule } from './actions';
import { silentRenewalAction } from '../LoginPage/actions';

export function* getAssignedWorkSaga() {
  const requestURL = `${SCHEMES}://${BASE_PATH}${HOST}/getAssignedWorks`;
  console.log(' getAssignedWorkSaga URL:', requestURL);
  const awtToken = localStorage.getItem('awtToken');
  let result;
  try {
    console.log('generatorFunction getAssignedWorkSaga ');
    result = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${awtToken}`,
        'Content-Type': 'application/json',
      }
    });
    yield put(setAssignedWorks(result.data.assignedWork));
    console.log('getAssignedWorkSaga success in saga', result, result.data, result.data.assignedWork);
  } catch (err) {
    if (err.response.status == 401) {
      console.log(" Unauthorised access");
      //call silentRenewal with refresh token
      yield put(silentRenewalAction());
    } else if (result) {
      console.log('Error while saving profile', result);
      // console.log(result.status.message);
    } else console.log('Error while saving profile', err);
  }
}

export function* getDropdownListSaga(action) {
  const locId = localStorage.getItem('choosedLocation');
  const requestURL = `${SCHEMES}://${BASE_PATH}${HOST}/admin/user/list/${locId}?roleId=${action.payload.roleId}&departmentId=${action.payload.departmentId}`;
  console.log(' getDropdownList URL:', requestURL);
  const awtToken = localStorage.getItem('awtToken');
  let result;
  try {
    console.log('generatorFunction getDropdownList ');
    result = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${awtToken}`,
        'Content-Type': 'application/json',
      }
    });
    if (action.payload.roleId == 3) {
      yield put(setDropdownList("FUNCTIONAL_HEAD", result.data.users));
      console.log("setDropdownList(FUNCTIONAL_HEAD, result)");
    } else if (action.payload.roleId == 4) {
      yield put(setDropdownList("REVIWER", result.data.users));
      console.log("setDropdownList(REVIWER, result)");
    } else if (action.payload.roleId == 5) {
      yield put(setDropdownList("PERSON_RESPONSIBLE", result.data.users));
      console.log("setDropdownList(PERSON_RESPONSIBLE, result)");
    } else {
      console.log("ELSE ");
    }
    console.log('getDropdownList success in saga', result, result.data, result.data.users);
  } catch (err) {
    if (err.response.status == 401) {
      console.log(" Unauthorised access");
      //call silentRenewal with refresh token
      yield put(silentRenewalAction());
    } else if (result) {
      console.log('Error while saving profile', result);
      // console.log(result.status.message);
    } else console.log('Error while saving profile', err);
  }
}

function* getAllDepartmentSaga() {
  const requestURL = `${SCHEMES}://${BASE_PATH}${HOST}/department/list`;
  const awtToken = localStorage.getItem('awtToken');
  console.log('getAllDepartmentSaga in saga get :', requestURL);
  let result;

  try {
    console.log('getAllDepartmentSaga get ');
    result = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${awtToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('success in getAllDepartmentSaga saga', result);
    yield put(setAllDepartment(result.data.departments));
  } catch (err) {
    console.log('Error in getAllDepartmentSaga saga', result, err);
    if (err.response.status == 401) {
      console.log(" Unauthorised access");

      //call silentRenewal with refresh token
      yield put(silentRenewalAction());
    }
    else if (result) {
      console.log(result.status.message);
    } else console.log(err);
  }
}
function* getRuleAndSubruleSaga(){
  const requestURL = `${SCHEMES}://${BASE_PATH}${HOST}/ruleAndSubRule/list`;
  const awtToken = localStorage.getItem('awtToken');
  console.log('getRuleAndSubruleSaga in saga get :', requestURL);
  let result;

  try {
    console.log('getRuleAndSubruleSaga get ');
    result = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${awtToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('success in getRuleAndSubruleSaga saga', result);
    yield put(setRuleAndSubrule(result.data));
  } catch (err) {
    console.log('Error in getRuleAndSubruleSaga saga', result, err);
    if (err.response.status == 401) {
      console.log(" Unauthorised access");

      //call silentRenewal with refresh token
      yield put(silentRenewalAction());
    }
    else if (result) {
      console.log(result.status.message);
    } else console.log(err);
  }
}

export default function* regulatoryData() {
  yield takeLatest(GET_ASSIGNED_WORKS, getAssignedWorkSaga);
  yield takeEvery(GET_DROPDOWN_PERSON_LIST, getDropdownListSaga);
  yield takeLatest(GET_ALL_DEPARTMENTS, getAllDepartmentSaga);
  yield takeLatest(GET_RULE_AND_SUBRULE,getRuleAndSubruleSaga);
}
