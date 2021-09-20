import React from "react";
import { Chart } from "react-google-charts";

import {useResult} from '../../hooks/optionList.hook';

import "./styles.css";

export default (props) => {
    const pointsOnChart = 10;

    const result = props.result;
    const answer = props.answer;
    const checkResult = props.checkResult;

    const initialValue = props.initial_value;
    const expectedRate = props.expected_rate;
    const eventRate = props.event_rate;

    const WeightCalculation = (total, weight) => {
        return parseFloat(total) + parseFloat(weight);
    }

    const chartFunction = (weight) => {
        const variationRate = expectedRate - eventRate;
        return (eventRate + variationRate * weight);
    }

    const generateData = () => {
        let data = [];
        let value = initialValue;

        for(let i = 0; i < pointsOnChart/2; i++ ) {
            value = value * (i == 0 ? 1 : eventRate);
            data.push(value); 
        }
        return data;
    }

    const mountMatrice = () => {
        const header = [['horas','Experimento', 'Aluno 1', 'Resultado' ]];

        const data = generateData();

        let experiment = Array.from(data.entries());

        let body = experiment.map((array, i) => {
            if(i === experiment.length - 1)
                return array.concat([array[1], array[1]]);
            return array.concat([null, null]);
        });

        if(answer.length !== 0 && checkResult) {
            const answerWeight = chartFunction(answer.reduce(WeightCalculation, 0));
            const resultnWeight = chartFunction(result.reduce(WeightCalculation, 0));

            for(let i = 0; i < pointsOnChart/2; i++ ) {
                const resultPoint = body[body.length-1][3] * resultnWeight;
                const answerPoint = body[body.length-1][2] * answerWeight;
                body.push([body.length, null, answerPoint.toFixed(3), resultPoint.toFixed(3)]);
            }
            console.log(body);
        }
        return header.concat(body);
    }
    
    return(
            <div className="chart-content">
                <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={mountMatrice()}
                    options={{
                        chart: {
                            title: 'Experimento Teste',
                            subtitle: 'em mililitros (ml)',
                        },
                        hAxis: { title: 'Time (s)', viewWindow: { min: 0, max: pointsOnChart-1 } },
                        vAxis: { title: 'Volume (ml)' },
                    }}
                    rootProps={{ 'data-testid': '3' }}
                />
            </div>
        );
}

