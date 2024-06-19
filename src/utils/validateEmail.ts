/**
 * Validation for email address
 * @param email - The email address string to validate
 * @returns `true` if is a valid email address else `false`
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}
