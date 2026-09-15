import urllib.request, json, re, time, os
from concurrent.futures import ThreadPoolExecutor, as_completed

with open("fiftyfourms_urls.json") as f:
    urls = json.load(f)

print(f"Starting scrape of {len(urls)} products from fiftyfourms.com...")

# Load existing progress if any
scraped_data = {}
if os.path.exists("scraped_products_full.json"):
    try:
        with open("scraped_products_full.json") as f:
            scraped_data = json.load(f)
        print(f"Loaded {len(scraped_data)} already scraped items from previous run")
    except:
        pass

remaining_urls = [u for u in urls if u not in scraped_data]
print(f"Remaining URLs to scrape: {len(remaining_urls)}")

# Helper to parse dimensions like "85х84х75 см" or "336х241х130 см" or "250x52x56 cm"
def parse_dims(dim_str):
    if not dim_str:
        return {"width": 120, "depth": 60, "height": 75, "unit": "cm"}
    nums = re.findall(r'(\d+)', dim_str.replace(' ', ''))
    if len(nums) >= 3:
        return {"width": int(nums[0]), "depth": int(nums[1]), "height": int(nums[2]), "unit": "cm"}
    elif len(nums) == 2:
        return {"width": int(nums[0]), "depth": int(nums[1]), "height": 75, "unit": "cm"}
    return {"width": 120, "depth": 60, "height": 75, "unit": "cm"}

# Category & room mapper
def map_category_and_rooms(slug):
    s = slug.lstrip('-').lower()
    if s.startswith('modular-sofa') or s.startswith('sofa'):
        return 'sofas', 'upholstered', ['living-room', 'lounge']
    elif s.startswith('bedside-table'):
        return 'bedside-tables', 'cabinet', ['bedroom']
    elif s.startswith('bed') or s.startswith('krovat'):
        return 'beds', 'upholstered', ['bedroom']
    elif s.startswith('armchair'):
        return 'armchairs', 'upholstered', ['living-room', 'lounge']
    elif s.startswith('coffee-table'):
        return 'coffee-tables', 'cabinet', ['living-room', 'lounge']
    elif s.startswith('dressing-table'):
        return 'dressing-tables', 'cabinet', ['bedroom']
    elif s.startswith('dining-table') or s.startswith('table'):
        return 'dining-tables', 'cabinet', ['dining-room']
    elif s.startswith('chair'):
        return 'chairs', 'upholstered', ['dining-room']
    elif s.startswith('tv-stand'):
        return 'tv-stands', 'cabinet', ['living-room']
    elif s.startswith('sideboard'):
        return 'sideboards', 'cabinet', ['living-room', 'dining-room']
    elif s.startswith('console'):
        return 'consoles', 'cabinet', ['living-room', 'lounge']
    elif s.startswith('banquette'):
        return 'banquettes', 'upholstered', ['bedroom', 'lounge']
    elif s.startswith('pouf') or s.startswith('puf'):
        return 'poufs', 'upholstered', ['living-room', 'bedroom']
    elif s.startswith('office-desk') or s.startswith('desk'):
        return 'desks', 'cabinet', ['office']
    elif s.startswith('conference-table'):
        return 'dining-tables', 'cabinet', ['office']
    return 'accessories', 'cabinet', ['living-room']

def fetch_single_product(url):
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
            })
            with urllib.request.urlopen(req, timeout=9) as res:
                html = res.read().decode('utf-8', errors='ignore')
                
                # Extract JSON-LD
                jlds = re.findall(r'<script type="application/ld\+json">(.+?)</script>', html, re.DOTALL)
                prod_ld = None
                for j in jlds:
                    try:
                        d = json.loads(j)
                        if d.get("@type") == "Product":
                            prod_ld = d
                            break
                    except:
                        pass
                
                # Extract Next.js payload chunks
                chunks = re.findall(r'self\.__next_f\.push\(\[1,"(.*?)"\]\)', html)
                full_str = "".join(chunks).replace('\\"', '"').replace('\\\\', '\\')
                
                # Images (high resolution webp)
                images = []
                # First check high images from next.js payload
                img_matches = re.findall(r'"high":"(https://[^"]+)"', full_str)
                for im in img_matches:
                    if im not in images:
                        images.append(im)
                
                # Fallback to json-ld image
                if not images and prod_ld and "image" in prod_ld:
                    ld_img = prod_ld["image"]
                    if isinstance(ld_img, list):
                        images = ld_img
                    elif isinstance(ld_img, str):
                        images = [ld_img]
                
                # Additional CDN images found in HTML
                if len(images) < 2:
                    cdn_matches = re.findall(r'(https://cdn\.fiftyfourms\.com/[a-zA-Z0-9_\-]+\.webp)', html)
                    for cm in cdn_matches:
                        if 'thumbnail_' not in cm and cm not in images:
                            images.append(cm)

                # Dimensions
                dim_match = re.search(r'"Габариты[^"]*"\s*,\s*"value":\s*"([^"]+)"', full_str)
                dim_str = dim_match.group(1) if dim_match else ""
                
                # Materials
                mat_match = re.search(r'"Материалы[^"]*"\s*,\s*"value":\s*"([^"]+)"', full_str)
                mat_str = mat_match.group(1) if mat_match else ""
                
                # Video if any
                video_match = re.search(r'(https://cdn\.fiftyfourms\.com/[a-zA-Z0-9_\-]+\.mp4)', full_str)
                video_url = video_match.group(1) if video_match else None

                slug = url.split('/product/')[-1]
                raw_name = prod_ld.get("name", "") if prod_ld else ""
                sku = prod_ld.get("sku", "") if prod_ld else slug[:8].upper()
                price = float(prod_ld.get("offers", [{}])[0].get("price", 0)) if prod_ld else 0
                desc = prod_ld.get("description", "") if prod_ld else ""
                
                subcat, cat, rooms = map_category_and_rooms(slug)
                dims = parse_dims(dim_str)

                return {
                    "ok": True,
                    "url": url,
                    "slug": slug,
                    "rawName": raw_name,
                    "sku": sku,
                    "price": price,
                    "description": desc,
                    "images": images,
                    "dimensionsStr": dim_str,
                    "dimensions": dims,
                    "materials": mat_str,
                    "subcategory": subcat,
                    "category": cat,
                    "rooms": rooms,
                    "videoUrl": video_url
                }
        except Exception as e:
            time.sleep(0.6)
    return {"ok": False, "url": url}

t_start = time.time()
counter = len(scraped_data)
batch_saved = 0

with ThreadPoolExecutor(max_workers=10) as executor:
    futures = {executor.submit(fetch_single_product, u): u for u in remaining_urls}
    for future in as_completed(futures):
        res = future.result()
        if res.get("ok"):
            scraped_data[res["url"]] = res
            counter += 1
            batch_saved += 1
            
            if batch_saved % 25 == 0 or counter == len(urls):
                with open("scraped_products_full.json", "w") as f:
                    json.dump(scraped_data, f, ensure_ascii=False, indent=2)
                elapsed = time.time() - t_start
                print(f"[{counter}/{len(urls)}] Progress saved: {len(scraped_data)} items in {elapsed:.1f}s", flush=True)

with open("scraped_products_full.json", "w") as f:
    json.dump(scraped_data, f, ensure_ascii=False, indent=2)

print(f"FINISHED! Scraped {len(scraped_data)}/{len(urls)} products total.")
