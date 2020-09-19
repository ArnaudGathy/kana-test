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
        style={{textAlign: 'center', whiteSpace: 'pre-line'}}
      >
        {isCorrection || isDisplayed ? (
          kanjiMode ? (
            <div className="smallText">{extra && extra}</div>
          ) : (
            <>
              <div className={classnames({bigText: isBig})}>{translated}</div>
              <div className="smallText">{extra && extra}</div>
            </>
          )
        ) : kanjiMode ? (
          <div className={classnames({bigText: isBig})}>{extra ? translated : "/"}</div>
        ) : (
          <div className="smallText">{romaji}</div>
        )}
      </div>
    </div>
  )
}
