import argparse
import json
import xml.etree.ElementTree as ET
from pathlib import Path
from typing import Any
from urllib.parse import urlsplit


CONFIG_PATH = Path(".github/workflows/resources/lighthouserc.json")
SITEMAP_PATH = Path("public/sitemap.xml")
NAMESPACE = "{http://www.sitemaps.org/schemas/sitemap/0.9}"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("output", type=Path, help="Path to the generated Lighthouse configuration")
    args = parser.parse_args()

    config = load_config(CONFIG_PATH)
    config["ci"]["collect"]["url"] = sitemap_urls(SITEMAP_PATH)
    with args.output.open("w", encoding="utf-8") as file:
        json.dump(config, file, indent=2)


def load_config(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as file:
        return json.load(file)


def sitemap_urls(path: Path) -> list[str]:
    sitemap = ET.parse(path)
    pages = sitemap.findall(f"{NAMESPACE}url")
    if not pages:
        raise ValueError("Sitemap contains no page URLs")

    urls = [
        local_url(page.findtext(f"{NAMESPACE}loc", "").strip())
        for page in pages
    ]
    return list(dict.fromkeys(urls))


def local_url(location: str) -> str:
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
    return f"http://localhost{parsed.path}"


if __name__ == "__main__":
    main()
