import useExpandableText from '@/hooks/useExpandableText'
import styles from '@/styles/Text.module.css'

// text types:  title, spaced, normal, relevant
export default function Text ({ content, type = 'normal', className, isExpandable }) {
  const { expandableText, handleExpandable } = useExpandableText(content)

  return (
    <p onClick={isExpandable && handleExpandable} className={`${styles[`text--${type}`]} ${className}`}>
      {isExpandable ? expandableText : content}
    </p>
  )
}
