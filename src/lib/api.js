import axios from 'axios';
export const api=axios.create({baseURL:import.meta.env.VITE_API_URL||'/api',timeout:12000});
api.interceptors.request.use((config)=>{const token=sessionStorage.getItem('infoaxon_admin_token');if(token)config.headers.Authorization=`Bearer ${token}`;return config;});
api.interceptors.response.use((r)=>r,(error)=>{if(error.response?.status===401&&location.pathname.startsWith('/admin')&&!location.pathname.endsWith('/login')){sessionStorage.removeItem('infoaxon_admin_token');location.assign('/admin/login');}return Promise.reject(error);});
export const messageOf=(error)=>error.response?.data?.message||error.message||'Something went wrong';