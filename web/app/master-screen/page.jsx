import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "../../lib/i18n/locales";

export default function RootMasterScreenPage() {
  redirect(`/${DEFAULT_LOCALE}/master-screen`);
}
