export const deletePaletteBE = async (id) => {
  const url = process.env.REACT_APP_BACKEND_URL + `api/v1/palettes/${id}`
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({id: id}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const msg = await response.json()
    console.log(msg)
  } catch (error) {
    console.log(error)
  }
}