import React from "react";
import { useAppSelector } from "../../store/hooks";
import { cmt } from "../../store/cart";

const ShoppingCart: React.FC = () => {
  const cartCmts = useAppSelector((state) => state.cart.cartCmts);

  const gotoPay = (cartCmts: cmt[]) => {
    return () => {
      console.log("去支付");
      console.log(cartCmts);
    };
  };

  return (
    <div>
      {cartCmts.map((item,index) => (
        <div className="cmtItem" key={index}>
          <div className="cmtBox">
            <div className="cmtTitle">{item?.title}</div>
            <div className="cmtUid">编号：{item?.uid}</div>
          </div>
        </div>
      ))}

      <button onClick={gotoPay(cartCmts)}>去支付</button>
    </div>
  );
};

export default ShoppingCart;
