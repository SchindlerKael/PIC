import React from "react";
import { Chart } from "react-google-charts";

import {useResult} from '../../hooks/optionList.hook';

import "./styles.css";

export default ({data, answer, checkResult}) => { 

    const result = useResult();

    const mountMatrice  = () => {
        let header = [['horas','Experimento', 'Aluno 1', 'Resultado' ]];
        let experiment = Array.from(data.entries());
        let body = experiment.map((array, i) => {
            if(i === experiment.length - 1)
                return array.concat([array[1], array[1]]);
            return array.concat([null, null]);
        });

        if(answer.length !== 0) {
            answer.map((weight, i) => {
                let corretion = !checkResult ? null : body[body.length-1][3] * result[i];
                return body.push([body.length, null, body[body.length-1][2] * 1.2, corretion]);
            })
        }
        return header.concat(body);
    }
    
    return(
            <div className="chart-content">
                <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="Line"
                    loader={<div>Loading Chart</div>}
                    data={mountMatrice()}
                    options={{
                        chart: {
                            title: 'Experimento Teste',
                            subtitle: 'em mililitros (ml)',
                        },
                        hAxis: { title: 'Time (s)' },
                        vAxis: { title: 'Volume (ml)'},
                    }}
                    rootProps={{ 'data-testid': '3' }}
                />
            </div>
        );
}

