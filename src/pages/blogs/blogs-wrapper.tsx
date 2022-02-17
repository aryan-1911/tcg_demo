import { LoadingButton } from 'Components/common/form/LoadingButton/LoadingButton';
import { getBlogPosts } from 'Components/contentful/contentful';
import Blogs from 'pages/landingPage/components/blogs';
import { makeDataArray, TCGCONTENTFULKEYS } from 'pages/landingPage/constants/constants';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogAside from './components/Blogaside';



const BlogsWrapper = () => {
    const [blogs, setBlogs]: any = useState([]);
    const [category, setCategory]: any = useState([]);
    const [singleBlog, setSingleBlog]: any = useState([]);
    const [categoryType, selectedCategory]: any = useState('');
    const [isSingleBlog, setSingleBlogStatus] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const params = useParams();
    useEffect(() => {
        getBlogPosts(TCGCONTENTFULKEYS.TCG_BLOGS).then((data) => {
            setBlogs(makeDataArray(data));
            let categoryData = [...category]
            data.map((config) => {
                if (!categoryData.includes(config.fields.category.toUpperCase())) categoryData.push(config.fields.category.toUpperCase())
            })

            if (window.history.state !== null && !!window.history.state.state) {
                const isClickedBlog = window.history.state.state.id;
                let singleArray: any = [];
                singleArray.push(data[isClickedBlog])
                singleArray = makeDataArray(singleArray);
                setSingleBlog(singleArray);
            }
            const allCategory = ['ALL']
            categoryData = [...allCategory, ...categoryData]
            selectedCategory(categoryData[0]);
            setCategory(categoryData);
            setLoading(false);
        })
    }, [])

    useEffect(() => {
        if (isSingleBlog) {
            setSingleBlog([]);
            setSingleBlogStatus(false)
        }
    }, [isSingleBlog])


    const handleCategory = (category: string) => {
        selectedCategory(category);
        setSingleBlog([]);
        setSingleBlogStatus(true)
    }

    const onBlogClick = (index) => {
        let singleArray: any = [...singleBlog];
        singleArray = [];
        let filterData;
        if (categoryType !== '' && categoryType !== 'ALL') {
            filterData = blogs.filter((category) => category.category.toUpperCase() === categoryType)
            singleArray.push(filterData[index]);
        } else {
            singleArray.push(blogs[index]);
        }
        setSingleBlog(singleArray);
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const onResetBlog = () => {
        setSingleBlog([]);
        setSingleBlogStatus(true)
    }

    return isLoading ? <LoadingButton /> : <div className="faq-page-block adaptive-aside-wrapper">
        <BlogAside selectedCategory={categoryType} handleCategory={handleCategory} blogCategory={category} />
        <div className="inner-padding adaptive-aside-content">
            <Blogs mainClassName='background--transparent blogs-wrapper-border all-blogs' selectedCategory={categoryType} resetBlog={onResetBlog} onBlogClick={onBlogClick} singleBlog={singleBlog} isShowMore={false} blogData={blogs} className='blog-lists-wrapper-test' />
        </div>
    </div>
}

export default BlogsWrapper;