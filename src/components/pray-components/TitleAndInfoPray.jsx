/* -------------------------------------------------------------------------- */
/*            This Is Component Show The Info About City And Date            */
/* -------------------------------------------------------------------------- */

const TitleAndInfoPray = ({ countryInfo, date_1, date_2 }) => {
  return (
    <div className="title-city-and-date text-white">
      <div className="container mb-10 py-5 grid grid-cols-12 xsm:divide-y divide-[#fff] gap-y-4 shadow-xl shadow-[#00000080] border border-[#121212] rounded-lg ">
        <div className="col-span-6 xsm:border-l-0 border-l border-l-[#fff] py-2 space-y-2 xsm:col-span-12 text-center">
          <h2 className="text-xl font-semibold">التاريخ الهجري</h2>
          <h3 className="text-xl  tracking-wider">{date_1.date}</h3>
          <h3 className="text-xl  tracking-wider">{date_1.month ? date_1.month.ar : "-- --"}</h3>
        </div>
        <div className="col-span-6 xsm:border-r-0 border-r border-r-[#fff] py-2 space-y-2 xsm:col-span-12 text-center">
          <h2 className="text-xl font-semibold">التاريخ الميلادي</h2>
          <h3 className="text-xl  tracking-wider">{date_2.date}</h3>
          <h3 className="text-xl  tracking-wider">{date_2.month ? date_2.month.en : "-- --"}</h3>
        </div>
      </div>

      <div className="container py-5 grid grid-cols-12 xsm:divide-y divide-[#fff] gap-y-4 shadow-xl shadow-[#00000080] border border-[#121212] rounded-lg ">
        <div className="col-span-6 xsm:border-l-0 border-l border-l-[#fff] py-2 space-y-2 xsm:col-span-12 text-center">
          <h2 className="text-xl font-semibold">الدولة : {countryInfo.country ? countryInfo.country : "-- -- --"}</h2>
        </div>
        <div className="col-span-6 xsm:border-r-0 border-r border-r-[#fff] py-2 space-y-2 xsm:col-span-12 text-center">
        <h3 className="text-xl font-extrabold">المدينة : {countryInfo.city ? countryInfo.city : "-- -- --"}</h3>
        </div>
        {/* <hr className="col-span-12 mt-5 opacity-10"></hr> */}
      </div>
    </div>
  );
};

export default TitleAndInfoPray;
