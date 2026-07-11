import {Navigate,useParams} from 'react-router-dom';
import {useData} from '../context/DataContext';
export default function PricingDetail(){const {id}=useParams(),{solutions,loading}=useData();if(loading)return <div className="min-h-screen pt-32 text-center text-dark-400">Loading pricing…</div>;const solution=solutions.find(s=>s.id===id||s.icon===id);return <Navigate to={solution?'/solutions/'+solution.id+'#pricing':'/pricing'} replace/>}
