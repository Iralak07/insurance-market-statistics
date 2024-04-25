import React from 'react';
import SomeChart from '../../components/Charts/SomeChart';
import LineChart from '../../components/Charts/LinesChart';

const Index = () => {
    return (
        <>
            <div style={{ width: "100vw", height: "100vh", background: "gray" }}>
                <LineChart />
            </div>
        </>
    );
}

export default Index;