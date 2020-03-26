import React, { useMemo, useState } from "react";
import { Container } from "shards-react";
import { useGet } from "restful-react";
import Title from "../components/Title";
import Select from "react-select";
import Stats from "../components/Stats";
import Loading from "../components/Loading";
import { format } from "date-fns";

const Dashboard = () => {
  const { data: stats, loading } = useGet({
    path: "https://covid19.mathdro.id/api"
  });

  const { data: dataCountries, loading: countriesLoading } = useGet({
    path: "https://covid19.mathdro.id/api/countries"
  });

  const [country, setCountry] = useState({ value: "BRA", label: "Brazil" });

  const { data: countryData, loading: countryLoading, refetch } = useGet({
    path: `https://covid19.mathdro.id/api/countries/${country.value}`
  });

  const countryOptions = useMemo(() => {
    if (!dataCountries) return [];
    return dataCountries.countries.map(({ name, iso3 }) => ({
      label: name,
      value: iso3
    }));
  }, [dataCountries]);

  const lastUpdate = useMemo(() => {
    if(!stats) return;
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
            isLoading={countriesLoading}
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
