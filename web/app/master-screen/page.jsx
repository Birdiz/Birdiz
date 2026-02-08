import HomeShell from "../../components/home-shell";
import PageHero from "../../components/ui/page-hero";
import SectionPanel from "../../components/ui/section-panel";
import { homeContent } from "../../lib/homeContent";
import {
  getMasterScreenDamages,
  getMasterScreenLifestyles,
  getMasterScreenProperties,
  getMasterScreenTransport,
} from "../../lib/masterScreenData";

function hasTransportData(transport) {
  return (
    transport.boats.length > 0 ||
    transport.mounts.length > 0 ||
    transport.mountEquipments.length > 0
  );
}

function hasPropertiesData(properties) {
  return properties.buildings.length > 0 || properties.maintenance.length > 0;
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

export default async function MasterScreenPage() {
  const [damages, transport, properties, lifestyles] = await Promise.all([
    getMasterScreenDamages(),
    getMasterScreenTransport(),
    getMasterScreenProperties(),
    getMasterScreenLifestyles(),
  ]);

  return (
    <HomeShell content={homeContent}>
      <PageHero
        eyebrow="Master Screen"
        title="In-session references for high-velocity decisions"
        description="This screen groups practical economics and world interaction references so DMs and players can keep momentum while resolving outcomes."
        badges={["Combat support", "Travel and economy", "Roleplay pacing"]}
        art="Open this during play as a shared reference layer: damages, transport options, properties, and lifestyle costs."
      />

      <SectionPanel title="Damages" subtitle="Impact calibration">
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

      <SectionPanel title="Transport" subtitle="Travel logistics">
        {!hasTransportData(transport) ? (
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

      <SectionPanel title="Properties And Maintenance" subtitle="Long-term economy">
        {!hasPropertiesData(properties) ? (
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

      <SectionPanel title="Lifestyles" subtitle="Roleplay and service costs">
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
    </HomeShell>
  );
}
