import React,{useState} from 'react';
import { useAppSelector } from "../../store/hooks";
import { cmt } from "../../store/cart";

export interface helpPayTypes {
  helpPay:()=>void,
  helpFillLocation:(location:string)=>void,
  helpFillName:(name:string)=>void,
  helpFillPhone:(phone:string)=>void}

export let helpPayCallback:helpPayTypes

const  Pay:React.FC =()=>{
  const cartCmts = useAppSelector((state) => state.cart.cartCmts);
  const [location,setLocation] = useState('')
  const [name,setName] = useState('')
  const [phone,setPhone] = useState('')

  const handlePay = ()=>{
    alert("完成支付！")
  }

  const helpFillLocation = (location:string)=>{
    setLocation(location)
    console.log("location回调成功执行......")
  }


  const helpFillName = (name:string)=>{
    setName(name)
    console.log("name回调成功执行......")
  }

  const helpFillPhone = (phone:string)=>{
    setPhone(phone)
    console.log("phone回调成功执行......")
  }

  helpPayCallback = {
    helpPay:handlePay,
    helpFillLocation,
    helpFillName,
    helpFillPhone
  }

  const handleLocation = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setLocation(e.target.value)
  }

  const handleName = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setName(e.target.value)
  }

  const handlePhone = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setPhone(e.target.value)
  }

  return (
    <div>
      <h3>订单信息</h3>
      <div className="curLocation">
        <div>地址：<input type="text" value={location} onChange={handleLocation} /></div>
        <div>姓名：<input type="text" value={name}  onChange={handleName}/></div>
        <div>电话：<input type="text" value={phone}  onChange={handlePhone}/></div>
      </div>
      <hr />
      <div className="curCmts">
      {cartCmts.map((item,index) => (
        <div className="cmtItem" key={index}>
          <div className="cmtBox">
            <div className="cmtTitle">{item?.title}</div>
            <div className="cmtUid">编号：{item?.uid}</div>
          </div>
        </div>
      ))}
      </div>
      <hr />
      <button onClick={handlePay}>去支付</button>
    </div>
  );
}

export default  Pay;