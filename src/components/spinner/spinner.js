import React from 'react';
import './spinner.css'

const spinner = () => {
    return (
        <React.Fragment>
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </React.Fragment>
    );
};

export default spinner;