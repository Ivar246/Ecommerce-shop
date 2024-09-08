import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="h-[4.5rem] p-5 w-full border flex justify-between gap-8">
            <h1 className="font-bold text-2xl italic text-orange-400">Shopping Cart</h1>
            <ul className="h-[2.5rem] w-[50%] flex justify-end gap-5">
                <li className="font-semibold text-orange-400">
                    <Link to="/">Home</Link>
                </li>
                <li className="font-semibold text-orange-400">
                    <Link to="/Products">Products</Link>
                </li>
                <li className="font-semibold text-orange-400">
                    <Link to="/Cart">Cart</Link>
                </li>
            </ul>

            <div>
                <Link to="/signin">Signin</Link>
            </div>
        </nav>
    )
}

export default Navbar