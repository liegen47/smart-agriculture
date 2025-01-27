import { notFound } from "next/navigation";
import FieldForm from "./field-form";
import { getDataById } from "@/lib/server-side-axios";
import { Field } from "@/constant/data";

type TFieldViewPageProps = {
  fieldId: string;
};

export default async function FieldViewPage({ fieldId }: TFieldViewPageProps) {
  let field = null;
  let pageTitle = "Create New Field";

  if (fieldId !== "new") {
    field = await getDataById<Field>("fields", fieldId);

    if (!field) {
      notFound();
    }
    pageTitle = `Edit Field - ${field.name}`;
  }

  return (
    <FieldForm
      initialData={field}
      pageTitle={pageTitle}
      mode={field ? (field._id ? "edit" : "create") : "create"}
    />
  );
}
