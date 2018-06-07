import * as classNames from 'classnames';

export function setClassNames(props) {
    const isHeightSet = props.height ? true : false;
    const isWidthSet = props.width ? true : false;
    const isAlignSet = props.align ? true : false;
    const isBackgroundSet = props.background ? true : false;
    
    return classNames({
        [`uk-align-${props.align}`]: isAlignSet,
        [`uk-height-${props.height}`]: isHeightSet,
        [`uk-width-${props.width}`]: isWidthSet,
        [`uk-background-${props.background}`]: isBackgroundSet
    });
}