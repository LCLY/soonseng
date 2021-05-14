import React from 'react';
import './QuotationPage.scss';
/* components */
/* 3rd party lib */
import _ from 'lodash';
import { Input } from 'antd';
/* Util */
import { TLocalOrderObj } from 'src/store/types/sales';

interface QuotationStringInputProps {
  indexKey: string;
  className: string;
  tempEditChanges?: TLocalOrderObj | null;
  onSetEditChanges?: React.Dispatch<React.SetStateAction<TLocalOrderObj | null>>;
}

type Props = QuotationStringInputProps;

const QuotationStringInput: React.FC<Props> = ({ className, indexKey, tempEditChanges, onSetEditChanges }) => {
  return (
    <>
      {tempEditChanges !== undefined && (
        <Input
          className={className}
          value={_.get(tempEditChanges, indexKey)}
          onChange={(e) => {
            if (tempEditChanges === undefined || tempEditChanges === null || onSetEditChanges === undefined) return;
            let tempChanges = _.cloneDeep(tempEditChanges);

            _.set(tempChanges, indexKey, e.target.value);

            onSetEditChanges(tempChanges);
          }}
        />
      )}
    </>
  );
};

export default QuotationStringInput;
