# Frontkom Sites public plugin

Source package: this repository. Build the upload with:

```sh
node package.mjs
```

This creates `out/frontkom-sites-1.0.1.zip` from an explicit allowlist.
Never ZIP the repository: environment files and reviewer credentials are private.
The portable package contains one Streamable HTTP MCP endpoint, OAuth DCR
configuration, listing metadata, the product icon, and five positive / three
negative reviewer scenarios. It intentionally contains no app reference, fixed
bearer headers, client secrets, or lifecycle hooks.

## Publisher and portal

- Verified identity selected: **Business — frontkom.com**; directory publisher: Frontkom.
- Draft plugin: `plugin_asdk_app_6ae9d6cfb9708191a8cab9efc06cafba`.
- Portal: https://platform.openai.com/plugins/manage/plugin_asdk_app_6ae9d6cfb9708191a8cab9efc06cafba
- Production MCP: https://sites.frontkom.io/mcp
- Public product/support/privacy/terms: `/about`, `/about/support`,
  `/about/privacy`, `/about/terms` on the production app host.
- Domain verification: set `OPENAI_APPS_CHALLENGE` in production to the exact
  portal token, deploy, then verify. The well-known route returns plain text,
  without caching, or 404 when unset. Never replace another plugin's challenge.

## Reviewer workspace

A dedicated password-login account owns **OpenAI Plugin Review → Plugin Review**.
Only fictitious cycling-club content belongs here. It must never receive real
client memberships or staff access. Private credentials are in the ignored local
`DEMO.md` and `out/reviewer-private.json`; do not commit or include them in
the package. Enter them only in the portal's secure reviewer details form.
No invitation or verification emails were sent during account creation.

The sample homepage has two real immutable versions. The restore case refers to
the original version's UUID in the manifest. The create case uses `/review-ny`;
if it exists from an earlier run, choose another path rather than deleting data.

## Publication precondition

MCP cannot run the browser's axe check. `get_page` returns `editor_url` and the
current version's accessibility report; `edit_page` also returns `editor_url`.
Open that editor and show the preview to run the check. `deploy_page` retains the
same fail-closed accessibility gate as the web editor. Missing/failed reports,
critical/serious violations, and unresolved text contrast block publication.
Do not fabricate a report or remove the gate to make review pass. Restored
versions need their own successful check before subsequent publication.

## Remaining submission steps

1. Upload the latest ZIP to the existing draft after source changes.
2. Verify the deployed public URLs and the domain challenge.
3. Connect OAuth using the dedicated reviewer account, then inspect tool scans.
4. Run the five positive and three negative prompts in ChatGPT with that account.
   Direct protocol verification is supporting evidence, not a substitute for
   verifying model behavior in ChatGPT, especially negative cases.
5. Record the actual workflows with sample data only and supply a reachable video
   URL. Do not present a simulated conversation or invented success as a demo.
6. Complete reviewer details and any automated findings. Confirm policy
   attestations with the publisher before accepting legal agreements.
7. Submit for OpenAI review. Approval and review timing are controlled by OpenAI.
8. Once approved, publish the approved version and verify public directory access.

Current requirements: https://developers.openai.com/plugins/deploy/submission

The sample site uses `plugin-review.sites.frontkom.io` as its renderer key.
Its public origin is `https://sites.frontkom.io/render/plugin-review.sites.frontkom.io`.
MCP deployment requires a configured hostname and returns `render_url`, which
works without custom DNS; `live_url` additionally requires connected DNS.
