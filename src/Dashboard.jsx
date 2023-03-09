
import React, { useEffect, useState } from 'react'
const Dashboard = () => {
    const [content, setContent] = useState(false)
    const [popup, setPopup] = useState(false)
   
  return (
    <div className="dashboard">
   
    {content ? <div>hello</div> : <div>bye</div>}
   
  </div>
  
  )
}

export default Dashboard