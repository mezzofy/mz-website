#!/usr/bin/env python3
"""Add language selectors to news articles"""

import os
import re

NEWS_DIR = "dist/news"

DESKTOP_LANG_SELECTOR = '''
        <!-- Language Selector -->
        <div class="dropdown">
          <button class="dropdown-trigger text-medium-grey hover:text-primary-black transition-colors">
            <svg class="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
            </svg>
            <span id="current-lang-desktop">English</span>
            <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div class="dropdown-menu">
            <a href="#" class="dropdown-item lang-option" data-lang="en">English</a>
            <a href="#" class="dropdown-item lang-option" data-lang="zh-TW">Traditional Chinese</a>
            <a href="#" class="dropdown-item lang-option" data-lang="zh-CN">Simplified Chinese</a>
          </div>
        </div>

        <a href="#contact"'''

MOBILE_LANG_SELECTOR = '''
      <!-- Language Selector -->
      <div class="mobile-dropdown">
        <button class="mobile-dropdown-trigger" data-dropdown="mobile-lang">
          <span id="current-lang-mobile">English</span>
          <svg class="w-4 h-4 transform transition-transform chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div class="mobile-dropdown-menu" data-menu="mobile-lang">
          <a href="#" class="block py-2 text-sm hover:bg-gray-50 lang-option" data-lang="en">English</a>
          <a href="#" class="block py-2 text-sm hover:bg-gray-50 lang-option" data-lang="zh-TW">Traditional Chinese</a>
          <a href="#" class="block py-2 text-sm hover:bg-gray-50 lang-option" data-lang="zh-CN">Simplified Chinese</a>
        </div>
      </div>
    </div>'''

files_updated = 0

for filename in os.listdir(NEWS_DIR):
    if filename.endswith('.html'):
        filepath = os.path.join(NEWS_DIR, filename)

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Add desktop language selector (before the CTA button)
        if 'current-lang-desktop' not in content:
            content = re.sub(
                r'(\s+)<a href="#contact"',
                DESKTOP_LANG_SELECTOR,
                content,
                count=1
            )

        # Add mobile language selector (before closing mobile menu div)
        if 'current-lang-mobile' not in content:
            content = re.sub(
                r'(\s+)</div>\s*</div>\s*</nav>',
                MOBILE_LANG_SELECTOR,
                content,
                count=1
            )

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

        files_updated += 1
        print(f"Updated: {filename}")

print(f"\nTotal files updated: {files_updated}")
