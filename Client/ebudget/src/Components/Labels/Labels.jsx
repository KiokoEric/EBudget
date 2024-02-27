import React from 'react';
import "../Labels/Labels.css";

const Labels = () => {
return (
    <div className='Labels' >
        <article>
            <h3>Labels</h3>
            <section>
                <div className='Indicator Yellow'></div>
                <p>Total Savings</p>
            </section>
            <section>
                <div className='Indicator Blue' ></div>
                <p>Total Balance</p>
            </section>
            <section>
                <div className='Indicator Red' ></div>
                <p>Total Expenses</p>
            </section>
        </article> 
    </div>
)
}

export default Labels