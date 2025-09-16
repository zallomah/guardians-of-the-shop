import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();

  return (
    <s-page>
      <ui-title-bar title={t("app.title")}>
        <button variant="primary">{t("app.settings")}</button>
      </ui-title-bar>
    </s-page>
  );
}
