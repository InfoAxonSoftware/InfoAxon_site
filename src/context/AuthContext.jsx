import {createContext,useContext,useEffect,useState} from 'react';
import {api,messageOf} from '../lib/api';
const AuthContext=createContext();
const TOKEN_KEY='infoaxon_admin_token';
export function AuthProvider({children}){
  const [admin,setAdmin]=useState(null),[loading,setLoading]=useState(Boolean(sessionStorage.getItem(TOKEN_KEY)));
  useEffect(()=>{if(!sessionStorage.getItem(TOKEN_KEY)){setLoading(false);return;}api.get('/auth/me').then(({data})=>setAdmin(data.admin)).catch(()=>sessionStorage.removeItem(TOKEN_KEY)).finally(()=>setLoading(false));},[]);
  const login=async(username,password)=>{try{const {data}=await api.post('/auth/login',{username,password});sessionStorage.setItem(TOKEN_KEY,data.token);setAdmin(data.admin);return{success:true};}catch(error){return{success:false,error:messageOf(error)};}};
  const logout=async()=>{try{await api.post('/auth/logout');}catch{}sessionStorage.removeItem(TOKEN_KEY);setAdmin(null);};
  const changePassword=async(values)=>(await api.post('/auth/change-password',values)).data;
  return <AuthContext.Provider value={{admin,isAuthenticated:Boolean(admin),loading,login,logout,changePassword}}>{children}</AuthContext.Provider>;
}
export function useAuth(){const value=useContext(AuthContext);if(!value)throw new Error('useAuth must be used within AuthProvider');return value;}