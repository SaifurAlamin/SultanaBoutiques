import { useState } from "react";
import DashboardDrawer from "../Mobile/DashboardDrawer";
import Footer from "./Footers/Footer";

export default function DashboardLayout({ children, childrenClasses }) {
  const [drawer, setDrawer] = useState(false);
  return (
    <>
      <DashboardDrawer open={drawer} action={() => setDrawer(!drawer)} />
      <div className="w-full overflow-x-hidden">
        {/* <Header drawerAction={() => setDrawer(!drawer)} /> */}
        <div className={`w-full  ${childrenClasses || "pt-[30px] pb-[60px]"}`}>
          {children && children}
        </div>

        <Footer />
      </div>
    </>
  );
}
