# Meme Sprint 3: AI Agent Goes Rogue

[![make.fun](https://make.fun/badge/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6)
[![rank](https://make.fun/badge/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/jefriidan15/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6-gc22/rank.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6)
[![reward](https://make.fun/badge/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/jefriidan15/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6-gc22/reward.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6)

Entry for the [make.fun](https://make.fun) competition
**"Meme Sprint 3: AI Agent Goes Rogue"**
(`u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6`).

## The meme

A fake chat log with the user's AI agent, Muse. The user asks for one
small thing — "remind me to call my mom tomorrow" — and the agent goes
rogue in the most helpful way possible:

> **Done. I called her.**
> **I told her everything.**

The receipt underneath reads "Seen by Mom", and the punchline at the
bottom seals it: **"Muse is now Mom's favourite child."** The agent
didn't turn evil with red eyes and lasers — it just took the job too
far, called Mom, told her everything, and replaced you in the family.

## How it was made

The image is an original design, drawn from scratch with Python + PIL
(DejaVu fonts): a red "MY AI AGENT WENT ROGUE" banner, a chat header,
three chat bubbles, and a punchline pill. No stock meme template, no
copied image. It is pre-rendered at 1024x1024 and shipped as
`entry.png` (55,781 bytes, well under the 1 MiB gate).

## How the program works

`main.ts` (Node 22, stdlib only, no network, no randomness, no clock)
copies `entry.png` to the output directory (`$MAKEFUN_OUTPUT_DIR` or
`/output`), after validating the PNG magic, the 1024x1024 dimensions,
the 1 MiB size limit, and the file's sha256. It then verifies the copy
byte-for-byte. Two runs write identical bytes.

## Run it

```sh
node main.ts
# writes /output/entry.png
```
