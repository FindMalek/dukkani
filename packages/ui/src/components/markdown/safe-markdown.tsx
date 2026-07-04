import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

interface SafeMarkdownProps {
  children: string;
  className?: string;
}

/**
 * Renders user-authored markdown safely: no `dangerouslySetInnerHTML`, no raw
 * HTML pass-through. `rehype-sanitize`'s default (GitHub-style) schema already
 * allows `img[src]` but restricts it to `http`/`https` — `data:` URIs are
 * stripped, so images must go through storage/CDN rather than inline payloads.
 */
export function SafeMarkdown({ children, className }: SafeMarkdownProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
