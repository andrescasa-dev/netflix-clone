import cookie from 'cookie'
export const expireAuthCookie = (res) => {
  const setCookie = cookie.serialize('token', '', {
    maxAge: -1,
    expires: new Date(1),
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  })
  res.setHeader('Set-Cookie', setCookie)
}
