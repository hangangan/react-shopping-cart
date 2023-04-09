import React,{useState} from 'react';
import { useDispatch } from 'react-redux'
import { addCmt } from '../../store/cart';

export interface helpCmtTypes {
  helpAddToCart :(cmtId:string)=>void
}

export let helpCmtCallback :helpCmtTypes

const  Commodity:React.FC = ()=>{
  const dispatch = useDispatch()
  const [cmts,setCmts] = useState([{
    id:0,
    title:'商品A',
    uid:'qqqqq'
  },{
    id:1,
    title:'商品B',
    uid:'zzzzzz'
  }])

  const addToCart = (cmtId:string)=>{
    return ()=>{
      console.log("将物品加入购物车"+cmtId)
      dispatch(addCmt(cmts.filter(item=>item.uid===cmtId)[0]))
    }
  }

  const helpAddToCart = (cmtId:string)=>{
    console.log("将物品加入购物车"+cmtId+'加购回调函数成功执行......')
    dispatch(addCmt(cmts.filter(item=>item.uid===cmtId)[0]))
  }

  helpCmtCallback = {helpAddToCart}

  return (
    <div>
      {
        cmts.map(item=>(
          <div className="cmtItem" key={item.uid}>
            <div className="cmtBox">
            <div className="cmtTitle">{item.title}</div>
            <div className="cmtUid">编号：{item.uid}</div>
            </div>
            <button onClick={addToCart(item.uid)}>加入购物车</button>
          </div>
        ))
      }
    </div>
  );
}

export default  Commodity;
