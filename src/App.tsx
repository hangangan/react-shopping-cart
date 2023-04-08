import React,{useState} from 'react';
import { NavLink,useRoutes } from 'react-router-dom';
import routes from "./common/routes/route"
import {useNavigate} from 'react-router-dom'
import { askApi } from './service/api';
import { routeParams,formFillParams, actions } from './common/interfaces/helpMeTypes';
import './App.css';

const App:React.FC = ()=>{
  // const data = askApi('你好')
  // console.log(data)
  const navigate = useNavigate()
  const [userAsk,setUserAsk] = useState<string>('')
  const [loading,setLoading] = useState<boolean>(false)
  const [steps,setSteps] = useState<[routeParams | formFillParams][] >([])
  const element = useRoutes(routes)

  const handleUserAsk = async (e:React.MouseEvent)=>{
    setLoading(true)
    let res = await askApi(userAsk)
    setLoading(false)
    console.log(res)
    try {
//标准JSON：[{"type":"RouteChange","desc":"进入商品详情页","params":{"path":"/commodity"}}]
console.log(res?.substring(res.indexOf('['),res.lastIndexOf(']')+1))
      let actions = JSON.parse(res?.substring(res.indexOf('['),res.lastIndexOf(']')+1) || '')
      setSteps(actions)
      handleActions(actions)
    } catch(e) {
      console.log(e)
    }
  }


  const handleActions = (actions:any)=>{
    for(let item of actions){
      if(item.type === "RouteChange"){
        console.log("进行路由跳转")
        navigate(item.params.path)
      } else if (item.type === "ClickEvent"){
        console.log("点击事件处理")
      } else if (item.type === "FormFill"){
        console.log("表单填写")
      }
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
