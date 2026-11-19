---
title: "Training My Apprentice: Teaching Your Tools to Remember Your Mistakes"
date: 2026-05-02
authors: ant
linkedin: https://www.linkedin.com/pulse/training-my-apprentice-teaching-your-tools-remember-mistakes-pegg-kpxsc/
excerpt: "Training My Apprentice: Teaching Your Tools to Remember Your Mistakes"
cover:
  image: ../../../assets/blog/training-my-apprentice-teaching-tools-to-remember/cover.jpg
  alt: "A glowing, translucent apprentice and an older craftsman at a table, three bound reference books laid out between them"
---
## Training My Apprentice: Teaching Your Tools to Remember Your Mistakes

I refactored a skill, benchmarked it, and got a quality tie. 145 vs 144 out of 168. One point of difference on a scale where two evaluator judgment calls swing six points. After a full day of work, twelve implementation tasks, two blown evaluation runs, and enough f-bombs directed at my own tools to constitute a hostile work environment, the measurable quality improvement was zero.

And yet it was the most productive session I've had on this project. Not because of what it produced, but because of what it left behind. I was told a long time ago that Experience is the thing you get right after you needed it. This time, I found a way to make it stick somewhere other than my own head.

### The Refactor

The gm-apprentice plugin has a skill called **session-prep** that helps me prepare for the next TTRPG session. It reads the campaign vault, reviews PC states, scans for stale threads, identifies gaps, and builds a prep note. The prep workflow used to reference a file called **session-planner.md** that mixed two concerns together: **GM frameworks** (the Five-Stage Arc Model, spotlight rotation, the A/B/C plot structure) and step-by-step **workflow instructions**. Frameworks and procedures, in the same file, tangled up.

I split it. The frameworks moved into a pure reference file called **arc-spotlight-reference.md**, owned by the ttrpg-expert skill. The workflow stayed in **session-prep** as a numbered step sequence that cross-routes to the reference when it needs theory. The reference file has no templates, no fill-in sections, no workflow steps. It just explains how to think about arcs and spotlight. The workflow file has no theory. It just says "do step 11, read **arc-spotlight-reference** for guidance."

This is the advisor/doer pattern, and it matters for a reason I'll come back to: it makes both files independently compactable and independently reusable.

### Three Mistakes That Built Two Agents

The benchmark was supposed to be the validation step. Confirm the refactor didn't break anything, ship the PR, move on. Instead, the benchmark process itself failed three different ways, and each failure taught something I couldn't have learned from a successful run.

### Mistake 1: The Model That Wasn't

I tried Opus 4.7 for one day, and it ignored my instructions, hallucinated all over the place, and ate tokens like candy. I had to use Opus 4.6 to go back and fix all of 4.7s screw-ups. The model badness, plus the token usage made me get serious about using the appropriate model for any sub-agent. Claude Code's Agent tool has a model parameter that accepts "sonnet", "opus", or "haiku". I assumed "opus" would give me the model I was running (Opus 4.6). It doesn't. It resolves to the latest Opus, which is 4.7. Different model, different behavior, invalid benchmark.

The first time this happened, I was running a compaction pass. Fortunately I had told Claude to tell me the model it was using for any sub-agent, and I was paying attention to the screen scrolling by:

**Me:** STOP STOP STOP - RESTORE THE PRE\_COMPACTION - YOU ARE USING OPUS 4.7 YOU WERE TOLD EXPLICITLY TO ALWAYS USE CLAUDE-OPUS-4-6!

I restored the files, noted the issue, and moved on. Then, when dispatching the blind evaluator for the benchmark, It did it again - once again, my attentiveness to what my apprentice was doing, saved me:

**Me:** YOU ARE USING OPUS 4.7 AGAIN!!!

Same mistake, same session. The fix is to omit the model parameter entirely so the subagent inherits from the parent session (Opus 4.6). You can only specify model to downgrade ("sonnet" or "haiku"), never to stay where you are.

### Mistake 2: The Wrong Measuring Stick

The design spec defined seven evaluation criteria: completeness, context utilization, touchpoint coverage, spotlight balance, canon grounding, agency compliance, and continuity. The benchmark questions file, written by a subagent during implementation, contained an evaluator prompt with five different criteria: factual accuracy, system specificity, actionability, mechanical grounding, and table-ready fiction.

Claude dispatched the evaluator using the benchmark file's criteria without checking them against the spec. The results came back showing a 6-point regression. I was about to accept the refactor as a quality loss when I realized the criteria didn't match what we'd designed:

**Me:** thats not what we planned out

**Me:** why did you fuck this up?

(I wanted the root cause, so I could fix it from ever happening again)

Three checkpoints should have caught this. The subagent that wrote the evaluator prompt wasn't given the spec's criteria. The spec reviewer wasn't given the spec section to compare against. The evaluator dispatch trusted the benchmark file as the source of truth without cross-referencing the spec. Three separate opportunities to catch a 30-second error, all missed the same way: Claude never went back to the spec. That failure is now Step 1 in the benchmarker agent's process: "**Read the spec's benchmarking section. Read the evaluator prompt in the benchmark questions file. If they don't match, use the spec's criteria.**"

When I re-ran the evaluator with the correct seven criteria, the 6-point regression vanished. The result was a tie (145 vs 144), with the entire apparent gap having been an artifact of measuring the wrong things.

### Mistake 3: Results Lost to the Void

Claude Code compacts conversation context as it approaches the limit. Anything not saved to disk can disappear without warning. During the benchmark, the control agent completed and I had its full output in my conversation context. I was about to dispatch the test agent when:

**Me:** REMEMBER TO SAVE BENCHMARK RESULTS AS YOU GO SO WE DONT LOSE THEM TO COMPACTION: TOKENS USED, TIME TAKEN, TOOLS CALLED

I nearly lost the control agent's complete output because I was waiting to save everything together at the end. In a context-limited environment, "I'll save it later" is "I'll lose it forever." Each result needs to go to disk the moment it arrives.

### Codifying the Lessons

After the third failure, the conversation turned to a question that changed the shape of the session:

**Me:** I am wondering if we should quickly build a benchmarker like we built a compactor, to include the patterns and lessons we've learned about doing the benchmarks right

We'd already built a skill-compactor agent earlier in the session, encoding the compression taxonomy I wrote about in [this blog post](/blog/training-my-apprentice-lessons-in-claude-skills-creation/): routing compresses, priming preserves, concrete examples are sacred. That agent exists at .claude/agents/skill-compactor/ as two files: a dispatch prompt (agent.md) and a knowledge base (knowledge-base.md). The dispatch prompt tells the agent what to do. The knowledge base tells it what we've already learned about doing it well.

The same pattern worked for the benchmarker. Here's what the dispatch prompt's core process looks like:

```
### 1. Verify evaluation criteria

Read the spec's benchmarking section. Read the evaluator

prompt in the benchmark questions file. If they don't match,

**use the spec's criteria.** Build the evaluator prompt from

the spec, not from the benchmark questions file.

### 5. Save results IMMEDIATELY

As each agent completes, **immediately** save to the results

file:

- Tokens (from <total_tokens> in usage)

- Time in seconds (from <duration_ms> / 1000 in usage)

- Tool uses (from <tool_uses> in usage)

- Answer summaries (condense each answer to 2-4 sentences)

**Do not wait for both agents.** Save whichever finishes

first. Context compaction can destroy unsaved results.

### 6. Dispatch evaluator

**Do not specify model parameter.** Omit it to inherit

Opus 4.6 from the parent session. Specifying "opus" will

resolve to 4.7.
```

Every one of those bold directives is a mistake I made, turned into a rule the agent follows. Step 1 exists because of Mistake 2. Step 5 exists because of Mistake 3. The model note in Step 6 exists because of Mistake 1. The agent doesn't know why these rules exist (or need to). It just follows them, and in doing so, it won't repeat the failures that created them.

The knowledge base captures the broader patterns. Here's the anti-patterns section:

```
## Anti-Patterns

- **Trusting the benchmark questions file as source of truth

  for evaluation criteria** — the spec is the source of truth.

- **Specifying model: "opus"** — resolves to 4.7. Omit to

  inherit 4.6.

- **Waiting to save results** — context compaction can destroy

  unsaved agent output at any time.

- **Running evaluator before saving both agents' results** —

  if the evaluator fails or context compacts, you've lost

  the raw data.

- **Single-run benchmarks treated as definitive** — a 6-point

  gap on a 120-point scale is 2 evaluator judgment calls.

- **Scoring all criteria on all questions uniformly** — if a

  criterion doesn't apply to a question, the evaluator gives

  it a 1 ("not present"), which penalizes agents for not

  answering something they weren't asked.
```

That last one came from digging into the results after the second evaluation run. Spotlight balance scored 12/24 across both agents, which looked terrible until I realized the evaluator was scoring it on all eight questions when it only applied to one. On the question where it mattered (Q8, spotlight forecasting), both agents scored 3/3. The other seven questions got 1s because they simply weren't about spotlight balance, and the evaluator dutifully marked the absence as a failure.

### The Structure: Two Files, Reusable Process

Both agents follow the same two-file structure, and I think this pattern is generalizable beyond my specific project.

**agent.md** is the dispatch prompt. It defines the process as numbered steps, with decision points and rules. It reads like a checklist for a procedure that has known failure modes. When you dispatch the agent, it follows these steps. The compactor has a 6-step classify/compress/verify/report flow. The benchmarker has a 9-step setup/run/evaluate/report flow.

**knowledge-base.md** is the institutional memory. It captures patterns, anti-patterns, and the reasoning behind rules. The agent reads it before starting work, the same way you'd read a runbook before touching production. Unlike the dispatch prompt (which is procedural and terse), the knowledge base explains *why*: why certain approaches failed, what the failure looked like, and what the correct approach is.

The compactor's knowledge base encodes the compression taxonomy that took four compaction passes and one painful reversion to develop. The benchmarker's knowledge base encodes every evaluation mistake from this session, including the criteria-to-question mapping issue I only discovered during post-hoc analysis.

Both files are manually maintained. The agent doesn't update its own knowledge base (I considered this and rejected it, because automated pattern-extraction from a single run produces noise, not signal). When a new pattern is genuinely learned, a human adds it. The knowledge base grows slowly and deliberately, not automatically.

### What the Tie Score Actually Means

The benchmark confirmed the refactor was safe to ship. That's its value. It's a quality gate, not a discovery tool. The advisor/doer split didn't make single-pass output better because Sonnet is capable enough to reason about arcs and spotlight from training data alone, even without the reference file explicitly in front of it.

What the refactor actually improved doesn't show up in a single-pass benchmark: cleaner compaction boundaries (you can compress routing in the doer without touching priming in the advisor), cross-skill reuse (ttrpg-expert can reference arc-spotlight for non-prep tasks), and progressive file writes that reduce context waste across a multi-step session. These are architectural gains that compound over sessions, not quality gains visible in a single evaluation.

I spent a day learning this the hard way. The two agents I built that day have saved me from repeating every one of those mistakes in the sessions since. The tie score was the least important number in the entire exercise. The important artifacts were two runnable agents that encode what I learned into a repeatable process, executable knowledge that does the right thing automatically every time it's dispatched.
