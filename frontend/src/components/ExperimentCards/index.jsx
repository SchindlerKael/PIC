import React from "react";

// import history from '../../history';
import { Link } from "react-router-dom";


import "./styles.css";

const ExperimentCards = (props) => {    
    const experiments = props.experiments;

    const listItems = experiments.map((experiment) => {
        return (
            <Link key={experiment.id.toString()} to={`/experiment/${experiment.id} `} > 
                <div className="experiment-card">
                    <div className="card-header">
                        <div>
                            <h3>{experiment.title}</h3>
                            <h4>Professor(a) {experiment.user.name}</h4>
                        </div>
                        <label className={`experiment-${experiment.is_closed ? "closed" : "open"}`}></label>
                    </div>
                    <p>respondido por {experiment.answerCount} aluno(s) até o momento!</p>
                </div>
            </Link>
        )
    });

    return ( <> {listItems}  </> )
};

export default ExperimentCards;