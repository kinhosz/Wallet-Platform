import { AiFillCar, AiOutlineShoppingCart } from "react-icons/ai";
import { 
    FaBaby, FaBus, FaDumbbell, FaFileInvoiceDollar,
    FaFilm, FaGift, FaHandHoldingHeart, FaHeartbeat,FaHome,
    FaHouseDamage, FaLaptop, FaLightbulb, FaPaw, FaPhoneAlt,
    FaPiggyBank, FaPlane, FaQuestion, FaSchool, FaShieldAlt,
    FaTshirt, FaUtensils, FaWifi
} from "react-icons/fa";
import { GiBarbedSpear, GiMedicines, GiPayMoney } from "react-icons/gi";
import { MdLocalGroceryStore, MdOutlineSportsSoccer } from "react-icons/md";

export const IconsList = [
    { id: -1, name: 'Unknown', icon: <FaQuestion /> },
    { id: 0, name: 'Health', icon: <FaHeartbeat /> },
    { id: 1, name: 'Medicine', icon: <GiMedicines /> },
    { id: 2, name: 'School', icon: <FaSchool /> },
    { id: 3, name: 'Grocery', icon: <MdLocalGroceryStore /> },
    { id: 4, name: 'Restaurant', icon: <FaUtensils /> },
    { id: 5, name: 'Barber', icon: <GiBarbedSpear /> },
    { id: 6, name: 'Transport', icon: <FaBus /> },
    { id: 7, name: 'Car', icon: <AiFillCar /> },
    { id: 8, name: 'Home', icon: <FaHome /> },
    { id: 9, name: 'Shopping', icon: <AiOutlineShoppingCart /> },
    { id: 10, name: 'Entertainment', icon: <FaFilm /> },
    { id: 11, name: 'Sports', icon: <MdOutlineSportsSoccer /> },
    { id: 12, name: 'Payment', icon: <GiPayMoney /> },
    { id: 13, name: 'Rent', icon: <FaHouseDamage /> },
    { id: 14, name: 'Utilities', icon: <FaLightbulb /> },
    { id: 15, name: 'Phone', icon: <FaPhoneAlt /> },
    { id: 16, name: 'Internet', icon: <FaWifi /> },
    { id: 17, name: 'Clothing', icon: <FaTshirt /> },
    { id: 18, name: 'Fitness', icon: <FaDumbbell /> },
    { id: 19, name: 'Insurance', icon: <FaShieldAlt /> },
    { id: 20, name: 'Childcare', icon: <FaBaby /> },
    { id: 21, name: 'Vacation', icon: <FaPlane /> },
    { id: 22, name: 'Debt', icon: <FaFileInvoiceDollar /> },
    { id: 23, name: 'Savings', icon: <FaPiggyBank /> },
    { id: 24, name: 'Charity', icon: <FaHandHoldingHeart /> },
    { id: 25, name: 'Gifts', icon: <FaGift /> },
    { id: 26, name: 'Electronics', icon: <FaLaptop /> },
    { id: 27, name: 'Pet Care', icon: <FaPaw /> },
];
