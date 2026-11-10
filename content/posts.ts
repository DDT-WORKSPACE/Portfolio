export const posts = [
  {
    slug: "ai-that-earns-its-place",
    title: "Automate the bottleneck, not the whole business",
    category: "Business automation",
    description:
      "A practical way to choose an automation opportunity, map the handoffs and keep people in control.",
    color: "blue",
    readingTime: "4 min read",
    body: `## Start with the work people repeat

A useful automation project starts with an observation: someone copies the same enquiry into two tools, follows up every lead by hand, or checks a spreadsheet before booking an appointment. The task may be small, but repeated interruptions make it expensive in attention.

Write down the trigger, the information needed, the decision being made and the next action. A reception workflow might begin with an enquiry, ask a few qualifying questions, check an appointment calendar and pass a summary to a person. That map is more useful than starting with a list of AI tools.

## Pick a first workflow with clear boundaries

Choose something frequent enough to matter and simple enough to review. Lead capture, appointment reminders, order notifications and routine CRM updates are good topics to evaluate. Record the existing process so the team can compare what changed.

Define what must never happen automatically. A system should not invent an answer about pricing, promise an unavailable appointment or make a sensitive decision without the appropriate review. Uncertainty should have an obvious route to a person.

## Use the simplest reliable approach

Some steps need a rule, not a language model. Moving structured data between tools may only require an integration. Understanding an unstructured message may benefit from AI. The useful design is often a combination: structured steps for consistency, AI where interpretation helps, and people where judgement matters.

## Plan for the day after launch

Decide who receives errors, how failed steps can be retried and which events need a record. Keep credentials out of workflow text and give each connection only the access it needs. Review a small set of real examples before expanding the workflow.

The aim is not to remove every human interaction. It is to remove repetitive work so people can give the important conversations their attention.`,
  },
  {
    slug: "before-the-first-sprint",
    title: "What to decide before your first sprint",
    category: "Product strategy",
    description:
      "Get clear on the user, the useful first outcome and the decisions that keep a new product focused.",
    color: "orange",
    readingTime: "3 min read",
    body: `## Name the person and the moment

“We need an app” is a starting point, not a scope. Who opens it? What are they trying to do? What is difficult about doing that today? Describe one specific situation before describing a screen.

A coffee-ordering product, for example, has different priorities when helping someone discover a café than when helping a regular customer repeat an order. Both can belong in the same product, but the first release needs a clear centre of gravity.

## Write down the smallest useful outcome

List the steps a person must complete to get value. Separate those essential steps from improvements that can wait. The first release should be a coherent experience, rather than a collection of half-finished features.

Include the invisible work: account access, payments, notifications, admin responsibilities and the information another system must provide. Dependencies discovered late can change a delivery plan more than an extra screen.

## Make decisions reviewable

A clickable prototype, a written workflow and a short set of acceptance criteria make a discussion concrete. People can point to what feels unclear rather than interpreting a long document differently.

Agree who makes the final call when priorities compete. Keep a simple record of the choice and the reason, especially when a decision changes the scope.

## Define what happens after the first release

Choose what to observe: can users finish the main journey, where do they get stuck, and which requests keep coming back? Assign a person to review that feedback. A first release becomes more useful when the next decision has an owner.

Before the first sprint, you do not need to know everything. You need a shared problem, a focused outcome and a way to learn from the work.`,
  },
  {
    slug: "design-and-engineering",
    title: "Keep design and engineering in the same conversation",
    category: "Inside the studio",
    description:
      "Why shared decisions, real interface reviews and clear handovers make the product easier to build and maintain.",
    color: "pale",
    readingTime: "3 min read",
    body: `## Start the technical conversation early

A design decision often has a technical consequence. A dashboard needs a dependable source for each number. A mobile interaction may depend on connectivity. A form must explain what happens when another system is unavailable.

Bring those constraints into the design conversation while there is still room to explore. Understanding a constraint early usually creates more options, not fewer.

## Review the real states

The ideal screen is only one state of a product. Review empty results, long names, slow connections, failed payments and people navigating by keyboard. These moments are part of the experience, not exceptions to it.

Use realistic content lengths and representative data. A tidy mockup with short labels can hide the layout problems that appear as soon as a real person uses the product.

## Share a small set of interface rules

Define the recurring decisions once: spacing, type, buttons, field errors and loading feedback. A consistent component vocabulary makes the product easier to change without turning every new screen into a separate design exercise.

Keep the documentation close to the working components. When a pattern changes, the design and implementation should tell the same story.

## Make handover an ongoing habit

Review working software alongside the intended experience. Ask what changed, whether the trade-off still makes sense, and what needs a second pass. A screenshot is helpful, but an actual interaction reveals timing and behaviour that a static image cannot.

Good collaboration is less about passing a perfect file between teams and more about making the next decision together. The result is an experience that feels considered and a product the team understands how to keep building.`,
  },
].map((p) => ({ ...p, author: "DevsDen Tech", date: "10 November 2026" }));
