import React,{useState} from 'react';
import { NavLink,useRoutes } from 'react-router-dom';
import routes from "./common/routes/route"
import { askApi } from './service/api';
import { actionType,routeParams,formFillParams } from './common/interfaces/helpMeTypes';
import './App.css';

const App:React.FC = ()=>{
  // const data = askApi('你好')
  // console.log(data)
  const [userAsk,setUserAsk] = useState<string>('')
  const [loading,setLoading] = useState<boolean>(false)
  const [steps,setSteps] = useState<[routeParams | formFillParams][]>([])
  const element = useRoutes(routes)

  const handleUserAsk = async (e:React.MouseEvent)=>{
    setLoading(true)
    const res = await askApi(userAsk)
    setLoading(false)
    console.log(res)
    try {
      setSteps(JSON.parse(res || ''))
    } catch(e) {
      console.log(e)
    }
  }
  return (
    <div className="App">
      <div className="left">
      <div className="content">
      <div className="nav">
      <NavLink to="commodity">商品</NavLink>
      <NavLink to="shoppingcart">购物车</NavLink>
      <NavLink to="pay">支付</NavLink>
      <NavLink to="locationedit">地址列表</NavLink>
      </div>
      {element}
      </div>
      </div>
      <div className="right">
        <h3>帮助中心</h3>
        <input type="text" value={userAsk} onChange={(e)=>setUserAsk(e.target.value)} />
        <button onClick={handleUserAsk}>提交</button>
        <div className="steps">
          {
            loading ? <div>Loading....</div>
            : (
              <><h5>您需要完成一下步骤：</h5>
              <div>{JSON.stringify(steps)}</div></>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
