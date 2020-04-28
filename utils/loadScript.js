export const loadScript = ({ tag = 'script', attributes }) => {
  return new Promise((resolve, reject) => {
    const s = document.createElement(tag)
    // eslint-disable-next-line
    for (let k of Object.keys(attributes)) {
      s.setAttribute(k, attributes[k])
    }
    s.onload = resolve
    s.onerror = reject
    document.body.appendChild(s)
  })
}

export default loadScript
