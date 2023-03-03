/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { SET_ALL_DEPARTMENTS, SET_ASSIGNED_WORKS, SET_DROPDOWN_PERSON_LIST, SET_RULE_AND_SUBRULE, SET_SUBRULES } from './constants';

// The initial state of the App
export const initialState = {
  assignedWorkList: [],
  assignPersonDropdownList: [],
  reviwerDropdownList: [],
  functionalHeadDropdownList: [],
  departmentList: [],
  ruleAndSubRuleList: [],
  subRulesList:[]
};

/* eslint-disable default-case, no-param-reassign */
const regulatoryReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_SUBRULES:
        return {
          ...state,
          subRulesList: action.payload
        }
      case SET_RULE_AND_SUBRULE:
        return {
          ...state,
          ruleAndSubRuleList: action.payload
        }
      case SET_ALL_DEPARTMENTS:
        return {
          ...state,
          departmentList: action.payload,
        };
      case SET_ASSIGNED_WORKS:
        return {
          assignedWorkList: action.payload,
          ...state
        }
      case SET_DROPDOWN_PERSON_LIST:
        console.log("Reducer SETDROPDOWNLIST === ",action.payload,action.payload.purpose == "FUNCTIONAL_HEAD")
        if (action.payload.purpose == "REVIWER") {
          return {
            ...state,
            reviwerDropdownList: action.payload.result
          }
        } else if (action.payload.purpose == "FUNCTIONAL_HEAD") {
          console.log("FUNCTIONAL_HEAD=====",[...action.payload.result])
          return {
            ...state,
            functionalHeadDropdownList: [...action.payload.result]
            
          }
        } else if (action.payload.purpose == "PERSON_RESPONSIBLE") {
          return {
            ...state,
            assignPersonDropdownList: action.payload.result
            
          }
        }else{
          return state
        }
      default:
        return state
    }
  });

export default regulatoryReducer;
