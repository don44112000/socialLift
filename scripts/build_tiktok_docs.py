#!/usr/bin/env python3
"""
Recursively fetches TikTok Business API docs and saves them as markdown files
mirroring the website's sidebar hierarchy.

Usage:
    python3 build_tiktok_docs.py --output ./docs --key <identify_key>

Arguments:
    --output   Directory to save docs into (default: ./tiktok-docs)
    --key      identify_key from the TikTok API (required)
    --last     doc_id to process last, e.g. Marketing API (optional)
    --language Language code (default: ENGLISH)
"""

import os
import re
import json
import time
import argparse
import urllib.request
import urllib.error

BASE_API = "https://business-api.tiktok.com/gateway/api/doc/client"


def fetch_json(url, retries=3):
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=15) as resp:
                return json.loads(resp.read().decode())
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(2 ** attempt)
            else:
                print(f"  [ERROR] Failed to fetch {url}: {e}")
                return None


def fetch_content(doc_id, key, language):
    url = f"{BASE_API}/node/get/?language={language}&identify_key={key}&doc_id={doc_id}"
    data = fetch_json(url)
    if data and data.get("code") == 0:
        return data.get("data", {})
    return {}


def sanitize_name(name):
    name = re.sub(r'[<>:"/\\|?*\x00-\x1f]', '', name)
    name = name.strip('. ')
    return name[:120]


def process_node(node, parent_dir, index, key, language, depth=0):
    doc_id = node["doc_id"]
    title = sanitize_name(node["title"])
    children = node.get("child_docs") or []
    padded = f"{index:02d}"
    indent = "  " * depth

    if children:
        dir_name = f"{padded}. {title}"
        dir_path = os.path.join(parent_dir, dir_name)
        os.makedirs(dir_path, exist_ok=True)

        page = fetch_content(doc_id, key, language)
        content = page.get("content", "No content available.")
        page_title = page.get("title", title)
        index_path = os.path.join(dir_path, f"00. {sanitize_name(page_title)}.md")
        with open(index_path, "w", encoding="utf-8") as f:
            f.write(f"# {page_title}\n\n{content}\n")
        print(f"{indent}[DIR]  {dir_name}/ ({len(children)} children)")
        time.sleep(0.15)

        for i, child in enumerate(children, 1):
            process_node(child, dir_path, i, key, language, depth + 1)

    else:
        page = fetch_content(doc_id, key, language)
        content = page.get("content", "No content available.")
        page_title = page.get("title", title)
        file_path = os.path.join(parent_dir, f"{padded}. {sanitize_name(page_title)}.md")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(f"# {page_title}\n\n{content}\n")
        print(f"{indent}[FILE] {padded}. {page_title}.md")
        time.sleep(0.15)


def main():
    parser = argparse.ArgumentParser(description="Build TikTok Business API docs locally.")
    parser.add_argument("--output", default="./tiktok-docs", help="Output directory")
    parser.add_argument("--key", required=True, help="TikTok API identify_key")
    parser.add_argument("--last", type=int, default=None, help="doc_id to process last")
    parser.add_argument("--language", default="ENGLISH", help="Language (default: ENGLISH)")
    args = parser.parse_args()

    os.makedirs(args.output, exist_ok=True)

    tree_url = f"{BASE_API}/platform/tree/get/?language={args.language}&identify_key={args.key}&is_need_content=false"
    print("Fetching doc tree...")
    tree_data = fetch_json(tree_url)
    if not tree_data or tree_data.get("code") != 0:
        print("Failed to fetch tree. Aborting.")
        return

    all_nodes = tree_data["data"]["primary_doc_list"]
    print(f"Found {len(all_nodes)} top-level sections.\n")

    if args.last:
        normal = [n for n in all_nodes if n["doc_id"] != args.last]
        last = [n for n in all_nodes if n["doc_id"] == args.last]
        ordered = normal + last
    else:
        ordered = all_nodes

    # Remove existing top-level .md files that will be replaced by folders
    for node in ordered:
        title = sanitize_name(node["title"])
        for f in os.listdir(args.output):
            if f.endswith(".md") and title in f:
                os.remove(os.path.join(args.output, f))

    original_indices = {n["doc_id"]: i + 1 for i, n in enumerate(all_nodes)}

    for node in ordered:
        idx = original_indices[node["doc_id"]]
        title = sanitize_name(node["title"])
        children = node.get("child_docs") or []
        print(f"\n{'='*60}")
        print(f"Processing [{idx:02d}] {title} ({len(children)} children)")
        print("=" * 60)
        process_node(node, args.output, idx, args.key, args.language)

    print("\n\nDone! Full doc tree built.")


if __name__ == "__main__":
    main()
