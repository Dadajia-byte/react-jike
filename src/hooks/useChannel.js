// 封装获取频道列表的逻辑
import { useEffect, useState } from 'react'
import { request } from '@/utils'
function useChannel() {

    const [channels, setChannels] = useState([])
    // 调用接口
    useEffect(() => {
        async function fetchChannels() {
            const res = await request.get('/channels')
            setChannels(res.data.channels)
        }
        fetchChannels()
    }, [])

    return {
        channels
    }
}

export default useChannel;