import http from './http'
import qs from 'qs'
class Api {
    static getEnterpriseInfo(code) {
        return http({
            url: '/weifei-pda/produce_enterprise/info?enterprise_code=' + code,
            method: 'GET'
        })
    }
    // type：代码类别  101-包装方式   102-安全措施   103-危险情况   104-危废类别   105-行业来源  
    static getItemCode(type) {
        return http({
            url: '/weifei-pda/hw/item_code?type=' + type,
            method: 'GET'
        })
    }
    static enter(data) {
        return http({
            url: '/weifei-pda/hw/storage/enter',
            method: 'POST',
            data
        })
    }
    static out(data) {
        return http({
            url: '/weifei-pda/hw/storage/out',
            method: 'PUT',
            data
        })
    }
    static getLabelInfo(code) {
        return http({
            url: '/weifei-pda/hw/storage/info?label_code=' + code,
            method: 'GET',

        })
    }
    // 7. 立产立清
    static handle(data) {
        return http({
            url: '/weifei-pda/hw/storage/handle',
            method: 'POST',
            data

        })
    }
    static labelList(params) {
        let param = qs.stringify(params)
        return http({
            url: '/weifei-pda/hw/label_record?' + param,
            method: 'GET'

        })
    }
    static recordUpdate(data) {
        return http({
            url: '/weifei-pda/hw/record_update',
            method: 'PUT',
            data
        })
    }
    static plan(code, name) {
        return http({
            url: '/weifei-pda/produce_enterprise/plan?enterprise_code=' + code + '&name=' + name,
            method: 'GET'
        })
    }
    static labelHandle(label_code) {
        return http({
            url: '/weifei-pda/hw/label_handle',
            method: 'PUT',
            data: {
                label_code
            }
        })
    }

}

export default Api