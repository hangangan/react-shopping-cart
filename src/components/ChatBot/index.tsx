import React, { useState, useRef } from 'react';
import './index.css';
import { useCart } from 'contexts/cart-context';
import { FormContext } from 'contexts/form-context/FormContextProvider';
import { routeParams, formFillParams } from './helpMeTypes';
import { askApi } from '../../openai/api';
import { useNavigate } from 'react-router-dom';
import { IProduct } from 'models';
import { Form } from 'contexts/form-context/FormContextProvider';
import { useProducts } from 'contexts/products-context';

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 输入框内容变化
  onSearch?: (e?: KeyboardEvent) => void; // 按下回车
  SearchResult: React.ReactNode; // 搜索结果
}

export default function ChatBot({ onChange, onSearch, SearchResult }: Props) {
  const navigate = useNavigate();
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [steps, setSteps] = useState<[routeParams | formFillParams][]>([]);
  const [curStep, setCurstep] = useState<number>(-1);
  const curStepRef = useRef(curStep);
  const [userAsk, setUserAsk] = useState<string>('');

  // 在这里获得表单数据
  const { form, setForm } = React.useContext(FormContext);
  // 在这里获取到了购物车的数据！！！
  // 很好，很优秀！！
  const { products, total, addProduct, openCart } = useCart();

  const productsData = useProducts().products

  const helpAddToCart = (id: number) => {
    console.log('加购回调函数ing');
    const product = productsData.filter((item) => item.id === id)[0];
    product && addProduct({ ...product, quantity: 1 });
    openCart();
  };

  const helpChangeRoute = (path: string) => {
    console.log('路由回调函数ing');
    navigate(path);
  };

  const helpFillForm = (form: Form) => {
    console.log('表单填写回调函数ing');
    setForm(form);
  };

  const helpConfirmLocation = () => {
    console.log('确认地址回调函数ing');
    alert('确认地址信息成功！当前地址信息' + JSON.stringify(form));
  };

  const helpPay = () => {
    console.log('确认支付回调函数ing');
    alert('Add some product in the cart!');
  };

  //#region
  // 监听cmd + K  ，显示隐藏
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'k') {
        setVisible(!visible);
        e.preventDefault();
        e.stopPropagation();
      }
      console.log(products, 'products');
      console.log(total, 'total');
      console.log(form, 'form');
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible]);

  // 监听点击事件，点击其他地方隐藏
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.chat-bot')) {
        return;
      }
      setVisible(false);
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // 监听回车事件
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onSearch && onSearch(e);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSearch]);
  //#endregion

  // const handleActions = (actions: any) => {
  //   setCurstep(-1)
  //   for (let i = 0; i < actions.length; i++) {
  //     let item = actions[i];
  //     setTimeout(() => {
  //       curStepRef.current++;
  //       setCurstep(curStepRef.current);
  //       if (item.type === "RouteChange") {
  //         console.log("进行路由跳转");
  //         navigate(item.params.path);
  //       } else if (item.type === "ClickEvent") {
  //         console.log("点击事件处理");
  //         switch (item.params.eleId) {
  //           case "addToCart":
  //             console.log("加购" + item.params.props.cmtName);
  //             helpCmtCallback.helpAddToCart(item.params.props.cmtName);
  //             break;
  //           default:
  //             break;
  //         }
  //       } else if (item.type === "FormFill") {
  //         console.log("表单填写");
  //         switch (item.params.eleId) {
  //           case "LocationBase":
  //             console.log("填写地址信息" + item.params.value);
  //             helpPayCallback?.helpFillLocation(item.params.value);
  //             break;
  //           case "LocationUsername":
  //             console.log("填写姓名信息" + item.params.value);
  //             helpPayCallback?.helpFillName(item.params.value);
  //             break;
  //           case "LocationPhone":
  //             console.log("填写电话信息" + item.params.value);
  //             helpPayCallback?.helpFillPhone(item.params.value);
  //             break;
  //           default:
  //             break;
  //         }
  //       }
  //     }, 5000 * i);
  //   }
  // };

  const askChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // onChange && onChange(e);
    setUserAsk(e.target.value);
  };

  const askChat = (e: React.MouseEvent) => {
    // onSearch && onSearch();
    // 接入chatGPT
    handleUserAsk();
  };

  const handleUserAsk = async () => {
    setLoading(true);
    setSteps([]);
    let res = await askApi(userAsk);
    // let res = ''
    setLoading(false);
    console.log(res);
    try {
      //标准JSON：[{"type":"RouteChange","desc":"进入商品详情页","params":{"path":"/commodity"}}]
      let actions = JSON.parse(
        res?.substring(res.indexOf('['), res.lastIndexOf(']') + 1) || ''
      );
      console.log(actions);
      setSteps(actions);
      handleActions(actions);
    } catch (e) {
      console.log(e);
    }
  };

  const handleActions = (actions: any) => {
    setCurstep(-1);
    for (let i = 0; i < actions.length; i++) {
      let item = actions[i];
      setTimeout(() => {
        curStepRef.current++;
        setCurstep(curStepRef.current);
        if (item.type === 'RouteChange') {
          console.log('进行路由跳转');
          helpChangeRoute(item.params.path);
        } else if (item.type === 'ClickEvent') {
          console.log('点击事件处理');
          switch (item.actionId) {
            case 'addToCart':
              console.log('加购' + item.params.productId);
              helpAddToCart(item.params.productId);
              break;
            case 'confirmLocation':
              console.log('确认地址信息');
              helpConfirmLocation();
              break;
            case 'confirmPay':
              console.log('确认支付');
              helpPay();
              break;
            default:
              break;
          }
        } else if (item.type === 'FormFill') {
          console.log('表单填写');
          switch (item.action) {
            case 'fillLocation':
              console.log('填写地址信息' + item.params);
              helpFillForm(item.params);
              break;
            default:
              break;
          }
        }
      }, 5000 * i);
    }
  };

  return (
    <div
      className="chat-bot"
      style={{
        visibility: visible ? 'visible' : 'hidden',
      }}
    >
      <div className="chat-input-container">
        <div className="bot-img-container">
          <img src={require('./robot.png')} alt="robot" className="robot" />
        </div>
        <input
          type="text"
          className="chat-input"
          placeholder="智能机器人"
          value={userAsk}
          onChange={askChange}
        />
        <div
          className="icon-search"
          onClick={askChat}
          style={{
            cursor: 'pointer',
          }}
        ></div>
      </div>
      <div className="search-result-container">
        {loading ? (
          <div>Loading....</div>
        ) : (
          <>
            <h5>您需要完成一下步骤：</h5>
            <div>
              {JSON.parse(JSON.stringify(steps)).map(
                (item: any, index: number) => (
                  <div key={index}>
                    {item.desc}
                    {curStep > index && (
                      <span style={{ color: 'green' }}>已完成</span>
                    )}
                    {curStep === index && (
                      <span style={{ color: 'blue' }}>进行中</span>
                    )}
                    {curStep < index && (
                      <span style={{ color: 'red' }}>未完成</span>
                    )}
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
