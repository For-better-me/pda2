import { useEffect } from 'react'
import IconBack from '../../img/icon_back.png'
import { withRouter } from 'react-router-dom'
import './index.scss'
function TopNav(props){
    function back(){
        if(props.backFn){
            props.backFn()
            return
        }
        props.history.go(-1)
    }
    return <div className='top_nav' onClick={back}>
        <img src={IconBack} className="icon_back" />
    </div>
}
export default withRouter(TopNav)