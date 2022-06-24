## panorama 部分的一些说明

一. 场景分组的一些功能描述:

1. 底部展示所有的场景分组
2. 作品展示页面展示场景分组
3. 场景分组包含多个场景

二. 场景:

4. 底部展示所有的场景
5. 作品展示页面展示当前场景分组的场景
6. 场景包含 热点, 热点分组, 小地图, 文字 图片 角度 等信息.

三. 其他:

1. 作品预览不需要底部的全部信息.
2. 作品预览的元数据可以在文本编辑处编辑.

四. api

### 基础功能

1. 设置当前场景角度
   setAngle(ath, atv)
2. 设置当前场景最大视角
   setMaxFov(fov)
3. 设置当前场景最小视角
   setMinFov(fov)
4. 设置当前场景水平可视范围
   setHlookkatRange()
5. 设置当前场景垂直可视范围
   setVlookkatRange()

6. 设置全景的可见性
   setSceneVisible()
7. 设置热点的可见性
   setHotspotVisible()
8. 设置热点分组的可见性
   setHotspotGroupVisible()
9. 设置全景分组的可见性
   setSceneGroupVisible()
10. 设置缩略图的可见性
    setThumbVisible()

11. 切换热点分组
    setActiveHotspotGroup()
12. 切换全景分组
    setActiveSceneGroup()
13. 切换场景()
    setActiveScene()
14. 切换当前选中的热点
    setActiveHotspot()

15. 自动水平旋转开关
    setHorizontalRotation()

16. 设置所有角度相关, 直接把角度设置为某个 view 对象
    setView()
17. 设置场景相关, 直接加载某个场景, 并初始化这个场景的内容
    setScene()
18. 设置场景分组相关, 直接加载某个场景分组, 显示分组的第一张全景, 初始化第一个场景, 将场景分组的其他场景配置加入缓存队列.
    setSceneGroup()
19. 设置热点分组相关, 展示某个分组下的所有热点, 并设置热点分组的场景角度等信息
    setHotspotGroup()
20. 从当前场景分组中加载场景
    setSceneByGroup
21. 从当前的热点分组中切换热点
    setHotspotByGroup

五. 事件

### 基础事件.

#### 全局事件

1. 鼠标长按
   mouseDown
2. 鼠标点击
   mouseClick
3. 长时间未操作导致的待机状态
   standbyState
4. 鼠标放开
   mouseUp
5. krpano 就绪
   KrpanoReady

#### 元素的事件

1. 场景分组点击事件
2. 场景点击事件
3. 小地图点击事件
4. 小地图点位点击事件
5. 热点分组点击事件
6. 热点点击事件
7. 标牌点击事件
8. 文字点击事件
9. 图片点击事件

#### 各功能模块布局及功能

1. 顶部展示编辑器名称, 后期添加时间设置等按钮
2. 左侧展示各个数据对象的分类及表单切换按钮.
3. 右侧展示表单项, 表单项在左侧或者右侧点击后展示
4. 中间展示可视化预览或文本编辑器. 可视化预览展示底部菜单选中项, 文本编辑器展示当前作品的数据结构
5. 底部可以切换和选中编辑已创建的数据内容.
