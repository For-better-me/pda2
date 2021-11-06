import { useEffect, useState, useContext } from 'react'
import TopNav from '../../component/topNav/index.jsx'
import './index.scss'
import Api from '../../utils/api.js'
import utils from '../../utils/index.js'
import { myContext } from '../../utils/context'
import { Toast } from 'antd-mobile'
function LabelRecord(props) {
    const [info, setInfo] = useState({})
    const [type] = useState(utils.getUrlParam(props.location.search).type)//1 出库 2 二次更新 3扫码 
    const packageModes = useContext(myContext).state.packageModes

    function getInfo() {
        let code = utils.getUrlParam(props.location.search).code
        Api.getLabelInfo(code).then(res => {
            setInfo(res.result)
        })
    }
    function btnEvent(type) {
        let data = {
            label_code: info.label_code
        }
        if (type == 1) {
            Api.out(data).then(res => {
                Toast.success('出库成功', 2, () => {
                    props.history.go(-1)

                })
            }).catch(err => {
                Toast.info(err.message)
            })
        } else if (type == 2) {
            data.weight = info.weight
            Api.recordUpdate(data).then(res => {
                Toast.success('更新成功', 2, () => {
                    props.history.go(-1)
                })
            }).catch(err => {
                Toast.info(err.message)
            })
        }

    }

    useEffect(() => {
        getInfo()
    }, [])
    return <div className='label'>
        <TopNav />
        <div className='label_info wrap'>
            <h2>危废基本信息</h2>
            <div className='flex-lr mar-t-80'>
                <div>
                    <p>标签编号</p>
                    <p className='f-60 color-green'>{info.label_code}</p>
                </div>
                <img src={'data:image/png;base64,' + info.qr_code} alt="" className='code_img' />
            </div>
            <div className='flex-lr mar-t-60'>
                <div className='status'>
                    <p>标签有效性</p>
                    <p className={info.label_validation == 1 ? 'f-60 color-green' : 'f-60 color-red'}>{info.label_validation == 1 ? '有效' : info.label_validation == 1 ? '无效' : '--'}</p>
                </div>
                <div className='status'>
                    <p>当前状态</p>
                    <p className='f-60 color-green'>{utils.getStatusName(info.hw_status)}</p>
                </div>
            </div>
            <div className="mar-t-60">
                <p>危废名称</p>
                <h5 className='f-60 color-fff'>{info.hw_name}</h5>
            </div>
            <div className="mar-t-60">
                <p>危废编号</p>
                <h5 className='f-60 color-fff'>{info.hw_code}</h5>
            </div>
            <div className="mar-t-60">
                <p>危废类型</p>
                <h5 className='f-60 color-fff'>{info.hw_type || '--'}</h5>
            </div>
            <div className="mar-t-60">
                <p>主要成分</p>
                <h5 className='f-60 color-fff'>{info.composition || '--'}</h5>
            </div>
            <div className="mar-t-60">
                <p>物理性状</p>
                <h5 className='f-60 color-fff'>{info.physical_form || '--'}</h5>
            </div>
            <div className="mar-t-60">
                <p>危险情况</p>
                <h5 className='f-60 color-red'>{info.danger_feature || '--'}</h5>
            </div>
            <div className="mar-t-60">
                <p>安全措施</p>
                <h5 className='f-60 color-fff'>{info.safety_measure || '--'}</h5>
            </div>
            <div className="mar-t-60">
                <p>包装方式</p>
                <h5 className='f-60 color-fff'>{utils.getPackageName(packageModes, info.package_mode)}</h5>
            </div>
            <div className="mar-t-60">
                <p>重量</p>
                <h5 className='f-60 color-green'>{info.weight || '--'}吨</h5>
            </div>
            <div className="mar-t-60">
                <p>产废单位</p>
                <h5 className='f-60 color-fff'>{info.enterprise_name || '--'}</h5>
            </div>
            <div className="mar-t-60">
                <p>单位地址</p>
                <h5 className='f-60 color-fff'>{info.enterprise_address || '--'}</h5>
            </div>
            <div className="mar-t-60">
                <p>企业危废管理员</p>
                <h5 className='f-60 color-fff'>{info.hw_manager || '--'}</h5>
            </div>
            <div className="mar-t-60">
                <p>管理员联系电话</p>
                <h5 className='f-60 color-fff'>{info.hw_manager_phone || '--'}</h5>
            </div>
            <div className="mar-t-60">
                <p>入库时间</p>
                <h5 className='f-60 color-fff'>{info.storage_time}</h5>
            </div>
            {
                type ? <div className="fix-b">
                    {
                        type == 3 ? <div className='flex-lr'>
                            <button className='btn_m' onClick={() => { btnEvent(1) }} >出库</button>
                            <button className='btn_m' onClick={() => { btnEvent(2) }} >二次更新</button>
                        </div> : <button className='btn_style' onClick={() => { btnEvent(type) }}>{type == 1 ? '确认出库' : '更新重量'}</button>
                    }
                </div> : null
            }

        </div>

    </div>
}
export default LabelRecord