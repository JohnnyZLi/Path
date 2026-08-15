---
name: Fugue implementation work
about: Bounded implementation work coordinated through Fugue
title: ""
labels: "state:ready,agent:ready"
assignees: ""
---

> Coordinator: after GitHub assigns the issue number, replace `work-ISSUE_NUMBER` in the machine block before Worker allocation. Fill every scope/ownership/dependency field intentionally; do not leave critical workflow state only in prose.

## Outcome

What must be observably true when this work is complete?

## Context

Why does this work exist?

## Scope

What should change?

## Ownership

### Owned

Paths/components this issue may change without additional coordination.

### Coordinate Before Modifying

Shared paths that require Coordinator action before editing.

### Do Not Touch

Explicit exclusions.

## Constraints

Architecture, UX, performance, security, compatibility, or implementation constraints.

## Acceptance Criteria

- [ ] Observable completion condition.

## Validation

Expected tests, builds, runtime checks, or visual verification.

## Required QA

Explicit additive QA only. Base policy and actual changed files may require more.

## Dependencies

Issues that must be satisfied before final Integration.

## Authorized Invariant Changes

List any `AGENTS.md` invariant explicitly authorized to change. Otherwise: None.

## Repository Documentation Impact

Describe expected `AGENTS.md` impact, if any.

## Notes

Additional durable context.

<!-- fugue-work
version: 1
work_id: work-ISSUE_NUMBER
spec:
  dependencies: []
  ownership:
    owned: []
    coordinate: []
    forbidden: []
  qa:
    force: []
  authorized_changes:
    agents_invariants: []
execution: {}
-->
