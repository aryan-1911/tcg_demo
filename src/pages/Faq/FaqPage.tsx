import { FormAccordion } from 'Components/common/form/FormAccordion/FormAccordion';
import PageHeader from 'Components/PageHeader';
import React from 'react';
import './faq-styles.scss';
import { IFAQPage } from './FaqsPageWrapper';

interface IProps {
  content: IFAQPage;
}

export const FaqPage = (props: IProps) => {
  const { title, faq } = props.content;

  return (
    <div className="faq-page-wrapper">
      <PageHeader title={title} />
      <ul className="faq-page-wrapper__list">
        {faq.map((category) => {
          return (
            <li key={category.title}>
              <span className="faqs-title">{category.title}</span>
              {category.nestedArray.map((item) => (
                <div className="faqs-list" key={item.question}>
                  <FormAccordion
                    title={item.question}
                    description={item.answer}
                    id={item.question}
                  />
                </div>
              ))}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
