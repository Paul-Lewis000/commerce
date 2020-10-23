import { useKeenSlider } from 'keen-slider/react'
import React, { Children, FC, isValidElement, useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import cn from 'classnames'

import s from './ProductSlider.module.css'

const ProductSlider: FC = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slidesPerView: 1,
    mounted: () => setIsMounted(true),
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
  })

  return (
    <div className={s.root}>
      <button className={cn(s.leftControl, s.control)} onClick={slider?.prev}>
        <HiChevronLeft />
      </button>
      <button className={cn(s.rightControl, s.control)} onClick={slider?.next}>
        <HiChevronRight />
      </button>
      <div
        ref={ref}
        className="keen-slider h-full transition-opacity duration-150"
        style={{ opacity: isMounted ? 1 : 0 }}
      >
        {Children.map(children, (child) => {
          // Add the keen-slider__slide className to children
          if (isValidElement(child)) {
            return {
              ...child,
              props: {
                ...child.props,
                className: `${
                  child.props.className ? `${child.props.className} ` : ''
                }keen-slider__slide`,
              },
            }
          }
          return child
        })}
      </div>
      {slider && (
        <div className={cn(s.positionIndicatorsContainer)}>
          {[...Array(slider.details().size).keys()].map((idx) => {
            return (
              <button
                key={idx}
                className={cn(s.positionIndicator, {
                  [s.positionIndicatorActive]: currentSlide === idx,
                })}
                onClick={() => {
                  slider.moveToSlideRelative(idx)
                }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ProductSlider
