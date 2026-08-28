"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// CodeBlock (§10.2 FRONTEND-DESIGN.md composite taxonomy, §11 block renderer
// kontrak "code" -- syntax highlight + tombol Copy + filename/caption
// optional). Dibangun sekarang untuk section "Learning Experience" homepage,
// tapi API-nya generik supaya dipakai ulang oleh `LessonContentRenderer`
// nanti tanpa refactor (§15 poin 4 -- satu sumber kebenaran render code).
//
// Highlighting sengaja regex-based, bukan library syntax-highlighter pihak
// ketiga -- payload mobile Indonesia adalah batasan keras (§2.1), dan
// kebutuhan homepage/marketing (+ lesson block sederhana) tidak butuh
// akurasi highlighter penuh. Token warna dipetakan ke semantic token yang
// sudah ada (§8.2), bukan hex baru.
type TokenType = "comment" | "string" | "number" | "keyword" | "plain";

type Token = { text: string; type: TokenType };

const KEYWORDS =
  "const|let|var|function|return|if|else|for|while|import|export|from|default|async|await|class|extends|new|this|true|false|null|undefined|interface|type|enum|public|private|static|try|catch|throw|switch|case|break|continue|as|of|in";

const TOKEN_PATTERN = new RegExp(
  [
    "(//[^\\n]*|#[^\\n]*)", // comment
    "('(?:\\\\.|[^'\\\\])*'|\"(?:\\\\.|[^\"\\\\])*\"|`(?:\\\\.|[^`\\\\])*`)", // string
    "(\\b\\d+(?:\\.\\d+)?\\b)", // number
    `(\\b(?:${KEYWORDS})\\b)`, // keyword
  ].join("|"),
  "g",
);

function tokenize(line: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  TOKEN_PATTERN.lastIndex = 0;

  while ((match = TOKEN_PATTERN.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: line.slice(lastIndex, match.index), type: "plain" });
    }
    const [full, comment, string, number, keyword] = match;
    const type: TokenType = comment
      ? "comment"
      : string
        ? "string"
        : number
          ? "number"
          : keyword
            ? "keyword"
            : "plain";
    tokens.push({ text: full, type });
    lastIndex = match.index + full.length;
  }

  if (lastIndex < line.length) {
    tokens.push({ text: line.slice(lastIndex), type: "plain" });
  }

  return tokens;
}

const TOKEN_CLASS: Record<TokenType, string> = {
  comment: "text-foreground-subtle italic",
  string: "text-success",
  number: "text-warning",
  keyword: "text-accent font-medium",
  plain: "text-foreground",
};

export function CodeBlock({
  code,
  language,
  filename,
  caption,
  className,
}: {
  code: string;
  language?: string;
  filename?: string;
  caption?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const lines = code.replace(/\n$/, "").split("\n");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("CodeBlock: gagal menyalin kode", error);
    }
  }

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-foreground shadow-md",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex shrink-0 gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
          </div>
          {filename && (
            <span className="truncate font-mono text-xs text-white/70">
              {filename}
            </span>
          )}
          {language && !filename && (
            <span className="text-xs text-white/50">{language}</span>
          )}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleCopy}
          className="shrink-0 text-white/70 hover:bg-white/10 hover:text-white"
          aria-label="Salin kode"
        >
          {copied ? (
            <Check className="size-3.5" aria-hidden="true" />
          ) : (
            <Copy className="size-3.5" aria-hidden="true" />
          )}
        </Button>
      </div>

      <pre className="overflow-x-auto px-4 py-3.5 text-left">
        <code className="grid font-mono text-[13px] leading-relaxed">
          {lines.map((line, index) => (
            <span key={index}>
              {tokenize(line).map((token, tokenIndex) => (
                <span key={tokenIndex} className={TOKEN_CLASS[token.type]}>
                  {token.text}
                </span>
              ))}
              {line.length === 0 ? " " : null}
            </span>
          ))}
        </code>
      </pre>

      {caption && (
        <figcaption className="border-t border-white/10 px-4 py-2 text-xs text-white/50">
          {caption}
        </figcaption>
      )}

      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Kode disalin" : ""}
      </span>
    </figure>
  );
}
