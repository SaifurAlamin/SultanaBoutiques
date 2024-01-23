import DataIteration from "./DataIteration";
import ViewMoreTitle from "./ViewMoreTitle";

export default function SectionStylePopular({
    className,
    sectionTitle,
    seeMoreUrl,
    products = [],
    showProducts,
    habib
}) {
    const habibDatas = habib?.products;

    return (

        <div className={`section-style-one ${className || ""}`}>
            <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
                <div className="products-section w-full">
                    <div className="">
                        <DataIteration
                            datas={habibDatas}
                            startLength={0}
                            endLength={showProducts}
                        >
                            {({ datas }) => (
                                <div data-aos="fade-up" key={datas.id} className="item">
                                    
                                    {/* <PupularProductCard datas={datas} /> */}
                                </div>
                            )}
                        </DataIteration>


                    </div>
                </div>
            </ViewMoreTitle>
        </div>
    );
}
