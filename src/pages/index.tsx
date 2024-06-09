import { Inter } from 'next/font/google'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    // Always do navigations after the first render
    router.push('/home', undefined, { shallow: true })
  }, []);
  
  return (
    <></>
  )
}
