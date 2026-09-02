'use client'
import {useState} from 'react'; import {createClient} from '@/lib/supabase/client';
export default function Login(){
 const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [name,setName]=useState('');const [mode,setMode]=useState<'login'|'signup'>('login');const [msg,setMsg]=useState('');
 async function submit(e:React.FormEvent){e.preventDefault();const s=createClient();setMsg('');
  if(mode==='signup'){const {error}=await s.auth.signUp({email,password,options:{data:{full_name:name}}});setMsg(error?error.message:'Account created. Check your email if confirmation is enabled.');}
  else {const {error}=await s.auth.signInWithPassword({email,password});if(error)setMsg(error.message);else window.location.href='/';}
 }
 return <main className="auth"><div className="authCard"><div className="logo">3D</div><h1>3D Physiology</h1><p className="sub">TREAT · REHAB · TRAIN</p><h2>{mode==='login'?'Secure sign in':'Create patient account'}</h2>
 <form onSubmit={submit}>{mode==='signup'&&<label>Full name<input value={name} onChange={e=>setName(e.target.value)} required/></label>}<label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} minLength={8} required/></label><button className="primary">Continue</button></form>
 {msg&&<p className="notice">{msg}</p>}<button className="linkBtn" onClick={()=>setMode(mode==='login'?'signup':'login')}>{mode==='login'?'New patient? Create an account':'Already have an account? Sign in'}</button>
 <p className="fine">For assigned 3D Physiology programs. Do not use this portal for emergencies.</p></div></main>}
