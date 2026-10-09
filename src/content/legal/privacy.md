# Privacy policy

Last updated: 9 October 2026

## Who we are

Oimo Technologies Inc. ("wirl", "we", "us"), of 3542 Blanshard St #206, Victoria, BC V8X 2W8, Canada, runs wirl:

- the website at www.wirl.dev
- the dashboard, API and hosted MCP server at app.wirl.dev
- the documentation at docs.wirl.dev
- the apps people deploy, at addresses ending in wirl.run
- the `wirl` command-line tool and the `@wirl/mcp` server

This policy says what we collect, why, who handles it for us, how long we keep it, and how to ask us to delete it. To ask anything about it, write to bryce@oimo.tech.

For your account and our own records, we decide what is kept and why. The apps you deploy, and the data in them, belong to you or your company. We store and run them on your instructions.

## What we collect

### Your account

You sign in with Google. We ask Google for the `openid`, `email` and `profile` permissions. We do not ask for your mail, calendar, contacts or files.

- **What we keep from Google:** your email address, your name, and Google's identifier for your account. Google may also send a profile picture link and a language. We do not keep them. We use Google's access token once, to read these details, and do not store it.
- **Unverified addresses:** if Google says your email address is not verified, we refuse the sign-in.
- **Your company domain:** if you sign in with a Google Workspace account, Google tells us the company domain it has verified. We use it to put you in your company's organisation on wirl, and we store it on that organisation and on the activity record's entry for each sign-in.
- **Your own organisation:** if you sign in without a company domain, your organisation is named after you, and its address is made from the part of your email address before the @. That address starts the address of each of your apps there, so anyone with an app's link sees it.
- **Your job, if you tell us:** we ask once what you do (for example engineering or finance). Answering is optional. Your colleagues and your organisation's admins cannot see your answer, and it is never sent to an app. We look only at totals.

### Organisations

We record which organisations you belong to and your role in each. In an organisation for a company domain, we also record anyone who left it or was removed from it, who removed them and when, so that they are not added back automatically at their next sign-in.

### Signing in from a terminal or a coding agent

- `wirl login`, and a coding agent using `@wirl/mcp`, sign in with a link and a code that you approve in your browser. The token this creates is named after your computer: "wirl cli on", or "Claude Code on" for `@wirl/mcp` whatever agent runs it, followed by the computer's name.
- The tools save the token on your computer, in `~/.config/wirl/credentials.json`, in a file created so that only your user account can read it.
- We store only a hash of each token. Beside it we keep its first few characters, its name, its scope, when it was made, when it was last used, and whether it was revoked. A token does not expire. It works until you revoke it.
- When you connect an agent through app.wirl.dev/mcp, we store the name and return addresses the agent registers with, a hash of each sign-in code, and a token as above.
- The `wirl` tool and `@wirl/mcp` talk only to app.wirl.dev. They contain no analytics and no crash reporting. `wirl dev` also makes your app's outgoing calls from your computer, with keys you keep on your computer.
- When you deploy, the tool uploads your app's folder. It never uploads `.env` files, the `.git`, `node_modules` or `.ssh` folders, `.npmrc` or similar files, though your server's bundle includes the code it imports from its packages.

### Your apps

For each app, we store:

- the code you deploy, and earlier versions of it
- the app's own database, and each preview's own database
- a record of each migration file applied to its database: the file's name and hash, who applied it and when, and an identifier for the restore point taken before it
- the text of a migration file that is waiting for a person to approve it (at most five per app)
- its schedules, and the outcome of each schedule run with up to 1 KB of what the app answered
- its flow runs: each run's input (up to 64 KiB), its state, its steps and events, and its output (up to 64 KiB)
- what the app prints to its log

### Keys you add (connections)

- You type a key into your browser on the app's keys page, or send it from the command line with a full-scope sign-in.
- We encrypt it with AES-256-GCM, under a key that belongs to your organisation. That key is itself encrypted with a master key kept outside our database.
- We decrypt keys only inside wirl's own server, while it handles an outgoing call from an app they are granted to, and we attach a key only to a call to a host its connection allows. A webhook signing secret is decrypted only to check the signature on a request sent to your app.
- After you enter a key, no app, agent or person is shown it again. Listings say only whether a key is set.

### The activity record

We record actions taken in wirl, each with who did it and when. Among them:

- deploys, rollbacks, migrations, deletions and restores of apps
- shares, and changes to who can open an app
- connections added, granted, revoked, rotated or deleted
- members added, removed or given another role
- tokens issued or revoked, and sign-ins
- previews put up, deleted or expired
- flow runs started, cancelled or failed
- **opening an app:** who opened which app, or tried and was turned away, and when. A page left open is recorded once a day.
- **outgoing calls:** when an app calls another service through wirl, we record the connection, the method, the host, the status, whether wirl let the call through, which version of the app made it, and which visitor it was for. For a call made by a flow step, we also record the path, without its query string. We never record the body or headers of a call, or the key. If a service takes its key in the path itself, as a webhook address does, that path is recorded.

The activity record does not include your IP address or your browser. Admins of an organisation can read its record.

### What apps are told about the people who open them

- **On every request**, wirl tells the app the visitor's wirl id, email address, name and role, and the visitor's IP address, alongside what the visitor's browser itself sends, such as its user agent. Someone who opens a preview's visit link is signed in to that preview as the person who made the link, and the app is told that person's details. An app can store what it is told. What it then does with that is up to the people who built it and their company. For a visitor who is not signed in to a public app, the identity is sent empty.
- **The app's log.** People who can deploy an app can read its log for the last 7 days. For each request it shows when it came, the method, the path, who made it, the status, and the version that answered. They can also read the app's outgoing calls for the last 7 days: when, the method, the host, the connection and the status, and for a flow step its run and path.
- **Cloudflare's record of each request** to an app is kept for 7 days. It includes the full address requested, with its query string, and the request's headers, which carry the visitor's identity and IP address. wirl's operators can read it.
- **Organisation admins** can read the organisation's whole activity record, including who opened which app and each app's outgoing calls.
- **Colleagues** in your organisation see your name and email address on things you do there, such as apps you own and shares you make.
- **An app's code.** Anyone who can open an app can download the code deployed for it. For an app open to anyone with the link, that means anyone signed in to wirl.

### Email

wirl sends these emails automatically, and no others:

- an invitation, to an address with no wirl account that someone gave access to an app or invited to an organisation
- a notice to an app's owner that wirl put an earlier version back
- an alert to an app's owner that the app has been failing
- a notice to an app's owner that a flow run failed
- a notice to an app's owner that the app's flow runs are paused for the rest of the day
- a note to our founder when someone joins the waitlist on www.wirl.dev, with the address they gave

The messages are plain text. Resend delivers them. Messages to an app's owner go only to an owner who is still a member of the app's organisation.

When someone invites an email address that has no wirl account, we store that address, the role, and who invited them. We limit the invitation emails one address receives to 5 a day.

### Request logs and our own log lines

- The service that hosts app.wirl.dev logs each request to it, with the client's IP address, the path and the browser's user agent.
- Our own software writes log lines there too. A line can contain an email address, for example when an email could not be sent.
- The part of wirl that guards every app (the gate) writes a few lines of its own. It does not log each request, and it is set to remove query strings from what it logs.

### Our own counts

wirl's operators can see weekly totals: new people, new organisations, apps created, deploys, previews, and how many people chose each job. The totals show no names and no email addresses. The activity record also notes when someone clicks the "Built with wirl" badge on an app, and when someone views the start page.

### www.wirl.dev and docs.wirl.dev

- www.wirl.dev sets no cookies and runs no analytics.
- It remembers whether you chose the light or dark theme, in your browser's local storage, under the name `wirl-theme`. That never leaves your browser.
- It loads its fonts from Google Fonts. To fetch them, your browser sends Google your IP address, the site's address and your browser's headers. Google says it sets no cookies for this and does not use it to build profiles or for advertising.
- **The waitlist.** If you join the waitlist, www.wirl.dev does not keep your address in a database. It sends one email, through Resend, to wirl's founder, with your address in it and as the reply-to, together with the address of the page you joined from. You receive no email. Your address then sits in that mailbox, which only wirl's founder reads, and in Resend's record of the email it delivered. To be removed, write to bryce@oimo.tech from the address you gave, and we delete the email.
- docs.wirl.dev sets no cookies. Its only script adds "Copy" buttons to code samples, and it loads nothing from other sites.

### Cookies on app.wirl.dev and on apps

wirl sets these cookies. None of them is for advertising or analytics.

| Cookie | Set on | What it does | How long |
|---|---|---|---|
| `__Host-wirl_session` | app.wirl.dev | Keeps you signed in | 14 days |
| `wirl_oauth_state` | app.wirl.dev | Ties a Google sign-in to the browser that started it | 10 minutes, removed when the sign-in finishes |
| `__Host-wirl_grant` | each app's address | Shows that you may open that app | 12 minutes, or 24 minutes when it can be renewed. A visit renews for at most 14 days after the sign-in that began it |
| `__Host-wirl_handshake` | each app's address | Holds a sign-in that is under way | 10 minutes |
| `__Host-wirl_badge` | each app's address | Remembers that you hid the wirl badge | Until you close the browser |

These cookies are sent only over HTTPS. An app you open may set cookies of its own. Those belong to the people who built the app.

## Why we use it

- **To run the service:** to sign you in, put you in the right organisation, decide who may open each app, run apps, attach keys to their calls, and send the emails above.
- **To keep the service safe and to answer "what happened?":** the activity record and the request logs.
- **To understand how wirl is used:** the weekly totals and the job answer.

We do not sell your data, and we do not use it for advertising. We use your apps' data and your keys only to run your apps.

People at wirl can reach the data your apps store, because we run the systems that hold it. We look at it only to run or repair the service, when you ask us to, or when the law requires it.

## Legal bases

Where the law asks for one, we rely on:

- our agreement with you, to provide the service
- our legitimate interest in keeping the service secure and in understanding how it is used
- your consent, for the optional job question
- legal obligations, where the law requires us to keep or disclose something

Wherever you live, you can ask to see, correct or delete what we hold about you, by writing to bryce@oimo.tech. If you are in Canada, you can also complain to the Office of the Information and Privacy Commissioner for British Columbia; in the EU or UK, to your local data protection authority.

## Who handles data for us

| Provider | What it does for wirl | Where |
|---|---|---|
| Google | Signs you in. Serves the fonts on www.wirl.dev | Google's network |
| Cloudflare | Runs every app, the gate and flows, and carries all traffic to wirl.run. Stores each app's code, database, previews, flow runs and logs | Cloudflare's worldwide network. Cloudflare chooses where to place each app's database; wirl sets no location |
| Railway | Hosts app.wirl.dev: the dashboard, the API and the hosted MCP server. Apps' outgoing calls pass through it, so it can attach keys | United States (US West, California) |
| Neon | Hosts wirl's own database: accounts, organisations, the activity record, encrypted keys, run records | United States (AWS us-west-2, Oregon) |
| Resend | Sends wirl's email, including the note to our founder when someone joins the waitlist | United States, according to Resend |
| Vercel | Hosts www.wirl.dev and docs.wirl.dev | Vercel's network |

Apart from what this page describes (what apps and the people who build them are told, what colleagues and admins see, what an invitation says, and the keys your apps send to the services they call), we share data only with these providers, and when the law requires it.

If you connect a coding agent to wirl, what wirl's tools return to it goes to that agent and to the company that provides it, under your own agreement with them. That includes your apps' code, logs and run records.

Our providers store data in the United States. By using wirl you accept that your data is handled there.

## How long we keep it

A cleanup job runs every six hours. So "after 30 days" means within about six hours after the 30 days end.

| What | How long |
|---|---|
| Your account: email address, name, Google id, job answer | Until you ask us to delete it. Nothing deletes an account automatically |
| Your membership of an organisation | Until you leave or are removed. In a company-domain organisation, the record that you left or were removed stays until an owner or admin adds you back |
| An organisation | Nothing deletes an organisation automatically |
| A deleted app | Its address stops answering at once, its schedules stop, and its unfinished runs are cancelled. Its code, database, previews and address are kept for 30 days, so it can be restored, then removed for good |
| What stays after a deleted app is removed | Its name, which stays taken, its settings and its connection grants; its list of versions, with who deployed each and when; its migration records, who approved each file that needed approval, and the text of any migration file that was waiting for approval; its schedules and their run records; its shares, and open invitations to it with the addresses invited |
| Older versions of a live app | The newest 10 keep their code. Older versions lose their code and keep their version number and history |
| A preview | 14 days after it was last deployed, together with its own database |
| An app's database | As long as the app exists. Cloudflare also keeps 30 days of its history, so that, with the app owner's agreement, we can put it back to an earlier moment |
| The activity record, including opens and outgoing calls | 365 days |
| A flow run's record, with its steps and events | 30 days after it ends |
| A flow run's input | Removed when the run finishes or is cancelled. Kept 3 days if the run failed, so it can be retried. Cloudflare keeps a finished run 1 day and a failed one 3 days |
| An app's daily count of flow steps | 60 days |
| Schedule run records | Nothing removes them automatically today. They go when the schedule is removed from the app |
| What an app prints (its log), and Cloudflare's record of each request to an app | 7 days |
| The gate's own lines | 7 days |
| Request logs and our own log lines at app.wirl.dev | Up to 30 days |
| Request logs at www.wirl.dev and docs.wirl.dev, and Resend's record of each email it delivers | As long as Vercel and Resend keep them |
| A deleted connection | It stops working at once. Its encrypted key stays in our database. Nothing erases it today |
| A revoked token | The hash stays, marked revoked |
| An invitation | An open one waits until it is accepted or withdrawn, and a withdrawn one is deleted. An accepted one is kept, marked accepted, with the address, the role, who sent it and who accepted it. Nothing removes it today |
| A sign-in code for `wirl login` or `@wirl/mcp` | Removed a day or more after it expires |
| An agent's registration and sign-in codes through app.wirl.dev/mcp | Kept, the codes as hashes. Nothing removes them today |
| A note that you signed out | Until the session would have ended anyway |
| The waitlist | Until the beta opens to you, or you ask us to remove it |

Data we remove can stay for a while in our providers' backups before they overwrite it.

## Deleting, and your other choices

You can do these yourself:

- **Delete an app.** Use `wirl delete <app>`, the Delete button on the app's Settings page, or ask your coding agent. The app's owner can do this while still a member of its organisation, and so can the organisation's owners and admins. From the command line or an agent, this needs a full-scope sign-in. For 30 days, `wirl apps restore <app>` or the Recently deleted list on the organisation's tools page brings it back. An app that was public comes back only from that list.
- Delete a preview.
- Revoke any of your tokens, on the Connect an agent page at app.wirl.dev/settings/tokens.
- Delete a connection you made, or any connection if you are an admin of the organisation.
- Change who can open an app, or stop sharing it.
- Leave an organisation.
- Hand an app to someone else.
- Download an app's code with `wirl pull`, and read its log with `wirl logs`.

Write to us at bryce@oimo.tech, from the address you sign in with, to:

- **Delete your account.** There is no button for this yet, so we do it by hand. Before you ask, delete or hand over the apps you own. We delete your email address, name, Google id and job answer, your tokens, your memberships and the invitations sent to your address, and we rename your personal organisation. Its address, made from the part of your email address before the @, stays taken, as every organisation's and app's address does. Records that refer to your account only by an internal id, such as which versions you deployed and entries in the activity record, are kept for the times above; the entries for sign-ins from a terminal or an agent also keep the computer's name. What apps stored about you is in their own databases: ask the people who run them.
- **Get a copy of what we hold about you.**

No tool exports an app's database yet. The app's own code can read its rows and return them.

## Security

Your session and app-access cookies are sent only over HTTPS. Keys are encrypted with AES-256-GCM under a master key kept outside our database. Tokens are stored only as hashes. The same rules decide every access, in the dashboard and at each app's address. A token can be limited to deploying: such a token cannot share an app, change who can open it, or touch keys. Apps live on a separate domain, wirl.run, from the dashboard on wirl.dev. One limit, said plainly: wirl.run is not yet on the Public Suffix List, so until it is, browsers treat all apps on wirl.run as one site. The Sharing page at docs.wirl.dev tells people who build apps what that means for them.

## Children

wirl is a tool for work. It is not meant for anyone under 16. If you believe someone under that age has an account, write to us and we will delete it.

## Changes to this policy

We will post changes on this page with a new date. If a change is material, we will tell signed-in users before it takes effect.

## Contact

Oimo Technologies Inc., 3542 Blanshard St #206, Victoria, BC V8X 2W8, Canada. bryce@oimo.tech.
