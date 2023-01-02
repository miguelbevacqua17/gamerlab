
import '../assets/css/app.css';
import MainContainer from "./MainContainer";
import Footer from "./Footer"

function ContentWrapper() {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <MainContainer />
      <Footer />
    </div>
  );
}

export default ContentWrapper