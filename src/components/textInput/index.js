import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {styles} from '../../configs/styles';
import {Gap} from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const InputText = ({
  label,
  placeholderTextColor,
  onChangeText,
  placeholder,
  onFocus,
  value,
  maxLength,
  iconRight,
  iconLeft,
  secureTextEntry,
  textContentType,
}) => {
  return (
    <View>
      <View style={styles.containerComponentLeftRow}>
        <Gap width={10} />
        <Text style={styles.textBoldWhite}>{label}</Text>
      </View>
      <Gap height={5} />
      <View style={styles.containerInputText}>
        <View style={{marginHorizontal: 10}}>{iconLeft}</View>
        <TextInput
          style={styles.InputText}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onFocus={onFocus}
          value={value}
          maxLength={maxLength}
          autoCapitalize="none"
          secureTextEntry={secureTextEntry}
        />
        <View style={{marginHorizontal: 2}}>{iconRight}</View>
      </View>
    </View>
  );
};

const TextInputNumber = ({
  label,
  placeholderTextColor,
  onChangeText,
  placeholder,
  onFocus,
  value,
  maxLength,
  iconRight,
  iconLeft,
  secureTextEntry,
}) => {
  return (
    <View>
      <View style={styles.containerComponentLeftRow}>
        <Gap width={10} />
        <Text style={styles.textBoldWhite}>{label}</Text>
      </View>
      <Gap height={5} />
      <View style={styles.containerInputText}>
        <View style={{marginHorizontal: 10}}>{iconLeft}</View>
        <TextInput
          style={styles.InputText}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onFocus={onFocus}
          value={value}
          maxLength={maxLength}
          autoCapitalize="none"
          secureTextEntry={secureTextEntry}
          keyboardType={'number-pad'}
        />
        <View style={{marginHorizontal: 2}}>{iconRight}</View>
      </View>
    </View>
  );
};

export {InputText, TextInputNumber};
