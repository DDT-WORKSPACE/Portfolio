import { Marker, Icon } from "../ui";
export function AutomationDetail() {
  return (
    <section className="section automation-detail">
      <div className="container">
        <div className="heading-split">
          <div className="section-heading">
            <Marker>business first. automation second.</Marker>
            <h2>Remove the work that keeps interrupting the work.</h2>
          </div>
          <p>
            Start with the bottleneck, then choose the right mix of
            integrations, rules, AI and human review.
          </p>
        </div>
        <div className="automation-examples">
          {[
            {
              icon: "support",
              title: "Reception & appointments",
              body: "Capture the enquiry, answer agreed questions, check the right information and route the next conversation to a person or a calendar.",
              steps: ["Enquiry", "Qualification", "Booking", "Human handoff"],
            },
            {
              icon: "connect",
              title: "Sales follow-up",
              body: "Keep lead details, follow-up steps and CRM records connected, so a promising conversation does not disappear between tools.",
              steps: ["New lead", "CRM update", "Follow-up", "Owner notified"],
            },
            {
              icon: "chart",
              title: "Everyday operations",
              body: "Connect order updates, routine notifications, document handling and reporting around the way the business already works.",
              steps: ["Trigger", "Check rules", "Take action", "Keep a record"],
            },
          ].map((e) => (
            <div key={e.title}>
              <Icon name={e.icon} size={30} />
              <h3>{e.title}</h3>
              <p>{e.body}</p>
              <ol>
                {e.steps.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <p className="automation-human-note">
          A useful automation has a clear owner, a way to handle failure and a
          point where a person can take over.
        </p>
      </div>
    </section>
  );
}
