import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  CreateTermoblockItemInput,
  createTermoblockItemSchema,
} from "../schema/termoblockItem.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import PriceFooter from "./PriceFooter";
import useShoppingCart from "../hooks/useShoppingCart";
import { holeTypes, stringPositions } from "../schema/termoblockHole.schema";
import { colors, plColors } from "../schema/color.schema";
import { hinges, plHinges } from "../schema/hinge.schema";
import Summary from "./Summary";

const TermoblockForm = () => {
  const [isSummaryVisible, setIsSummaryVisible] = useState<boolean>(true);
  const summaryRef = useRef<HTMLDivElement>(null);
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateTermoblockItemInput>({
    resolver:
      createTermoblockItemSchema && zodResolver(createTermoblockItemSchema),
  });

  function onSubmit(values: CreateTermoblockItemInput) {
    addItem({
      id: 1,
      name: "TB",
      price: 35.0,
      quantity: 1,
      details: values,
    });
  }

  const firstHoleType = watch("firstHole.holeType");
  const hasSecondHole = watch("hasSecondHole");
  const secondHoleType = watch("secondHole.holeType");
  const hasPowerCordHole = watch("hasPowerCordHole");
  const termoblock = watch();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Określa, kiedy komponent Summary jest uważany za widoczny
    };

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        setIsSummaryVisible(!entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(callback, options);
    if (summaryRef.current) {
      observer.observe(summaryRef.current);
    }

    return () => {
      if (summaryRef.current) {
        observer.unobserve(summaryRef.current);
      }
    };
  }, []);

  return (
    <>
      <form className="min-h-screen mt-20" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <InputField
            label="Szerokość"
            error={errors.width}
            type="number"
            registration={register("width", { valueAsNumber: true })}
          ></InputField>
        </div>
        <div className="mb-4">
          <InputField
            label="Wysokość"
            error={errors.height}
            type="number"
            registration={register("height", { valueAsNumber: true })}
          ></InputField>
        </div>
        <div className="mb-4">
          <InputField
            label="Felc"
            error={errors.felc}
            type="number"
            registration={register("felc", { valueAsNumber: true })}
          ></InputField>
        </div>
        <div className="mb-4">
          <SelectField
            options={colors.map((color) => {
              return {
                value: color,
                label: plColors[color],
              };
            })}
            label="Kolor"
            error={errors.color}
            registration={register("color")}
          ></SelectField>
        </div>
        <div className="mb-4">
          <SelectField
            options={hinges.map((hinge) => {
              return {
                value: hinge,
                label: plHinges[hinge],
              };
            })}
            label="Zawiasy"
            error={errors.hinges}
            registration={register("hinges")}
          ></SelectField>
        </div>
        <div className="mb-4">
          <SelectField
            options={holeTypes.map((holeType) => {
              return {
                value: holeType,
                label: holeType,
              };
            })}
            label="Rodzaj pierwszego otworu"
            error={errors.hinges}
            registration={register("firstHole.holeType")}
          ></SelectField>
          <SelectField
            options={stringPositions.map((stringPosition) => {
              return {
                value: stringPosition,
                label: stringPosition,
              };
            })}
            label="Położenie pierwszego otworu (patrząc z zewnątrz)"
            error={errors.hinges}
            registration={register("firstHole.stringPosition")}
          ></SelectField>

          {firstHoleType === "okrągły na rurę bez uchwytu" && (
            <InputField
              label="Średnica (zewnętrzna) pierwszego otworu (mm)"
              error={errors.firstHole?.diameter}
              type="number"
              registration={register("firstHole.diameter", {
                valueAsNumber: true,
              })}
            ></InputField>
          )}
        </div>

        <div className="mb-4">
          <SelectField
            options={["Nie", "Tak"].map((val) => {
              return {
                value: val,
                label: val,
              };
            })}
            label="Drugi otwór?"
            error={errors.hasSecondHole}
            registration={register("hasSecondHole", {
              setValueAs(value) {
                return value === "Tak";
              },
            })}
          ></SelectField>
        </div>

        {hasSecondHole && (
          <div className="mb-4">
            <SelectField
              options={holeTypes.map((holeType) => {
                return {
                  value: holeType,
                  label: holeType,
                };
              })}
              label="Rodzaj drugiego otworu"
              error={errors.hinges}
              registration={register("secondHole.holeType")}
            ></SelectField>
            <SelectField
              options={stringPositions.map((stringPosition) => {
                return {
                  value: stringPosition,
                  label: stringPosition,
                };
              })}
              label="Położenie drugiego otworu (patrząc z zewnątrz)"
              error={errors.hinges}
              registration={register("secondHole.stringPosition")}
            ></SelectField>

            {secondHoleType === "okrągły na rurę bez uchwytu" && (
              <InputField
                label="Średnica (zewnętrzna) drugiego otworu (mm)"
                error={errors.secondHole?.diameter}
                type="number"
                registration={register("secondHole.diameter", {
                  valueAsNumber: true,
                })}
              ></InputField>
            )}
          </div>
        )}

        <div className="mb-4">
          <SelectField
            options={["Nie", "Tak"].map((val) => {
              return {
                value: val,
                label: val,
              };
            })}
            label="Otwór na przewód zasilający?"
            error={errors.hasPowerCordHole}
            registration={register("hasPowerCordHole", {
              setValueAs(value) {
                return value === "Tak";
              },
            })}
          ></SelectField>
        </div>
        {hasPowerCordHole && (
          <div className="mb-4">
            <SelectField
              options={stringPositions.map((stringPosition) => {
                return {
                  value: stringPosition,
                  label: stringPosition,
                };
              })}
              label="Pozycja otworu na przewód zasilający (patrząc z zewnątrz)"
              error={errors.hinges}
              registration={register("powerCordHole.stringPosition")}
            ></SelectField>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Zapisz
        </button>
      </form>
      <PriceFooter
        isValid={true}
        termoblock={termoblock}
        visible={isSummaryVisible}
      />

      <div ref={summaryRef}>
        <Summary isValid={true} termoblock={termoblock} />
      </div>
    </>
  );
};

export default TermoblockForm;
