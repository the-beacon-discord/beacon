// https://mdxjs.com/guides/syntax-highlighting

import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import Prism from 'prismjs';
import 'prismjs/components/prism-lua'
import 'prismjs/components/prism-markdown'

export default ({ children, className }) => {
	const language = className?.replace(/language-/, '')

  return (
    <Highlight {...defaultProps} code={children} language={language} Prism={Prism}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre className={className} style={{...style, padding: '20px'}}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({line, key: i})}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({token, key})} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
