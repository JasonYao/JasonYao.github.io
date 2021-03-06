---
title: "{{ .TranslationBaseName | replaceRE ".{21}" "" | replaceRE "-" " " | title }}"
slug: {{ .TranslationBaseName | replaceRE "^[0-9]{14}-" ""  }}
date: {{ .Date }}
publishdate: {{ .Date }}
categories: ["development practices", "tutorial", "tips & tricks", "portfolio"]
tags: ["replaceme", "todo"]
#thumbnail: "assets/posts/{{ .Name }}/hero.jpg"
thumbnail: "assets/home/default-hamilton.jpg"
draft: true
---
