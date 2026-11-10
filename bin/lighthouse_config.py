import json
import sys
import xml.etree.ElementTree as ET
from urllib.parse import urlsplit


with open(".github/workflows/resources/lighthouserc.json", encoding="utf-8") as file:
    config = json.load(file)

sitemap = ET.parse("public/sitemap.xml")
namespace = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
pages = sitemap.findall(f"{namespace}url")
if not pages:
    raise ValueError("Sitemap contains no page URLs")

urls = []
for page in pages:
    location = page.findtext(f"{namespace}loc", "").strip()
    parsed = urlsplit(location)
    if (
        parsed.scheme not in ("http", "https")
        or not parsed.netloc
        or not parsed.path.startswith("/")
        or parsed.path.startswith("//")
        or "\\" in parsed.path
        or parsed.query
        or parsed.fragment
    ):
        raise ValueError(f"Invalid sitemap URL: {location!r}")
    urls.append(f"http://localhost{parsed.path}")

config["ci"]["collect"]["url"] = list(dict.fromkeys(urls))
json.dump(config, sys.stdout, indent=2)
