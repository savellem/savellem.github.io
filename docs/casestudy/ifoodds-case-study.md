# iFoodDS — Agriculture Compliance App Rebuild

**Role:** UX/UI Designer
**Timeline:** January 2020 – March 2021
**Scope:** Research, multi-role information architecture, tablet redesign, theming system

## Details

**Model** — B2B · Enterprise SaaS, agriculture supply chain compliance
**Role** — UX/UI Designer, research through redesign
**Team** — Reported to the CTO, working closely with the CEO and the app development team
**Scope** — User Research · Multi-role UX · Information Architecture · Tablet Redesign
**Timeline** — 90 days of research, then rebuild across the engagement

## The Numbers

**3,000+** forms covering every step of the supply chain
**30%** of users actually on the app when I started
**70%** increase in adoption after the rebuild
**~60%** less time spent finding forms and documents

## The Problem

iFoodDS tracked food from the farm to the table. Every step of that journey generates a record, a scientist testing a water supply, a field worker logging chemical usage or weather conditions, a processing facility documenting how produce got washed, sorted, and quality checked, a warehouse tracking equipment. All of it feeds trend analysis, contamination tracing, and compliance reporting for national retailers and foodservice distributors buying at the other end of the chain.

The old way was pen and paper. Someone wrote it down in the field, handed it off or mailed it somewhere, and it got processed days or weeks later. The whole value of going digital was collapsing that gap, the moment a number goes into a tablet, it's visible to everyone up the chain who needs it.

The app to do that already existed. Almost nobody was using it. About 70% of users were still on paper, and the 30% who had adopted it were mostly managers and directors, not the people actually doing the work. That's a backwards adoption curve. The people generating the data, the ones the entire system depends on, were the ones avoiding it.

It wasn't hard to see why. The app had a form for every part of the process, which meant 3,000 of them, dumped into what amounted to a wall of link text with no grouping and no hierarchy. It had been built as a desktop app and then put on tablets. There were stock photos of fruits and vegetables scattered through it that had nothing to do with anything. Admins were supposed to configure who saw which forms, but the admin panel was rough even for someone technical, and most of these admins weren't. So the people meant to simplify the app for everyone else couldn't get through it themselves.

## Role and Constraints

I was brought on as a UX/UI designer, reporting to the CTO and working day to day with the app developers, with the CEO close enough to the work to be part of the conversation. The first 90 days were research. I pulled the quantitative usage data, ran qualitative customer surveys, and put the whole picture together into a presentation I gave to the entire iFoodDS team. That mattered more than the design work that followed. Everyone knew adoption was bad. What they didn't have was a shared, specific account of who was dropping off and why, and getting that in front of the whole company in one room is what made the rebuild possible.

The constraints were real. This is a compliance system, so the digital record has to hold up to the same scrutiny the paper did. Nothing could be simplified out of existence just because it was in the way. Users were on tablets, often in the field, often with their hands full. And the people I most needed to reach, the field workers and facility staff, had years of muscle memory in a process that already worked fine for them. Paper wasn't broken from where they stood. Any friction in the app was a reason to go back to it.

## What I Built

The core idea was that nobody should see the whole system. They should see their job.

If a user only had one form to fill out, they logged in and landed on that form. No dashboard, no navigation, no browsing. For a field worker doing one thing on a tablet, the app became a single screen. Power users and admins got the opposite, full navigation and a real directory to work through.

That directory was the other half of the fix. I restructured how forms and documents were organized on the back end and built an actual directory tree, with categories, sections, and visual separators, instead of one undifferentiated list. I reworked search alongside it, so finding a specific form stopped being a scroll-and-scan exercise.

I rebuilt the interface for landscape tablet, which is how people actually held the device, rather than carrying over a desktop layout. I stripped out clutter page by page, including the decorative produce photos, which were taking up space and telling nobody anything.

The last piece was white labeling. What existed was a logo swap in the corner and nothing else, so every customer's instance looked like the same generic product with someone else's mark on it. I built a theming system that let a company carry its own colors through the app, so it read as their tool rather than a vendor's.

## Results

Adoption went up about 70% from that 30% starting point, close to double the number of people actually using the app. The time admins spent hunting through it for forms and documents dropped by about 60%, since most of what they needed was now visible instead of buried.

The adoption number is the one that matters. The app hadn't been failing because people were resistant to going digital. It was failing because it was confusing, and confused people go back to what they know. Foundational UX work, structure, hierarchy, showing someone only what their job requires, is what moved it.

## What I'd Do Differently

I'd have spent real time in the field. All of my research was quantitative data and customer surveys, which told me where people dropped off and roughly what they said about it, but never put me next to someone standing in a processing facility filling out a form on a tablet with gloves on. Watching that happen, and asking questions in the moment, would have surfaced things no survey response was ever going to give me. I fixed what the data could show me. I've always suspected there was another layer underneath it that only fieldwork would have reached.
