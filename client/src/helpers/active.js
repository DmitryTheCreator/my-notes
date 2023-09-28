export function isActive() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Токен отсутствует')
  } else {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]))
      console.log(decodedToken)
      const userActive = decodedToken.active;
      return userActive === 'ACTIVATED'
    } catch (error) {
      console.error('Ошибка при расшифровке токена:', error)
    }
  }
}