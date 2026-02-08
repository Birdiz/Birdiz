"use client";

import { useCallback, useMemo, useState } from "react";
import { useIntl } from "react-intl";
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

function DataTable({ title, columns, rows, getKey }) {
  return (
    <div className="table-surface">
      <h4 className="mb-2 text-[var(--accent)]">{title}</h4>
      <table className="w-full border-collapse text-left text-[0.95rem] text-[var(--text-main)]">
        <thead>
          <tr className="border-b border-[var(--line)] text-[var(--accent-strong)]">
            {columns.map((column) => (
              <th key={column.key} className="py-1 pr-2">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getKey(row)} className="border-b border-[rgba(221,190,129,0.08)]">
              {columns.map((column) => (
                <td key={`${getKey(row)}-${column.key}`} className="py-1 pr-2">
                  {row[column.key]}
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
  const intl = useIntl();
  const t = useCallback((id, values) => intl.formatMessage({ id }, values), [intl]);

  const labels = useMemo(
    () => ({
      section: {
        damages: {
          title: t("master.section.damages.title"),
          subtitle: t("master.section.damages.subtitle"),
          empty: t("master.empty.damages"),
          stats: t("master.section.damages.stats", { count: damages.length }),
        },
        transport: {
          title: t("master.section.transport.title"),
          subtitle: t("master.section.transport.subtitle"),
          empty: t("master.empty.transport"),
          statsBoats: t("master.section.transport.stats.boats", {
            count: transport.boats.length,
          }),
          statsMounts: t("master.section.transport.stats.mounts", {
            count: transport.mounts.length,
          }),
          statsEquipment: t("master.section.transport.stats.equipment", {
            count: transport.mountEquipments.length,
          }),
        },
        properties: {
          title: t("master.section.properties.title"),
          subtitle: t("master.section.properties.subtitle"),
          empty: t("master.empty.properties"),
          statsBuildings: t("master.section.properties.stats.buildings", {
            count: properties.buildings.length,
          }),
          statsMaintenance: t("master.section.properties.stats.maintenance", {
            count: properties.maintenance.length,
          }),
        },
        lifestyles: {
          title: t("master.section.lifestyles.title"),
          subtitle: t("master.section.lifestyles.subtitle"),
          empty: t("master.empty.lifestyles"),
          stats: t("master.section.lifestyles.stats", { count: lifestyles.length }),
        },
      },
      state: {
        ready: t("master.state.ready"),
        empty: t("master.state.empty"),
        show: (title) => t("master.card.show", { title }),
      },
      table: {
        boats: t("master.table.boats"),
        mounts: t("master.table.mounts"),
        mountEquipment: t("master.table.mountEquipment"),
        buildings: t("master.table.buildings"),
        maintenance: t("master.table.maintenance"),
        columns: {
          name: t("table.name"),
          price: t("table.price"),
          rent: t("table.rent"),
          charge: t("table.charge"),
          durationDays: t("table.durationDays"),
          dailyCost: t("table.dailyCost"),
          workerUnqualified: t("table.workerUnqualified"),
          workerQualified: t("table.workerQualified"),
        },
      },
    }),
    [damages.length, lifestyles.length, properties, t, transport],
  );

  const sections = useMemo(
    () => [
      {
        id: "damages",
        title: labels.section.damages.title,
        subtitle: labels.section.damages.subtitle,
        icon: SwordsIcon,
        hasData: damages.length > 0,
        stats: [labels.section.damages.stats],
      },
      {
        id: "transport",
        title: labels.section.transport.title,
        subtitle: labels.section.transport.subtitle,
        icon: ShipIcon,
        hasData:
          transport.boats.length > 0 ||
          transport.mounts.length > 0 ||
          transport.mountEquipments.length > 0,
        stats: [
          labels.section.transport.statsBoats,
          labels.section.transport.statsMounts,
          labels.section.transport.statsEquipment,
        ],
      },
      {
        id: "properties",
        title: labels.section.properties.title,
        subtitle: labels.section.properties.subtitle,
        icon: CastleIcon,
        hasData: properties.buildings.length > 0 || properties.maintenance.length > 0,
        stats: [
          labels.section.properties.statsBuildings,
          labels.section.properties.statsMaintenance,
        ],
      },
      {
        id: "lifestyles",
        title: labels.section.lifestyles.title,
        subtitle: labels.section.lifestyles.subtitle,
        icon: TavernIcon,
        hasData: lifestyles.length > 0,
        stats: [labels.section.lifestyles.stats],
      },
    ],
    [damages.length, labels, lifestyles.length, properties, transport],
  );

  const [activeSection, setActiveSection] = useState(() => getInitialSection(sections));

  const nameKey = "name";

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
              aria-label={labels.state.show(section.title)}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[rgba(17,13,10,0.8)] text-[var(--accent)]">
                  <Icon />
                </span>
                <span className="tag-chip">
                  {section.hasData ? labels.state.ready : labels.state.empty}
                </span>
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
        <SectionPanel
          title={labels.section.damages.title}
          subtitle={labels.section.damages.subtitle}
          className="animate-in"
        >
          {damages.length === 0 ? (
            <p className="m-0 leading-[1.7] text-[var(--text-main)]">
              {labels.section.damages.empty}
            </p>
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
        <SectionPanel
          title={labels.section.transport.title}
          subtitle={labels.section.transport.subtitle}
          className="animate-in"
        >
          {!sections.find((section) => section.id === "transport")?.hasData ? (
            <p className="m-0 leading-[1.7] text-[var(--text-main)]">
              {labels.section.transport.empty}
            </p>
          ) : (
            <div className="grid gap-3">
              <DataTable
                title={labels.table.boats}
                columns={[
                  { key: nameKey, label: labels.table.columns.name },
                  { key: "price", label: labels.table.columns.price },
                  { key: "rent", label: labels.table.columns.rent },
                ]}
                rows={transport.boats.map((boat) => ({
                  name: boat.name,
                  price: boat.price,
                  rent: boat.rent,
                }))}
                getKey={(row) => row[nameKey]}
              />

              <DataTable
                title={labels.table.mounts}
                columns={[
                  { key: nameKey, label: labels.table.columns.name },
                  { key: "price", label: labels.table.columns.price },
                  { key: "charge", label: labels.table.columns.charge },
                  { key: "rent", label: labels.table.columns.rent },
                ]}
                rows={transport.mounts.map((mount) => ({
                  name: mount.name,
                  price: mount.price,
                  charge: mount.charge,
                  rent: mount.rent,
                }))}
                getKey={(row) => row[nameKey]}
              />

              <DataTable
                title={labels.table.mountEquipment}
                columns={[
                  { key: nameKey, label: labels.table.columns.name },
                  { key: "price", label: labels.table.columns.price },
                  { key: "charge", label: labels.table.columns.charge },
                ]}
                rows={transport.mountEquipments.map((equipment) => ({
                  name: equipment.name,
                  price: equipment.price,
                  charge: equipment.charge,
                }))}
                getKey={(row) => row[nameKey]}
              />
            </div>
          )}
        </SectionPanel>
      ) : null}

      {activeSection === "properties" ? (
        <SectionPanel
          title={labels.section.properties.title}
          subtitle={labels.section.properties.subtitle}
          className="animate-in"
        >
          {!sections.find((section) => section.id === "properties")?.hasData ? (
            <p className="m-0 leading-[1.7] text-[var(--text-main)]">
              {labels.section.properties.empty}
            </p>
          ) : (
            <div className="grid gap-3">
              <DataTable
                title={labels.table.buildings}
                columns={[
                  { key: nameKey, label: labels.table.columns.name },
                  { key: "price", label: labels.table.columns.price },
                  { key: "rent", label: labels.table.columns.rent },
                  { key: "durationDays", label: labels.table.columns.durationDays },
                ]}
                rows={properties.buildings.map((building) => ({
                  name: building.name,
                  price: building.price,
                  rent: building.rent,
                  durationDays: building.duration,
                }))}
                getKey={(row) => row[nameKey]}
              />

              <DataTable
                title={labels.table.maintenance}
                columns={[
                  { key: nameKey, label: labels.table.columns.name },
                  { key: "dailyCost", label: labels.table.columns.dailyCost },
                  {
                    key: "workerUnqualified",
                    label: labels.table.columns.workerUnqualified,
                  },
                  { key: "workerQualified", label: labels.table.columns.workerQualified },
                ]}
                rows={properties.maintenance.map((maintenance) => ({
                  name: maintenance.name,
                  dailyCost: maintenance.cost,
                  workerUnqualified: maintenance.workerUnqualified,
                  workerQualified: maintenance.workerQualified,
                }))}
                getKey={(row) => row[nameKey]}
              />
            </div>
          )}
        </SectionPanel>
      ) : null}

      {activeSection === "lifestyles" ? (
        <SectionPanel
          title={labels.section.lifestyles.title}
          subtitle={labels.section.lifestyles.subtitle}
          className="animate-in"
        >
          {lifestyles.length === 0 ? (
            <p className="m-0 leading-[1.7] text-[var(--text-main)]">
              {labels.section.lifestyles.empty}
            </p>
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
