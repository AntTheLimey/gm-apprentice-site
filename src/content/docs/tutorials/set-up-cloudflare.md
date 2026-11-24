---
title: Set up Cloudflare
description: Make a free Cloudflare account and an API token, and hand the token to GM-Apprentice, so your apprentice can publish your campaign site.
checkedAgainst: "1.12.143"
---

<!-- video -->

You can set up Cloudflare once, so that your apprentice can publish your
campaign site there whenever you ask. The steps use three terms:

- **Cloudflare Pages** is the free web host that GM-Apprentice suggests for
  a campaign site.
- An **API token** is a password made for one job. This one lets the
  setup publish your sites and nothing else.
- **Workers KV** is the Cloudflare storage that the live features use:
  hit points that update during play, and players' sheet change requests.

## Before You Start

Cloudflare shows a new token only once, on the screen right after you
create it. Have somewhere to paste it before you start step 9 of
[Creating the API Token](#creating-the-api-token). If you lose it, delete
the token in Cloudflare and make a new one.

## Creating a Cloudflare Account

A free account is all a campaign site needs:

1.  Open [Cloudflare's sign-up page](https://dash.cloudflare.com/sign-up)
    and follow its steps to create an account on the free plan.

## Creating the API Token

The token gives the setup only the permissions that publishing needs. If
it ever leaked, it could not touch your billing or anything else in your
account.

1.  Open [Cloudflare's API tokens page](https://dash.cloudflare.com/profile/api-tokens).

    The **API tokens** page opens:

    ![The API tokens page, with the Create token button at the top right](/img/tutorials/cloudflare-tokens.jpg)

2.  Click **Create token**.

3.  In **Token name**, type a name such as `gm-apprentice-publish`.

4.  Under **Policies**, click **Start from scratch**, then click **Start
    with an Account policy**:

    ![The Create token page, with the token name filled in and the Start from scratch menu open](/img/tutorials/cloudflare-start.jpg)

    The policy opens with **Include** and **All accounts** selected. If
    you have more than one Cloudflare account, choose the one for your
    campaign sites.

5.  In the permission search box, type `Cloudflare Pages`, then tick
    **Edit** on the **Cloudflare Pages** row:

    ![The Cloudflare Pages permission with Edit ticked](/img/tutorials/cloudflare-pages-edit.jpg)

6.  If you want the live features, type `Workers KV` in the search box,
    then tick **Edit** on the **Workers KV Storage** row. Adding it now
    saves you from making a second token later:

    ![The Workers KV Storage permission with Edit ticked](/img/tutorials/cloudflare-kv-edit.jpg)

7.  Leave **Token expiration** at **No expiration**, then click **Continue
    to summary**:

    ![Token expiration set to No expiration, and the Continue to summary button](/img/tutorials/cloudflare-continue.jpg)

    If you choose an expiry date instead, publishing stops on that date
    until you make a new token.

8.  Check that the summary lists **Cloudflare Pages: Edit**, and
    **Workers KV Storage: Edit** if you added it, then click **Create
    Token**:

    ![The Token Summary, listing Cloudflare Pages: Edit and Workers KV Storage: Edit](/img/tutorials/cloudflare-summary.jpg)

9.  Copy the token that Cloudflare shows.

    Cloudflare does not show this token again after you leave the page.

## Handing the Token to GM-Apprentice

The setup saves the token where every terminal can find it, and looks up
your Cloudflare account ID itself. It never prints the token back. Choose
one of these two ways:

- **Through your apprentice.** Tell your apprentice that you have a
  Cloudflare token for publishing, and paste the token when it asks. The
  token passes through your AI agent, like anything else you type to it.
- **In your own terminal.** Ask your apprentice for the command to save a
  Cloudflare token in your own terminal. It gives you one line to run.
  The line waits for you to paste the token, keeps it hidden, and clears
  it afterward. The token never passes through your AI agent.

Either way, the setup ends by saying where it saved the token and which
Cloudflare account the token belongs to.

To check the result, ask your apprentice to check your computer for
publishing to Cloudflare. The **wrangler** row, for Cloudflare's own
tool, shows as authenticated with your account ID.

## Next Steps

Your computer can now publish to Cloudflare:

- [Publish your site](/tutorials/publish-your-site/) builds your campaign
  site and puts it online.
- [Players at the table](/tutorials/players-at-the-table/) uses the live
  features that the Workers KV permission allows.
