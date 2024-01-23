import { useState } from "react";
import Drawer from "../Mobile/Drawer";
import Footer from "./Footers/Footer";

export default function Layout({ children, childrenClasses }) {
  const [drawer, setDrawer] = useState(false);
  return (
    <>
      <Drawer open={drawer} action={() => setDrawer(!drawer)} />
      <div className="w-full overflow-x-hidden">
        <Header drawerAction={() => setDrawer(!drawer)} />
        <div className={`w-full  ${childrenClasses || "pt-[10px] pb-[60px]"}`}>
          {children && children}
        </div>

        <Footer />
      </div>
    </>
  );
}
