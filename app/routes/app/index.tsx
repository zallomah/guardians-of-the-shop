import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();

  return (
    <s-page heading={t("app.title")}>
      <s-button variant="primary" slot="primary-action">
        {t("app.settings")}
      </s-button>
    </s-page>
  );
}
