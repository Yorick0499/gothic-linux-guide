# Local development and content preservation

GitHub Pages builds `docs/` with Jekyll. The custom layout and local assets do not
need a remote theme, Node build, external fonts, secrets or game installation.
Keep the existing Pages source (`main`, `/docs`) when deploying this redesign.

With Jekyll and `jekyll-sitemap` installed:

```sh
jekyll build --source docs --destination /tmp/gothic-site
python3 scripts/verify-content.py --site /tmp/gothic-site
jekyll serve --source docs --destination /tmp/gothic-site
```

The site's base path remains `/gothic-linux-guide/` and all original page URLs
are retained. The Google verification file and robots.txt remain unchanged.

In the prepared Codex environment, first source `/workspace/.onboarding/activate`
and invoke Jekyll as `ruby /workspace/.onboarding/root/usr/bin/jekyll`.
Use `docs/_config.yml` directly; the older onboarding override is unnecessary.

`content-baseline.json` records SHA-256 hashes of the original five Markdown
pages, robots.txt and Google verification file at the named reference commit.
It also records the original rendered article text, links and command blocks.
The verifier checks both source bytes and the generated articles. Changes to
navigation, controls or presentation do not change these article signatures.
Do not refresh the baseline to conceal content edits.

The redesign was also checked in Chromium at widths 320, 390, 768, 1024 and
1536 px, including original routes, internal navigation, search, clipboard
contents, section outlines and mobile menu keyboard interaction.
