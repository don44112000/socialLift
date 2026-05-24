#!/usr/bin/env python3
"""
Converts tiktok-devportal-docs.json into a mirrored markdown folder structure.
"""

import os
import re
import json
import argparse
from html.parser import HTMLParser


class HTMLToMarkdown(HTMLParser):
    def __init__(self):
        super().__init__()
        self.result = []
        self._skip = False
        self._list_stack = []
        self._pending_href = ""
        self._in_video = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
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
        elif tag in ("strong", "b"):
            self.result.append("**")
        elif tag in ("em", "i"):
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
            self._pending_href = attrs.get("href", "")
            self.result.append("[")
        elif tag == "img":
            src = attrs.get("src", "")
            alt = attrs.get("alt", "image")
            width = f' width="{attrs["width"]}"' if "width" in attrs else ""
            style = f' style="{attrs["style"]}"' if "style" in attrs else ""
            self.result.append(f'\n<img src="{src}" alt="{alt}"{width}{style} />\n')
        elif tag == "video":
            src = attrs.get("src", "")
            width = f' width="{attrs["width"]}"' if "width" in attrs else ""
            controls = " controls" if "controls" in attrs else ""
            self.result.append(f'\n<video src="{src}"{width}{controls}>\n')
            self._in_video = True
        elif tag == "source":
            src = attrs.get("src", "")
            type_ = attrs.get("type", "")
            self.result.append(f'<source src="{src}" type="{type_}" />\n')
        elif tag == "table":
            self.result.append("\n")
        elif tag in ("th", "td"):
            self.result.append("| ")
        elif tag == "blockquote":
            self.result.append("\n> ")
        elif tag == "hr":
            self.result.append("\n---\n")

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self._skip = False
        elif tag in ("strong", "b"):
            self.result.append("**")
        elif tag in ("em", "i"):
            self.result.append("*")
        elif tag == "code":
            self.result.append("`")
        elif tag == "pre":
            self.result.append("\n```\n")
        elif tag in ("ul", "ol"):
            if self._list_stack:
                self._list_stack.pop()
            self.result.append("\n")
        elif tag == "a":
            self.result.append(f"]({self._pending_href})")
            self._pending_href = ""
        elif tag in ("h1", "h2", "h3", "h4", "h5"):
            self.result.append("\n")
        elif tag in ("th", "td"):
            self.result.append(" |")
        elif tag == "video":
            self.result.append("</video>\n")
            self._in_video = False

    def handle_data(self, data):
        if not self._skip:
            self.result.append(data)

    def get_markdown(self):
        text = "".join(self.result)
        text = re.sub(r'\n{3,}', '\n\n', text)
        return text.strip()


def html_to_markdown(html):
    if not html:
        return "No content available."
    parser = HTMLToMarkdown()
    parser.feed(html)
    return parser.get_markdown()


def sanitize_name(name):
    name = re.sub(r'[<>:"/\\|?*\x00-\x1f]', '', name)
    name = name.strip('. ')
    return name[:120]


def process_node(node, parent_dir, index, pages, depth=0):
    name = sanitize_name(node["name"])
    slug = node.get("key", "")
    children = node.get("children") or []
    padded = f"{index:02d}"
    indent = "  " * depth
    is_real_slug = bool(slug and re.match(r'^[a-z][a-z0-9-]+$', slug))

    if children:
        dir_name = f"{padded}. {name}"
        dir_path = os.path.join(parent_dir, dir_name)
        os.makedirs(dir_path, exist_ok=True)
        print(f"{indent}[DIR]  {dir_name}/ ({len(children)} children)")

        if is_real_slug and slug in pages:
            page = pages[slug]
            title = page.get("title", name)
            content = html_to_markdown(page.get("content", ""))
            with open(os.path.join(dir_path, f"00. {sanitize_name(title)}.md"), "w", encoding="utf-8") as f:
                f.write(f"# {title}\n\n{content}\n")

        for i, child in enumerate(children, 1):
            process_node(child, dir_path, i, pages, depth + 1)

    elif is_real_slug and slug in pages:
        page = pages[slug]
        title = page.get("title", name)
        content = html_to_markdown(page.get("content", ""))
        file_path = os.path.join(parent_dir, f"{padded}. {sanitize_name(title)}.md")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(f"# {title}\n\n{content}\n")
        print(f"{indent}[FILE] {padded}. {title}.md")
    else:
        print(f"{indent}[SKIP] {padded}. {name} (no content)")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", default="docs/tiktok/tiktok-devportal-docs.json")
    parser.add_argument("--output", default="docs/tiktok/devportal-docs")
    args = parser.parse_args()

    with open(args.input, "r", encoding="utf-8") as f:
        data = json.load(f)

    tree = data.pop("__tree__", [])
    data.pop("__flatTree__", None)
    pages = data

    os.makedirs(args.output, exist_ok=True)
    print(f"Building from {len(pages)} pages, {len(tree)} top-level sections...\n")

    for i, node in enumerate(tree, 1):
        print(f"\n{'='*60}")
        print(f"[{i:02d}] {node['name']}")
        print("=" * 60)
        process_node(node, args.output, i, pages)

    print("\n\nDone!")


if __name__ == "__main__":
    main()
