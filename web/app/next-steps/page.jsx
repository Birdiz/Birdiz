import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "../../lib/i18n/locales";

export default function RootNextStepsPage() {
  redirect(`/${DEFAULT_LOCALE}/next-steps`);
}
