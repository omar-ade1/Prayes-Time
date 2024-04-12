/* -------------------------------------------------------------------------- */
/*                          List Of Cities Component                          */
/* -------------------------------------------------------------------------- */

import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { ChangeTimePray } from "../../store/slices/TimeSlice";
import { SetCountry } from "../../store/slices/CountrySlice";
import { motion, AnimatePresence } from "framer-motion";
/*
Country Is Array Of Countries 
This Comes From (PrayMainComponent.jsx) Component As Props
*/
const ListOfCities = ({ country, allData }) => {
  /* 
   ChooseCountry Is A State Equel The Input Country Search Value
   It Will Update When User Type In The Input Country
  */
  const [chooseCountry, setChooseCountry] = useState("");

  /* 
   ChooseCity Is A State Equel The Input City Search Value
   It Will Update When User Type In The Input City
  */
  const [chooseCity, setChooseCity] = useState("");

  /*
   Check if the Country That User Type It in Search Country Is in the Array of Country or Not
   It Will Be Change When the User Click in the Button Countinu of Input Country
   If It Is Founded Show the Anthore Input of City 
   If It Is Not Founded Show a Message to User Your Country in Not Founded
  */
  const [isSearchInCoun, setIsSearchInCoun] = useState(false);

  /*
   Check if the Country That User Type It in Search Country Is in the Array of Country or Not
   It Will Be Change When the User Click in the Button Countinu of Input Country
   #todo If It Is Founded Show The Prayers Time 
   #todo If It Is Not Founded Show a Message to User Your Country in Not Founded
  */
  const [isSearchInCity, setIsSearchInCity] = useState(false);

  /*
   handleFilter Is Arrow Funcition That Return Array Of Country After Filterd It By The Input Value
   It Will Run When The Search Value State (searchValue) Changed Or When User Type Any Thing In Input Search
  */
  const handleFilter = () => {
    if (country && chooseCountry) {
      const filterCountries = country.find((cou) => {
        return cou.toLowerCase() == chooseCountry.toLowerCase();
      });
      return filterCountries;
    }
  };

  /*
   DateofDay Is a State That Contain the Date of Today 
   This Format Is (DD-MM-YYYY)
  */
  const [dateOfDay, setDateOfDay] = useState();

  /*
   This Is Function to Set Date
  */
  const date = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const fullDate = `${day}-${month}-${year}`;
    setDateOfDay(fullDate);
  };

  /*
   This API for Get the Data of Prayes Time After User Choose the Country and City Correct
   This API Has Three States :
      1- {Dateofdate => This for Date }
      2- {Choosecity => This for City That User Selected It From Input City}
      3- {Choosecountry => This for City That User Selected It From Input Country}
   And This Function Will Run After Check Is Country and City Are Correct and Founded 
   When User Click on the Button Input City

   When This Run Redux State {PrayTime} Will Changed To The Response
   */

  const [apiError, setApiError] = useState("");

  const api = () => {
    axios
      .get(`https://api.aladhan.com/v1/timingsByCity/${dateOfDay}?city=${chooseCity}&country=${chooseCountry}`)
      .then((res) => {
        setApiError("no error");
        dispatch(ChangeTimePray(res.data));
      })
      .catch((error) => {
        console.log("check the link");
        setApiError("error");
      });
  };

  /*
   Run handleFilter When The Search Value State (searchValue) Changed Or When User Type Any Thing In Input Search
  */
  useEffect(() => {
    handleFilter();
  }, [chooseCountry]);

  /*
   This CitiesOfChoosedCountry State for Cities of Country That User Choosed 
   It Will Update When the User Click on the Button Input Country
  */
  const [citiesOfChoosedCountry, setCitiesOfChoosedCountry] = useState([]);

  /*
   This Function Get Alldata Then Do Find Function on All Data 
   And Check if Choosecountry Is Founded in the Array of Country or Not
  */
  const handleCities = () => {
    const choosedCountryInListCountries = allData.data.find((ArrOfCountry) => {
      return ArrOfCountry.country == chooseCountry;
    });

    setCitiesOfChoosedCountry(choosedCountryInListCountries.cities);
    return choosedCountryInListCountries.cities;
  };

  /*
   This Function Get citiesOfChoosedCountry State Then Do Find Function on All Cities 
   And Check if ChooseCity Is Founded in citiesOfChoosedCountry State or Not
  */
  const handleChooseCity = () => {
    const choosedCityInCities = citiesOfChoosedCountry.find((d) => {
      return d == chooseCity;
    });
    setChooseCity(choosedCityInCities);
    return choosedCityInCities;
  };

  /*
   This Is Redux State That Contains The Response Of Funcition Api  
  */
  const prayTime_Redux = useSelector((state) => state.PrayTime);

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center">
      <div className="flex xsm:flex-col xsm:items-center xsm:justify-center xsm:gap-5">
        <input
          list="lists"
          onChange={(event) => {
            setChooseCountry(event.target.value);
            setIsSearchInCoun(false);
            setApiError("");
          }}
          placeholder="الدولة بالانجليزية"
          type="text"
          className="p-2 text-xl border-2 rounded focus:outline-none focus:border-red-600"
        />
        <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.1 }}
          className="bg-red-600 text-white font-bold text-xl p-2 w-[150px] mx-5 rounded"
          onClick={() => {
            if (handleFilter() == undefined) {
              setIsSearchInCoun(false);
            } else {
              setIsSearchInCoun(true);
              handleCities();
            }
          }}
        >
          استمر
        </motion.button>
      </div>

      {country && (
        <datalist id="lists">
          {country.map((cou, index) => {
            return (
              <option key={index} value={cou}>
                {cou}
              </option>
            );
          })}
        </datalist>
      )}

      <AnimatePresence>
        {isSearchInCoun ? (
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }}>
            <motion.div className="mt-5 flex xsm:flex-col xsm:items-center xsm:justify-center xsm:gap-5">
              <input
                onChange={(event) => {
                  setChooseCity(event.target.value);
                  setIsSearchInCity(true);
                  setApiError("");
                }}
                className="p-2 text-xl border-2 rounded focus:outline-none focus:border-red-600"
                type="text"
                list="city-list"
                placeholder="المدينة بالانجليزية"
              />
              <datalist id="city-list">
                {citiesOfChoosedCountry.map((c, index) => {
                  return (
                    <option value={c} key={index}>
                      {c}
                    </option>
                  );
                })}
              </datalist>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.1 }}
                className="bg-red-600 text-white font-bold text-xl p-2 w-[150px] mx-5 rounded"
                onClick={() => {
                  if (handleChooseCity() == undefined) {
                    setIsSearchInCity(false);
                    setApiError("no city");
                  } else {
                    setIsSearchInCity(true);
                    setApiError("");
                    handleChooseCity();
                    date();
                    api();
                    dispatch(SetCountry({ country: chooseCountry, city: chooseCity }));
                  }
                }}
              >
                عرض المواقيت
              </motion.button>
            </motion.div>
            {/* Error Or Success Message */}
            {!isSearchInCity && apiError == "no city" ? (
              <motion.h3
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-xl mt-5 text-white bg-orange-500 p-2 rounded font-bold mt-5"
              >
                من فضلك ادخل اسم مدينتك بشكل صحيح
              </motion.h3>
            ) : (
              ""
            )}
            {apiError == "error" && (
              <motion.h3
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-xl bg-red-500 p-2 rounded font-bold mt-5 text-white"
              >
                {" "}
                هناك مشكلة حاول مرة اخرى لاحقا ):
              </motion.h3>
            )}
            {apiError == "no error" && isSearchInCity && (
              <motion.h3
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-xl bg-green-500 p-2 rounded font-bold mt-5 text-white"
              >
                تم عرض المواقيت بنجاح
              </motion.h3>
            )}
          </motion.div>
        ) : (
          <h1 className="text-xl mt-5 text-white">من فضلك ادخل اسم دولتك بشكل صحيح</h1>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ListOfCities;
