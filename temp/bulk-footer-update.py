#!/usr/bin/env python3
"""
Bulk update footer HTML for news articles
"""

import os
import re

# List of remaining news files to update
news_files = [
    'C:/Mezzofy/workspace/mz-website/dist/news/cioworld-feature.html',
    'C:/Mezzofy/workspace/mz-website/dist/news/dual-esg-awards.html',
    'C:/Mezzofy/workspace/mz-website/dist/news/edigest-leading-solution.html',
    'C:/Mezzofy/workspace/mz-website/dist/news/ejtech-300m-coupons.html',
    'C:/Mezzofy/workspace/mz-website/dist/news/funding-announcement.html',
    'C:/Mezzofy/workspace/mz-website/dist/news/techapple-innovation-index.html',
    'C:/Mezzofy/workspace/mz-website/dist/news/treasure-global-partnership.html',
]

# Old footer pattern (4-column)
old_footer_pattern = r'    <!-- Footer -->\s*<footer id="contact" class="bg-primary-black text-white">.*?</footer>'

# New footer HTML (5-column standardized)
new_footer = '''    <!-- Footer -->
    <footer class="bg-primary-black text-gray-300 pt-16 pb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                    Ready to power the future of commerce?
                </h2>
                <p class="text-lg sm:text-xl text-orange-200 mb-10 max-w-3xl mx-auto">
                    Whether you are a merchant looking for maximum performance or a distributor seeking high-intent inventory, the Mezzofy Exchange Protocol is the indispensable infrastructure you need.
                </p>

                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a href="../contact.html" class="btn-primary w-full sm:w-auto text-center">Contact Sales (Enterprise)</a>
                    <a href="../for-developers.html" class="btn-secondary w-full sm:w-auto text-center bg-white/10 text-white border-white hover:bg-white/20">Developer Docs (API Access)</a>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                <!-- Company Info -->
                <div class="lg:col-span-1">
                    <h3 class="text-2xl font-bold text-primary-orange mb-4">Mezzofy</h3>
                    <p class="text-sm mb-4" data-i18n="common.footer.tagline">Building the future of coupon infrastructure through the Mezzofy Exchange Protocol.</p>
                </div>

                <!-- Solutions -->
                <div>
                    <h3 class="font-bold text-lg mb-4 text-white" data-i18n="common.footer.solutions.title">Solutions</h3>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="../for-merchants.html" class="hover:text-white transition-colors" data-i18n="common.footer.solutions.merchants">For Merchants</a></li>
                        <li><a href="../for-distributors.html" class="hover:text-white transition-colors" data-i18n="common.footer.solutions.distributors">For Distributors</a></li>
                        <li><a href="../for-developers.html" class="hover:text-white transition-colors" data-i18n="common.footer.solutions.developers">For Developers</a></li>
                        <li><a href="../index.html#product-ecosystem" class="hover:text-white transition-colors" data-i18n="common.footer.solutions.ecosystem">Product Ecosystem</a></li>
                    </ul>
                </div>

                <!-- Products -->
                <div>
                    <h3 class="font-bold text-lg mb-4 text-white" data-i18n="common.footer.products.title">Products</h3>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="../coupon-management.html" class="hover:text-white transition-colors" data-i18n="common.footer.products.management">Management</a></li>
                        <li><a href="../coupon-marketplace.html" class="hover:text-white transition-colors" data-i18n="common.footer.products.marketplace">Marketplace</a></li>
                        <li><a href="../coupon-nfc.html" class="hover:text-white transition-colors" data-i18n="common.footer.products.nfc">NFC</a></li>
                        <li><a href="../coupon-marketing.html" class="hover:text-white transition-colors" data-i18n="common.footer.products.marketing">Marketing</a></li>
                        <li><a href="../coupon-wallet.html" class="hover:text-white transition-colors" data-i18n="common.footer.products.wallet">Wallet</a></li>
                    </ul>
                </div>

                <!-- Resources -->
                <div>
                    <h3 class="font-bold text-lg mb-4 text-white" data-i18n="common.footer.resources.title">Resources</h3>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="../coupon-playbook.html" class="hover:text-white transition-colors" data-i18n="common.footer.resources.playbook">Coupon Playbook</a></li>
                        <li><a href="../index.html#" class="hover:text-white transition-colors" data-i18n="common.footer.resources.apiDoc">API Documentation</a></li>
                        <li><a href="../index.html#" class="hover:text-white transition-colors" data-i18n="common.footer.resources.apiUseCase">API Use Case</a></li>
                        <li><a href="../index.html#" class="hover:text-white transition-colors" data-i18n="common.footer.resources.support">Support</a></li>
                    </ul>
                </div>

                <!-- Company -->
                <div>
                    <h3 class="font-bold text-lg mb-4 text-white" data-i18n="common.footer.company.title">Company</h3>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="../about.html" class="hover:text-white transition-colors" data-i18n="common.footer.company.about">About Us</a></li>
                        <li><a href="../contact.html" class="hover:text-white transition-colors" data-i18n="common.footer.company.contact">Contact Us</a></li>
                        <li><a href="../news-press.html" class="hover:text-white transition-colors" data-i18n="common.footer.company.news">News & Press</a></li>
                        <li><a href="../investors.html" class="hover:text-white transition-colors" data-i18n="common.footer.company.investors">Investors</a></li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-gray-700 pt-8 text-center text-sm">
                <p data-i18n="common.footer.copyright">&copy; 2024 Mezzofy. All rights reserved.</p>
            </div>
        </div>
    </footer>'''

def update_footer(filepath):
    """Update footer in a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Use regex to replace footer section
        updated_content = re.sub(old_footer_pattern, new_footer, content, flags=re.DOTALL)

        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(updated_content)

        print(f"✅ Updated: {os.path.basename(filepath)}")
        return True
    except Exception as e:
        print(f"❌ Error updating {os.path.basename(filepath)}: {e}")
        return False

if __name__ == '__main__':
    print("Updating remaining news article footers...")
    print(f"Files to update: {len(news_files)}\n")

    success_count = 0
    for filepath in news_files:
        if update_footer(filepath):
            success_count += 1

    print(f"\n✨ Complete! Updated {success_count}/{len(news_files)} files")
