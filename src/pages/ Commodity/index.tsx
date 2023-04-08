import React,{useState} from 'react';

const  Commodity:React.FC = ()=>{

  const [cmts,setCmts] = useState([{
    id:0,
    title:'商品A',
    uid:'#qqqqq'
  },{
    id:1,
    title:'商品B',
    uid:'#zzzzzz'
  }])

  const addToCart = (cmtId:string)=>{
    return ()=>{
      console.log("将物品加入购物车"+cmtId)
    }
  }

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
