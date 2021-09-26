import DOMPurify from 'dompurify';
import marked from 'marked'
import hjs from 'highlight.js'
marked.setOptions({
  // breaks: true,
  // gfm: true,
  highlight: function (code, lang) {
    const hljs = hjs;
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
})

export function parseCode(messageString: string) {
  // const html = marked.parseInline(messageString);
  const html = marked(messageString);
  const sanitizedHtmlString = DOMPurify.sanitize(html);

  return sanitizedHtmlString;
}

