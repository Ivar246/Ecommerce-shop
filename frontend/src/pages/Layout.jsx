import { Outlet, Link } from "react-router-dom";
const Layout = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/Products">Products</Link>
                    </li>
                    <li>
                        <Link to="/Cart">Cart</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}

export default Layout