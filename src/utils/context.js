import { createContext, useReducer } from 'react'
const initialState = {
    "id": "23099ade23c23",
    "name": "xxxxx有限公司",                      /* 企业名称 */
    "field": "车辆零部件加工",                    /* 涉及领域 */
    "legal_person": "张三",                       /* 企业法人 */
    "address": "天津市静海区xxx路xxx号",          /* 企业地址 */
    "hw_manager": "李四",                         /* 危废管理员 */
    "hw_manager_phone": "13378383898",              /* 危废管理员电话 */
    "hw_manager_email": "87349823@qq.com"         /* 危废管理员邮箱 */
};

export const myContext = createContext({});

function reducer(state, action) {
    switch (action.type) {
        case "enterprise":
            return Object.assign({}, state, { enterprise: action.info });
        case "packageMode":
            return Object.assign({}, state, { packageModes: action.list });
        case "storeInData":
            return Object.assign({}, state, { storeInData: action.info });
        default:
            return state;
    }
}
export function Context(props) {
    const [state, dispatch] = useReducer(reducer, { enterprise: initialState, packageModes: [], storeInData: null });
    return <myContext.Provider value={{ state, dispatch }}>
        {props.children}
    </myContext.Provider>

}
