import { useEffect, useState, useContext, useRef } from 'react'
import TopNav from '../../component/topNav/index.jsx'
import choosedIcon from '../../img/choose.png'
import './index.scss'
import Api from '../../utils/api.js'
import { myContext } from '../../utils/context.js'
import utils from '../../utils/index.js'
function StoreIn(props) {
    const defaultInfo = {
        "hw_name": "",                                /* 危废名称  */
        "hw_type": "",                                /* 危废类别  */
        "hw_code": "",                      /* 危废代码  */
        "composition": "",                            /* 危废成分  */
        "physical_form": "",                           /* 物理性状  */
        "weight": utils.getWeight(),                               /* 重量，吨  */
        "package_mode": null,                            /* 包装方式，代码项  */
        "danger_feature": "",                          /* 危险特性  */
        "safety_measure": "",                           /* 安全措施  */
        "enterprise_code": localStorage.getItem('enterprise_code'),
        "room_id": "",                   /* 危废间id  */
        "manager": "",                            /* 危废管理员  */
        "ehs": "",                                /* 危废ehs  */
        "person": "",                             /* 危废入库人员  */
        "involved_id": "",                 /* 关联旧的危废id  */
        "force": 0
    }
    const [step, setStep] = useState(1)
    const [name, setName] = useState('')
    const [info, setInfo] = useState(defaultInfo)
    const [plan, setPlan] = useState([])
    const [planAll, setPlanAll] = useState([])
    const [type] = useState(utils.getUrlParam(props.location.search).type)
    const packageModes = useContext(myContext).state.packageModes
    const { dispatch } = useContext(myContext)
    const isHasFirst = useRef(false)
    function nextStep() {
        if (step == 2 && info.package_mode === null) {
            alert('请选择包装方式')
            return
        }
        setStep(prev => prev + 1)
    }
    function backFn() {
        if (step == 1) {
            props.history.go(-1)
        } else {
            setStep(prev => prev - 1)
        }
    }
    function setHwInfo(key, data) {
        setInfo((prev) => {
            return Object.assign({}, prev, { [key]: data })
        })
    }
    function getPlan() {
        const code = localStorage.getItem('enterprise_code')
        Api.plan(code, name).then(res => {
            setPlan(res.result)
            setPlanAll(res.result)
        })
    }
    function chooseName(data) {
        setInfo((prev) => {
            return Object.assign({}, prev, data)
        })
        nextStep()
    }
    function filterList() {
        if (name.trim() == '') {
            if (plan.length == planAll.length) {
                return
            }
            setPlan(planAll)
            return
        }
        let list = planAll.filter(item => item.hw_name.indexOf(name) > -1)
        setPlan(list)
    }
    function storeInHttp() {
        Api.enter(info).then(res => {
            if (res.result.shelve_status == 0) {
                props.history.replace('/result?name=' + res.result.shelve_name)
            } else {
                dispatch({
                    type: 'storeInData',
                    info
                })
                props.history.replace('/storeConfirm?status=' + res.result.shelve_status)
            }
        })
    }
    function handleHttp() {
        Api.handle(info).then(res => {
            props.history.go(-1)
        })
    }
    useEffect(() => {
        getPlan()
        isHasFirst.current = true
    }, [])
    return <div className='store_in '>
        <TopNav backFn={backFn} />
        <div className="process">
            <b style={{ width: step / 3 * 100 + '%' }}></b>
        </div>
        <div className="wrap">
            <div className='step' style={{ display: step == 1 ? 'block' : 'none' }}>
                <h2 className='f-80 color-fff'>危废名称</h2>
                <div className='blue_wrap'>
                    <ul>
                        {
                            plan.map(item => {
                                return (
                                    <li className={info.hw_name == item.hw_name ? 'on' : ''} key={item.hw_name} onClick={() => chooseName(item)}>
                                        <p>{item.hw_name}</p>
                                        {
                                            info.hw_name == item.hw_name ? <img src={choosedIcon} alt="" /> : null
                                        }

                                    </li>
                                )
                            })
                        }
                        {
                            plan.length == 0 && isHasFirst.current ? <p className='align-c pad-50'>暂无相关危废名称</p> : null
                        }
                    </ul>
                </div>

            </div>
            <div className='step' style={{ display: step == 2 ? 'block' : 'none' }}>
                <h2 className='f-80 color-fff'>包装方式</h2>
                <div className='blue_wrap'>
                    <ul>
                        {
                            packageModes.map(item => {
                                return (
                                    <li className={item.item_code == info.package_mode ? 'on' : ''} key={item.item_code} onClick={() => { setHwInfo('package_mode', item.item_code) }}>
                                        <p>{item.item_value}</p>
                                        {
                                            item.item_code == info.package_mode ? <img src={choosedIcon} alt="" /> : null
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className='step' style={{ display: step == 3 ? 'block' : 'none' }}>
                <h2 className='f-80 color-fff'>其他时间</h2>
                <div className="mar-t-60">
                    <p>危废类别</p>
                    <h5 className='f-60 color-fff'>{info.hw_type}</h5>
                </div>
                <div className="mar-t-60">
                    <p>危废编号</p>
                    <h5 className='f-60 color-fff'>{info.hw_code}</h5>
                </div>
                <div className="mar-t-60">
                    <p>主要成分</p>
                    <h5 className='f-60 color-fff'>{info.composition}</h5>
                </div>
                <div className="mar-t-60">
                    <p>物理性状</p>
                    <h5 className='f-60 color-fff'>{info.physical_form}</h5>
                </div>
                <div className='input_item mar-t-60'>
                    <p>重量</p>
                    <input type="text" className='style_input' value={info.weight} onInput={(e) => { setHwInfo('weight', e.target.value) }} />
                </div>
                <div className="mar-t-60">
                    <p>危险情况</p>
                    <h5 className='f-60 color-red'>{info.danger_feature}</h5>
                </div>
                <div className="mar-t-60">
                    <p>安全措施</p>
                    <h5 className='f-60 color-fff'>{info.safety_measure}</h5>
                </div>
            </div>

            <div className="fix-b">
                {
                    step == 1 ?
                        <div className="flex-lr">
                            <input type="text" className='input_bottom' autoFocus onInput={(e) => setName(e.target.value)} />
                            <button className='btn_s' onClick={filterList}>搜索</button>
                        </div> : null
                }
                {
                    step == 2 ?
                        <button className='btn_style' onClick={nextStep}>下一步</button> : null
                }
                {
                    step == 3 ?

                        type == 1 ? <button className='btn_style' onClick={storeInHttp}>确认入库</button> :
                            <button className='btn_style' onClick={handleHttp}>立产立清</button>

                        : null

                }

            </div>
        </div>
    </div>
}
export default StoreIn