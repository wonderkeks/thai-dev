import { useQuery } from '@tanstack/vue-query'

async function fetchObjects(id = null) {
  const res = await fetch('/fakeData.json')
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await res.json()
  
  if (id) {
    return data.find(obj => obj.id === id)
  }

  return data
}


export function useObjectsQuery(id = null) {
  const queryKey = id ? ['objects', id] : ['objects']

  return useQuery({
    queryKey,
    queryFn: () => fetchObjects(id),
  })
}