"use client";

import { FormField } from "@/components/FormField";
import { inputClass, labelClass } from "@/components/styles";
import { useTranslation } from "@/hooks/useTranslation";
import type { PrizeFormData } from "@/lib/prizes/types";

type PrizeFieldsProps = {
  prize: PrizeFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export function PrizeFields({ prize, onChange }: PrizeFieldsProps) {
  const { t } = useTranslation();

  return (
    <>
      <FormField id="prize-name" name="name" label={t("fields.name")} value={prize.name} onChange={onChange} />
      <FormField id="prize-category" name="category" label={t("fields.category")} value={prize.category} onChange={onChange} />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="prize-year"
          name="year"
          label={t("fields.year")}
          type="number"
          min={1900}
          max={2100}
          value={prize.year}
          onChange={onChange}
        />
        <div>
          <label htmlFor="prize-status" className={labelClass}>
            {t("fields.status")}
          </label>
          <select id="prize-status" name="status" value={prize.status} onChange={onChange} required className={inputClass}>
            <option value="won">{t("prize.won")}</option>
            <option value="nominated">{t("prize.nominated")}</option>
          </select>
        </div>
      </div>
    </>
  );
}
