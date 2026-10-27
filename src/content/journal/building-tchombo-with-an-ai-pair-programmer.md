---
title: "Building TCHOMBO! in three weeks with an AI pair programmer"
excerpt: "I design brands and illustrations for a living, not real-time multiplayer game engines. Here's how TCHOMBO! shipped anyway, and what I'd actually tell another designer thinking about trying this."
date: 2026-10-05
accent: "#2E6E52"
tags: ["Process", "Game design"]
relatedProject: "tchombo"
---

I'm a graphic and motion designer, not a software engineer. I don't write real-time networking code for fun, and until a few months ago I had never shipped a live multiplayer app. TCHOMBO! exists anyway: a bilingual, real-time party game based on a real Mauritian guessing tradition, with 860 fact-checked trivia questions, no install and no account. It took about three weeks, start to live, across 43 commits.

## Why a designer builds a game engine at all

TCHOMBO! started the way most of my side projects start: as a thing I wanted to exist more than a thing I planned carefully. It's built around a real Mauritian guessing tradition, the one where someone raises a number, the next person has to beat it or call it exact, and the whole table turns on who blinks first. It never had a proper digital version, and the attempts I'd seen online turned it into a flat trivia quiz and lost the thing that actually makes it fun: the real-time pressure of someone else about to call your bluff.

So the brief, such as it was, was mine: keep the social pressure, make it bilingual (English and French, full parity, not a translated afterthought), and make it work on a phone in someone's living room with zero friction. No app store, no account, no install. A room code and you're in.

## What "built out loud" actually meant

The real-time engine, the bilingual interface and the trivia content itself all came out of a running conversation with an AI pair programmer, not a blank editor. That distinction matters more than it sounds. I didn't hand off "build me a game" and wait for a finished product. Every rule got specified in plain language first, the way I'd brief a junior designer: here's what happens when someone calls TCHOMBO on the wrong number, here's what a dodo life costs you, here's what "exact" rewards versus punishes. Then it got built, tested against the live app, and re-checked before it shipped. Forty-seven unit tests sit on the game engine alone, not because I wrote test suites by hand, but because I insisted nothing shipped that I couldn't verify actually worked the way I'd described it.

The part that surprised me: the design instincts transferred almost directly. Scoping a feature for a client and scoping a game rule for an AI pair programmer are the same skill. Say exactly what you mean, specify the edge cases before someone else finds them, and don't move on until the thing in front of you actually does what you said it would.

## What I'd tell another designer trying this

Don't start with the hardest feature. I didn't begin with real-time multiplayer sync, I began with the trivia content and the rules, the part that was unambiguously mine to own. By the time the real-time layer needed building, I'd already proven the game itself was worth building.

Treat every spec like a design brief, because it is one. Vague instructions get vague results whether you're briefing a developer, an AI, or yourself at 11pm. The clearer I was about what "losing a dodo life" should feel like, the closer the first working version came to matching what was in my head.

And ship it to people who'll actually be honest with you. TCHOMBO! went through real playtests with real groups before I called it live. No amount of unit tests tells you whether a party game is actually fun at a table.

Three weeks, one designer, a tradition I grew up with, and a tool that let me build the thing instead of just designing a poster for someone else's version of it.
