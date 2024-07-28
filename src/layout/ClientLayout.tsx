import PrimarySearchAppBar from "src/components/header";
import Footer from "src/components/footer";
import { Outlet } from "react-router-dom";
import SubHeader from "src/components/subHeader";

function ClientLayout() {
  return (
    <>
      <SubHeader></SubHeader>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}
export default ClientLayout;
