import qs from 'qs'
import { Toast } from 'antd-mobile'

function invokeScan(success) {
    let label_code = 'WFce085622bb9'//假设这是扫码结果
    success(label_code)//扫码成功回调
}

function getWeight() {

    //皮带秤返回的重量
    return 0.5
}

function getUrlParam(search) {
    search = search.substring(1)
    return qs.parse(search)
}
function showToast(content,icon = 'none', duration = 2000, position = 'center') {
    Toast.show({
        icon,
        content,
        duration,
        position,
        maskClickable: false
    })
}
function getStatusName(status) {
    let statusArr = ['','已入库','已出库','运输中','已处置','退回中','已退回']
    return status?statusArr[status]:'--'
}
function getPackageName(packageModes,mode) {
    let one = packageModes.find(el=>el.item_code == mode)
    return one?one.item_value:'--'
    
}
export default {
    getUrlParam,
    invokeScan,
    getWeight,
    showToast,
    getStatusName,
    getPackageName
}