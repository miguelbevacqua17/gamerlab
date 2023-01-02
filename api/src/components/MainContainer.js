
import '../assets/css/app.css';
import TopBar from "./TopBar";
import PageContent from "./PageContent"

function MainContainer() {
  return (
    <div id="content">
      <TopBar />
      <PageContent />
    </div>
  );
}

export default MainContainer