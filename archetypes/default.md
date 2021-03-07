---
title: "{{ .TranslationBaseName | replaceRE "^.{1,21}" "" | replaceRE "-" " " | title }}"
slug: {{ .TranslationBaseName | replaceRE "^.{1,21}" "" }}
date: {{ .Date }}
#summary: REPLACEME (if left commented, it'll default to the first bit of the content itself)
publishdate: {{ .Date }}
categories: ["development practices", "tutorial", "tips & tricks", "portfolio"]
tags: ["replaceme", "todo"]
#thumbnail: "assets/posts/{{ .Name }}/hero.jpg"
thumbnail: "assets/home/default-hamilton.jpg"
thumbnail_alt_text: "If you're reading this you probably need a hobby- have you considered DnD?"
draft: true
---
