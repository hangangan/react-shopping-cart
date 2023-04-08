// export enum routesEnum {
//     Commodity='/commodity',//商品页面
//     ShoppingCart='/shoppingcart',//购物车页面
//     Pay='/pay',//支付页面
//     LocationEdit='/locationedit',//地址信息页面
// }

// export enum actionType {//行为类型
//     RouteChange,//路由跳转行为
//     FormFill, //表单填写行为
//     ClcikEvent, //按钮点击行为
// }

// export enum formEleId {
//     LocationBase='LocationBase',
//     LocationUsername='LocationUsername',
//     LocationPhone='LocationPhone',
// }

// export enum clickEleId {
//     addToCart,
//     addLocation,
//     confirmAddLocation,
//     confirmPay
// }

export interface routeParams {
    type:'RouteChange',
    desc:string,
    params:{
        path:'/commodity' | '/shoppingcart' | '/pay' | '/locationedit'
    }
}

export interface formFillParams {
    type:'FormFill',
    desc:string,
    params:{
        eleId:'LocationBase' | 'LocationUsername' | 'LocationPhone',
        eleType:'INPUT',
        value?:string
    }
}

export interface clickParams {
    type:"ClickEvent",
    desc:string,
    params:{
        eleId:'addToCart' | 'addLocation' | 'confirmAddLocation' | 'confirmPay',
        props?:any
    }
}

export let actions:[routeParams | formFillParams | clickParams][]