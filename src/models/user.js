import modelExtend from 'dva-model-extend';
import { routerRedux } from 'dva/router';
import { query, create, remove, update } from '../services/user';
import { pageModel } from './common'
import { config } from 'utils'
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'user',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: localStorage.getItem(`${prefix}userIsMotion`) === 'true',
    searchParams:null,
    nowDate:null,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/user') {
          let params = location.query;
          !params.description && (params.description="");
          dispatch({
            type: 'query',
            payload: params,
          })
        }
      })
    },
  },

  effects: {

    *query ({ payload }, { select, call, put }) {
      let { searchParams } = yield select(({ user }) => user);
      searchParams = payload || searchParams
      const data = yield call(query, searchParams);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(searchParams.page) || 1,
              pageSize: Number(searchParams.pageSize) || 10,
              total: data.total,
            },
            searchParams,
            nowDate:new Date().getTime()
          },
        })
      }
    },
    *'delete' ({ payload }, { call, put, select }) {
      //删除方法
      const data = yield call(remove, { ids: [payload.id] })
      const { selectedRowKeys } = yield select(_ => _.user)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        yield put({ type: 'query'})
      } else {
        throw data
      }
    },

    *'multiDelete' (action, { call, put, select }) {
      const { selectedRowKeys } = yield select(({ user }) => user);
      const data = yield call(remove, {ids: selectedRowKeys});
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *create ({ payload }, { call, put ,select}) {
      let params = payload;
      /*params.createTime = params.createTime.format('YYYY-MM-DD HH:mm:ss');*/
      const data = yield call(create, payload);
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put(routerRedux.push({
          pathname: '/user',
          query: {
            page: 1,
            pageSize: 10,
          },
        }))
      } else {
        throw data
      }
    },

    *update ({ payload: { description } }, { select, call, put }) {
      const uuid = yield select(({ user }) => user.currentItem.uuid)
      const data = yield call(update, { description, uuid })
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
  },

  reducers: {

    querySuccess (state, { payload }) {
      return { ...state, ...payload }
    },
    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion (state) {
      localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },
    set(state, { payload: { field, value}}){
      return { ...state, [field]: value}
    },
  },
})
