import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { UniversalModal } from 'Components/common/UniversalModal/UniversalModal';
import React, { useState } from 'react';
import Slider, { CustomArrowProps } from 'react-slick';
import { LeftArrow, RightArrow } from './icons';


interface Props {
    settings: any,
    data: any[],
    title?: string
    className?: string
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




const SlickSLider = (props: Props) => {

    const [isInfoModal, setInfoModal] = useState(false);
    const [modalInfo, setModalInfo]:any = useState();

    const handleClick = (action, actionInfo, actionUrl) => {
        if (action.toLowerCase() === 'url') {
            window.open(actionUrl)
        } else {
            setInfoModal(true);
            setModalInfo(actionInfo)
        }
    };
    settings = { ...settings, ...props.settings }
    return <div className={`big-image-wrapper ${props.className}`}>
        {!!props.title && <p>{props.title}</p>}
        <Slider {...settings}>{
            props.data.map((data) => <img className='cursor--pointer' onClick={() => handleClick(data.action,data.actioninfo, data.actionurl)} key={data} src={`${data.url}`} alt="" />)
        }</Slider>
        {modalInfo && <UniversalModal title='Event Info' onCancel={() => setInfoModal(false)} visible={isInfoModal} className='modal-info'>
            {modalInfo && <div>{documentToReactComponents(modalInfo)}</div>}            
        </UniversalModal>
        }
    </div>
}

export default SlickSLider;