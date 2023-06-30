import Editor from "./Editor";
import React, { useEffect, useState } from 'react'
import useLocalStorage from "../hooks/useLocalStorage";

function App() {

  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
    `)
    }, 250)

    return () => clearTimeout(timeout )
  }, [html, css, js])

  return (
    <>
      <div className='pane top-pane'>
        <Editor language='xml' languageDisplayName='HTML' value={html} onChange={setHtml} />
        <Editor language='css' languageDisplayName='CSS' value={css} onChange={setCss}/>
        <Editor language='javascript' languageDisplayName='JAVASCRIPT' value={js} onChange={setJs}/>

      </div>
      <div className='pane'>
        <iframe title='output' sandbox='allow-scripts' width='100%' height='100%' frameBorder='0' srcDoc={srcDoc} />
      </div>
    </>
  );
}

export default App;
