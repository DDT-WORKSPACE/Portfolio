import { Button, Marker } from "@/components/ui";
import { Workflow } from "lucide-react";
export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <div>
          <Marker>404 / a small disconnect</Marker>
          <h1>
            A loose end<span className="period">.</span>
          </h1>
          <p>
            This signal didn’t quite make it. Let’s get you back to something
            useful.
          </p>
          <Button href="/">Back to the beginning</Button>
        </div>
        <div className="broken-signal" aria-hidden="true">
          <svg viewBox="0 0 400 300">
            <path
              d="M 0 70 H 80 Q 100 70 100 90 V 140 H 155 M 245 140 H 300 Q 320 140 320 160 V 240 H 400 M 0 230 H 70 V 190 H 155"
              stroke="#DFE6F3"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="150" cy="140" r="5" fill="#FF6A00" />
          </svg>
          <span>
            <img src="/Logo/logo.png" alt="" width={48} height={50} />
          </span>
        </div>
      </div>
    </section>
  );
}
