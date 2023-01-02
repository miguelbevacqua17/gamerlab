
import '../assets/css/app.css';
import LastProductDb from "./LastProductDb";
import CategoriesDb from "./CategoriesDb"
import ProductsTotal from "./ProductsTotal";
import LastUserDb from "./LastUserDb";

function ContentRow2() {
  return (
    <div className="row">
      <LastProductDb />
      <LastUserDb />
      <CategoriesDb />
      <ProductsTotal />
    </div>
  );
}

export default ContentRow2;