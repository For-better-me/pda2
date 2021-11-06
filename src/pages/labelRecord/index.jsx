import { useEffect, useState, useContext } from 'react'
import TopNav from '../../component/topNav/index.jsx'
import './index.scss'
import Api from '../../utils/api'
import { Toast, ListView } from 'antd-mobile'
import utils from '../../utils/index.js'
import { myContext } from '../../utils/context'
function LabelRecord(props) {
    const [page, setPage] = useState(0)
    const [total, setTotal] = useState(0)
    const [list, setList] = useState([])
    const [code, setCode] = useState('')
    const [hasMore, setHasMore] = useState(true)
    const packageModes = useContext(myContext).state.packageModes
    // const dataSource = new ListView.DataSource({
    //     rowHasChanged: (row1, row2) => row1 !== row2,
    //   });
    function loadMore() {
        setPage((prev) => prev + 1)
        setHasMore(total >= page)
    }
    function getList() {
        let param = {
            size: 6,
            enterprise_code: localStorage.getItem('enterprise_code'),
            page,
            label_code: code

        }
        Api.labelList(param).then(res => {
            if (res.result.content == 0) {
                Toast.info('暂无相关标签记录')
            } else {
                setList((prev) => {
                    let list = page == 0 ? [] : prev
                    return list.concat(res.result.content)
                })
            }

            setTotal(res.result.totalElements / 6 + 1)
        })
    }
    function labelHandle(info) {
        if (info.label_validation == 2) {
            return
        }
        Api.labelHandle(info.label_code).then(res => {
            setList((prev) => {
                return prev.map(el => {
                    if (el.label_code == info.label_code) {
                        el.label_validation = 2
                    }
                    return el
                })
            })
        })
    }
    function lookInfo(label_code) {
        props.history.push(`/label_info?code=${label_code}`)
    }
    let index = list.length - 1;
    // const row = (rowData, sectionID, rowID) => {
    //     if (index < 0) {
    //         index = list.length - 1;
    //     }
    //     const item = list[index--];
    //     console.log(rowData, sectionID, rowID);
    //     return (
    //         <li className='label_item' key={item.label_code}>
    //             <div className="title flex-lr flex-center">
    //                 <h4 className='f-40 color-fff'>{item.label_code}</h4>
    //                 <b className={item.label_validation == 1 ? 'label_status on' : 'label_status off'} onClick={() => labelHandle(item)}>{item.label_validation == 1 ? '弃用' : '无效'}</b>
    //             </div>
    //             <div className='content' onClick={() => lookInfo(item.label_code)}>
    //                 <div className="flex">
    //                     <p>时间</p>
    //                     <div className='color-fff flex-grow'>{item.storage_time}</div>
    //                 </div>
    //                 <div className="flex">
    //                     <p>危废名称</p>
    //                     <div className='color-fff flex-grow'>{item.hw_name}</div>
    //                 </div>
    //                 <div className="flex">
    //                     <p>主要成分</p>
    //                     <div className='color-fff flex-grow'>{item.composition}</div>
    //                 </div>
    //                 <div className='flag_wrap'>
    //                     <p>{utils.getPackageName(packageModes, item.package_mode)}</p>
    //                     <p>{item.weight}吨</p>
    //                     <p className='red'>{utils.getStatusName(item.hw_status)}</p>
    //                 </div>
    //             </div>
    //         </li>
    //         )
    // };
    useEffect(() => {
        getList()
    }, [page])

    return <div className='label'>
        <TopNav />
        <div className='label_list wrap'>
            <h2>危废基本信息</h2>
            <ul>
                {
                    list.map(item => {
                        return (
                            <li className='label_item' key={item.label_code}>
                                <div className="title flex-lr flex-center">
                                    <h4 className='f-40 color-fff'>{item.label_code}</h4>
                                    <b className={item.label_validation == 1 ? 'label_status on' : 'label_status off'} onClick={() => labelHandle(item)}>{item.label_validation == 1 ? '弃用' : '无效'}</b>
                                </div>
                                <div className='content' onClick={() => lookInfo(item.label_code)}>
                                    <div className="flex">
                                        <p>时间</p>
                                        <div className='color-fff flex-grow'>{item.storage_time}</div>
                                    </div>
                                    <div className="flex">
                                        <p>危废名称</p>
                                        <div className='color-fff flex-grow'>{item.hw_name}</div>
                                    </div>
                                    <div className="flex">
                                        <p>主要成分</p>
                                        <div className='color-fff flex-grow'>{item.composition}</div>
                                    </div>
                                    <div className='flag_wrap'>
                                        <p>{utils.getPackageName(packageModes, item.package_mode)}</p>
                                        <p>{item.weight}吨</p>
                                        <p className='red'>{utils.getStatusName(item.hw_status)}</p>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            {/* <ListView
                dataSource={list}
                renderRow={row}
                pageSize={1}
                useBodyScroll
                onScroll={() => { console.log('scroll'); }}
                scrollRenderAheadDistance={500}
                onEndReached={loadMore}
                onEndReachedThreshold={10}
            /> */}
            <div className="fix-b">
                <div className="flex-lr">
                    <input type="text" className='input_bottom' onInput={(e) => setCode(e.target.value)} />
                    <button className='btn_s' onClick={() => setPage(1)}>搜索</button>
                </div>
            </div>
        </div>

    </div>
}
export default LabelRecord