import React, { Fragment } from 'react';
import Slider, { CustomArrowProps } from 'react-slick'
import DemoImage from 'assets/images/tcg-demo.jpeg'
import { LeftArrow, RightArrow } from './icons';
import moment from 'moment-timezone';


interface Props {
    settings: any,
    data: any[],
    className?: string,
    isPriceInfo?: boolean
}

const PrevArrow = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
    <div {...props} className='arrow-wrapper left-arrow flex justify--content-center align--items-center'>
        <LeftArrow />
    </div>
);

const NextArrow = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
    <div {...props} className='arrow-wrapper right-arrow flex justify--content-center align--items-center'>
        <RightArrow />
    </div>
);

// const settings = {
//     prevArrow: <PrevArrow />,
//     nextArrow: <NextArrow />
// }
let settings = {
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
}


const SlickSliderSmall = (props: Props) => {
    settings = { ...settings, ...props.settings }
    return <div className={`slider-wrapper ${props.className}`}>
        <Slider {...settings}>{

            props.data.map((data) =>
                <Fragment key={data.url}>
                    <div className="image-box-wrapper">
                        <img key={data.url} src={`${data.url}`} alt="" />
                        {props.isPriceInfo && <div className='description-wrapper'>
                            <h2>{!!data.eventname && data.eventname}</h2>
                            <p className='description-text'>{!!data.eventdescription && data.eventdescription}</p>
                            <div className="align__content--between players-info">
                                <p>{!data.eventtime && moment(data.eventtime).format('MM/DD/yyyy hh:mm A')}</p>
                                <p>{!data.players && data.players}</p>
                            </div>
                            <div className="align__content--between pricing">
                                <h2>{!!data.totalprice && `${data.totalprice}$`}</h2>
                                {!!data.buttonname && <button className='primary--button'>{data.buttonname}</button>}
                            </div>
                        </div>}
                    </div>
                </Fragment>)
        }</Slider>
    </div>
}

export default SlickSliderSmall;