import { OpenAIApi,Configuration } from "openai"
import { GPT_KEY,ORG_KEY } from "./const";
import {testPrompt} from "./testPrompt";

const apiClient = new OpenAIApi(
    new Configuration({
        organization: ORG_KEY,
        apiKey: GPT_KEY })
    )
const model = 'gpt-3.5-turbo';
export const askApi = async (userInput:string)=>{
    const res = await apiClient.createChatCompletion({
        model,
        messages:[
            {
                role:'system',
                content:testPrompt
            },{
                role:'user',
                content:userInput
            }
        ]
    })
    const data = res.data.choices[0].message?.content
    if(data){
        try{
            // return JSON.parse(data);
            return data
        }catch(e){
            console.error(e);
        }
    }
}