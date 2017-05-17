export const hsla = (h, s, l, a) => {
  return `hsla(${h},${s}%,${l}%,${a})`
}

export const getRandomColor = () => {
  let hue = _.random(0, 360)
  let sat = 70
  let light = 55
  return hsla(hue, sat, light, 0.9)
}
