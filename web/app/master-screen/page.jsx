import HomeShell from "../../components/home-shell";
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

export default async function MasterScreenPage() {
  const [damages, transport, properties, lifestyles] = await Promise.all([
    getMasterScreenDamages(),
    getMasterScreenTransport(),
    getMasterScreenProperties(),
    getMasterScreenLifestyles(),
  ]);

  return (
    <HomeShell content={homeContent}>
      <section className="mb-4 rounded-[14px] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(199,154,74,0.06),transparent_30%),rgba(27,23,18,0.7)] px-5 py-5 last:mb-0">
        <h2
          className="mb-3 flex items-center gap-2 text-[1.3rem] tracking-[0.02em] text-[var(--accent)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="text-[0.95rem] text-[var(--accent-soft)]">✧</span>
          Master Screen
        </h2>

        <h3
          className="mb-2 text-[1.05rem] text-[var(--accent)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Damages
        </h3>

        {damages.length === 0 ? (
          <p className="m-0 mb-6 leading-[1.7] text-[var(--text-main)]">No damages found yet.</p>
        ) : (
          <div className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
            {damages.map((damage) => (
              <article
                key={damage.die}
                className="rounded-xl border border-[var(--line)] bg-[rgba(15,13,11,0.48)] px-4 py-3"
              >
                <h4
                  className="mb-2 text-[1.05rem] text-[var(--accent)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {damage.die}
                </h4>
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

        <h3
          className="mb-2 text-[1.05rem] text-[var(--accent)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Transport
        </h3>
        {!hasTransportData(transport) ? (
          <p className="m-0 mb-6 leading-[1.7] text-[var(--text-main)]">
            No transport data found yet.
          </p>
        ) : (
          <div className="mb-6 grid gap-3">
            <div className="overflow-x-auto rounded-xl border border-[var(--line)] bg-[rgba(15,13,11,0.48)] p-3">
              <h4 className="mb-2 text-[var(--accent)]">Boats</h4>
              <table className="w-full border-collapse text-left text-[0.95rem] text-[var(--text-main)]">
                <thead>
                  <tr className="border-b border-[var(--line)] text-[var(--accent-soft)]">
                    <th className="py-1 pr-2">Name</th>
                    <th className="py-1 pr-2">Price</th>
                    <th className="py-1">Rent</th>
                  </tr>
                </thead>
                <tbody>
                  {transport.boats.map((boat) => (
                    <tr key={boat.name} className="border-b border-[rgba(221,190,129,0.08)]">
                      <td className="py-1 pr-2">{boat.name}</td>
                      <td className="py-1 pr-2">{boat.price}</td>
                      <td className="py-1">{boat.rent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[var(--line)] bg-[rgba(15,13,11,0.48)] p-3">
              <h4 className="mb-2 text-[var(--accent)]">Mounts</h4>
              <table className="w-full border-collapse text-left text-[0.95rem] text-[var(--text-main)]">
                <thead>
                  <tr className="border-b border-[var(--line)] text-[var(--accent-soft)]">
                    <th className="py-1 pr-2">Name</th>
                    <th className="py-1 pr-2">Price</th>
                    <th className="py-1 pr-2">Charge</th>
                    <th className="py-1">Rent</th>
                  </tr>
                </thead>
                <tbody>
                  {transport.mounts.map((mount) => (
                    <tr key={mount.name} className="border-b border-[rgba(221,190,129,0.08)]">
                      <td className="py-1 pr-2">{mount.name}</td>
                      <td className="py-1 pr-2">{mount.price}</td>
                      <td className="py-1 pr-2">{mount.charge}</td>
                      <td className="py-1">{mount.rent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[var(--line)] bg-[rgba(15,13,11,0.48)] p-3">
              <h4 className="mb-2 text-[var(--accent)]">Mount Equipment</h4>
              <table className="w-full border-collapse text-left text-[0.95rem] text-[var(--text-main)]">
                <thead>
                  <tr className="border-b border-[var(--line)] text-[var(--accent-soft)]">
                    <th className="py-1 pr-2">Name</th>
                    <th className="py-1 pr-2">Price</th>
                    <th className="py-1">Charge</th>
                  </tr>
                </thead>
                <tbody>
                  {transport.mountEquipments.map((equipment) => (
                    <tr
                      key={equipment.name}
                      className="border-b border-[rgba(221,190,129,0.08)]"
                    >
                      <td className="py-1 pr-2">{equipment.name}</td>
                      <td className="py-1 pr-2">{equipment.price}</td>
                      <td className="py-1">{equipment.charge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <h3
          className="mb-2 text-[1.05rem] text-[var(--accent)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Properties And Maintenance
        </h3>
        {!hasPropertiesData(properties) ? (
          <p className="m-0 mb-6 leading-[1.7] text-[var(--text-main)]">
            No building and maintenance data found yet.
          </p>
        ) : (
          <div className="mb-6 grid gap-3">
            <div className="overflow-x-auto rounded-xl border border-[var(--line)] bg-[rgba(15,13,11,0.48)] p-3">
              <h4 className="mb-2 text-[var(--accent)]">Buildings</h4>
              <table className="w-full border-collapse text-left text-[0.95rem] text-[var(--text-main)]">
                <thead>
                  <tr className="border-b border-[var(--line)] text-[var(--accent-soft)]">
                    <th className="py-1 pr-2">Name</th>
                    <th className="py-1 pr-2">Price</th>
                    <th className="py-1 pr-2">Rent</th>
                    <th className="py-1">Duration (days)</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.buildings.map((building) => (
                    <tr key={building.name} className="border-b border-[rgba(221,190,129,0.08)]">
                      <td className="py-1 pr-2">{building.name}</td>
                      <td className="py-1 pr-2">{building.price}</td>
                      <td className="py-1 pr-2">{building.rent}</td>
                      <td className="py-1">{building.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[var(--line)] bg-[rgba(15,13,11,0.48)] p-3">
              <h4 className="mb-2 text-[var(--accent)]">Maintenance</h4>
              <table className="w-full border-collapse text-left text-[0.95rem] text-[var(--text-main)]">
                <thead>
                  <tr className="border-b border-[var(--line)] text-[var(--accent-soft)]">
                    <th className="py-1 pr-2">Name</th>
                    <th className="py-1 pr-2">Daily Cost</th>
                    <th className="py-1 pr-2">Unqualified Worker</th>
                    <th className="py-1">Qualified Worker</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.maintenance.map((maintenance) => (
                    <tr
                      key={maintenance.name}
                      className="border-b border-[rgba(221,190,129,0.08)]"
                    >
                      <td className="py-1 pr-2">{maintenance.name}</td>
                      <td className="py-1 pr-2">{maintenance.cost}</td>
                      <td className="py-1 pr-2">{maintenance.workerUnqualified}</td>
                      <td className="py-1">{maintenance.workerQualified}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <h3
          className="mb-2 text-[1.05rem] text-[var(--accent)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Lifestyles
        </h3>
        {lifestyles.length === 0 ? (
          <p className="m-0 leading-[1.7] text-[var(--text-main)]">No lifestyles found yet.</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3">
            {lifestyles.map((lifestyle) => (
              <article
                key={lifestyle.name}
                className="rounded-xl border border-[var(--line)] bg-[rgba(15,13,11,0.48)] px-4 py-3"
              >
                <h4 className="mb-1 text-[var(--accent)]">{lifestyle.name}</h4>
                <p className="m-0 mb-2 text-[var(--accent-soft)]">{lifestyle.price}</p>
                <p className="m-0 mb-2 leading-[1.6] text-[var(--text-main)]">{lifestyle.description}</p>
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
      </section>
    </HomeShell>
  );
}
