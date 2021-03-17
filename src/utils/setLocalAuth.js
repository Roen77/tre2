export const setlocalAuth=(data)=>{
    localStorage.setItem('auth',data)
}
export const setlocalemail=(data)=>{
    localStorage.setItem('email',data)
}

export const getlocalAuth=()=>{
   return localStorage.getItem('auth');
}

export const getlocalemail=()=>{
    return localStorage.getItem('email');
 }