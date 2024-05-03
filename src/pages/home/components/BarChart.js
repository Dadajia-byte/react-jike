// 柱状图组件封装
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const BarChart = ({ title }) => {
    const chartRef = useRef(null)
    useEffect(() => {
        const myChart = echarts.init(chartRef.current);
        const option = {
            title: {
                text: title
            },
            xAxis: {
                type: 'category',
                data: ['vue', 'react', 'angular']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [120, 200, 150],
                    type: 'bar'
                }
            ]
        };
        option && myChart.setOption(option);
    }, [])
    return (
        <div ref={chartRef} style={{ width: '500px', height: '400px' }} ></div>
    )
}

export default BarChart;