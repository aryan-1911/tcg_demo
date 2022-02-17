import React from 'react';
import './form-accordion.scss';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { COLORS } from 'const/colors';
import DOMPurify from 'dompurify';

interface IFormAccordion {
  title: string;
  description: string;
  id?: string;
}

export const FormAccordion = (props: IFormAccordion) => {
  const { title, description, id } = props;
  return (
    <Accordion id={id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{ color: COLORS.GRAY }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <b>{title}</b>
      </AccordionSummary>
      <AccordionDetails className="accordion-details">
        <span
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
        ></span>
      </AccordionDetails>
    </Accordion>
  );
};
