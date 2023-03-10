import React, { useEffect, useState } from 'react'

import * as dat from 'dat.gui'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { VOXLoader } from 'three/examples/jsm/loaders/VOXLoader';
import Canvas from './Canvas'
import Dashboard from './Dashboard'

function App() {
  // const [content, setContent] = useState(false)
  // const [popup, setPopup] = useState(false)
  // const handleOpenDashboard = (value) => {
  //   console.log('open DB', value)
  // }

  return (
    <React.Fragment>
      <Canvas/>
    </React.Fragment>
  )
}

export default App
