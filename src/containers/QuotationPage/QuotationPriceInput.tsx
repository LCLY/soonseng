import React from 'react';
import './QuotationPage.scss';
/* components */
/* 3rd party lib */
import _ from 'lodash';
import NumberFormat from 'react-number-format';
/* Util */
import { TLocalOrderObj } from 'src/store/types/sales';

interface QuotationPriceInputProps {
  indexKey: any;
  tempEditChanges?: TLocalOrderObj | null;
  onSetEditChanges?: React.Dispatch<React.SetStateAction<TLocalOrderObj | null>>;
}

type Props = QuotationPriceInputProps;

const QuotationPriceInput: React.FC<Props> = ({ indexKey, tempEditChanges, onSetEditChanges }) => {
  if (
    tempEditChanges === undefined ||
    onSetEditChanges === undefined ||
    tempEditChanges === null ||
    tempEditChanges.bodyMakeObj === null
  )
    return null;
  return (
    <>
      <NumberFormat
        className="quotation__edit-price"
        thousandSeparator={true}
        displayType="input"
        onValueChange={(value) => {
          if (tempEditChanges && value.floatValue !== undefined) {
            let tempChanges = _.cloneDeep(tempEditChanges);

            if (tempChanges.bodyMakeObj) {
              //_.set will change the object value using the path (indexKey in this case)
              _.set(tempChanges, indexKey, value.floatValue);
            }
            onSetEditChanges(tempChanges);
          }
        }}
        value={_.get(tempEditChanges, indexKey) ? _.get(tempEditChanges, indexKey).toFixed(2) : 0}
      />
    </>
  );
};

export default QuotationPriceInput;
