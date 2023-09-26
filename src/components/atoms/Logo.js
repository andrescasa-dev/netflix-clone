import Image from 'next/image'
import Link from 'next/link'

export default function Logo () {
  return (
    <Link href='/'>
      <Image src='/logo.webp' height={50} width={50} alt='Netflix Logo'/>
    </Link>
  )
}
