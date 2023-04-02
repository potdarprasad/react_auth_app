import { useContext, useEffect, useState } from 'react'
import { AxiosContext } from '../context/AxiosContext';
import AppLayout from '../layouts/AppLayout';

export default function Home() {
    const [data, setData] = useState<string>('');
    const { protectedAxios, isLoading } = useContext(AxiosContext);
    const fetchData = async () => {
        const res = await protectedAxios('/users');
        console.log('res', res?.data);
        setData(res.data);
    }
    useEffect(() => {
        fetchData();
    });
    return (
        <AppLayout>
            <div>{isLoading ? 'Loading' : data}</div>
        </AppLayout>
    )
}
