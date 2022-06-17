import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
class SceneUtil {
  constructor(el) {
    let u = navigator.userAgent;
    this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    this.container = typeof el === 'string'
      ? document.getElementById(el)
      : el
    this.renderer = undefined
    this.camera = undefined
    this.scene = undefined
    this.composerScene = undefined
    this.composerShadow = undefined
  }

  __init () {
    this.__createScene()
    this.__createCamera()
    this.__createRenderer()
    this.renderer.render(this.scene, this.camera)
  }
  __createScene () {
    this.scene = new THREE.Scene();
    this.scene.name = 'scene'
  }
  __createCamera () {
    let camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    /**
     * 相机位置可以自己设置
     */
    // camera.position.set(0, 60, 60);
    camera.position.set(0, 200, 400)
    camera.lookAt(this.scene.position);

    this.camera = camera;
    this.scene.add(camera)
    camera.name = 'camera'
  }

  __createRenderer () {


    // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    let renderer
    if (this.isiOS) {
      renderer = new THREE.WebGLRenderer({
        // antialias: true,
        // preserveDrawingBuffer: true,
      });
      // renderer.debug.checkShaderErrors = true
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.BasicShadowMap;
      renderer.setClearColor(new THREE.Color(0x000000));
      renderer.setSize(this.container.clientWidth - 5, this.container.clientHeight - 30);
      renderer.setPixelRatio(window.devicePixelRatio);
    } else {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.shadowMap.enabled = true;
      renderer.setClearColor(new THREE.Color(0x000000));
      renderer.setSize(this.container.clientWidth - 2, this.container.clientHeight - 30);
      renderer.setPixelRatio(window.devicePixelRatio);
      let renderPass = new RenderPass(this.scene, this.camera);
      renderPass.clearColor = new THREE.Color(0, 0, 0);
      renderPass.clearAlpha = 0;
      let fxaaPass = new ShaderPass(FXAAShader);
      let copyPass = new ShaderPass(CopyShader);
      let composerScene = new EffectComposer(renderer);
      composerScene.addPass(renderPass);
      composerScene.addPass(copyPass);
      this.composerScene = composerScene
      const pixelRatio = renderer.getPixelRatio();
      fxaaPass.material.uniforms['resolution'].value.x = 1 / (window.innerWidth * pixelRatio);
      fxaaPass.material.uniforms['resolution'].value.y = 1 / (window.innerHeight * pixelRatio);

      let composerShadow = new EffectComposer(renderer);
      composerShadow.addPass(renderPass);
      composerShadow.addPass(fxaaPass);
      this.composerShadow = composerShadow
    }

    this.container.appendChild(renderer.domElement)
    this.renderer = renderer
  }
}

export default SceneUtil