import { FC, HTMLProps } from 'react'
import classNames from 'classnames'
import './image.scss'

const Image: FC<HTMLProps<HTMLImageElement>> = (props) => (
  <div className={classNames('image', { 'image--not-found': props.src === '' })}>
    {props.src === '' ? (
      'NOT FOUND'
    ) : (
      <img className="image__container" {...props} crossOrigin={undefined} />
    )}
  </div>
)

export default Image
