import { useState } from 'react'

export default function useExpandableText (content = '') {
  const [isOpen, setIsOpen] = useState(false)

  const handleExpandable = () => {
    setIsOpen((prev) => !prev)
  }

  const expandableText = isOpen ? content : content.slice(0, 180).concat('... [see more]')

  return { expandableText, handleExpandable }
}
