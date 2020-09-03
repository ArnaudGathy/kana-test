import * as classnames from 'classnames'
import React, {useState} from 'react'

export const Card = ({romaji, translated, extra, isBig, isCorrection, kanjiMode}) => {
  const [isDisplayed, setIsDisplayed] = useState(false)
  return (
    <div
      className="word"
      onTouchStart={() => setIsDisplayed(true)}
      onMouseDown={() => setIsDisplayed(true)}
      onTouchEnd={() => setIsDisplayed(false)}
      onMouseUp={() => setIsDisplayed(false)}
    >
      <div
        className={classnames({bigText: isBig, smallText: !isBig})}
        style={{textAlign: 'center', whiteSpace: 'pre-line'}}
      >
        {isCorrection || isDisplayed ? (
          kanjiMode ? (
            <div>{extra && extra}</div>
          ) : (
            <>
              <div>{translated}</div>
              <div>{extra && extra}</div>
            </>
          )
        ) : kanjiMode ? (
          <div>{extra ? translated : "/"}</div>
        ) : (
          <div>{romaji}</div>
        )}
      </div>
    </div>
  )
}
