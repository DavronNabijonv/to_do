import { useState } from 'react'
import Login from './login'
import Register from './register';

export default function EntrancePage() {
    const [log,setLog] = useState(false);
  return (
    <div>
        {log? <Register changeTogle={()=>{setLog(!log)}} /> :<Login changeTogle={()=>{setLog(!log)}} />}
    </div>
  )
}
