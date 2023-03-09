
import React, { useEffect, useState } from 'react'

const Canvas = () => {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas')
    test.initialize()
    //always runnning
    test.animate()

    let loadedModel = test.scene
    const glftLoader = new GLTFLoader()
    const gui = new dat.GUI()
    const onLoad = (gltf) => {
      console.log(gltf)
      loadedModel.add(gltf.scene)
    }
    glftLoader.load('ladder/model.gltf', onLoad)
    glftLoader.load(
      '/downtown_dengue/Downtown_Dengue.gltf',
      onLoad,
      // (gltfScene) => {
      //   loadedModel = gltfScene;
      //   gltfScene.scene.traverse(function (child) {
      //     console.log(child)
      //     //if what you loading ia a mesh
      //     //change mateiral to transparant
      //     if (child.isMesh) {
      //       child.material.transparent = new THREE.MeshStandardMaterial();
      //       child.material.transparent = 0.5;
      //     }
      //   });
      //   gltfScene.scene.rotation.y = Math.PI / 8;
      //   gltfScene.scene.position.y = -30.7;
      //   gltfScene.scene.scale.set(1, 1, 1);

      //   gui.add(gltfScene.scene.position, 'x', -100, 100, 0.1);
      //   gui.add(gltfScene.scene.position, 'y', -100, 100, 0.1);
      //   gui.add(gltfScene.scene.position, 'z', -100, 100, 0.1);
      //   gui.add(gltfScene.scene.scale, 'x', -10, 10, 1);
      //   gui.add(gltfScene.scene.scale, 'y', -10, 10, 1);
      //   gui.add(gltfScene.scene.scale, 'z', -10, 10, 1);

      //   test.scene.add(gltfScene.scene);
    )
    let drag = false
    const instersectObjs = {}
    let newMat = new THREE.MeshStandardMaterial()
    let newSphere = new THREE.BoxGeometry(1, 1, 1)
    let newSphereMesh = new THREE.Mesh(newSphere)
    loadedModel.add(newSphereMesh)
    newMat.color.set(0xff0000)
    const pointer = new THREE.Vector2()
    const raycaster = new THREE.Raycaster()
    const onMouseMove = () => {
      drag = true
    }
    const onMouseDown = () => {
      drag = false
    }

    const onMouseClick = (event) => {
      // calculate pointer position in normalized device coordinates
      // (-1 to +1) for both components
      if (!drag) {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
        //0,0 1,1 at top right corner, pointer is the viewport demensions
        //event is the mouse posistion base on the window demensions
        // console.log('pointer', pointer.x, pointer.y);
        // console.log('event', event.clientX, event.clientY);
        // console.log('window', window.innerWidth, window.innerHeight);
        raycaster.setFromCamera(pointer, test.camera)
        const intersects = raycaster.intersectObjects(test.scene.children)

        // change color of the closest object intersecting the raycaster
        if (intersects.length > 0) {
          //cehck the color
          console.log('click')
          //open the pop up
          // console.log(popup)
          setContent((content) => {
            // call set method to get the value
            return !content // set the same value, so nothing will change
            // or a different value, depends on your use case
          })
          //   setActivePoint(currentActivePoint => { // call set method to get the value
          //     console.log(currentActivePoint);
          //     return currentActivePoint;       // set the same value, so nothing will change
          //                                      // or a different value, depends on your use case
          //  });

          if (instersectObjs[intersects[0].object.name] !== undefined) {
            if (instersectObjs[intersects[0].object.name].isClick) {
              console.log('activate original')
              intersects[0].object.material =
                instersectObjs[intersects[0].object.name].originalMat
              instersectObjs[intersects[0].object.name].isClick = false
            } else {
              console.log('activate red')
              intersects[0].object.material = newMat
              instersectObjs[intersects[0].object.name].isClick = true
            }
          } else {
            // originalMat = intersects[0].object.material;
            instersectObjs[intersects[0].object.name] = {
              isClick: true,
              originalMat: intersects[0].object.material,
            }
            intersects[0].object.material = newMat
          }
        }
      }
    }

    // const animate = () => {
    //   console.log(loadedModel)
    //   // if (loadedModel) {
    //   //   loadedModel.rotation.x += 0.01
    //   //   loadedModel.rotation.y += 0.01
    //   //   loadedModel.rotation.z += 0.01
    //   // }
    //   // requestAnimationFrame(animate)
    //   //test.renderer.render(test.scene, test.camera)
    //   console.log("animate")
    // }

    // animate();
    window.addEventListener('mousedown', onMouseDown)
    // window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('click', onMouseClick)
    console.log('useeffect')
  }, [])
  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  )
}

export default Canvas
