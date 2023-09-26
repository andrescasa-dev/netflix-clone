import Image from 'next/image'
import Link from 'next/link'

export default function Logo () {
  return (
    <Link href='/'>
      <Image src='/netflix.svg' height={34} width={80} alt='Netflix Logo'/>
    </Link>
  )
}
