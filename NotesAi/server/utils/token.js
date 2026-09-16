import jwt from "jsonwebtoken"
 
export default async function token({userId}){
    try{
   const secret = process.env.SECRET;
   const token = await jwt.sign({userId},secret,{
    expiresIn:"7d"
   });
   return token;
}
catch(e){
    return e.message;
}
};