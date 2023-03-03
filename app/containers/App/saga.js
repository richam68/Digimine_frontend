// import { call, put, select, takeLatest } from 'redux-saga/effects';
// import { LOAD_REPOS } from 'containers/App/constants';

// import request from 'utils/request';
// import { HOST, BASE_PATH, SCHEMES, URL } from '../../containers/config.json';
// import {
//     SILENT_RENEWAL,
// } from './constants';

// function* silentRenewal_Saga() {
//     const requestURL = `${SCHEMES}://${BASE_PATH}${HOST}/silent-renewal`;
//     const awtToken = localStorage.getItem('awtToken');
//     const refreshToken =localStorage.getItem('refreshToken');
//     console.log('silentRenewal_Saga:', requestURL);
//     let result;

//     try {
//         console.log('silentRenewal_Saga get ');
//         result = yield call(request, requestURL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ "refreshToken": refreshToken })
//         });
//         console.log('success in silentRenewal_Saga ', result);

//     } catch (err) {
//         console.log('Error in silentRenewal_Saga saga', result, err);
//         if (result) {
//             console.log(result.status.message);
//         } else console.log(err);
//     }
// }
// export default function* mainData() {
//     yield takeLatest(SILENT_RENEWAL, silentRenewal_Saga);
// }