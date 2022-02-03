import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import Chart from 'chart.js/auto'

const data = {
    labels:[
        "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec", "Jan", "Feb", "Mar", 

    ],
    datasets:[
        {
            fill: false,
            lineTension: 0.13,
            backgroundColor: '#198078',
            borderColor: '#1B02A3',
            borderCapStyle:'butt',
            borderDash: [],
            borderDashoffset: 0.0, 
            borderJoinStyle: 'miter',
            pointBorderColor: '#1B12A3',
            pointBackgroundColor: '#3775f5',
            pointBorderWidth: 1.2,
            pointHoverRadius: 3,
            pointHoverBackgroundColor:'#3773f5',
            pointHoverBorderColor:'#3773f5',
            pointHoverBorderWidth: 4,
            pointRadius:1,
            pointHitRadius:10,

            data: [65, 59, 80, 81, 56, 72, 45, 67,55,42]
        },
    ],


    
}

const options ={
    plugins:{
        legend: {
            display: false,
        },
    },
}



const Balancechart = () => {


 
  return (
      <Wrapper>
          <Line data={data} options={options} width={420} height={120} />
      </Wrapper>


  );
};

export default Balancechart;

const Wrapper= styled.div``

