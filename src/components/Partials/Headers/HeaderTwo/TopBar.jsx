import { Typewriter } from "react-simple-typewriter";
import { useGetCompanyInfoQuery } from "../../../../features/api/companyinfoApi";

export default function TopBar({ className }) {
  // const [headingData, setHeaderData] = useState({});
  const { data: headingData } = useGetCompanyInfoQuery();
  const topbar_text1 = headingData?.top_bar_txt1;
  const topbar_text2 = headingData?.top_bar_txt2;
  const topbar_text3 = headingData?.top_bar_txt3;
  console.log(topbar_text1);

  //top bar random data
  // useEffect(() => {
  //   fetch("https://www.sultanaboutiques.com/backend/api/product/company/info")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setHeaderData(data);
  //     });
  // }, []);

  const htmlStrings = [topbar_text1, topbar_text2, topbar_text3];
  const textArray = htmlStrings.map((htmlString, index) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent.trim();
  });

  // // Create a temporary div element to parse the HTML
  // const tempDiv = document.createElement("div");
  // tempDiv.innerHTML = htmlString;

  // // Extract the text content
  // const textContent = tempDiv.textContent.trim();

  // // Store the text content in an array
  // const textArray = [textContent];
  return (
    <>
      <div
        className={`w-full bg-[#E5E5E5] h-8 lg:h-10  border-b border-qgray-border ${
          className || ""
        }`}
      >
        <div className="container-x mx-auto p-0 lg:p-2 h-full">
          <div className="text-center">
            <h1
              style={{
                paddingTop: "0rem",
                margin: "auto 0",
                fontWeight: "normal",
              }}
            >
              {" "}
              <span
                style={{ color: "dark", fontWeight: "bold" }}
                className="text-xs lg:text-base"
              >
                {/* Style will be inherited from the parent element */}
                <Typewriter
                  words={textArray}
                  loop={Infinity}
                  cursor
                  cursorStyle=""
                  typeSpeed={200}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
