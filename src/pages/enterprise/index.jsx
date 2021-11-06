import { useState, useContext } from 'react'
import './index.scss'
import { myContext } from '../../utils/context'
import qs from 'qs'
import utils from '../../utils'
function Enterprise(props) {
    const { state } = useContext(myContext)
    const [status] = useState(utils.getUrlParam(props.location.search).status)
    const info = state.enterprise
    function sureInfo() {
        let code = utils.getUrlParam(props.location.search).code
        localStorage.setItem('enterprise_code', code)
        props.history.push('/overView')
    }
    function logout() {
        localStorage.clear()
        props.history.push('/')
    }
    return (
        <div className='enterprise wrap'>
            <h1 className='f-80 color-fff'>识别企业信息</h1>
            <div className='item mar-t-80'>
                <div className="title flex-lr flex-center">
                    <h5 className='f-40'>企业全称</h5>
                    <span className='label'>{info.name}</span>
                </div>
                <div className='content'>
                    <p>{info.field}</p>
                </div>
            </div>
            <div className='item'>
                <div className="title flex-lr">
                    <h5 className='f-40'>企业法人</h5>
                </div>
                <div className='content'>
                    <p>{info.legal_person}</p>
                </div>
            </div>
            <div className='item'>
                <div className="title flex-lr">
                    <h5 className='f-40'>企业详细地址</h5>
                </div>
                <div className='content'>
                    <p>{info.address}</p>
                </div>
            </div>
            <div className='item'>
                <div className="title flex-lr">
                    <h5 className='f-40'>企业危废管理员</h5>
                </div>
                <div className='content'>
                    <p>{info.hw_manager}</p>
                </div>
            </div>
            <div className='item'>
                <div className="title flex-lr">
                    <h5 className='f-40'>危废管理员联系电话</h5>
                </div>
                <div className='content'>
                    <p>{info.hw_manager_phone}</p>
                </div>
            </div>
            <div className='item'>
                <div className="title flex-lr">
                    <h5 className='f-40'>危废管理员联系邮箱</h5>
                </div>
                <div className='content'>
                    <p>{info.hw_manager_email}</p>
                </div>
            </div>
            <div className='fix-b'>
                {
                    status == 'in' ?
                        <button className='btn_style' onClick={sureInfo}>确认关联</button>
                        :
                        <button className='btn_style' onClick={logout}>解除关联</button>
                }
            </div>

        </div>
    )
}
export default Enterprise