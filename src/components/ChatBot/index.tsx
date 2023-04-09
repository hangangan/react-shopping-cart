import React from 'react';
import './index.css';
import { useCart } from 'contexts/cart-context';
import { FormContext } from 'contexts/form-context/FormContextProvider';

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 输入框内容变化
  onSearch?: (e?: KeyboardEvent) => void; // 按下回车
  SearchResult: React.ReactNode; // 搜索结果
}

export default function ChatBot({ onChange, onSearch, SearchResult }: Props) {
  const [visible, setVisible] = React.useState(false);
  // 在这里获得表单数据
  const {form} = React.useContext(FormContext);
  // 在这里获取到了购物车的数据！！！
  const { products, total } = useCart();
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
          onChange={onChange}
        />
        <div
          className="icon-search"
          onClick={() => onSearch && onSearch()}
          style={{
            cursor: 'pointer',
          }}
        ></div>
      </div>
      <div className="search-result-container">{SearchResult}</div>
    </div>
  );
}
