import React, { useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from "next/navigation";
import { AppContext } from '../../app/context/AppContext'
import Hamburger from 'hamburger-react'
import Dropdown from '../Dropdown/Dropdown'
import { loginUser, logOut } from 'src/services';
import toast from 'react-hot-toast';

export default function Header() {
    const [page, setPage] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const { isMobile, isLoggedIn, setIsLoggedIn, darkMode, setDarkMode, lang, setLang } = useContext(AppContext)
    const [logoName, setLogoName] = useState('YMG')

    useEffect(() => {
        setPage(pathname)
    }, [pathname])

    useEffect(() => {
        const body = document.querySelector('body')
        const app = document.querySelector('.app__container') as HTMLDivElement
        if (body && app) {
            if (menuOpen) {
                body.style.overflow = 'hidden';
                app.style.overflow = 'hidden';
            }
            else {
                body.style.overflow = 'auto'
                app.style.overflow = 'auto';
            }
        }
    }, [menuOpen])

    const goTo = (page: string) => {
        setTimeout(() => setMenuOpen(false), 100)
        router.push(page)
    }

    const logout = async () => {
        await logOut()
        localStorage.removeItem('user')
        setIsLoggedIn(false)
        toast.success('See you later!')
        router.push('/')
        setTimeout(() => setMenuOpen(false), 100)
    }

    const renderMobile = () => {
        return <div className="header__container">
            <div className="header__controls" style={{ width: 'fit-content' }}>

            </div>
            <p
                className="header__title"
                onClick={() => {
                    router.push('/')
                    setMenuOpen(false)
                }}
                style={{ width: 'fit-content' }}>{logoName}</p>
            <div className="header__menu">
                <Hamburger size={25} toggled={menuOpen} toggle={setMenuOpen} color='#dcdcdc' easing="ease-in" rounded label="Show menu" />
            </div>
            <div className={`header__menu-sidebar${menuOpen ? '--toggled' : ''}`}>
                <div className="header__menu-sidebar-container">
                    <div
                        className="header__menu-sidebar-item"
                        onClick={() => {
                            goTo('/services')
                            setMenuOpen(false)
                        }}
                        style={{ marginTop: '1rem' }}>
                        <img src='/assets/icons/edit.svg' draggable={false} alt="Editor" className="header__menu-sidebar-item-svg" />
                        <p className="header__menu-sidebar-item-text">Services</p>
                    </div>

                    <div className="header__menu-sidebar-separator"></div>
                    {isLoggedIn ?
                        <>
                            <div className="header__menu-sidebar-item" onClick={logout}>
                                <img src='/assets/icons/logout.svg' draggable={false} alt="Logout" className="header__menu-sidebar-item-svg" />
                                <p className="header__menu-sidebar-item-text">Logout</p>
                            </div>
                        </>
                        : <div className="header__menu-sidebar-item" onClick={() => goTo('/login')}>
                            <img src='/assets/icons/login.svg' draggable={false} alt="Login" className="header__menu-sidebar-item-svg" />
                            <p className="header__menu-sidebar-item-text">Login</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    }

    return isMobile ? renderMobile() :
        <div className="header__container">
            <div className="header__main">
                <p className="header__title" onClick={() => router.push('/')}>{logoName}</p>
                <div className="header__nav">
                    <div className="header__button-dropdown header-hover-underline">Services
                        <div className='header__button-dropdown-box'>
                            <p className='header__button-dropdown-item' onClick={() => router.push(`/services/consultancy`)}>Consultancy</p>
                            <p className='header__button-dropdown-item' onClick={() => router.push(`/services/marketing`)}>Digital Marketing</p>
                            <p className='header__button-dropdown-item' onClick={() => router.push(`/services/gastronomy`)}>Gastronomy</p>
                        </div>
                    </div>
                    <button
                        className="header__button header-hover-underline"
                        onClick={() => router.push('/blog')}
                        style={{
                            borderBottom: page === '/blog' ? '2px solid #DCDCDC' : ''
                        }}
                    >Blog</button>
                    <button
                        className="header__button header-hover-underline"
                        onClick={() => router.push('/projects')}
                        style={{
                            borderBottom: page === '/projects' ? '2px solid #DCDCDC' : ''
                        }}
                    >Projects</button>
                    <button
                        className="header__button header-hover-underline"
                        onClick={() => router.push('/about')}
                        style={{
                            borderBottom: page === '/about' ? '2px solid #DCDCDC' : ''
                        }}
                    >About</button>
                    {isLoggedIn ?
                        <div
                            className="header__button-dropdown header-hover-underline"
                        >Administrator
                            <div className='header__button-dropdown-box'>
                                <button
                                    className="header__button header-hover-underline"
                                    onClick={() => router.push('/editor')}
                                    style={{
                                        borderBottom: page === '/editor' ? '2px solid #DCDCDC' : ''
                                    }}
                                >Editor</button>
                                <button
                                    className="header__button header-hover-underline"
                                    onClick={() => router.push('/email-list')}
                                    style={{
                                        borderBottom: page === '/email-list' ? '2px solid #DCDCDC' : ''
                                    }}
                                >Email List</button>
                                <button
                                    className="header__button header-hover-underline"
                                    onClick={() => router.push('/ads-posts')}
                                    style={{
                                        borderBottom: page === '/ads-posts' ? '2px solid #DCDCDC' : ''
                                    }}
                                >Ads & Posts</button>
                            </div>
                        </div>
                        : ''}
                </div>
            </div>
            <div className="header__controls">
                <Dropdown
                    label=''
                    options={['🇺🇸 EN', '🇪🇸 ES']}
                    selected={lang === 'en' ? '🇺🇸 EN' : '🇪🇸 ES'}
                    setSelected={val => setLang(val === '🇺🇸 EN' ? 'en' : 'es')}
                    value={lang === 'en' ? '🇺🇸 EN' : '🇪🇸 ES'}
                    bgColor='#283F3B'
                    color='#dcdcdc'
                />
            </div>
        </div>
}