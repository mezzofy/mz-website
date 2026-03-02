#!/usr/bin/env python3
"""
Update remaining files that need navigation changes
"""

import os
import re

BASE_DIR = r'C:\Mezzofy\workspace\mz-website\dist'

# Blog pages
BLOG_PAGES = [
    'blog/e-coupons-preference.html',
    'blog/environmental-excellence.html',
    'blog/holiday-guide.html',
    'blog/hotel-tech-innovation.html',
    'blog/smart-retail.html'  # Skip nfc-parknshop.html as we already updated it
]

# News pages
NEWS_PAGES = [
    'news/cioworld-feature.html',
    'news/dual-esg-awards.html',
    'news/edigest-leading-solution.html',
    'news/ejtech-300m-coupons.html',
    'news/forbes-dicky-yin.html',
    'news/funding-announcement.html',
    'news/techapple-innovation-index.html',
    'news/treasure-global-partnership.html'
]

# Main pages that need manual update
MAIN_PAGES = [
    'for-developers.html',
    'nfc-user-guide.html'
]

def update_blog_news_file(filepath):
    """Update blog/news file with relative path"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original = content

        # 1. Desktop Solutions dropdown
        content = content.replace(
            '<a href="../for-developers.html" class="dropdown-item" data-i18n="common.nav.developerSolution">I\'m a Developer</a>\n                        </div>',
            '<a href="../for-developers.html" class="dropdown-item" data-i18n="common.nav.developerSolution">I\'m a Developer</a>\n                            <a href="../for-ai-commerce.html" class="dropdown-item" data-i18n="common.nav.aiCommerceSolution">AI Commerce</a>\n                        </div>'
        )

        # 2. Mobile Solutions dropdown
        content = content.replace(
            '<a href="../for-developers.html" class="block py-2 text-sm text-medium-grey hover:text-primary-orange" data-i18n="common.nav.developerSolution">I\'m a Developer</a>\n                    </div>',
            '<a href="../for-developers.html" class="block py-2 text-sm text-medium-grey hover:text-primary-orange" data-i18n="common.nav.developerSolution">I\'m a Developer</a>\n                        <a href="../for-ai-commerce.html" class="block py-2 text-sm text-medium-grey hover:text-primary-orange" data-i18n="common.nav.aiCommerceSolution">AI Commerce</a>\n                    </div>'
        )

        # 3. Footer Solutions column
        content = content.replace(
            '<li><a href="../for-developers.html" class="hover:text-white transition-colors" data-i18n="common.footer.solutions.developers">For Developers</a></li>\n                        <li><a href="../index.html#product-ecosystem"',
            '<li><a href="../for-developers.html" class="hover:text-white transition-colors" data-i18n="common.footer.solutions.developers">For Developers</a></li>\n                        <li><a href="../for-ai-commerce.html" class="hover:text-white transition-colors" data-i18n="common.footer.solutions.aiCommerce">For AI Commerce</a></li>\n                        <li><a href="../index.html#product-ecosystem"'
        )

        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error updating {filepath}: {e}")
        return False

def update_main_file(filepath):
    """Update main page files"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original = content

        # 1. Desktop Solutions dropdown
        content = content.replace(
            '<a href="for-developers.html" class="dropdown-item" data-i18n="common.nav.developerSolution">I\'m a Developer</a>\n                        </div>',
            '<a href="for-developers.html" class="dropdown-item" data-i18n="common.nav.developerSolution">I\'m a Developer</a>\n                            <a href="for-ai-commerce.html" class="dropdown-item" data-i18n="common.nav.aiCommerceSolution">AI Commerce</a>\n                        </div>'
        )

        # 2. Mobile Solutions dropdown
        content = content.replace(
            '<a href="for-developers.html" class="block py-2 text-sm text-medium-grey hover:text-primary-orange" data-i18n="common.nav.developerSolution">I\'m a Developer</a>\n                    </div>',
            '<a href="for-developers.html" class="block py-2 text-sm text-medium-grey hover:text-primary-orange" data-i18n="common.nav.developerSolution">I\'m a Developer</a>\n                        <a href="for-ai-commerce.html" class="block py-2 text-sm text-medium-grey hover:text-primary-orange" data-i18n="common.nav.aiCommerceSolution">AI Commerce</a>\n                    </div>'
        )

        # 3. Footer Solutions column
        content = content.replace(
            '<li><a href="for-developers.html" class="hover:text-white transition-colors" data-i18n="common.footer.solutions.developers">For Developers</a></li>\n                        <li><a href="index.html#product-ecosystem"',
            '<li><a href="for-developers.html" class="hover:text-white transition-colors" data-i18n="common.footer.solutions.developers">For Developers</a></li>\n                        <li><a href="for-ai-commerce.html" class="hover:text-white transition-colors" data-i18n="common.footer.solutions.aiCommerce">For AI Commerce</a></li>\n                        <li><a href="index.html#product-ecosystem"'
        )

        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error updating {filepath}: {e}")
        return False

def main():
    success = 0
    failed = 0

    print("Updating blog pages...")
    for page in BLOG_PAGES:
        filepath = os.path.join(BASE_DIR, page)
        if os.path.exists(filepath):
            if update_blog_news_file(filepath):
                print(f"  OK {page}")
                success += 1
            else:
                print(f"  SKIP {page}")
                failed += 1
        else:
            print(f"  MISSING {page}")
            failed += 1

    print("\nUpdating news pages...")
    for page in NEWS_PAGES:
        filepath = os.path.join(BASE_DIR, page)
        if os.path.exists(filepath):
            if update_blog_news_file(filepath):
                print(f"  OK {page}")
                success += 1
            else:
                print(f"  SKIP {page}")
                failed += 1
        else:
            print(f"  MISSING {page}")
            failed += 1

    print("\nUpdating main pages...")
    for page in MAIN_PAGES:
        filepath = os.path.join(BASE_DIR, page)
        if os.path.exists(filepath):
            if update_main_file(filepath):
                print(f"  OK {page}")
                success += 1
            else:
                print(f"  SKIP {page}")
                failed += 1
        else:
            print(f"  MISSING {page}")
            failed += 1

    print(f"\n{'='*60}")
    print(f"Summary: {success} files updated, {failed} skipped/failed")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
