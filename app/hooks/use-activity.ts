import { useQuery } from '@tanstack/react-query'

export function useActivity(type: 'run' | 'bike') {
  return useQuery({
    queryKey: ['activity', type],
    queryFn: async () => {
      const res = await fetch('/api/list?type=run')
      if (!res.ok) throw new Error('Failed to fetch activity')
      return res.json()
    },
  })
}
