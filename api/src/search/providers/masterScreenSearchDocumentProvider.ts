import {
  masterScreenBoats,
  masterScreenMountEquipments,
  masterScreenMounts,
} from "../../master-screen/data/masterScreenTransport";
import {
  masterScreenBuildings,
  masterScreenMaintenances,
} from "../../master-screen/data/masterScreenBuildings";
import { masterScreenDamages } from "../../master-screen/data/masterScreenDamages";
import { masterScreenLifestyles } from "../../master-screen/data/masterScreenLifestyles";
import type { SupportedLocale } from "../../master-screen/utils/locale";
import type { SearchDocument, SearchDocumentProvider } from "../types/searchTypes";

function toAnchor(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sectionTitle(section: "damages" | "transport" | "properties" | "lifestyles"): string {
  switch (section) {
    case "damages":
      return "Damages";
    case "transport":
      return "Transport";
    case "properties":
      return "Properties";
    default:
      return "Lifestyles";
  }
}

export class MasterScreenSearchDocumentProvider implements SearchDocumentProvider {
  async getDocuments(locale: SupportedLocale): Promise<SearchDocument[]> {
    const baseHref = `/${locale}/master-screen`;
    const documents: SearchDocument[] = [];

    for (const damage of masterScreenDamages) {
      const examples = locale === "en" ? damage.examplesEn : damage.examplesFr;
      documents.push({
        id: `damage-${damage.die}-${locale}`,
        locale,
        module: "master-screen",
        section: "damages",
        entityType: "damage",
        title: damage.die,
        body: examples.join(" "),
        keywords: [sectionTitle("damages"), "dice", "damage"],
        href: `${baseHref}?section=damages`,
        anchor: toAnchor(damage.die),
        weight: 100,
        metadata: { die: damage.die },
      });
    }

    for (const boat of masterScreenBoats) {
      documents.push({
        id: `boat-${toAnchor(boat.name)}-${locale}`,
        locale,
        module: "master-screen",
        section: "transport",
        entityType: "boat",
        title: boat.name,
        body: `${boat.price} ${boat.rent}`,
        keywords: [sectionTitle("transport"), "boat", "rent", "price"],
        href: `${baseHref}?section=transport`,
        anchor: toAnchor(boat.name),
        weight: 80,
        metadata: { price: boat.price, rent: boat.rent },
      });
    }

    for (const mount of masterScreenMounts) {
      documents.push({
        id: `mount-${toAnchor(mount.name)}-${locale}`,
        locale,
        module: "master-screen",
        section: "transport",
        entityType: "mount",
        title: mount.name,
        body: `${mount.price} ${mount.rent} ${mount.charge}`,
        keywords: [sectionTitle("transport"), "mount", "rent", "price", "charge"],
        href: `${baseHref}?section=transport`,
        anchor: toAnchor(mount.name),
        weight: 80,
        metadata: { price: mount.price, rent: mount.rent, charge: mount.charge },
      });
    }

    for (const equipment of masterScreenMountEquipments) {
      documents.push({
        id: `mount-equipment-${toAnchor(equipment.name)}-${locale}`,
        locale,
        module: "master-screen",
        section: "transport",
        entityType: "mount-equipment",
        title: equipment.name,
        body: `${equipment.price} ${equipment.charge}`,
        keywords: [sectionTitle("transport"), "mount equipment", "price", "charge"],
        href: `${baseHref}?section=transport`,
        anchor: toAnchor(equipment.name),
        weight: 75,
        metadata: { price: equipment.price, charge: equipment.charge },
      });
    }

    for (const building of masterScreenBuildings) {
      documents.push({
        id: `building-${toAnchor(building.name)}-${locale}`,
        locale,
        module: "master-screen",
        section: "properties",
        entityType: "building",
        title: building.name,
        body: `${building.price} ${building.rent} ${building.duration}`,
        keywords: [sectionTitle("properties"), "building", "price", "rent"],
        href: `${baseHref}?section=properties`,
        anchor: toAnchor(building.name),
        weight: 80,
        metadata: {
          price: building.price,
          rent: building.rent,
          duration: building.duration,
        },
      });
    }

    for (const maintenance of masterScreenMaintenances) {
      documents.push({
        id: `maintenance-${toAnchor(maintenance.name)}-${locale}`,
        locale,
        module: "master-screen",
        section: "properties",
        entityType: "maintenance",
        title: maintenance.name,
        body: `${maintenance.cost} ${maintenance.workerUnqualified} ${maintenance.workerQualified}`,
        keywords: [sectionTitle("properties"), "maintenance", "cost", "workers"],
        href: `${baseHref}?section=properties`,
        anchor: toAnchor(maintenance.name),
        weight: 70,
        metadata: {
          cost: maintenance.cost,
          workerUnqualified: maintenance.workerUnqualified,
          workerQualified: maintenance.workerQualified,
        },
      });
    }

    for (const lifestyle of masterScreenLifestyles) {
      documents.push({
        id: `lifestyle-${toAnchor(lifestyle.name)}-${locale}`,
        locale,
        module: "master-screen",
        section: "lifestyles",
        entityType: "lifestyle",
        title: lifestyle.name,
        body: `${lifestyle.price} ${lifestyle.description}`,
        keywords: [sectionTitle("lifestyles"), "lifestyle", "price"],
        href: `${baseHref}?section=lifestyles`,
        anchor: toAnchor(lifestyle.name),
        weight: 85,
        metadata: { price: lifestyle.price },
      });

      for (const service of lifestyle.services) {
        documents.push({
          id: `service-${toAnchor(lifestyle.name)}-${toAnchor(service.name)}-${locale}`,
          locale,
          module: "master-screen",
          section: "lifestyles",
          entityType: "service",
          title: service.name,
          body: `${service.price} ${lifestyle.name}`,
          keywords: [sectionTitle("lifestyles"), "service", lifestyle.name],
          href: `${baseHref}?section=lifestyles`,
          anchor: toAnchor(lifestyle.name),
          weight: 65,
          metadata: {
            price: service.price,
            lifestyle: lifestyle.name,
          },
        });
      }
    }

    return documents;
  }
}
