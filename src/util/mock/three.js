export default {
  "threejs": {
    "scene": [
      {
        "skyBox": {
          "geometry": {
            "type": "THREE",
            "name": "SphereGeometry",
            "size": [500, 500, 500],
            "position": [0, 0, 0]
          },
          "material": {
            "type": "THREE",
            "name": "MeshBasicMaterial",
            "color": 0x60A0FA,
            "side": "BackSide"
          }
        },
        "groundBox": {
          "geometry": {
            "type": "THREE",
            "name": "CircleGeometry",
            "size": [500, 500],
            "position": [0, 0, 0],
            "rotation": [-0.5 * Math.PI, 0, 0],
          },
          "material": {
            "type": "THREE",
            "name": "MeshPhongMaterial",
            "color": 0xffffff,
          }
        },
        "ambientLight": {
          "color": 0xffffff,
          "intensity": .5,
          "position": [0, 150, 150]
        },
        "camera": {},
        "control": {

        },
        "external": {}
      }
    ]
  }
}