
import '../assets/css/app.css';
import ContentRow from "./ContentRow";
import ContentRow2 from "./ContentRow2"

function PageContent() {
  return (
    <div className="container-fluid">
      <ContentRow />
      <ContentRow2 />
    </div>
  );
}

export default PageContent