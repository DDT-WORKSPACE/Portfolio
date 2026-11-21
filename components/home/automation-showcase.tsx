"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  CalendarCheck,
  ChevronRight,
  ClipboardCheck,
  FileStack,
  Inbox,
  type LucideIcon,
} from "lucide-react";

const AutomationRobot = dynamic(
  () => import("./automation-robot").then((module) => module.AutomationRobot),
  { ssr: false },
);

const workflows: {
  name: string;
  icon: LucideIcon;
  situation: string;
  sample: [string, string];
  steps: [string, string][];
  review: string;
  measure: string;
}[] = [
  {
    name: "Customer enquiries",
    icon: Inbox,
    situation:
      "When enquiries arrive by email or web form, give your team one queue with the context they need to respond.",
    sample: ["New enquiry", "Routed to sales"],
    steps: [
      ["Receive", "Collect the original message and match it to a contact."],
      [
        "Triage",
        "Classify the request and suggest a reply from approved information.",
      ],
      ["Route", "Send it to the right owner and log the handoff in the CRM."],
    ],
    review: "Unclear requests and sensitive replies go to a person.",
    measure: "Time to assignment and enquiries left unassigned.",
  },
  {
    name: "Scheduling and follow-up",
    icon: CalendarCheck,
    situation:
      "When booking work takes several messages, connect incoming requests to calendar availability and follow-up reminders.",
    sample: ["Booking request", "Time confirmed"],
    steps: [
      ["Collect", "Ask for the service, location and preferred time."],
      [
        "Check",
        "Look up availability and confirm changes against booking rules.",
      ],
      ["Confirm", "Send the appointment details and record the next reminder."],
    ],
    review:
      "Exceptions such as urgent or out-of-policy requests go to a coordinator.",
    measure:
      "Time from a booking request to confirmation and manual follow-ups per booking.",
  },
  {
    name: "Document intake",
    icon: FileStack,
    situation:
      "Give operations staff a review queue for incoming invoices, forms or applications.",
    sample: ["Invoice received", "Ready for review"],
    steps: [
      ["Capture", "Save the original file and identify its document type."],
      [
        "Extract",
        "Pull the required fields and check them against your rules.",
      ],
      [
        "File",
        "Write approved values to your system and keep a record of the original.",
      ],
    ],
    review:
      "Low-confidence values and mismatches stay in the queue until checked.",
    measure: "Time per document, correction rate and items awaiting review.",
  },
];

export function AutomationShowcase({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const [loadScene, setLoadScene] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const workflow = workflows[active];

  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadScene(true);
          observer.disconnect();
        }
      },
      { rootMargin: "220px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`automation-showcase${embedded ? " is-embedded" : ""}`}
      id="automation"
      aria-labelledby="automation-title"
    >
      <div
        className={
          embedded ? "automation-layout" : "dd-container automation-layout"
        }
      >
        <div className="automation-intro">
          <span className="ed-label">AI &amp; automation</span>
          <h2 id="automation-title">Let AI handle the routine</h2>
          <p>
            We connect the tools you already use, automate repeatable tasks, and
            use AI where a workflow needs to interpret messages or documents.
          </p>
          <div
            className="automation-select"
            role="group"
            aria-label="Example workflows"
          >
            {workflows.map(({ name, icon: Icon }, index) => (
              <button
                type="button"
                key={name}
                aria-pressed={active === index}
                aria-controls="example-workflow"
                onClick={() => {
                  setActive(index);
                  setStep(0);
                }}
              >
                <Icon size={19} aria-hidden="true" />
                {name}
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            ))}
          </div>
          {!embedded && (
            <Link className="ed-button" href="/services/ai-automation">
              Explore AI &amp; automation
            </Link>
          )}
        </div>
        <div className="automation-workbench">
          <div className="automation-scene" ref={scene} data-mode={active}>
            <span className="automation-scene-label">Workflow preview</span>
            <div className="automation-robot-fallback" aria-hidden="true">
              <span className="automation-robot-head">
                <i />
                <i />
              </span>
              <span className="automation-robot-body">
                <i />
              </span>
            </div>
            {loadScene && <AutomationRobot mode={active} step={step} />}
            <div className="automation-signals" aria-hidden="true">
              <span key={workflow.sample[0]}>
                <i />
                {workflow.sample[0]}
              </span>
              <span key={workflow.sample[1]}>
                <i />
                {workflow.sample[1]}
              </span>
            </div>
          </div>
          <div className="automation-example" id="example-workflow">
            <div
              className="automation-steps"
              role="group"
              aria-label={`Steps for ${workflow.name.toLowerCase()}`}
            >
              {workflow.steps.map(([title], index) => (
                <button
                  type="button"
                  key={title}
                  aria-pressed={step === index}
                  aria-controls="example-step"
                  onClick={() => setStep(index)}
                >
                  {title}
                </button>
              ))}
            </div>
            <p className="automation-step" id="example-step" aria-live="polite">
              {workflow.steps[step][1]}
            </p>
            <details
              key={workflow.name}
              className="automation-workflow-details"
            >
              <summary>
                <ClipboardCheck size={17} aria-hidden="true" />
                Human review and success measures
              </summary>
              <p>{workflow.situation}</p>
              <p>
                <strong>Human review</strong> {workflow.review}
              </p>
              <p>
                <strong>What to measure</strong> {workflow.measure}
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
