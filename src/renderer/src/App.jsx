import React from 'react'
import useDatabase from './hooks/useDatabase'

function App() {
  const database = useDatabase('tab_spools')

  const [data, setData] = React.useState([])

  React.useEffect(() => {
    database.getData({ columns: ['spool_id', 'spool_title'] }).then((d) => {
      setData(d)
      console.log(d)
    })
  }, [])

  return (
    <div>
      <h1>Test databaseApp</h1>
      <div>
        {data.map((v, k) => (
          <p key={k}>{v.spool_title}</p>
        ))}
      </div>
    </div>
  )
}

export default App
