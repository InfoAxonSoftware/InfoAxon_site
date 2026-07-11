import React from 'react';
export default class AppErrorBoundary extends React.Component {
  state={error:null};
  static getDerivedStateFromError(error){return{error};}
  componentDidCatch(error,info){console.error('Application render error',error,info);}
  render(){if(!this.state.error)return this.props.children;return <main className="grid min-h-screen place-items-center bg-dark-50 px-4 dark:bg-dark-950"><div className="max-w-lg rounded-2xl border border-red-200 bg-white p-6 text-center dark:border-red-500/20 dark:bg-dark-900"><h1 className="text-xl font-bold text-dark-900 dark:text-white">This page could not be displayed</h1><p className="mt-3 text-sm text-dark-500 dark:text-dark-400">Please refresh the page. If the problem continues, make sure the website API is running.</p><button type="button" onClick={()=>window.location.reload()} className="btn-primary mt-5">Refresh page</button></div></main>;}
}