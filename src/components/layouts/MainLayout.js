import Header from '../organisms/Header'

export default function MainLayout ({ children }) {
  return (
    <>
      <Header />
      {children}
    </>

  )
}
