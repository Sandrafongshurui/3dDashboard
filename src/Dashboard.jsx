import React, { useEffect, useState } from 'react'

const Dashboard = ({text}) => {
  // const [content, setContent] = useState(false)
  // const [popup, setPopup] = useState(false)
  // const style = position === "undefined ? `dashboard`:`dashboard ${position}

  return (
    <div className="dashboard">
      <div>{text}</div>
    </div>
  )
}

export default Dashboard
