import React from 'react'

export default function App() {

    const [count, setCount] = React.useState(1)

    return <div>
        <p>Hello from React {count}</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>

}