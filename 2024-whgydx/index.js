import WEB3D from '../dist/web3D.module.min.js'
import WEB2D from '../dist/web2D.module.min.js'
import { styles, PLAN } from '../dist/magiz.module.min.js'
import { serverData } from './serverData.js'

// 初始化场景
const web3D = new WEB3D('#magiz')
const web2D = new WEB2D('#tags', web3D)
web3D.camera.position.set(600, 100, 600)

// 计算全部平面的中心点
let count = 0
const center = { x: 0, y: 0 }
serverData.forEach((sd) => {
  sd.data.forEach(d => {
    d.loops[0].forEach((pt) => {
      center.x += pt[0]
      center.y += pt[1]
      count++
    })
  })
})
center.x /= count
center.y /= count

// 数据处理
const rawData = { colorMap: [], models: [] }
const tagData = []
serverData.forEach(sd => {
  sd.data.forEach(d => {
    const building = new PLAN(d).toModel(rawData, styles, center, sd.customStyles)
    tagData.push({
      title: sd.name,
      text: sd.info,
      position: [building.centerRelative[0], 0, -building.centerRelative[1]]
    })
  })
})

// 生成模型
web3D.playing.addGround(400)
web3D.refresh(rawData, { grayScale: false, showEdge: true, inplace: true })

// 生成标签
web2D.refresh(tagData)

// 开关标签
let tagsOn = true
document.getElementById('btn')?.addEventListener('click', () => web2D.toggle(tagsOn = !tagsOn))

