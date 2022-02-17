import { LoadingButton } from 'Components/common/form/LoadingButton/LoadingButton';
// import usePosts from 'hooks/usePosts';
import { getBlogPosts } from 'Components/contentful/contentful';
import CommingSoonPage from 'pages/CommingSoon/CommingSoonPage';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Blogs from './components/blogs';
import SlickSlider from './components/slick';
import SlickSliderSmall from './components/smallSlick';
import { makeDataArray, TCGCONTENTFULKEYS } from './constants/constants';
import './event.scss';



const settings = {
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 4000,
}

let matchSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    responsive: [
        {
            breakpoint: 1190,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
    ]
}
let eventSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    responsive: [
        {
            breakpoint: 1190,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
    ]
}

const Events = () => {

    const [bigBannerPost, serBigBannerPost]: any = useState([]);
    const [offersPost, setOffersPost]: any = useState([]);
    const [eventsPost, setEventsPost]: any = useState([]);
    const [blogList, setBlogList]: any = useState([]);
    const [isLoading, setLoading]: any = useState(true);

    const history = useHistory();

    useEffect(() => {
        getBlogPosts(TCGCONTENTFULKEYS.TCG_BIG_BANNER).then(data => {
            setLoading(false);
            serBigBannerPost(makeDataArray(data.sort((a: any, b: any) => a.fields.imageorder > b.fields.imageorder ? 1 : a.fields.imageorder < b.fields.imageorder ? -1 : 0)));
        });
        getBlogPosts(TCGCONTENTFULKEYS.TCG_EVENTS).then(data => {
            setLoading(false);
            eventSettings = {
                ...eventSettings,
                slidesToShow: data.length > 3 ? 3 : data.length,
                infinite: data.length > 0,
            }
            setEventsPost(makeDataArray(data))
        });
        getBlogPosts(TCGCONTENTFULKEYS.TCG_OFFERS).then(data => {
            setLoading(false);
            matchSettings = {
                ...matchSettings,
                slidesToShow: data.length > 3 ? 3 : data.length,
                infinite: data.length > 0,
            }
            setOffersPost(makeDataArray(data.sort((a: any, b: any) => a.fields.imageorder > b.fields.imageorder ? 1 : a.fields.imageorder < b.fields.imageorder ? -1 : 0)))
        });
        getBlogPosts(TCGCONTENTFULKEYS.TCG_BLOGS).then((data) => {
            setLoading(false);
            setBlogList(makeDataArray(data.filter((data, index) => index <= 2)))
        })
    }, [])

    const handleRedirectionOfClick = (index: string) => {
        history.push(`blogs?${blogList[index].title}`, { id: index })
    }

    return isLoading ? <LoadingButton /> : (bigBannerPost.length > 0 || offersPost.length > 0 || blogList.length > 0)?<div className="event-wrapper">
        {/* <h2 className='medium--title font--bold'>TCG SHOWDOWN</h2>
        <p className='font--medium'>First Esports platform for online trading card games</p> */}
        {bigBannerPost.length > 0 && <SlickSlider className='banner-main' settings={settings} data={bigBannerPost} />}
        {offersPost.length > 0 && < div className="matches-wrapper">
            <h2>TCG Offers & Free Credits</h2>
            <SlickSliderSmall className='small-slider small-banner' settings={matchSettings} data={offersPost} />
        </div>}
        {
            eventsPost.length && <div className="matches-wrapper feature-event-wrapper">
                <h2>Featured Events</h2>
                <SlickSliderSmall className='small-slider small-banner' settings={eventSettings} isPriceInfo={true} data={eventsPost} />
            </div>
        }

        {blogList.length > 0 && <Blogs mainClassName='home' resetBlog={() => false} onBlogClick={handleRedirectionOfClick} isShowMore={true} blogData={blogList} isHome={true}/>}
        {/* <div className="tcg-description">
            <p>
                <span className='font--bold'>TCG Showdown</span> is a Social TCG gaming Platform. <br /> We specialize in overseeing all online matches and allow players to win real cash!
            </p>
            <p>
                TCG Showdown is leading the online trading card game community to the world of E-Sports.
            </p>
        </div> */}
    </div >:<CommingSoonPage></CommingSoonPage>
}




export default Events;