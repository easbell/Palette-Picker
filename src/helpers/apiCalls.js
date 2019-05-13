export const deleteFromBE = async (url, id) => {
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