import { createContext, useEffect, useState } from "react";
import { fetchTermoblockHoles } from "../api/fetchTermoblockHoles";

type TermoblockHolesContext = {
  termoblockHoles: {
    id: number;
    name: string;
    termoblockHoleTypeId: number;
  }[];
};

export const TermoblockHolesContext = createContext<TermoblockHolesContext>(
  {} as TermoblockHolesContext
);

type TermoblockHolesProviderProps = {
  children: React.ReactNode | null;
};

export const TermoblockHolesProvider = ({
  children,
}: TermoblockHolesProviderProps) => {
  const [termoblockHoles, setTermoblockHoles] = useState<
    {
      id: number;
      name: string;
      termoblockHoleTypeId: number;
    }[]
  >([]);

  useEffect(() => {
    let isSubscribed = true;
    fetchTermoblockHoles().then((data) => {
      if (isSubscribed) {
        if (data) {
          setTermoblockHoles(data);
        }
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, []);

  const contextValue = {
    termoblockHoles,
  };

  return (
    <TermoblockHolesContext.Provider value={contextValue}>
      {children}
    </TermoblockHolesContext.Provider>
  );
};
