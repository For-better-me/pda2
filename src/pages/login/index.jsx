import { useContext, useState, useEffect } from 'react'
import './index.scss'
// import { Button } from 'antd-mobile'
import Api from '../../utils/api'
import { myContext } from '../../utils/context'
function Login(props) {
    const [code, setCode] = useState('2451422153')
    const [errorShow, setErrorShow] = useState(false)
    const { dispatch } = useContext(myContext)
    function getInfo() {
        errorShow && setErrorShow(false)
        Api.getEnterpriseInfo(code).then(res => {
            dispatch({ type: 'enterprise', info: res.result })
            props.history.push('/enterprise?status=in&code=' + code)
        }).catch(err=>{
            if(err.code == 400){
                setErrorShow(true)
            }
        })
    }
    return (
        <div className='login wrap'>
            {
                errorShow ? <div className='error_tip color-fff'>请填写正确PDA配置码</div> : null
            }
            <h1 className='f-60'>你好，<br />欢迎使用危废管理系统</h1>
            <h4 className='color-fff'>PDA配置码</h4>
            <input autoFocus type="text" className='style_input' value={code} onInput={(e) => setCode(e.target.value)} />
            <div className='tip_wrap wrap'>
                <p>获取PDA配置码：</p>
                <p className='color-fff mar-t-10'>管理系统-危废管理-危废间管理</p>
            </div>
            <div className='fix-b'>
                <button className='btn_style' onClick={getInfo}>下一步</button>
            </div>
        </div>
    )
}
export default Login