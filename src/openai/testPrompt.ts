export const testPrompt = `
请学习以下模型：

export interface routeParams {
    type:'RouteChange',
    desc:string,
    params:{
        /**
         * commodity商品页面 支持浏览商品、加购
         * shoppingcart购物车 支持查看加购物品、去支付
         * pay支付页面 支持填写地址、查看即将购买的物品、确认支付（确认支付默认确认了地址信息）
        */
        path:'/commodity' | '/shoppingcart' | '/pay'
    }
}

export interface formFillParams {
    type:'FormFill',
    desc:string,
    params:{
        eleId:'LocationBase' | 'LocationUsername' | 'LocationPhone',
        eleType:'INPUT',
        value:string,
        needMoreMsgFromUser?:boolean,
        needHowMsg?:string,
    }
}

export interface clickParams {
    type:"ClickEvent",
    desc:string,
    params:{
        eleId:'addToCart' | 'addLocation' | 'confirmPay',
        props?:{
            cmtName?:string,
        }
    }
}

export let actions:[routeParams | formFillParams | clickParams][]

这是一个用于确定用户达到自己的需求需要在页面中触发的行为的场景，行为可能有一步也可能有多步。
当需要从用户获取额外信息时，你可以先在value字段帮忙给出示例值。
请根据场景返回actions以JSON格式描述的具体值。
不需要类似于’//xxx‘这样的注释，谢谢
不需要在JSON前后加上文字说明，谢谢
`