import React from 'react';

import {
  Text,
  Platform,
  View,
  StyleSheet,
} from 'react-native';

import {RkComponent} from '../rkComponent.js';

/**
 * `RkText` is a component used to render text blocks
 *
 * @extends RkComponent
 *
 * @example Simple usage example:
 *
 * ```
 * <RkText>Text</RkText>
 * ```
 *
 * @example Using rkType prop
 *
 * `RkText` has `rkType` prop. This prop works similar to CSS-class in web. It's possible to set more than one type.
 * There are already some predefined types. Here is example of how to use rkType
 *
 * ```
 * <RkText rkType='primary'>Primary</RkText>
 * <RkText rkType='danger large'>Danger and Large</RkText>
 * ```
 *
 * @example Define new rkTypes
 *
 * It's easy and very common to create new types. Main point for all customization is `RkTheme` object.
 * New rkTypes are defined using `setType` method of `RkTheme`:
 *
 * ```
 * RkTheme.setType('RkText','hero',{
 *  fontSize: 40
 * });
 *
 * //...
 *
 * <RkText rkType='hero'>Header</RkText>
 * ```
 *
 * @styles Available properties
 * - `color` : Color of text
 * - `backgroundColor` : Background color of `RkText`
 * - `fontSize` : Font size of text
 *
 * @example Advanced Styling
 *
 * It's also possible to implement more detailed styling. `RkText` wraps base `Text` component.
 * It's easy to set styles for each component.
 *
 * ```
 * RkTheme.setType('RkText','italic',{
 *   text:{
 *     fontStyle:'italic'
 *   }
 * });
 * ```
 *
 * @styles Available components:
 * - `text` : `Text` - component used to show text.
 *
 * @property {string} rkType - Types for component stylization
 * By default RkText supports following types: `primary`, `info`, `warning`, `danger`, `success`, `xxlarge`, `xlarge`,
 `large`, `small`, `medium`, `header`, `subtitle`
 * @property {Text.props} props - All `Text` props also applied to `RkText`
 */

export class RkText extends RkComponent {
  componentName = 'RkText';
  typeMapping = {
    text: {
      color: 'color',
      backgroundColor: 'backgroundColor',
      fontSize: 'fontSize',
      fontFamily: 'fontFamily',
      letterSpacing: 'letterSpacing'
    }
  };

  minSpaceIndex = 1;

  renderText(value, style, spaceCount) {
    console.log(value + ' ' + ' ' + style + ' ' + spaceCount);
    return (
      <Text style={style}>
        {value.split('').join('\u200A'.repeat(spaceCount))}
        {'\u200A'.repeat(spaceCount)}&nbsp;{'\u200A'.repeat(spaceCount)}
      </Text>
    );
  }

  render() {
    let {
      rkType,
      style,
      children,
      ...textProps
    } = this.props;
    let rkStyles = this.defineStyles(rkType);

    let letterSpacing = (style && style.letterSpacing);
    let needToInsertSpaces = Platform.OS === 'android' && letterSpacing;
    let spaceCount = Math.round(letterSpacing * this.minSpaceIndex);
    if (typeof children === 'string') {
      children = [children];
    }

    return (
      <View style={styles.textContainer}>
        {
          needToInsertSpaces
            ? children.map(
            (child) =>
              (typeof child === 'string')
                ? child.split(' ').map((value) => this.renderText(value, [rkStyles.text, style], spaceCount))
                : child
            )
            : <Text style={[rkStyles.text, style]}>{children}</Text>
        }
      </View>
    );
  }
}

let styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
});
