#!/usr/bin/env python3
"""Verify byte-identical source documents and rendered article semantics."""
import argparse
import hashlib
import json
import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

class Article(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.text, self.links, self.code = [], [], []
        self.pre = None
        self.ignore = 0
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'button': self.ignore += 1
        if self.ignore: return
        if tag == 'a' and not attrs.get('class', '').startswith('anchor'):
            self.links.append(attrs.get('href', ''))
        if tag == 'pre': self.pre = ''
    def handle_endtag(self, tag):
        if tag == 'button' and self.ignore: self.ignore -= 1
        if tag == 'pre' and self.pre is not None:
            self.code.append(self.pre)
            self.pre = None
    def handle_data(self, data):
        if not self.ignore:
            self.text.append(data)
            if self.pre is not None: self.pre += data
    def signature(self):
        return {'text': re.sub(r'\s+', ' ', ''.join(self.text)).strip(), 'links': self.links, 'code': self.code}

def signature(html):
    parser = Article()
    parser.feed(html)
    return parser.signature()

def main():
    args = argparse.ArgumentParser()
    args.add_argument('--site', required=True, type=Path)
    args = args.parse_args()
    baseline = json.loads((ROOT / 'scripts/content-baseline.json').read_text())
    for name, expected in baseline['files'].items():
        actual = hashlib.sha256((ROOT / name).read_bytes()).hexdigest()
        assert actual == expected, f'Original file changed: {name}'
        print(f'PASS byte-identical: {name}')
    for name, expected in baseline['articles'].items():
        html = (args.site / name).read_text()
        match = re.search(r'<article\b[^>]*>(.*?)</article>', html, re.S)
        assert match, f'Article missing: {name}'
        actual = signature(match[1])
        assert actual == expected, f'Rendered content, links or commands changed: {name}'
        print(f'PASS original rendered text, links and commands: {name}')
    for name in ['google7406421d207921a7.html', 'robots.txt']:
        assert (args.site / name).read_bytes() == (ROOT / 'docs' / name).read_bytes(), f'Google/robots output changed: {name}'
    print('PASS Google verification and robots.txt preserved')

if __name__ == '__main__': main()
