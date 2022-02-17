import React from 'react';
import Slider from '@material-ui/core/Slider';

interface IFormSlider extends IFormInput {
  sliderMarks: ISliderMark[];
  defaultValue?: number;
  min?: number;
  max?: number;
}

export const FormSlider = React.forwardRef<HTMLSpanElement, IFormSlider>(
  (props, ref) => {
    const {
      sliderMarks,
      onChange,
      defaultValue,
      value,
      max = 100,
      min,
    } = props;

    const handleChange = (
      event: React.ChangeEvent<{}>,
      value: number | number[],
    ) => {
      onChange(value);
    };

    return (
      <div className="form-slider-box">
        <Slider
          onChange={handleChange}
          defaultValue={defaultValue}
          value={Number(value)}
          step={null}
          valueLabelDisplay="auto"
          marks={sliderMarks}
          ref={ref}
          min={min}
          max={max}
        />
      </div>
    );
  },
);
