
import React from 'react';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    
} from 'chart.js';

import { Bar } from 'react-chartjs-2'

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    
)
const ProgressBar = function () {
    const data = {
        labels: ['Earnings v Goal'],
        dataset: [
            {
                label: 'Earnings',
                data: [10],
                borderColor: 'black',
                backgroundColor: 'aqua',
                borderWidth: 1
            },
            {
                label: 'Goal',
                data: [50],
                borderColor: 'black',
                backgroundColor: 'pink',
                borderWidth: 1
            }
        ]
    }

    const options = {

    }

    return (
        <div style={
            {
                padding: '20px',
                width: '80%'
            }
        }
        >
            <Bar
                data={data}
                options={options}
                width={100}
                height={50}

            ></Bar>
        </div>
    )
}


export default ProgressBar