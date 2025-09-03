export class ApiError extends Error {
  status: number
  data: unknown

  constructor(message: string, status: number, data?: unknown) {
    super(message)
    this.status = status
    this.data = data
  }
}

export async function handleApiError(response: Response) {
  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new ApiError(
      data?.message || "Unexpected API error",
      response.status,
      data
    )
  }
  return response
}
