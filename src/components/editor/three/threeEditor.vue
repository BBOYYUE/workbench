<template>
  <div>
    <div id="webgl-output"></div>
  </div>
</template>
<script>
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
export default {
  setup () {

  },
  mounted () {
    this.init();
  },
  activated () {
  },
  methods: {
    init () {
      var renderer = this.initRenderer();
      var camera = this.initCamera();
      camera.position.set(-80, 80, 80);
      var trackballControls = this.initTrackballControls(camera, renderer);
      var clock = new THREE.Clock();


      // create a scene, that will hold all our elements such as objects, cameras and lights.
      var scene = new THREE.Scene();

      var circleGeometry = new THREE.CircleGeometry(30, 30);
      // create the ground plane
      // var planeGeometry = new THREE.PlaneGeometry(20, 20, 20, 20);
      var circleMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
      });
      var circle = new THREE.Mesh(circleGeometry, circleMaterial);
      circle.receiveShadow = true;

      // rotate and position the circle

      /**
       * 2PI 相当于 360
       */
      circle.rotation.x = -.55 * Math.PI;
      circle.rotation.y = .06 * Math.PI;
      circle.position.x = 0;
      circle.position.y = 0;
      circle.position.z = 0;

      // add the circle to the scene

      scene.add(circle);

      // add subtle ambient lighting
      var ambiColor = "#1c1c1c";
      var ambientLight = new THREE.AmbientLight(ambiColor);
      scene.add(ambientLight);

      var pointColor = "#ff5808";
      var directionalLight = new THREE.DirectionalLight(pointColor);
      directionalLight.castShadow = true;
      directionalLight.shadow.camera.near = 2;
      directionalLight.shadow.camera.far = 80;
      directionalLight.shadow.camera.left = -30;
      directionalLight.shadow.camera.right = 30;
      directionalLight.shadow.camera.top = 30;
      directionalLight.shadow.camera.bottom = -30;

      directionalLight.intensity = 0.5;
      directionalLight.shadow.mapSize.width = 1024;
      directionalLight.shadow.mapSize.height = 1024;

      scene.add(directionalLight);
      var shadowCamera = new THREE.CameraHelper(directionalLight.shadow.camera)
      scene.add(shadowCamera);


      var sphereLight = new THREE.SphereGeometry(0.2);
      var sphereLightMaterial = new THREE.MeshBasicMaterial({
        color: 0xac6c25
      });
      var sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
      sphereLightMesh.castShadow = true;

      sphereLightMesh.position.set(3, 20, 3);
      scene.add(sphereLightMesh);

      render();
      var step = 0;


      var controls = new function () {
        this.rotationX = -0.55;
        this.rotationY = 0.03;
        this.rotationZ = 0;
      }
      var gui = new dat.GUI();
      gui.add(controls, 'rotationX', -2.0, 2.0).onChange(function (e) {
        circle.rotation.x = e * Math.PI;
      });
      gui.add(controls, 'rotationY', -2.0, 2.0).onChange(function (e) {
        circle.rotation.y = e * Math.PI;
      });
      gui.add(controls, 'rotationZ', -2.0, 2.0).onChange(function (e) {
        circle.rotation.z = e * Math.PI;
      });

      function render () {
        trackballControls.update(clock.getDelta());


        step += 0.03
        sphereLightMesh.position.z = -8;
        sphereLightMesh.position.y = +(27 * (Math.sin(step / 3)));
        sphereLightMesh.position.x = 10 + (26 * (Math.cos(step / 3)));

        directionalLight.position.copy(sphereLightMesh.position);
        requestAnimationFrame(render);
        renderer.render(scene, camera);

      }
    },



    initRenderer (additionalProperties) {

      var props = (typeof additionalProperties !== 'undefined' && additionalProperties) ? additionalProperties : {};
      var renderer = new THREE.WebGLRenderer(props);
      renderer.shadowMap.enabled = true;
      renderer.shadowMapSoft = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      renderer.setClearColor(new THREE.Color(0x000000));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      document.getElementById("webgl-output").appendChild(renderer.domElement);

      return renderer;
    },
    initCamera (initialPosition) {
      var position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(-30, 40, 30);

      var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.copy(position);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      return camera;
    },
    initTrackballControls (camera, renderer) {
      var trackballControls = new TrackballControls(camera, renderer.domElement);
      trackballControls.rotateSpeed = 1.0;
      trackballControls.zoomSpeed = 1.2;
      trackballControls.panSpeed = 0.8;
      trackballControls.noZoom = false;
      trackballControls.noPan = false;
      trackballControls.staticMoving = true;
      trackballControls.dynamicDampingFactor = 0.3;
      trackballControls.keys = [65, 83, 68];

      return trackballControls;
    }
  }
}
</script>