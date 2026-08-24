import { type ReactNode, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Blocks,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Cpu,
  FileText,
  Gauge,
  GitPullRequest,
  Lightbulb,
  ListChecks,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

type Status = 'On Track' | 'At Risk' | 'Blocked' | 'Complete';
type BacklogStatus = 'To Do' | 'In Progress' | 'Blocked' | 'In Review' | 'Done';
type RiskLevel = 'Low' | 'Medium' | 'High';

const workstreams = [
  {
    name: 'Security Partner Launch Readiness',
    owner: 'Avery Chen',
    status: 'At Risk' as Status,
    dueDate: 'Sep 6',
    milestone: 'Workshop launch gate',
    risk: 'Sentinel lab provisioning delay',
    blocker: 'Awaiting service quota approval',
    dependency: 'Cloud platform provider',
    criteria: 'All partner cohorts can complete Defender + Sentinel lab paths',
  },
  {
    name: 'Architect Enablement Content',
    owner: 'Jordan Patel',
    status: 'On Track' as Status,
    dueDate: 'Sep 10',
    milestone: 'Security content review',
    risk: 'Reviewer capacity',
    blocker: 'None',
    dependency: 'Engineering SMEs',
    criteria: 'Scenario guides approved and mapped to customer outcomes',
  },
  {
    name: 'Vendor Operations Cadence',
    owner: 'Mina Flores',
    status: 'On Track' as Status,
    dueDate: 'Sep 12',
    milestone: 'Weekly service review',
    risk: 'Support queue volatility',
    blocker: 'None',
    dependency: 'Managed lab vendor',
    criteria: 'SLA, escalation path, and readiness score reviewed weekly',
  },
  {
    name: 'Executive Reporting and Decisions',
    owner: 'Sam Rivera',
    status: 'Complete' as Status,
    dueDate: 'Aug 30',
    milestone: 'Director update pack',
    risk: 'Decision latency',
    blocker: 'None',
    dependency: 'Partner program leaders',
    criteria: 'Weekly narrative includes blockers, decisions, and recovery plan',
  },
];

const backlog = [
  { title: 'Resolve Sentinel tenant quota exception', status: 'Blocked' as BacklogStatus, priority: 'P0', owner: 'Avery', age: 6 },
  { title: 'Finalize Purview data governance lab script', status: 'In Review' as BacklogStatus, priority: 'P1', owner: 'Jordan', age: 4 },
  { title: 'Confirm September partner audience roster', status: 'In Progress' as BacklogStatus, priority: 'P1', owner: 'Nina', age: 2 },
  { title: 'Refresh Defender XDR incident walkthrough', status: 'Done' as BacklogStatus, priority: 'P2', owner: 'Luis', age: 1 },
  { title: 'Create Intune device compliance troubleshooting note', status: 'To Do' as BacklogStatus, priority: 'P2', owner: 'Priya', age: 0 },
  { title: 'Validate Entra permissions for partner architects', status: 'In Progress' as BacklogStatus, priority: 'P1', owner: 'Owen', age: 3 },
  { title: 'Publish follow-up template for pilot cohort', status: 'To Do' as BacklogStatus, priority: 'P3', owner: 'Mina', age: 0 },
];

const platforms = [
  {
    product: 'Microsoft Defender',
    provisioning: 'Ready',
    licensing: 'Trial active',
    health: 94,
    owner: 'Luis Kim',
    workshopDate: 'Sep 4',
    nextAction: 'Refresh attack simulation narrative',
    risk: 'Low' as RiskLevel,
    blocker: 'None',
    weekChange: '+6',
  },
  {
    product: 'Microsoft Sentinel',
    provisioning: 'Blocked',
    licensing: 'Pending capacity',
    health: 62,
    owner: 'Avery Chen',
    workshopDate: 'Sep 3',
    nextAction: 'Escalate quota approval and backup tenant option',
    risk: 'High' as RiskLevel,
    blocker: 'Lab workspace provisioning is waiting on service quota approval.',
    weekChange: '-8',
  },
  {
    product: 'Microsoft Entra',
    provisioning: 'Ready',
    licensing: 'Trial active',
    health: 88,
    owner: 'Owen Brooks',
    workshopDate: 'Sep 9',
    nextAction: 'Validate external identity permissions',
    risk: 'Medium' as RiskLevel,
    blocker: 'One guest access policy requires approval.',
    weekChange: '+2',
  },
  {
    product: 'Microsoft Purview',
    provisioning: 'In progress',
    licensing: 'Available',
    health: 79,
    owner: 'Jordan Patel',
    workshopDate: 'Sep 11',
    nextAction: 'Complete content review and evidence capture',
    risk: 'Medium' as RiskLevel,
    blocker: 'Security content review is aging beyond SLA.',
    weekChange: '+1',
  },
  {
    product: 'Microsoft Intune',
    provisioning: 'Ready',
    licensing: 'Trial active',
    health: 91,
    owner: 'Priya Shah',
    workshopDate: 'Sep 16',
    nextAction: 'Stage device compliance policy reset',
    risk: 'Low' as RiskLevel,
    blocker: 'None',
    weekChange: '+4',
  },
];

const workshops = [
  {
    name: 'Security Modernization Partner Cohort',
    date: 'Sep 3',
    lead: 'Avery Chen',
    readiness: 68,
    checklist: [true, false, true, false, true, false],
    risk: 'High' as RiskLevel,
  },
  {
    name: 'Architect Deep Dive: Defender + Entra',
    date: 'Sep 9',
    lead: 'Luis Kim',
    readiness: 86,
    checklist: [true, true, true, true, true, false],
    risk: 'Medium' as RiskLevel,
  },
  {
    name: 'Compliance and Data Security Lab',
    date: 'Sep 11',
    lead: 'Jordan Patel',
    readiness: 74,
    checklist: [false, true, true, true, true, false],
    risk: 'Medium' as RiskLevel,
  },
  {
    name: 'Endpoint Management Enablement',
    date: 'Sep 16',
    lead: 'Priya Shah',
    readiness: 92,
    checklist: [true, true, true, true, true, true],
    risk: 'Low' as RiskLevel,
  },
];

const checklistLabels = [
  'Content ready',
  'Demo environment ready',
  'Architect assigned',
  'Vendor dependency cleared',
  'Audience confirmed',
  'Follow-up materials ready',
];

const roleFit = [
  'End-to-end execution',
  'Agile operating rhythm',
  'Demo platform readiness',
  'Partner enablement',
  'Cross-functional stakeholder management',
  'Executive-ready reporting',
  'Operational insights and continuous improvement',
];

function classNames(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(' ');
}

function statusClass(status: Status | BacklogStatus | RiskLevel) {
  if (status === 'On Track' || status === 'Complete' || status === 'Done' || status === 'Low') return 'bg-emerald-50 text-emerald-700 ring-emerald-200';
  if (status === 'At Risk' || status === 'In Review' || status === 'Medium') return 'bg-amber-50 text-amber-700 ring-amber-200';
  if (status === 'Blocked' || status === 'High') return 'bg-rose-50 text-rose-700 ring-rose-200';
  return 'bg-blue-50 text-blue-700 ring-blue-200';
}

function Pill({ children, tone }: { children: ReactNode; tone: Status | BacklogStatus | RiskLevel }) {
  return <span className={classNames('rounded-full px-2.5 py-1 text-xs font-semibold ring-1', statusClass(tone))}>{children}</span>;
}

function App() {
  const [update, setUpdate] = useState('');

  const metrics = useMemo(() => {
    const onTrack = workstreams.filter((item) => item.status === 'On Track' || item.status === 'Complete').length;
    const blockedItems = backlog.filter((item) => item.status === 'Blocked').length + platforms.filter((item) => item.risk === 'High').length;
    const overdueActions = backlog.filter((item) => item.age >= 5 && item.status !== 'Done').length;
    const avgHealth = Math.round(platforms.reduce((sum, item) => sum + item.health, 0) / platforms.length);
    const avgWorkshopReadiness = Math.round(workshops.reduce((sum, item) => sum + item.readiness, 0) / workshops.length);
    return {
      onTrack,
      readiness: Math.round((avgHealth + avgWorkshopReadiness) / 2),
      blockedItems,
      workshops: workshops.length,
      overdueActions,
      platformHealth: avgHealth,
    };
  }, []);

  const insights = useMemo(() => {
    const riskyWorkshops = workshops.filter((item) => item.risk !== 'Low').length;
    return [
      'Sentinel lab provisioning is the top blocker for next week\'s workshops.',
      `${riskyWorkshops} partner workshops have demo readiness risk.`,
      'Security content review is aging beyond SLA for the Purview lab.',
      'Defender demo readiness improved week over week and is ready for partner walkthroughs.',
      'One unresolved licensing dependency may affect partner workshop readiness.',
    ];
  }, []);

  const generateUpdate = () => {
    const blocked = platforms.filter((item) => item.risk === 'High' || item.blocker !== 'None');
    const onTrack = workstreams.filter((item) => item.status === 'On Track' || item.status === 'Complete');
    setUpdate(
      [
        `Weekly executive update: ${onTrack.length} of ${workstreams.length} workstreams are on track or complete, with overall readiness at ${metrics.readiness}%.`,
        `On track: ${onTrack.map((item) => item.name).join(', ')}.`,
        `Blocked: Sentinel provisioning remains the primary blocker due to quota approval; Purview review and Entra guest policy approvals are watch items.`,
        'Decisions needed: confirm backup Sentinel tenant path, approve Entra guest access policy, and assign final reviewer capacity for Purview content.',
        'Changes this week: Defender readiness improved, executive reporting pack completed, and September workshop rosters moved into active confirmation.',
        `Risks to partner readiness: ${blocked.length} platform records need active management before the next two workshops.`,
        'Recommended next actions: run a 24-hour blocker review, lock escalation owners, and publish a partner-facing readiness note after the next platform checkpoint.',
      ].join('\n\n'),
    );
  };

  const metricCards = [
    { label: 'Workstreams on track', value: `${metrics.onTrack}/${workstreams.length}`, icon: CheckCircle2 },
    { label: 'Overall readiness', value: `${metrics.readiness}%`, icon: Gauge },
    { label: 'Blocked items', value: `${metrics.blockedItems}`, icon: AlertTriangle },
    { label: 'Partner workshops', value: `${metrics.workshops}`, icon: CalendarDays },
    { label: 'Overdue actions', value: `${metrics.overdueActions}`, icon: ClipboardList },
    { label: 'Demo platform health', value: `${metrics.platformHealth}%`, icon: Cpu },
  ];

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-700">
                <ShieldCheck className="h-4 w-4" />
                Portfolio demo, synthetic operating data
              </div>
              <h1 className="text-2xl font-semibold tracking-normal text-slate-950 sm:text-3xl">
                Security Partner Enablement Program Hub
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                A working program cockpit for security demo readiness, partner workshops, agile execution, stakeholder decisions, and Senior Director reporting.
              </p>
            </div>
            <button
              type="button"
              onClick={generateUpdate}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Sparkles className="h-4 w-4" />
              Generate Executive Update
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {metricCards.map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="mt-3 text-2xl font-semibold text-slate-950">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Demo Platform Readiness Tracker</h2>
              <p className="text-sm text-slate-500">Prominent readiness view for labs, owners, dependencies, and partner workshop impact.</p>
            </div>
            <Pill tone="Medium">Avg health {metrics.platformHealth}%</Pill>
          </div>
          <div className="grid gap-3">
            {platforms.map((platform) => (
              <article key={platform.product} className="rounded-lg border border-slate-200 p-4">
                <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-slate-950">{platform.product}</h3>
                      <Pill tone={platform.risk}>{platform.risk} risk</Pill>
                      <span className="text-xs font-semibold text-slate-500">{platform.weekChange} WoW</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{platform.nextAction}</p>
                  </div>
                  <div className="grid min-w-[260px] gap-2 text-sm sm:grid-cols-2">
                    <span><strong>Owner:</strong> {platform.owner}</span>
                    <span><strong>Workshop:</strong> {platform.workshopDate}</span>
                    <span><strong>Provisioning:</strong> {platform.provisioning}</span>
                    <span><strong>Licensing:</strong> {platform.licensing}</span>
                  </div>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-blue-600" style={{ width: `${platform.health}%` }} />
                </div>
                <p className="mt-2 text-xs text-slate-500">Blocker notes: {platform.blocker}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className="grid gap-5">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Operational Insights</h2>
            </div>
            <div className="space-y-3">
              {insights.map((insight) => (
                <div key={insight} className="flex gap-3 rounded-md bg-slate-50 p-3 text-sm text-slate-700">
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold">AI Executive Update Generator</h2>
            </div>
            <div className="min-h-[180px] rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm leading-6 text-slate-100">
              {update ? <p className="whitespace-pre-line">{update}</p> : <p className="text-slate-300">Click the button above to generate a Senior Director-ready weekly update from the current program data.</p>}
            </div>
          </section>
        </aside>
      </div>

      <div className="mx-auto grid max-w-7xl gap-5 px-4 pb-5 sm:px-6 lg:grid-cols-2 lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center gap-2">
            <Blocks className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Executive Program Dashboard</h2>
          </div>
          <div className="space-y-3">
            {workstreams.map((stream) => (
              <article key={stream.name} className="rounded-lg border border-slate-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold">{stream.name}</h3>
                  <Pill tone={stream.status}>{stream.status}</Pill>
                </div>
                <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                  <span><strong>Owner:</strong> {stream.owner}</span>
                  <span><strong>Due:</strong> {stream.dueDate}</span>
                  <span><strong>Milestone:</strong> {stream.milestone}</span>
                  <span><strong>Dependency:</strong> {stream.dependency}</span>
                  <span><strong>Risk:</strong> {stream.risk}</span>
                  <span><strong>Blocker:</strong> {stream.blocker}</span>
                </div>
                <p className="mt-3 text-sm text-slate-700"><strong>Success criteria:</strong> {stream.criteria}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <GitPullRequest className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Agile Operating Rhythm</h2>
            </div>
            <Pill tone="On Track">Predictability 82%</Pill>
          </div>
          <div className="mb-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
            <strong>Sprint goal:</strong> Clear September readiness blockers and publish the partner workshop follow-up package.
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {backlog.map((item) => (
              <article key={item.title} className="rounded-lg border border-slate-200 p-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold leading-5">{item.title}</h3>
                  <Pill tone={item.status}>{item.status}</Pill>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                  <span>{item.priority}</span>
                  <span>Owner {item.owner}</span>
                  <span>{item.age}d aging</span>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-md bg-slate-50 p-3"><strong>Ceremony notes:</strong> quota escalation reviewed daily.</div>
            <div className="rounded-md bg-slate-50 p-3"><strong>Action items:</strong> 3 due before next checkpoint.</div>
            <div className="rounded-md bg-slate-50 p-3"><strong>Open decisions:</strong> backup tenant and reviewer capacity.</div>
          </div>
        </section>
      </div>

      <div className="mx-auto grid max-w-7xl gap-5 px-4 pb-8 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Partner Workshop Readiness Planner</h2>
          </div>
          <div className="grid gap-3">
            {workshops.map((workshop) => (
              <article key={workshop.name} className="rounded-lg border border-slate-200 p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{workshop.name}</h3>
                      <Pill tone={workshop.risk}>{workshop.risk} risk</Pill>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{workshop.date} | Lead: {workshop.lead}</p>
                  </div>
                  <div className="text-sm font-semibold text-slate-700">{workshop.readiness}% ready</div>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {checklistLabels.map((label, index) => (
                    <div key={label} className="flex items-center gap-2 text-sm">
                      {workshop.checklist[index] ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <AlertTriangle className="h-4 w-4 text-amber-600" />}
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Role Fit Mapping</h2>
          </div>
          <div className="grid gap-2">
            {roleFit.map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-md bg-slate-50 p-3 text-sm text-slate-700">
                <ListChecks className="h-4 w-4 text-blue-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              Continuous improvement loop
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Readiness, blocker aging, workshop risk, and platform health are kept in one operating view so program leaders can steer decisions without waiting for manual status stitching.
            </p>
          </div>
        </section>
      </div>

      <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center text-sm text-slate-500">
        Demo built with synthetic data for portfolio purposes.
        <button type="button" onClick={() => setUpdate('')} className="ml-3 inline-flex items-center gap-1 text-blue-700 hover:text-blue-800">
          <RefreshCw className="h-3.5 w-3.5" />
          Reset update
        </button>
      </footer>
    </main>
  );
}

export default App;
