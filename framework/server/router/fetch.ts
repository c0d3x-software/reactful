import { response } from "../shared"
import { routing } from "./routing"
import { stream } from "./stream"
import { serve } from "./asset"

export async function fetcher(request: Request) {
   try {                        
      return await routing(request)
          || await stream(request)
          || await serve(request)
   } 
   catch(ex: any) {
      console.error('reactful', ex)         
      return response(500, ex.message || ex)
   }     
}