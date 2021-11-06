import React from 'react';
import App from '../App.jsx';
import Login from '../pages/login/index.jsx'
import Enterprise from '../pages/enterprise/index.jsx'
import OverView from '../pages/overview/index.jsx'
import StoreIn from '../pages/storeIn/index.jsx'
import Result from '../pages/storeIn/storeResult'
import StoreConfirm from '../pages/storeIn/storeConfirm'
import LabelRecord from '../pages/labelRecord/index.jsx'
import LabelInfo from '../pages/labelRecord/info.jsx'
import { HashRouter, Switch, Route, BrowserRouter } from 'react-router-dom';
import { Context } from '../utils/context';

// import { Provider } from 'react-redux'
// import store from '../store/index'
const BasicRoute = () => (
    <HashRouter>
        <Switch>
            {/* <Provider store={store}>
                <App>
                </App>
            </Provider> */}
            <Context>
                <App>
                    <Route path='/' component={Login} exact />
                    <Route path='/enterprise' component={Enterprise} exact />
                    <Route path='/overView' component={OverView} exact />
                    <Route path='/store_in' component={StoreIn} exact />
                    <Route path='/result' component={Result} exact />
                    <Route path='/storeConfirm' component={StoreConfirm} exact />
                    <Route path='/label_record' component={LabelRecord} exact />
                    <Route path='/label_info' component={LabelInfo} exact />
                </App>
            </Context>



        </Switch>

    </HashRouter>
);


export default BasicRoute;