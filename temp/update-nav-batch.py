#!/usr/bin/env python3
"""
Batch update navigation for all HTML files to add AI Commerce link
"""

import os
import re

# Files to update (main pages)
MAIN_PAGES = [
    'for-developers.html',
    'about.html',
    'contact.html',
    'coupon-management.html',
    'coupon-marketing.html',
    'coupon-marketplace.html',
    'coupon-nfc.html',
    'coupon-playbook.html',
    'coupon-wallet.html',
    'investors.html',
    'news-press.html',
    'support.html',
    'nfc-user-guide.html',
    '404.html'
]

# Blog and news pages (use relative path ../)
BLOG_PAGES = [
    'blog/e-coupons-preference.html',
    'blog/environmental-excellence.html',
    'blog/holiday-guide.html',
    'blog/hotel-tech-innovation.html',
    'blog/nfc-parknshop.html',
    'blog/smart-retail.html'
]

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

BASE_DIR = r'C:\Mezzofy\workspace\mz-website\dist'

def update_file(filepath, use_relative_path=False):
    """Update a single HTML file with AI Commerce navigation links"""

    path_prefix = '../' if use_relative_path else ''

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        updates_made = 0

        # 1. Desktop Solutions dropdown - add after Developer link
        desktop_pattern = r'(<a href="for-developers\.html" class="dropdown-item"[^>]*data-i18n="common\.nav\.developerSolution"[^>]*>.*?</a>\s*)(</div>)'
        desktop_replacement = rf'\1                            <a href="{path_prefix}for-ai-commerce.html" class="dropdown-item" data-i18n="common.nav.aiCommerceSolution">AI Commerce</a>\n                        \2'

        if re.search(desktop_pattern, content):
            content = re.sub(desktop_pattern, desktop_replacement, content)
            updates_made += 1

        # 2. Mobile Solutions dropdown - add after Developer link
        mobile_pattern = r'(<a href="for-developers\.html" class="block py-2[^>]*data-i18n="common\.nav\.developerSolution"[^>]*>.*?</a>\s*)(</div>)'
        mobile_replacement = rf'\1                        <a href="{path_prefix}for-ai-commerce.html" class="block py-2 text-sm text-medium-grey hover:text-primary-orange" data-i18n="common.nav.aiCommerceSolution">AI Commerce</a>\n                    \2'

        if re.search(mobile_pattern, content):
            content = re.sub(mobile_pattern, mobile_replacement, content)
            updates_made += 1

        # 3. Footer Solutions column - add after Developers
        footer_pattern = r'(<li><a href="for-developers\.html"[^>]*data-i18n="common\.footer\.solutions\.developers"[^>]*>.*?</a></li>\s*)(<li><a href="[^"]*#product-ecosystem")'
        footer_replacement = rf'\1                        <li><a href="{path_prefix}for-ai-commerce.html" class="hover:text-white transition-colors" data-i18n="common.footer.solutions.aiCommerce">For AI Commerce</a></li>\n                        \2'

        if re.search(footer_pattern, content):
            content = re.sub(footer_pattern, footer_replacement, content)
            updates_made += 1

        # Write back if changes were made
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True, updates_made
        else:
            return False, 0

    except Exception as e:
        print(f"Error updating {filepath}: {e}")
        return False, 0

def main():
    """Main function to update all files"""

    success_count = 0
    fail_count = 0

    print("Updating main pages...")
    for page in MAIN_PAGES:
        filepath = os.path.join(BASE_DIR, page)
        if os.path.exists(filepath):
            success, updates = update_file(filepath, use_relative_path=False)
            if success:
                print(f"  OK {page} ({updates} sections updated)")
                success_count += 1
            else:
                print(f"  SKIP {page} (no changes or failed)")
                fail_count += 1
        else:
            print(f"  MISSING {page} (file not found)")
            fail_count += 1

    print("\nUpdating blog pages...")
    for page in BLOG_PAGES:
        filepath = os.path.join(BASE_DIR, page)
        if os.path.exists(filepath):
            success, updates = update_file(filepath, use_relative_path=True)
            if success:
                print(f"  OK {page} ({updates} sections updated)")
                success_count += 1
            else:
                print(f"  SKIP {page} (no changes or failed)")
                fail_count += 1
        else:
            print(f"  MISSING {page} (file not found)")
            fail_count += 1

    print("\nUpdating news pages...")
    for page in NEWS_PAGES:
        filepath = os.path.join(BASE_DIR, page)
        if os.path.exists(filepath):
            success, updates = update_file(filepath, use_relative_path=True)
            if success:
                print(f"  OK {page} ({updates} sections updated)")
                success_count += 1
            else:
                print(f"  SKIP {page} (no changes or failed)")
                fail_count += 1
        else:
            print(f"  MISSING {page} (file not found)")
            fail_count += 1

    print(f"\n{'='*60}")
    print(f"Summary: {success_count} files updated successfully, {fail_count} failed/skipped")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
