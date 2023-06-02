import React from "react";

type FieldDetailProps = {
  label: string;
  description: string | boolean;
  descriptionHoleType: string | boolean;
  descriptionPosition: string | boolean;
  descriptionDiameter: string | boolean;
  line: boolean;
};

function FieldDetail(props: FieldDetailProps) {
  const label = props.label;
  const description = props.description;
  const descriptionHoleType = props.descriptionHoleType;
  const descriptionPosition = props.descriptionPosition;
  const descriptionDiameter = props.descriptionDiameter;
  const line = props.line;

  return (
    <div className="justify-between m-4 text-center flex-col">
      <p>{label}</p>
      <p className="text-mainOrange text-lg font-bold">{description}</p>

      <p className="text-mainOrange text-lg font-bold">{descriptionDiameter}</p>

      <p className="text-mainOrange text-lg font-bold">{descriptionHoleType}</p>
      <p className="text-mainOrange text-lg font-bold">{descriptionPosition}</p>
      {line && (
        <hr className="w-24 h-0.5 mx-auto my-2 bg-mainOrange border-0 rounded dark:bg-gray-700" />
      )}
    </div>
  );
}

export default FieldDetail;
