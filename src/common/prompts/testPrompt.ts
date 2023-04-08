export const testPrompt= `
请学习以下模型：

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

这是一个用于确定用户达到自己的需求需要在页面中触发的行为的场景，行为可能有一步也可能有多步，请根据场景返回actions以JSON格式描述的具体值，请特别注意不要有任何JSON以外的任何文字说明或解释,如果不得不解释，请将解释添加在desc属性中。
`