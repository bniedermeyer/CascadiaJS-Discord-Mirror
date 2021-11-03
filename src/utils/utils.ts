import DOMPurify from 'dompurify';
import marked from 'marked';
import hjs from 'highlight.js';

// force all links to open in a new tab
DOMPurify.addHook('afterSanitizeAttributes', function (node) {
  // set all elements owning target to target=_blank
  if ('target' in node) {
    node.setAttribute('target', '_blank');
  }
  // assign image part for all images
  if (node.nodeName === 'IMG') {
    node.setAttribute('part', 'image');
  }
  // set non-HTML/MathML links to xlink:show=new
  if (!node.hasAttribute('target') && (node.hasAttribute('xlink:href') || node.hasAttribute('href'))) {
    node.setAttribute('xlink:show', 'new');
  }
});

const renderer = {
  heading(text: string) {
    return text;
  },
  html(text: string) {
    return text.replace(/<[^>]+>/g, '');
  },
};

marked.setOptions({
  highlight: function (code, lang) {
    const hljs = hjs;
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
});

marked.use({ renderer });

export function parseCode(messageString: string) {
  const html = marked(messageString);
  const sanitizedHtmlString = DOMPurify.sanitize(html);

  return sanitizedHtmlString;
}
