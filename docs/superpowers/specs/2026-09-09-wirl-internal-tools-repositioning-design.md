# Wirl repositioning: from email automation to governed internal tools

Date: 2026-09-09
Status: approved, ready for implementation planning

## Summary

Wirl stops being an email automation SDK and becomes a place to deploy
internal tools with governance built in. The marketing site is rewritten
end to end to match. The product is partly built, so the site ships as a
pitch with a waitlist rather than as documentation.

## Positioning

**What we sell.** Deployment and hosting for internal apps, where auth,
roles, and audit logging are inherited from the workspace instead of
rebuilt per app.

**The wedge: agent-native.** Coding agents already write internal tools.
Wirl is where those agents deploy them. The agent talks to Wirl over MCP
and provisions the app, its auth, and its role restrictions itself. This
is the differentiator against Railcode, who sell the same category but
address the human builder and treat governance as the closer.

Wirl already ships an MCP server with OAuth at `app.wirl.dev/mcp`. That
existing work is the proof for this claim and should be visible on the
page.

**Argument structure.** Agent-native leads, so the wedge lands before the
reader files us under a category. The sprawl problem follows, so an
engineering lead recognises their own situation. Governance closes, as
the reason it is safe to say yes.

## Claimable capabilities

These four are real today and are the only capabilities the page asserts:

1. Deploy and hosting. Push an internal app, get it live on a URL.
2. Auth on every app. Apps launch behind company-defined login. Nothing
   ships public.
3. Roles and permissions. Central RBAC that apps inherit and check.
4. Audit logs. A record of who accessed what across the workspace.

Anything outside this list does not go on the page. In particular the
site must not claim a managed database, an LLM gateway, managed
connectors, or self-hosting.

## Page structure

Replaces the current landing page section for section.

**Hero.** Working headline: "Ship internal tools your agents build.
Governed by default." Subhead states deployment and governance in one
sentence. Primary action joins the waitlist, secondary scrolls to how it
works. The `npm install wirl` copy button is removed; there is no package
for this product.

Headline alternates for selection:

- "Ship internal tools your agents build. Governed by default."
- "Your agents write the tools. Wirl makes them safe to run."
- "The deploy target for agent-built internal software."

**Agent block.** Reuses the existing dark `CodeBlock` component. Shows
the MCP connect command, then a transcript of an agent provisioning a
tool: create the app, put it behind company auth, restrict to the Finance
role, deploy. Placed high, directly under the hero.

**The sprawl problem.** Short. Internal tools are already being shipped
on personal accounts, behind shared passwords, with no record of who can
see what. Names the pain in prose, no diagram.

**Governance, four cards.** One per claimable capability, written as the
outcome for the reader rather than as a feature name. This is the section
an engineering lead forwards to their security team.

**How it works.** Three steps in the existing numbered layout. Connect
your agent, it builds and deploys, permissions are inherited centrally.

**Waitlist.** Replaces both the pricing section and the closing call to
action.

Pricing is removed entirely rather than kept as a zero-dollar beta card.
A price attached to a waitlist invites the wrong question.

## Waitlist mechanics

A client component posts an address to a new route handler. The handler
notifies bryce@oimo.tech by email through Resend, which is already in the
stack from the email product. No list is stored; this is a notification,
not an audience.

Requirements:

- Requires `RESEND_API_KEY` in the Vercel environment.
- With the key absent or the send failing, the route returns an error and
  the form shows a message. It must never report success for an address
  that was not delivered.
- The address is validated server side.
- Light per-IP rate limiting.
- The address is not written to logs or anywhere else.

## Files

- `src/app/page.tsx` — rewritten to the structure above.
- `src/app/docs/page.tsx` — the 476 lines of email API reference are
  replaced by a short coming-soon that links back to the waitlist. The
  route is kept so existing inbound links do not 404.
- `src/app/layout.tsx` — title, description, and social card copy, which
  currently read "Email Automation for Developers".
- `src/app/opengraph-image.tsx` — tagline.
- New waitlist form component under `src/components`.
- New route handler under `src/app`.
- Footer npm link removed; it points at the email package.

`CopyButton` and `CodeBlock` are kept and reused.

## Visual direction

Unchanged. The current light, restrained treatment with Inter and
JetBrains Mono already reads as developer infrastructure. Redesigning is
a separate decision from changing what is sold, and mixing the two would
make it impossible to tell which change caused a drop in signups.

## Verification

- Production build passes.
- The rendered page is driven in a browser: the waitlist submits, the
  success state appears, and the failure path shows a message rather than
  a false success.
- No live email is sent during verification without explicit approval.
- No occurrence of the old positioning survives. Grep the tree for the
  email vocabulary before calling it done.

## Out of scope

- Redesign of the visual system.
- Any documentation of the new product. Docs return when the product is
  ready.
- Storing waitlist addresses for later export.
- Pricing.
