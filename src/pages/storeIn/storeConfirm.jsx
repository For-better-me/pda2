import IconClose from '../../img/icon_close.png'
import { useContext } from 'react'
import utils from '../../utils'
import { useState } from 'react'
import Api from '../../utils/api.js'
import { myContext } from '../../utils/context.js'

function StoreConfirm(props) {
    const [status] = useState(utils.getUrlParam(props.location.search).status)
    const { state, dispatch } = useContext(myContext)
    function storeInHttp() {
        let data = Object.assign({}, state.storeInData, { force: 1 })
        Api.enter(data).then(res => {
            dispatch({
                type: 'storeInData',
                info: null
            })
            props.history.replace('/result?name=' + res.result.shelve_name)
        })
    }
    return <div className="result">
        {
            status == 1 ? <h4 className='f-60 align-c mar-t-300'>危废间<span className='color-red'>即将存满</span><br />请尽快清理</h4> :
                <h4 className='f-60 align-c  mar-t-300'>危废间<span className='color-red'>储存已满</span><br />请尽快清理</h4>
        }
        <img src={IconClose} className="icon_close" onClick={() => props.history.go(-1)} />
        <div className="fix-b">
            <button className='btn_style' onClick={storeInHttp}>继续入库</button>

        </div>
    </div>
}
export default StoreConfirm