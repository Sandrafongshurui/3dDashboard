import React, { useEffect, useState } from 'react'

import * as THREE from 'three'
import * as dat from 'dat.gui'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { VOXLoader } from 'three/examples/jsm/loaders/VOXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Model } from './Downtown_Dengue'

import SceneInit from './lib/SceneInit'
import { PopUp } from './PopUp'
import { render } from '@testing-library/react'
import {Canvas} from "./Canvas"
import {Dashboard} from "./Dashboard"

function App() {
  const [content, setContent] = useState(false)
  const [popup, setPopup] = useState(false)
 

  return (
    <React.Fragment>
      <Canvas/>
      <Dashboard/>
    </React.Fragment>
     
    
  )
}

export default App
