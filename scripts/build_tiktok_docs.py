#!/usr/bin/env python3
"""
Recursively fetches TikTok Business API docs and saves them as markdown files
mirroring the website's sidebar hierarchy.
"""

import os
import re
import json
import time
import urllib.request
import urllib.error
import shutil

IDENTIFY_KEY = "c0138ffadd90a955c1f0670a56fe348d1d40680b3c89461e09f78ed26785164b"
BASE_DIR = "/Users/NI013/Documents/Om Docs/depos/socialLift/docs/tiktok/business-apis docs"
TREE_URL = f"https://business-api.tiktok.com/gateway/api/doc/client/platform/tree/get/?language=ENGLISH&identify_key={IDENTIFY_KEY}&is_need_content=false"
NODE_URL = f"https://business-api.tiktok.com/gateway/api/doc/client/node/get/?language=ENGLISH&identify_key={IDENTIFY_KEY}&doc_id="

# Process Marketing API (index 7) last
MARKETING_API_ID = 1781891416235009


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


def fetch_content(doc_id):
    data = fetch_json(f"{NODE_URL}{doc_id}")
    if data and data.get("code") == 0:
        return data.get("data", {})
    return {}


def sanitize_name(name):
    # Remove chars not allowed in file/folder names
    name = re.sub(r'[<>:"/\\|?*\x00-\x1f]', '', name)
    name = name.strip('. ')
    return name[:120]  # cap length


def process_node(node, parent_dir, index, depth=0):
    doc_id = node["doc_id"]
    title = sanitize_name(node["title"])
    children = node.get("child_docs") or []
    padded = f"{index:02d}"
    indent = "  " * depth

    if children:
        dir_name = f"{padded}. {title}"
        dir_path = os.path.join(parent_dir, dir_name)
        os.makedirs(dir_path, exist_ok=True)

        # Fetch and save this node's content as the index file
        page = fetch_content(doc_id)
        content = page.get("content", "No content available.")
        page_title = page.get("title", title)
        index_path = os.path.join(dir_path, f"00. {sanitize_name(page_title)}.md")
        with open(index_path, "w", encoding="utf-8") as f:
            f.write(f"# {page_title}\n\n{content}\n")
        print(f"{indent}[DIR]  {dir_name}/ ({len(children)} children)")
        time.sleep(0.15)

        for i, child in enumerate(children, 1):
            process_node(child, dir_path, i, depth + 1)

    else:
        # Leaf node
        page = fetch_content(doc_id)
        content = page.get("content", "No content available.")
        page_title = page.get("title", title)
        file_path = os.path.join(parent_dir, f"{padded}. {sanitize_name(page_title)}.md")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(f"# {page_title}\n\n{content}\n")
        print(f"{indent}[FILE] {padded}. {page_title}.md")
        time.sleep(0.15)


def main():
    print("Fetching doc tree...")
    tree_data = fetch_json(TREE_URL)
    if not tree_data or tree_data.get("code") != 0:
        print("Failed to fetch tree. Aborting.")
        return

    all_nodes = tree_data["data"]["primary_doc_list"]
    print(f"Found {len(all_nodes)} top-level sections.\n")

    # Split: non-marketing first (in order), marketing last
    non_marketing = [n for n in all_nodes if n["doc_id"] != MARKETING_API_ID]
    marketing = [n for n in all_nodes if n["doc_id"] == MARKETING_API_ID]
    ordered = non_marketing + marketing

    # Remove existing top-level .md files for sections that have children
    # (they will be replaced by folders)
    for node in ordered:
        title = sanitize_name(node["title"])
        # Find any existing .md with this title and remove it
        for f in os.listdir(BASE_DIR):
            if f.endswith(".md") and title in f:
                os.remove(os.path.join(BASE_DIR, f))

    # Process each top-level section in order
    # Assign display index based on original position in all_nodes
    original_indices = {n["doc_id"]: i + 1 for i, n in enumerate(all_nodes)}

    for node in ordered:
        idx = original_indices[node["doc_id"]]
        title = sanitize_name(node["title"])
        children = node.get("child_docs") or []
        print(f"\n{'='*60}")
        print(f"Processing [{idx:02d}] {title} ({len(children)} children)")
        print('='*60)
        process_node(node, BASE_DIR, idx, depth=0)

    print("\n\nDone! Full doc tree built.")


if __name__ == "__main__":
    main()
