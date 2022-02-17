import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import MainHeader from 'Components/MainWrapper/parts/MainHeader';
import 'pages/landingPage/event.scss';
import React from 'react';
import ReactPlayer from 'react-player';
import FilePlayer from 'react-player/file';
import { NavLink } from 'react-router-dom';

interface Blogs {
    blogData: { [key: string]: any }[],
    className?: string,
    mainClassName?: string
    isShowMore: boolean
    onBlogClick: (index) => void
    resetBlog: () => void
    singleBlog?: { [key: string]: any }[],
    selectedCategory?: string,
    isHome?:boolean,

}

const Text = ({ children }) => <p>{children}</p>;
const Bold = ({ children }) => <p className='text--bold description-text' >{children}</p>;
const Header = ({ children }) => <p className='description-header' >{children}</p>;
const Image = ({ children }) => <div className="image-block">
    <img src={children} alt="" />
</div>


const options = {
    renderMark: {
        [MARKS.BOLD]: (text) => <p className='text--bold'>{text}</p>,
    },
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node, children) => <Image>{node.data.target.fields.file.url}</Image>,
    },
};


const Blogs = (props: Blogs): any => {
    let { blogData } = props
    if (props.selectedCategory && props.selectedCategory !== '' && props.selectedCategory !== 'ALL') {
        blogData = blogData.filter((blogDetails) => blogDetails.category.toUpperCase() === props.selectedCategory)
    }
    const renderBlogs = () => {
        
        return blogData.map((blogDetail, index) => <div key={index} onClick={() => props.onBlogClick(index)} className={`blog`}  >
            <div className="blog-info blog--width">
                {/* <div className="author-info flex align--items-center">
                    <p className="text--blue ml--10 small--description">{blogDetail.authorName}
                    </p>
                </div> */}
                <h2 className="text--blue blog-title blog-small-title mt--10 font--bold" title={blogDetail.title}>{blogDetail.title}</h2>
                <div className="blog-meta-info flex mt--10">
                    <p className="text--gray-blog meta--description-blog font--500">{new Date(blogDetail.createDate).toLocaleString('default', { month: 'short' }) + ' ' + new Date(blogDetail.createDate).getDate()}</p>
                    <p className="text--gray-blog ml--10 meta--description-blog"><span className='blog-type text--uppercase'>{blogDetail.category}</span></p>
                </div>
                <div className="blog-image flex align--items-center ml--20">
                    <img src={`${blogDetail.url}`} alt={blogDetail.url} />
                </div>
                <p className="text--gray-blog blog-small-description mt--10 line--height-20" title={blogDetail.smallDescription}>{blogDetail.smallDescription}</p>
            </div>
        </div>)
    }

    const renderSingleBlogs = () => {
        return props.singleBlog && props.singleBlog.map((blogDetail, index) => <div key={index} onClick={() => false} className={`blog`}  >
            <div className="blog-info blog--width">
                {/* <div className="author-info flex align--items-center">
                    <p className="text--blue ml--10 small--description">{blogDetail.authorName}
                    </p>
                </div> */}
                <h2 className="text--blue blog-title mt--10 font--bold">{blogDetail.title}</h2>
                <div className="blog-meta-info flex mt--10">
                    <p className="text--gray-blog meta--description-blog font--500">{new Date(blogDetail.createDate).toLocaleString('default', { month: 'short' }) + ' ' + new Date(blogDetail.createDate).getDate()}</p>
                    <p className="text--gray-blog ml--10 meta--description-blog "><span className='blog-type text--uppercase'>{blogDetail.category}</span></p>
                </div>
                <div className="blog-image flex align--items-center ml--20">
                    <img src={`${blogDetail.url} `} alt={blogDetail.url} />
                </div>
                {blogDetail.video?blogDetail.video.map((videoData,index) => {
                return <div className="blog-video" key={index}>  
                        <ReactPlayer
                        className='react-player'
                        playing={false}
                        url={videoData.fields.file.url}
                        width='100%'
                        height='100%'
                        controls
                        config={{ file: { attributes: { disablepictureinpicture: 'true' }}}}
                        forcePlayer={FilePlayer}
                        />
                    </div>
                }):null
                }                
                {/* <p className="text--gray-blog mt--10 line--height-20">{blogDetail.smallDescription}</p> */}
                <div>
                </div>
            </div>
            <div className='back-arrow-blog' onClick={props.resetBlog}>
                <span className="go-back-link__arrow ">⟶</span>
                <span>Go Back</span>
            </div>
            {props.singleBlog && props.singleBlog.length > 0 && <div className='description-blog'>{documentToReactComponents(blogDetail.longdescription, options)}</div>}
        </div>)
    }


    return <div className={`blogs-wrapper ${props.mainClassName ? props.mainClassName : ''}`}>

        {props.isShowMore && <div className="blog-title-info">
            <h2 className='blog-header'>Blogs:</h2>
            <NavLink to='/blogs' className='primary--button show-more-link' target="_blank">Show more</NavLink>
        </div>}
        <MainHeader></MainHeader>
        <div className={`blogs-container ${props.className || ''} ${props.singleBlog && props.singleBlog.length > 0 ? 'blog-lists-wrapper' : ''} `}>
            {props.blogData.length <= 0 ? <p>No Data Found</p> : (props.singleBlog && props.singleBlog.length > 0) ? renderSingleBlogs() : renderBlogs()}
        </div>
    </div>
}

export default Blogs;