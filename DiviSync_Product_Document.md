# DiviSync — Product Document

## 1. What DiviSync Is

DiviSync is a shared-expense app for people who regularly spend money together.

It is designed for friends, roommates, couples, families, travel groups, clubs, and small communities that want a simple way to keep track of shared costs without relying on spreadsheets, chat messages, screenshots, or memory.

The basic idea is simple:

> Add the expense, choose who was involved, and DiviSync keeps everyone’s balances in sync.

Instead of asking, “Who owes whom?” after every dinner, trip, bill, or group purchase, everyone can open the app and see the current situation clearly.

---

## 2. Product Vision

DiviSync should become the shared financial memory of a group.

Whenever several people spend money together, the app should make it easy to understand:

- what was paid;
- who paid;
- who shared the cost;
- how the amount was divided;
- who currently owes money;
- who should receive money;
- what caused each balance;
- and how the group can settle everything fairly.

The product should feel simple enough for a casual dinner with friends, but reliable enough for roommates or families who may use it for years.

The long-term vision is to make DiviSync the default place people use when money is shared informally between people they know and trust.

---

## 3. The Problem DiviSync Solves

Shared expenses become messy very quickly.

Imagine five friends travelling together:

- one person pays for the hotel;
- another pays for dinner;
- three people take a taxi while two do not;
- someone buys groceries for everyone;
- one person pays another back directly;
- a booking gets refunded later.

Within a few days, people start asking:

- “How much do I owe you?”
- “Was I included in that bill?”
- “Didn’t I already pay you?”
- “Who paid for the Airbnb?”
- “Why do I owe this much?”
- “Can we just calculate everything at the end?”

The usual alternatives are inconvenient.

**Chat messages** get buried.

**Spreadsheets** require manual work and someone has to maintain them.

**Bank transfers** show that money moved, but often not why.

**Notes and screenshots** provide fragments of information rather than one clear picture.

DiviSync gives the group a shared, transparent source of truth.

---

## 4. Product Promise

The core promise of DiviSync is:

> **Track shared spending without doing the accounting yourself.**

For every expense, DiviSync should answer three simple questions.

### What happened?

Taylor paid $120 for dinner.

### Who was part of it?

Taylor, Parker, Delores, and Scotty shared the dinner.

### What does that mean now?

Parker owes Taylor $30.

Every balance should be understandable, not just displayed as a number.

---

## 5. Who DiviSync Is For

### Friends

For meals, outings, events, subscriptions, shared purchases, and everyday social spending.

### Travelers

For accommodation, food, transport, tickets, activities, fuel, and all the small shared costs that add up during a trip.

### Roommates

For rent, electricity, internet, groceries, cleaning supplies, household items, and recurring bills.

### Couples and Families

For household spending, travel, groceries, utilities, childcare, and other shared costs.

### Clubs and Small Communities

For student organizations, sports teams, volunteer groups, gaming communities, and informal groups that need lightweight expense coordination without full accounting software.

---

## 6. The Core DiviSync Experience

The product revolves around five connected ideas:

**People → Groups → Expenses → Balances → Settlements**

People join or create groups.

Members add shared expenses.

DiviSync keeps track of each person’s share.

Balances update automatically.

When people are ready, they settle what they owe.

The process then continues as new expenses are added.

---

# 7. Main Areas of the Product

## Home

The Home screen gives users a quick overview of their financial position across DiviSync.

A user should be able to immediately see:

- how much they owe overall;
- how much others owe them;
- their most important open balances;
- recent expenses;
- recent settlements;
- active groups.

The purpose of Home is to answer:

> “Where do I stand right now?”

---

## Friends

The Friends section shows the user’s direct financial relationships with other people.

Example:

> Parker owes you $42.50.

Opening Parker’s profile can show:

- total balance;
- shared groups;
- direct expenses;
- settlement history;
- recent activity.

This gives users a person-level view instead of requiring them to check every group separately.

---

## Groups

Groups organize expenses around a shared context.

Examples:

- Bali Trip
- Apartment 4B
- Gamer Bros
- Mike’s Birthday
- Family Expenses
- University Club

A group contains its members, shared expenses, balances, settlements, and activity.

---

## Expenses

The Expenses area provides a broader history of spending.

Users can review expenses across groups and find older transactions when they need them.

---

## Activity

Activity shows important actions in chronological order.

Examples:

- Taylor added “Dinner — $120.”
- Parker edited “Airbnb.”
- Scotty paid Taylor $80.
- Delores joined Bali Trip.
- Taylor deleted “Taxi.”

This helps create trust because members can see what changed.

---

# 8. Groups

Groups are the main shared workspace inside DiviSync.

A group may represent a trip, household, event, friend circle, or any other shared financial context.

A group includes:

- a name;
- members;
- expenses;
- balances;
- settlements;
- activity history;
- an optional description;
- an optional category or purpose.

Example:

## Bali Trip

Members:

- Taylor
- Parker
- Scotty
- Delores
- Rosendo

All financial activity related to the trip stays in one place.

---

# 9. Creating a Group

A user selects **New Group** and provides a few basic details.

For example:

- Group name: Bali Trip
- Type: Travel
- Currency: USD
- Members: Parker, Delores, Scotty

Once the group is created, members can begin adding expenses.

The experience should be quick enough that creating a group feels easier than starting a spreadsheet.

---

# 10. Group Dashboard

Opening a group should give members a complete picture of that group’s finances.

The dashboard can include:

### Group Overview

- group name;
- description;
- members;
- group image or icon;
- group type.

### Current Balances

Examples:

- Taylor gets $380.50
- Parker owes $188.25
- Delores owes $20.00

### Primary Actions

- Add Expense
- Settle Up

### Group Views

- Balances
- Statistics
- Members

### Expense History

A chronological list of expenses and settlements.

---

# 11. Adding an Expense

Adding an expense is the most important action in DiviSync.

It should take only a few seconds for common situations.

A user selects **New Expense** and enters:

- description;
- amount;
- who paid;
- who participated;
- how the cost should be split;
- date;
- optional category;
- optional notes.

Example:

> Dinner  
> $120  
> Paid by Taylor  
> Shared by Taylor, Parker, Scotty, and Delores

If the cost is divided equally, DiviSync shows:

> $30 per person.

The group’s balances update immediately.

---

# 12. Ways to Split an Expense

Real expenses are not always divided equally, so DiviSync should support different ways of splitting costs.

## Equal Split

Everyone pays the same amount.

Example:

$100 split between four people becomes $25 each.

---

## Exact Amounts

The user specifies exactly how much each person should pay.

Example:

- Taylor: $20
- Parker: $25
- Scotty: $30
- Delores: $45

---

## Percentage Split

The expense is divided using percentages.

Example:

- Taylor: 50%
- Parker: 25%
- Scotty: 25%

---

## Share-Based Split

Members receive different numbers of shares.

Example:

- Taylor: 2 shares
- Parker: 1 share
- Scotty: 1 share

A $100 expense becomes:

- Taylor: $50
- Parker: $25
- Scotty: $25

---

## Selected Participants

Not every member of a group needs to be included in every expense.

If six friends are travelling together but only three take a taxi, only those three should share the taxi cost.

---

# 13. Expense Details

Opening an expense should make it easy to understand exactly what happened.

Users can see:

- description;
- total amount;
- payer;
- participants;
- each person’s share;
- date;
- category;
- notes;
- who added the expense;
- whether it was edited later.

Example:

## Airbnb

**Total:** $600  
**Paid by:** Taylor

Participants:

- Taylor — $120
- Parker — $120
- Scotty — $120
- Delores — $120
- Rosendo — $120

This level of transparency is important because users should always be able to understand where their balance came from.

---

# 14. Editing and Deleting Expenses

Mistakes are normal.

Users should be able to correct an expense if the amount, payer, participants, date, split, or description is wrong.

When an expense is edited, balances should reflect the updated information.

Users should also be able to delete accidental or duplicate expenses.

Important edits and deletions should appear in the group’s activity history so other members are not surprised by balance changes.

---

# 15. Balances

Balances are one of the most important parts of DiviSync.

They answer:

> “Who currently owes whom?”

Examples:

- Taylor gets $380.50
- Parker owes $188.25
- Scotty owes $172.25

The user should not have to manually calculate any of these amounts.

---

# 16. Explaining a Balance

DiviSync should go beyond showing a balance.

Users should be able to understand why that balance exists.

Example:

## Parker owes Taylor $80

Because:

- Dinner: $30
- Taxi: $10
- Hotel: $60
- Previous payment to Taylor: -$20

**Remaining balance: $80**

This creates confidence in the numbers and reduces disagreements.

---

# 17. Settling Up

When one member pays another, the payment can be recorded through **Settle Up**.

Example:

Parker sees:

> You owe Taylor $80.

Parker selects **Settle Up** and records:

> Parker paid Taylor $80.

The payment is added to the group history and the balance becomes settled.

---

# 18. Partial Settlements

Users should not have to pay an entire balance at once.

Example:

Parker owes Taylor $100.

Parker pays $40.

DiviSync records the payment and shows:

> Parker owes Taylor $60.

---

# 19. Debt Simplification

Groups can sometimes end up with unnecessary chains of payments.

For example:

- Alice owes Bob $50.
- Bob owes Charlie $50.

Rather than requiring:

Alice → Bob  
Bob → Charlie

DiviSync may suggest:

Alice → Charlie $50

The goal is to reduce the number of transfers needed to settle a group while still keeping the result understandable to everyone involved.

---

# 20. Friends and Direct Expenses

Not every shared expense needs a formal group.

Two people may split a dinner directly.

Example:

Taylor pays $40 for dinner with Parker.

DiviSync records:

> Parker owes Taylor $20.

That balance appears in their direct relationship and can later be settled independently of any group.

---

# 21. Adding and Inviting People

Users should be able to connect with others through methods such as:

- email;
- username;
- invitation link.

A group member can invite another person to join a group.

Example:

> Taylor invited you to join “Bali Trip.”

The invited person can accept or decline.

Once they join, they can participate in the group’s shared expenses according to the group’s rules.

---

# 22. Members

The Members view shows everyone participating in a group.

For each member, users may see:

- name;
- profile image;
- current balance;
- membership status.

Depending on the group’s permissions, certain members may also be able to:

- invite others;
- manage group settings;
- remove members;
- leave the group.

---

# 23. Statistics

Statistics help groups understand their spending beyond who owes whom.

Useful insights may include:

### Total Spending

> Bali Trip spent $4,820.

### Spending by Category

- Accommodation — $2,100
- Food — $1,100
- Transport — $720
- Activities — $600
- Other — $300

### Spending by Member

Shows how much each person originally paid.

### Spending Over Time

Shows how group spending changed during a trip, month, or longer period.

Statistics should remain useful and easy to understand rather than turning DiviSync into heavy accounting software.

---

# 24. Expense Categories

Expenses can be organized into categories such as:

- Food
- Travel
- Accommodation
- Transport
- Shopping
- Entertainment
- Utilities
- Rent
- Groceries
- Health
- Other

Categories make expense history easier to explore and make statistics more meaningful.

---

# 25. Search and Filters

As users build up months or years of financial history, finding old information becomes important.

Users should be able to search for:

- expenses;
- groups;
- friends.

They should also be able to filter expenses by things such as:

- date;
- group;
- category;
- payer;
- participant;
- amount.

Example:

Searching for “Airbnb” should quickly surface the relevant trip expense.

---

# 26. Activity History

Shared financial information requires trust.

DiviSync should provide a clear activity history showing meaningful changes.

Examples:

- Taylor added “Dinner — $120.”
- Parker changed “Taxi” from $30 to $35.
- Delores joined the group.
- Scotty paid Taylor $50.
- Taylor deleted “Groceries.”

This helps everyone understand what changed and when.

---

# 27. Notifications

Users can be notified when something important happens.

Examples:

- Parker added a $120 dinner expense.
- You owe $30 from Dinner.
- Scotty settled $50 with you.
- You were invited to Bali Trip.
- An expense you participated in was edited.

Users should have control over which notifications they want to receive.

---

# 28. Multi-Currency Support

Travel groups may spend money in more than one currency.

A group can have a primary currency while still allowing expenses in other currencies.

For example, a Bali Trip may primarily use USD while some expenses are entered in Indonesian Rupiah.

The app should always make it clear which currency is being displayed so users do not confuse amounts.

More advanced currency features can be introduced later as the product grows.

---

# 29. Recurring Expenses

Long-running groups often have repeated expenses.

Examples:

- rent;
- internet;
- electricity;
- streaming subscriptions;
- cleaning;
- household services.

DiviSync can eventually help users manage recurring expenses so that roommates and households do not need to recreate the same bill every month.

---

# 30. Receipts and Attachments

Users may want to attach supporting information to an expense.

Examples include:

- receipt photos;
- invoices;
- booking confirmations;
- payment screenshots.

This is especially useful for larger expenses or situations where group members may want to verify the original amount later.

---

# 31. Comments and Discussions

Sometimes an expense needs discussion.

Example:

> “Why am I included in this taxi?”

Instead of moving the conversation to another app, members can discuss the expense directly.

Example:

**Parker:** I left before dinner.

**Taylor:** You’re right. I’ve removed you from the split.

Keeping the conversation next to the expense makes it easier to understand what happened later.

---

# 32. First-Time User Journey

A new user’s first experience should be simple.

### Step 1 — Join DiviSync

The user creates an account.

### Step 2 — Create or Join a Group

Example:

> Bali Trip

### Step 3 — Invite Friends

The user invites the people involved.

### Step 4 — Add the First Expense

Example:

> Hotel — $600

### Step 5 — Choose the Split

The cost is divided between the relevant members.

### Step 6 — See the Balance

DiviSync immediately shows who owes whom.

### Step 7 — Continue Adding Expenses

Members keep using the group throughout the trip, month, or event.

### Step 8 — Settle Up

When convenient, members settle their outstanding balances.

The experience should require very little explanation or financial knowledge.

---

# 33. Returning User Journey

A returning user should be able to open DiviSync and immediately understand:

1. whether they owe anyone money;
2. whether anyone owes them;
3. what changed recently;
4. which groups are active;
5. whether any balances need attention.

Their most common actions should always be close at hand:

- Add Expense
- Settle Up

---

# 34. Example: Travel Group Workflow

Five friends create a group called **Bali Trip**.

### Day 1

Taylor pays $600 for accommodation.

### Day 2

Parker pays $80 for dinner.

### Day 3

Scotty pays $25 for a taxi used only by Scotty, Taylor, and Parker.

### Day 4

Delores pays $200 for an activity attended by everyone.

DiviSync continuously keeps everyone's balances up to date.

At the end of the trip, nobody needs to manually review dozens of transactions.

The group can simply see who should pay whom and settle everything.

---

# 35. Example: Roommate Workflow

Four roommates create a group called **Apartment 4B**.

Throughout the month they add:

- rent;
- electricity;
- internet;
- groceries;
- cleaning supplies;
- repairs.

Some expenses are shared by everyone.

Others only involve certain roommates.

At the end of the month, each person can see their remaining balance and settle accordingly.

This is a strong long-term use case because the same group may remain active for years.

---

# 36. Example: Direct Expense Workflow

Taylor and Parker have dinner together.

Taylor pays $40.

Taylor adds the expense and selects Parker.

DiviSync shows:

> Parker owes Taylor $20.

No group needs to be created for a simple one-to-one expense.

---

# 37. Product Principles

## Keep It Simple

A user should not need accounting knowledge to use DiviSync.

## Make Every Balance Explainable

Users should always be able to understand how a balance was created.

## Support Real-Life Situations

Expenses are not always equal, and not every group member participates every time.

## Build Trust Through Transparency

Changes to shared financial information should be visible to the people affected.

## Make Common Actions Fast

Recording a normal expense should take seconds.

## Keep the Tone Neutral

Money can create social tension.

DiviSync should present balances clearly without making users feel accused, embarrassed, or pressured.

---

# 38. Why Users Would Choose DiviSync

### Less Mental Accounting

Users do not need to remember who paid for what.

### Fewer Awkward Conversations

Everyone involved sees the same shared information.

### No Manual Calculations

DiviSync handles the running balances.

### Flexible Splitting

The app can support both simple and unusual expense-sharing situations.

### Clear History

Users can understand how balances developed over time.

### Easier Settlements

The group can see the simplest way to resolve outstanding balances.

### Useful for Both Short and Long-Term Groups

The same product can support a weekend trip or a household that uses it for years.

---

# 39. Product Differentiation

DiviSync should compete on the quality and clarity of the full experience rather than on expense splitting alone.

Potential strengths include:

### Clearer Balance Explanations

Users see not just what they owe, but why.

### Better Group Experience

Groups feel like shared financial spaces rather than simple transaction lists.

### Transparent Activity

Members can easily understand when something changed.

### Modern, Friendly Experience

The product should feel fast, clean, approachable, and pleasant to use.

### Flexible Expense Splitting

Simple splits remain quick while more unusual situations are still supported.

### Long-Term Usefulness

DiviSync should remain useful after the trip or event ends and continue working well for persistent groups.

---

# 40. Business Opportunities

The core experience should remain broadly useful, while premium features can create revenue opportunities.

Possible paid features may include:

- advanced spending insights;
- enhanced reports;
- receipt and document storage;
- recurring-expense automation;
- advanced currency tools;
- data exports;
- additional group customization;
- richer history;
- premium household features;
- advanced notification controls.

A future offering could also serve clubs, student organizations, community groups, event organizers, and other small teams that want more structure without adopting full business accounting software.

Core fairness and balance calculation should not feel locked behind payment. Premium plans should mainly add convenience, automation, analysis, and customization.

---

# 41. Natural Growth Loop

DiviSync has a built-in social growth opportunity.

One person creates a group and invites others.

Those invited users later create their own groups.

For example:

Taylor creates **Bali Trip**  
→ invites Parker  
→ Parker later creates **Apartment 4B**  
→ invites three roommates

Useful group activity can naturally introduce new users to the product.

---

# 42. Retention Opportunities

Different use cases create different usage patterns.

### Trips

Very active usage for a short period.

### Roommates

Recurring usage every week or month.

### Couples and Families

Ongoing shared spending.

### Friend Groups

Repeated activity around social events.

### Recurring Bills

Predictable monthly usage.

Long-running groups such as households are likely to be especially important for retention because they create a continuing reason to return.

---

# 43. Business Metrics That Matter

The product should eventually track metrics that reflect real value rather than account creation alone.

Important examples include:

### User Activation

How many new users successfully create or join a group and participate in their first expense.

### Group Activation

How many newly created groups record multiple expenses.

### Active Groups

How many groups have meaningful recent activity.

### Expenses Added

How often users trust DiviSync to record real shared spending.

### Settlements Completed

How often users resolve balances through the product.

### Invitations Sent and Accepted

How effectively groups bring new users into DiviSync.

### Retention

How many users and groups continue using the product over time.

### Recurring Group Usage

How many groups remain active across several months.

A strong sign of product-market fit would be:

> Groups repeatedly relying on DiviSync as the trusted place to manage their real shared expenses.

---

# 44. Initial Product Scope

The first strong version of DiviSync should focus on making the core shared-expense experience excellent.

Essential features include:

- user accounts;
- friends;
- group creation;
- group invitations;
- add expense;
- choose payer;
- select participants;
- equal split;
- custom split;
- expense history;
- member balances;
- expense details;
- edit expense;
- delete expense;
- settle up;
- partial settlements;
- basic activity history;
- search;
- a responsive and easy-to-use experience.

These features are enough to create a product people can genuinely use for real shared expenses.

---

# 45. Future Expansion

Once the core experience is reliable, DiviSync can grow into areas such as:

- advanced statistics;
- richer categories;
- receipt attachments;
- comments and discussions;
- recurring expenses;
- advanced multi-currency support;
- debt simplification;
- smarter notifications;
- spending reports;
- exports;
- travel-focused tools;
- household-focused tools;
- premium features.

---

# 46. What DiviSync Does Not Need to Become Initially

DiviSync does not need to start as:

- a bank;
- a payment processor;
- a personal budgeting app;
- an investment app;
- full accounting software;
- enterprise expense software;
- a social network.

The initial focus should remain very clear:

> **Help people manage shared money fairly and without unnecessary effort.**

New financial features should only be added when they strengthen that core purpose.

---

# 47. Example Complete User Story

Taylor, Parker, Scotty, and Delores are planning a trip.

Taylor creates **Bali Trip** in DiviSync and invites the others.

Taylor pays $800 for accommodation and adds:

> Airbnb — $800

All four travelers are included.

DiviSync shows that the expense is $200 per person.

Because Taylor paid the full amount, Parker, Scotty, and Delores each owe Taylor their share.

The next day, Parker pays $120 for dinner.

All four participate, so each person’s share is $30.

DiviSync automatically updates everyone’s balances.

Later, Scotty and Parker take a $24 taxi.

Scotty pays, and only those two are included.

Their share is $12 each.

Throughout the trip, nobody needs to settle after every purchase.

They simply keep recording expenses.

At any moment, Taylor can open the group and see how much he is owed.

Parker can open his balance and see exactly which expenses contributed to it.

At the end of the trip, DiviSync shows the payments needed to settle the group.

Once those payments are recorded, the group becomes:

> **All settled up.**

The history remains available for future reference.

---

# 48. Long-Term Vision

DiviSync should grow from being seen as:

> “an app for splitting bills”

into:

> **the shared financial memory of a group.**

For a weekend trip, it remembers every shared purchase.

For roommates, it keeps months or years of household expenses organized.

For couples and families, it helps coordinate shared costs.

For communities, it provides transparency around common spending.

The broader opportunity is not simply bill splitting.

It is helping people manage the financial relationships that naturally appear whenever money is shared.

---

# 49. One-Sentence Pitch

**DiviSync helps friends, roommates, families, couples, and groups track shared expenses, understand who owes whom, and settle fairly without spreadsheets, manual calculations, or awkward conversations.**

---

# 50. Short Business Pitch

**DiviSync is a shared-expense platform for people who spend money together. Users create groups, record who paid, choose who shared the cost, and DiviSync keeps everyone’s balances in sync automatically. Members can clearly understand why they owe money, settle balances when convenient, and keep a transparent history of the group’s financial activity. It is designed to work equally well for a weekend trip, a shared apartment, a couple, a family, or any community that regularly manages shared costs.**
