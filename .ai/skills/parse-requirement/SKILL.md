---
name: parse-requirement
description: Normalizes a feature requirement into actors, inputs, and business rules ready for test technique application.
---

# Parse Requirement

## Purpose
Turn one feature requirement into a normalized statement of what to test — actors, input variables, and rules — the raw material the technique step needs.

## When to run
Run as the first step of the craft-test-cases pipeline, before any techniques are applied, on a single feature requirement.

## Procedure
1. Extract and list the actor(s), their goal, the preconditions (starting state, authentication), and each explicit expected outcome.
2. List every input variable the requirement mentions (fields, amounts, codes, states). For each, record its type and the meaningful values or ranges the requirement distinguishes.
3. List every business rule as a `condition → outcome` pair, including error and edge outcomes.
4. Mark anything the requirement leaves unspecified as an open question; do not invent behavior.
5. Output three labeled lists — Actors & flow, Input variables (with ranges), Rules (condition → outcome) — plus any open questions. Do not derive test cases yet.

