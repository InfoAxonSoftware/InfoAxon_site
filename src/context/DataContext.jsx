import {createContext,useCallback,useContext,useEffect,useState} from 'react';
import {api,messageOf} from '../lib/api';
import {defaultCompanyInfo} from '../data/defaultData';
const DataContext=createContext();
export function DataProvider({children}){
  const [state,setState]=useState({solutions:[],projects:[],companyInfo:defaultCompanyInfo,loading:true,error:''});
  const refresh=useCallback(async()=>{setState(s=>({...s,loading:true,error:''}));try{const [solutions,projects,company]=await Promise.all([api.get('/solutions'),api.get('/projects'),api.get('/company')]);setState({solutions:solutions.data.map(s=>({...s.content,...s,id:s.slug,databaseId:s.id})),projects:projects.data.map(p=>({...p.content,...p,id:p.slug,databaseId:p.id})),companyInfo:{...defaultCompanyInfo,...company.data,...(company.data?.content||{})},loading:false,error:''});}catch(error){setState(s=>({...s,loading:false,error:messageOf(error)}));}},[]);
  useEffect(()=>{refresh();},[refresh]);
  const solutionPayload=v=>({slug:v.id,title:v.title,subtitle:v.subtitle||v.tagline||null,description:v.description||v.title,icon:typeof v.icon==='string'?v.icon:null,imageUrl:v.image||v.imageUrl||null,content:v});
  const projectPayload=v=>({slug:v.id,title:v.title,category:v.category||null,description:v.description||v.title,imageUrl:v.image||v.imageUrl||null,featured:Boolean(v.featured),content:v});
  const companyPayload=v=>({name:v.name||'InfoAxon Software Solutions',phone:v.phone,email:v.email,address:v.address,whatsapp:v.whatsapp||'94711474064',socialLinks:v.socialLinks,content:v});
  const mutate=async(resource,method,id,data)=>{const response=await api({url:`/admin/${resource}${id?`/${id}`:''}`,method,data});await refresh();return response.data;};
  return <DataContext.Provider value={{...state,refresh,addSolution:(v)=>mutate('solutions','post',null,solutionPayload(v)),updateSolution:(id,v)=>mutate('solutions','put',state.solutions.find(x=>x.id===id)?.databaseId||id,solutionPayload(v)),deleteSolution:(id)=>mutate('solutions','delete',state.solutions.find(x=>x.id===id)?.databaseId||id),addProject:(v)=>mutate('projects','post',null,projectPayload(v)),updateProject:(id,v)=>mutate('projects','put',state.projects.find(x=>x.id===id)?.databaseId||id,projectPayload(v)),deleteProject:(id)=>mutate('projects','delete',state.projects.find(x=>x.id===id)?.databaseId||id),updateCompanyInfo:(v)=>mutate('company','put',null,companyPayload(v))}}>{children}</DataContext.Provider>;
}
export function useData(){const value=useContext(DataContext);if(!value)throw new Error('useData must be used within DataProvider');return value;}