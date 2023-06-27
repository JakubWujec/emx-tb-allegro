import { StringParam } from "../types";

type SummaryDetailsProps = {
  stringParams: StringParam[];
};

function SummaryDetails({ stringParams }: SummaryDetailsProps) {
  return (
    <section className="container mx-auto min-h-[40vh] mt-12">
      <hr className="w-64 h-1 mx-auto my-4 bg-mainOrange border-0 rounded md:my-10 dark:bg-gray-700" />
      <h1 className="text-2xl font-bold text-mainOrange py-2 my-6 text-center">
        Podsumowanie
      </h1>
      <div className="flex flex-col">
        <div className="flex justify-around flex-wrap w-full">
          {stringParams.map((stringParam) => {
            return (
              <div key={stringParam.label}>
                <div className="justify-between m-4 text-center flex-col">
                  <p className="text-primary">{stringParam.label}</p>
                  <p className="text-mainOrange text-lg font-bold">
                    {stringParam.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <hr className="w-64 h-1 mx-auto my-4 bg-mainOrange border-0 rounded md:my-10 dark:bg-gray-700" />
      </div>
    </section>
  );
}

export default SummaryDetails;
