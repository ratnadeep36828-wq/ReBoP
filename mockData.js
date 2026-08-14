const mockData = {
  charts: {
    lineData: {
      labels: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4', 'Sprint 5', 'Sprint 6'],
      datasets: [
        {
          label: 'Team Morale',
          data: [85, 82, 78, 70, 74, 78],
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Workload Strain',
          data: [40, 55, 65, 85, 75, 60],
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    doughnutData: {
      labels: ['Frontend', 'Backend', 'QA', 'Product'],
      datasets: [
        {
          data: [35, 45, 10, 10],
          backgroundColor: ['#2563eb', '#eab308', '#22c55e', '#94a3b8'],
          borderWidth: 0
        }
      ]
    }
  },
  risks: [
    {
      id: 1,
      title: 'Developer Fatigue in Sprint 4',
      level: 'High Risk',
      tagClass: 'tag-high',
      description: 'Multiple late commits and negative sentiment detected in standups.',
      actionPlan: `
        <h3>1-on-1 Meeting Agenda</h3>
        <ul>
          <li>Check in on well-being and current stress levels.</li>
          <li>Review current Sprint 4 tasks and identify blockers.</li>
          <li>Discuss potential delegation of non-critical tasks.</li>
        </ul>
        <h3>Workload Redistribution</h3>
        <p>Re-assign UI polishing tasks to junior developers.</p>
      `
    },
    {
      id: 2,
      title: 'Communication Gap in Requirements',
      level: 'Medium Risk',
      tagClass: 'tag-medium',
      description: 'Frontend and Product teams have conflicting understanding of feature X.',
      actionPlan: `
        <h3>Team Check-in Template</h3>
        <p>Schedule a 15-minute alignment sync with Product and Frontend leads.</p>
        <ul>
          <li>Clarify AC (Acceptance Criteria) for Feature X.</li>
          <li>Update Jira tickets to reflect shared understanding.</li>
        </ul>
      `
    },
    {
      id: 3,
      title: 'Code Review Bottleneck',
      level: 'Low Risk',
      tagClass: 'tag-low',
      description: 'PRs are taking > 48 hours to be reviewed in the backend repository.',
      actionPlan: `
        <h3>Process Adjustment</h3>
        <p>Implement a round-robin PR review assignment or dedicate specific "review hours" for senior backend engineers.</p>
      `
    }
  ],
  chatResponses: {
    default: "I can help you analyze morale or draft communications. Try selecting a quick reply above!",
    draftAgenda: "Here's a quick 1-on-1 agenda based on recent data:\n1. Check-in on workload.\n2. Review any blockers from recent sprints.\n3. Discuss PTO plans to prevent burnout.",
    analyzeFriction: "In Sprint 4, the primary friction was traced to late requirement changes in the backend API, leading to frontend delays. Recommend locking requirements earlier.",
    generateEmail: "Drafting check-in email...\n\nSubject: Checking in - Team Support\nHi Team, I noticed we've been pushing hard lately. Let's make sure we're balancing the load. Please reach out if you need to adjust priorities this week."
  },
  monthlyWorkload: {
    "January": {
      "Week 1": [40, 45, 50, 40, 35],
      "Week 2": [35, 40, 45, 50, 55],
      "Week 3": [60, 55, 50, 45, 40],
      "Week 4": [45, 50, 55, 60, 65]
    },
    "February": {
      "Week 1": [50, 55, 60, 55, 50],
      "Week 2": [45, 50, 45, 40, 35],
      "Week 3": [40, 35, 40, 45, 50],
      "Week 4": [55, 60, 65, 60, 55]
    },
    "March": {
       "Week 1": [35, 30, 35, 40, 45],
       "Week 2": [40, 45, 50, 55, 60],
       "Week 3": [65, 70, 65, 60, 55],
       "Week 4": [50, 45, 40, 35, 30]
    },
    // We can add the rest of the months with generated mock data
    "April": { "Week 1": [40, 45, 50, 55, 60], "Week 2": [55, 50, 45, 40, 35], "Week 3": [35, 40, 45, 50, 55], "Week 4": [60, 65, 70, 65, 60] },
    "May": { "Week 1": [50, 55, 60, 65, 70], "Week 2": [65, 60, 55, 50, 45], "Week 3": [40, 35, 30, 35, 40], "Week 4": [45, 50, 55, 60, 65] },
    "June": { "Week 1": [60, 65, 70, 75, 80], "Week 2": [75, 70, 65, 60, 55], "Week 3": [50, 45, 40, 35, 30], "Week 4": [35, 40, 45, 50, 55] },
    "July": { "Week 1": [40, 45, 50, 45, 40], "Week 2": [35, 30, 25, 30, 35], "Week 3": [40, 45, 50, 55, 60], "Week 4": [65, 70, 75, 70, 65] },
    "August": { "Week 1": [50, 55, 60, 55, 50], "Week 2": [45, 40, 35, 40, 45], "Week 3": [50, 55, 60, 65, 70], "Week 4": [75, 80, 75, 70, 65] },
    "September": { "Week 1": [60, 65, 70, 65, 60], "Week 2": [55, 50, 45, 50, 55], "Week 3": [60, 65, 70, 75, 80], "Week 4": [85, 90, 85, 80, 75] },
    "October": { "Week 1": [45, 50, 55, 50, 45], "Week 2": [40, 35, 30, 35, 40], "Week 3": [45, 50, 55, 60, 65], "Week 4": [70, 75, 80, 75, 70] },
    "November": { "Week 1": [55, 60, 65, 60, 55], "Week 2": [50, 45, 40, 45, 50], "Week 3": [55, 60, 65, 70, 75], "Week 4": [80, 85, 90, 85, 80] },
    "December": { "Week 1": [65, 70, 75, 70, 65], "Week 2": [60, 55, 50, 55, 60], "Week 3": [65, 70, 75, 80, 85], "Week 4": [90, 95, 100, 95, 90] }
  },
  teamStressData: [
    {
      id: "eng",
      name: "Engineering",
      stressScore: 82,
      trend: "+5%",
      trendDirection: "up",
      members: [
        { name: "Alice J.", role: "Backend Lead", score: 88, history: [70, 75, 80, 85, 88, 88] },
        { name: "Bob S.", role: "Frontend Dev", score: 76, history: [60, 65, 70, 75, 76, 76] },
        { name: "Charlie M.", role: "DevOps", score: 90, history: [75, 80, 85, 90, 90, 90] }
      ],
      feedback: "Consistent overtime due to upcoming release deadline. Lack of clear requirements from product.",
      suggestions: [
        "Enforce strict cutoff times for evening commits.",
        "Schedule an alignment meeting with Product to lock scope."
      ]
    },
    {
      id: "des",
      name: "Design",
      stressScore: 45,
      trend: "-2%",
      trendDirection: "down",
      members: [
        { name: "Diana P.", role: "UI/UX Designer", score: 40, history: [50, 48, 45, 42, 40, 40] },
        { name: "Evan R.", role: "Product Designer", score: 50, history: [60, 55, 52, 50, 50, 50] }
      ],
      feedback: "Good pace. Recent adoption of the new design system has streamlined workflows.",
      suggestions: [
        "Continue weekly design critique sessions to maintain momentum."
      ]
    },
    {
      id: "mkt",
      name: "Marketing",
      stressScore: 65,
      trend: "+1%",
      trendDirection: "up",
      members: [
        { name: "Fiona G.", role: "Content Strategist", score: 60, history: [55, 58, 60, 60, 60, 60] },
        { name: "George H.", role: "SEO Specialist", score: 70, history: [60, 65, 68, 70, 70, 70] }
      ],
      feedback: "Slight stress increase ahead of Q3 campaign launch, but manageable.",
      suggestions: [
        "Ensure all creative assets are delivered by Friday to prevent weekend work."
      ]
    },
    {
      id: "sup",
      name: "Support",
      stressScore: 78,
      trend: "+8%",
      trendDirection: "up",
      members: [
        { name: "Hannah L.", role: "Support Lead", score: 85, history: [60, 65, 70, 78, 85, 85] },
        { name: "Ian K.", role: "Tier 1 Specialist", score: 72, history: [50, 55, 60, 65, 70, 72] }
      ],
      feedback: "Ticket volume spiked 30% this week following the new feature release. Team is feeling overwhelmed.",
      suggestions: [
        "Draft new macro responses for common issues.",
        "Temporarily assign a developer on-call to help triage complex tickets."
      ]
    }
  ],
  meetings: {
    // Format: "YYYY-MM-DD": [{ title: "Meeting Title", time: "10:00 AM", attendees: "Alice, Bob" }]
    // Pre-populate today's date for demo purposes
    [new Date().toISOString().split('T')[0]]: [
      { title: "Sprint Sync", time: "10:00 AM", attendees: "Engineering Team" },
      { title: "1-on-1 with Bob", time: "02:30 PM", attendees: "Alice, Bob" }
    ]
  }
};
