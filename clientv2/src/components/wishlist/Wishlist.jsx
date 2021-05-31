import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWishlist } from "./wishlistSlice";
import "./wishlist.styles.scss";
const Wishlist = () => {
  const dispatch = useDispatch();
  const { error, loading, wishlistItems } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    console.log("hereaaaa");
    dispatch(getWishlist());
    // eslint-disable-next-line
  }, []);
  if (loading === "loading") return <div>...loading</div>;
  return (
    <section className="wishlist">
      <h1>wishlist</h1>
      {!wishlistItems.length && <p className="text_empty">Wishlist is empty</p>}
      {wishlistItems.map((item) => (
        <div className="product">
          <img src={item.images[0]} alt={item.title} />
          <h4>{item.title}</h4>

          <div className="btn">
            <button className="btn_cart">move to cart</button>
            <button>remove</button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Wishlist;
