import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ShopRegistration from './shop-registration';
import CustomerRegistration from './customer-registration';
import User from './User';
import MainDash from './MainDash';
import ViewShops from './view-shop'; 
import ViewOrders from './ViewOrders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainDash />} />
        <Route path="/shop-registration" element={<ShopRegistration />} />
        <Route path="/customer-registration" element={<CustomerRegistration />} />

        <Route path="/view-shop" element={<ViewShops />} />
        <Route path="/user" element={<User />} />
         <Route path="/view-orders/:shopName" element={<ViewOrders />} />
        
      </Routes>
    </Router>
  );
}

export default App;
