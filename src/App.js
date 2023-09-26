import React, { useState } from 'react';

const App = () => {
    const [number, setNumber] = useState(0)

    return (<>
        <div className="App">{number}</div>
        <button onClick={() => setNumber(number + 1)}>+1</button>
    </>)

}

export default App