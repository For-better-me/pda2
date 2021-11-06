import { useState } from 'react'
import IconScan from '../../img/icon_scan.png'
import './index.scss'
import util from '../../utils/index'
function Overview(props) {
    function navigateTo(url) {
        props.history.push(url)
    }
    function scan(type) {
        util.invokeScan((label_code) => {
            props.history.push(`/label_info?code=${label_code}&type=${type}`)

        })
    }
    return (
        <div className='overview wrap'>
            <div className="flex-lr flex-center mar-t-40">
                <p className='color-fff'>危废间管理系统</p>
                <img src={IconScan} className="icon_scan" onClick={() => { scan(3) }} />
            </div>
            <div className="link_status on">
                <div className="flex-center flex-lr">
                    <p>称重秤</p>
                    <div className="flag">已连接</div>
                </div>
                <h4 className='f-60 mar-t-20'>ABXK-12345</h4>
            </div>
            <div className="link_status">
                <div className="flex-center flex-lr">
                    <p>打印机</p>
                    <div className="flag">已连接</div>
                </div>
                <h4 className='f-60 mar-t-20'>ABXK-12345</h4>
            </div>
            <h2 className='mar-t-50 color-fff f-40'>管理操作</h2>
            <div className='menu_list'>
                <ul>
                    <li onClick={() => { navigateTo('/store_in?type=1') }}>入库</li>
                    <li onClick={() => { scan(1) }}>危废间出库</li>
                    <li onClick={() => { navigateTo('/store_in?type=2') }}>立产立清</li>
                    <li onClick={() => { navigateTo('/label_record') }}>标签记录</li>
                    <li onClick={() => { scan(2) }}>二次更新</li>
                    <li onClick={() => navigateTo('/enterprise?status=out')}>企业信息</li>
                </ul>
            </div>
        </div>
    )
}
export default Overview