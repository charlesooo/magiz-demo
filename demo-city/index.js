import { styles, PLAN } from '../dist/magiz.module.min.js'
import WEB3D from '../dist/web3D.module.min.js'
import { requests } from './cs.js'

const stats = new Stats()
document.body.appendChild(stats.dom)
stats.dom.style = 'position:fixed;top:12px;left:12px'

const web3D = new WEB3D('#magiz', { shadow: false })
web3D.camera.position.set(600, 100, 600)

const rawData = { colorMap: [], models: [] }
requests.forEach((t) => {
  const [style, height] = t[0]
  const params = { params: { style, height, floorHeight: 3, elevation: 0, seed: 0 }, loops: t[1] }
  new PLAN(params).toModel(rawData, styles, { x: 0, y: 0 })
})

web3D.setMovingMaterial()
web3D.playing.addGround(3e3, { pictureURL: './map.jpg', uvMoving: 1 })
web3D.playing.animations.updateStats = () => {
  stats.update()
}

web3D.refresh(rawData, { grayScale: false, showEdge: true, inplace: !0 })

document.addEventListener('click', () => {
  document.getElementById('cover')?.classList.add('hide')
})
