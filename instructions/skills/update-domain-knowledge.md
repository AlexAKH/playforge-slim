# Update Domain Knowledge
 
## Purpose
Keep the business-domain layer current with the terminology, actors, and rules a newly specified feature introduces, so later work resolves terms from the repository instead of inferring them.
 
## When to run
Run as the first step of the update-project-docs pipeline, on one saved test-case file, after that file exists and before the feature doc is written.
 
## Procedure
1. Read the crafted test-case file named in the request. List every domain term, actor, threshold, state, and user-visible message it relies on.
2. Resolve the domain file. Use `docs/domain/<area>.md` when the request names a domain area. Otherwise list the existing files in `docs/domain/` and use the one whose `Actors` or `Terms` the requirement already draws on; create a new `docs/domain/<area>.md` only when no existing file covers the requirement's area, using the section layout `Actors`, `Terms`, `Rules`, `Open questions`. Never open a second domain file for a feature an existing one already covers.
3. For each listed item, check whether the domain file already defines it. Add only the missing ones; never restate or reword a definition that is already there.
4. Write each new term as one sentence naming what it is and the value or range that makes it true. Write each new actor as its role plus what it is allowed to do. Write each new rule as `condition → outcome`.
5. Never invent a definition the crafted file does not support. Record anything the file leaves ambiguous under `Open questions` instead of resolving it.
6. Report the file path, every term, actor, and rule added, and every open question recorded.