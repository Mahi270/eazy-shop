import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiGetAllProducts } from "./state/actions";
// Components
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import Cart from "./components/Cart/Cart";
// Styles
import { StyledButton, Wrapper } from "./App.styles";
import Item from "./components/Item/Item";
//Types
import { CartItemType, AppState } from "./Types";

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const products = useSelector((state: AppState) => state.products.products);
  const items = useSelector((state: AppState) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGetAllProducts());
  }, [dispatch]);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount, 0);

  if (!items) return <LinearProgress />;

  return (
    <Wrapper>
      <h1>eazy Shop</h1>
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      >
        <Cart cartItems={items} />
      </Drawer>
      <StyledButton onClick={() => setIsCartOpen(true)}>
        <Badge badgeContent={getTotalItems(items)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {products?.map((item: CartItemType) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
