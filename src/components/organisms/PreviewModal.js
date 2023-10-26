import styles from '@/styles/PreviewModal.module.css'
import Tag from '../atoms/Tag'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import Link from 'next/link'

export default function PreviewModal ({ movie }) {
  return (
    <article className={styles.modal}>
      <Text type='title' content={'My title'} />
      <div>
        <div className={styles.modal__info}>
          <Text type='spaced' content={'07 / 2015'} />
          <Text type='spaced' content={'2 h 23 min'} />
          <Tag text={'HD'} />
          <Tag text={'CC'} />
          <Tag text={'Action'} />
        </div>
        <Text type='normal' content={'Producido por: Denis Villeneuve'} />
      </div>
      <Text type='relevant' content={'Tierra de Nadie" is a gripping war documentary exploring the human cost of conflict in the Balkans, offering a raw and unflinching look at the struggles and resilience of civilians caught in the crossfire.'} />
      <div className={styles.modal__stats}>
        <div className={styles.modal__stats__buttons}>
            {/* to do: make this a component icon */}
            <Icon url={'/like.svg'} alt='like' />
            <Icon url={'/like.svg'} alt='dislike' isUpsideDown={true}/>
        </div>
        <div className={styles.modal__stats__views}>
          {/* to do: make this a component icon */}
          <Icon url={'/eye.svg'} alt='views' />
          <Text type='normal' content={'20k'} />
        </div>
      </div>
      <Link href={`/movies/${movie.id}`}>
        <Button
          text={'Play'}
          hasIcon={true}
          iconUrl={'/play_icon.svg'}
          isFullWidth={true}
        />
      </Link>
    </article>
  )
}
