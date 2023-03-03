/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { GET_RULE_AND_SUBRULE,SET_RULE_AND_SUBRULE, GET_ASSIGNED_WORKS, SET_ASSIGNED_WORKS, GET_DROPDOWN_PERSON_LIST, SET_DROPDOWN_PERSON_LIST, SET_SUBRULES, GET_ALL_DEPARTMENTS, SET_ALL_DEPARTMENTS } from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function getAssignedWorks() {
  console.log(" getAssignedWorks Action")
  return {
    type: GET_ASSIGNED_WORKS
  };
}
export function getRuleAndSubrule(){
  console.log("GET_RULE_AND_SUBRULE Action")
  return {
    type: GET_RULE_AND_SUBRULE
  }
}
export function setRuleAndSubrule(data){
  console.log("GET_RULE_AND_SUBRULE Action")
  return {
    type: SET_RULE_AND_SUBRULE,
    payload: data
  }
}
export function getAllDepartment() {
  console.log('Get all depts:-');
  return {
    type: GET_ALL_DEPARTMENTS,
  };
}
export function setAllDepartment(data) {
  console.log('Set all depts:-');
  return {
    type: SET_ALL_DEPARTMENTS,
    payload: data,
  };
}
export function getDropdownList(roleId, departmentId) {
  console.log(" getDropdownList Action")
  return {
    type: GET_DROPDOWN_PERSON_LIST,
    payload: { roleId, departmentId }
  };
}
export function setAssignedWorks(data) {
  return {
    type: SET_ASSIGNED_WORKS,
    payload: data
  };
}
export function setDropdownList(purpose, result) {
  return {
    type: SET_DROPDOWN_PERSON_LIST,
    payload: {
      purpose: purpose,
      result: result
    }
  }
}
export function setSubRules(data) {
  return {
    type: SET_SUBRULES,
    payload: data
  }
}