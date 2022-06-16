export default {
  "krpano": {
    "layer": [
      {
        "@value": "",
        "@attributes": {
          "name": "skin_btn_littlemap",
          "type": "image",
          "keep": "true",
          "url": "%SWFPATH%/skin/menu.png",
          "crop": "700|0|96|250",
          "align": "rightbottom",
          "x": "10",
          "y": "166",
          "scale": "0.31",
          "alpha": "1",
          "onclick": "closemap()",
          "visible": "true"
        }
      },
      {
        "layer": {
          "layer": {
            "layer": [
              {
                "@value": "",
                "@attributes": {
                  "name": "radar",
                  "visible": "false",
                  "url": "%SWFPATH%/plugins/radar.swf",
                  "alturl": "%SWFPATH%/plugins/radar.js",
                  "align": "lefttop",
                  "edge": "center",
                  "zorder": "1",
                  "scale": "0.8",
                  "fillcolor": "0xFFFFFF",
                  "fillalpha": "0.8",
                  "linecolor": "0xFF0000",
                  "linewidth": "0.5",
                  "linealpha": "0.5",
                  "headingoffset": "0"
                }
              },
              {
                "@value": "",
                "@attributes": {
                  "name": "spot0",
                  "style": "spot",
                  "x": "300",
                  "y": "750"
                }
              },
              {
                "@value": "",
                "@attributes": {
                  "name": "spot1",
                  "style": "spot",
                  "x": "250",
                  "y": "500"
                }
              },
              {
                "@value": "",
                "@attributes": {
                  "name": "spot2",
                  "style": "spot",
                  "x": "150",
                  "y": "750"
                }
              },
              {
                "@value": "",
                "@attributes": {
                  "name": "spot3",
                  "style": "spot",
                  "x": "160",
                  "y": "550"
                }
              },
              {
                "@value": "",
                "@attributes": {
                  "name": "spot4",
                  "style": "spot",
                  "x": "320",
                  "y": "500"
                }
              },
              {
                "@value": "",
                "@attributes": {
                  "name": "spot5",
                  "style": "spot",
                  "x": "300",
                  "y": "600"
                }
              },
              {
                "@value": "",
                "@attributes": {
                  "name": "spot6",
                  "style": "spot",
                  "x": "130",
                  "y": "650"
                }
              },
              {
                "@value": "",
                "@attributes": {
                  "name": "activespot",
                  "url": "%SWFPATH%/skin/vtourskin_mapspotactive.png",
                  "scale": "0.8",
                  "oy": "-40",
                  "align": "lefttop",
                  "edge": "center",
                  "zorder": "3",
                  "visible": "false"
                }
              }
            ],
            "@attributes": {
              "name": "radarmask",
              "type": "container",
              "align": "lefttop",
              "width": "100%",
              "height": "100%",
              "maskchildren": "true"
            }
          },
          "@attributes": {
            "name": "map",
            "url": "%SWFPATH%/static/maps/indoorA.png",
            "align": "top",
            "x": "0",
            "y": "5",
            "width": "80",
            "height": "103",
            "handcursor": "false",
            "scalechildren": "true",
            "onclick": "scalemap",
            "visible": "true"
          }
        },
        "@attributes": {
          "name": "mapcontainer",
          "keep": "true",
          "type": "container",
          "bgcolor": "0x000000",
          "bgroundedge": "5",
          "bgalpha": "0",
          "align": "lefttop",
          "x": "10",
          "y": "40",
          "width": "90",
          "height": "116",
          "visible": "true"
        }
      }
    ],
    "style": {
      "@value": "",
      "@attributes": {
        "name": "spot",
        "url": "%SWFPATH%/skin/vtourskin_mapspot.png",
        "scale": "0.8",
        "oy": "-40",
        "align": "lefttop",
        "edge": "center",
        "zorder": "2",
        "onclick": "subtxt(spotid,get(name),4,2);if(spotid != scene[get(xml.scene)].index,   loadscene(get(scene[get(spotid)].name),null,MERGE,BLEND(1)); );"
      }
    },
    "action": [
      {
        "@value": "set(onclick, openmap() );\n    tween(layer[mapcontainer].x,-320,0.5);",
        "@attributes": {
          "name": "closemap"
        }
      },
      {
        "@value": "set(onclick, closemap() );\n    tween(layer[mapcontainer].x,10,0.5);",
        "@attributes": {
          "name": "openmap"
        }
      },
      {
        "@value": "set(onclick, minmap() );\n    tween(layer[mapcontainer].width,144,0.5);\n      tween(layer[map].width,128,0.5);\n      tween(layer[mapcontainer].height,185.0.5);\n      tween(layer[map].height,164,0.5);",
        "@attributes": {
          "name": "scalemap"
        }
      },
      {
        "@value": "set(onclick, scalemap() );\n    tween(layer[mapcontainer].width,90,0.5);\n      tween(layer[map].width,80,0.5);\n      tween(layer[mapcontainer].height,116,0.5);\n      tween(layer[map].height,103,0.5);",
        "@attributes": {
          "name": "minmap"
        }
      },
      {
        "@value": "for(set(i,0),i LT scene.count,inc(i),\n    txtadd(spotname,'spot',get(i));\n    set(layer[get(spotname)].visible, true);\n    );\n    txtadd(spotidnow,'spot',get(scene[get(xml.scene)].index));\n    copy(layer[radar].x, layer[get(spotidnow)].x);\n    copy(layer[radar].y, layer[get(spotidnow)].y);\n    copy(layer[activespot].x, layer[get(spotidnow)].x);\n    copy(layer[activespot].y, layer[get(spotidnow)].y);\n    set(layer[radar].heading, %1);\n    set(layer[radar].visible, true);\n    set(layer[activespot].visible, true);\n    set(layer[get(spotidnow)].visible, false);",
        "@attributes": {
          "name": "activatespot"
        }
      }
    ],
    "scene": [
      {
        "control": {
          "@value": "",
          "@attributes": {
            "bouncinglimits": "calc:image.cube ? true : false"
          }
        },
        "view": {
          "@value": "",
          "@attributes": {
            "hlookat": "0.0",
            "vlookat": "0.0",
            "fovtype": "MFOV",
            "fov": "120",
            "maxpixelzoom": "2.0",
            "fovmin": "70",
            "fovmax": "140",
            "limitview": "auto"
          }
        },
        "preview": {
          "@value": "",
          "@attributes": {
            "url": "panos/livingRoom.tiles/preview.jpg"
          }
        },
        "image": {
          "cube": {
            "@value": "",
            "@attributes": {
              "url": "panos/livingRoom.tiles/%s/l%l/%v/l%l_%s_%v_%h.jpg",
              "multires": "512,640,1280,2624"
            }
          }
        },
        "hotspot": [
          {
            "@value": "",
            "@attributes": {
              "name": "spot1",
              "style": "hotspot_front",
              "ath": "91.11",
              "atv": "16.13",
              "scale": "0.4",
              "ox": "0",
              "oy": "-45",
              "ondown": "draghotspotSM();",
              "linkedscene": "scene_Porch"
            }
          },
          {
            "@value": "",
            "@attributes": {
              "name": "spot2",
              "style": "hotspot_front",
              "ath": "79.90",
              "atv": "28.57",
              "scale": "0.4",
              "ox": "0",
              "oy": "-45",
              "ondown": "draghotspotSM();",
              "linkedscene": "scene_restaurant"
            }
          },
          {
            "@value": "",
            "@attributes": {
              "name": "spot3",
              "style": "hotspot_front",
              "ath": "32.99",
              "atv": "15.06",
              "scale": "0.4",
              "ox": "0",
              "oy": "-45",
              "ondown": "draghotspotSM();",
              "linkedscene": "scene_toilet"
            }
          },
          {
            "@value": "",
            "@attributes": {
              "name": "spot4",
              "style": "hotspot_left",
              "ath": "86.09",
              "atv": "10.47",
              "scale": "0.4",
              "ox": "0",
              "oy": "-45",
              "ondown": "draghotspotSM();",
              "linkedscene": "scene_kitchen"
            }
          }
        ],
        "@attributes": {
          "name": "scene_livingRoom",
          "title": "客厅",
          "onstart": "activatespot(-90)",
          "thumburl": "panos/livingRoom.tiles/thumb.jpg",
          "lat": "",
          "lng": "",
          "heading": ""
        }
      },
      {
        "control": {
          "@value": "",
          "@attributes": {
            "bouncinglimits": "calc:image.cube ? true : false"
          }
        },
        "view": {
          "@value": "",
          "@attributes": {
            "hlookat": "0.0",
            "vlookat": "0.0",
            "fovtype": "MFOV",
            "fov": "120",
            "maxpixelzoom": "2.0",
            "fovmin": "70",
            "fovmax": "140",
            "limitview": "auto"
          }
        },
        "preview": {
          "@value": "",
          "@attributes": {
            "url": "panos/kitchen.tiles/preview.jpg"
          }
        },
        "image": {
          "cube": {
            "@value": "",
            "@attributes": {
              "url": "panos/kitchen.tiles/%s/l%l/%v/l%l_%s_%v_%h.jpg",
              "multires": "512,640,1280,2624"
            }
          }
        },
        "hotspot": {
          "@value": "",
          "@attributes": {
            "name": "spot1",
            "style": "hotspot_front",
            "ath": "179.09",
            "atv": "60.70",
            "scale": "0.4",
            "ox": "0",
            "oy": "-45",
            "ondown": "draghotspotSM();",
            "linkedscene": "scene_Porch"
          }
        },
        "@attributes": {
          "name": "scene_kitchen",
          "title": "厨房",
          "onstart": "activatespot(-90)",
          "thumburl": "panos/kitchen.tiles/thumb.jpg",
          "lat": "",
          "lng": "",
          "heading": ""
        }
      },
      {
        "control": {
          "@value": "",
          "@attributes": {
            "bouncinglimits": "calc:image.cube ? true : false"
          }
        },
        "view": {
          "@value": "",
          "@attributes": {
            "hlookat": "0.0",
            "vlookat": "0.0",
            "fovtype": "MFOV",
            "fov": "120",
            "maxpixelzoom": "2.0",
            "fovmin": "70",
            "fovmax": "140",
            "limitview": "auto"
          }
        },
        "preview": {
          "@value": "",
          "@attributes": {
            "url": "panos/bedroom.tiles/preview.jpg"
          }
        },
        "image": {
          "cube": {
            "@value": "",
            "@attributes": {
              "url": "panos/bedroom.tiles/%s/l%l/%v/l%l_%s_%v_%h.jpg",
              "multires": "512,640,1280,2624"
            }
          }
        },
        "hotspot": [
          {
            "@value": "",
            "@attributes": {
              "name": "spot1",
              "style": "hotspot_left",
              "ath": "50.49",
              "atv": "14.00",
              "scale": "0.35",
              "ox": "-66.65",
              "oy": "-45",
              "ondown": "draghotspotSM();",
              "linkedscene": "scene_toilet"
            }
          },
          {
            "@value": "",
            "@attributes": {
              "name": "spot2",
              "style": "hotspot_right",
              "ath": "51.32",
              "atv": "15.51",
              "scale": "0.35",
              "ox": "0",
              "oy": "-45",
              "ondown": "draghotspotSM();",
              "linkedscene": "scene_livingRoom"
            }
          },
          {
            "@value": "",
            "@attributes": {
              "name": "spot3",
              "style": "hotspot_front",
              "ath": "47.57",
              "atv": "10.24",
              "scale": "0.35",
              "ox": "0",
              "oy": "-45",
              "ondown": "draghotspotSM();",
              "linkedscene": "scene_childRoom"
            }
          }
        ],
        "@attributes": {
          "name": "scene_bedroom",
          "title": "主卧",
          "onstart": "activatespot(-60)",
          "thumburl": "panos/bedroom.tiles/thumb.jpg",
          "lat": "",
          "lng": "",
          "heading": ""
        }
      },
      {
        "control": {
          "@value": "",
          "@attributes": {
            "bouncinglimits": "calc:image.cube ? true : false"
          }
        },
        "view": {
          "@value": "",
          "@attributes": {
            "hlookat": "0.0",
            "vlookat": "0.0",
            "fovtype": "MFOV",
            "fov": "120",
            "maxpixelzoom": "2.0",
            "fovmin": "70",
            "fovmax": "140",
            "limitview": "auto"
          }
        },
        "preview": {
          "@value": "",
          "@attributes": {
            "url": "panos/childRoom.tiles/preview.jpg"
          }
        },
        "image": {
          "cube": {
            "@value": "",
            "@attributes": {
              "url": "panos/childRoom.tiles/%s/l%l/%v/l%l_%s_%v_%h.jpg",
              "multires": "512,640,1280,2624"
            }
          }
        },
        "hotspot": [
          {
            "@value": "",
            "@attributes": {
              "name": "spot1",
              "style": "hotspot_right",
              "ath": "-61.21",
              "atv": "16.56",
              "scale": "0.35",
              "ox": "80.88",
              "oy": "-45",
              "ondown": "draghotspotSM();",
              "linkedscene": "scene_toilet"
            }
          },
          {
            "@value": "",
            "@attributes": {
              "name": "spot2",
              "style": "hotspot_left",
              "ath": "-61.21",
              "atv": "16.56",
              "scale": "0.35",
              "ox": "0",
              "oy": "-45",
              "ondown": "draghotspotSM();",
              "linkedscene": "scene_livingRoom"
            }
          },
          {
            "@value": "",
            "@attributes": {
              "name": "spot3",
              "style": "hotspot_front",
              "ath": "-56.95",
              "atv": "11.92",
              "scale": "0.35",
              "ox": "0",
              "oy": "-45",
              "ondown": "draghotspotSM();",
              "linkedscene": "scene_bedroom"
            }
          }
        ],
        "@attributes": {
          "name": "scene_childRoom",
          "title": "儿童房",
          "onstart": "activatespot(-120)",
          "thumburl": "panos/childRoom.tiles/thumb.jpg",
          "lat": "",
          "lng": "",
          "heading": ""
        }
      },
      {
        "control": {
          "@value": "",
          "@attributes": {
            "bouncinglimits": "calc:image.cube ? true : false"
          }
        },
        "view": {
          "@value": "",
          "@attributes": {
            "hlookat": "0.0",
            "vlookat": "0.0",
            "fovtype": "MFOV",
            "fov": "120",
            "maxpixelzoom": "2.0",
            "fovmin": "70",
            "fovmax": "140",
            "limitview": "auto"
          }
        },
        "preview": {
          "@value": "",
          "@attributes": {
            "url": "panos/Porch.tiles/preview.jpg"
          }
        },
        "image": {
          "cube": {
            "@value": "",
            "@attributes": {
              "url": "panos/Porch.tiles/%s/l%l/%v/l%l_%s_%v_%h.jpg",
              "multires": "512,640,1280,2624"
            }
          }
        },
        "hotspot": [
          {
            "@value": "",
            "@attributes": {
              "name": "spot1",
              "style": "hotspot_front",
              "ath": "0.13",
              "atv": "17.03",
              "scale": "0.35",
              "ox": "0",
              "oy": "-45",
              "ondown": "draghotspotSM();",
              "linkedscene": "scene_livingRoom"
            }
          },
          {
            "@value": "",
            "@attributes": {
              "name": "spot2",
              "style": "hotspot_front",
              "ath": "88.01",
              "atv": "56.63",
              "scale": "0.35",
              "ox": "-52.97",
              "oy": "-45",
              "ondown": "draghotspotSM();",
              "linkedscene": "scene_kitchen"
            }
          },
          {
            "@value": "",
            "@attributes": {
              "name": "spot3",
              "style": "hotspot_front",
              "ath": "10.75",
              "atv": "29.29",
              "scale": "0.35",
              "ox": "0",
              "oy": "-45",
              "ondown": "draghotspotSM();",
              "linkedscene": "scene_restaurant"
            }
          }
        ],
        "@attributes": {
          "name": "scene_Porch",
          "title": "玄关",
          "onstart": "activatespot(180)",
          "thumburl": "panos/Porch.tiles/thumb.jpg",
          "lat": "",
          "lng": "",
          "heading": ""
        }
      },
      {
        "control": {
          "@value": "",
          "@attributes": {
            "bouncinglimits": "calc:image.cube ? true : false"
          }
        },
        "view": {
          "@value": "",
          "@attributes": {
            "hlookat": "0.0",
            "vlookat": "0.0",
            "fovtype": "MFOV",
            "fov": "120",
            "maxpixelzoom": "2.0",
            "fovmin": "70",
            "fovmax": "140",
            "limitview": "auto"
          }
        },
        "preview": {
          "@value": "",
          "@attributes": {
            "url": "panos/restaurant.tiles/preview.jpg"
          }
        },
        "image": {
          "cube": {
            "@value": "",
            "@attributes": {
              "url": "panos/restaurant.tiles/%s/l%l/%v/l%l_%s_%v_%h.jpg",
              "multires": "512,640,1280,2624"
            }
          }
        },
        "hotspot": [
          {
            "@value": "",
            "@attributes": {
              "name": "spot1",
              "style": "hotspot_front",
              "ath": "-89.52",
              "atv": "26.45",
              "scale": "0.35",
              "ox": "0",
              "oy": "-45",
              "ondown": "draghotspotSM();",
              "linkedscene": "scene_livingRoom"
            }
          },
          {
            "@value": "",
            "@attributes": {
              "name": "spot2",
              "style": "hotspot_front",
              "ath": "90.16",
              "atv": "39.51",
              "scale": "0.35",
              "ox": "0",
              "oy": "-45",
              "ondown": "draghotspotSM();",
              "linkedscene": "scene_Porch"
            }
          }
        ],
        "@attributes": {
          "name": "scene_restaurant",
          "title": "餐厅",
          "onstart": "activatespot(-90)",
          "thumburl": "panos/restaurant.tiles/thumb.jpg",
          "lat": "",
          "lng": "",
          "heading": ""
        }
      },
      {
        "control": {
          "@value": "",
          "@attributes": {
            "bouncinglimits": "calc:image.cube ? true : false"
          }
        },
        "view": {
          "@value": "",
          "@attributes": {
            "hlookat": "0.0",
            "vlookat": "0.0",
            "fovtype": "MFOV",
            "fov": "120",
            "maxpixelzoom": "2.0",
            "fovmin": "70",
            "fovmax": "140",
            "limitview": "auto"
          }
        },
        "preview": {
          "@value": "",
          "@attributes": {
            "url": "panos/toilet.tiles/preview.jpg"
          }
        },
        "image": {
          "cube": {
            "@value": "",
            "@attributes": {
              "url": "panos/toilet.tiles/%s/l%l/%v/l%l_%s_%v_%h.jpg",
              "multires": "512,640,1280,2624"
            }
          }
        },
        "hotspot": [
          {
            "@value": "",
            "@attributes": {
              "name": "spot1",
              "style": "hotspot_right",
              "ath": "95.45",
              "atv": "36.09",
              "scale": "0.4",
              "ox": "0",
              "oy": "-45",
              "ondown": "draghotspotSM();",
              "linkedscene": "scene_bedroom"
            }
          },
          {
            "@value": "",
            "@attributes": {
              "name": "spot2",
              "style": "hotspot_left",
              "ath": "92.98",
              "atv": "36.35",
              "scale": "0.4",
              "ox": "-146.18",
              "oy": "-45",
              "ondown": "draghotspotSM();",
              "linkedscene": "scene_childRoom"
            }
          },
          {
            "@value": "",
            "@attributes": {
              "name": "spot3",
              "style": "hotspot_front",
              "ath": "97.50",
              "atv": "20.95",
              "scale": "0.4",
              "ox": "0",
              "oy": "-45",
              "ondown": "draghotspotSM();",
              "linkedscene": "scene_livingRoom"
            }
          }
        ],
        "@attributes": {
          "name": "scene_toilet",
          "title": "卫生间",
          "onstart": "activatespot(0)",
          "thumburl": "panos/toilet.tiles/thumb.jpg",
          "lat": "",
          "lng": "",
          "heading": ""
        }
      }
    ],
    "uuid": "13b9908b-da28-43d1-85e8-385ada4f6406"
  },
}