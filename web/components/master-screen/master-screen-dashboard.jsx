"use client";

import { useMemo, useState } from "react";
import SectionPanel from "../ui/section-panel";

function SwordsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M4 20l6-6m0 0L6 6l2-2 8 8m-6 2l2 2m8-10l-8 8m0 0-2-2m2 2l6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShipIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M3 16c2 1.4 4 1.4 6 0 2 1.4 4 1.4 6 0 2 1.4 4 1.4 6 0M7 13h10l-1-6H8l-1 6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CastleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M4 20V8h4V6h2v2h4V6h2v2h4v12H4zm4-6h2v6H8v-6zm6 0h2v6h-2v-6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TavernIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M5 4h14v3l-5 5v5a3 3 0 11-4 0v-5L5 7V4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DataTable({ title, headers, rows, getKey }) {
  return (
    <div className="table-surface">
      <h4 className="mb-2 text-[var(--accent)]">{title}</h4>
      <table className="w-full border-collapse text-left text-[0.95rem] text-[var(--text-main)]">
        <thead>
          <tr className="border-b border-[var(--line)] text-[var(--accent-strong)]">
            {headers.map((header) => (
              <th key={header} className="py-1 pr-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getKey(row)} className="border-b border-[rgba(221,190,129,0.08)]">
              {Object.values(row).map((value, index) => (
                <td key={`${getKey(row)}-${index}`} className="py-1 pr-2">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getInitialSection(sections) {
  const firstWithData = sections.find((section) => section.hasData);
  return firstWithData ? firstWithData.id : sections[0]?.id;
}

export default function MasterScreenDashboard({ damages, transport, properties, lifestyles }) {
  const sections = useMemo(
    () => [
      {
        id: "damages",
        title: "Damages",
        subtitle: "Impact calibration",
        icon: SwordsIcon,
        hasData: damages.length > 0,
        stats: [`${damages.length} dice bands`],
      },
      {
        id: "transport",
        title: "Transport",
        subtitle: "Travel logistics",
        icon: ShipIcon,
        hasData:
          transport.boats.length > 0 ||
          transport.mounts.length > 0 ||
          transport.mountEquipments.length > 0,
        stats: [
          `${transport.boats.length} boats`,
          `${transport.mounts.length} mounts`,
          `${transport.mountEquipments.length} equipment`,
        ],
      },
      {
        id: "properties",
        title: "Properties And Maintenance",
        subtitle: "Long-term economy",
        icon: CastleIcon,
        hasData: properties.buildings.length > 0 || properties.maintenance.length > 0,
        stats: [
          `${properties.buildings.length} buildings`,
          `${properties.maintenance.length} maintenance rows`,
        ],
      },
      {
        id: "lifestyles",
        title: "Lifestyles",
        subtitle: "Roleplay and service costs",
        icon: TavernIcon,
        hasData: lifestyles.length > 0,
        stats: [`${lifestyles.length} tiers`],
      },
    ],
    [damages, transport, properties, lifestyles],
  );

  const [activeSection, setActiveSection] = useState(() => getInitialSection(sections));

  return (
    <>
      <section className="mb-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id)}
              className={`tool-card p-4 text-left ${isActive ? "border-[var(--line-strong)]" : ""}`}
              aria-pressed={isActive}
              aria-label={`Show ${section.title}`}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[rgba(17,13,10,0.8)] text-[var(--accent)]">
                  <Icon />
                </span>
                <span className="tag-chip">{section.hasData ? "Ready" : "Empty"}</span>
              </div>
              <h3 className="m-0 text-[1rem] text-[var(--text-main)]">{section.title}</h3>
              <p className="mt-1 mb-0 text-sm text-[var(--text-muted)]">{section.subtitle}</p>
              <ul className="mt-3 flex flex-wrap gap-2 p-0">
                {section.stats.map((stat) => (
                  <li key={stat} className="info-pill list-none">
                    {stat}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </section>

      {activeSection === "damages" ? (
        <SectionPanel title="Damages" subtitle="Impact calibration" className="animate-in">
          {damages.length === 0 ? (
            <p className="m-0 leading-[1.7] text-[var(--text-main)]">No damages found yet.</p>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
              {damages.map((damage) => (
                <article
                  key={damage.die}
                  className="rounded-xl border border-[var(--line)] bg-[rgba(14,11,8,0.68)] px-4 py-3"
                >
                  <h4 className="mb-2 text-[1.05rem] text-[var(--accent)]">{damage.die}</h4>
                  <ul className="m-0 list-none p-0 leading-[1.7] text-[var(--text-main)]">
                    {damage.examples.map((example) => (
                      <li
                        key={example}
                        className="relative pl-6 before:absolute before:top-0 before:left-0 before:text-[0.78rem] before:text-[var(--accent-soft)] before:content-['⚔']"
                      >
                        {example}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          )}
        </SectionPanel>
      ) : null}

      {activeSection === "transport" ? (
        <SectionPanel title="Transport" subtitle="Travel logistics" className="animate-in">
          {!sections.find((section) => section.id === "transport")?.hasData ? (
            <p className="m-0 leading-[1.7] text-[var(--text-main)]">No transport data found yet.</p>
          ) : (
            <div className="grid gap-3">
              <DataTable
                title="Boats"
                headers={["Name", "Price", "Rent"]}
                rows={transport.boats.map((boat) => ({
                  Name: boat.name,
                  Price: boat.price,
                  Rent: boat.rent,
                }))}
                getKey={(row) => row.Name}
              />

              <DataTable
                title="Mounts"
                headers={["Name", "Price", "Charge", "Rent"]}
                rows={transport.mounts.map((mount) => ({
                  Name: mount.name,
                  Price: mount.price,
                  Charge: mount.charge,
                  Rent: mount.rent,
                }))}
                getKey={(row) => row.Name}
              />

              <DataTable
                title="Mount Equipment"
                headers={["Name", "Price", "Charge"]}
                rows={transport.mountEquipments.map((equipment) => ({
                  Name: equipment.name,
                  Price: equipment.price,
                  Charge: equipment.charge,
                }))}
                getKey={(row) => row.Name}
              />
            </div>
          )}
        </SectionPanel>
      ) : null}

      {activeSection === "properties" ? (
        <SectionPanel
          title="Properties And Maintenance"
          subtitle="Long-term economy"
          className="animate-in"
        >
          {!sections.find((section) => section.id === "properties")?.hasData ? (
            <p className="m-0 leading-[1.7] text-[var(--text-main)]">
              No building and maintenance data found yet.
            </p>
          ) : (
            <div className="grid gap-3">
              <DataTable
                title="Buildings"
                headers={["Name", "Price", "Rent", "Duration (days)"]}
                rows={properties.buildings.map((building) => ({
                  Name: building.name,
                  Price: building.price,
                  Rent: building.rent,
                  "Duration (days)": building.duration,
                }))}
                getKey={(row) => row.Name}
              />

              <DataTable
                title="Maintenance"
                headers={[
                  "Name",
                  "Daily Cost",
                  "Unqualified Worker",
                  "Qualified Worker",
                ]}
                rows={properties.maintenance.map((maintenance) => ({
                  Name: maintenance.name,
                  "Daily Cost": maintenance.cost,
                  "Unqualified Worker": maintenance.workerUnqualified,
                  "Qualified Worker": maintenance.workerQualified,
                }))}
                getKey={(row) => row.Name}
              />
            </div>
          )}
        </SectionPanel>
      ) : null}

      {activeSection === "lifestyles" ? (
        <SectionPanel title="Lifestyles" subtitle="Roleplay and service costs" className="animate-in">
          {lifestyles.length === 0 ? (
            <p className="m-0 leading-[1.7] text-[var(--text-main)]">No lifestyles found yet.</p>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3">
              {lifestyles.map((lifestyle) => (
                <article
                  key={lifestyle.name}
                  className="rounded-xl border border-[var(--line)] bg-[rgba(14,11,8,0.68)] px-4 py-3"
                >
                  <h4 className="mb-1 text-[var(--accent)]">{lifestyle.name}</h4>
                  <p className="m-0 mb-2 text-[var(--accent-soft)]">{lifestyle.price}</p>
                  <p className="m-0 mb-2 leading-[1.6] text-[var(--text-main)]">
                    {lifestyle.description}
                  </p>
                  {lifestyle.services.length > 0 && (
                    <ul className="m-0 list-none p-0 text-[var(--text-main)]">
                      {lifestyle.services.map((service) => (
                        <li
                          key={`${lifestyle.name}-${service.name}`}
                          className="mb-1 flex items-center justify-between gap-2"
                        >
                          <span>{service.name}</span>
                          <span className="text-[var(--accent-soft)]">{service.price}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          )}
        </SectionPanel>
      ) : null}
    </>
  );
}
