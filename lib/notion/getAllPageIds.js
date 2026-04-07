import { idToUuid } from 'notion-utils'
export default function getAllPageIds (collectionQuery, viewId, collectionView) {
  let pageIds = []

  if (collectionQuery && Object.keys(collectionQuery).length > 0) {
    const views = Object.values(collectionQuery)[0]
    if (viewId) {
      const vId = idToUuid(viewId)
      pageIds = views[vId]?.blockIds || []
    } else {
      const pageSet = new Set()
      Object.values(views).forEach(view => {
        view?.collection_group_results?.blockIds?.forEach(id => pageSet.add(id))
      })
      pageIds = [...pageSet]
    }
  } else if (collectionView) {
    const pageSet = new Set()
    Object.values(collectionView).forEach(view => {
      view?.value?.page_sort?.forEach(id => pageSet.add(id))
    })
    pageIds = [...pageSet]
  }

  return pageIds
}
