import Image from 'next/image'
import Link from 'next/link'

export default function Logo ({ size = 'mid' }) {
  const sizeMap = {
    big: {
      height: 68,
      width: 160
    },
    mid: {
      height: 34,
      width: 80
    }
  }

  const finalSize = sizeMap[size]
  return (
    <Link href='/'>
      <Image src='/netflix.svg' height={finalSize.height} width={finalSize.width} alt='Netflix Logo'/>
    </Link>
  )
}
