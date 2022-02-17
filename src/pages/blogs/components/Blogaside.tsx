import { Icon } from '@material-ui/core';
import Logo from 'assets/images/TCG_logo.svg';
import { Button } from 'Components/common/form';
import { ContactsRoute, FaqsRoute, LandingPageRouter, StaticPagesRoute } from 'const';
import { session } from 'helpers';
import { useAsideMenu } from 'hooks';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    blogCategory: string[],
    handleCategory: (category: string) => void
    selectedCategory: any,
}

const BlogAside = (props: Props) => {
    const { blogCategory } = props

    const { isOpen, toggle } = useAsideMenu({
        breakpoint: 1000,
        asideClassName: 'faq-aside',
    });

    const hasToken = Boolean(session.getToken());  


    return <div className="aside-wrapper adaptive-aside">
        <Button
            onClick={() => toggle(!isOpen)}
            className="adaptive-aside__burger"
        >
            <Icon className="icon-menu" />
        </Button>
        <div className="adaptive-aside__box">
            <div className="aside-logo">
                <Link to={LandingPageRouter.ROOT}>
                    <img src={Logo} alt="Logo" />
                </Link>
            </div>
            <nav className="faq-aside-navigation nav">
                <ul className="faq-aside-list nav__list cursor--pointer">
                    {blogCategory.map((category) => {
                        return (
                            <li onClick={() => props.handleCategory(category)} key={category} className={`menu-link text--uppercase ${props.selectedCategory == category ? 'selected-list' : ''}`}>
                                {category}
                            </li>
                        );
                    })}
                </ul>
            </nav>
                <footer className={`aside-blog-footer`}>
                <nav className="general-info-links-wrapper">
                <ul className="general-info-links">              
                <li>
                    <Link to={FaqsRoute.ROOT}>FAQ</Link>
                </li>
                {
                hasToken?<li>
                <Link to={ContactsRoute.ROOT}>Contact Us</Link>
                </li>:null
                }                
                <li>
                    <Link to={StaticPagesRoute.TERMS}>Terms & Conditions</Link>
                </li>              
                </ul>
                </nav>
                <p className="copyright">© Copyright {new Date().getFullYear()} TCG Showdown</p>
            </footer>            
        </div>
    </div>
}

export default BlogAside;