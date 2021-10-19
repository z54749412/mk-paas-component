export default function parseUrl(url: string): any {
  const search = url.split('?')[1]
  if (!search) return {}
  const paramsList = search.split('&')
  const obj: any = {}
  paramsList.forEach((o: string) => {
    const [paramName, paramsValue] = o.split('=')
    obj[paramName] = paramsValue
  })
  return obj
}
