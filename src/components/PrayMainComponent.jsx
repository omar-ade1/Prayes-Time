/* -------------------------------------------------------------------------- */
/*                             Pray Main Component                            */
/* -------------------------------------------------------------------------- */
// import { useEffect } from "react";
import { useEffect, useState } from "react";
import ListOfCities from "./pray-components/ListOfCities";
import PrayCard from "./pray-components/PrayCard";
import TitleAndInfoPray from "./pray-components/TitleAndInfoPray";
import axios from "axios"
import { useSelector } from "react-redux";



const PrayMainComponent = () => {
  const [allData, setData] = useState()
  const [country,setCountry] = useState()
  useEffect(() => {
    axios.get("https://countriesnow.space/api/v0.1/countries")
      .then((res) => setData(res.data));

  }, []);


useEffect(() => {
  if (allData) {
    const AllCountries = []
  allData.data.forEach((objectCountryInfo) => {
    AllCountries.push(objectCountryInfo.country)
  })
    setCountry(AllCountries)
}
}, [allData])


const prayTime_Redux = useSelector((state) => state.PrayTime);

  /*
  */ 
const countryInfo_Redux = useSelector((state) => state.CountryInfo);


  return (
    <>
      
      <div className="flex py-[100px] min-h-[80vh] justify-center flex-col">
        <h1 className="w-fit mx-auto text-2xl text-white font-bold mb-5 bg-blue-500 p-3 rounded">عرض مواقيت الصلاة</h1>
        <TitleAndInfoPray
          /*
          {1} date_1 => التاريخ الهجري
          {2} date_2 => التاريخ الميلادي
          {3} countryInfo => is object of country and city like that {country: "Egypt", city: "Cairo"}
          */ 
          date_1 = {prayTime_Redux.data ? prayTime_Redux.data.date.hijri : "-- : --"}
          date_2 = {prayTime_Redux.data ? prayTime_Redux.data.date.gregorian : "-- : --"}
          countryInfo={countryInfo_Redux ? countryInfo_Redux : "-- --"} />
        <div className="py-[50px]">
          <ListOfCities allData={allData} country={country} />
        </div>
        <div className="grid py-[50px] grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-3 container">
          <PrayCard image="./fajr.webp" name="الفجر" time={prayTime_Redux.data ? prayTime_Redux.data.timings.Fajr : "-- : --"} />
          <PrayCard image="./zaher.webp" name="الظهر" time={prayTime_Redux.data ? prayTime_Redux.data.timings.Dhuhr : "-- : --"} />
          <PrayCard image="./aser.webp" name="العصر" time={prayTime_Redux.data ? prayTime_Redux.data.timings.Asr : "-- : --"} />
          <PrayCard image="./maghreb.webp" name="المغرب" time={prayTime_Redux.data ? prayTime_Redux.data.timings.Maghrib : "-- : --"} />
          <PrayCard image="./eshaa.webp" name="العشاء" time={prayTime_Redux.data ? prayTime_Redux.data.timings.Isha : "-- : --"} />
        </div>
  
      </div>
    </>
  );
};

export default PrayMainComponent;
