import 'antd-mobile/dist/antd-mobile.css'
import './App.scss';
import { useContext, useEffect } from 'react';
import { myContext } from './utils/context';
import Api from './utils/api';
function App(props) {
  const { dispatch } = useContext(myContext)
  useEffect(() => {
    function getItemCode() {
      Api.getItemCode(101).then(res => {
        dispatch({
          type: 'packageMode',
          list: res.result
        })
      })
    }
    getItemCode()
  }, [])
  return (
    <div className="App">
      {props.children}
    </div>
  );
}

export default App;
