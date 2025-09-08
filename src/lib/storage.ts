import domtoimage from 'dom-to-image-more'

export async function downloadElementPng(el: HTMLElement, filename: string) {
  const scale = 2
  const style = {
    transform: 'scale(' + scale + ')',
    transformOrigin: 'top left',
    width: el.offsetWidth + 'px',
    height: el.offsetHeight + 'px'
  } as any

  const param = { bgcolor: '#ffffff', style, width: el.offsetWidth * scale, height: el.offsetHeight * scale }
  const dataUrl = await domtoimage.toPng(el, param)
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}
