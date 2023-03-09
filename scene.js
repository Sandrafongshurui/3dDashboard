
  //scene, camera, render 3 things for a threejs project
  const scene = new THREE.Scene();
  // diff types of camera, use perps came, mimics person eye
  //perps cam take in 4 params, FOV, aspect ration base on browser inner height and width, near plane, far plane
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  //how near u are to the center
  camera.position.z = 5;
  const renderer = new THREE.WebGLRenderer({ antialias: true }); //so the results dont look jagged
  //bg color
  renderer.setClearColor("#e5e5e5");
  renderer.setSize(window.innerWidth, window.innerHeight); //can bas eon hard code, or traditionally base on your browser
//   const controls = new OrbitControls(camera, renderer.domElement);
  //append the renderer to the body AS A CNAVAS
  document.body.appendChild(renderer.domElement);

  //params is radius, width segments, height segments
  //   const sphereGeometry = new THREE.SphereGeometry(1, 30, 30);
  //   const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x1b1b1b, wireframe: true });
  //   const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  //   sphereMesh.position.x = -2;
  //   sphereMesh.position.y = 3;
  //   sphereMesh.position.z = -2;
  const sphereGeometry2 = new THREE.SphereGeometry(1, 50, 50);
  const sphereMaterial2 = new THREE.MeshPhongMaterial({
    color: 0x1b1b1b,
    shininess: 82.2,
  });
  const sphereMesh2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
  sphereMesh2.position.x = -2;
  sphereMesh2.position.y = -3;
  sphereMesh2.position.z = -3;
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const boxMaterial = new THREE.MeshLambertMaterial({ color: 0x1b1b1b });
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  boxMesh.position.x = 2;
  boxMesh.position.y = 2;
  boxMesh.position.z = -2;

  scene.add(sphereMesh2, boxMesh);

  //raycaster for interaction
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  //add light
  var light = new THREE.PointLight(0xffffff, 0.5, 1000);
  light.position.set(-80, 0, 90);
  scene.add(light);

  var light = new THREE.PointLight(0xffffff, 2, 1000);
  light.position.set(2, 5, -1);
  scene.add(light);

  const render = () => {
    //creates a loop
    //redrawing the renderer everytime the screen refreshers,
    //calls this render() again, with the updated renderer.render
    //better then set interval, as the usr navigates to another tab or the canvas in hidden, it pauses save battery, processing power
    //60 fps
    //model will stretch if dont have, becasue the canvas is resizing but the renderer is not rendereringthe scene
    requestAnimationFrame(render);

    // to rotate, but ineast we will use the cdn for Gzap for performming animation
    //boxMesh.rotation.x += 0.01

    //CALL THE RENDER METHOD ON THE RENDERER, to disply whta you set in ur renderer
    renderer.render(scene, camera);
  };

  //call once.
  render();

  //canvas in html is resize when window resize
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight,
      //just update the camera
      camera.updateProjectionMatrix();
  });
  const onMouseClick = (event) => {
    evnt.preventDefault();
    //0,0 bottom left corner,  1,1 at top right corner, mouse is the viewport demensions
    //event is the mouse px posistion base on the window demensions, canvas demension,
    //window is the just the static window demension
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    console.log("mouse", mouse.x, mouse.y);
    console.log("event", event.clientX, event.clientY);
    console.log("window", window.innerWidth, window.innerHeight);
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    for (let i = 0; i < intersects.length; i++) {
      //this.tl = new TimelineMax().delay(.3); //auto play
      this.tl = new TimelineMax();
      this.tl.to(intersects[i].object.scale, 1, {
        x: 2,
        ease: Expo.easeOut,
      });
      this.tl.to(intersects[i].object.scale, 0.5, {
        x: 0.5,
        ease: Expo.easeOut,
      });
      this.tl.to(intersects[i].object.position, 0.5, {
        x: 2,
        ease: Expo.easeOut,
      });
      this.tl.to(
        intersects[i].object.rotation,
        0.5,
        { y: Math.PI * 0.5, ease: Expo.easeOut },
        "=-1.5"
      ); //happems 1/5 sec befor eit normally would
    }
  };
  window.addEventListener("click", onMouseClick);