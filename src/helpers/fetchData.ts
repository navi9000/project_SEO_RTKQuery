export default async function fetchData<T extends unknown>(
  ...params: Parameters<typeof fetch>
) {
  let data: null | T = null
  let isError = false

  if (!params[1]) {
    params.push({
      cache: "no-cache"
    })
  } else if (!params[1].cache) {
    params[1].cache = "no-cache"
  }

  try {
    const res = await fetch(...params)
    const json = await res.json()

    if (json.is_success) {
      data = json.data as T
    } else {
      isError = true
      console.error(json.message)
    }
  } catch (err) {
    isError = true
    console.error("Failed to fetch data", err)
  } finally {
    return {
      data,
      isError
    }
  }
}
