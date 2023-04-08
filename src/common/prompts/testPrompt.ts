export const testPrompt= `
请学习以下模型：

export enum routesEnum {
    Commodity='/commodity',//商品页面
    ShoppingCart='/shoppingcart',//购物车页面 这里有用户加购的商品
    Pay:'/pay',//支付页面
    LocationEdit:'/locationedit',//地址信息页面
}

export enum actionType {//行为类型
    RouteChange//路由跳转行为
}

export enum formEleId {
    LocationBase='LocationBase', //地址列表页面-用于输入地址信息
    LocationUsername='LocationUsername', //地址列表页面-用于输入用户名称
    LocationPhone='LocationPhone',//地址列表页面-用于输入用户电话
}

export enum clickEleId {
    addToCart,
    addLocation,
    confirmAddLocation,
    confirmPay
}

export interface routeParams {
    type:'RouteChange',
    desc:string,
    params:{
        path:string
    }
}

export interface formFillParams {
    type:'FormFill',
    desc:string,
    params:{
        eleId:formEleId,
        eleType:'INPUT',
        value?:string
    }
}

export interface clickParams {
    type:"ClickEvent",
    desc:string,
    params:{
        eleId:clickEleId,
        props?:any
    }
}

export let actions:[routeParams | formFillParams | clickParams][]

这是一个用于确定用户达到自己的需求需要在页面中触发的行为的场景，行为可能有一步也可能有多步，请根据场景返回actions以JSON格式描述的具体值，请特别注意不要有任何JSON以外的任何文字说明或解释,如果不得不解释，请将解释添加在desc属性中。
`