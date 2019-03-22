import React from "react";

function Card(props) {
    return (
        <div className="card" onClick={() => props.handleRightGuess(props.id)}>
            <div className="img-container" role="img">
                <img alt={props.id} src={props.image} id={props.id} />
            </div>
        </div>
    );
}

export default Card;