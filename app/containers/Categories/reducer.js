import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import {
  SET_CATEGORY,
  SET_ALL_DEPARTMENTS_CATEGORY,
  SET_SEARCH_DATA,
  CLEAR_SORT_SEARCH,
  SET_SUB_RULE_DETAIL,
  SET_DIALOG_ERR_MSG,
  CLOSE_ADD_SUBRULE_DIALOG,
  OPEN_ADD_SUBRULE_DIALOG,
  SET_DATA_IN_SUBRULE_DIALOG,
  SET_FILE_IN_DIALOG,
} from './constants';

export const initialState = {
  categoryList: [],
  categoryListReplica: [],
  departmentLisInCategory: [],
  editData: {},
  subRuleDetail: [],
  subRuleDialog: {
    props: {
      open: false,
    },
    data: {
      name: '',
      deleted: '',
      title: '',
      responsibility: '',
      description: '',
      file: [],
    },
  },
};

/* eslint-disable default-case, no-param-reassign */
const CategoryReducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type } = action;
    switch (action.type) {
      case SET_CATEGORY:
        return {
          ...state,
          categoryList: action.payload,
          categoryListReplica: action.payload,
        };
      case SET_ALL_DEPARTMENTS_CATEGORY:
        return {
          ...state,
          departmentLisInCategory: action.payload,
        };
      case SET_SEARCH_DATA:
        return {
          ...state,
          categoryList: action.payload,
        };

      case CLEAR_SORT_SEARCH:
        return {
          ...state,
          categoryList: action.payload,
        };
      case SET_SUB_RULE_DETAIL:
        state.subRuleDetail[0] = {
          ...state.categoryList[0],
          ...action.payload.data,
        };
        return {
          ...state,
        };
      case SET_DIALOG_ERR_MSG:
        state.categoryList[action.payload.index] = {
          ...state.categoryList[action.payload.index],
          ...action.payload,
        };
        return {
          ...state,
        };
      case OPEN_ADD_SUBRULE_DIALOG: {
        return {
          ...state,
          subRuleDialog: {
            props: {
              open: true
            },
            data: { ...initialState.subRuleDialog.data, ruleId: action.payload.ruleId },
          },
        };
      }
      case CLOSE_ADD_SUBRULE_DIALOG: {
        return {
          ...state,
          subRuleDialog: {
            props: {
              open: false
            },
            data: {
              name: "",
              deleted: "",
              ruleId: "",
              title: "",
              responsibility: "",
              description: "",
              file: []
                  
            },
          }
        };
      }

      case SET_DATA_IN_SUBRULE_DIALOG: {
        const changedElementData = {
          ...state.subRuleDialog,
          data: {
            ...state.subRuleDialog.data,
            ...action.payload
          }
        }

        return {
          ...state,
          subRuleDialog: changedElementData
        };
      }
      case SET_FILE_IN_DIALOG: {
        state.subRuleDialog.data.file = [
          ...state.subRuleDialog.data.file,
          action.payload
        ]

        return {
          ...state,
        };
      }

      default:
        return state;
    }
  });

export default CategoryReducer;
