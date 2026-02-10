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
import { localizeCurrencyUnits } from "../../master-screen/utils/currency";
import type { SupportedLocale } from "../../master-screen/utils/locale";
import type { SearchDocument, SearchDocumentProvider } from "../types/searchTypes";

const SECTION_TITLES: Record<
  SupportedLocale,
  Record<"damages" | "transport" | "properties" | "lifestyles", string>
> = {
  en: {
    damages: "Damages",
    transport: "Transport",
    properties: "Properties",
    lifestyles: "Lifestyles",
  },
  fr: {
    damages: "Dégâts",
    transport: "Transport",
    properties: "Propriétés",
    lifestyles: "Modes de vie",
  },
};

function toAnchor(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sectionTitle(
  locale: SupportedLocale,
  section: "damages" | "transport" | "properties" | "lifestyles",
): string {
  return SECTION_TITLES[locale][section];
}

function getLocalizedText(
  locale: SupportedLocale,
  options: { defaultValue?: string; valueEn?: string; valueFr?: string },
): string {
  if (locale === "en") {
    return options.valueEn ?? options.defaultValue ?? options.valueFr ?? "";
  }

  return options.valueFr ?? options.defaultValue ?? options.valueEn ?? "";
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
        keywords: [sectionTitle(locale, "damages"), "dice", "damage"],
        href: `${baseHref}?section=damages`,
        anchor: toAnchor(damage.die),
        weight: 100,
        metadata: { die: damage.die },
      });
    }

    for (const boat of masterScreenBoats) {
      const boatName = getLocalizedText(locale, {
        defaultValue: boat.name,
        valueEn: boat.nameEn,
        valueFr: boat.nameFr,
      });

      documents.push({
        id: `boat-${toAnchor(boatName)}-${locale}`,
        locale,
        module: "master-screen",
        section: "transport",
        entityType: "boat",
        title: boatName,
        body: `${localizeCurrencyUnits(boat.price, locale)} ${localizeCurrencyUnits(boat.rent, locale)}`,
        keywords: [sectionTitle(locale, "transport"), "boat", "rent", "price"],
        href: `${baseHref}?section=transport`,
        anchor: toAnchor(boatName),
        weight: 80,
        metadata: {
          price: localizeCurrencyUnits(boat.price, locale),
          rent: localizeCurrencyUnits(boat.rent, locale),
        },
      });
    }

    for (const mount of masterScreenMounts) {
      const mountName = getLocalizedText(locale, {
        defaultValue: mount.name,
        valueEn: mount.nameEn,
        valueFr: mount.nameFr,
      });

      documents.push({
        id: `mount-${toAnchor(mountName)}-${locale}`,
        locale,
        module: "master-screen",
        section: "transport",
        entityType: "mount",
        title: mountName,
        body: `${localizeCurrencyUnits(mount.price, locale)} ${localizeCurrencyUnits(mount.rent, locale)} ${mount.charge}`,
        keywords: [sectionTitle(locale, "transport"), "mount", "rent", "price", "charge"],
        href: `${baseHref}?section=transport`,
        anchor: toAnchor(mountName),
        weight: 80,
        metadata: {
          price: localizeCurrencyUnits(mount.price, locale),
          rent: localizeCurrencyUnits(mount.rent, locale),
          charge: mount.charge,
        },
      });
    }

    for (const equipment of masterScreenMountEquipments) {
      const equipmentName = getLocalizedText(locale, {
        defaultValue: equipment.name,
        valueEn: equipment.nameEn,
        valueFr: equipment.nameFr,
      });

      documents.push({
        id: `mount-equipment-${toAnchor(equipmentName)}-${locale}`,
        locale,
        module: "master-screen",
        section: "transport",
        entityType: "mount-equipment",
        title: equipmentName,
        body: `${localizeCurrencyUnits(equipment.price, locale)} ${equipment.charge}`,
        keywords: [sectionTitle(locale, "transport"), "mount equipment", "price", "charge"],
        href: `${baseHref}?section=transport`,
        anchor: toAnchor(equipmentName),
        weight: 75,
        metadata: {
          price: localizeCurrencyUnits(equipment.price, locale),
          charge: equipment.charge,
        },
      });
    }

    for (const building of masterScreenBuildings) {
      const buildingName = getLocalizedText(locale, {
        defaultValue: building.name,
        valueEn: building.nameEn,
        valueFr: building.nameFr,
      });

      documents.push({
        id: `building-${toAnchor(buildingName)}-${locale}`,
        locale,
        module: "master-screen",
        section: "properties",
        entityType: "building",
        title: buildingName,
        body: `${localizeCurrencyUnits(building.price, locale)} ${localizeCurrencyUnits(building.rent, locale)} ${building.duration}`,
        keywords: [sectionTitle(locale, "properties"), "building", "price", "rent"],
        href: `${baseHref}?section=properties`,
        anchor: toAnchor(buildingName),
        weight: 80,
        metadata: {
          price: localizeCurrencyUnits(building.price, locale),
          rent: localizeCurrencyUnits(building.rent, locale),
          duration: building.duration,
        },
      });
    }

    for (const maintenance of masterScreenMaintenances) {
      const maintenanceName = getLocalizedText(locale, {
        defaultValue: maintenance.name,
        valueEn: maintenance.nameEn,
        valueFr: maintenance.nameFr,
      });

      documents.push({
        id: `maintenance-${toAnchor(maintenanceName)}-${locale}`,
        locale,
        module: "master-screen",
        section: "properties",
        entityType: "maintenance",
        title: maintenanceName,
        body: `${localizeCurrencyUnits(maintenance.cost, locale)} ${maintenance.workerUnqualified} ${maintenance.workerQualified}`,
        keywords: [sectionTitle(locale, "properties"), "maintenance", "cost", "workers"],
        href: `${baseHref}?section=properties`,
        anchor: toAnchor(maintenanceName),
        weight: 70,
        metadata: {
          cost: localizeCurrencyUnits(maintenance.cost, locale),
          workerUnqualified: maintenance.workerUnqualified,
          workerQualified: maintenance.workerQualified,
        },
      });
    }

    for (const lifestyle of masterScreenLifestyles) {
      const lifestyleName = getLocalizedText(locale, {
        defaultValue: lifestyle.name,
        valueEn: lifestyle.nameEn,
        valueFr: lifestyle.nameFr,
      });
      const lifestyleDescription = getLocalizedText(locale, {
        defaultValue: lifestyle.description,
        valueEn: lifestyle.descriptionEn,
        valueFr: lifestyle.descriptionFr,
      });

      documents.push({
        id: `lifestyle-${toAnchor(lifestyleName)}-${locale}`,
        locale,
        module: "master-screen",
        section: "lifestyles",
        entityType: "lifestyle",
        title: lifestyleName,
        body: `${localizeCurrencyUnits(lifestyle.price, locale)} ${lifestyleDescription}`,
        keywords: [sectionTitle(locale, "lifestyles"), "lifestyle", "price"],
        href: `${baseHref}?section=lifestyles`,
        anchor: toAnchor(lifestyleName),
        weight: 85,
        metadata: { price: localizeCurrencyUnits(lifestyle.price, locale) },
      });

      for (const service of lifestyle.services) {
        const serviceName = getLocalizedText(locale, {
          defaultValue: service.name,
          valueEn: service.nameEn,
          valueFr: service.nameFr,
        });

        documents.push({
          id: `service-${toAnchor(lifestyleName)}-${toAnchor(serviceName)}-${locale}`,
          locale,
          module: "master-screen",
          section: "lifestyles",
          entityType: "service",
          title: serviceName,
          body: `${localizeCurrencyUnits(service.price, locale)} ${lifestyleName}`,
          keywords: [sectionTitle(locale, "lifestyles"), "service", lifestyleName],
          href: `${baseHref}?section=lifestyles`,
          anchor: toAnchor(lifestyleName),
          weight: 65,
          metadata: {
            price: localizeCurrencyUnits(service.price, locale),
            lifestyle: lifestyleName,
          },
        });
      }
    }

    return documents;
  }
}
