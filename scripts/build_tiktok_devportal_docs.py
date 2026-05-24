#!/usr/bin/env python3
"""
Recursively fetches TikTok Developer Portal docs (developers.tiktok.com)
and saves them as markdown files mirroring the website's sidebar hierarchy.

Usage:
    python3 build_tiktok_devportal_docs.py --output ./docs/tiktok/devportal-docs

Arguments:
    --output   Directory to save docs into (default: ./devportal-docs)
    --delay    Seconds between requests (default: 0.3)
"""

import os
import re
import json
import time
import argparse
import urllib.request
import urllib.error
from html.parser import HTMLParser

BASE_URL = "https://developers.tiktok.com"
SEED_SLUG = "overview"


class HTMLToMarkdown(HTMLParser):
    """Minimal HTML -> Markdown converter for TikTok dev portal content."""

    def __init__(self):
        super().__init__()
        self.result = []
        self._tag_stack = []
        self._skip = False
        self._list_stack = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self._tag_stack.append(tag)
        if tag in ("script", "style"):
            self._skip = True
        elif tag == "h1":
            self.result.append("\n# ")
        elif tag == "h2":
            self.result.append("\n## ")
        elif tag == "h3":
            self.result.append("\n### ")
        elif tag == "h4":
            self.result.append("\n#### ")
        elif tag == "h5":
            self.result.append("\n##### ")
        elif tag == "p":
            self.result.append("\n\n")
        elif tag == "br":
            self.result.append("\n")
        elif tag == "strong" or tag == "b":
            self.result.append("**")
        elif tag == "em" or tag == "i":
            self.result.append("*")
        elif tag == "code":
            self.result.append("`")
        elif tag == "pre":
            self.result.append("\n```\n")
        elif tag == "ul":
            self._list_stack.append("ul")
        elif tag == "ol":
            self._list_stack.append("ol")
        elif tag == "li":
            prefix = "- " if (not self._list_stack or self._list_stack[-1] == "ul") else "1. "
            indent = "  " * (len(self._list_stack) - 1)
            self.result.append(f"\n{indent}{prefix}")
        elif tag == "a":
            href = attrs.get("href", "")
            self.result.append("[")
            self._pending_href = href
        elif tag == "img":
            src = attrs.get("src", "")
            alt = attrs.get("alt", "image")
            width = attrs.get("width", "")
            style = attrs.get("style", "")
            extra = f' width="{width}"' if width else ""
            extra += f' style="{style}"' if style else ""
            self.result.append(f'\n<img src="{src}" alt="{alt}"{extra} />\n')
        elif tag == "video":
            src = attrs.get("src", "")
            controls = " controls" if "controls" in attrs else ""
            width = attrs.get("width", "")
            extra = f' width="{width}"' if width else ""
            self.result.append(f'\n<video src="{src}"{extra}{controls}>')
            self._in_video = True
        elif tag == "source":
            src = attrs.get("src", "")
            type_ = attrs.get("type", "")
            self.result.append(f'<source src="{src}" type="{type_}" />')
        elif tag == "table":
            self.result.append("\n")
        elif tag == "th" or tag == "td":
            self.result.append("| ")
        elif tag == "tr":
            self.result.append("\n")
        elif tag == "blockquote":
            self.result.append("\n> ")
        elif tag == "hr":
            self.result.append("\n---\n")

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self._skip = False
        elif tag == "strong" or tag == "b":
            self.result.append("**")
        elif tag == "em" or tag == "i":
            self.result.append("*")
        elif tag == "code":
            self.result.append("`")
        elif tag == "pre":
            self.result.append("\n```\n")
        elif tag == "video":
            self.result.append("</video>\n")
            self._in_video = False
        elif tag in ("ul", "ol"):
            if self._list_stack:
                self._list_stack.pop()
            self.result.append("\n")
        elif tag == "a":
            href = getattr(self, "_pending_href", "")
            self.result.append(f"]({href})")
            self._pending_href = ""
        elif tag in ("h1", "h2", "h3", "h4", "h5"):
            self.result.append("\n")
        elif tag == "th":
            self.result.append(" |")
        elif tag == "td":
            self.result.append(" |")
        if self._tag_stack and self._tag_stack[-1] == tag:
            self._tag_stack.pop()

    def handle_data(self, data):
        if not self._skip:
            self.result.append(data)

    def get_markdown(self):
        text = "".join(self.result)
        # Clean up excessive blank lines
        text = re.sub(r'\n{3,}', '\n\n', text)
        return text.strip()


def html_to_markdown(html):
    parser = HTMLToMarkdown()
    parser.feed(html)
    return parser.get_markdown()


def fetch_json(url, retries=3):
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36",
                "Accept": "application/json, text/javascript, */*",
                "Referer": "https://developers.tiktok.com/",
                "Accept-Language": "en-US,en;q=0.9",
            })
            with urllib.request.urlopen(req, timeout=15) as resp:
                return json.loads(resp.read().decode())
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(2 ** attempt)
            else:
                print(f"  [ERROR] Failed to fetch {url}: {e}")
                return None


def fetch_doc(slug):
    url = f"{BASE_URL}/doc/{slug}?enter_method=left_navigation&_data=routes%2Fdoc.%24id"
    return fetch_json(url)


def sanitize_name(name):
    name = re.sub(r'[<>:"/\\|?*\x00-\x1f]', '', name)
    name = name.strip('. ')
    return name[:120]


def process_node(node, parent_dir, index, delay, depth=0):
    name = sanitize_name(node["name"])
    slug = node["key"] if node.get("key") and not node["key"].startswith("wikc") else None
    children = node.get("children") or []
    padded = f"{index:02d}"
    indent = "  " * depth

    if children:
        dir_name = f"{padded}. {name}"
        dir_path = os.path.join(parent_dir, dir_name)
        os.makedirs(dir_path, exist_ok=True)
        print(f"{indent}[DIR]  {dir_name}/ ({len(children)} children)")

        # Fetch index content if it has a real slug
        if slug:
            data = fetch_doc(slug)
            if data and data.get("doc"):
                doc = data["doc"]
                title = doc.get("Title", name)
                content_html = doc.get("Content", "")
                content_md = html_to_markdown(content_html) if content_html else "No content available."
                index_path = os.path.join(dir_path, f"00. {sanitize_name(title)}.md")
                with open(index_path, "w", encoding="utf-8") as f:
                    f.write(f"# {title}\n\n{content_md}\n")
            time.sleep(delay)

        for i, child in enumerate(children, 1):
            process_node(child, dir_path, i, delay, depth + 1)

    elif slug:
        data = fetch_doc(slug)
        if data and data.get("doc"):
            doc = data["doc"]
            title = doc.get("Title", name)
            content_html = doc.get("Content", "")
            content_md = html_to_markdown(content_html) if content_html else "No content available."
            file_path = os.path.join(parent_dir, f"{padded}. {sanitize_name(title)}.md")
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(f"# {title}\n\n{content_md}\n")
            print(f"{indent}[FILE] {padded}. {title}.md")
        else:
            print(f"{indent}[SKIP] {padded}. {name} (no content)")
        time.sleep(delay)
    else:
        print(f"{indent}[SKIP] {padded}. {name} (folder node, no slug)")


def main():
    parser = argparse.ArgumentParser(description="Build TikTok Developer Portal docs locally.")
    parser.add_argument("--output", default="./devportal-docs", help="Output directory")
    parser.add_argument("--delay", type=float, default=0.3, help="Delay between requests in seconds")
    args = parser.parse_args()

    os.makedirs(args.output, exist_ok=True)

    print("Fetching doc tree from seed page...")
    data = fetch_doc(SEED_SLUG)
    if not data or not data.get("docTree"):
        print("Failed to fetch doc tree. Make sure you're on VPN. Aborting.")
        return

    doc_tree = data["docTree"]
    print(f"Found {len(doc_tree)} top-level sections, {len(data.get('flattenedTree', {}))} total pages.\n")

    for i, node in enumerate(doc_tree, 1):
        print(f"\n{'='*60}")
        print(f"Processing [{i:02d}] {node['name']}")
        print("=" * 60)
        process_node(node, args.output, i, args.delay)

    print("\n\nDone! Full doc tree built.")


if __name__ == "__main__":
    main()
