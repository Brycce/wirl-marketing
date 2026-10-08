# Terms of service

Last updated: [[T5: the date you publish this page]]

These terms are an agreement between you and [[T1: legal entity name]] ("wirl", "we", "us") about your use of:

- www.wirl.dev, app.wirl.dev and docs.wirl.dev
- the apps hosted at addresses ending in wirl.run
- the `wirl` command-line tool and the `@wirl/mcp` server, however you got them

Together these are "the service". You accept these terms when you sign in or use the tools. If you use wirl for a company, you confirm that you may accept these terms for it, and "you" includes the company.

Our [privacy policy](https://www.wirl.dev/privacy) says what we collect and how long we keep it.

## 1. The service

wirl hosts internal apps. You, or a coding agent working for you, deploy an app. wirl then:

- runs the app and gives it an address
- decides who may open it
- attaches your keys to the calls the app makes to other services, so the app never holds them

You may install and run the `wirl` command-line tool and the `@wirl/mcp` server to use the service.

## 2. The beta

The service is in beta. There is no uptime commitment and no guaranteed response time. Features change, limits change, and sometimes things break. When a change will affect running apps, we try to announce it first.

The service has limits. The current list is on the Limits page at docs.wirl.dev. We may change limits, and when we do, we update that page.

## 3. Accounts

You sign in with a Google account. You must be at least [[T7: minimum age, suggested 16]]. wirl is a tool for work.

You are responsible for what is done with your account, and with every token you create or approve, including tokens you give to coding agents. Revoke a token as soon as you stop trusting whatever holds it.

## 4. Organisations

Every account belongs to at least one organisation. Apps, connections and members belong to an organisation.

- **Company domains.** If you sign in with a Google Workspace account, wirl puts you in the organisation for your company's verified email domain. The first person from that domain to sign in becomes its owner. Everyone who signs in from the domain after them joins it, as a member, or as an admin if an invitation waiting for them says so.
- **Who controls access.** An organisation's owners and admins add and remove members and change their roles. They also count as an owner of every app in the organisation: they can open, deploy, share, hand over and delete any of them. A person an owner or admin removes does not rejoin by signing in again.
- **Personal organisations.** A Google account without a company domain gets an organisation of its own.
- **What is visible.** A new app in a company-domain organisation starts visible to everyone in that organisation. A new app anywhere else starts private. Only a person, on the app's Access page, can make an app public.

If you believe an organisation for your company's domain is in the wrong hands, write to [[T3: contact email, suggested support@wirl.dev, not yet confirmed]].

## 5. Your apps and your data

What you deploy stays yours: the code, the data your apps store, and the names you give them. You give us permission to store, copy, run and serve your apps, and to process their data, only as needed to provide the service and keep the records described in the privacy policy.

You are responsible for what your apps do. In particular:

- You must have the right to deploy the code, and to use the data your apps handle.
- wirl tells your app who is visiting it: their email address, name, role and IP address. You are responsible for what your app does with that, and for any notice the people using your app need.
- Before you share an app, check who will be able to open it. Anyone who can open an app can also download its deployed code. An app open to anyone with the link can be opened by anyone in the world, and its code can be downloaded by anyone signed in to wirl.
- Follow the Sharing page at docs.wirl.dev about your app's own cookies and scripts.

We may remove or turn off an app that breaks these terms. We will tell you when we do, unless the law stops us.

## 6. Connections and keys

A connection holds a key for you, encrypted, and attaches it to calls your apps make to the hosts you allowed. Apps never receive the key itself. We use your keys only to serve your apps' calls, and to check the signatures on webhooks sent to them.

Add only keys you are allowed to use, and use each one as its issuer allows. You stay responsible for each key. If one is lost or exposed, revoke it with the service that issued it.

## 7. Acceptable use

Do not use wirl to:

- break the law, or host content you have no right to host
- collect passwords, payment details or other credentials by pretending to be someone else
- spread malware
- attack, scan or overload systems you do not own, from an app or otherwise
- reach, or try to reach, another customer's apps, data or keys
- get around the sign-in, the controls on outgoing calls, or the limits the service enforces
- add a key you are not allowed to use, or use a connection in a way its issuer does not allow
- send unsolicited email, including through wirl's invitations
- mine cryptocurrency
- resell or rent out wirl's hosting or computing capacity as such

## 8. Fees

wirl is free today. We charge for nothing and hold no payment details.

[[T11: your wording on future pricing, or delete this line]]

## 9. Ending your use, and what happens to your data

You can stop using the service at any time. Delete your apps, revoke your tokens, and write to [[T3]] to have your account deleted.

We may suspend or end your access if you break these terms, if the law requires it, or if we stop offering the service. Where we can, we will tell you first and give you time to take your apps and data.

When an app is deleted, by you or by us, its address stops answering at once. Its code, database and previews are kept for 30 days, during which it can be restored. Then they are removed for good. The privacy policy lists what is kept after that.

What you can take with you today:

- your apps' deployed code, with `wirl pull`
- your apps' logs from the last 7 days, with `wirl logs`
- your apps' database rows, through your app's own code. No export tool exists yet.

## 10. Warranties, liability and indemnity

[[T12 LAWYER BLOCK: counsel replaces this section. Conventional starting text, not reviewed: "The service is provided as is and as available, without warranties of any kind, to the extent the law allows. We are not liable for indirect, incidental, special or consequential loss, or for loss of data, profits or revenue, arising from the service. Where liability cannot be excluded, our total liability to you is limited to the greater of what you paid us in the twelve months before the claim and one hundred US dollars. Nothing in these terms limits liability that the law does not allow to be limited." Counsel also decides whether you indemnify us for claims about your apps' content and data.]]

## 11. Other services

Your apps call other services through connections, and you may use wirl through a coding agent. Those services and agents have their own terms, which apply to your use of them.

## 12. Changes to these terms

We may update these terms. We will post the new version on this page with its date. If a change is material, we will tell signed-in users before it takes effect. If you keep using the service after that, you accept the new terms.

## 13. Governing law

These terms are governed by the laws of [[T4: governing law and courts]], and disputes go to the courts there.

## 14. Contact

[[T1]], [[T2: postal address]]. [[T3]].
