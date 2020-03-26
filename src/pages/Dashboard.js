import React, { useMemo, useState } from "react";
import { Container } from "shards-react";
import { useGet } from "restful-react";
import Title from "../components/Title";
import Select from "react-select";
import Stats from "../components/Stats";
import Loading from "../components/Loading";
import { format } from "date-fns";
import countryOptions from "../countries-pt.json";

const Dashboard = () => {
  const { data: stats, loading } = useGet({
    path: "https://covid19.mathdro.id/api"
  });

  const [country, setCountry] = useState({ value: "BR", label: "Brasil" });

  const { data: countryData, loading: countryLoading, refetch } = useGet({
    path: `https://covid19.mathdro.id/api/countries/${country.value}`
  });

  const lastUpdate = useMemo(() => {
    if (!stats) return;
    return format(new Date(stats.lastUpdate), "dd/MM/yyyy 'ás' HH:mm:ss");
  }, [stats]);

  const changeCountry = newCountry => {
    setCountry(newCountry);
    refetch();
  };
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <p style={{ marginTop: "1rem" }}>Última Atualização: {lastUpdate}</p>
          <Title title={"Dados Globais"} />
          <Stats
            confirmed={stats.confirmed.value}
            recovered={stats.recovered.value}
            deaths={stats.deaths.value}
          />

          <Title title={"Dados por país"} />
          <Select
            value={country}
            isSearchable={true}
            options={countryOptions}
            onChange={changeCountry}
          />
          {countryLoading ? (
            <Loading />
          ) : (
            <Stats
              confirmed={countryData.confirmed.value}
              recovered={countryData.recovered.value}
              deaths={countryData.deaths.value}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default Dashboard;
