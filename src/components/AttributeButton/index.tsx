import { useState } from "react";
import Button from "../Button";
import AttributeVariant, { AttributeVariantProps } from "../AttributeVariant";
import Plus from "@/icons/Plus";

export type AttributeButtonProps = {};

const EMPTY_ATTRIBUTE = {
  title: "",
  fieldName: "",
};

const AttributeButton = () => {
  const [attributes, setAttributes] = useState<AttributeVariantProps[]>([]);

  const handleAddAttribute = () => {
    setAttributes((prev) => [...prev, EMPTY_ATTRIBUTE]);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        {attributes.map((attribute, idx) => (
          <AttributeVariant
            key={idx}
            {...attribute}
            fieldName={`attribute-${idx}`}
          />
        ))}
        <Button
          onClick={() => handleAddAttribute()}
          className="flex items-center w-fit"
          type="button"
        >
          <Plus className="h-4 w-4 mr-1" /> Adicionar opção
        </Button>
      </div>
    </>
  );
};
export default AttributeButton;
