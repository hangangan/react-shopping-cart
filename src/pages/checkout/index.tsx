import React, { useState } from 'react';

import './index.css';

const formItemList = [
  {
    label: '收货人',
    type: 'text',
    id: 'name',
  },
  {
    label: '电话',
    type: 'text',
    id: 'tel',
  },
  {
    label: '城市',
    type: 'text',
    id: 'city',
  },
  {
    label: '省份',
    type: 'text',
    id: 'state',
  },
  {
    label: '具体地址',
    type: 'text',
    id: 'address',
  },
  {
    label: '邮编',
    type: 'text',
    id: 'zip',
  },
];

export default function Checkout() {
  const [form, setForm] = useState({
    name: '',
    tel: '',
    city: '',
    state: '',
    address: '',
    zip: '',
  });
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(form);
  };
  return (
    <div className="checkout-page">
      <main className="form-container">
        <h4 className="form-title">住址信息填写</h4>
        <form className="form">
          {formItemList.map((item, index) => {
            return (
              <div className="form-group" key={index}>
                <label className="form-label" htmlFor={item.id}>
                  {item.label}
                </label>
                <input
                  className="form-input"
                  type={item.type}
                  id={item.id}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [item.id]: e.target.value,
                    })
                  }
                />
              </div>
            );
          })}
          <div className="button-container">
            <button
              className="button-item"
              type="submit"
              onClick={handleSubmit}
            >
              提交
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
