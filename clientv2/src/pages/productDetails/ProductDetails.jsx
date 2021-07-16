import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchSingleProduct, deleteProduct } from "./productDetails.slice";
import "./productDetails.styles.scss";
import ProductDetailsCarousel from "../../components/productDetailsCarousel";
import Size from "../../components/size/Size";
import { addToCart } from "../../components/cart/cartSlice";
import { addToWishlist } from "../../components/wishlist/wishlistSlice";

const ProductDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.modal);
  const {
    product: {
      images,
      title,
      description,
      price,
      ratingsAverage,
      ratingsQuantity,
      gender,
      category,
      l,
      s,
      xl,
      m,
    },
  } = useSelector((state) => state.productDetails);
  const { cartItems } = useSelector((state) => state.cart);
  const { currentSize, currentCount } = useSelector((state) => state.size);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [id]);
  const handleDeleteProduct = async (id) => {
    const res = await dispatch(deleteProduct(id));
    if (res.type === "productDetails/deleteProduct/fulfilled") {
      toast.success("Product deleted successfully");
    } else {
      toast.error("some error occurred while deleting");
    }
    history.push("/");
  };
  const handleAddToCart = (item) => {
    const cartItemsTransformed = [];
    cartItems?.forEach((cartItem) => {
      if (item.id !== cartItem.product.id) {
        cartItemsTransformed.push({
          product: cartItem.product.id,
          count: cartItem.product.count,
          size: cartItem.product.size,
        });
      }
    });
    const sizeAvailable = ["s", "m", "l", "xl"].find((size) => {
      return item[size] > 0;
    });
    cartItemsTransformed.push({
      product: item.id,
      count: currentCount,
      size: item[currentSize] > 0 ? currentSize : sizeAvailable,
    });
    dispatch(addToCart(cartItemsTransformed));
  };
  return (
    <section className="productDetails">
      <div className="productDetails_carouselCol">
        <ProductDetailsCarousel slides={images} />
        <div className="productDetails_title">{title}</div>
        <div className="productDetails_info">
          <span className="productDetails_text">
            {" "}
            <span>category:</span> {category}
          </span>
          <span className="productDetails_text">
            <span>description:</span> {description}
          </span>
          <span className="productDetails_text">
            <span>price:</span> {price}
          </span>
          <span className="productDetails_text">
            <span>gender:</span> {gender}
          </span>
          <span className="productDetails_text">
            <span>Rating:</span> {ratingsAverage} / 5
          </span>
        </div>
      </div>
      <div className="productDetails_ctaCol">
        <Size />
        <div className="productDetails_cta">
          <button
            className="productDetails_btn"
            onClick={() => handleAddToCart({ s, m, xl, l, id })}
          >
            Add to cart
          </button>
          <button
            className="productDetails_btn"
            onClick={() => dispatch(addToWishlist(id))}
          >
            Add to wishlist
          </button>
          {isLoggedIn && user.role === "admin" && (
            <button
              className="productDetails_btn productDetails_btn-delete"
              onClick={() => handleDeleteProduct(id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
