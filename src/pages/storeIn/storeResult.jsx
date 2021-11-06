import OkImg from '../../img/in_ok.png'
import IconClose from '../../img/icon_close.png'
import qs from 'qs'
import utils from '../../utils'
import { useState } from 'react'
function Result(props) {
    const [name] = useState(utils.getUrlParam(props.location.search).name)
    return <div className="result">
        <img src={OkImg} className="img" />
        <h4>确认入库</h4>
        <p>请将该危废摆放至<span className='color-green'>{name}</span></p>
        <img src={IconClose} className="icon_close" onClick={() => props.history.go(-1)} />
    </div>
}
export default Result