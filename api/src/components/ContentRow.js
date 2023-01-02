
import '../assets/css/app.css';
import AmountProductsDb from "./AmountProductsDb";
import TotalCategoriesDb from "./TotalCategoriesDb"
import AmountUsersDb from "./AmountUsersDb"

function ContentRow() {
  return (
    <div className="row">
      <AmountProductsDb />
      <TotalCategoriesDb />
      <AmountUsersDb />
    </div>
  );
}

export default ContentRow