const DEFAULT_TITLE = 'SID MMC'

export default function afterHandler (to, from) {
  if (!to.meta.title) {
    document.title = DEFAULT_TITLE
    return
  }
  document.title = to.meta.title + ' - ' + DEFAULT_TITLE
}
