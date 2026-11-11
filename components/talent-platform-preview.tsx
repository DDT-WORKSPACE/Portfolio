/** Scalable reconstruction of the supplied portfolio layout; original case study stays linked below. */
export function TalentPlatformPreview() {
  return (
    <svg
      className="talent-platform-preview"
      viewBox="0 0 720 510"
      role="img"
      aria-label="Talent Badger platform preview with specialist search, team building and engineering categories"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="talent-preview-bg" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#051e29" />
          <stop offset="1" stopColor="#0c423d" />
        </linearGradient>
        <pattern
          id="talent-preview-grid"
          width="52"
          height="52"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 26H26V0M26 52V38H52"
            fill="none"
            stroke="#5e9c8d"
            strokeWidth=".7"
            opacity=".3"
          />
          <circle cx="26" cy="26" r="2" fill="#87b7a5" opacity=".4" />
        </pattern>
      </defs>
      <rect width="720" height="510" rx="12" fill="#fff" />
      <image
        href="/brands/talentbadger-clean.webp"
        x="24"
        y="17"
        width="142"
        height="25"
      />
      <g fill="#365e61" fontSize="9" fontFamily="Arial,sans-serif">
        <text x="275" y="32">
          For Companies
        </text>
        <text x="357" y="32">
          For Specialists
        </text>
        <text x="440" y="32">
          Find Talent
        </text>
        <text x="510" y="32">
          Community
        </text>
        <text x="586" y="32">
          About
        </text>
      </g>
      <rect x="631" y="17" width="68" height="26" rx="5" fill="#178e85" />
      <text
        x="665"
        y="33"
        textAnchor="middle"
        fill="white"
        fontSize="9"
        fontFamily="Arial,sans-serif"
      >
        Get Started
      </text>
      <path
        d="M0 59H720V498Q720 510 708 510H12Q0 510 0 498Z"
        fill="url(#talent-preview-bg)"
      />
      <rect
        x="400"
        y="59"
        width="320"
        height="451"
        fill="url(#talent-preview-grid)"
      />
      <g stroke="#62a48f" strokeWidth="2" opacity=".18" fill="none">
        <path d="M550 130L667 204V344L572 402L482 340V214Z" />
        <path d="M574 167L634 207V323L574 362L516 323V207Z" />
        <path d="M634 241H702M634 275H720M516 241H452M516 275H430" />
      </g>
      <g fontFamily="Arial,sans-serif">
        <text x="40" y="110" fill="#e8c66e" fontSize="10" letterSpacing="1.5">
          ENGINEERING AS A SERVICE
        </text>
        <text x="40" y="167" fill="#f3faf8" fontSize="34" fontWeight="700">
          The right <tspan fill="#50d2c2">specialist.</tspan>
        </text>
        <text x="40" y="210" fill="#f3faf8" fontSize="34" fontWeight="700">
          The right <tspan fill="#50d2c2">team.</tspan> On demand.
        </text>
        <g fill="#c4d8d6" fontSize="12">
          <text x="40" y="244">
            Curated, senior-level product development talent for
          </text>
          <text x="40" y="264">
            advanced engineering challenges. Hire one expert
          </text>
          <text x="40" y="284">
            or build a full team.
          </text>
        </g>
        <g fill="#214d4b" stroke="#5a8b80" strokeWidth=".5">
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={40 + i * 151}
              y="310"
              width="139"
              height="25"
              rx="5"
            />
          ))}
        </g>
        <g fill="#d2e7e1" fontSize="9">
          {[
            "Embedded & Firmware",
            "Electrical Engineering",
            "Medical Device Design",
            "Industrial Controls",
          ].map((n, i) => (
            <text key={n} x={109 + i * 151} y="326" textAnchor="middle">
              {n}
            </text>
          ))}
        </g>
        <rect x="40" y="359" width="150" height="38" rx="7" fill="#37c7b4" />
        <text
          x="115"
          y="383"
          fill="#073b3a"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
        >
          Find a Specialist
        </text>
        <rect
          x="204"
          y="359"
          width="137"
          height="38"
          rx="7"
          fill="#163d40"
          stroke="#79a69d"
        />
        <text x="272" y="383" fill="#e4f4ee" textAnchor="middle" fontSize="11">
          Build a Team
        </text>
        <path d="M40 433H680" stroke="#47746b" opacity=".65" />
        <g fill="#d0e3dd" fontSize="11">
          <text x="40" y="464">
            Specialist expertise
          </text>
          <text x="268" y="464">
            Senior-only teams
          </text>
          <text x="489" y="464">
            Milestone-led work
          </text>
        </g>
        <g fill="#8fafa6" fontSize="9">
          <text x="40" y="484">
            Find the right skills
          </text>
          <text x="268" y="484">
            A focused product team
          </text>
          <text x="489" y="484">
            A clear route forward
          </text>
        </g>
      </g>
    </svg>
  );
}
