import { redirect } from 'next/navigation'; import { createClient } from '@/lib/supabase/server';
export default async function Home(){const s=await createClient();const {data:{user}}=await s.auth.getUser();if(!user)redirect('/login');const {data:p}=await s.from('profiles').select('role').eq('id',user.id).single();redirect(p?.role==='clinician'?'/clinician':'/patient')}
