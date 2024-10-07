import instance from "@/axios/instance"

export const resetPassword = async (
  oldPassword: string,
  newPassword: string
): Promise<void> => {
  try {
    await instance.post("/auth/reset-password", { oldPassword, newPassword })
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "An error occurred.")
  }
}
