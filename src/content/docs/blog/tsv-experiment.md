---
title: "Experiment: Can TSV Replace Markdown Tables in LLM Skill Files?"
date: 2026-11-19
authors: ant
excerpt: "Markdown tables carry formatting overhead that LLMs don't need. Does the model read TSV as accurately, and do the token savings cost quality?"
---

## The Idea

Markdown tables carry formatting overhead that LLMs don't need. Every row has pipe characters at the start, end, and between columns, plus separator rows of dashes. A table row like:

```
| Catfall | 10 | B41 | (Physical, Exotic) Reduce falling damage |
```

becomes, as tab-separated values:

```
Catfall	10	B41	(Physical, Exotic) Reduce falling damage
```

That's ~10 bytes saved per row. Across a GURPS character-building kit with 233 table rows, it adds up. The question: does the model parse TSV as accurately as markdown tables, and do the token savings come at a quality cost?

## Context

This experiment was conducted as part of the [gm-apprentice](https://github.com/AntTheLimey/gm-apprentice) project, a Claude Code skill plugin that serves as a TTRPG GM assistant across four game systems (Call of Cthulhu 7e, GURPS 4e, Blades in the Dark, D&D 5e 2024). The plugin's skill files contain extensive structured reference data in markdown table format: trait costs, skill difficulties, weapon stats, armor DR values, faction details, and spell lists.

The GURPS 4e files were chosen as the test bed because they are the most table-heavy files in the project and had already resisted all prose-based compaction attempts in earlier optimisation passes. To illustrate just how table-dense these files are, here's the breakdown across the 7 chargen kits and 2 core reference files I tested:

| File | Table Rows | Prose Lines | Table % |
|------|:---:|:---:|:---:|
| chargen-kit-thief.md | 233 | 63 | 79% |
| chargen-kit-outdoor.md | 254 | 49 | 84% |
| chargen-kit-combat.md | 221 | 30 | 88% |
| chargen-kit-magic.md | 249 | 31 | 89% |
| chargen-kit-social.md | 225 | 69 | 77% |
| chargen-kit-scholar.md | 187 | 32 | 85% |
| equipment-weapons.md | 149 | — | 90%+ |
| equipment-armor.md | 122 | — | 90%+ |
| traits-mental.md | 147 | — | 85%+ |

These are not files with a few tables sprinkled between prose paragraphs. They are data files that happen to contain brief notes between the tables. Every trait name, point cost, page reference, skill difficulty, weapon stat, and armor DR value lives in a table row. When I tried to compact these files through prose reduction (the technique that worked brilliantly on the framework files, cutting 236K to 114K across 15 files), there was essentially nothing to cut. The tables ARE the content.

## Benchmark Methodology

All benchmarks used blind evaluation:

- **Control agent** (sonnet model): reads the original markdown table files
- **Test agent** (sonnet model): reads the TSV-converted files
- **Blind evaluator** (opus model): scores both answer sets without knowing which is control or test, with A/B assignment randomised

The evaluator scores each answer on five dimensions, 1-3 points each, 15 maximum per question:

| Dimension | 1 (Poor) | 2 (Partial) | 3 (Nailed it) |
|-----------|----------|-------------|----------------|
| Factual accuracy | Wrong stats, hallucinated names | Mostly correct, minor errors | All verifiable facts correct |
| System specificity | Could be any system | Right system but generic | System-specific idiom and conventions |
| Actionability | Needs significant rework | Usable with GM effort | Drop-in ready, use as-is |
| Mechanical grounding | No concrete numbers | Some mechanics but incomplete | Specific stats, DCs, costs, rolls |
| Table-ready fiction | Generic or obvious | Fits system but predictable | Evocative, sparks play |

Metrics recorded per run: quality scores, tokens consumed, wall-clock time, and number of files read by each agent.

## What I Converted

### File Size Impact

9 GURPS files converted from markdown tables to TSV:

| File | Markdown | TSV | Reduction |
|------|:---:|:---:|:---:|
| chargen-kit-thief.md | 22,797 | 19,297 | 15.4% |
| character-generation.md | 17,474 | 16,238 | 7.1% |
| equipment-weapons.md | 15,774 | 11,701 | 25.8% |
| traits-mental.md | 11,586 | 10,044 | 13.3% |
| equipment-armor.md | 10,501 | 7,875 | 25.0% |
| skills-combat.md | 10,201 | 8,616 | 15.5% |
| traits-physical.md | 8,545 | 7,441 | 12.9% |
| combat.md | 8,467 | 7,681 | 9.3% |
| mechanics.md | 5,375 | 4,836 | 10.0% |
| **Total** | **110,720** | **93,729** | **15.3%** |

Equipment files saved the most (25-26%) because they have wide multi-column tables. Procedural files (combat, mechanics) saved less because they have more prose between tables.

## Benchmark Questions

Five questions covering different file types and reasoning patterns:

- **Q1 (Combat):** "My GURPS character has a broadsword (skill 14) and the enemy is 3 yards away in light leather armor. Walk me through one round of combat mechanically." Hits: combat.md, equipment-weapons.md
- **Q2 (Traits):** "What mental disadvantages would fit a paranoid retired intelligence officer? Give me names, costs, and how they affect play." Hits: traits-mental.md
- **Q3 (Equipment):** "I need to equip a medieval knight at TL3. What's the best armor and weapon loadout? Include DR, cost, and weight." Hits: equipment-armor.md, equipment-weapons.md
- **Q4 (Mechanics):** "How does the GURPS attribute system work? Walk me through buying DX 13 and what it affects." Hits: mechanics.md, character-generation.md
- **Q5 (Skills):** "My thief character failed a Lockpicking roll. What happens? How does failure work in GURPS, and what are the options?" Hits: chargen-kit-thief.md, mechanics.md

## Phase 1: Chargen-Only Benchmark (Confounded)

The first benchmark used only character-building questions targeting the thief chargen kit. Two runs.

| | Run 1 | Run 2 |
|---|:-:|:-:|
| **Control quality** | 59/75 | 58/75 |
| **Test quality** | 71/75 | 75/75 |
| **Quality delta** | +12 | +17 |
| Control tokens | 23,892 | 23,907 |
| Test tokens | 31,725 | 31,721 |
| Token delta | +33% | +33% |
| Control files read | 2 | 2 |
| Test files read | 4 | 4 |

The test agent appeared dramatically better. However, the test consistently read 4 files (SKILL.md + thief kit + mechanics.md + character-generation.md) while the control only read 2 (SKILL.md + thief kit). The quality improvement was from the extra research, not from TSV format. These results are NOT valid for a format comparison.

## Phase 2: Full TSV Expanded Benchmark (Clean Comparison)

Switched to the 5 varied questions above, which exercise all 9 converted files. Three runs.

### Run 1

| | Control (markdown) | Test (full TSV) |
|---|:-:|:-:|
| Quality | 72/75 | 67/75 |
| Tokens | 64,864 | 46,779 |
| Time | 62.0s | 77.6s |
| Files read | 10 | 9 |

**Per-question scores:**

| Q | Control | Test | Delta | Evaluator Notes |
|---|:-:|:-:|:-:|---|
| Q1 Combat | 13 | 15 | +2 | Test: better worked damage example; Control: omitted Block defense |
| Q2 Traits | 15 | 13 | -2 | Control: correct Paranoia has no CR; Test: added incorrect Will roll to Paranoia |
| Q3 Equipment | 14 | 14 | 0 | Both had encumbrance errors; B's shield stats wrong ($450/50lb vs correct $90/25lb) |
| Q4 Mechanics | 13 | 15 | +2 | Test: correct skill costs at 1 and 2 pts; Control: error in skill default formula |
| Q5 Skills | 13 | 15 | +2 | Test: correct Forced Entry as DX/E; Control: said "force door ST roll" (wrong attribute) |
| **Total** | **67** | **72** | **+5** | Test won, but Control had unusual errors |

### Run 2

| | Control (markdown) | Test (full TSV) |
|---|:-:|:-:|
| Quality | 68/75 | 67/75 |
| Tokens | 61,497 | 37,463 |
| Time | 75.4s | 78.0s |
| Files read | 9 | 7 |

**Per-question scores:**

| Q | Control | Test | Delta | Evaluator Notes |
|---|:-:|:-:|:-:|---|
| Q1 Combat | 15 | 11 | -4 | Control: complete tactical analysis; Test: hand-waved closing distance |
| Q2 Traits | 14 | 14 | 0 | Tie; both good |
| Q3 Equipment | 14 | 13 | -1 | Control: accurate totals; Test: shield stats wrong |
| Q4 Mechanics | 14 | 14 | 0 | Tie |
| Q5 Skills | 15 | 12 | -3 | Control: extra time rules, cooperation rules; Test: missing both |
| **Total** | **68** | **67** | **-1** | Near-tie |

### Run 3

| | Control (markdown) | Test (full TSV) |
|---|:-:|:-:|
| Quality | 75/75 | 60/75 |
| Tokens | 61,369 | 39,529 |
| Time | 80.8s | 66.9s |
| Files read | 9 | 7 |

**Per-question scores:**

| Q | Control | Test | Delta | Evaluator Notes |
|---|:-:|:-:|:-:|---|
| Q1 Combat | 15 | 10 | -5 | Control: perfect; Test: dodged the closing-distance maneuver question |
| Q2 Traits | 15 | 11 | -4 | Control: correct page refs, no-CR Paranoia; Test: less rigorous |
| Q3 Equipment | 15 | 12 | -3 | Control: all stats verified correct; Test: wrong encumbrance class |
| Q4 Mechanics | 15 | 13 | -2 | Control: correct skill costs; Test: confusing Dodge rounding statement |
| Q5 Skills | 15 | 14 | -1 | Near-tie; both good on Q5 |
| **Total** | **75** | **60** | **-15** | Control scored perfect; Test notably weaker |

### Full TSV Summary

| | Run 1 | Run 2 | Run 3 | Average | Median |
|---|:-:|:-:|:-:|:-:|:-:|
| **Control quality** | 72 | 68 | 75 | 71.7 | 72 |
| **Test quality** | 67 | 67 | 60 | 64.7 | 67 |
| **Quality delta** | -5 | -1 | -15 | -7.0 | -5 |
| Control tokens | 64,864 | 61,497 | 61,369 | 62,577 | 61,497 |
| Test tokens | 46,779 | 37,463 | 39,529 | 41,257 | 39,529 |
| **Token delta** | -27.9% | -39.1% | -35.6% | -34.1% | -35.6% |
| Control files | 10 | 9 | 9 | 9.3 | 9 |
| Test files | 9 | 7 | 7 | 7.7 | 7 |

**Observation:** The TSV test agent consistently read fewer files (7 vs 9). This routing-depth reduction may have contributed to the quality loss. To isolate the format effect from the routing effect, we tested a selective approach.

## Phase 3: Targeted Error Isolation

Before running the selective experiment, I tested whether two specific errors from the full TSV benchmark (a critical hit threshold error in Q1 and a Forced Entry attribute error in Q5) were caused by the TSV format.

Four targeted single-question runs: each error tested in both markdown and TSV formats.

**Result:** Neither error reproduced in either format. Both were agent variance. TSV does not cause systematic parsing failures for GURPS mechanical data.

## Phase 4: Selective TSV Benchmark

Hypothesis: the quality loss comes from TSV on procedural files (combat, mechanics, character-generation) where the model chains values across multiple sections. Simple lookup tables (traits, equipment, skills) should be safe.

**Selective conversion:** 6 lookup files as TSV, 3 procedural files kept as markdown.

### Run 1

| | Control (all markdown) | Test (selective TSV) |
|---|:-:|:-:|
| Quality | 69/75 | 64/75 |
| Tokens | 64,886 | 45,770 |
| Time | 72.5s | 73.7s |
| Files read | 10 | ~10 |

**Per-question scores:**

| Q | Control | Test | Delta | Evaluator Notes |
|---|:-:|:-:|:-:|---|
| Q1 Combat | 15 | 14 | -1 | Both good; Test worked damage example, Control critical thresholds |
| Q2 Traits | 14 | 12 | -2 | Control: correct Paranoia no CR, better package; Test: Flashbacks naming error |
| Q3 Equipment | 13 | 14 | +1 | Test: better tactical notes; Control: wrong encumbrance class |
| Q4 Mechanics | 15 | 11 | -4 | Control: correct skill default formula; Test: skill cost error |
| Q5 Skills | 12 | 13 | +1 | Test: complementary skills; Control: vague on Forced Entry |
| **Total** | **69** | **64** | **-5** | |

### Run 2

| | Control (all markdown) | Test (selective TSV) |
|---|:-:|:-:|
| Quality | 67/75 | 66/75 |
| Tokens | 61,400 | 52,436 |
| Time | 72.6s | 81.3s |
| Files read | 9 | 9 |

**Per-question scores:**

| Q | Control | Test | Delta | Evaluator Notes |
|---|:-:|:-:|:-:|---|
| Q1 Combat | 13 | 13 | 0 | Both had minor issues |
| Q2 Traits | 15 | 13 | -2 | Control: complete package with Sense of Duty; Test: less detailed |
| Q3 Equipment | 13 | 13 | 0 | Both had minor issues |
| Q4 Mechanics | 14 | 13 | -1 | Control: practical sweet-spot note; Test: slightly less detailed |
| Q5 Skills | 12 | 14 | +2 | Test: richer fail-forward options |
| **Total** | **67** | **66** | **-1** | Near-tie |

### Run 3

| | Control (all markdown) | Test (selective TSV) |
|---|:-:|:-:|
| Quality | 69/75 | 64/75 |
| Tokens | 61,487 | 54,228 |
| Time | 73.1s | 91.5s |
| Files read | 9 | 10 |

**Per-question scores:**

| Q | Control | Test | Delta | Evaluator Notes |
|---|:-:|:-:|:-:|---|
| Q1 Combat | 13 | 14 | +1 | Test: critical thresholds, Evaluate mention; Control: slightly less tactical |
| Q2 Traits | 14 | 13 | -1 | Control: Sense of Duty more character-specific than Test's On the Edge |
| Q3 Equipment | 15 | 12 | -3 | Control: correct Heavy Steel stats, skull DR stacking; Test: weight totals confusing |
| Q4 Mechanics | 14 | 13 | -1 | Control: correct Broadsword 4pts = DX+1; Test: said 4pts = DX+0 (wrong) |
| Q5 Skills | 13 | 12 | -1 | Control: extra time rules, Gizmo mention; Test: invented -2 cumulative penalty |
| **Total** | **69** | **64** | **-5** | |

### Selective TSV Summary

| | Run 1 | Run 2 | Run 3 | Average | Median |
|---|:-:|:-:|:-:|:-:|:-:|
| **Control quality** | 69 | 67 | 69 | 68.3 | 69 |
| **Test quality** | 64 | 66 | 64 | 64.7 | 64 |
| **Quality delta** | -5 | -1 | -5 | -3.7 | -5 |
| Control tokens | 64,886 | 61,400 | 61,487 | 62,591 | 61,487 |
| Test tokens | 45,770 | 52,436 | 54,228 | 50,811 | 52,436 |
| **Token delta** | -29% | -15% | -12% | -19% | -15% |
| Control files | 10 | 9 | 9 | 9.3 | 9 |
| Test files | ~10 | 9 | 10 | 9.7 | 10 |

**Key finding:** Selective TSV fixed the routing-depth problem (both sides now read 9-10 files). But the quality delta is identical to full TSV: median -5. The format itself is the cost, not the routing behaviour.

## Consolidated Results

| Approach | Runs | Median Quality Δ | Mean Quality Δ | Median Token Δ | Routing Depth |
|---|:-:|:-:|:-:|:-:|---|
| Full TSV (all 9 files) | 3 | -5 | -7.0 | -36% | Degraded (7 vs 9 files) |
| Selective TSV (6 lookup + 3 markdown) | 3 | -5 | -3.7 | -15% | Normal (both ~9 files) |
| All markdown (baseline) | — | 0 | 0 | 0 | Normal |

## What I Learned

**TSV parsing is accurate.** No systematic column-misalignment errors were detected across any run. Trait names, point costs, DR values, weapon stats, damage formulas were all correctly read from TSV format. The model handles tab-separated data without mechanical parsing failures.

**The quality cost is real but not from parsing.** The median -5 delta persists across both full and selective TSV, even when routing depth is equal. Evaluators consistently find markdown answers more detailed, more complete, and more actionable. The TSV answers are factually similar but thinner: they omit tactical notes, skip worked examples, provide less GM-facing commentary, and occasionally make factual errors the markdown version avoids.

**Markdown tables carry semantic signal, not just formatting.** This is the counterintuitive finding. The pipe characters and separator rows aren't just visual formatting for human readers. They appear to signal to the model that the content is structured reference material worth engaging with deeply. Removing them saves tokens but reduces the model's depth of engagement with the content. The format is part of the content, from the model's perspective.

**The routing-depth effect was real but not the full explanation.** Full TSV caused agents to read fewer files (7 vs 9), which amplified the quality loss. Selective TSV fixed this by keeping procedural files in markdown, but the quality cost persisted at the same level. The routing effect adds to the format effect; it doesn't explain it.

**Token savings don't compensate for this use case.** 15-36% token reduction sounds meaningful in isolation, but the context matters. These files are used to answer questions where getting a point cost, a DR value, or a combat sequence wrong isn't a style issue. It's a wrong answer. The GURPS system has over 300 advantages, hundreds of skills, and a combat system where misquoting a single modifier (like whether Forced Entry uses DX or ST) produces a mechanically incorrect instruction that a GM might act on at the table. A consistent -5 quality points per benchmark, concentrated in the factual accuracy and actionability dimensions, means the model is giving worse answers to questions where precision is the entire point.

The absolute token savings are also modest in practice: ~17K across 9 files, or roughly 4,000-5,000 tokens per query. On files that already resisted prose compaction (because they were 80-90% tables to begin with), TSV was the last remaining format lever, and it turned out to cost more in quality than it saved in tokens.

## Recommendation

Park TSV for LLM skill files. Markdown tables are the right format for data-heavy reference content at the current model generation, despite the token overhead. The formatting characters pay for themselves in model engagement depth.

This finding may not generalise to all contexts. TSV might work for throwaway lookup tables that don't require deep reasoning, or for content where the model doesn't need to chain values across columns. But for structured game-mechanical reference data where precision and completeness matter, keep the pipes.

## Appendix: Raw Data Locations

- Full TSV benchmark: `tests/compaction/benchmark-2026-04-08-tsv-experiment.md`
- Selective TSV benchmark: `tests/compaction/benchmark-2026-04-09-tsv-selective.md`
- Full TSV branch: `experiment/tsv-tables`
- Selective TSV branch: `experiment/tsv-selective`
