import * as classnames from 'classnames'
import React, { useState } from 'react'

export const Card = ({romaji, translated, isBig, isCorrection}) => {
  const [isDisplayed, setIsDisplayed] = useState(false)
  return (
    <div className="word" onMouseDown={() => setIsDisplayed(true)} onMouseUp={() => setIsDisplayed(false)}>
      <span
        className={classnames({bigText: isBig, smallText: !isBig})}
        style={{textAlign: 'center', whiteSpace: 'pre-line'}}
      >
        {isCorrection ? (isDisplayed ? romaji : translated) : (isDisplayed ? translated : romaji)}
      </span>
    </div>
  )
}
