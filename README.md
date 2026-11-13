# Frontkom Sites plugin

Manifests for the [Frontkom Sites](https://sites.frontkom.io/about) connector, for
Claude and for ChatGPT/Codex. The server itself is hosted at
`https://sites.frontkom.io/mcp` and is not part of this repository.

| File | Read by |
| --- | --- |
| `.claude-plugin/plugin.json`, `.mcp.json` | Claude |
| `plugin.json`, `mcp.json` | ChatGPT / Codex (agent-plugins.org) |

Both point at the same MCP endpoint, which authenticates with OAuth
(dynamic client registration, scope `frontkom:sites`). You need a Frontkom Sites
account with access to a site.

## Install

**Claude** — the plugin directory, or the Frontkom organization library.

**Claude Code**
```
/plugin marketplace add frontkom/frontkom-sites-plugin
/plugin install frontkom-sites@frontkom-sites-plugin
```

## Tools

Find sites and pages, read page content, create a page, describe an edit, open an
authenticated preview, publish, and restore an earlier version as a new draft.
Edits keep version history and never publish on their own.

## Packaging

`node package.mjs` builds the ChatGPT upload zip in `out/` from an explicit
allowlist (manifests and icon only). [`SUBMISSION.md`](SUBMISSION.md) documents
the OpenAI submission and review workflow.
