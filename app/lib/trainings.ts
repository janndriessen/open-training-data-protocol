export async function getTrainings(address: string) {
  const response = await fetch(`/api/trainings?address=${address}`)
  return response.json()
}
