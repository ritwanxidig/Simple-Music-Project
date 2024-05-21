import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const menuItems = [
        { name: 'Home', link: '/' },
        { name: 'Songs', link: '/songs' }
    ]
    return (
        <div className='flex justify-between items-center p-5 shadow-sm'>
            <div>
                <Link to={'/'}>
                    <h1 className='text-xl font-extrabold uppercase tracking-widest'>Music</h1>
                </Link>
            </div>
            <div className="flex gap-5 items-center">
                {menuItems?.map((item, index) => (
                    <div key={index}>
                        <Link
                            className={`font-semibold hover:text-blue-500 transition-all px-4 py-2 rounded-full ${pathname === item.link && 'bg-blue-500 text-white hover:bg-blue-100 hover:text-blue-500'}`}
                            to={item?.link} >{item.name}</Link>
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default Navbar