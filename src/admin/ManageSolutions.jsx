import {useEffect,useMemo,useState} from 'react';
import {Link} from 'react-router-dom';
import toast from 'react-hot-toast';
import {HiPlus,HiPencil,HiTrash,HiExternalLink,HiSearch} from 'react-icons/hi';
import {api,errorDetails} from '../lib/api';

export default function ManageSolutions(){
  const [items,setItems]=useState([]),[loading,setLoading]=useState(true),[busy,setBusy]=useState(''),[search,setSearch]=useState('');
  const load=async()=>{setLoading(true);try{setItems((await api.get('/admin/solutions')).data)}catch(e){toast.error(errorDetails(e).summary)}finally{setLoading(false)}};
  useEffect(()=>{load()},[]);
  const filtered=useMemo(()=>items.filter(x=>(x.title+' '+(x.shortTitle||'')+' '+x.description).toLowerCase().includes(search.toLowerCase())),[items,search]);
  const toggle=async item=>{setBusy(item.id);try{await api.patch('/admin/solutions/'+item.id+'/status',{enabled:!item.enabled});setItems(rows=>rows.map(x=>x.id===item.id?{...x,enabled:!x.enabled}:x));toast.success(item.enabled?'Solution disabled':'Solution enabled')}catch(e){toast.error(errorDetails(e).summary)}finally{setBusy('')}};
  const remove=async item=>{if(!confirm('Delete “'+item.title+'” and all of its features and pricing packages?'))return;setBusy(item.id);try{await api.delete('/admin/solutions/'+item.id);setItems(rows=>rows.filter(x=>x.id!==item.id));toast.success('Solution deleted')}catch(e){toast.error(errorDetails(e).summary)}finally{setBusy('')}};
  return <div className="min-w-0 space-y-6">
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold uppercase tracking-wider text-primary-400">Content management</p><h1 className="mt-1 text-3xl font-bold text-white">Solutions</h1><p className="mt-1 text-dark-400">Manage website solutions, key features, and pricing packages.</p></div><Link to="/admin/solutions/new" className="admin-btn-primary flex w-full items-center justify-center gap-2 sm:w-auto"><HiPlus/>Add New Solution</Link></header>
    <div className="relative max-w-xl"><HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500"/><input className="admin-input pl-11" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search solutions…"/></div>
    {loading?<div className="admin-card text-dark-400">Loading solutions…</div>:<div className="grid gap-4 xl:grid-cols-2">{filtered.map(item=><article key={item.id} className="admin-card flex min-w-0 flex-col gap-4 p-5 sm:flex-row">
      <div className="h-28 w-full overflow-hidden rounded-xl bg-dark-900 sm:h-32 sm:w-40 sm:flex-none">{item.imageUrl?<img src={item.imageUrl} alt="" className="h-full w-full object-cover"/>:<div className="grid h-full place-items-center text-3xl font-bold text-primary-400">{item.title.charAt(0)}</div>}</div>
      <div className="min-w-0 flex-1"><div className="flex flex-wrap items-start justify-between gap-2"><div><h2 className="text-lg font-semibold text-white">{item.title}</h2><p className="text-xs text-dark-500">{item.slug}</p></div><button disabled={busy===item.id} onClick={()=>toggle(item)} className={'rounded-full px-3 py-1 text-xs font-semibold '+(item.enabled?'bg-green-500/15 text-green-400':'bg-dark-700 text-dark-400')}>{item.enabled?'Enabled':'Disabled'}</button></div><p className="mt-3 line-clamp-2 text-sm text-dark-300">{item.description}</p><div className="mt-3 flex flex-wrap gap-3 text-xs text-dark-500"><span>Order {item.displayOrder}</span><span>{item.keyFeatures.length} features</span><span>{item.packages.length} packages</span></div><div className="mt-4 grid grid-cols-3 gap-2"><Link className="admin-btn-secondary flex items-center justify-center gap-1 px-2 py-2 text-xs" to={'/admin/solutions/edit/'+item.id}><HiPencil/>Edit</Link><Link className="admin-btn-secondary flex items-center justify-center gap-1 px-2 py-2 text-xs" to={'/solutions/'+item.slug} target="_blank"><HiExternalLink/>View</Link><button disabled={busy===item.id} className="admin-btn-danger flex items-center justify-center gap-1 px-2 py-2 text-xs" onClick={()=>remove(item)}><HiTrash/>Delete</button></div></div>
    </article>)}</div>}
    {!loading&&!filtered.length&&<div className="admin-card py-12 text-center text-dark-400">No solutions match your search.</div>}
  </div>
}
