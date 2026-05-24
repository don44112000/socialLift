#!/usr/bin/env python3
"""
Local receiver server. Accepts POST from the browser console script
and saves the JSON directly to a specified output path.

Usage:
    python3 scripts/receiver_server.py --output ./docs/tiktok/tiktok-devportal-docs.json
    python3 scripts/receiver_server.py --port 9876 --output ./data.json
"""

import json
import os
import argparse
from http.server import HTTPServer, BaseHTTPRequestHandler


def parse_args():
    parser = argparse.ArgumentParser(description="Local receiver server for browser scraper.")
    parser.add_argument("--output", default="./tiktok-devportal-docs.json", help="Path to save the JSON file")
    parser.add_argument("--port", type=int, default=9876, help="Port to listen on (default: 9876)")
    return parser.parse_args()


SAVE_PATH = None  # set at runtime


class Handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self._cors()
        self.end_headers()

    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length)
        try:
            data = json.loads(body)
            save_dir = os.path.dirname(os.path.abspath(SAVE_PATH))
            if save_dir:
                os.makedirs(save_dir, exist_ok=True)
            with open(SAVE_PATH, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
            print(f"\n✅ Saved {len(body)//1024}KB → {SAVE_PATH}\n")
            self.send_response(200)
            self._cors()
            self.end_headers()
            self.wfile.write(b'{"ok":true}')
        except Exception as e:
            print(f"Error: {e}")
            self.send_response(500)
            self._cors()
            self.end_headers()

    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def log_message(self, *args):
        pass  # silence request logs


if __name__ == "__main__":
    args = parse_args()
    SAVE_PATH = args.output
    print(f"Receiver running on http://localhost:{args.port}")
    print(f"Will save to: {SAVE_PATH}\n")
    HTTPServer(("localhost", args.port), Handler).serve_forever()
