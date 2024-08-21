import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  atomDark,
  coldarkDark,
  oneDark,
} from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  codeString: string
  language: string
}

const CodeBlock = ({ codeString, language }: CodeBlockProps) => (
  <SyntaxHighlighter
    language={language}
    style={oneDark}
    showLineNumbers
    customStyle={{ borderRadius: '16px', background: '' }}
    wrapLongLines
    //startingLineNumber={1}
  >
    {codeString}
  </SyntaxHighlighter>
)

export default CodeBlock
