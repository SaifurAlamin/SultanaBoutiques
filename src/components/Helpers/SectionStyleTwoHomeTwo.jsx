import DataIteration from "./DataIteration";

export default function SectionStyleTwoHomeTwo({ className, products, habib }) {
  const habibDatas = habib?.products;

  return (
    <div
      className={`section-content w-full grid sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 ${
        className || ""
      }`}
    >
      <DataIteration datas={habibDatas} startLength={0} endLength={4}>
        {({ datas }) => (
          <div key={datas.id} className="item w-full">
            {/* <ProductCardRowStyleOneTwo datas={datas} /> */}
          </div>
        )}
      </DataIteration>
    </div>
  );
}
